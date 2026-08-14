#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";
const route = "/best-ai-subscription-2026";
const file = path.join(DIST, route.slice(1), "index.html");
const projection = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = (Array.isArray(projection) ? projection : projection.products ?? [])
  .filter((product) => product.publicStatus !== "retired" && product.slug !== "replit-bangladesh");

const CATEGORY_META = {
  "ai-assistant": { label: "AI Chat & Assistants", href: "/ai-assistant" },
  "ai-image": { label: "AI Image & Design", href: "/ai-image" },
  "ai-video": { label: "AI Video", href: "/ai-video" },
  "ai-voice-music": { label: "AI Voice & Music", href: "/ai-voice-music" },
  "ai-code": { label: "AI Code & Development", href: "/ai-code" },
  "ai-workspace": { label: "AI Workspace", href: "/ai-workspace" },
  "ai-writing": { label: "AI Writing & SEO", href: "/ai-writing" },
  "ai-design": { label: "AI Design & Creative", href: "/ai-design" },
  bundles: { label: "Bundles & Services", href: "/bundles" },
};

const BLOCKED = [
  "top 10", "#1", "number one ai", "best value", "highest roi", "top pick", "cheapest", "best for developers", "best for images", "best for research",
  "30-day warranty", "30 day warranty", "instant delivery", "fast delivery", "5-15 min", "5–15 min", "5-30 min", "5–30 min",
  "no international card", "no intl card", "bkash", "nagad", "rocket", "% off", "official price", "gpt-5.4", "1m token", "300 premium model requests", "unlimited", "replit"
];

const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtBDT = (value) => `BDT ${Number(value).toLocaleString("en-BD")}`;

function categoryRows() {
  return Object.entries(CATEGORY_META).map(([category, meta]) => {
    const records = products.filter((product) => product.category === category);
    const families = new Set(records.map((product) => product.slug));
    const prices = records
      .filter((product) => !product.requestPrice && typeof product.price === "number" && Number.isFinite(product.price) && product.price > 0)
      .map((product) => product.price);
    return { category, meta, families: families.size, plans: records.length, minPrice: prices.length ? Math.min(...prices) : null };
  });
}

function removeUnsafeJsonLd(html) {
  return html.replace(/\s*<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, (block, json) => {
    const lower = json.toLowerCase();
    return lower.includes('"faqpage"') || lower.includes('"product"') || lower.includes('"itemlist"') ? "" : block;
  });
}

function setMeta(html, title, description, canonical) {
  let next = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/i, `$1${esc(description)}$2`)
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/(<meta property="og:title" content=")[^"]*(")/i, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/i, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/i, `$1${esc(canonical)}$2`);
  return next.replace(/<\/head>/i, `  <link rel="canonical" href="${esc(canonical)}" />\n</head>`);
}

function replaceRoot(html, body) {
  const root = /<div\s+id=["']root["'][^>]*>/i.exec(html);
  const bodyEnd = html.search(/<\/body>/i);
  if (!root || bodyEnd < 0) throw new Error("[best-subscription-truth] cannot replace #root");
  return `${html.slice(0, root.index)}<div id="root"><div id="prerender-shell">${body}</div></div>\n  ${html.slice(bodyEnd)}`;
}

if (!fs.existsSync(file)) throw new Error(`[best-subscription-truth] missing generated route ${route}`);
const rows = categoryRows();
const title = "Best AI Subscription in Bangladesh 2026 | How to Choose";
const description = "How to choose an AI subscription in Bangladesh in 2026 using current AIPS workflow categories, published BDT prices and access models—not stale rankings or provider-limit claims.";
const canonical = `${SITE}${route}`;
const rowHtml = rows.map((row) => `<li><strong><a href="${esc(row.meta.href)}">${esc(row.meta.label)}</a></strong> — ${row.families} catalog families · ${row.plans} plan records · ${row.minPrice ? `fixed AIPS prices from ${esc(fmtBDT(row.minPrice))}` : "current price on request"}</li>`).join("");
const body = `<main>
<nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="/guides">Guides</a> › AI subscription guide 2026</nav>
<h1>How to Choose the Best AI Subscription in Bangladesh</h1>
<p>There is no single objectively best subscription for every user. Start with the workflow you need, choose an access model appropriate to your data, compare current published AIPS prices, and verify provider-controlled details for the exact plan.</p>
<h2>Use a four-part decision test</h2>
<ol><li>Start with the workflow you need to solve.</li><li>Choose an access model appropriate to the data and work.</li><li>Compare current published AIPS BDT prices.</li><li>Verify current provider-controlled models, credits, quotas, storage, exports, integrations and other limits for the exact plan.</li></ol>
<h2>Current catalog categories</h2><ul>${rowHtml}</ul>
<h2>What this guide does not claim</h2>
<p>This is not a universal product ranking. It does not infer provider discounts, ROI, fixed delivery times or current provider entitlements. Confirm AIPS price, access model, availability, delivery ETA and applicable terms for the exact order.</p>
<p><a href="/pricing">Current pricing</a> · <a href="/products">All AI tools</a> · <a href="/guides">Decision guides</a></p>
</main>`;

let html = fs.readFileSync(file, "utf8");
html = removeUnsafeJsonLd(html);
html = setMeta(html, title, description, canonical);
html = replaceRoot(html, body);

const lower = html.toLowerCase();
for (const phrase of BLOCKED) {
  if (lower.includes(phrase.toLowerCase())) throw new Error(`[best-subscription-truth] ${route} still contains blocked phrase: ${phrase}`);
}
if (!/<script\s+type=["']module["']/i.test(html)) throw new Error(`[best-subscription-truth] ${route} lost React runtime module script`);
if (!lower.includes(`rel="canonical" href="${canonical.toLowerCase()}"`)) throw new Error(`[best-subscription-truth] ${route} canonical mismatch`);
fs.writeFileSync(file, html, "utf8");
console.log("[best-subscription-truth] sanitized best AI subscription crawler page");
