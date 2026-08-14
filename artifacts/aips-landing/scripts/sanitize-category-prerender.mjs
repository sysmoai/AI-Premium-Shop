#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";
const projection = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = (Array.isArray(projection) ? projection : projection.products ?? [])
  .filter((product) => product.publicStatus !== "retired" && product.slug !== "replit-bangladesh");
const routesSource = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...routesSource.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]));

const CATEGORIES = {
  "ai-assistant": { heading: "AI Assistants & Chat", title: "AI Assistants in Bangladesh — Current BDT Prices | AIPS", description: "Compare current AI assistant catalog families, published AIPS BDT prices and access models. Confirm provider limits, availability, delivery ETA and terms before payment." },
  "ai-image": { heading: "AI Image & Design", title: "AI Image Tools in Bangladesh — Current BDT Prices | AIPS", description: "Compare current AI image catalog families, published AIPS BDT prices and access models. Verify provider credits, licensing, exports and plan limits before payment." },
  "ai-video": { heading: "AI Video", title: "AI Video Tools in Bangladesh — Current BDT Prices | AIPS", description: "Compare current AI video catalog families, published AIPS BDT prices and access models. Verify provider credits, exports, availability and plan limits before payment." },
  "ai-voice-music": { heading: "AI Voice & Music", title: "AI Voice & Music Tools Bangladesh — BDT Prices | AIPS", description: "Compare current AI voice and music catalog families, published AIPS BDT prices and access models. Verify provider credits, rights, limits and availability before payment." },
  "ai-code": { heading: "AI Code & Development", title: "AI Coding Tools in Bangladesh — Current BDT Prices | AIPS", description: "Compare current AI coding catalog families, published AIPS BDT prices and access models. Verify provider models, quotas, repository privacy and availability before payment." },
  "ai-workspace": { heading: "AI Workspace", title: "AI Workspace Tools Bangladesh — Current BDT Prices | AIPS", description: "Compare current AI workspace catalog families, published AIPS BDT prices and access models. Verify provider collaboration, storage, privacy and plan limits before payment." },
  "ai-writing": { heading: "AI Writing & SEO", title: "AI Writing & SEO Tools Bangladesh — BDT Prices | AIPS", description: "Compare current AI writing and SEO catalog families, published AIPS BDT prices and access models. Verify provider limits, sources and integrations before payment." },
  "ai-design": { heading: "AI Design & Creative", title: "AI Design Tools in Bangladesh — Current BDT Prices | AIPS", description: "Compare current AI design catalog families, published AIPS BDT prices and access models. Verify provider licensing, exports, collaboration and plan limits before payment." },
  bundles: { heading: "Bundles & Services", title: "AI Bundles & Services Bangladesh — Current BDT Prices | AIPS", description: "Compare current AIPS bundles and setup-service catalog records by published BDT price and access model. Confirm exact inclusions, availability, delivery ETA and terms before payment." },
};

const BLOCKED = [
  "30-day warranty", "30 day warranty", "replacement guarantee", "instant delivery", "instant access", "fast delivery",
  "5-15 min", "5–15 min", "5-30 min", "5–30 min", "30-60 min", "30–60 min", "2-4 hours", "2–4 hours",
  "no international card", "no intl card", "no chat history sharing", "full privacy", "best value", "top choice", "bestseller", "best seller",
  "% off", "save ৳", "save bdt", "gpt-5.4", "opus 5", "gen-4", "unlimited", "commercial licensing", "royalty-free",
  "bkash", "nagad", "rocket", "replit"
];

const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtBDT = (value) => `BDT ${Number(value).toLocaleString("en-BD")}`;
const baseName = (value) => String(value ?? "AI tool").split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();

function slugLabel(slug) {
  const acronyms = { ai: "AI", api: "API", seo: "SEO", chatgpt: "ChatGPT", github: "GitHub", pdf: "PDF" };
  return slug.replace(/-bangladesh$/, "").split("-").map((part) => acronyms[part] ?? (part === "v0" ? "v0" : `${part.charAt(0).toUpperCase()}${part.slice(1)}`)).join(" ");
}

function safeLabel(record) {
  const candidate = baseName(record.name);
  return /\b(unlimited|bestseller|best seller)\b/i.test(candidate) ? slugLabel(record.slug) : candidate;
}

function accessLabel(value) {
  if (value === "shared") return "Shared";
  if (value === "personal") return "Personal";
  if (value === "team") return "Team";
  if (value === "bundle") return "Bundle";
  if (["setup-service", "setup", "service"].includes(value ?? "")) return "Setup / service";
  return "Confirm";
}

function productHref(slug) {
  return brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`;
}

function familiesFor(category) {
  const groups = new Map();
  for (const product of products) {
    if (product.category !== category) continue;
    if (!groups.has(product.slug)) groups.set(product.slug, []);
    groups.get(product.slug).push(product);
  }
  return [...groups.entries()].map(([slug, records]) => {
    const first = records[0];
    const prices = records
      .filter((record) => !record.requestPrice && typeof record.price === "number" && Number.isFinite(record.price) && record.price > 0)
      .map((record) => record.price);
    return {
      slug,
      label: safeLabel(first),
      planCount: records.length,
      minPrice: prices.length ? Math.min(...prices) : null,
      access: [...new Set(records.map((record) => accessLabel(record.accessType)))],
    };
  }).sort((a, b) => (a.minPrice ?? Infinity) - (b.minPrice ?? Infinity) || a.label.localeCompare(b.label));
}

function removeUnsafeJsonLd(html) {
  return html.replace(/\s*<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, (block, json) => {
    const lower = json.toLowerCase();
    return lower.includes('"faqpage"') || lower.includes('"product"') ? "" : block;
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
  if (!root || bodyEnd < 0) throw new Error("[category-truth] cannot replace #root");
  return `${html.slice(0, root.index)}<div id="root"><div id="prerender-shell">${body}</div></div>\n  ${html.slice(bodyEnd)}`;
}

let rewritten = 0;
for (const [category, meta] of Object.entries(CATEGORIES)) {
  const route = category === "bundles" ? "/bundles" : `/${category}`;
  const file = path.join(DIST, route.slice(1), "index.html");
  if (!fs.existsSync(file)) throw new Error(`[category-truth] missing generated route ${route}`);
  const families = familiesFor(category);
  const list = families.map((family) => {
    const price = family.minPrice ? `From ${fmtBDT(family.minPrice)}` : "Current price on request";
    return `<li><strong><a href="${esc(productHref(family.slug))}">${esc(family.label)}</a></strong> — ${esc(price)} · ${esc(family.access.join(", "))} · ${family.planCount} plan record${family.planCount === 1 ? "" : "s"}</li>`;
  }).join("");
  const body = `<main><nav aria-label="breadcrumb"><a href="/">Home</a> › ${esc(meta.heading)}</nav><h1>${esc(meta.heading)}</h1><p>Browse current public AIPS catalog families in this category. Compare published AIPS entry prices and access models; provider-controlled features, credits, quotas, licensing and limits must be checked for the exact plan.</p><p>${families.length} current catalog families.</p><h2>Current catalog families</h2>${list ? `<ul>${list}</ul>` : "<p>No current public catalog families are published in this category.</p>"}<h2>Before choosing</h2><ul><li>Choose an access model appropriate to your data and workflow.</li><li>Verify provider-controlled features and limits for the exact plan.</li><li>Confirm current availability, delivery ETA and applicable terms before payment.</li></ul><p><a href="/products">All AI tools</a> · <a href="/pricing">Current pricing</a> · <a href="/guides">Decision guides</a></p></main>`;

  let html = fs.readFileSync(file, "utf8");
  html = removeUnsafeJsonLd(html);
  html = setMeta(html, meta.title, meta.description, `${SITE}${route}`);
  html = replaceRoot(html, body);

  const lower = html.toLowerCase();
  for (const phrase of BLOCKED) {
    if (lower.includes(phrase.toLowerCase())) throw new Error(`[category-truth] ${route} still contains blocked phrase: ${phrase}`);
  }
  if (/"@type"\s*:\s*"FAQPage"/i.test(html)) throw new Error(`[category-truth] ${route} still contains FAQPage schema`);
  if (!/<script\s+type=["']module["']/i.test(html)) throw new Error(`[category-truth] ${route} lost React runtime module script`);
  if (!lower.includes(`rel="canonical" href="${SITE.toLowerCase()}${route}"`)) throw new Error(`[category-truth] ${route} canonical mismatch`);

  fs.writeFileSync(file, html, "utf8");
  rewritten += 1;
}

if (rewritten !== Object.keys(CATEGORIES).length) throw new Error(`[category-truth] sanitized ${rewritten}/${Object.keys(CATEGORIES).length} category pages`);
console.log(`[category-truth] sanitized ${rewritten} category crawler pages`);
