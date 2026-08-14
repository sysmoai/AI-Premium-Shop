#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const PRODUCT_DIR = path.join(DIST, "product");
const SITE = "https://aipremiumshop.com";
const RETIRED = new Set(["replit-bangladesh"]);
const SPECIAL_COMPLIANCE = new Set(["higgsfield-ai-bangladesh"]);
const { products } = JSON.parse(fs.readFileSync(path.join(APP, "data/products.json"), "utf8"));

const BLOCKED = [
  "30-day warranty",
  "30 day warranty",
  "replacement guarantee",
  "money-back",
  "instant delivery",
  "instant access",
  "fast delivery",
  "5-15 min",
  "5–15 min",
  "5-30 min",
  "5–30 min",
  "trusted by",
  "10,000+ customers",
  "best seller",
  "bestseller",
  "best value",
  "% off",
  "authorized reseller",
  "official reseller",
  "authentic subscription",
  "no international card",
  "nobody can see anyone else's",
];
const unsafeUnlimited = /\bunlimited\b/i;
const unlimitedScope = /\b(fair[ -]?use|provider\s+limit|subject\s+to|credit|usage\s+limit|rate\s+limit|limits?\s+apply)\b/i;

const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtBDT = (value) => `BDT ${Number(value).toLocaleString("en-BD")}`;
const cleanName = (value) => String(value ?? "AI tool").split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
const accessLabel = (value) => value === "shared" ? "Shared access" : value === "team" ? "Team access" : value === "bundle" ? "Bundle" : value === "setup-service" ? "Setup / service" : "Personal access";

function fitTitle(value) {
  if (value.length <= 70) return value;
  const suffix = " | AI Premium Shop";
  const stem = value.endsWith(suffix) ? value.slice(0, -suffix.length) : value;
  const available = 69 - suffix.length;
  return `${stem.slice(0, Math.max(24, available)).trimEnd()}…${suffix}`;
}

function fitDescription(value) {
  return value.length <= 158 ? value : `${value.slice(0, 157).trimEnd()}…`;
}

function unsafe(value) {
  const text = String(value ?? "").trim();
  if (!text) return false;
  const lower = text.toLowerCase();
  if (BLOCKED.some((phrase) => lower.includes(phrase))) return true;
  return unsafeUnlimited.test(text) && !unlimitedScope.test(text);
}

function sanitizeProse(value, fallback) {
  const sentences = String(value ?? "")
    .split(/(?<=[.!?।])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .filter((sentence) => !unsafe(sentence));
  return sentences.length ? sentences.join(" ") : fallback;
}

function replaceMeta(html, title, description, canonical) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${esc(description)}$2`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${esc(canonical)}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${esc(canonical)}" />`)
    .replace(/\s*<meta\s+http-equiv="last-modified"[^>]*>/gi, "");
}

function removeUnsafeStructuredData(html) {
  return html.replace(/\s*<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi, (block, json) => {
    const lower = json.toLowerCase();
    if (lower.includes('"faqpage"') || lower.includes('"product"') || lower.includes('"softwareapplication"')) return "";
    return block;
  });
}

if (!fs.existsSync(PRODUCT_DIR)) {
  console.log("[product-truth] no generated /product directory; nothing to sanitize");
  process.exit(0);
}

let rewritten = 0;
for (const entry of fs.readdirSync(PRODUCT_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const slug = entry.name;
  if (RETIRED.has(slug) || SPECIAL_COMPLIANCE.has(slug)) continue;
  const file = path.join(PRODUCT_DIR, slug, "index.html");
  if (!fs.existsSync(file)) continue;

  const records = products.filter((record) => record.slug === slug && !RETIRED.has(record.slug));
  if (!records.length) continue;
  const main = records[0];
  const name = cleanName(main.name);
  const fixed = records
    .filter((record) => !record.requestPrice && typeof record.price === "number" && Number.isFinite(record.price) && record.price > 0)
    .sort((a, b) => a.price - b.price || String(a.tier ?? a.name).localeCompare(String(b.tier ?? b.name)));
  const fromPrice = fixed[0]?.price ?? null;
  const canonical = `${SITE}/product/${slug}`;
  const title = fitTitle(`${name} Price in Bangladesh | AI Premium Shop`);
  const description = fitDescription(fromPrice
    ? `${name} AIPS plans start from ${fmtBDT(fromPrice)}. Compare access and confirm availability, provider limits, delivery ETA and terms before payment.`
    : `${name} current AIPS price is confirmed on request. Compare access and confirm availability, provider limits, delivery ETA and terms before payment.`);
  const safeDescription = sanitizeProse(main.description, `${name} is listed in the current AI Premium Shop catalog. Review current plan and access details before purchase.`);

  const planRows = fixed.map((record) => `<li><strong>${esc(record.tier ?? record.name ?? "Plan")}</strong> — ${fmtBDT(record.price)} · ${esc(accessLabel(record.accessType))}</li>`).join("");
  const body = `<main>
<nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="/${esc(main.category)}">${esc(main.category)}</a> › ${esc(name)}</nav>
<h1>${esc(name)}</h1>
<p>${esc(safeDescription)}</p>
<p>${fromPrice ? `Published AIPS plan prices start from <strong>${fmtBDT(fromPrice)}</strong>.` : "This listing does not publish a fixed price."}</p>
${planRows ? `<h2>Current public plans</h2><ul>${planRows}</ul>` : `<h2>Current plan details</h2><p>Confirm the current price and plan details before payment.</p>`}
<h2>Provider-controlled details</h2>
<p>Models, credits, quotas, storage, export quality, integrations, licensing and other provider-controlled entitlements can change by plan or account. Verify the exact current entitlements for the plan you intend to use instead of inferring them from the product name or price.</p>
<h2>Before payment</h2>
<ul><li>Confirm the exact access model.</li><li>Confirm current availability and delivery ETA.</li><li>Check provider-controlled credits, quotas, storage and usage limits for the exact plan.</li><li>Confirm applicable order, refund and replacement terms.</li></ul>
<p><a href="/products">Browse all AI tools</a> · <a href="/pricing">Compare current pricing</a> · <a href="/how-to-order">How to order</a></p>
</main>`;

  let html = fs.readFileSync(file, "utf8");
  html = replaceMeta(html, title, description, canonical);
  html = removeUnsafeStructuredData(html);
  html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<\/div>\s*<\/body>/i, `<div id="root"><div id="prerender-shell">${body}</div></div>\n  </body>`);

  const lower = html.toLowerCase();
  for (const phrase of BLOCKED) {
    if (lower.includes(phrase)) throw new Error(`[product-truth] ${slug} still contains blocked phrase: ${phrase}`);
  }
  if (unsafeUnlimited.test(html) && !unlimitedScope.test(html)) throw new Error(`[product-truth] ${slug} still contains unscoped unlimited`);
  if (/"availability"\s*:\s*"https:\/\/schema\.org\/instock"/i.test(html)) throw new Error(`[product-truth] ${slug} still contains synthetic InStock schema`);
  if (/"@type"\s*:\s*"FAQPage"/i.test(html)) throw new Error(`[product-truth] ${slug} still contains FAQPage schema`);
  if (title.length > 70) throw new Error(`[product-truth] ${slug} title exceeds 70 chars`);
  if (description.length > 158) throw new Error(`[product-truth] ${slug} description exceeds 158 chars`);

  fs.writeFileSync(file, html, "utf8");
  rewritten += 1;
}

console.log(`[product-truth] sanitized ${rewritten} generic product crawler pages`);
