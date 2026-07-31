// The improvement loop, exposed as a work list.
//
// GET /api/insights?token=...&days=14
//
// This is NOT a dashboard and NOT a model that retrains itself — an LLM app
// can't learn from its own logs unaided. What it does is convert two weeks of
// real conversations into specific, actionable edits:
//
//   missingSynonyms  -> words customers type that the catalog has no concept
//                       for. Each one is a candidate TERMS entry in
//                       api/concierge.js. This is the single highest-leverage
//                       output: the retriever gets measurably better in the
//                       language customers actually use.
//   noProductMatched -> questions answered with no product surfaced. Either a
//                       catalog gap (something worth stocking) or a retrieval
//                       gap (something worth tuning).
//   punted           -> questions the assistant handed to a human. Anything
//                       recurring here is a policy answer worth writing down.
//   thumbsDown       -> customers explicitly said the answer was unhelpful.
//   deadEndRate      -> the one number worth tracking week over week.
//
// Access is token-gated because the output contains customer questions.
// Redacted ones — see api/_redact.js — but still their words.
import { buildInsights, storeEnabled } from "./_store.js";

// Timing-safe-ish comparison. Not a hardened secret store, but enough that a
// wrong token can't be discovered by measuring how fast it's rejected.
function tokenMatches(given, expected) {
  if (typeof given !== "string" || given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "GET only" });

  const expected = process.env.INSIGHTS_TOKEN;
  // Fail closed. An unset token must never mean "open to everyone" — this
  // endpoint returns customer questions.
  if (!expected) return res.status(503).json({ error: "INSIGHTS_TOKEN not configured" });
  if (!tokenMatches(req.query?.token, expected)) return res.status(404).end();

  if (!storeEnabled()) {
    return res.status(503).json({
      error: "Conversation store not provisioned",
      hint: "Create a Vercel Postgres store and set POSTGRES_URL, then conversations start recording automatically.",
    });
  }

  const days = Math.min(Math.max(Number(req.query?.days) || 14, 1), 180);
  try {
    const data = await buildInsights(days);
    return res.status(200).json(data);
  } catch (e) {
    console.error(JSON.stringify({ event: "insights_failed", error: String(e.message || e).slice(0, 200) }));
    return res.status(500).json({ error: "insights query failed" });
  }
}
