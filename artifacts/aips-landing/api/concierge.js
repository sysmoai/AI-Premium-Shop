// AIPS AI Concierge — Vercel serverless function.
// Browser -> this function -> NVIDIA API. The key lives ONLY in the
// NVIDIA_API_KEY server env var and never reaches the client.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const catalog = JSON.parse(readFileSync(fileURLToPath(new URL("./_catalog.json", import.meta.url)), "utf8"));

const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
// Ordered fastest/cheapest-first. 8B primary: measured 0.9s with the full
// catalog prompt (70B took >60s on the free NIM tier — unusable). Each
// fallback is a real, independently-hosted NIM model so a deprecation or
// upstream rate-limit on one doesn't take the concierge down. Verify
// reachability anytime, in production, with the real key, without touching
// user-facing chat: GET /api/concierge?diagnose=1
const MODELS = [
  "meta/llama-3.1-8b-instruct",
  "meta/llama-3.2-3b-instruct",
  "mistralai/mistral-7b-instruct-v0.3",
  "nvidia/nemotron-mini-4b-instruct",
];
const WHATSAPP = "https://wa.me/8801865385348";

// Best-effort per-instance throttle (serverless instances are ephemeral;
// the real ceiling is NVIDIA's own rate limit).
const hits = new Map();
function throttled(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 10;
}

// One line per product, listing every real price tier (not just the first
// sibling record) so the model can answer "what's the cheapest X" or "what
// tiers does X have" correctly. _catalog.json already carries this shape —
// see scripts/generate-concierge-catalog.mjs.
function formatTiers(tiers) {
  return tiers
    .map((t) => {
      const price = t.priceBDT != null ? `BDT ${t.priceBDT}/mo` : "price via WhatsApp";
      const sla = t.deliverySLA ? `, ${t.deliverySLA}` : "";
      const badge = t.badge ? ` [${t.badge}]` : "";
      return `${t.tier}: ${price} (${t.accessType}${sla})${badge}`;
    })
    .join("; ");
}
const catalogLines = catalog.map((p) => `${p.name} | page: ${p.path} | ${p.category} | ${formatTiers(p.tiers)}`).join("\n");

const SYSTEM = `You are the AI Concierge for AI Premium Shop (aipremiumshop.com), which resells legitimate premium AI subscriptions in Bangladesh, paid via bKash/Nagad/Rocket/Bank Transfer/Binance.

HOW THE BUSINESS WORKS (use this — it is the site's own published policy, don't improvise beyond it):
- Shared plans: 2-7 customers share one legitimate subscription (like family sharing) — lower price, full feature access, less privacy.
- Personal plans: a dedicated account for one customer — full privacy, higher price.
- Every order includes a 30-day replacement warranty.
- Refunds: only within 15 minutes of delivery, only for a genuine service mismatch. Subscription fees are otherwise non-refundable.
- Ordering has 4 steps: (1) pick a tool and tier, (2) message WhatsApp to confirm, (3) pay via bKash/Nagad/Rocket/Bank Transfer/Binance, (4) receive account access. The delivery clock starts after payment is confirmed on WhatsApp.
- Undecided beginners: the standard starting recommendation is ChatGPT Plus Starter Shared — it covers writing, coding, research, and images. Quote its real current price from the catalog below.
- Deeper segment guides exist — link one when it clearly fits: /best-ai-for-students, /best-ai-for-freelancers, /best-ai-for-creators, /best-ai-for-business, /best-ai-for-developers, /best-ai-for-designers, /best-ai-for-marketers, /best-ai-for-job-seekers, /best-ai-for-ecommerce.

STRICT RULES:
- Answer product/price questions ONLY from the catalog below. If something isn't listed, say you're not sure and point to WhatsApp: ${WHATSAPP}
- NEVER invent prices, discounts, delivery times, or availability beyond the catalog or the policies above.
- NEVER use marketing superlatives you can't verify from this prompt — no "best", "guaranteed", "instant", "trusted by thousands", "unlimited". Describe plainly instead.
- NEVER ask for or accept bKash/Nagad/Rocket PINs, OTPs, passwords, or card numbers. If a user offers one, tell them never to share it with anyone, including AI Premium Shop staff.
- No income guarantees. Describe realistic use cases only.
- Reply in the user's language: Bangla in Bangla, English in English, Banglish in Banglish. Keep replies under 120 words, warm and direct.
- When recommending, give at most 3 products with their cheapest relevant tier's BDT price (or "WhatsApp for current price") and page path (e.g. /claude-pro-bangladesh) so the site can link it.
- You cannot take orders or payments in this chat. Never ask for phone numbers, emails, or personal details — ALL ordering happens on WhatsApp only.
- Always end with a short pointer to WhatsApp for ordering: ${WHATSAPP}

CATALOG (product | page | category | tiers — name: price (access, delivery) [badge]):
${catalogLines}`;

// Leaves margin under vercel.json's maxDuration for this function (45s) —
// tracked so the fallback loop stops trying new models rather than let
// Vercel hard-kill the request mid-attempt.
const DEADLINE_MS = 38_000;

async function pingModel(key, model, timeoutMs) {
  const start = Date.now();
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    const r = await fetch(NVIDIA_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages: [{ role: "user", content: "Reply with exactly: OK" }], max_tokens: 5 }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    return { model, ok: r.ok, status: r.status, ms: Date.now() - start };
  } catch (e) {
    return { model, ok: false, error: String(e.message || e).slice(0, 150), ms: Date.now() - start };
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const key = process.env.NVIDIA_API_KEY;
    // ?diagnose=1 — live per-model reachability probe using the real
    // production key. Safe to call anytime: no user-facing chat state is
    // touched, each probe is a 5-token throwaway prompt. Use this to check
    // model health without guessing from Vercel logs alone.
    if (req.query?.diagnose === "1") {
      if (!key) return res.status(503).json({ ok: false, error: "NVIDIA_API_KEY not configured" });
      const results = [];
      for (const model of MODELS) results.push(await pingModel(key, model, 8_000));
      return res.status(200).json({ ok: true, products: catalog.length, models: results });
    }
    // Plain health check (no upstream call — cheap enough for uptime monitors).
    return res.status(200).json({ ok: true, products: catalog.length, keyConfigured: !!key });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const ip = (req.headers["x-forwarded-for"] || "?").split(",")[0].trim();
  if (throttled(ip)) return res.status(429).json({ error: "Too many messages — please continue on WhatsApp", whatsapp: WHATSAPP });

  const key = process.env.NVIDIA_API_KEY;
  if (!key) return res.status(503).json({ error: "Concierge offline — message us on WhatsApp", whatsapp: WHATSAPP });

  let messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  messages = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));
  if (!messages.length) return res.status(400).json({ error: "empty" });

  // Logged for gap analysis only — the question text, not identity. This
  // chat never collects phone/email/name, so there's no PII to redact.
  const lastQuestion = messages[messages.length - 1]?.content?.slice(0, 200) ?? "";
  const overallStart = Date.now();

  for (const model of MODELS) {
    const remaining = DEADLINE_MS - (Date.now() - overallStart);
    if (remaining < 3_000) break; // not enough budget left for a meaningful attempt
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), Math.min(12_000, remaining));
      const r = await fetch(NVIDIA_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [{ role: "system", content: SYSTEM }, ...messages],
          max_tokens: 400,
          temperature: 0.3,
        }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (!r.ok) throw new Error(`upstream ${r.status}`);
      const data = await r.json();
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (!reply) throw new Error("empty reply");
      console.log(JSON.stringify({ event: "concierge_reply", model, ms: Date.now() - overallStart, q: lastQuestion }));
      return res.status(200).json({ reply });
    } catch (e) {
      console.error(JSON.stringify({ event: "concierge_model_fail", model, error: String(e.message || e).slice(0, 150) }));
    }
  }
  console.error(JSON.stringify({ event: "concierge_all_failed", q: lastQuestion }));
  return res.status(502).json({ error: "Concierge is busy — message us on WhatsApp for instant help", whatsapp: WHATSAPP });
}
