// Post-build prerender for /product/<slug> routes.
//
// The SPA ships an empty <div id="root"> for every URL, so crawlers that don't
// execute JS see 271 identical blank shells. This writes real static HTML —
// per-page <title>, meta description, canonical, JSON-LD, and readable body
// content — into dist/public/product/<slug>/index.html. Vercel serves files
// before applying the /(.*) -> /index.html rewrite, so these take precedence
// for crawlers while the bundled SPA still hydrates and takes over on load
// (createRoot().render() replaces the static children).
//
// Everything is derived from data/products.json at build time: titles and
// descriptions mirror ProductPage.tsx's seo block exactly, prices come from
// the catalog (never typed here), request-price pages state no price. If
// ProductPage.tsx's seo format changes, change it here too.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(here, "..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";

const { products } = JSON.parse(fs.readFileSync(path.join(APP, "data/products.json"), "utf8"));

// Mirror productRoutes.ts: brand-page slugs live at /{slug}; BrandPage owns
// that surface, so only /product/<slug> pages are prerendered here.
const routesSrc = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...routesSrc.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]));

const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) {
  console.error("prerender: template root div not found — bailing rather than corrupting output");
  process.exit(1);
}

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtBDT = (n) => `৳${n.toLocaleString("en-US")}`;

// Group records by slug (multi-tier products have several records per slug).
const bySlug = new Map();
for (const p of products) {
  if (brandSlugs.has(p.slug)) continue;
  if (!bySlug.has(p.slug)) bySlug.set(p.slug, []);
  bySlug.get(p.slug).push(p);
}

let written = 0;
for (const [slug, recs] of bySlug) {
  const p = recs.find((r) => typeof r.price === "number") ?? recs[0];
  const prices = recs.map((r) => r.price).filter((x) => typeof x === "number");
  const fromPrice = prices.length ? Math.min(...prices) : null;
  const requestPrice = fromPrice === null;
  const canonical = `${SITE}/product/${slug}`;

  const seo = p.seo ?? (requestPrice
    ? {
        title: `${p.name} price in Bangladesh — Buy with bKash/Nagad | AI Premium Shop`,
        desc: `Get ${p.name} in Bangladesh through AI Premium Shop. Provider pricing updates periodically, so we quote the current price on WhatsApp. Pay with bKash, Nagad or bank transfer — no international card needed.`,
      }
    : {
        title: `${p.name} price in Bangladesh — ${fmtBDT(fromPrice)}/mo | AI Premium Shop`,
        desc: `${p.name} price in Bangladesh is ${fmtBDT(fromPrice)}/month at AI Premium Shop. Pay with bKash or Nagad. Delivery ${p.deliverySLA ?? "as scheduled"}. 30-day warranty. Trusted by 10,000+ customers since 2022.`,
      });
  const title = seo.title;
  const desc = seo.metaDescription ?? seo.desc;

  const faqs = p.faq ?? [];
  const ld = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: p.category, item: `${SITE}/${p.category}` },
      { "@type": "ListItem", position: 3, name: p.name },
    ]},
    ...(faqs.length ? [{ "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
  ];

  const tiers = recs.filter((r) => typeof r.price === "number")
    .map((r) => `<li>${esc(r.tier ?? r.name)} — ${fmtBDT(r.price)}/month</li>`).join("");
  const body = `
<nav aria-label="breadcrumb"><a href="/">Home</a> › <a href="/${esc(p.category)}">${esc(p.category)}</a> › ${esc(p.name)}</nav>
<main>
<h1>${esc(p.name)}</h1>
<p>${esc(p.description ?? "")}</p>
${p.descriptionBN ? `<p lang="bn">${esc(p.descriptionBN)}</p>` : ""}
${requestPrice
    ? `<p>Current price for ${esc(p.name)} in Bangladesh is confirmed on WhatsApp — provider pricing changes periodically, so we quote the up-to-date price before you order.</p>`
    : `<p>${esc(p.name)} starts from <strong>${fmtBDT(fromPrice)}/month</strong> in Bangladesh at AI Premium Shop.</p>${tiers ? `<ul>${tiers}</ul>` : ""}`}
${(p.uniqueSellingPoints ?? []).length ? `<ul>${p.uniqueSellingPoints.map((u) => `<li>${esc(u)}</li>`).join("")}</ul>` : ""}
${faqs.length ? `<section><h2>Frequently asked questions</h2>${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}</section>` : ""}
<p><a href="/products">Browse all AI tools</a> · <a href="/pricing">Pricing</a> · <a href="/how-to-order">How to order</a></p>
</main>`;

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  // canonical + og overrides appended to <head> (last one wins for crawlers
  // that respect a single canonical; SEOHead replaces them on hydration).
  const headExtra = `<link rel="canonical" href="${canonical}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${canonical}" />
${ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join("\n")}
</head>`;
  html = html.replace("</head>", headExtra);

  const dir = path.join(DIST, "product", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  written++;
}

console.log(`prerender: wrote ${written} static product pages (${bySlug.size} slugs, brand-page slugs excluded: ${[...brandSlugs].filter((s) => products.some((p) => p.slug === s)).length})`);

// ---- Hub routes: /products, the 9 category routes, and the 40 brand routes.
// Titles/descriptions mirror each page component's own SEOHead values —
// category titles are parsed out of CategoryPage.tsx so they cannot drift.

const writeRoute = (route, title, desc, body, extraLd = []) => {
  const canonical = `${SITE}${route === "/products" ? "/products" : route}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  html = html.replace("</head>", `<link rel="canonical" href="${canonical}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${canonical}" />
${extraLd.map((x) => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join("\n")}
</head>`);
  const dir = path.join(DIST, route.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
};

const linkFor = (slug) => (brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`);
const distinct = [...new Map(products.map((p) => [p.slug, p])).values()];
const productLi = (p) => {
  const recs = products.filter((r) => r.slug === p.slug);
  const prices = recs.map((r) => r.price).filter((x) => typeof x === "number");
  const priceStr = prices.length ? ` — from ${fmtBDT(Math.min(...prices))}/month` : " — price on WhatsApp";
  return `<li><a href="${linkFor(p.slug)}">${esc(p.name)}</a>${priceStr}</li>`;
};

// Category titles/descriptions parsed from CategoryPage.tsx's config blocks.
const catSrc = fs.readFileSync(path.join(APP, "src/pages/CategoryPage.tsx"), "utf8");
const catMeta = {};
for (const m of catSrc.matchAll(/["']?([a-z-]+)["']?:\s*{[^{}]*?seoTitle:\s*"([^"]+)"[\s\S]{0,1500}?metaDescription:\s*"([^"]+)"/g)) {
  catMeta[m[1]] = { title: m[2], desc: m[3] };
}
const CATEGORY_LABELS = {
  "ai-assistant": "AI Assistant & Chat", "ai-image": "AI Image & Design", "ai-video": "AI Video",
  "ai-voice-music": "AI Voice & Music", "ai-code": "AI Code & Dev Tools", "ai-workspace": "AI Workspace",
  "ai-writing": "AI Writing & SEO", "ai-design": "AI Design & Creative", "bundles": "Bundles & Packages",
};

let hubs = 0;
for (const [cat, label] of Object.entries(CATEGORY_LABELS)) {
  const list = distinct.filter((p) => p.category === cat);
  if (!list.length) continue;
  const meta = catMeta[cat] ?? { title: `${label} — Prices in BDT | AI Premium Shop Bangladesh`,
    desc: `${list.length} ${label} subscriptions with BDT prices. Pay with bKash or Nagad. AI Premium Shop Bangladesh.` };
  writeRoute(cat === "bundles" ? "/bundles" : `/${cat}`, meta.title, meta.desc,
    `<main><h1>${esc(label)}</h1><p>${esc(meta.desc)}</p><ul>${list.map(productLi).join("")}</ul>
<p><a href="/products">All AI tools</a> · <a href="/pricing">Pricing</a> · <a href="/how-to-order">How to order</a></p></main>`);
  hubs++;
}

// /products — the master list: every distinct product as a real link.
const total = distinct.length;
writeRoute("/products",
  `All ${total} AI Tools — Prices in BDT | AI Premium Shop Bangladesh`,
  `Browse ${total} AI subscriptions. ChatGPT, Claude, Midjourney & more. Prices in BDT. Local payment. Fast delivery. AI Premium Shop.`,
  `<main><h1>All ${total} AI Tools</h1>
<p>${products.length} premium subscriptions with BDT prices. Pay with bKash, Nagad, Rocket or bank transfer. Delivery via WhatsApp.</p>
${Object.entries(CATEGORY_LABELS).map(([cat, label]) => {
    const list = distinct.filter((p) => p.category === cat);
    return list.length ? `<h2><a href="/${cat === "bundles" ? "bundles" : cat}">${esc(label)}</a></h2><ul>${list.map(productLi).join("")}</ul>` : "";
  }).join("")}
<p><a href="/best-ai-for-students">Best AI for students</a> · <a href="/best-ai-for-freelancers">for freelancers</a> · <a href="/best-ai-for-developers">for developers</a> · <a href="/best-ai-for-creators">for creators</a> · <a href="/best-ai-for-business">for business</a></p></main>`);
hubs++;

// Brand routes: catalog-derived head matching BrandPage's price claims.
let brands = 0;
for (const slug of brandSlugs) {
  const recs = products.filter((p) => p.slug === slug);
  if (!recs.length) continue; // route parsed from source that isn't a catalog slug
  const p = recs[0];
  const prices = recs.map((r) => r.price).filter((x) => typeof x === "number");
  const fromPrice = prices.length ? Math.min(...prices) : null;
  const title = fromPrice
    ? `${p.brand ?? p.name} price in Bangladesh — ${fmtBDT(fromPrice)}/mo | AI Premium Shop`
    : `${p.brand ?? p.name} price in Bangladesh | AI Premium Shop`;
  const desc = fromPrice
    ? `${p.brand ?? p.name} in Bangladesh from ${fmtBDT(fromPrice)}/month. Pay with bKash or Nagad. Delivery ${p.deliverySLA ?? "via WhatsApp"}. 30-day warranty. AI Premium Shop.`
    : `Get ${p.brand ?? p.name} in Bangladesh — current price confirmed on WhatsApp. Pay with bKash or Nagad. AI Premium Shop.`;
  const tiers = recs.filter((r) => typeof r.price === "number")
    .map((r) => `<li>${esc(r.tier ?? r.name)} — ${fmtBDT(r.price)}/month</li>`).join("");
  writeRoute(`/${slug}`, title, desc,
    `<main><h1>${esc(p.brand ?? p.name)}</h1><p>${esc(p.description ?? desc)}</p>${tiers ? `<ul>${tiers}</ul>` : ""}
<p><a href="/products">All AI tools</a> · <a href="/${esc(p.category)}">${esc(CATEGORY_LABELS[p.category] ?? p.category)}</a> · <a href="/how-to-order">How to order</a></p></main>`);
  brands++;
}

console.log(`prerender: wrote ${hubs} hub pages (products + categories) and ${brands} brand pages; category meta parsed for ${Object.keys(catMeta).length}/9`);
