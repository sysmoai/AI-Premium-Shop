// Product guides: opt-in long-form content (sections + FAQ) for a /product/<slug> page.
// One source file (data/product-guides.json) feeds the React page, the crawler HTML and
// the validator, so the three can never disagree.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const REPO = path.join(APP, "..", "..");

export function loadGuides() {
  const file = path.join(APP, "data/product-guides.json");
  if (!fs.existsSync(file)) return {};
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (data.schema_version !== 1) throw new Error("[product-guides] unsupported schema_version");
  return data.guides ?? {};
}

export function approvedPaymentMethods() {
  const commercial = JSON.parse(fs.readFileSync(path.join(REPO, "ops/ssot/commercial.json"), "utf8"));
  const methods = commercial.public_claim_policy?.payment?.approved_public_methods;
  if (!Array.isArray(methods) || !methods.length) throw new Error("[product-guides] approved payment methods not found in ops/ssot/commercial.json");
  return methods;
}

// Every string a visitor or crawler can read from a guide.
export function guideTexts(guide) {
  const out = [guide.seoTitle, guide.seoDescription, guide.summary, guide.summaryBN, guide.planNote];
  for (const plan of guide.plans ?? []) out.push(plan.tier, plan.fit, ...(plan.points ?? []));
  for (const section of guide.sections ?? []) out.push(section.heading, ...(section.paragraphs ?? []), ...(section.bullets ?? []), ...(section.steps ?? []));
  for (const item of guide.faq ?? []) out.push(item.q, item.a);
  for (const source of guide.sources ?? []) out.push(source.label);
  return out.filter((value) => typeof value === "string" && value.trim());
}

// Same phrases the generic product sanitizer refuses, kept in one place for guides.
export const BLOCKED_PHRASES = [
  "30-day warranty", "30 day warranty", "replacement guarantee", "money-back", "instant delivery", "instant access",
  "fast delivery", "5-15 min", "5–15 min", "5-30 min", "5–30 min", "trusted by", "10,000+ customers", "best seller",
  "bestseller", "best value", "% off", "authorized reseller", "official reseller", "authentic subscription",
  "no international card", "nobody can see anyone else's",
];

const UNAPPROVED_PAYMENT = /\b(rocket|upay|ucash|bank\s+transfer|credit\s+card|debit\s+card|visa|mastercard|paypal|usdt|crypto)\b/i;
const KNOWN_LOCAL_METHODS = ["bKash", "Nagad", "Rocket", "Upay"];
const HARD_BANS = [
  [/\bwarrant(y|ies)\b/i, "warranty wording"],
  [/\bguarantee[ds]?\b/i, "guarantee wording"],
  [/\bunlimited\b/i, "unlimited"],
  [/\b\d+\s*(?:min|mins|minutes|hrs?|hours?)\s+(?:delivery|activation)\b/i, "fixed delivery time"],
  [/\bwithin\s+\d+\s*(?:min|mins|minutes|hrs?|hours?|days?)\b/i, "fixed delivery time"],
  [/\b(?:#1|number one|cheapest)\b/i, "superlative claim"],
  [/\b\d[\d,]*\+?\s+(?:customers|users|reviews)\b/i, "social-proof number"],
  [/\b(?:earn|income)\b[^.]*\b(?:৳|bdt|tk|taka|\$)\s*\d/i, "income figure"],
];
const NEEDS_NEGATION = /\b(official|authori[sz]ed|partner|endorsed|affiliated)\b/i;
const NEGATION = /\b(no|not|never|neither|nor|without|cannot)\b/i;

const bnDigits = (value) => value.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d));

export function validateGuide(slug, guide, records) {
  const errors = [];
  const fail = (message) => errors.push(`${slug}: ${message}`);
  if (!records.length) fail("no product record with this slug");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(guide.sourceCheckedOn ?? "")) fail("sourceCheckedOn must be YYYY-MM-DD");
  if (!guide.seoTitle || guide.seoTitle.length > 70) fail("seoTitle missing or over 70 characters");
  if (!guide.seoDescription || guide.seoDescription.length > 158) fail(`seoDescription missing or over 158 characters (${guide.seoDescription?.length})`);
  if (!guide.summary) fail("summary missing");
  if (!Array.isArray(guide.sections) || guide.sections.length < 2) fail("at least 2 sections required");
  const faq = guide.faq ?? [];
  if (faq.length < 5 || faq.length > 30) fail("faq must have 5 to 30 entries");
  if (new Set(faq.map((item) => item.q)).size !== faq.length) fail("duplicate faq question");
  for (const item of faq) if (!item.q?.trim() || !item.a?.trim() || item.a.length > 700) fail(`faq entry invalid or answer over 700 characters: ${item.q}`);

  let providerHost = "";
  try { providerHost = new URL(guide.providerSite).hostname.replace(/^www\./, ""); } catch { fail("providerSite must be a URL"); }
  for (const source of guide.sources ?? []) {
    let host = "";
    try { const url = new URL(source.url); host = url.protocol === "https:" ? url.hostname : ""; } catch { /* reported below */ }
    if (!host || !(host === providerHost || host.endsWith(`.${providerHost}`))) fail(`source is not an https page on ${providerHost}: ${source.url}`);
  }
  if (!(guide.sources ?? []).length) fail("at least one provider source required");

  // Prices are never typed twice: every BDT figure in guide prose must be a current catalog price.
  const prices = new Map(records.filter((r) => typeof r.price === "number" && !r.requestPrice).map((r) => [r.tier, r.price]));
  for (const plan of guide.plans ?? []) if (!prices.has(plan.tier)) fail(`plan "${plan.tier}" has no priced catalog record`);
  const allowed = new Set(prices.values());
  const approved = approvedPaymentMethods();
  const texts = guideTexts(guide);
  for (const text of texts) {
    const lower = text.toLowerCase();
    for (const phrase of BLOCKED_PHRASES) if (lower.includes(phrase)) fail(`blocked phrase "${phrase}" in: ${text.slice(0, 80)}`);
    for (const [pattern, label] of HARD_BANS) if (pattern.test(text)) fail(`${label} in: ${text.slice(0, 80)}`);
    if (UNAPPROVED_PAYMENT.test(text)) fail(`payment method outside the approved list in: ${text.slice(0, 80)}`);
    for (const method of KNOWN_LOCAL_METHODS) if (new RegExp(`\\b${method}\\b`, "i").test(text) && !approved.includes(method)) fail(`${method} is not an approved public payment method`);
    for (const sentence of text.split(/(?<=[.!?।])\s+/)) if (!sentence.trim().endsWith("?") && NEEDS_NEGATION.test(sentence) && !NEGATION.test(sentence)) fail(`authorization wording without a negation in: ${sentence.slice(0, 80)}`);
    const normal = bnDigits(text);
    for (const match of normal.matchAll(/(?:BDT|৳)\s*([\d,]+)/g)) if (!allowed.has(Number(match[1].replace(/,/g, "")))) fail(`BDT figure ${match[1]} is not a current catalog price`);
    for (const match of normal.matchAll(/([\d,]+)\s*টাকা/g)) if (!allowed.has(Number(match[1].replace(/,/g, "")))) fail(`Taka figure ${match[1]} is not a current catalog price`);
  }
  const joined = bnDigits(texts.join(" ")).replace(/,/g, "");
  for (const price of allowed) if (!joined.includes(String(price))) fail(`catalog price ${price} is never stated in the guide`);
  return errors;
}

const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtBDT = (value) => `BDT ${Number(value).toLocaleString("en-BD")}`;
const list = (items, tag = "ul") => (items?.length ? `<${tag}>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</${tag}>` : "");

// Crawler HTML for the guide. Mirrors src/components/ProductGuide.tsx.
export function guideHtml(guide, records) {
  const prices = new Map(records.filter((r) => typeof r.price === "number" && !r.requestPrice).map((r) => [r.tier, r.price]));
  const plans = (guide.plans ?? []).filter((plan) => prices.has(plan.tier));
  const planHtml = plans.length
    ? `<h2>${esc(guide.provider)} plans and prices in Bangladesh</h2>${plans.map((plan) => `<h3>${esc(guide.provider)} ${esc(plan.tier)} — ${fmtBDT(prices.get(plan.tier))} per month</h3>${list(plan.points)}<p>${esc(plan.fit)}</p>`).join("")}<p>${esc(guide.planNote)}</p>`
    : "";
  const sections = (guide.sections ?? []).map((section) => `<h2>${esc(section.heading)}</h2>${(section.paragraphs ?? []).map((p) => `<p>${esc(p)}</p>`).join("")}${list(section.bullets)}${list(section.steps, "ol")}`).join("");
  const faq = `<h2>${esc(guide.provider)} in Bangladesh: questions and answers</h2>${(guide.faq ?? []).map((item) => `<h3>${esc(item.q)}</h3><p>${esc(item.a)}</p>`).join("")}`;
  const sources = `<h2>Sources</h2><p>Provider facts on this page were checked against these ${esc(guide.provider)} pages on ${esc(guide.sourceCheckedOn)}.</p><ul>${(guide.sources ?? []).map((s) => `<li><a href="${esc(s.url)}" rel="nofollow noopener">${esc(s.label)}</a></li>`).join("")}</ul>`;
  return `<p>${esc(guide.summary)}</p>${guide.summaryBN ? `<p lang="bn">${esc(guide.summaryBN)}</p>` : ""}${planHtml}${sections}${faq}${sources}`;
}

export function faqSchema(guide) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (guide.faq ?? []).map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
}
