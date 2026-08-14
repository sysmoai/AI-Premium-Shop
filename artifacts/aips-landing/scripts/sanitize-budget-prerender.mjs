#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";
const RETIRED = new Set(["replit-bangladesh"]);
const { products } = JSON.parse(fs.readFileSync(path.join(APP, "data/products.json"), "utf8"));
const productRoutes = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...productRoutes.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]));

const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtBDT = (value) => `BDT ${Number(value).toLocaleString("en-BD")}`;
const productHref = (slug) => brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`;

const DEFINITIONS = {
  "ai-under-500": { limit: 500, label: "BDT 500" },
  "ai-under-1000": { limit: 1000, label: "BDT 1,000" },
  "ai-under-3000": { limit: 3000, label: "BDT 3,000" },
};

const BLOCKED = [
  "30-day warranty",
  "30 day warranty",
  "5-30 min",
  "5–30 min",
  "fast delivery",
  "cheapest premium ai",
  "best value",
  "biggest savings",
  "official price",
  "% off",
  "replit-bangladesh",
];

function replaceMeta(html, key, value) {
  if (key === "title") return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(value)}</title>`);
  if (key === "description") return html.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${esc(value)}$2`);
  return html;
}

function rewriteRoute(route, title, description, body, canonical = `${SITE}${route}`) {
  const file = path.join(DIST, route.replace(/^\//, ""), "index.html");
  if (!fs.existsSync(file)) throw new Error(`budget truth: generated route missing ${route}`);
  let html = fs.readFileSync(file, "utf8");
  html = replaceMeta(html, "title", title);
  html = replaceMeta(html, "description", description);
  html = html
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${esc(canonical)}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${esc(canonical)}" />`)
    .replace(/<div id="root">[\s\S]*?<\/div>\s*<\/div>\s*<\/body>/i, `<div id="root"><div id="prerender-shell">${body}</div></div>\n  </body>`);

  const lower = html.toLowerCase();
  for (const phrase of BLOCKED) {
    if (lower.includes(phrase.toLowerCase())) throw new Error(`budget truth: ${route} still contains blocked phrase ${phrase}`);
  }
  fs.writeFileSync(file, html, "utf8");
}

for (const [key, definition] of Object.entries(DEFINITIONS)) {
  const records = products
    .filter((product) =>
      !RETIRED.has(product.slug) &&
      !product.requestPrice &&
      typeof product.price === "number" &&
      product.price > 0 &&
      product.price <= definition.limit)
    .sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
  const families = new Set(records.map((product) => product.slug)).size;
  const minPrice = records[0]?.price ?? null;
  const title = `AI Tools Under ${definition.label} in Bangladesh | AIPS`;
  const description = `Browse current fixed-price AIPS plans at or below ${definition.label}. Compare published BDT price and access model, then confirm availability, provider limits, delivery ETA and terms before payment.`;
  const list = records.map((product) => `<li><a href="${esc(productHref(product.slug))}">${esc(product.name)}</a> — ${fmtBDT(product.price)} · ${esc(product.accessType ?? "confirm access")}</li>`).join("");
  const body = `<main>
<h1>AI Tools Under ${esc(definition.label)}</h1>
<p>This page filters the current fixed-price public AIPS catalog by published price. It does not calculate unofficial discounts, provider savings, rankings, or universal delivery and warranty promises.</p>
<p><strong>${records.length}</strong> fixed-price plan records across <strong>${families}</strong> tool families${minPrice ? `; lowest current published price ${fmtBDT(minPrice)}` : ""}.</p>
<h2>Current plans within this threshold</h2>
${list ? `<ul>${list}</ul>` : `<p>No current fixed-price plans are published within this threshold.</p>`}
<h2>Before you pay</h2>
<ul><li>Confirm the exact access model.</li><li>Check current provider-controlled credits, quotas and feature limits.</li><li>Confirm current availability, delivery ETA and applicable order terms.</li></ul>
<p><a href="/pricing">Compare current pricing</a> · <a href="/products">Browse all AI tools</a> · <a href="/guides">Decision guides</a></p>
</main>`;
  rewriteRoute(`/${key}`, title, description, body);
  console.log(`[budget-truth] ${key}: ${records.length} plans / ${families} families`);
}

// This URL is a permanent redirect at Vercel, but keep the generated fallback
// harmless in development/static-host contexts as well.
rewriteRoute(
  "/best-ai-budget-bangladesh",
  "AI Tools Under BDT 500 in Bangladesh | AIPS",
  "Compare the current AIPS fixed-price catalog at or below BDT 500, then confirm access, availability, provider limits, delivery ETA and terms before payment.",
  `<main><h1>AI Tools Under BDT 500</h1><p>This legacy URL consolidates into the current budget filter.</p><p><a href="/ai-under-500">Open the current BDT 500 budget filter</a></p></main>`,
  `${SITE}/ai-under-500`,
);
