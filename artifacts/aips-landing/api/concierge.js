// AIPS AI Concierge — Vercel serverless function.
// Browser -> this function -> NVIDIA API. The key lives ONLY in the
// NVIDIA_API_KEY server env var and never reaches the client.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const catalog = JSON.parse(readFileSync(fileURLToPath(new URL("./_catalog.json", import.meta.url)), "utf8"));

const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
// 8B: measured 0.9s with the full catalog prompt; the 70B took >60s on the
// free NIM tier — unusable for chat and beyond the function window.
const MODEL = "meta/llama-3.1-8b-instruct";
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

const catalogLines = catalog
  .map((p) => `${p.name} | ${p.priceBDT != null ? `BDT ${p.priceBDT}/mo` : "current price via WhatsApp"} | ${p.accessType} | ${p.category} | page: ${p.path}`)
  .join("\n");

const SYSTEM = `You are the AI Concierge for AI Premium Shop (aipremiumshop.com), which sells legitimate premium AI subscriptions in Bangladesh paid via bKash/Nagad/Rocket/bank transfer.

STRICT RULES:
- Answer ONLY from the catalog below. If a product or price is not listed, say you are not sure and offer WhatsApp: ${WHATSAPP}
- NEVER invent prices, discounts, delivery times, or availability. Products marked "current price via WhatsApp" have changing provider pricing — direct users to WhatsApp for those.
- NEVER ask for or accept bKash/Nagad/Rocket PINs, OTPs, passwords, or card numbers. If a user offers one, tell them never to share it with anyone.
- No income guarantees. You may describe realistic use cases only.
- Reply in the user's language: Bangla in Bangla, English in English, Banglish in Banglish. Keep replies under 120 words, warm and direct.
- When recommending, give at most 3 products with their BDT price (or "WhatsApp for current price") and their page path (e.g. /claude-pro-bangladesh) so the site can link it.
- You cannot take orders or payments in this chat. Never ask for phone numbers, emails or personal details — ALL ordering happens on WhatsApp only.
- Always end with a short pointer to WhatsApp for ordering: ${WHATSAPP}

CATALOG (name | price | access | category | page):
${catalogLines}`;

export default async function handler(req, res) {
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

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 25_000);
    const r = await fetch(NVIDIA_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
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
    return res.status(200).json({ reply });
  } catch {
    return res.status(502).json({ error: "Concierge is busy — message us on WhatsApp for instant help", whatsapp: WHATSAPP });
  }
}
