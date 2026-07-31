// Thumbs up/down on a concierge answer.
//
// This is the only signal in the system that reflects whether a customer
// actually found the answer useful — everything else (cards resolved, latency,
// products retrieved) is the machine grading its own homework. A thumbs-down
// is what promotes a conversation to the top of the review list.
import { saveFeedback } from "./_store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const turnId = typeof req.body?.turnId === "string" ? req.body.turnId.slice(0, 64) : "";
  const raw = Number(req.body?.value);
  // Only the two states the UI can produce. Anything else is a malformed or
  // hand-crafted request and is rejected rather than coerced.
  if (!turnId || (raw !== 1 && raw !== -1)) return res.status(400).json({ error: "bad request" });

  // Answering 200 regardless of whether the store is configured keeps the
  // widget honest: the customer's click is acknowledged, and an unprovisioned
  // database is an operator problem, not something to surface mid-conversation.
  const stored = await saveFeedback(turnId, raw);
  return res.status(200).json({ ok: true, stored });
}
