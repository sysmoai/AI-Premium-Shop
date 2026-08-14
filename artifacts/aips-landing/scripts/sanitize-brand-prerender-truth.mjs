#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(here, "..");
const DIST = path.join(APP, "dist/public");
const WHATSAPP = "https://wa.me/8801865385348";
const publicCatalog = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = Array.isArray(publicCatalog) ? publicCatalog : publicCatalog.products ?? [];
const activeProducts = products.filter((product) => product.publicStatus !== "retired");
const routesSource = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const arrayBlock = routesSource.match(/BRAND_PAGE_SLUGS\s*=\s*\[([\s\S]*?)\]\s*as const/);
if (!arrayBlock) throw new Error("[brand-truth] Could not parse BRAND_PAGE_SLUGS");
const brandSlugs = [...arrayBlock[1].matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
const brandSlugSet = new Set(brandSlugs);
const RETIRED = new Set(["replit-bangladesh"]);

const BLOCKED = [
  /\b30[ -]day\s+warranty\b/i,
  /\b30[ -]day\s+replacement\s+guarantee\b/i,
  /\binstant\s+(?:delivery|access|activation)\b/i,
  /\b5\s*[–-]\s*(?:15|30)\s*(?:min|minutes)(?:\s+delivery)?\b/i,
  /\bauthorized\s+(?:reseller|partner|to offer)\b/i,
  /\bexclusive\s+(?:promotional\s+)?rate\b/i,
  /\b\d{1,3}%\s*off\b/i,
  /\btrusted\s+by\b/i,
  /\bbest[ -]?seller\b/i,
];

const STATIC_STYLE = `
<style id="aips-static-truth-style">
.aips-static{min-height:100vh;background:#0a0e27;color:#fff;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.aips-static *{box-sizing:border-box}.aips-wrap{width:min(1180px,calc(100% - 32px));margin:0 auto}.aips-head{position:sticky;top:0;z-index:10;background:rgba(10,14,39,.94);backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.1)}.aips-nav{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:24px}.aips-brand{font-weight:800;color:#fff;text-decoration:none;font-size:18px;letter-spacing:-.02em}.aips-brand span{color:#f4b942}.aips-links{display:flex;flex-wrap:wrap;gap:16px}.aips-links a,.aips-footer a{color:#c9ceda;text-decoration:none;font-size:14px}.aips-links a:hover,.aips-footer a:hover{color:#fff}.aips-hero{padding:64px 0 36px}.aips-kicker{display:inline-flex;padding:7px 11px;border-radius:999px;border:1px solid rgba(244,185,66,.3);background:rgba(244,185,66,.08);color:#f4b942;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.aips-hero h1{font-size:clamp(34px,6vw,62px);line-height:1.02;letter-spacing:-.045em;margin:18px 0 18px;max-width:920px}.aips-lead{max-width:850px;color:#c9ceda;font-size:17px;line-height:1.75}.aips-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:30px 0 8px}.aips-stat,.aips-card,.aips-panel{background:#151b3d;border:1px solid rgba(255,255,255,.1);border-radius:18px}.aips-stat{padding:18px}.aips-stat strong{display:block;font-size:24px;color:#fff}.aips-stat span{font-size:12px;color:#9ca3af}.aips-section{padding:34px 0}.aips-section h2{font-size:28px;letter-spacing:-.025em;margin:0 0 8px}.aips-section>p{color:#9ca3af;margin:0 0 20px;line-height:1.65}.aips-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.aips-card{padding:20px;transition:transform .18s ease,border-color .18s ease}.aips-card:hover{transform:translateY(-3px);border-color:rgba(244,185,66,.35)}.aips-card h3{font-size:17px;margin:0 0 7px;line-height:1.3}.aips-card p{color:#aeb5c4;font-size:13px;line-height:1.6;margin:0 0 16px}.aips-meta{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.aips-pill{display:inline-flex;padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:#c9ceda;font-size:11px}.aips-price{font-size:18px;font-weight:800;color:#f4b942}.aips-action{display:inline-flex;align-items:center;gap:6px;color:#f4b942;text-decoration:none;font-size:13px;font-weight:700;margin-top:14px}.aips-compare{display:grid;grid-template-columns:1fr 1fr;gap:16px}.aips-panel{padding:24px}.aips-panel h2{font-size:24px;margin:0 0 4px}.aips-panel dl{margin:18px 0 0}.aips-row{display:flex;justify-content:space-between;gap:24px;padding:12px 0;border-top:1px solid rgba(255,255,255,.09)}.aips-row dt{color:#9ca3af;font-size:13px}.aips-row dd{margin:0;color:#fff;text-align:right;font-size:13px;font-weight:700}.aips-checks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.aips-check{padding:18px;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:rgba(21,27,61,.62);color:#c9ceda;font-size:13px;line-height:1.65}.aips-cta{margin:28px 0 54px;padding:24px;border-radius:18px;border:1px solid rgba(16,185,129,.25);background:rgba(16,185,129,.07);display:flex;align-items:center;justify-content:space-between;gap:20px}.aips-cta h2{font-size:20px;margin:0 0 5px}.aips-cta p{margin:0;color:#c9ceda;font-size:13px}.aips-btn{display:inline-flex;padding:12px 16px;border-radius:12px;background:#008236;color:#fff;text-decoration:none;font-weight:800;font-size:13px;white-space:nowrap}.aips-footer{border-top:1px solid rgba(255,255,255,.1);padding:24px 0 40px;color:#7f8798;font-size:12px}.aips-footer .aips-wrap{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}@media(max-width:860px){.aips-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.aips-stats,.aips-checks{grid-template-columns:1fr}.aips-compare{grid-template-columns:1fr}.aips-links{display:none}.aips-cta{align-items:flex-start;flex-direction:column}}@media(max-width:560px){.aips-grid{grid-template-columns:1fr}.aips-hero{padding-top:46px}.aips-wrap{width:min(100% - 24px,1180px)}}
</style>`;

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function baseName(name) {
  return String(name ?? "AI tool").split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
}

function fitTitle(value) {
  if (value.length <= 68) return value;
  const suffix = " | AI Premium Shop";
  const room = Math.max(24, 68 - suffix.length);
  return `${value.slice(0, room - 1).trimEnd()}…${suffix}`;
}

function fitDescription(value) {
  return value.length <= 158 ? value : `${value.slice(0, 157).trimEnd()}…`;
}

function productHref(slug) {
  return brandSlugSet.has(slug) ? `/${slug}` : `/product/${slug}`;
}

function accessLabel(value) {
  if (value === "shared") return "Shared";
  if (value === "personal") return "Personal";
  if (value === "team") return "Team";
  if (value === "bundle") return "Bundle";
  if (["setup-service", "setup", "service"].includes(value)) return "Setup / Service";
  return "Confirm";
}

function groupFamily(slug) {
  const records = activeProducts.filter((product) => product.slug === slug);
  if (!records.length) return null;
  const prices = records.map((record) => record.price).filter((value) => typeof value === "number" && value > 0);
  const access = [...new Set(records.map((record) => record.accessType).filter(Boolean).map(accessLabel))];
  return {
    slug,
    records,
    first: records[0],
    minPrice: prices.length ? Math.min(...prices) : null,
    access,
  };
}

function allFamilies() {
  return [...new Set(activeProducts.map((product) => product.slug))]
    .map(groupFamily)
    .filter(Boolean);
}

function staticHeader() {
  return `<header class="aips-head"><div class="aips-wrap aips-nav"><a class="aips-brand" href="/">AI <span>Premium Shop</span></a><nav class="aips-links" aria-label="Primary"><a href="/products">Products</a><a href="/pricing">Pricing</a><a href="/guides">Guides</a><a href="/blog">Blog</a><a href="/bn">বাংলা</a></nav></div></header>`;
}

function staticFooter() {
  return `<footer class="aips-footer"><div class="aips-wrap"><span>AI Premium Shop · Bangladesh · current public catalog</span><span><a href="/refund-policy">Refund policy</a> · <a href="/terms">Terms</a> · <a href="/privacy-policy">Privacy</a></span></div></footer>`;
}

function removeJsonLd(html) {
  return html.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");
}

function removeRuntime(html) {
  return html
    .replace(/<script\b[^>]*type=["']module["'][^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<script\b[^>]*type=["']module["'][^>]*><\/script>/gi, "")
    .replace(/<link\s+rel=["']modulepreload["'][^>]*>\s*/gi, "");
}

function setMeta(html, title, description, canonical) {
  let next = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/i, `$1${esc(description)}$2`)
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/(<meta property="og:title" content=")[^"]*(")/i, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/i, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/i, `$1${esc(canonical)}$2`)
    .replace(/\s*<meta\s+name=["']robots["'][^>]*>/gi, "");
  return next.replace(/<\/head>/i, `  <link rel="canonical" href="${esc(canonical)}" />\n${STATIC_STYLE}\n</head>`);
}

function replaceRoot(html, body) {
  const match = /<div\s+id=["']root["'][^>]*>/i.exec(html);
  const bodyEnd = html.search(/<\/body>/i);
  if (!match || bodyEnd < 0) throw new Error("[static-truth] cannot replace #root");
  return `${html.slice(0, match.index)}<div id="root">${body}</div>\n${html.slice(bodyEnd)}`;
}

function writeStaticRoute(route, { title, description, body, schema }) {
  const rel = route.replace(/^\//, "").replace(/\/$/, "");
  const file = path.join(DIST, rel, "index.html");
  if (!fs.existsSync(file)) throw new Error(`[static-truth] missing prerender target ${route}`);
  let html = fs.readFileSync(file, "utf8");
  html = removeJsonLd(html);
  html = removeRuntime(html);
  html = setMeta(html, title, description, `https://aipremiumshop.com${route}`);
  html = html.replace(/<\/head>/i, `  <script type="application/ld+json">${JSON.stringify(schema)}</script>\n</head>`);
  html = replaceRoot(html, `<div class="aips-static">${staticHeader()}${body}${staticFooter()}</div>`);
  fs.writeFileSync(file, html, "utf8");
}

const failures = [];
let rewritten = 0;

for (const slug of brandSlugs) {
  const file = path.join(DIST, slug, "index.html");
  if (!fs.existsSync(file)) continue;

  if (RETIRED.has(slug)) {
    const html = fs.readFileSync(file, "utf8")
      .replace(/<title>[\s\S]*?<\/title>/, "<title>Retired Listing | AI Premium Shop</title>")
      .replace(/(<meta name="description" content=")[^"]*(")/, "$1This older listing is no longer part of the current AI Premium Shop catalog. Browse active AI development tools instead.$2")
      .replace(/<link rel="canonical" href="[^"]+" \/?>/g, '<link rel="canonical" href="https://aipremiumshop.com/ai-code" />')
      .replace("</head>", '<meta name="robots" content="noindex, follow" />\n</head>')
      .replace(/<div id="root">[\s\S]*?<\/div>\s*<\/body>/, '<div id="root"><main><h1>This listing has been retired</h1><p>It is no longer part of the current public AIPS catalog.</p><p><a href="/ai-code">Browse active AI development tools</a></p></main></div>\n</body>');
    fs.writeFileSync(file, html, "utf8");
    rewritten++;
    continue;
  }

  const recs = activeProducts.filter((product) => product.slug === slug);
  if (!recs.length) continue;
  const first = recs[0];
  const displayName = baseName(first.name);
  const prices = recs.map((record) => record.price).filter((value) => typeof value === "number" && value > 0);
  const fromPrice = prices.length ? Math.min(...prices) : null;
  const title = fitTitle(`${displayName} Price in Bangladesh | AI Premium Shop`);
  const desc = fitDescription(`${fromPrice ? `${displayName} plans currently start from BDT ${fromPrice.toLocaleString("en-US")}.` : `Check the current ${displayName} price.`} Compare access options and confirm availability, provider limits, delivery ETA and terms before paying in BDT.`);

  let html = fs.readFileSync(file, "utf8")
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);

  for (const pattern of BLOCKED) {
    const match = html.match(pattern);
    if (match) failures.push(`${slug}: blocked brand claim remains in static HTML: "${match[0]}"`);
  }

  fs.writeFileSync(file, html, "utf8");
  rewritten++;
}

const BUDGETS = {
  "/ai-under-500": { max: 500, label: "BDT 500" },
  "/ai-under-1000": { max: 1000, label: "BDT 1,000" },
  "/ai-under-3000": { max: 3000, label: "BDT 3,000" },
};

for (const [route, config] of Object.entries(BUDGETS)) {
  const families = allFamilies()
    .filter((family) => family.minPrice != null && family.minPrice <= config.max)
    .sort((a, b) => a.minPrice - b.minPrice || baseName(a.first.name).localeCompare(baseName(b.first.name)));
  const planCount = activeProducts.filter((product) => typeof product.price === "number" && product.price > 0 && product.price <= config.max).length;
  const cards = families.map((family) => {
    const label = baseName(family.first.name);
    const description = family.first.description ? `<p>${esc(family.first.description)}</p>` : "";
    return `<article class="aips-card"><h3>${esc(label)}</h3>${description}<div class="aips-meta"><span class="aips-pill">${esc(family.access.join(", ") || "Confirm access")}</span><span class="aips-pill">${family.records.length} plan record${family.records.length === 1 ? "" : "s"}</span></div><div class="aips-price">From ${esc(`BDT ${family.minPrice.toLocaleString("en-US")}`)}</div><a class="aips-action" href="${productHref(family.slug)}">View current details →</a></article>`;
  }).join("");
  const title = `AI Tools Under ${config.label} in Bangladesh | AIPS`;
  const description = fitDescription(`Browse ${planCount} current fixed-price AIPS plan records at or below ${config.label}, across ${families.length} AI tool families. Confirm access, availability, delivery ETA and terms before payment.`);
  const body = `<main><section class="aips-hero"><div class="aips-wrap"><span class="aips-kicker">Live budget filter</span><h1>AI Tools Under ${esc(config.label)} in Bangladesh</h1><p class="aips-lead">This page is generated from the current fixed-price public AIPS catalog. It does not infer provider discounts or rank a universal winner. Confirm provider limits, current availability, delivery ETA and applicable terms before payment.</p><div class="aips-stats"><div class="aips-stat"><strong>${planCount}</strong><span>fixed-price plan records</span></div><div class="aips-stat"><strong>${families.length}</strong><span>tool families represented</span></div><div class="aips-stat"><strong>${families[0] ? `BDT ${families[0].minPrice.toLocaleString("en-US")}` : "—"}</strong><span>lowest current published price</span></div></div></div></section><section class="aips-section"><div class="aips-wrap"><h2>Current plans within this threshold</h2><p>Price is only one filter. Check the access model and provider-controlled limits for the exact plan.</p><div class="aips-grid">${cards || '<div class="aips-panel" style="padding:24px">No current fixed-price plans are published in this threshold.</div>'}</div></div></section><section class="aips-section"><div class="aips-wrap"><h2>Choose without hidden assumptions</h2><div class="aips-checks"><div class="aips-check"><strong>Check access.</strong><br>Shared, personal, team, bundle and service arrangements have different privacy and operational implications.</div><div class="aips-check"><strong>Check provider limits.</strong><br>Credits, quotas, exports, models and integrations can change independently of the AIPS catalog price.</div><div class="aips-check"><strong>Confirm the order.</strong><br>Confirm current availability, delivery ETA and applicable terms before payment.</div></div><div class="aips-cta"><div><h2>Need a workflow-based recommendation?</h2><p>Tell us the job, privacy requirement and budget; then confirm the exact commercial details before payment.</p></div><a class="aips-btn" href="${WHATSAPP}?text=${encodeURIComponent(`Hi, help me choose an AI tool under ${config.label}. Please confirm current price, access model, availability, provider limits, delivery ETA and terms before payment.`)}">Ask on WhatsApp</a></div></div></section></main>`;
  writeStaticRoute(route, {
    title,
    description,
    body,
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", name: title, url: `https://aipremiumshop.com${route}`, description, numberOfItems: families.length },
  });
}

const COMPARISONS = {
  "/chatgpt-vs-claude": ["chatgpt-plus-bangladesh", "claude-pro-bangladesh", "ChatGPT Plus", "Claude"],
  "/chatgpt-vs-gemini": ["chatgpt-plus-bangladesh", "gemini-advanced-bangladesh", "ChatGPT Plus", "Google AI Pro"],
  "/chatgpt-vs-perplexity": ["chatgpt-plus-bangladesh", "perplexity-pro-bangladesh", "ChatGPT Plus", "Perplexity Pro"],
  "/claude-vs-gemini": ["claude-pro-bangladesh", "gemini-advanced-bangladesh", "Claude", "Google AI Pro"],
  "/canva-vs-adobe-express": ["canva-pro-bangladesh", "adobe-express-premium-bangladesh", "Canva Pro", "Adobe Express Premium"],
  "/copilot-vs-cursor": ["github-copilot-bangladesh", "cursor-bangladesh", "GitHub Copilot", "Cursor"],
  "/midjourney-vs-ideogram": ["midjourney-bangladesh", "ideogram-bangladesh", "Midjourney", "Ideogram"],
};

function comparisonPanel(family, label) {
  if (!family) throw new Error(`[comparison-truth] missing current catalog family ${label}`);
  const description = family.first.description ? `<p style="color:#c9ceda;line-height:1.65">${esc(family.first.description)}</p>` : "";
  return `<article class="aips-panel"><h2>${esc(label)}</h2>${description}<dl><div class="aips-row"><dt>Lowest published AIPS price</dt><dd>${family.minPrice ? `BDT ${family.minPrice.toLocaleString("en-US")}/mo` : "Current price on request"}</dd></div><div class="aips-row"><dt>Published access modes</dt><dd>${esc(family.access.join(", ") || "Confirm before payment")}</dd></div><div class="aips-row"><dt>Current plan records</dt><dd>${family.records.length}</dd></div></dl><a class="aips-action" href="${productHref(family.slug)}">View current details →</a></article>`;
}

for (const [route, [slugA, slugB, labelA, labelB]] of Object.entries(COMPARISONS)) {
  const a = groupFamily(slugA);
  const b = groupFamily(slugB);
  const title = fitTitle(`${labelA} vs ${labelB} in Bangladesh | Current Comparison`);
  const description = fitDescription(`Compare current AIPS catalog records for ${labelA} and ${labelB}: published BDT prices and access modes. Check provider features and limits against current provider terms before payment.`);
  const body = `<main><section class="aips-hero"><div class="aips-wrap"><span class="aips-kicker">Current catalog comparison</span><h1>${esc(labelA)} vs ${esc(labelB)} in Bangladesh</h1><p class="aips-lead">Compare what AI Premium Shop can currently verify from its own public catalog: published BDT price and access model. Provider-controlled models, quotas, credits, storage and feature limits can change, so check the current provider plan before purchase.</p></div></section><section class="aips-section"><div class="aips-wrap"><div class="aips-compare">${comparisonPanel(a, labelA)}${comparisonPanel(b, labelB)}</div></div></section><section class="aips-section"><div class="aips-wrap"><h2>How to decide without stale hype</h2><div class="aips-checks"><div class="aips-check"><strong>Start with access.</strong><br>Choose the access model appropriate to your privacy, client and collaboration requirements.</div><div class="aips-check"><strong>Check the provider today.</strong><br>Confirm the exact models, quotas, credits and provider-controlled features on the plan you are considering.</div><div class="aips-check"><strong>Confirm the order.</strong><br>Confirm AIPS price, availability, delivery ETA and applicable terms for the exact plan before payment.</div></div><div class="aips-cta"><div><h2>Need a current side-by-side recommendation?</h2><p>Tell us your workflow and privacy requirements; we will confirm the current commercial details before payment.</p></div><a class="aips-btn" href="${WHATSAPP}?text=${encodeURIComponent(`Hi, please compare ${labelA} vs ${labelB} for my use case. Confirm current AIPS price, access model, availability, provider limits, delivery ETA and terms before payment.`)}">Ask on WhatsApp</a></div></div></section></main>`;
  writeStaticRoute(route, {
    title,
    description,
    body,
    schema: { "@context": "https://schema.org", "@type": "WebPage", name: title, url: `https://aipremiumshop.com${route}`, description, about: [labelA, labelB] },
  });
}

const sitemapPath = path.join(DIST, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) throw new Error("[sitemap-truth] deployed sitemap missing");
let sitemap = fs.readFileSync(sitemapPath, "utf8");
const DROP_FROM_SITEMAP = [
  "/replit-bangladesh",
  "/product/replit-bangladesh",
  "/chatgpt-vs-claude-bangladesh",
  "/chatgpt-plans-comparison-bangladesh",
  "/google-ai-pro-bangladesh",
  "/best-ai-budget-bangladesh",
];
for (const route of DROP_FROM_SITEMAP) {
  const url = `https://aipremiumshop.com${route}`;
  const block = new RegExp(`\\s*<url>\\s*<loc>${escapeRegex(url)}<\\/loc>[\\s\\S]*?<\\/url>`, "g");
  sitemap = sitemap.replace(block, "");
}
for (const route of DROP_FROM_SITEMAP) {
  if (sitemap.includes(`https://aipremiumshop.com${route}`)) failures.push(`sitemap still contains redirect/retired route ${route}`);
}
fs.writeFileSync(sitemapPath, sitemap, "utf8");
const sitemapCount = (sitemap.match(/<loc>/g) ?? []).length;

for (const route of [...Object.keys(BUDGETS), ...Object.keys(COMPARISONS)]) {
  const file = path.join(DIST, route.replace(/^\//, ""), "index.html");
  const html = fs.readFileSync(file, "utf8");
  for (const pattern of BLOCKED) {
    const match = html.match(pattern);
    if (match) failures.push(`${route}: blocked static commercial claim remains: "${match[0]}"`);
  }
  if (/type=["']module["']/i.test(html)) failures.push(`${route}: legacy React runtime still attached to governed static page`);
  if (/replit-bangladesh/i.test(html)) failures.push(`${route}: retired Replit reference remains`);
}

if (failures.length) {
  console.error(`[brand-truth] FAIL: ${failures.length} issue(s)`);
  for (const failure of failures.slice(0, 100)) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`[brand-truth] PASS: ${rewritten} brand pages + ${Object.keys(BUDGETS).length} budget pages + ${Object.keys(COMPARISONS).length} comparison pages governed; deployed sitemap pruned to ${sitemapCount} canonical URLs`);