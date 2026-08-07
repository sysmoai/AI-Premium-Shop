// Post-build prerender for /product/<slug> routes.
//
// The SPA ships an empty <div id="root"> for every URL, so crawlers that don't
// execute JS see 271 identical blank shells. This writes real static HTML —
// per-page <title>, meta description, canonical, JSON-LD, and readable body
// content — into dist/public/product/<slug>/index.html. Vercel serves a
// static file match directly (no rewrite involved) for any of these paths,
// while the bundled SPA still hydrates and takes over on load
// (createRoot().render() replaces the static children). vercel.json no
// longer has a catch-all rewrite to /index.html — see that file and the
// /404.html generation below for why.
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
const hfOffer = JSON.parse(fs.readFileSync(path.join(APP, "data/higgsfield-offer.json"), "utf8"));

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

// Every prerendered body is wrapped in #prerender-shell. index.html hides that
// id for any browser that runs JS, so the class-free SEO copy is never painted
// to a human — see the comment in index.html and
// docs/performance/page-load-flash.md. Crawlers that cannot execute JS still
// receive it as ordinary visible HTML.
const shell = (body) => `<div id="prerender-shell">${body}</div>`;

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtBDT = (n) => `৳${n.toLocaleString("en-US")}`;

// The Higgsfield page is a dedicated component (HiggsfieldPage.tsx), not the
// generic product template, so the generic body builder below would emit a
// static page that says something different from what React renders. This
// mirrors the component's own sections from the same JSON source of truth.
//
// The unverified-claims and disclaimer sections are included deliberately: they
// are the parts a crawler and an AI answer engine most need to see, and
// omitting them from the static body would mean the pre-JS page reads as a
// straightforward sales page while the hydrated one carries the caveats.
function higgsfieldBody() {
  const off = hfOffer.offer;
  const p = hfOffer.platform;
  const li = (arr, f) => `<ul>${arr.map(f).join("")}</ul>`;
  return `
<nav aria-label="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
  <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="item" href="/"><span itemprop="name">Home</span></a><meta itemprop="position" content="1" />
  </span> ›
  <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="item" href="${esc(hfOffer.related.categoryPath)}"><span itemprop="name">AI Video</span></a><meta itemprop="position" content="2" />
  </span> ›
  <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <span itemprop="name">${esc(p.vendor)} AI</span><meta itemprop="position" content="3" />
  </span>
</nav>
<main>
<h1>${esc(hfOffer.seo.h1)}</h1>
<p>${esc(p.summary)}</p>
<p><strong>Indicative price: ${fmtBDT(off.priceBDT)} for ${off.durationMonths} month.</strong> ${esc(off.priceNote)}</p>
<p>${esc(hfOffer.compliance.disclaimer)}</p>

<section><h2>Who owns the account</h2>
<p>${esc(off.accountOwnershipNote)}</p>
${li([["Account owner", "You"], ["Renewal controlled by", "You, directly with the vendor"], ["Cancellation controlled by", "You, directly with the vendor"]],
  ([k, v]) => `<li>${esc(k)}: ${esc(v)}</li>`)}
</section>

<section><h2>What the platform does</h2>
${li(p.capabilities, (c) => `<li>${esc(c)}</li>`)}
<p>Source: <a href="${esc(p.sourceUrl)}" rel="nofollow noopener">${esc(p.sourceUrl)}</a> — verified ${esc(p.verifiedOn)}.</p>
</section>

<section><h2>How the credit system works</h2>
<p>${esc(hfOffer.credits.explainer)}</p>
<h3>Ask us these before you pay</h3>
${li(hfOffer.credits.questionsToAsk, (q) => `<li>${esc(q)}</li>`)}
</section>

${hfOffer.platformVerifiedFacts?.items?.length ? `<section><h2>What we have verified about the platform</h2>
<p>General facts about Higgsfield itself, checked directly against the vendor's own current terms and blog pages — not this specific offer's plan or entitlements, which stay in the section below until confirmed.</p>
${li(hfOffer.platformVerifiedFacts.items, (f) => `<li>${esc(f.claim)} — <a href="${esc(f.sourceUrl)}" rel="nofollow noopener">source</a>, verified ${esc(f.verifiedOn)}</li>`)}
</section>` : ""}

<section><h2>What we have not verified</h2>
<p>These were supplied to us as selling points. We have not confirmed them against current vendor documentation or the account interface, so they are listed as open questions rather than features.</p>
${li(hfOffer.pendingVerification.items, (i) => `<li><strong>${esc(i.claim)}</strong> — ${esc(i.why)}</li>`)}
</section>

<section><h2>What people use it for</h2>
${p.useCases.map((u) => `<h3>${esc(u.title)}</h3><p>${esc(u.body)}</p>`).join("")}
</section>

<section><h2>Who should not buy this</h2>
${li(p.notSuitableFor, (n) => `<li>${esc(n)}</li>`)}
</section>

<section><h2>How it works</h2>
<p>Payment methods: ${esc(hfOffer.payment.methods.join(", "))}. ${esc(hfOffer.payment.note)}</p>
<ol>${hfOffer.process.map((s) => `<li><strong>${esc(s.step)}</strong> — ${esc(s.body)}</li>`).join("")}</ol>
</section>

<section><h2>Alternatives in AI Video</h2>
${li(hfOffer.related.alternatives, (a) => {
    // Mirror productPath(): slugs in BRAND_PAGE_SLUGS live at /{slug}; only the
    // rest are under /product/{slug}. Hardcoding /product/ here shipped four
    // broken links that audit-prerender caught — the React component was right
    // because it calls productPath(), this string builder has to match it.
    const href = brandSlugs.has(a.slug) ? `/${a.slug}` : `/product/${a.slug}`;
    const rec = products.find((p) => p.slug === a.slug);
    const label = rec ? rec.name.split(/—\s*/)[0].trim() : a.slug.replace(/-bangladesh$/, "").replace(/-/g, " ");
    return `<li><a href="${esc(href)}">${esc(label)}</a> — ${esc(a.why)}</li>`;
  })}
<p><a href="${esc(hfOffer.related.categoryPath)}">Compare every AI video tool</a></p>
</section>

<section><h2>Frequently asked questions</h2>
${hfOffer.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}
</section>

<p><a href="https://wa.me/8801865385348?text=${encodeURIComponent(`Hi, I'm asking about ${hfOffer.platform.vendor} AI via AI Premium Shop.
Plan: ${off.durationMonths} month · Indicative: ${fmtBDT(off.priceBDT)}
Page: ${hfOffer.canonical}
What I want to make: `)}" rel="noopener">Check the current price on WhatsApp</a></p>
<p><a href="/products">Browse all AI tools</a> · <a href="/pricing">Pricing</a> · <a href="/how-to-order">How to order</a></p>
</main>`;
}

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
  const isHiggsfield = slug === hfOffer.productSlug;
  const title = isHiggsfield ? hfOffer.seo.title : seo.title;
  const desc = isHiggsfield ? hfOffer.seo.metaDescription : (seo.metaDescription ?? seo.desc);

  const faqs = isHiggsfield ? hfOffer.faq : (p.faq ?? []);
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
  const body = isHiggsfield ? higgsfieldBody() : `
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
    .replace('<div id="root"></div>', `<div id="root">${shell(body)}</div>`);
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

  // Plain alias routes: <Route path="/x" component={SomePage} />, where two
  // different paths share one component and that component declares a single
  // fixed canonical. Handled generically rather than per-page — /privacy and
  // /privacy-policy both render PrivacyPolicyPage, whose SEOHead canonicalises
  // to /privacy-policy, but the prerender was self-canonicalising each path and
  // therefore shipping two competing pages with identical titles. seo-check.mjs
  // flags exactly this, and any future alias of the same shape is now covered.
  const byComponent = new Map(); // component name -> [route, ...]
  for (const m of appSrc.matchAll(/<Route path="(\/[^"]*)"\s+component=\{(\w+)\}\s*\/>/g)) {
    if (!byComponent.has(m[2])) byComponent.set(m[2], []);
    byComponent.get(m[2]).push(m[1]);
  }
  for (const [component, routes] of byComponent) {
    if (routes.length < 2) continue;
    const file = path.join(APP, `src/pages/${component}.tsx`);
    if (!fs.existsSync(file)) continue;
    const declaredCanonical = fs.readFileSync(file, "utf8").match(/canonical=["']([^"']+)["']/)?.[1];
    if (!declaredCanonical) {
      console.warn(`prerender: ${component} serves ${routes.length} routes but declares no canonical — duplicate-content risk at ${routes.join(", ")}`);
      continue;
    }
    for (const r of routes) {
      if (declaredCanonical !== `${SITE}${r}`) map.set(r, declaredCanonical);
    }
  }
  return map;
})();

// Reciprocal EN <-> BN route pairs for hreflang. Mirrors GuidePage.tsx's own
// BANGLA_ALTERNATE map (kept in sync manually — that file's comment says the
// same) plus the homepage and the one Bangla page outside GuidePage's system
// (EducatorsBangla, which pairs with /guides/educators, not a /best-ai-for-*
// route). A route with no entry here gets NO hreflang alternate tags at all.
//
// Previously every route got the SAME static 3 tags from index.html's
// template — hardcoded there because that file is the initial HTML for every
// route (Vercel serves it as the fallback shell) and nothing overrode it for
// prerendered pages. That was already a fix for a worse bug (hreflang="bn"
// pointing at /faq sitewide) but still asserted the HOMEPAGE's pair on
// 265+ pages that have no Bangla equivalent — telling Google e.g.
// /best-ai-for-students' Bangla alternate is the homepage, not /students-bn.
// SEOHead.tsx's useEffect DOES set the correct pair client-side for the 6
// pages that have one, but only after React mounts — never reaching the
// prerendered HTML crawlers and view-source see. This fixes both: correct
// pairs where one exists, none where it doesn't, in the static HTML itself.
const HREFLANG_PAIRS = {
  "/": "/bn",
  "/bn": "/",
  "/best-ai-for-students": "/students-bn",
  "/students-bn": "/best-ai-for-students",
  "/best-ai-for-freelancers": "/freelancers-bn",
  "/freelancers-bn": "/best-ai-for-freelancers",
  "/best-ai-for-creators": "/creators-bn",
  "/creators-bn": "/best-ai-for-creators",
  "/best-ai-for-business": "/smb-bn",
  "/smb-bn": "/best-ai-for-business",
  "/best-ai-for-developers": "/developers-bn",
  "/developers-bn": "/best-ai-for-developers",
  "/guides/educators": "/educators-bn",
  "/educators-bn": "/guides/educators",
};
const isBnRoute = (r) => HREFLANG_PAIRS[r] !== undefined && (r === "/bn" || r.endsWith("-bn"));

const writeRoute = (route, title, desc, body, extraLd = [], lang = null) => {
  const canonical = ALIAS_CANONICAL.get(route) ?? `${SITE}${route === "/products" ? "/products" : route}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace('<div id="root"></div>', `<div id="root">${shell(body)}</div>`);
  // index.html is the shell for EVERY route and hardcodes lang="en", so the
  // Bangla pages were serving Bangla prose inside an English document — wrong
  // for crawlers, for hreflang consistency and for screen readers.
  if (lang) html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  // Strip index.html's static hreflang block (correct only for "/" and "/bn"
  // themselves) — replaced below with the route-correct set, or nothing.
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\n?/g, "");
  const bnAlt = HREFLANG_PAIRS[route];
  const hreflangTags = bnAlt
    ? isBnRoute(route)
      ? `<link rel="alternate" hreflang="bn-BD" href="${SITE}${route}" />
<link rel="alternate" hreflang="en-BD" href="${SITE}${bnAlt}" />
<link rel="alternate" hreflang="x-default" href="${SITE}${bnAlt}" />`
      : `<link rel="alternate" hreflang="en-BD" href="${SITE}${route}" />
<link rel="alternate" hreflang="bn-BD" href="${SITE}${bnAlt}" />
<link rel="alternate" hreflang="x-default" href="${SITE}${route}" />`
    : "";
  html = html.replace("</head>", `<link rel="canonical" href="${canonical}" />
${hreflangTags}
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


// ---- AI Video hub static body.
// /ai-video is the category with the strongest commercial intent, and its static
// body was a bare <ul> of products while React rendered a full decision hub —
// i.e. the useful content existed only for visitors who execute JS. This reads
// AIVideoHub.tsx's own JOBS array rather than restating it, so the two cannot
// drift the way typed prices historically have.
function aiVideoHubBody() {
  const src = fs.readFileSync(path.join(APP, "src/sections/AIVideoHub.tsx"), "utf8");
  const m = src.match(/const JOBS = (\[[\s\S]*?\n\];)/);
  if (!m) { console.warn("prerender: AIVideoHub JOBS array not matched — /ai-video hub body skipped"); return ""; }
  let jobs;
  try {
    // Drop `icon: Identifier,` — a component reference, not data.
    jobs = evalLiteral(m[1].replace(/\n\s*icon:\s*\w+,/g, "").replace(/;$/, ""));
  } catch (e) {
    console.warn("prerender: AIVideoHub JOBS eval failed —", e.message);
    return "";
  }
  const priceFor = (slug) => {
    const ps = products.filter((p) => p.slug === slug).map((p) => p.price).filter((n) => typeof n === "number");
    return ps.length ? ` — from ${fmtBDT(Math.min(...ps))}/month` : " — price on WhatsApp";
  };
  const nameFor = (slug) => {
    const rec = products.find((p) => p.slug === slug);
    return rec ? rec.name.split(/—\s*/)[0].trim() : slug;
  };
  return `
<section><h2>Which AI video tool do you actually need?</h2>
<p>"AI video" covers at least five different jobs, and the tools are not interchangeable between them. A platform that writes a cinematic scene from a sentence is a poor choice for animating your product photo, and neither one replaces an editor. Pick the job first — the tool follows.</p>
<p>Nearly all of these platforms bill in <strong>credits</strong>, not videos. A credit allowance is a budget: a longer clip on a heavier model costs more than a short clip on a light one. Ask what a single clip costs before you judge whether an allowance is generous.</p>
${jobs.map((j) => `<h3>${esc(j.title)}</h3><p>${esc(j.body)}</p><ul>${j.picks.map((sl) => `<li><a href="${linkFor(sl)}">${esc(nameFor(sl))}</a>${priceFor(sl)}</li>`).join("")}</ul>`).join("")}
</section>
<section><h2>Buying these from Bangladesh</h2>
<h3>Payment</h3><p>Every one of these platforms bills in USD, which most Bangladeshi debit cards cannot complete. We handle that step — you pay in BDT via bKash, Nagad, Rocket or bank transfer.</p>
<h3>Account ownership</h3><p>Check this before buying anywhere, including here. A personal plan means the account is in your name with your own password. Ask explicitly which type you are getting — the answer changes what happens if you want to cancel.</p>
<h3>How we verify</h3><p>Each product page carries the date we last checked its facts and a link to the provider's own pricing page. Where we have not verified a claim, we say so on the page rather than repeating it.</p>
</section>`;
}

let hubs = 0;
for (const [cat, label] of Object.entries(CATEGORY_LABELS)) {
  const list = distinct.filter((p) => p.category === cat);
  if (!list.length) continue;
  const meta = catMeta[cat] ?? { title: `${label} — Prices in BDT | AI Premium Shop Bangladesh`,
    desc: `${list.length} ${label} subscriptions with BDT prices. Pay with bKash or Nagad. AI Premium Shop Bangladesh.` };
  writeRoute(cat === "bundles" ? "/bundles" : `/${cat}`, meta.title, meta.desc,
    `<main><h1>${esc(label)}</h1><p>${esc(meta.desc)}</p>${cat === "ai-video" ? aiVideoHubBody() : ""}<ul>${list.map(productLi).join("")}</ul>
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
// Resolves a `price:` field lifted from GuidePage.tsx's `tools:` array,
// whether it's a plain string or a template literal calling tierPrice()/
// cheapestPriceFor() (both patterns are live in that file). Evaluated against
// this script's own already-loaded `products` array rather than importing
// the real catalogStats.ts module, since that file is TypeScript/ESM meant
// for the Vite build, not this plain-Node script.
function resolveGuidePrice(raw) {
  if (raw.startsWith('"')) return raw.slice(1, -1);
  const inner = raw.slice(1, -1); // strip backticks
  return inner.replace(/\$\{(tierPrice|cheapestPriceFor)\("([a-z0-9-]+)"(?:,\s*"([^"]+)")?\)\}/g, (_, fn, slug, tier) => {
    const recs = products.filter((p) => p.slug === slug && typeof p.price === "number");
    const match = fn === "tierPrice" ? recs.find((p) => p.tier === tier) : recs.sort((a, b) => a.price - b.price)[0];
    return match ? String(match.price) : "?";
  });
}

const guideSrc = fs.readFileSync(path.join(APP, "src/pages/GuidePage.tsx"), "utf8");
const guideBlock = (key) => {
  // Anchor on the unique `slug: "best-ai-for-<key>"` field inside the real
  // GUIDES content block, then walk backward for that block's own opening
  // brace — NOT a forward indexOf search from the top of the file.
  // GuidePage.tsx also has GUIDE_ICONS/GUIDE_GLOWS lookup maps earlier in the
  // file using the identical `"<key>": {` shape for any key that must be
  // quoted (hyphenated ones like "job-seekers" can't be a bare identifier in
  // either map), so a forward search found that unrelated icon-map entry
  // first, bounded the "block" all the way through to the next `\n  },` —
  // which landed inside GUIDES.students — and extracted ITS h1/copy for
  // /best-ai-for-job-seekers. Reproduced and confirmed as the cause of that
  // page prerendering the Students page's content — see
  // docs/homepage/executive-audit.md F4. Keys with no hyphen (designers,
  // marketers, ecommerce) never collided: their icon-map entries use extra
  // alignment spaces ("designers:     {") that don't match this lookup's
  // single-space pattern, so the forward search always skipped past them —
  // pure luck, not a property of the fix that was actually in place.
  const slugAt = guideSrc.indexOf(`slug: "best-ai-for-${key}"`);
  if (slugAt < 0) return null;
  let start = guideSrc.lastIndexOf(`  ${key}: {`, slugAt);
  const quotedStart = guideSrc.lastIndexOf(`  "${key}": {`, slugAt);
  if (quotedStart > start) start = quotedStart;
  if (start < 0) return null;
  const next = guideSrc.indexOf("\n  }," , start);
  return next < 0 ? null : guideSrc.slice(start, next);
};
for (const [key, meta] of Object.entries(GUIDE_META)) {
  const blk = guideBlock(key) ?? "";
  const h1 = blk.match(/h1:\s*"([^"]+)"/)?.[1] ?? meta.title;
  const whyH = blk.match(/whyHeading:\s*"([^"]+)"/)?.[1];
  const whyT = blk.match(/whyText:\s*"([^"]+)"/)?.[1];
  // price is either a plain string ("BDT 599/mo") or a template literal built
  // from tierPrice()/cheapestPriceFor() calls ({@link resolveGuidePrice}) —
  // both shapes are live in this file, so both must be handled or a fixed
  // price silently vanishes from the prerendered page (exactly what happened
  // the first time these calls were introduced and this regex wasn't updated).
  const tools = [...blk.matchAll(/rank:\s*\d+,\s*name:\s*"([^"]+)",\s*price:\s*(`[^`]+`|"[^"]+"),\s*reason:\s*"([^"]+)"/g)]
    .map((m) => ({ name: m[1], price: resolveGuidePrice(m[2]), reason: m[3] }));
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

// --- Comparison pages: full static body parsed directly out of ComparisonPage.tsx's
// COMPARISONS config — not hand-duplicated, so the static body cannot drift from
// what React renders (the previous version was a 3-line stub while the component
// itself carries a full aioSnippet, comparison table, verdict, and who-should-buy
// table that never reached static HTML — measured 16-53x smaller than the real page).
//
// Deliberately NOT eval/new Function, which would execute arbitrary code from the
// source file. This is a small hand-written parser that only understands literal
// data (strings, numbers, booleans, arrays, objects) — identifiers, template
// interpolation and function calls all throw rather than silently misparsing.
function parseJsLiteralAt(text, startIndex) {
  let i = startIndex;
  const n = text.length;
  const err = (msg) => { throw new Error(`parseJsLiteralAt: ${msg} at offset ${i}: ...${text.slice(Math.max(0, i - 20), i + 20)}...`); };
  const skipWs = () => {
    for (;;) {
      while (i < n && /\s/.test(text[i])) i++;
      if (text.startsWith("//", i)) { while (i < n && text[i] !== "\n") i++; continue; }
      if (text.startsWith("/*", i)) { const end = text.indexOf("*/", i + 2); i = end === -1 ? n : end + 2; continue; }
      break;
    }
  };
  const parseString = (quote) => {
    i++;
    let out = "";
    const escMap = { n: "\n", t: "\t", r: "\r", "\\": "\\", "'": "'", '"': '"', "`": "`" };
    while (i < n && text[i] !== quote) {
      if (text[i] === "\\") { const next = text[i + 1]; out += escMap[next] !== undefined ? escMap[next] : next; i += 2; }
      else { out += text[i]; i++; }
    }
    if (text[i] !== quote) err("unterminated string");
    i++;
    return out;
  };
  const parseValue = () => {
    skipWs();
    const c = text[i];
    if (c === '"' || c === "'" || c === "`") return parseString(c);
    if (c === "{") return parseObject();
    if (c === "[") return parseArray();
    if (text.startsWith("true", i) && !/[\w$]/.test(text[i + 4] || "")) { i += 4; return true; }
    if (text.startsWith("false", i) && !/[\w$]/.test(text[i + 5] || "")) { i += 5; return false; }
    if (text.startsWith("null", i) && !/[\w$]/.test(text[i + 4] || "")) { i += 4; return null; }
    if (/[-\d]/.test(c)) {
      const m = /^-?\d+(\.\d+)?([eE][+-]?\d+)?/.exec(text.slice(i));
      if (!m) err("bad number");
      i += m[0].length;
      return Number(m[0]);
    }
    err(`unexpected token '${c}'`);
  };
  const parseKey = () => {
    skipWs();
    const c = text[i];
    if (c === '"' || c === "'") return parseString(c);
    const m = /^[A-Za-z_$][\w$]*/.exec(text.slice(i));
    if (!m) err("bad object key");
    i += m[0].length;
    return m[0];
  };
  const parseObject = () => {
    i++;
    const obj = {};
    skipWs();
    while (text[i] !== "}") {
      const key = parseKey();
      skipWs();
      if (text[i] !== ":") err("expected ':'");
      i++;
      obj[key] = parseValue();
      skipWs();
      if (text[i] === ",") { i++; skipWs(); }
      else if (text[i] !== "}") err("expected ',' or '}'");
    }
    i++;
    return obj;
  };
  const parseArray = () => {
    i++;
    const arr = [];
    skipWs();
    while (text[i] !== "]") {
      arr.push(parseValue());
      skipWs();
      if (text[i] === ",") { i++; skipWs(); }
      else if (text[i] !== "]") err("expected ',' or ']'");
    }
    i++;
    return arr;
  };
  return parseValue();
}
const comparisonPageSrc = fs.readFileSync(path.join(APP, "src/pages/ComparisonPage.tsx"), "utf8");
const COMPARISONS_MARKER = "const COMPARISONS: Record<string, CompConfig> = ";
const comparisonsMarkerIdx = comparisonPageSrc.indexOf(COMPARISONS_MARKER);
if (comparisonsMarkerIdx === -1) throw new Error("prerender: COMPARISONS marker not found in ComparisonPage.tsx");
const COMPARISONS = parseJsLiteralAt(comparisonPageSrc, comparisonPageSrc.indexOf("{", comparisonsMarkerIdx));
const COMP_ROUTES = [
  { route: "/chatgpt-vs-claude", key: "chatgpt-vs-claude" },
  { route: "/chatgpt-vs-claude-bangladesh", key: "chatgpt-vs-claude" },
  { route: "/chatgpt-vs-gemini", key: "chatgpt-vs-gemini" },
  { route: "/copilot-vs-cursor", key: "copilot-vs-cursor" },
  { route: "/midjourney-vs-ideogram", key: "midjourney-vs-ideogram" },
];
for (const { route, key } of COMP_ROUTES) {
  const comp = COMPARISONS[key];
  if (!comp) continue;
  const nameA = comp.productA.name.split(" (")[0];
  const nameB = comp.productB.name.split(" (")[0];
  const cell = (v) => (typeof v === "boolean" ? (v ? "Yes" : "No") : String(v));
  const rowsHtml = comp.rows
    .map((r) => `<tr><td>${esc(r.feature)}</td><td>${esc(cell(r.a))}</td><td>${esc(cell(r.b))}</td></tr>`)
    .join("");
  const whoHtml = comp.whoTable
    .map((w) => `<tr><td>${esc(w.persona)}</td><td>${esc(w.pick)}</td><td>${esc(w.reason)}</td></tr>`)
    .join("");
  const relatedHtml = comp.relatedGuides.map((g) => `<li><a href="${g.href}">${esc(g.label)}</a></li>`).join("");
  const body = `<main>
<h1>${esc(comp.h1)}</h1>
<p>${esc(comp.aioSnippet)}</p>
<h2>${esc(nameA)} vs ${esc(nameB)} — feature comparison</h2>
<table><thead><tr><th>Feature</th><th>${esc(nameA)}</th><th>${esc(nameB)}</th></tr></thead>
<tbody>${rowsHtml}</tbody></table>
<h2>Our verdict</h2>
<p>${esc(comp.verdict)}</p>
<p><strong>Choose ${esc(nameA)}:</strong> ${esc(comp.verdictA)}</p>
<p><strong>Choose ${esc(nameB)}:</strong> ${esc(comp.verdictB)}</p>
${comp.buyBothText ? `<p><strong>Buy both:</strong> ${esc(comp.buyBothText)}</p>` : ""}
<h2>Who should choose what?</h2>
<table><thead><tr><th>If you are…</th><th>Our pick</th><th>Why</th></tr></thead>
<tbody>${whoHtml}</tbody></table>
${relatedHtml ? `<h2>Related guides</h2><ul>${relatedHtml}</ul>` : ""}
<p><a href="/products">All AI tools</a> · <a href="/pricing">Pricing</a></p>
</main>`;
  const ld = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: `${nameA} vs ${nameB}` },
    ]},
  ];
  writeRoute(route, comp.title, comp.metaDescription, body, ld);
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
//
// Mirrors src/lib/catalogStats.ts's formulas exactly. This script is plain
// Node and cannot import that TS/ESM module (same constraint documented on
// resolveGuidePrice() above), so the same numbers are recomputed here against
// the same already-loaded `products` array.
const listedPricesForStats = products.filter((p) => !p.requestPrice && p.price != null).map((p) => p.price);
const CATALOG_STATS = {
  TOTAL_PRODUCTS: distinct.length,
  TOTAL_PLANS: products.length,
  MIN_PRICE: Math.min(...listedPricesForStats),
  MAX_PRICE: Math.max(...listedPricesForStats),
};

// Resolves ${VarName} placeholders in an SEOHead title/description template
// literal against CATALOG_STATS. This used to just strip every ${...} blank,
// which is how /pricing, /about and /faq shipped meta descriptions like
// "tools from BDT ." to production — see docs/homepage/executive-audit.md F3.
// Unknown variables still strip blank (safer than leaking "${Foo}" into
// output) but warn, so a future new variable fails loudly instead of quietly
// reintroducing this bug.
const resolveInterpolation = (s, route) => s.replace(/\$\{(\w+)\}/g, (full, name) => {
  if (name in CATALOG_STATS) return String(CATALOG_STATS[name]);
  console.warn(`prerender: ${route} — unresolvable "\${${name}}" in SEOHead title/description, stripped blank`);
  return "";
});

// Parse SEOHead title/description: handles "string", {`template`}, and
// {'string'} forms. Each branch's character class excludes only its own
// delimiter — the previous combined backtick/single-quote branch excluded
// BOTH quote characters from inside a backtick string, so any copy with an
// apostrophe (AboutPage's "Bangladesh's") failed to match at all and silently
// fell through to the generic fallback description instead of its real one.
const parseSeoHead = (src, route) => {
  let title = null, desc = null;
  let m = src.match(/title="([^"]+)"/) || src.match(/title=\{`([^`]+)`\}/s) || src.match(/title=\{'([^']+)'\}/s) || src.match(/title=\{"([^"]*)"\}/);
  if (m) title = resolveInterpolation(m[1], route).replace(/\s+/g, " ").trim();
  m = src.match(/description="([^"]+)"/) || src.match(/description=\{`([^`]+)`\}/s) || src.match(/description=\{'([^']+)'\}/s) || src.match(/description=\{"([^"]*)"\}/);
  if (m) desc = resolveInterpolation(m[1], route).replace(/\s+/g, " ").trim();
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
  const { title: t, desc: d } = parseSeoHead(src, route);
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
// Full post bodies live in a second map in the same file, keyed by the same
// slugs, as JSX (`content: (...)`). Rather than ship a stub excerpt for 19
// fully-written guides, extract their real prose: JSX is consistent enough
// across posts (h2/h3/p/li plus a fixed set of helper components) that a
// structural parse is safe and never invents text — every string here is
// lifted verbatim from the component, or is a plain reformatting of its own
// literal props (e.g. StatCards' `items` array becomes a <ul>).
// Placeholder markers so real <a href> tags survive esc() at the call site
// (stripInlineJsx runs before esc(), and esc() would otherwise turn a kept
// anchor's quotes into &quot; and break it). Swapped back to real tags after
// escaping.
const A_OPEN = "\u0001", A_CLOSE = "\u0002", A_END = "\u0003";
function stripInlineJsx(s) {
  // Both <Link href="..."> (internal) and plain <a href="..." ...> (some
  // posts use raw anchors) collapse to a real link. The closing tag is also
  // marker-protected (not left as literal `</a>` text) -- otherwise esc()
  // downstream turns it into `&lt;/a&gt;`, since by then it looks like any
  // other piece of prose, not markup.
  return s
    .replace(/<Link\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/Link>/g, `${A_OPEN}$1${A_CLOSE}$2${A_END}`)
    .replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, `${A_OPEN}$1${A_CLOSE}$2${A_END}`)
    .replace(/<\/?(strong|em|span|br)[^>]*\/?>/g, "")
    .replace(/\{"\s*"\}/g, " ")
    .replace(/\{[^{}]*\}/g, "")
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
function restoreLinks(escaped) {
  return escaped
    .replace(/\u0001([^\u0001\u0002]*)\u0002/g, '<a href="$1">')
    .replace(/\u0003/g, "</a>");
}
function extractBlogBody(contentBlock) {
  const parts = [];
  // Walk top-level tags in document order across the handful of shapes every
  // post actually uses.
  const re = /<h2[^>]*>([\s\S]*?)<\/h2>|<h3[^>]*>([\s\S]*?)<\/h3>|<p[^>]*>([\s\S]*?)<\/p>|<StatCards\s+items=\{(\[[\s\S]*?\])\}\s*\/>|<StepIndicators\s+steps=\{(\[[\s\S]*?\])\}\s*\/>|<ComparisonTable[\s\S]*?headers=\{(\[[\s\S]*?\])\}[\s\S]*?rows=\{(\[[\s\S]*?\])\}[\s\S]*?\/>|<CalloutBox>([\s\S]*?)<\/CalloutBox>|<ul[^>]*>([\s\S]*?)<\/ul>|<ol[^>]*>([\s\S]*?)<\/ol>/g;
  let m;
  while ((m = re.exec(contentBlock))) {
    const [, h2, h3, p, statItems, stepItems, cmpHeaders, cmpRows, callout, ul, ol] = m;
    if (h2) parts.push(`<h2>${esc(stripInlineJsx(h2))}</h2>`);
    else if (h3) parts.push(`<h3>${esc(stripInlineJsx(h3))}</h3>`);
    else if (p) { const t = stripInlineJsx(p); if (t) parts.push(`<p>${esc(t)}</p>`); }
    else if (callout) parts.push(`<p><strong>${esc(stripInlineJsx(callout))}</strong></p>`);
    else if (statItems) {
      try {
        const items = evalLiteral(statItems);
        parts.push(`<ul>${items.map((i) => `<li>${esc(i.value)} — ${esc(i.label)}</li>`).join("")}</ul>`);
      } catch { /* skip if the literal doesn't parse cleanly */ }
    } else if (stepItems) {
      try {
        const steps = evalLiteral(stepItems);
        parts.push(`<ol>${steps.map((s) => `<li><strong>${esc(s.title)}</strong> — ${esc(s.desc)}</li>`).join("")}</ol>`);
      } catch { /* skip */ }
    } else if (cmpHeaders && cmpRows) {
      try {
        const headers = evalLiteral(cmpHeaders);
        const rows = evalLiteral(cmpRows, true);
        parts.push(`<table><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(String(c))}</td>`).join("")}</tr>`).join("")}</table>`);
      } catch { /* skip */ }
    } else if (ul) {
      const items = [...ul.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((x) => stripInlineJsx(x[1])).filter(Boolean);
      if (items.length) parts.push(`<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`);
    } else if (ol) {
      const items = [...ol.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((x) => stripInlineJsx(x[1])).filter(Boolean);
      if (items.length) parts.push(`<ol>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ol>`);
    }
  }
  return restoreLinks(parts.join("\n"));
}
// JSX object/array literals here are plain string/number data (no functions,
// no identifiers) — safe to evaluate directly rather than hand-writing a JSON
// parser for a syntax that's already valid JS.
function evalLiteral(src, rowsOfArrays = false) {
  // eslint-disable-next-line no-new-func
  return new Function(`return (${src});`)();
}

const postsMapStart = blogSrc.indexOf("\nconst POSTS: Record<");
const postsMapSrc = postsMapStart >= 0 ? blogSrc.slice(postsMapStart) : "";

let blogCount = 0;
for (const { slug, title, excerpt } of BLOG_UNIQUE) {
  const entryStart = postsMapSrc.indexOf(`"${slug}": {`);
  let bodyHtml = "";
  if (entryStart >= 0) {
    const contentStart = postsMapSrc.indexOf("content: (", entryStart);
    // Matching close paren for `content: ( ... ),` — find the next line that
    // is just `    ),` at the same indent, which is how every post in this
    // file closes its content block.
    const contentEnd = postsMapSrc.indexOf("\n    ),", contentStart);
    if (contentStart >= 0 && contentEnd >= 0) {
      bodyHtml = extractBlogBody(postsMapSrc.slice(contentStart, contentEnd));
    }
  }
  const desc = excerpt ? `${excerpt} | AI Premium Shop Bangladesh.` : `Read: ${title}. AI tools in Bangladesh with BDT prices. AI Premium Shop.`;
  writeRoute(`/blog/${slug}`, title, desc,
    `<main><h1>${esc(title)}</h1>
${bodyHtml || `<p>${esc(desc)}</p>`}
<p><a href="/blog">All blog posts</a> · <a href="/products">All AI tools</a> · <a href="/guides">AI Guides</a></p></main>`);
  blogCount++;
}
console.log(`prerender: blog — wrote ${blogCount} static post pages (${BLOG_UNIQUE.filter((b) => postsMapSrc.includes(`"${b.slug}": {`)).length} with full extracted body)`);

// --- Bangla pages (from BanglaBN.tsx, StudentsBN.tsx, etc.)
// ---- /bn homepage static body, rendered from data/bn-homepage.json.
// The Bangla routes previously shipped a ~156-char stub because the SEOHead
// parser below never matched their template-literal titles. Content now lives in
// one reviewable JSON file (the native-speaker review in BLOCKERS.md B7 is a job
// someone can finish against one file, not seven .tsx files), and BOTH this
// static body and BanglaBN.tsx read it — so they cannot diverge.
const bnHome = JSON.parse(fs.readFileSync(path.join(APP, "data/bn-homepage.json"), "utf8"));
function bnHomepageBody() {
  const d = bnHome;
  const sub = (t) => String(t)
    .replace(/\{\{TOTAL_PRODUCTS\}\}/g, bnDigits(distinct.length))
    .replace(/\{\{MIN_PRICE\}\}/g, bnDigits(Math.min(...products.map((p) => p.price).filter((n) => typeof n === "number"))));
  const E = (t) => esc(sub(t));
  const li = (arr, f) => `<ul>${arr.map(f).join("")}</ul>`;

  return `
<main>
<h1>${E(d.seo.h1)}</h1>
<p>${E(d.hero.sub)}</p>
${li(d.hero.trustItems, (t) => `<li>${E(t)}</li>`)}
<p><a href="${esc(d.hero.primaryCta.href)}" rel="noopener">${E(d.hero.primaryCta.label)}</a> · <a href="${esc(d.hero.secondaryCta.href)}">${E(d.hero.secondaryCta.label)}</a></p>
<p>${E(d.disclaimer)}</p>

<section><h2>${E(d.chooser.h2)}</h2>
<p>${E(d.chooser.intro)}</p>
${d.chooser.jobs.map((j) => `<h3>${E(j.title)}</h3><p>${E(j.body)}</p><p><a href="${esc(j.category)}">${E(j.title)} — সব টুল দেখুন</a></p>`).join("")}
<p>${E(d.chooser.creditNote)}</p>
</section>

<section><h2>${E(d.audiences.h2)}</h2>
${d.audiences.cards.map((c) => `<h3>${E(c.title)}</h3>
<p>যেসব সমস্যায় পড়েন:</p>${li(c.problems, (x) => `<li>${E(x)}</li>`)}
<p>যা করতে পারবেন:</p>${li(c.outcomes, (x) => `<li>${E(x)}</li>`)}
<p>${E(c.caution)}</p>
<p><a href="${esc(c.href)}">${E(c.title)}দের জন্য বিস্তারিত</a></p>`).join("")}
</section>

<section><h2>${E(d.planTypes.h2)}</h2>
<p>${E(d.planTypes.intro)}</p>
<table><thead><tr><th>বিষয়</th><th>নিজের নামের অ্যাকাউন্ট</th><th>শেয়ার্ড অ্যাকাউন্ট</th></tr></thead><tbody>
${d.planTypes.rows.map((r) => `<tr><td>${E(r.feature)}</td><td>${E(r.personal)}</td><td>${E(r.shared)}</td></tr>`).join("")}
</tbody></table>
<p>${E(d.planTypes.warning)}</p>
</section>

<section><h2>${E(d.howItWorks.h2)}</h2>
<ol>${d.howItWorks.steps.map((st) => `<li><strong>${E(st.title)}</strong> — ${E(st.body)}</li>`).join("")}</ol>
</section>

<section><h2>${E(d.faq.h2)}</h2>
${d.faq.items.map((f) => `<h3>${E(f.q)}</h3><p>${E(f.a)}</p>`).join("")}
</section>

<section><h2>${E(d.finalCta.h2)}</h2>
<p>${E(d.finalCta.body)}</p>
<p><a href="${esc(d.finalCta.primary.href)}" rel="noopener">${E(d.finalCta.primary.label)}</a> · <a href="${esc(d.finalCta.secondary.href)}">${E(d.finalCta.secondary.label)}</a></p>
</section>

<p>${d.footerLinks.map((l) => `<a href="${esc(l.href)}">${E(l.label)}</a>`).join(" · ")}</p>
</main>`;
}

const BANGLA_PAGES = {
  "/bn": { file: "BanglaBN.tsx", label: "হোম" },
  "/students-bn": { file: "StudentsBN.tsx", label: "শিক্ষার্থীদের জন্য" },
  "/developers-bn": { file: "DevelopersBN.tsx", label: "ডেভেলপারদের জন্য" },
  "/freelancers-bn": { file: "FreelancersBN.tsx", label: "ফ্রিল্যান্সারদের জন্য" },
  "/creators-bn": { file: "CreatorsBN.tsx", label: "কন্টেন্ট ক্রিয়েটরদের জন্য" },
  "/smb-bn": { file: "SMBBangla.tsx", label: "ব্যবসায়ীদের জন্য" },
  "/educators-bn": { file: "EducatorsBangla.tsx", label: "শিক্ষকদের জন্য" },
};
// The Bangla pages write their SEOHead title/description as TEMPLATE LITERALS
// (title={`...`}), not plain strings, so the old /title="([^"]+)"/ pattern never
// matched a single one of them — every Bangla route silently fell back to the
// generic label below and shipped ~156 chars of static content. Match both
// shapes, and resolve the catalog constants the template literals interpolate.
// Mirrors src/lib/catalogStats.ts, derived from the same products.json — so the
// static Bangla <title> can never quote a different figure from the rendered one.
const bnPrices = products.map((p) => p.price).filter((n) => typeof n === "number");
const bnConst = {
  MIN_PRICE: Math.min(...bnPrices),
  MAX_PRICE: Math.max(...bnPrices),
  TOTAL_PRODUCTS: distinct.length,
  TOTAL_PLANS: products.length,
};
// Bengali digits, matching bnNum() in the Bangla page components. A title that
// says "197টি" next to body copy saying "১৯৭টি" is the same inconsistency the
// brief calls out, just in the one place nobody looks at.
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const bnDigits = (v) => String(v).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
const resolveTpl = (raw) =>
  raw.replace(/\$\{(?:bnNum\()?([A-Z_]+)\)?\}/g, (_, k) =>
    (k in bnConst ? bnDigits(bnConst[k]) : `\${${k}}`));

for (const [route, { file, label }] of Object.entries(BANGLA_PAGES)) {
  const src = fs.readFileSync(path.join(APP, "src/pages", file), "utf8");
  const m = src.match(/title=\{?[`"]([^`"]+)[`"]\}?[\s\S]{0,400}?description=\{?[`"]([^`"]+)[`"]\}?/);
  if (!m) console.warn(`prerender: ${file} — could not parse SEOHead title/description; using fallback`);
  const isBnHome = route === "/bn";
  const title = isBnHome ? bnHome.seo.title : (m ? resolveTpl(m[1]) : `AI Premium Shop বাংলাদেশ — ${label}`);
  const desc = isBnHome ? bnHome.seo.description : (m ? resolveTpl(m[2]) : "প্রিমিয়াম AI টুলস বাংলাদেশে BDT মূল্যে। bKash বা Nagad-এ পেমেন্ট করুন।");
  const body = route === "/bn" && typeof bnHomepageBody === "function"
    ? bnHomepageBody()
    : `<main><h1>${esc(title)}</h1><p>${esc(desc)}</p>
<p><a href="/bn">হোম</a> · <a href="/products">সব AI টুল</a> · <a href="/guides">গাইড</a></p></main>`;
  // lang="bn-BD" on the document, so the inner lang="bn" attributes the old
  // version sprinkled around are no longer papering over an English <html>.
  writeRoute(route, title, desc, body, [], "bn-BD");
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

// ---- Homepage "Find Your Solution" section: the six audience cards
// (headline, problems, solution, price, CTA) from PainPointSection.tsx's own
// CARDS array. This section renders correctly for real users after hydration
// but was entirely absent from the prerendered/pre-hydration homepage HTML —
// every other major section on the site gets this treatment, this one was
// missed. See docs/homepage/executive-audit.md F5.
function solutionCardsBody() {
  const src = fs.readFileSync(path.join(APP, "src/sections/PainPointSection.tsx"), "utf8");
  const m = src.match(/const CARDS = (\[[\s\S]*?\n\];)/);
  if (!m) { console.warn("prerender: PainPointSection CARDS array not matched — homepage solution cards skipped"); return ""; }
  let cards;
  try {
    // Drop `Icon: Identifier,` / `SvgComp: Identifier,` — component
    // references, not data — and resolve the one catalog-derived price this
    // array uses (same technique as resolveGuidePrice() above).
    const literal = m[1]
      .replace(/\n\s*(Icon|SvgComp):\s*\w+,/g, "")
      .replace(/\$\{MIN_PRICE\}/g, String(CATALOG_STATS.MIN_PRICE))
      .replace(/;$/, "");
    cards = evalLiteral(literal);
  } catch (e) {
    console.warn("prerender: PainPointSection CARDS eval failed —", e.message);
    return "";
  }
  return `
<section aria-labelledby="solutions-heading">
<h2 id="solutions-heading">Find Your Solution — Every Problem Has an AI Solution</h2>
${cards.map((c) => `<article>
<h3>${esc(c.headline)}</h3>
<ul>${c.pains.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
<p><strong>Solution:</strong> ${esc(c.solution)}</p>
<p>${esc(c.price)} — <a href="${esc(c.href)}">${esc(c.cta)}</a></p>
</article>`).join("")}
</section>`;
}

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
<p>Pay with bKash, Nagad, Rocket or bank transfer. Delivery over WhatsApp, typically in 5–30 minutes, with a 30-day replacement warranty. Trusted by 10,000+ customers across Bangladesh since 2022.</p>

<h2>Most wanted AI subscriptions in Bangladesh</h2>
<ul>${featuredLi}</ul>

<h2>AI Video — make video ads, reels and avatars, paid for in taka</h2>
<p>${new Set(products.filter((x) => x.category === "ai-video").map((x) => x.slug)).size} AI video tools, covering five different jobs: generating footage from a prompt, animating a product photo, talking avatars, UGC-style ads, and editing what you already shot. They are not interchangeable — <a href="/ai-video">the category page walks you through which one fits your work</a>.</p>
<p><strong>${esc(hfOffer.platform.vendor)} AI</strong> — ${esc(hfOffer.platform.summary)} Indicative ${fmtBDT(hfOffer.offer.priceBDT)} for ${hfOffer.offer.durationMonths} month, enquiry only: ${hfOffer.pendingVerification.items.length} supplied claims about this plan are still unverified and are <a href="/product/${esc(hfOffer.productSlug)}">listed openly on the product page</a> rather than sold as features.</p>
<p>How we handle claims: product pages carry the date we last checked their facts, each links to the provider's own pricing page so you can check us, and where a claim is not verified we publish that instead of repeating it.</p>

<h2>Trending AI tools right now</h2>
<p>The searches climbing fastest this quarter, based on this site's own real search-console data — plan
comparisons, team accounts, and the tools people ask about most on WhatsApp.</p>
<ul>${[
  ["chatgpt-plans-comparison-bangladesh", "ChatGPT Plans — Plus vs Business vs Pro compared"],
  ["claude-pro-bangladesh", "Claude Team — for teams and small agencies"],
  ["gemini-advanced-bangladesh", "Google AI Pro — Gemini, 2TB storage, Workspace AI"],
  ["github-copilot-bangladesh", "GitHub Copilot — AI code completion in your IDE"],
  ["midjourney-bangladesh", "Midjourney — the image generator everyone asks for"],
  ["chatgpt-business-bangladesh", "ChatGPT Business — admin controls, no training on your data"],
].map(([slug, label]) => `<li><a href="/${slug}">${esc(label)}</a></li>`).join("")}</ul>

<h2>Browse by category</h2>
<ul>${catLi}</ul>

${solutionCardsBody()}

${faqs.length ? `<h2>Frequently asked questions</h2>${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}` : ""}

<p><a href="/products">Browse all ${total} AI tools</a> · <a href="/pricing">Pricing</a> · <a href="/bundles">Bundles</a> · <a href="/how-to-order">How to order</a> · <a href="/blog">AI guides</a> · <a href="/bn">বাংলা</a></p>
</main>`;

  writeRoute("/",
    `AI Premium Shop — ${total} Premium AI Tools Bangladesh | From BDT ${minPrice}`,
    `Buy ChatGPT, Claude, Midjourney, Copilot, DeepSeek and more AI tools in Bangladesh. bKash/Nagad payment, WhatsApp delivery. From BDT ${minPrice}/month.`,
    body, ld);
  console.log(`prerender: homepage written (${faqs.length} FAQs, ${featuredSlugs.length} featured brands)`);
}

// ---- /404.html — mirrors src/pages/not-found.tsx. vercel.json's rewrite
// used to send EVERY unmatched path to /index.html with an HTTP 200, so any
// invalid or mistyped URL (including ones crawlers try, like
// /products/<slug> — this app's real pattern is /product/<slug>, singular)
// rendered the homepage as if it were that page. The app's own client router
// already has a real `<Route component={NotFound} />` catch-all and shows it
// correctly once JS hydrates — but the pre-hydration paint and anything that
// doesn't execute JS saw the homepage at 200. Vercel serves a root-level
// 404.html (with a real 404 status) for any request that matches neither a
// static file nor a rewrite; removing the catch-all rewrite from vercel.json
// (see that file) lets this take over instead of index.html. See
// docs/homepage/executive-audit.md F1.
{
  const total = distinct.length;
  const body = `
<main>
<section style="min-height:70vh;display:flex;align-items:center;justify-content:center;padding:5rem 1rem;text-align:center">
<div>
<h1>404 — Page Not Found</h1>
<p>The page you're looking for doesn't exist or has been moved.</p>
<p><a href="/">Browse All ${total} AI Tools</a> · <a href="https://wa.me/8801865385348">Order on WhatsApp</a></p>
<p>Popular pages: <a href="/chatgpt-plans-bangladesh">ChatGPT Plans</a> · <a href="/claude-pro-bangladesh">Claude Pro</a> · <a href="/midjourney-bangladesh">Midjourney</a> · <a href="/bundles">Bundles</a></p>
</div>
</section>
</main>`;
  const title = "Page Not Found | AI Premium Shop";
  const desc = `The page you're looking for doesn't exist or has been moved. Browse ${total} AI tools on AI Premium Shop.`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace('<div id="root"></div>', `<div id="root">${shell(body)}</div>`)
    .replace("</head>", `<meta name="robots" content="noindex" />\n</head>`);
  fs.writeFileSync(path.join(DIST, "404.html"), html);
  console.log("prerender: wrote 404.html (static not-found body, robots noindex)");
}

// ============================================================================
// THIN-ROUTE ENRICHMENT — the largest measured SEO gap on this site.
//
// Audited 2026-08-07 across all 273 built pages: 37 were under 800 visible
// static characters while their React components render 2,000-13,000. /pricing
// was the worst — 253 static against 13,389 rendered, a 53x gap.
//
// Googlebot executes JS so it eventually sees the full page, but its render
// queue lags by days-to-weeks, and Bing (which feeds Copilot and other AI answer
// surfaces), most AI crawlers and every social unfurler do not render at all.
// Those clients were being served a stub of a page that is actually substantial.
//
// This sweep runs LAST and only touches routes still below the threshold, so the
// bespoke extractors above (products, blog, guides, /bn, categories, brands) are
// never overwritten — it can only add content to pages that have almost none.
//
// Extraction is deliberately conservative. Rather than parsing JSX into a DOM,
// it pulls the human-readable STRING LITERALS out of a component in source order
// and filters hard for prose: real sentences survive, class names, URLs, style
// values and identifiers do not. The result is the page's own copy, in its own
// order, with no invented text.
// ============================================================================

const ENRICH_MIN_CHARS = 800;

/** True for a string literal that is real page copy rather than code. */
function isProse(s) {
  if (s.length < 30 || s.length > 1200) return false;
  if ((s.match(/ /g) || []).length < 3) return false;          // needs >=4 words
  if (/^https?:\/\//.test(s) || /^[/#]/.test(s)) return false;  // URLs and paths
  if (/[{}<>]|\$\{/.test(s)) return false;                      // template/JSX fragments
  if (/(^|\s)(flex|grid|text-|bg-|px-|py-|rounded|border-|hover:|md:|sm:|lg:)/.test(s)) return false; // tailwind
  if (/#[0-9a-fA-F]{3,8}\b|rgba?\(|\d+px|\d+rem/.test(s)) return false; // css values
  if (!/[a-zA-Z\u0980-\u09FF]/.test(s)) return false;           // needs letters (Latin or Bengali)
  if (/^[A-Z0-9_]+$/.test(s)) return false;                     // CONST_KEYS
  // Defense in depth against the quote-collision class of bug fixed above:
  // reject anything that still looks like JS/TSX source rather than prose,
  // even if some future match spans a code boundary another way.
  if (/\buseState\(|\buseEffect\(|\buseMemo\(|\buseCallback\(|=>\s*\{|^\)[;,]|\bconst\s*\[|\bimport\s.*\bfrom\b/.test(s)) return false;
  return true;
}

/** Pull prose string literals from a component, in source order, deduped. */
function extractComponentProse(src) {
  // Strip imports and comments so their contents cannot leak into the page.
  let s = src.replace(/^import[\s\S]*?from\s*["'][^"']+["'];?$/gm, "");
  s = s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

  const out = [];
  const seen = new Set();

  // SOURCE 2 — JSX TEXT NODES. Components like PrivacyPolicyPage, TermsPage and
  // AboutPage keep their prose as literal text BETWEEN tags
  // (<h2>0. AI Assistant Conversations</h2>), not in quoted strings, so the
  // literal scan below finds almost nothing on them. Headings are emitted as
  // headings so the enriched page keeps a real outline rather than a wall of <p>.
  const jsxText = [];
  for (const m of s.matchAll(/<(h[1-4]|p|li|strong)\b[^>]*>([^<>{}]{12,900})<\/\1>/g)) {
    const tag = m[1];
    const text = m[2].replace(/\s+/g, " ").trim();
    if (!text || /^[{}\s]*$/.test(text)) continue;
    if (!/[a-zA-Zঀ-৿]/.test(text)) continue;
    // Headings may be short; body text must still look like prose.
    if (!/^h[1-4]$/.test(tag) && !isProse(text)) continue;
    if (/^h[1-4]$/.test(tag) && text.length < 4) continue;
    jsxText.push({ tag: /^h[1-4]$/.test(tag) ? "h3" : "p", text });
  }

  // Double-quoted, single-quoted, and backtick literals with no interpolation.
  //
  // The length floor here used to be {30,1200} — matching the {30,1200} floor
  // isProse() applies below. That let a short real literal (e.g. useState("all"))
  // fail to match on its own, so its closing quote got reinterpreted as the
  // OPENING quote of a fresh match that ran forward to the next same-type
  // quote — landing well past the string, into surrounding code. On
  // PricingPage.tsx this produced two adjacent 3-char useState("all") calls
  // and "captured" the raw source between them: "); const [accessFilter,
  // setAccessFilter] = useState(" — shipped to production inside a <p> tag.
  // Matching every literal ({0,1200}) and filtering by length in isProse()
  // instead means the regex always finds each literal's own real closing
  // quote, so it can never skip past one and treat code as prose.
  for (const m of s.matchAll(/"((?:[^"\\]|\\.){0,1200})"|'((?:[^'\\]|\\.){0,1200})'|`([^`$\\]{0,1200})`/g)) {
    const raw = (m[1] ?? m[2] ?? m[3] ?? "").replace(/\\"/g, '"').replace(/\\'/g, "'").trim();
    if (!isProse(raw)) continue;
    const key = raw.slice(0, 60);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(raw);
  }
  // Literals first (they are usually the structured content arrays), then the
  // JSX prose, deduped against each other.
  const blocks = out.map((t) => ({ tag: "p", text: t }));
  for (const b of jsxText) {
    const key = b.text.slice(0, 60);
    if (seen.has(key)) continue;
    seen.add(key);
    blocks.push(b);
  }
  return blocks;
}

// route -> component file, parsed from App.tsx so it cannot drift from reality.
const appSrcForEnrich = fs.readFileSync(path.join(APP, "src/App.tsx"), "utf8");
const ROUTE_COMPONENT = new Map();
for (const m of appSrcForEnrich.matchAll(/<Route path="(\/[^"]*)"\s+component=\{(\w+)\}/g)) {
  ROUTE_COMPONENT.set(m[1], m[2]);
}
// Lazy-import map: `const AboutPage = lazy(() => import("@/pages/AboutPage"))`
const COMPONENT_FILE = new Map();
for (const m of appSrcForEnrich.matchAll(/const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\("@\/(pages\/[\w/]+)"\)\)/g)) {
  COMPONENT_FILE.set(m[1], `src/${m[2]}.tsx`);
}
for (const m of appSrcForEnrich.matchAll(/import\s+(\w+)\s+from\s+"@\/(pages\/[\w/]+)"/g)) {
  COMPONENT_FILE.set(m[1], `src/${m[2]}.tsx`);
}

const visibleLen = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "")
  .replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;

let enriched = 0, enrichSkipped = 0;
const enrichedRoutes = [];
for (const [route, component] of ROUTE_COMPONENT) {
  const file = COMPONENT_FILE.get(component);
  if (!file) continue;
  const outFile = path.join(DIST, route.replace(/^\//, ""), "index.html");
  if (!fs.existsSync(outFile)) continue;

  const html = fs.readFileSync(outFile, "utf8");
  if (visibleLen(html) >= ENRICH_MIN_CHARS) { enrichSkipped++; continue; }

  const srcPath = path.join(APP, file);
  if (!fs.existsSync(srcPath)) continue;
  const prose = extractComponentProse(fs.readFileSync(srcPath, "utf8"));
  if (prose.length < 3) continue;

  const extra = `<section>${prose.map((b) => `<${b.tag}>${esc(b.text)}</${b.tag}>`).join("")}</section>`;
  // Append INSIDE the existing <main> so the page keeps its single h1 and its
  // existing links, rather than growing a second document.
  const updated = html.includes("</main>")
    ? html.replace("</main>", `${extra}</main>`)
    : html.replace('</div>\n</body>', `${extra}</div>\n</body>`);
  if (updated === html) continue;
  fs.writeFileSync(outFile, updated);
  enriched++;
  enrichedRoutes.push(`${route}(${prose.length})`);
}
console.log(`prerender: enriched ${enriched} thin routes from their components (${enrichSkipped} already above ${ENRICH_MIN_CHARS} chars)`);
console.log(`prerender: enriched -> ${enrichedRoutes.join(", ")}`);
