#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";
const definitions = JSON.parse(fs.readFileSync(path.join(APP, "data/blog-guides.json"), "utf8"));
const projection = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = (Array.isArray(projection) ? projection : projection.products ?? []).filter((record) => record.publicStatus !== "retired" && record.slug !== "replit-bangladesh");
const routesSource = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...routesSource.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]));

const BLOCKED = [
  "replit",
  "unlimited",
  "5-30 min",
  "5–30 min",
  "5-15 min",
  "5–15 min",
  "instant delivery",
  "30-day warranty",
  "30 day warranty",
  "best value",
  "pay for themselves",
  "earn in 7 days",
  "44% more",
  "gpt-5.4",
  "200k token",
  "no international card required",
];

const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const money = (value) => `BDT ${Number(value).toLocaleString("en-BD")}`;
const baseName = (value) => String(value ?? "AI tool").split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
const hrefFor = (slug) => brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`;
const access = (value) => value === "shared" ? "Shared" : value === "personal" ? "Personal" : value === "team" ? "Team" : value === "bundle" ? "Bundle" : value ? "Service" : "Confirm";

function grouped() {
  const map = new Map();
  for (const record of products) {
    if (!map.has(record.slug)) map.set(record.slug, []);
    map.get(record.slug).push(record);
  }
  return map;
}
const groups = grouped();

function shortlist(definition) {
  const chosen = [];
  for (const slug of definition.focusSlugs ?? []) if (groups.has(slug) && !chosen.includes(slug)) chosen.push(slug);
  if (chosen.length < 8) {
    for (const category of definition.categories ?? []) {
      const candidates = [...groups.entries()]
        .filter(([, records]) => records.some((record) => record.category === category))
        .map(([slug, records]) => {
          const prices = records.filter((record) => !record.requestPrice && typeof record.price === "number" && record.price > 0).map((record) => Number(record.price));
          return { slug, price: prices.length ? Math.min(...prices) : Infinity };
        })
        .sort((a, b) => a.price - b.price || a.slug.localeCompare(b.slug));
      for (const candidate of candidates) {
        if (chosen.includes(candidate.slug)) continue;
        chosen.push(candidate.slug);
        if (chosen.length >= 8) break;
      }
      if (chosen.length >= 8) break;
    }
  }
  return chosen.slice(0, 8).map((slug) => {
    const records = groups.get(slug) ?? [];
    const first = records[0];
    const prices = records.filter((record) => !record.requestPrice && typeof record.price === "number" && record.price > 0).map((record) => Number(record.price));
    return { slug, records, first, minPrice: prices.length ? Math.min(...prices) : null, access: [...new Set(records.map((record) => access(record.accessType)))] };
  }).filter((item) => item.first);
}

function cleanJsonLd(html) {
  return html.replace(/\s*<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi, (full, json) => {
    const lower = json.toLowerCase();
    return lower.includes('"blogposting"') || lower.includes('"article"') || lower.includes('"faqpage"') || lower.includes('"product"') ? "" : full;
  });
}

function setMeta(html, title, description, canonical) {
  let output = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${esc(description)}$2`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${esc(canonical)}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${esc(canonical)}" />`);
  return output;
}

function replaceRoot(html, body) {
  const start = /<div\s+id="root"[^>]*>/i.exec(html);
  const end = html.search(/<\/body>/i);
  if (!start || end < 0) throw new Error("[blog-truth] cannot replace generated root");
  return `${html.slice(0, start.index)}<div id="root"><div id="prerender-shell">${body}</div></div>\n  ${html.slice(end)}`;
}

function blogSchema(definition, canonical) {
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: definition.title,
    description: definition.description,
    dateModified: definitions.updatedOn,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "AI Premium Shop", url: SITE },
    publisher: { "@type": "Organization", name: "AI Premium Shop", url: SITE },
  }).replace(/</g, "\\u003c")}</script>`;
}

let sanitized = 0;
for (const definition of definitions.posts) {
  const route = `/blog/${definition.slug}`;
  const file = path.join(DIST, "blog", definition.slug, "index.html");
  if (!fs.existsSync(file)) throw new Error(`[blog-truth] missing ${route}`);
  const canonical = `${SITE}${route}`;
  const items = shortlist(definition);
  const catalogList = items.length ? `<h2>Relevant current AIPS catalog families</h2><p>These are discovery examples based on current public AIPS identity, price and access fields. They are not rankings, endorsements or proof that a provider entitlement is included.</p><ul>${items.map((item) => {
    const label = baseName(item.first.name);
    const price = item.minPrice ? `From ${money(item.minPrice)}` : "Check current price";
    return `<li><a href="${esc(hrefFor(item.slug))}">${esc(label)}</a> — ${esc(price)} · ${esc(item.access.join(", "))} · ${item.records.length} ${item.records.length === 1 ? "plan record" : "plan records"}</li>`;
  }).join("")}</ul>` : "";
  const checks = (definition.checks ?? []).map((check) => `<li>${esc(check)}</li>`).join("");
  const body = `<article><nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="/blog">Blog</a> › ${esc(definition.categoryLabel)}</nav><h1>${esc(definition.h1)}</h1><p><strong>Updated ${esc(definitions.updatedOn)}.</strong> Verification-first editorial.</p><p>${esc(definition.intro)}</p><h2>What to verify first</h2><ol>${checks}</ol>${catalogList}<h2>Separate provider facts from AIPS commercial facts</h2><p>AIPS catalog fields can establish the public product identity, published BDT price and stated access model. Provider-controlled models, credits, quotas, storage, exports, integrations, licensing and other entitlements can change and must be verified for the exact plan. Availability and delivery ETA are order-specific; confirm them with applicable terms before payment.</p><h2>Before using the tool</h2><p>Choose an access model appropriate for the data and workflow. Verify important generated facts and outputs before relying on them. For privacy-sensitive or client work, review the provider's current data controls and your own contractual or organizational requirements.</p><p><a href="/products">Current catalog</a> · <a href="/pricing">Current pricing</a> · <a href="/blog">All decision guides</a></p></article>`;

  let html = fs.readFileSync(file, "utf8");
  html = cleanJsonLd(setMeta(html, definition.title, definition.description, canonical));
  html = html.replace(/<\/head>/i, `${blogSchema(definition, canonical)}\n</head>`);
  html = replaceRoot(html, body);
  const lower = html.toLowerCase();
  for (const phrase of BLOCKED) if (lower.includes(phrase.toLowerCase())) throw new Error(`[blog-truth] ${route} contains blocked phrase: ${phrase}`);
  if ((html.match(/rel="canonical"/gi) ?? []).length !== 1) throw new Error(`[blog-truth] ${route} must contain one canonical`);
  fs.writeFileSync(file, html, "utf8");
  sanitized++;
}

console.log(`[blog-truth] sanitized ${sanitized} blog crawler pages`);
