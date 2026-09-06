#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(APP, "../..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";

const ownership = JSON.parse(fs.readFileSync(path.join(REPO, "ops/seo/support-cluster-ownership-2026-09-07.json"), "utf8"));
const projectionRaw = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = (Array.isArray(projectionRaw) ? projectionRaw : projectionRaw.products ?? [])
  .filter((product) => product.publicStatus !== "retired" && product.slug !== "replit-bangladesh");
const productRoutes = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...productRoutes.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]));

const BLOCKED = [
  "you can use shared access",
  "compare shared plans",
  "shared-access arrangement",
  "shared credential",
  "shared-credential",
  "30-day warranty",
  "30 day warranty",
  "5-30 min",
  "5–30 min",
  "instant delivery",
  "best value",
  "cheapest",
  "% off",
  "official price",
  "aggregateRating",
  "reviewCount"
];

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");
const money = (value) => `BDT ${Number(value).toLocaleString("en-BD")}`;
const baseName = (value) => String(value ?? "AI tool").split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
const productHref = (slug) => brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`;
const supportLabel = (route) => route
  .replace(/^\//, "")
  .replace(/^best-ai-for-/, "AI tools for ")
  .replace(/^best-ai-subscription-2026$/, "AI subscription decision guide")
  .replace(/^ai-under-/, "AI tools under BDT ")
  .replace(/^chatgpt-vs-claude$/, "ChatGPT vs Claude")
  .replace(/^chatgpt-vs-gemini$/, "ChatGPT vs Google AI Pro")
  .replace(/^chatgpt-vs-perplexity$/, "ChatGPT vs Perplexity")
  .replace(/^claude-vs-gemini$/, "Claude vs Google AI Pro")
  .replace(/^canva-vs-adobe-express$/, "Canva vs Adobe Express")
  .replace(/^copilot-vs-cursor$/, "GitHub Copilot vs Cursor")
  .replace(/^midjourney-vs-ideogram$/, "Midjourney vs Ideogram")
  .replaceAll("-", " ")
  .replace(/\b\w/g, (character) => character.toUpperCase());

function currentFamily(slug) {
  const rows = products.filter((product) => product.slug === slug);
  if (!rows.length) throw new Error(`[comparison-truth] governed public family missing: ${slug}`);
  const fixed = rows
    .filter((row) => !row.requestPrice && typeof row.price === "number" && Number.isFinite(row.price) && row.price > 0)
    .map((row) => Number(row.price));
  const modes = [...new Set(rows.map((row) => row.accessType).filter(Boolean))];
  return {
    slug,
    rows,
    name: baseName(rows[0]?.brand || rows[0]?.name || slug),
    planCount: rows.length,
    minPrice: fixed.length ? Math.min(...fixed) : null,
    maxPrice: fixed.length ? Math.max(...fixed) : null,
    accessModes: modes,
    href: productHref(slug)
  };
}

function accessLabel(mode) {
  if (mode === "personal") return "Personal";
  if (mode === "team") return "Team";
  if (mode === "bundle") return "Bundle";
  if (mode === "shared") return "Shared";
  if (mode === "setup-service" || mode === "setup" || mode === "service") return "Setup / service";
  return String(mode || "Confirm").replaceAll("-", " ");
}

function priceText(family) {
  if (family.minPrice == null) return "Current price on request";
  if (family.minPrice === family.maxPrice) return money(family.minPrice);
  return `${money(family.minPrice)}–${money(family.maxPrice)}`;
}

function removeRouteJsonLd(html) {
  return html.replace(/\s*<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, (block, json) => {
    const lower = json.toLowerCase();
    if (lower.includes('"product"') || lower.includes('"offer"') || lower.includes('"aggregateoffer"') || lower.includes('"aggregaterating"') || lower.includes('"review"') || lower.includes('"breadcrumblist"') || lower.includes('"webpage"') || lower.includes('"itemlist"')) return "";
    return block;
  });
}

function setMeta(html, title, description, canonical) {
  let next = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name=["']description["']\s+content=["'])[^"']*(["'])/i, `$1${esc(description)}$2`)
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/(<meta\s+property=["']og:title["']\s+content=["'])[^"']*(["'])/i, `$1${esc(title)}$2`)
    .replace(/(<meta\s+property=["']og:description["']\s+content=["'])[^"']*(["'])/i, `$1${esc(description)}$2`)
    .replace(/(<meta\s+property=["']og:url["']\s+content=["'])[^"']*(["'])/i, `$1${esc(canonical)}$2`);
  return next.replace(/<\/head>/i, `  <link rel="canonical" href="${esc(canonical)}" />\n</head>`);
}

function replaceRoot(html, body) {
  const root = /<div\s+id=["']root["'][^>]*>/i.exec(html);
  const bodyEnd = html.search(/<\/body>/i);
  if (!root || bodyEnd < 0) throw new Error("[comparison-truth] cannot replace generated root");
  return `${html.slice(0, root.index)}<div id="root"><div id="prerender-shell">${body}</div></div>\n  ${html.slice(bodyEnd)}`;
}

function injectSchema(html, route, a, b, title, description) {
  const canonical = `${SITE}${route}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Decision guides", item: `${SITE}/guides` },
      { "@type": "ListItem", position: 3, name: `${a.name} vs ${b.name}`, item: canonical }
    ]
  };
  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: canonical,
    description,
    about: [a.name, b.name]
  };
  const scripts = `<script type="application/ld+json" data-go6-comparison-schema="breadcrumb">${JSON.stringify(breadcrumb)}</script>\n<script type="application/ld+json" data-go6-comparison-schema="webpage">${JSON.stringify(webpage)}</script>\n`;
  return html.replace(/<\/head>/i, `${scripts}</head>`);
}

let sanitized = 0;
for (const comparison of ownership.comparisons ?? []) {
  if (!Array.isArray(comparison.product_slugs) || comparison.product_slugs.length !== 2) {
    throw new Error(`[comparison-truth] ${comparison.route} must map exactly two product owners`);
  }
  const [a, b] = comparison.product_slugs.map(currentFamily);
  const route = comparison.route;
  const file = path.join(DIST, route.replace(/^\//, ""), "index.html");
  if (!fs.existsSync(file)) throw new Error(`[comparison-truth] generated route missing: ${route}`);

  const title = `${a.name} vs ${b.name} in Bangladesh | AI Premium Shop`;
  const description = `Compare current AI Premium Shop public catalog evidence for ${a.name} and ${b.name}: published BDT price range and access modes, with provider-controlled features verified separately.`;
  const canonical = `${SITE}${route}`;
  const row = (family) => `<tr data-go6-product="${esc(family.slug)}"><th scope="row"><a href="${esc(family.href)}">${esc(family.name)}</a></th><td>${family.planCount}</td><td>${esc(priceText(family))}</td><td>${esc(family.accessModes.length ? family.accessModes.map(accessLabel).join(", ") : "Confirm before payment")}</td></tr>`;
  const related = (comparison.support_routes ?? []).filter((href) => href !== route).map((href) => `<li><a href="${esc(href)}">${esc(supportLabel(href))}</a></li>`).join("");
  const body = `<main data-go6-comparison="${esc(route)}">
<nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="/guides">Decision guides</a> › ${esc(a.name)} vs ${esc(b.name)}</nav>
<h1>${esc(a.name)} vs ${esc(b.name)} in Bangladesh</h1>
<p>This page is decision support, not a universal winner or a second product checkout page. It compares only the current governed AI Premium Shop public catalog evidence below. Exact product price/buy intent remains with each linked product page.</p>
<h2>Current AI Premium Shop catalog snapshot</h2>
<table><thead><tr><th>Product</th><th>Current public plan records</th><th>Published AI Premium Shop price</th><th>Published access modes</th></tr></thead><tbody>${row(a)}${row(b)}</tbody></table>
<p data-go6-access-rule>Only access modes currently published in the governed catalog are represented above. This comparison does not recommend or imply an unpublished access arrangement.</p>
<h2>What to check before choosing</h2>
<ul><li>Open the current <a href="${esc(a.href)}">${esc(a.name)} product page</a> and <a href="${esc(b.href)}">${esc(b.name)} product page</a> for the exact AI Premium Shop listing.</li><li>Verify provider-controlled models, credits, quotas, storage, exports, integrations and other limits against current provider documentation for the exact plan.</li><li>Confirm current availability, delivery ETA and applicable order terms before payment.</li></ul>
<h2>How this page avoids cannibalization</h2>
<p>This comparison owns only the “which of these two should I evaluate?” decision. It does not replace either product page for exact product price, access or order intent.</p>
${related ? `<h2>Related decision guides</h2><ul>${related}</ul>` : ""}
<p><a href="/products">Browse all AI tools</a> · <a href="/pricing">Current AI Premium Shop pricing</a></p>
</main>`;

  let html = fs.readFileSync(file, "utf8");
  html = removeRouteJsonLd(html);
  html = setMeta(html, title, description, canonical);
  html = replaceRoot(html, body);
  html = injectSchema(html, route, a, b, title, description);

  const lower = html.toLowerCase();
  for (const phrase of BLOCKED) {
    if (lower.includes(phrase.toLowerCase())) throw new Error(`[comparison-truth] ${route} contains blocked phrase: ${phrase}`);
  }
  if (!/<script\s+type=["']module["']/i.test(html)) throw new Error(`[comparison-truth] ${route} lost React runtime module script`);
  if ((html.match(/<link\s+rel=["']canonical["']/gi) ?? []).length !== 1) throw new Error(`[comparison-truth] ${route} must have exactly one canonical`);
  if (!lower.includes(`href="${a.href.toLowerCase()}"`) || !lower.includes(`href="${b.href.toLowerCase()}"`)) throw new Error(`[comparison-truth] ${route} lost product-owner links`);
  fs.writeFileSync(file, html, "utf8");
  sanitized += 1;
}

console.log(`[comparison-truth] sanitized ${sanitized} governed comparison crawler pages; unpublished access modes are not implied`);
