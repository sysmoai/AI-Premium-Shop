// Thumbs up/down on a concierge answer.
// Cloudflare Pages Functions port of artifacts/aips-landing/api/feedback.js.
//
// This is the only signal in the system that reflects whether a customer
// actually found the answer useful — everything else (cards resolved, latency,
// products retrieved) is the machine grading its own homework. A thumbs-down
// is what promotes a conversation to the top of the review list.
import { saveFeedback, bindStore } from "./_store.js";

function json(status, obj) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function onRequest({ request, env }) {
  bindStore(env);
  if (request.method !== "POST") return json(405, { error: "POST only" });

  let body = {};
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "bad request" });
  }

  const turnId = typeof body?.turnId === "string" ? body.turnId.slice(0, 64) : "";
  const raw = Number(body?.value);
  // Only the two states the UI can produce. Anything else is a malformed or
  // hand-crafted request and is rejected rather than coerced.
  if (!turnId || (raw !== 1 && raw !== -1)) return json(400, { error: "bad request" });

  // Answering 200 regardless of whether the store is configured keeps the
  // widget honest: the customer's click is acknowledged, and an unprovisioned
  // database is an operator problem, not something to surface mid-conversation.
  const stored = await saveFeedback(turnId, raw);
  return json(200, { ok: true, stored });
}
