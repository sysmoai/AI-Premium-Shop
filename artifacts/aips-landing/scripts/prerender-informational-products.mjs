#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(APP, "../..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";
const templatePath = path.join(DIST, "index.html");
const sitemapPath = path.join(DIST, "sitemap.xml");

const informationalDoc = JSON.parse(fs.readFileSync(path.join(APP, "data/informational-products.json"), "utf8"));
const products = informationalDoc?.products ?? [];
const providerSources = JSON.parse(fs.readFileSync(path.join(REPO, "ops/ssot/provider-sources.json"), "utf8"));
const routesSrc = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...routesSrc.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]));

if (!fs.existsSync(templatePath)) throw new Error("informational prerender refused: dist/public/index.html is missing");
const template = fs.readFileSync(templatePath, "utf8");
if (!template.includes('<div id="root"></div>')) {
  throw new Error("informational prerender refused: clean Vite template root was not found; run this immediately after Vite build");
}

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");
const routeFor = (slug) => brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`;
const categoryPath = (category) => category === "bundles" ? "/bundles" : `/${category}`;
const fitTitle = (value) => value.length <= 68 ? value : `${value.slice(0, 47).trimEnd()}… | AI Premium Shop`;
const fitDescription = (value) => value.length <= 158 ? value : `${value.slice(0, 157).trimEnd()}…`;
const shell = (body) => `<div id="prerender-shell">${body}</div>`;
const evidenceDate = String(providerSources?.updated_at ?? new Date().toISOString()).slice(0, 10);

const generated = [];
for (const product of products) {
  if (!product?.slug || product?.informationalOnly !== true || product?.commerceEligible !== false) {
    throw new Error(`informational prerender refused: malformed informational record ${product?.slug ?? "unknown"}`);
  }
  if (product?.price != null || product?.accessType != null || product?.requestPrice !== false || (product?.plans ?? []).length) {
    throw new Error(`informational prerender refused: commerce fields survived for ${product.slug}`);
  }

  const route = routeFor(product.slug);
  const canonical = `${SITE}${route}`;
  const title = fitTitle(`${product.name} in Bangladesh — Current Listing Status | AI Premium Shop`);
  const description = fitDescription(`AI Premium Shop does not currently publish a purchasable plan for ${product.name}. View the current listing status and browse active alternatives.`);
  const catPath = categoryPath(product.category);
  const body = `<main>
<nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="${esc(catPath)}">${esc(product.category)}</a> › ${esc(product.name)}</nav>
<h1>${esc(product.name)} in Bangladesh</h1>
<section>
<h2>Current listing status</h2>
<p><strong>No current purchasable AI Premium Shop plan is published for this product.</strong></p>
<p>This page is retained so existing links and search references do not lead to a missing page. Provider access rules and plan structures can change. AI Premium Shop will only publish a purchasable option here again after the applicable access model is reviewed against current provider evidence.</p>
</section>
<section>
<h2>What this status means</h2>
<ul><li>No price or access plan is offered on this page.</li><li>No provider authorization is implied.</li><li>Historical catalog records remain internal audit evidence, not current sale authority.</li></ul>
</section>
<section>
<h2>What to do next</h2>
<p>Browse the active catalog or this category for current alternatives. For provider-controlled capabilities, limits, account rules and eligibility, verify the current provider documentation for the exact plan you are considering.</p>
<p><a href="/products">Browse active alternatives</a> · <a href="${esc(catPath)}">Browse this category</a></p>
</section>
<p>Product names and trademarks belong to their respective owners. This informational page does not represent an offer for sale or imply provider authorization.</p>
</main>`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: product.category, item: `${SITE}${catPath}` },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${product.name} current listing status`,
    url: canonical,
    description,
    isPartOf: { "@type": "WebSite", url: SITE, name: "AI Premium Shop" },
  };

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace('<div id="root"></div>', `<div id="root">${shell(body)}</div>`);
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\n?/g, "");
  html = html.replace("</head>", `<link rel="canonical" href="${canonical}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${canonical}" />
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<script type="application/ld+json">${JSON.stringify(webPage)}</script>
</head>`);

  const dir = route === "/" ? DIST : path.join(DIST, route.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
  generated.push({ route, canonical, name: product.name });
}

if (generated.length) {
  if (!fs.existsSync(sitemapPath)) throw new Error("informational prerender refused: dist/public/sitemap.xml is missing");
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const page of generated) {
    const escapedUrl = page.canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const blockPattern = new RegExp(`<url>\\s*<loc>${escapedUrl}<\\/loc>[\\s\\S]*?<\\/url>`, "i");
    const block = `<url>\n    <loc>${page.canonical}</loc>\n    <lastmod>${evidenceDate}</lastmod>\n  </url>`;
    if (blockPattern.test(sitemap)) sitemap = sitemap.replace(blockPattern, block);
    else sitemap = sitemap.replace(/<\/urlset>\s*$/, `  ${block}\n</urlset>\n`);
  }
  fs.writeFileSync(sitemapPath, sitemap, "utf8");
}

console.log(`[informational-prerender] wrote ${generated.length} provider-restricted informational route(s); sitemap lastmod=${evidenceDate}`);
for (const page of generated) console.log(`[informational-prerender] ${page.route} <- ${page.name}`);
