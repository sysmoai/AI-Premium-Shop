// The improvement loop, exposed as a work list.
// Cloudflare Pages Functions port of artifacts/aips-landing/api/insights.js.
//
// GET /api/insights?token=...&days=14
//
// Access is token-gated because the output contains customer questions.
// Redacted ones — see api/_redact.js — but still their words.
import { buildInsights, storeEnabled, bindStore } from "./_store.js";
import { tokenMatches } from "./_auth.js";

function json(status, obj) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function onRequest({ request, env }) {
  bindStore(env);
  if (request.method !== "GET") return json(405, { error: "GET only" });

  const url = new URL(request.url);
  const expected = env.INSIGHTS_TOKEN;
  // Fail closed. An unset token must never mean "open to everyone" — this
  // endpoint returns customer questions.
  if (!expected) return json(503, { error: "INSIGHTS_TOKEN not configured" });
  // Preferred: Authorization: Bearer <token>. The legacy ?token= query param
  // remains accepted as a deprecated fallback so existing operator workflows
  // keep working; query strings leak into logs/history, so new integrations
  // must use the header.
  const headerToken = (request.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  const queryToken = url.searchParams.get("token") ?? "";
  if (!tokenMatches(headerToken, expected) && !tokenMatches(queryToken, expected)) return new Response(null, { status: 404 });

  if (!storeEnabled()) {
    return json(503, {
      error: "Conversation store not provisioned",
      hint: "Set DATABASE_URL or POSTGRES_URL for the Cloudflare Pages project, then conversations start recording automatically.",
    });
  }

  const days = Math.min(Math.max(Number(url.searchParams.get("days")) || 14, 1), 180);
  try {
    const data = await buildInsights(days);
    return json(200, data);
  } catch (e) {
    console.error(JSON.stringify({ event: "insights_failed", error: String(e.message || e).slice(0, 200) }));
    return json(500, { error: "insights query failed" });
  }
}
