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
  // Most likely cause: this script was run twice without an intervening
  // `vite build`. The homepage section at the bottom overwrites
  // dist/public/index.html — the same file read here as the template — so on
  // a second standalone run the root div is already populated. Bailing keeps
  // us from nesting prerendered content inside itself. Run `pnpm run build`.
  console.error("prerender: template root div not found in dist/public/index.html — bailing rather than corrupting output.");
  console.error("prerender: run `pnpm run build` (vite build regenerates a clean index.html) rather than this script alone.");
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
  const today = new Date().toISOString().split("T")[0];
  const verificationDate = p.verificationDate ?? today;
  const ld = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: p.category, item: `${SITE}/${p.category}` },
      { "@type": "ListItem", position: 3, name: p.name },
    ]},
    { "@context": "https://schema.org", "@type": ["Product", "SoftwareApplication"],
      name: p.name,
      description: p.description ?? desc,
      applicationCategory: p.category,
      operatingSystem: "Web",
      ...(fromPrice != null ? { offers: { "@type": "Offer", price: fromPrice, priceCurrency: "BDT", availability: "https://schema.org/InStock" } } : {}),
      dateModified: verificationDate,
      brand: { "@type": "Brand", name: p.brand ?? p.name },
    },
    ...(faqs.length ? [{ "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
  ];

  const tiers = recs.filter((r) => typeof r.price === "number")
    .map((r) => `<li>${esc(r.tier ?? r.name)} — ${fmtBDT(r.price)}/month</li>`).join("");
  const body = `
<nav aria-label="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
  <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="item" href="/"><span itemprop="name">Home</span></a><meta itemprop="position" content="1" />
  </span> ›
  <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="item" href="/${esc(p.category)}"><span itemprop="name">${esc(p.category)}</span></a><meta itemprop="position" content="2" />
  </span> ›
  <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <span itemprop="name">${esc(p.name)}</span><meta itemprop="position" content="3" />
  </span>
</nav>
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
<meta http-equiv="last-modified" content="${verificationDate}" />
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

// Alias routes -> the canonical URL their page component actually declares.
// App.tsx maps several paths onto the same component+key (e.g.
// /chatgpt-vs-claude-bangladesh renders ComparisonPage compKey="chatgpt-vs-
// claude"), and those components set one shared canonical. Prerendering
// self-canonicalised every path instead, which handed crawlers two
// self-canonical pages with identical titles — a duplicate-content signal the
// React app never had. Parsed from the components so it cannot drift.
const ALIAS_CANONICAL = (() => {
  const map = new Map();
  const appSrc = fs.readFileSync(path.join(APP, "src/App.tsx"), "utf8");
  const declared = new Map(); // configKey -> canonical URL
  for (const file of ["src/pages/ComparisonPage.tsx", "src/pages/BudgetPage.tsx"]) {
    const src = fs.readFileSync(path.join(APP, file), "utf8");
    for (const m of src.matchAll(/["']([a-z0-9-]+)["']:\s*\{[\s\S]{0,2000}?canonical:\s*"([^"]+)"/g)) {
      if (!declared.has(m[1])) declared.set(m[1], m[2]);
    }
  }
  // <Route path="/x">{() => <ComparisonPage compKey="y" />}</Route>
  for (const m of appSrc.matchAll(/<Route path="(\/[^"]*)">\s*\{\(\)\s*=>\s*<(?:ComparisonPage|BudgetPage)\s+\w+="([a-z0-9-]+)"/g)) {
    const target = declared.get(m[2]);
    if (target && target !== `${SITE}${m[1]}`) map.set(m[1], target);
  }
  return map;
})();

const writeRoute = (route, title, desc, body, extraLd = []) => {
  const canonical = ALIAS_CANONICAL.get(route) ?? `${SITE}${route === "/products" ? "/products" : route}`;
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
  // The 40 brand pages are the highest-converting URLs on the site and were
  // serving ~2 sentences of static content while /product/* pages got their
  // full catalog surface. Same treatment now: BN description, USPs, use
  // cases, and FAQs (merged across tier records, deduped by question), plus
  // FAQPage JSON-LD.
  const seenQ = new Set();
  const faqs = recs.flatMap((r) => r.faq ?? [])
    .filter((f) => !seenQ.has(f.q) && seenQ.add(f.q));
  const usps = p.uniqueSellingPoints ?? [];
  const useCases = recs.flatMap((r) => r.useCases ?? []).slice(0, 6);
  const ld = faqs.length ? [{ "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : [];
  writeRoute(`/${slug}`, title, desc,
    `<main><h1>${esc(p.brand ?? p.name)}</h1><p>${esc(p.description ?? desc)}</p>
${p.descriptionBN ? `<p lang="bn">${esc(p.descriptionBN)}</p>` : ""}
${tiers ? `<h2>Plans and prices in Bangladesh</h2><ul>${tiers}</ul>` : `<p>Current price is confirmed on WhatsApp.</p>`}
${usps.length ? `<h2>Why buy from AI Premium Shop</h2><ul>${usps.map((u) => `<li>${esc(u)}</li>`).join("")}</ul>` : ""}
${useCases.length ? `<h2>What people use it for</h2><ul>${useCases.map((u) => `<li>${esc(u)}</li>`).join("")}</ul>` : ""}
${faqs.length ? `<h2>Frequently asked questions</h2>${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}` : ""}
<p><a href="/products">All AI tools</a> · <a href="/${esc(p.category)}">${esc(CATEGORY_LABELS[p.category] ?? p.category)}</a> · <a href="/how-to-order">How to order</a></p></main>`, ld);
  brands++;
}

console.log(`prerender: wrote ${hubs} hub pages (products + categories) and ${brands} brand pages; category meta parsed for ${Object.keys(catMeta).length}/9`);

// ---- Remaining routes: guides, best-ai-for, comparisons, budget, Bangla, info pages.
// Titles/descriptions parsed from source components to keep them in sync with live code.

// --- Best-ai-for guide pages: titles/descriptions sourced from GuidePage.tsx's GUIDE_PAGES
const GUIDE_META = {
  students: { title: "Best AI Tools for Students Bangladesh 2026 — From BDT 299", desc: "Best AI tools for students in Bangladesh 2026. Google AI BDT 499. ChatGPT BDT 499. Study smarter." },
  freelancers: { title: "Best AI for Freelancers Bangladesh 2026", desc: "Best AI tools for freelancers Bangladesh 2026. Write proposals faster, deliver more work. From BDT 299. Upwork & Fiverr." },
  creators: { title: "Best AI for Content Creators Bangladesh 2026", desc: "Best AI for content creators Bangladesh 2026. Script, thumbnail, music — all AI. From BDT 299." },
  business: { title: "Best AI for Business Owners Bangladesh 2026", desc: "Best AI for business owners Bangladesh 2026. Automate sales, support, content. From BDT 500." },
  developers: { title: "Best AI for Developers Bangladesh 2026", desc: "Best AI coding tools Bangladesh 2026. Copilot, Cursor, Replit. Code 50% faster. From BDT 500." },
  "job-seekers": { title: "Best AI for Job Seekers Bangladesh 2026", desc: "Best AI for job seekers Bangladesh 2026. CV builder, interview prep, skill roadmap. From BDT 299." },
  designers: { title: "Best AI for Designers Bangladesh 2026", desc: "Best AI design tools for designers in Bangladesh 2026. Midjourney, Ideogram, Leonardo AI. BDT prices." },
  marketers: { title: "Best AI for Digital Marketers Bangladesh 2026", desc: "Best AI tools for digital marketers in Bangladesh 2026. ChatGPT, Midjourney, Perplexity. BDT prices." },
  ecommerce: { title: "Best AI for E-commerce Bangladesh 2026", desc: "Best AI tools for e-commerce sellers in Bangladesh 2026. Product photos, descriptions, customer support AI." },
};
// Body content parsed from GuidePage.tsx's GUIDES config per key: h1, the
// "why" prose, the ranked tool picks (name + reason as the page renders
// them), and the FAQs — emitted with FAQPage JSON-LD. These pages target the
// site's core "best AI for X" queries and were two-line stubs.
const guideSrc = fs.readFileSync(path.join(APP, "src/pages/GuidePage.tsx"), "utf8");
const guideBlock = (key) => {
  // Keys appear both bare (students:) and quoted ("designers":) — try both.
  let start = guideSrc.indexOf(`  ${key}: {`);
  if (start < 0) start = guideSrc.indexOf(`  "${key}": {`);
  if (start < 0) return null;
  const next = guideSrc.indexOf("\n  }," , start);
  return next < 0 ? null : guideSrc.slice(start, next);
};
for (const [key, meta] of Object.entries(GUIDE_META)) {
  const blk = guideBlock(key) ?? "";
  const h1 = blk.match(/h1:\s*"([^"]+)"/)?.[1] ?? meta.title;
  const whyH = blk.match(/whyHeading:\s*"([^"]+)"/)?.[1];
  const whyT = blk.match(/whyText:\s*"([^"]+)"/)?.[1];
  const tools = [...blk.matchAll(/rank:\s*\d+,\s*name:\s*"([^"]+)",\s*price:\s*"([^"]+)",\s*reason:\s*"([^"]+)"/g)]
    .map((m) => ({ name: m[1], price: m[2], reason: m[3] }));
  const gfaqs = [...blk.matchAll(/\{\s*q:\s*"([^"]+)",\s*a:\s*"([^"]+)"/g)].map((m) => ({ q: m[1], a: m[2] }));
  const ld = gfaqs.length ? [{ "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: gfaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : [];
  writeRoute(`/best-ai-for-${key}`, meta.title, meta.desc,
    `<main><h1>${esc(h1)}</h1><p>${esc(meta.desc)}</p>
${whyH && whyT ? `<h2>${esc(whyH)}</h2><p>${esc(whyT)}</p>` : ""}
${tools.length ? `<h2>Top picks</h2><ol>${tools.map((t) => `<li><strong>${esc(t.name)}</strong> (${esc(t.price)}) — ${esc(t.reason)}</li>`).join("")}</ol>` : ""}
${gfaqs.length ? `<h2>Frequently asked questions</h2>${gfaqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}` : ""}
<p><a href="/products">All AI tools</a> · <a href="/guides">All guides</a> · <a href="/pricing">Pricing</a></p></main>`, ld);
}

// --- /best-ai-subscription-2026 (from BestAISubscriptionPage.tsx)
const bestSrc = fs.readFileSync(path.join(APP, "src/pages/BestAISubscriptionPage.tsx"), "utf8");
const bestMatch = bestSrc.match(/title="([^"]+)".*?description="([^"]+)"/s);
writeRoute("/best-ai-subscription-2026",
  bestMatch?.[1] ?? "Best AI Subscription 2026 Bangladesh | AI Premium Shop",
  bestMatch?.[2] ?? "Best AI subscription services in Bangladesh 2026. Compare ChatGPT, Claude, Perplexity with BDT prices.",
  `<main><h1>Best AI Subscription 2026</h1><p>Compare the top AI subscriptions available in Bangladesh. All with BDT pricing and local payment.</p>
<p><a href="/products">All AI tools</a> · <a href="/best-ai-for-students">For students</a> · <a href="/pricing">Pricing</a></p></main>`);

// --- Budget pages: titles/descriptions sourced from BudgetPage.tsx
const BUDGET_META = {
  "ai-under-500": { title: "AI Tools Under ৳500 Bangladesh 2026 — From BDT 299/mo", desc: "AI tools under BDT 500 in Bangladesh. ChatGPT Plus BDT 499, Gamma BDT 399. Cheapest premium AI." },
  "ai-under-1000": { title: "AI Tools Under ৳1,000 Bangladesh 2026 — From BDT 500/mo", desc: "AI tools under BDT 1000 in Bangladesh. Claude, Notion, Perplexity & more. Budget AI tools." },
  "ai-under-3000": { title: "AI Tools Under ৳3,000 Bangladesh 2026 — From BDT 700/mo", desc: "AI tools under BDT 3000 in Bangladesh. Personal accounts for pros. Mid-range AI subscriptions." },
};
for (const [key, meta] of Object.entries(BUDGET_META)) {
  // The whole point of a budget page is the list — derive it from the
  // catalog (cheapest tier per product under the threshold in the key) so it
  // updates on every build instead of shipping a two-line stub.
  const limit = Number(key.match(/ai-under-(\d+)/)?.[1] ?? 0);
  const under = [...new Map(products
    .filter((r) => typeof r.price === "number" && r.price <= limit)
    .sort((a, b) => a.price - b.price)
    .map((r) => [r.slug, r])).values()];
  const list = under.map((r) => `<li><a href="${linkFor(r.slug)}">${esc(r.name)}</a> — ${fmtBDT(r.price)}/month</li>`).join("");
  writeRoute(`/${key}`, meta.title, meta.desc,
    `<main><h1>${esc(meta.title)}</h1><p>${esc(meta.desc)}</p>
${list ? `<h2>Every tool under ${fmtBDT(limit)} right now (${under.length})</h2><ul>${list}</ul>` : ""}
<p>All prices include WhatsApp delivery and the 30-day replacement warranty. Pay with bKash, Nagad, Rocket or bank transfer.</p>
<p><a href="/products">All AI tools</a> · <a href="/pricing">Pricing</a> · <a href="/how-to-order">How to order</a></p></main>`);
}
writeRoute("/best-ai-budget-bangladesh", BUDGET_META["ai-under-500"].title, BUDGET_META["ai-under-500"].desc,
  `<main><h1>Best AI Budget Bangladesh</h1><p>Affordable premium AI tools under BDT 500. Pay with bKash or Nagad.</p>
<p><a href="/ai-under-500">AI Under 500</a> · <a href="/ai-under-1000">AI Under 1000</a> · <a href="/products">All tools</a></p></main>`);

// --- Comparison pages: titles/descriptions sourced from ComparisonPage.tsx
const COMPARISON_META = {
  "chatgpt-vs-claude": { title: "ChatGPT vs Claude Bangladesh 2026 — Which is Better?", desc: "ChatGPT vs Claude in Bangladesh 2026. Features, prices, which is better. AI Premium Shop." },
  "chatgpt-vs-gemini": { title: "ChatGPT vs Gemini Bangladesh 2026 — Full Comparison", desc: "ChatGPT vs Gemini in Bangladesh 2026. Full comparison with BD prices. AI Premium Shop." },
  "midjourney-vs-ideogram": { title: "Midjourney vs Ideogram 2026 — Best AI Image Tool", desc: "Midjourney vs Ideogram 2026 Bangladesh. Best AI image generator comparison with BDT prices. AI Premium Shop." },
  "copilot-vs-cursor": { title: "GitHub Copilot vs Cursor 2026 — Best AI Code Tool", desc: "GitHub Copilot vs Cursor 2026. Best AI code editor compared. Prices in BDT." },
};
const COMP_ROUTES = [
  { route: "/chatgpt-vs-claude", key: "chatgpt-vs-claude" },
  { route: "/chatgpt-vs-claude-bangladesh", key: "chatgpt-vs-claude" },
  { route: "/chatgpt-vs-gemini", key: "chatgpt-vs-gemini" },
  { route: "/copilot-vs-cursor", key: "copilot-vs-cursor" },
  { route: "/midjourney-vs-ideogram", key: "midjourney-vs-ideogram" },
];
for (const { route, key } of COMP_ROUTES) {
  const meta = COMPARISON_META[key];
  writeRoute(route, meta.title, meta.desc,
    `<main><h1>${esc(meta.title)}</h1><p>${esc(meta.desc)}</p>
<p><a href="/products">All AI tools</a> · <a href="/pricing">Pricing</a></p></main>`);
}

// --- Guides index + 5 deep guide pages
const guidesIdxSrc = fs.readFileSync(path.join(APP, "src/pages/GuidesIndexPage.tsx"), "utf8");
const gidxMatch = guidesIdxSrc.match(/title="([^"]+)"[\s\S]{0,200}?description="([^"]+)"/);
writeRoute("/guides",
  gidxMatch?.[1] ?? "AI Guides for Bangladesh — Students, Freelancers, Creators | AI Premium Shop",
  gidxMatch?.[2] ?? "Free AI guides for students, freelancers, creators, business owners, and educators in Bangladesh. Learn which AI tools to use.",
  `<main><h1>AI Guides for Bangladesh</h1>
<p>Free guides to help you pick the right AI tools. Written for Bangladesh users — BDT pricing, local payment methods.</p>
<ul>
<li><a href="/guides/students">Guide for Students</a> — Study smarter with AI</li>
<li><a href="/guides/freelancers">Guide for Freelancers</a> — Win more work</li>
<li><a href="/guides/creators">Guide for Creators</a> — Content that performs</li>
<li><a href="/guides/smallbusiness">Guide for Small Business</a> — Automate and grow</li>
<li><a href="/guides/educators">Guide for Educators</a> — Teach with AI</li>
</ul>
<p><a href="/products">All AI tools</a> · <a href="/best-ai-for-students">Best for students</a></p></main>`);

// Parse guide page SEO from component sources
const GUIDE_PAGES = {
  students: { file: "guides/StudentsGuide.tsx", label: "Students Guide" },
  freelancers: { file: "guides/FreelancersGuide.tsx", label: "Freelancers Guide" },
  creators: { file: "guides/CreatorsGuide.tsx", label: "Creators Guide" },
  smallbusiness: { file: "guides/SMBGuide.tsx", label: "Small Business Guide" },
  educators: { file: "guides/EducatorsGuide.tsx", label: "Educators Guide" },
};
// Which /best-ai-for-* routes actually exist, read from App.tsx. A hardcoded
// `key === "smallbusiness" ? "business" : key` mapping assumed every guide had
// a matching picks page; "educators" does not, so every build shipped a link
// to /best-ai-for-educators, which 404s. Emit the link only when the target
// is a real route.
const BEST_AI_ROUTES = new Set(
  [...fs.readFileSync(path.join(APP, "src/App.tsx"), "utf8")
    .matchAll(/<Route path="\/best-ai-for-([a-z-]+)"/g)].map((m) => m[1]),
);
const GUIDE_TO_PICKS = { smallbusiness: "business" };
for (const [key, { file, label }] of Object.entries(GUIDE_PAGES)) {
  const src = fs.readFileSync(path.join(APP, "src/pages", file), "utf8");
  const gm = src.match(/title="([^"]+)"[\s\S]{0,200}?description="([^"]+)"/);
  const title = gm?.[1] ?? `AI Guide for ${label} Bangladesh | AI Premium Shop`;
  const desc = gm?.[2] ?? `Complete AI guide for ${label.toLowerCase()} in Bangladesh. Pick the right AI tools with BDT prices.`;
  const picks = GUIDE_TO_PICKS[key] ?? key;
  const picksLink = BEST_AI_ROUTES.has(picks) ? ` · <a href="/best-ai-for-${picks}">Best AI picks</a>` : "";
  writeRoute(`/guides/${key}`, title, desc,
    `<main><h1>${esc(title)}</h1><p>${esc(desc)}</p>
<p><a href="/guides">All guides</a> · <a href="/products">All AI tools</a>${picksLink}</p></main>`);
}

// --- Info pages: parse titles/descriptions from components
// Parse SEOHead title/description: handles "string", 'string', and backtick templates.
const parseSeoHead = (src) => {
  let title = null, desc = null;
  // Try double-quoted, single-quoted, and template-literal title
  let m = src.match(/title=\{"([^"]*)"\}/) || src.match(/title=\{(["'`])([^"'`]+?)\1\}/s) || src.match(/title="([^"]+)"/);
  if (m) title = (m[2] ?? m[1]).replace(/\$\{[^}]+\}/g, "").replace(/\s+/g, " ").trim();
  // Try double-quoted, single-quoted, and template-literal description
  m = src.match(/description=\{"([^"]*)"\}/) || src.match(/description=\{(["'`])([^"'`]+?)\1\}/s) || src.match(/description="([^"]+)"/);
  if (m) desc = (m[2] ?? m[1]).replace(/\$\{[^}]+\}/g, "").replace(/\s+/g, " ").trim();
  return { title, desc };
};

const INFO_PAGES = {
  "/about": { file: "AboutPage.tsx" },
  "/contact": { file: "ContactPage.tsx" },
  "/faq": { file: "FAQPage.tsx" },
  "/support": { file: "SupportPage.tsx" },
  "/how-to-order": { file: "HowToOrderPage.tsx" },
  "/refund-policy": { file: "RefundPolicyPage.tsx" },
  "/terms": { file: "TermsPage.tsx" },
  "/privacy-policy": { file: "PrivacyPolicyPage.tsx" },
  "/privacy": { file: "PrivacyPolicyPage.tsx" },
  "/pricing": { file: "PricingPage.tsx" },
  "/blog": { file: "BlogPage.tsx" },
};
for (const [route, { file }] of Object.entries(INFO_PAGES)) {
  const src = fs.readFileSync(path.join(APP, "src/pages", file), "utf8");
  const { title: t, desc: d } = parseSeoHead(src);
  const title = t || "AI Premium Shop Bangladesh";
  const desc = d || "Premium AI tools in Bangladesh with BDT prices. Pay with bKash or Nagad.";
  writeRoute(route, title, desc,
    `<main><h1>${esc(title)}</h1><p>${esc(desc)}</p>
<p><a href="/">Home</a> · <a href="/products">All AI tools</a></p></main>`);
}

// --- Blog posts: static slugs and titles from BlogPage.tsx's hardcoded posts array
// Blog slugs/titles/excerpts parsed from BlogPostPage.tsx's ALL_POSTS_META so
// they cannot drift from the real routes. A hardcoded copy of this list
// shipped 14 static pages at slugs that don't exist as routes (soft-404s on
// hydration) while the 14 real post URLs stayed blank — parse, never retype.
const blogSrc = fs.readFileSync(path.join(APP, "src/pages/BlogPostPage.tsx"), "utf8");
const BLOG_POSTS = [...blogSrc.matchAll(/"([a-z0-9-]+)":\s*{\s*title:\s*"([^"]+)",\s*excerpt:\s*"([^"]+)"/g)]
  .map((m) => ({ slug: m[1], title: m[2], excerpt: m[3] }));
// De-dup (the file also has a full-content map keyed by the same slugs).
const seenBlog = new Set();
const BLOG_UNIQUE = BLOG_POSTS.filter((b) => !seenBlog.has(b.slug) && seenBlog.add(b.slug));
let blogCount = 0;
for (const { slug, title, excerpt } of BLOG_UNIQUE) {
  writeRoute(`/blog/${slug}`, title,
    excerpt ? `${excerpt} | AI Premium Shop Bangladesh.` : `Read: ${title}. AI tools in Bangladesh with BDT prices. AI Premium Shop.`,
    `<main><h1>${esc(title)}</h1><p>AI tools and guides for Bangladesh users. Pay with bKash or Nagad.</p>
<p><a href="/blog">All blog posts</a> · <a href="/products">All AI tools</a> · <a href="/guides">AI Guides</a></p></main>`);
  blogCount++;
}
console.log(`prerender: blog — wrote ${blogCount} static post pages`);

// --- Bangla pages (from BanglaBN.tsx, StudentsBN.tsx, etc.)
const BANGLA_PAGES = {
  "/bn": { file: "BanglaBN.tsx", label: "হোম" },
  "/students-bn": { file: "StudentsBN.tsx", label: "শিক্ষার্থীদের জন্য" },
  "/developers-bn": { file: "DevelopersBN.tsx", label: "ডেভেলপারদের জন্য" },
  "/freelancers-bn": { file: "FreelancersBN.tsx", label: "ফ্রিল্যান্সারদের জন্য" },
  "/creators-bn": { file: "CreatorsBN.tsx", label: "কন্টেন্ট ক্রিয়েটরদের জন্য" },
  "/smb-bn": { file: "SMBBangla.tsx", label: "ব্যবসায়ীদের জন্য" },
  "/educators-bn": { file: "EducatorsBangla.tsx", label: "শিক্ষকদের জন্য" },
};
for (const [route, { file, label }] of Object.entries(BANGLA_PAGES)) {
  const src = fs.readFileSync(path.join(APP, "src/pages", file), "utf8");
  const m = src.match(/title="([^"]+)"[\s\S]{0,300}?description="([^"]+)"/);
  const title = m?.[1] ?? `AI Premium Shop বাংলাদেশ — ${label}`;
  const desc = m?.[2] ?? "প্রিমিয়াম AI টুলস বাংলাদেশে BDT মূল্যে। bKash বা Nagad-এ পেমেন্ট করুন।";
  writeRoute(route, title, desc,
    `<main><h1>${esc(title)}</h1><p lang="bn">${esc(desc)}</p>
<p lang="bn"><a href="/bn">হোম</a> · <a href="/products">সব AI টুল</a> · <a href="/guides">গাইড</a></p></main>`);
}

console.log(`prerender: wrote remaining routes (guides, best-ai-for, comparisons, budget, Bangla, info, blog posts)`);

// ---- Fallback sweep: any sitemap URL still lacking a static file gets a
// safe generic page (humanized title, self-canonical, link-rich body, no
// price claims). Guarantees the sitemap never points at a blank shell even
// when a new route class appears before anyone extends the sections above.
const sitemapXml = fs.readFileSync(path.join(APP, "public/sitemap.xml"), "utf8");
const smRoutes = [...sitemapXml.matchAll(/<loc>https:\/\/aipremiumshop\.com([^<]*)<\/loc>/g)]
  .map((m) => (m[1] || "/").replace(/\/$/, "") || "/");
let fallbacks = 0;
for (const route of smRoutes) {
  if (route === "/") continue;
  const file = path.join(DIST, route.replace(/^\//, ""), "index.html");
  if (fs.existsSync(file)) continue;
  const words = route.split("/").pop().replace(/-/g, " ").replace(/\bbangladesh\b/i, "Bangladesh")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  writeRoute(route, `${words} | AI Premium Shop`,
    `${words} — premium AI subscriptions in Bangladesh. Pay with bKash or Nagad. AI Premium Shop.`,
    `<main><h1>${esc(words)}</h1><p>Premium AI subscriptions for Bangladesh with local payment (bKash, Nagad, Rocket) and fast WhatsApp delivery.</p>
<p><a href="/products">All AI tools</a> · <a href="/pricing">Pricing</a> · <a href="/guides">Guides</a> · <a href="/how-to-order">How to order</a></p></main>`);
  fallbacks++;
}
console.log(`prerender: fallback sweep wrote ${fallbacks} pages; sitemap coverage now ${smRoutes.filter((r) => r === "/" || fs.existsSync(path.join(DIST, r.replace(/^\//, ""), "index.html"))).length}/${smRoutes.length}`);

// ---- Homepage. The one route the fallback sweep deliberately skips, and the
// only page on the site that was still shipping an empty <div id="root"> —
// i.e. the single most important URL was invisible to any crawler that does
// not execute JS. Content mirrors what Home.tsx actually renders: the hero
// headline, catalog-derived counts/prices, the real category list, featured
// brands and the same FAQ set (parsed from Home.tsx, never retyped).
{
  const homeSrc = fs.readFileSync(path.join(APP, "src/pages/Home.tsx"), "utf8");
  const faqs = [...homeSrc.matchAll(/question:\s*"([^"]+)",\s*answer:\s*\n?\s*"([^"]+)"/g)]
    .map((m) => ({ q: m[1], a: m[2] }));
  if (!faqs.length) console.warn("prerender: homepage FAQ parse matched 0 — check Home.tsx FAQS shape");

  const prices = products.map((p) => p.price).filter((x) => typeof x === "number");
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const total = distinct.length;

  // Featured = the cheapest listed tier of each of the best-known brands, so
  // the homepage states real, current entry prices rather than a static list.
  const featuredSlugs = [
    "chatgpt-plus-bangladesh", "claude-pro-bangladesh", "midjourney-bangladesh",
    "gemini-advanced-bangladesh", "github-copilot-bangladesh", "perplexity-pro-bangladesh",
    "elevenlabs-bangladesh", "runway-bangladesh", "canva-pro-bangladesh",
  ];
  const featuredLi = featuredSlugs.map((slug) => {
    const recs = products.filter((p) => p.slug === slug);
    if (!recs.length) return "";
    const ps = recs.map((r) => r.price).filter((x) => typeof x === "number");
    const label = recs[0].brand ?? recs[0].name;
    return `<li><a href="${linkFor(slug)}">${esc(label)}</a>${ps.length ? ` — from ${fmtBDT(Math.min(...ps))}/month` : " — price on WhatsApp"}</li>`;
  }).filter(Boolean).join("");

  const catLi = Object.entries(CATEGORY_LABELS).map(([cat, label]) => {
    const n = distinct.filter((p) => p.category === cat).length;
    if (!n) return "";
    return `<li><a href="/${cat === "bundles" ? "bundles" : cat}">${esc(label)}</a> — ${n} tools</li>`;
  }).filter(Boolean).join("");

  const ld = [
    { "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];

  const body = `<main>
<h1>What Takes You 3 Hours — AI Does in 15 Minutes.</h1>
<p><strong>${total} premium AI tools</strong>, ${products.length} plans from ${fmtBDT(minPrice)} to ${fmtBDT(maxPrice)}. ChatGPT, Claude, Midjourney, Notion and more — <strong>no international card needed</strong>.</p>
<p>Pay with bKash, Nagad, Rocket, bank transfer or Binance. Delivery over WhatsApp, typically in 5–30 minutes, with a 30-day replacement warranty. Trusted by 10,000+ customers across Bangladesh since 2022.</p>

<h2>Most wanted AI subscriptions in Bangladesh</h2>
<ul>${featuredLi}</ul>

<h2>Browse by category</h2>
<ul>${catLi}</ul>

<h2>Find the right AI for your work</h2>
<ul>
<li><a href="/best-ai-for-students">Best AI tools for students</a></li>
<li><a href="/best-ai-for-freelancers">Best AI tools for freelancers</a></li>
<li><a href="/best-ai-for-developers">Best AI tools for developers</a></li>
<li><a href="/best-ai-for-creators">Best AI tools for content creators</a></li>
<li><a href="/best-ai-for-business">Best AI tools for business</a></li>
<li><a href="/best-ai-for-job-seekers">Best AI tools for job seekers</a></li>
</ul>

${faqs.length ? `<h2>Frequently asked questions</h2>${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}` : ""}

<p><a href="/products">Browse all ${total} AI tools</a> · <a href="/pricing">Pricing</a> · <a href="/bundles">Bundles</a> · <a href="/how-to-order">How to order</a> · <a href="/blog">AI guides</a> · <a href="/bn">বাংলা</a></p>
</main>`;

  writeRoute("/",
    `AI Premium Shop — ${total} Premium AI Tools Bangladesh | From BDT ${minPrice}`,
    `Buy ChatGPT, Claude, Midjourney, Copilot, DeepSeek and more AI tools in Bangladesh. bKash/Nagad payment, WhatsApp delivery. From BDT ${minPrice}/month.`,
    body, ld);
  console.log(`prerender: homepage written (${faqs.length} FAQs, ${featuredSlugs.length} featured brands)`);
}
