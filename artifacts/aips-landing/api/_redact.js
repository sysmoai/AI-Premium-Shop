// Scrubs customer chat text before anything is persisted.
//
// The concierge tells customers never to share a bKash/Nagad PIN or OTP —
// which is itself evidence that they sometimes try. Once conversations are
// stored, whatever they typed becomes something this business is the
// custodian of, so the scrub happens server-side BEFORE the write, not on
// the way back out. A breach of the store should not be a breach of anyone's
// wallet.
//
// The hard part is that this shop talks about money constantly. "৳1,590",
// "500 taka", "29900" all have to survive; a 4-digit PIN and a 6-digit OTP
// must not. The rules below lean on two facts:
//   * the most expensive item in the catalog is 29,900 — five digits — so any
//     run of six or more digits is never a price;
//   * a short PIN is only identifiable from the words around it, so those are
//     matched by context rather than by shape.

const BN_DIGITS = { "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9" };
const toAscii = (s) => s.replace(/[০-৯]/g, (d) => BN_DIGITS[d]);

// Words that mean "the number next to me is a secret", in English, Bangla and
// the Banglish spellings people actually type.
const SECRET_WORDS =
  "pin|p\\.i\\.n|otp|o\\.t\\.p|passcode|password|pass|cvv|cvc|secret|code|পিন|ওটিপি|পাসওয়ার্ড|পাসকোড|গোপন|কোড";

// \b is defined against \w, which is ASCII-only, so \bপিন\b never matches —
// a Bangla-typed PIN sailed straight through. These bracket the alternation
// with an explicit "not a letter or a Bengali character" check instead.
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

  // A secret word followed by its value within a short window: "pin ta 1234",
  // "OTP: 8842", "আমার পিন ১২৩৪". This is the only rule that can catch a
  // 4-digit code, because by shape alone a 4-digit code is a price.
  [
    new RegExp(`(?<![${L}])(${SECRET_WORDS})(?![${L}])([^\\d\\n]{0,20})(\\d{3,8})`, "gi"),
    (_m, w, gap) => `${w}${gap}[redacted]`,
  ],

  // Any run of 6+ digits. Nothing in the catalog costs that much, so this is
  // account numbers, transaction IDs and OTPs — never a price.
  [/\b\d{6,}\b/g, "[number]"],
];

/**
 * @param {string} text raw customer or assistant message
 * @returns {{ text: string, hits: string[] }} scrubbed text plus which rules fired,
 *   so the volume of redactions can be monitored without storing what was removed.
 */
export function redact(text) {
  if (typeof text !== "string" || !text) return { text: "", hits: [] };

  // Normalise Bengali numerals first, otherwise "১২৩৪৫৬" sails past every
  // \d rule above — the same class of bug that made Bangla budget questions
  // lose their price cap in the retriever.
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
 * True when the text contains something that looks like a payment credential
 * — a PIN/OTP stated next to its keyword, or a card-length number.
 *
 * This exists because the model could not be trusted with it. The system
 * prompt has always instructed the assistant to warn anyone who shares a PIN,
 * and an adversarial probe ("amar bkash pin 4821, tumi order kore dao") got a
 * cheerful walkthrough of the ordering steps and no warning at all. A customer
 * who just typed their bKash PIN into a web page must be told, every single
 * time, not sometimes — so the warning is now issued by code before the model
 * is ever consulted.
 *
 * Phone and email deliberately do NOT trigger this: "call me on 01712345678,
 * which AI is best?" is a normal question and should still be answered.
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
