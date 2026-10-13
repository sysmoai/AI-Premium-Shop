// Scrubs customer chat text before anything is persisted.
// Identical to artifacts/aips-landing/api/_redact.js — keep in sync.
//
// The concierge tells customers never to share a bKash/Nagad PIN or OTP —
// which is itself evidence that they sometimes try. Once conversations are
// stored, whatever they typed becomes something this business is the
// custodian of, so the scrub happens server-side BEFORE the write, not on
// the way back out. A breach of the store should not be a breach of anyone's
// wallet.

const BN_DIGITS = { "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9" };
const toAscii = (s) => s.replace(/[০-৯]/g, (d) => BN_DIGITS[d]);

const SECRET_WORDS =
  "pin|p\\.i\\.n|otp|o\\.t\\.p|passcode|password|pass|cvv|cvc|secret|code|পিন|ওটিপি|পাসওয়ার্ড|পাসকোড|গোপন|কোড";

const L = "A-Za-z0-9_\\u0980-\\u09FF";

const RULES = [
  // Email — never needed by this chat, which takes no orders.
  [/\b[\w.%+-]+@[\w.-]+\.[a-z]{2,}\b/gi, "[email]"],

  // Bangladeshi mobile numbers, with or without country code. Runs BEFORE the
  // card rule: +8801865385348 is 13 digits and would otherwise be labelled a
  // card, losing the fact that it's a phone number.
  [/(?:\+?880[\s-]?)?0?1[3-9]\d{8}\b/g, "[phone]"],

  // Card-shaped: 13-19 digits, optionally grouped by spaces or dashes.
  [/\b(?:\d[ -]?){13,19}\b/g, "[card]"],

  // A secret word followed by its value within a short window.
  [
    new RegExp(`(?<![${L}])(${SECRET_WORDS})(?![${L}])([^\\d\\n]{0,20})(\\d{3,8})`, "gi"),
    (_m, w, gap) => `${w}${gap}[redacted]`,
  ],

  // Any run of 6+ digits. Nothing in the catalog costs that much.
  [/\b\d{6,}\b/g, "[number]"],
];

/**
 * @param {string} text raw customer or assistant message
 * @returns {{ text: string, hits: string[] }} scrubbed text plus which rules fired.
 */
export function redact(text) {
  if (typeof text !== "string" || !text) return { text: "", hits: [] };

  let out = toAscii(text);
  const hits = [];

  for (const [pattern, replacement] of RULES) {
    const before = out;
    out = out.replace(pattern, replacement);
    if (out !== before) {
      const label = typeof replacement === "string" ? replacement.slice(1, -1) : "secret";
      hits.push(label);
    }
  }
  return { text: out, hits };
}

/**
 * True when the text contains something that looks like a payment credential.
 */
export function containsCredential(text) {
  const { hits } = redact(text);
  return hits.includes("secret") || hits.includes("card");
}

/** Redacts a whole message array in place-safe fashion, for transcript writes. */
export function redactMessages(messages) {
  let hits = 0;
  const out = messages.map((m) => {
    const r = redact(m.content);
    hits += r.hits.length;
    return { role: m.role, content: r.text };
  });
  return { messages: out, redactionCount: hits };
}
