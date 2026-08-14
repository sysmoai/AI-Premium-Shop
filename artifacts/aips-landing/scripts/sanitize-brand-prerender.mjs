#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const publicCatalog = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = (Array.isArray(publicCatalog) ? publicCatalog : publicCatalog.products ?? []).filter((product) => product.publicStatus !== "retired");
const routesSource = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const block = routesSource.match(/BRAND_PAGE_SLUGS\s*=\s*\[([\s\S]*?)\]\s*as const/);
if (!block) throw new Error("[brand-truth] cannot parse BRAND_PAGE_SLUGS");
const brandSlugs = [...block[1].matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
const retired = new Set(["replit-bangladesh"]);

const BLOCKED = [
  "30-day warranty", "30 day warranty", "replacement guarantee", "instant delivery", "instant access",
  "5-15 min", "5–15 min", "5-30 min", "5–30 min", "trusted by", "best seller", "bestseller",
  "best value", "% off", "authorized reseller", "official reseller", "exclusive promotional rate",
  "no intl card", "no international card", "gpt-5.4", "your conversations are private from other users",
];
const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const nameOf = (value) => String(value ?? "AI tool").split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
const money = (value) => `BDT ${Number(value).toLocaleString("en-BD")}`;
const access = (value) => value === "shared" ? "Shared access" : value === "team" ? "Team access" : value === "bundle" ? "Bundle" : ["setup-service", "setup", "service"].includes(value) ? "Setup / service" : "Personal access";
const fit = (value, max) => value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;
const scopedTier = (value) => /\bunlimited\b/i.test(String(value ?? "")) ? `${value} (provider limits apply)` : value;

function recordsFor(slug) {
  const direct = products.filter((product) => product.slug === slug);
  if (direct.length) return direct;
  if (slug === "chatgpt-plans-bangladesh") return products.filter((product) => String(product.slug).startsWith("chatgpt-") && product.slug !== "chatgpt-plans-bangladesh");
  return [];
}

function removeUnsafeJsonLd(html) {
  return html.replace(/\s*<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi, (full, json) => {
    const lower = json.toLowerCase();
    if (lower.includes('"faqpage"') || lower.includes('"product"') || lower.includes('"softwareapplication"')) return "";
    return full;
  });
}

function setMeta(html, title, description, canonical) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${esc(description)}$2`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${esc(canonical)}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${esc(canonical)}" />`);
}

function replaceRoot(html, body) {
  const match = /<div\s+id="root"[^>]*>/i.exec(html);
  const bodyEnd = html.search(/<\/body>/i);
  if (!match || bodyEnd < 0) throw new Error("[brand-truth] cannot replace root");
  return `${html.slice(0, match.index)}<div id="root"><div id="prerender-shell">${body}</div></div>\n  ${html.slice(bodyEnd)}`;
}

let count = 0;
for (const slug of brandSlugs) {
  const file = path.join(DIST, slug, "index.html");
  if (!fs.existsSync(file)) continue;

  if (retired.has(slug)) {
    let html = fs.readFileSync(file, "utf8");
    html = removeUnsafeJsonLd(html)
      .replace(/<title>[\s\S]*?<\/title>/i, "<title>Retired Listing | AI Premium Shop</title>")
      .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, "$1This older listing is no longer part of the current public AI Premium Shop catalog.$2")
      .replace(/\s*<meta\s+name="robots"[^>]*>/gi, "")
      .replace(/<\/head>/i, '<meta name="robots" content="noindex, follow" />\n</head>');
    html = replaceRoot(html, '<main><h1>This listing has been retired</h1><p>It is no longer part of the current public AIPS catalog.</p><p><a href="/products">Browse current AI tools</a></p></main>');
    fs.writeFileSync(file, html, "utf8");
    count++;
    continue;
  }

  const records = recordsFor(slug);
  if (!records.length) continue;
  const first = records[0];
  const displayName = slug === "chatgpt-plans-bangladesh" ? "ChatGPT" : nameOf(first.name);
  const priced = records.filter((record) => !record.requestPrice && typeof record.price === "number" && record.price > 0).sort((a, b) => a.price - b.price);
  const min = priced[0]?.price ?? null;
  const title = fit(`${displayName} Price in Bangladesh | AI Premium Shop`, 68);
  const description = fit(`${min ? `${displayName} AIPS plans currently start from ${money(min)}.` : `Check the current AIPS price for ${displayName}.`} Compare access and confirm availability, provider limits, delivery ETA and terms before payment.`, 158);
  const canonical = `https://aipremiumshop.com/${slug}`;
  const rows = records.map((record) => `<li><strong>${esc(scopedTier(record.tier ?? nameOf(record.name)))}</strong> — ${record.requestPrice || typeof record.price !== "number" ? "Price on request" : money(record.price)} · ${esc(access(record.accessType))}</li>`).join("");
  const body = `<main><nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="/${esc(first.category)}">${esc(first.category)}</a> › ${esc(displayName)}</nav><h1>${esc(displayName)} in Bangladesh</h1><p>Compare current public AIPS catalog records for ${esc(displayName)}. Published AIPS price and access information can be compared here; provider-controlled models, quotas, credits, storage and feature limits should be verified for the exact plan.</p><h2>Current public plans</h2><ul>${rows}</ul><h2>Before payment</h2><ul><li>Confirm the exact access model.</li><li>Confirm current availability and delivery ETA.</li><li>Check provider-controlled limits for the exact plan.</li><li>Confirm applicable order and support terms.</li></ul><p><a href="/products">Browse all AI tools</a> · <a href="/pricing">Compare current pricing</a></p></main>`;

  let html = fs.readFileSync(file, "utf8");
  html = removeUnsafeJsonLd(setMeta(html, title, description, canonical));
  html = replaceRoot(html, body);
  const lower = html.toLowerCase();
  for (const phrase of BLOCKED) {
    if (lower.includes(phrase.toLowerCase())) throw new Error(`[brand-truth] ${slug} still contains blocked phrase: ${phrase}`);
  }
  if (/"@type"\s*:\s*"faqpage"/i.test(html)) throw new Error(`[brand-truth] ${slug} still contains FAQPage schema`);
  fs.writeFileSync(file, html, "utf8");
  count++;
}
console.log(`[brand-truth] sanitized ${count} brand crawler pages`);
