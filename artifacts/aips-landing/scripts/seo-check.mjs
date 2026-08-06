// Deterministic SEO/quality gate over the BUILT output (spec section 23).
//
// Runs against dist/public — no network. `audit-prerender.mjs` already checks
// that every sitemap route has static content, a unique title, one canonical and
// a meta description; this covers the rest of the section-23 list and the
// claim-integrity checks that are specific to this site's history:
//   * duplicate descriptions, missing/multiple H1
//   * soft-404 text served with a 200
//   * placeholder/loading text as crawlable content
//   * unsupported "official" / unscoped "unlimited" wording
//   * expired offer dates leaking into published HTML
//   * broken or malformed WhatsApp CTAs
//   * <img> without width/height (CLS) or without alt
//
// Usage: pnpm run seo:check          (fails the run on any error)
//        pnpm run seo:check --warn   (report only, exit 0)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(here, "..");
const DIST = path.join(APP, "dist/public");
const WARN_ONLY = process.argv.includes("--warn");

if (!fs.existsSync(DIST)) {
  console.error("seo-check: dist/public not found — run `pnpm run build` first.");
  process.exit(1);
}

const offer = JSON.parse(fs.readFileSync(path.join(APP, "data/higgsfield-offer.json"), "utf8"));

// --- /bn: the component and the static prerender must read the SAME source.
// Before this, BanglaBN.tsx carried its own hardcoded Bangla while the prerender
// emitted different content — two versions of the same page, one for crawlers
// and one for humans, with nothing keeping them honest.
{
  const bnPage = path.join(APP, "src/pages/BanglaBN.tsx");
  if (fs.existsSync(bnPage)) {
    const src = fs.readFileSync(bnPage, "utf8");
    if (!src.includes("bn-homepage.json")) {
      errors.push("src/pages/BanglaBN.tsx no longer reads data/bn-homepage.json — the Bangla page and its prerendered copy will drift apart");
    }
  }
}

// --- The pre-hydration snapshot styling must target the wrapper the prerender
// actually emits. These two live in different files (src/index.css and
// scripts/prerender-products.mjs) and nothing else couples them: when the
// wrapper was introduced, the CSS kept saying `#root > main`, matched nothing,
// and the whole block died silently — nobody notices, because the only audience
// for that styling is crawlers and no-JS clients, who do not file bug reports.
{
  const cssFiles = fs.existsSync(path.join(DIST, "assets"))
    ? fs.readdirSync(path.join(DIST, "assets")).filter((f) => f.endsWith(".css"))
    : [];
  if (!cssFiles.length) {
    errors.push("build: no CSS bundle found in dist/public/assets");
  } else {
    const css = cssFiles.map((f) => fs.readFileSync(path.join(DIST, "assets", f), "utf8")).join("\n");
    if (!css.includes("#prerender-shell>main") && !css.includes("#prerender-shell > main")) {
      errors.push(
        "src/index.css: the pre-hydration snapshot rules do not target `#prerender-shell > main`. " +
        "The prerender wraps every static body in #prerender-shell, so a `#root > main` selector " +
        "matches nothing and non-JS clients get an unstyled text dump.",
      );
    }
  }
}

const errors = [];
const warnings = [];

// Collect every built page.
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name === "index.html") {
      const route = "/" + path.relative(DIST, dir).split(path.sep).join("/");
      pages.push({ route: route === "/." ? "/" : route, file: full, html: fs.readFileSync(full, "utf8") });
    }
  }
})(DIST);

const strip = (html) => {
  let s = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
  s = s.replace(/<!--[\s\S]*?-->/g, "");
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
};
const one = (html, re) => { const m = html.match(re); return m ? m[1] : null; };

const titles = new Map();
const descs = new Map();

// Phrases that mean "this page has no real content" but still ship HTTP 200.
const SOFT_404 = [/\bpage not found\b/i, /\bproduct not found\b/i, /\b404\b/];
const PLACEHOLDER = [/\blorem ipsum\b/i, /\bcoming soon\b/i, /\bTODO\b/, /\bLoading AI Premium Shop\b/i];
// `undefined` and `NaN` are matched against RAW HTML in value positions only.
// Matching them as words in visible text is wrong: the Higgsfield page
// legitimately writes "'Unlimited' with an undefined boundary", which is prose,
// not a leaked JS value.
const VALUE_LEAK = [/>\s*(undefined|NaN)\s*</, /৳\s*(undefined|NaN)\b/, /\b(undefined|NaN)\s*\/\s*(mo|month)\b/, /:\s*(undefined|NaN)\s*[<,]/];

for (const p of pages) {
  const { route, html } = p;
  const text = strip(html);

  // --- title / description uniqueness
  const title = one(html, /<title>([\s\S]*?)<\/title>/);
  if (!title) errors.push(`${route}: missing <title>`);
  else {
    if (title.length > 70) warnings.push(`${route}: title is ${title.length} chars (>70 truncates in SERPs)`);
    if (!titles.has(title)) titles.set(title, []);
    titles.get(title).push(p);
  }
  const desc = one(html, /<meta name="description" content="([^"]*)"/);
  if (!desc) errors.push(`${route}: missing meta description`);
  else {
    if (!descs.has(desc)) descs.set(desc, []);
    descs.get(desc).push(route);
  }

  // --- headings
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length === 0) errors.push(`${route}: no <h1>`);
  else if (h1s.length > 1) errors.push(`${route}: ${h1s.length} <h1> elements (must be exactly 1)`);

  // --- canonical
  const canon = one(html, /<link rel="canonical" href="([^"]+)"/);
  if (!canon) errors.push(`${route}: missing canonical`);
  else if (!/^https:\/\/aipremiumshop\.com/.test(canon)) errors.push(`${route}: canonical is not on the canonical host — ${canon}`);
  p.canonicalPath = canon ? canon.replace(/^https:\/\/aipremiumshop\.com/, "") || "/" : route;

  // --- soft 404 / placeholder shipped as real content
  for (const re of SOFT_404) {
    if (re.test(text) && !/not-found/.test(route)) {
      errors.push(`${route}: soft-404 text "${text.match(re)[0]}" on a 200 page`);
      break;
    }
  }
  for (const re of PLACEHOLDER) {
    if (re.test(text)) { errors.push(`${route}: placeholder text "${text.match(re)[0]}" in crawlable content`); break; }
  }
  for (const re of VALUE_LEAK) {
    if (re.test(html)) { errors.push(`${route}: leaked JS value in rendered output — "${html.match(re)[0].trim()}"`); break; }
  }

  // --- thin content
  if (text.length < 600) warnings.push(`${route}: only ${text.length} chars of static content`);

  // --- the anti-flash contract (docs/performance/page-load-flash.md)
  // All three pieces must be present together. Any one of them missing brings
  // back a visible page-load flash, and each is one careless edit away:
  //   1. the prerendered SEO copy must be inside #prerender-shell,
  //   2. the stylesheet that hides it for JS browsers must be inline in <head>,
  //   3. the script that adds html.js must be inline and synchronous.
  const head = html.split("</head>")[0];
  if (!html.includes('id="prerender-shell"')) {
    errors.push(`${route}: prerendered body is not wrapped in #prerender-shell — it will paint as unstyled text before React mounts`);
  }

  // Check the inline CSS PARSES, not merely that the rule text is present.
  // Learned the hard way: a CSS comment closed with `-->` instead of `*/` left
  // the hide rule inside an unterminated comment. The text was there, the rule
  // was dead, and a presence-only check passed while the bug shipped.
  for (const m of head.matchAll(/<style>([\s\S]*?)<\/style>/g)) {
    const css = m[1];
    const opens = (css.match(/\/\*/g) || []).length;
    const closes = (css.match(/\*\//g) || []).length;
    if (opens !== closes) {
      errors.push(`${route}: inline <style> has ${opens} "/*" and ${closes} "*/" — an unterminated CSS comment silently kills every rule after it`);
    }
    if (/-->/.test(css)) {
      errors.push(`${route}: inline <style> contains "-->" — that is an HTML comment terminator, not CSS; use "*/"`);
    }
  }
  // With comments stripped, the rule must still be there — i.e. it is live CSS,
  // not commented-out text.
  const liveCss = [...head.matchAll(/<style>([\s\S]*?)<\/style>/g)]
    .map((m) => m[1].replace(/\/\*[\s\S]*?\*\//g, "")).join("\n");
  if (!/html\.js\s+#prerender-shell\s*\{[^}]*display:\s*none/.test(liveCss)) {
    errors.push(`${route}: the rule hiding #prerender-shell for JS browsers is missing or commented out`);
  }
  if (!/document\.documentElement\.className\s*\+=\s*["'] js["']/.test(head)) {
    errors.push(`${route}: <head> is missing the synchronous script that adds the .js class`);
  }
  if (!/background-color:\s*#0a0e27/.test(head)) {
    errors.push(`${route}: <head> is missing the inline background — first paint will be white`);
  }

  // --- claim integrity. "official" and "unlimited" are checked per SENTENCE
  //     here (not per block as in validate-higgsfield-offer) because rendered
  //     HTML has no block structure to key off; a negation anywhere in the same
  //     sentence is treated as sufficient.
  const NEG = /\b(no|not|never|neither|without|cannot)\b/i;
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    if (/\bofficial (partner|reseller|provider)\b/i.test(sentence) && !NEG.test(sentence)) {
      errors.push(`${route}: unsupported authorization claim — "${sentence.slice(0, 100)}"`);
    }
    if (/\bunlimited\b/i.test(sentence) && !NEG.test(sentence) && !/\b(fair.use|ceiling|scope|limit|credit)\b/i.test(sentence)) {
      warnings.push(`${route}: "unlimited" with no stated scope — "${sentence.slice(0, 100)}"`);
    }
    if (/\b(100% safe|zero risk|guaranteed permanent)\b/i.test(sentence)) {
      errors.push(`${route}: banned absolute-safety claim — "${sentence.slice(0, 100)}"`);
    }
  }

  // --- expired offer dates must never appear in published HTML
  if (offer.offer.expiredCreativeDate) {
    const d = new Date(offer.offer.expiredCreativeDate);
    const pretty = d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    if (text.includes(pretty) || text.includes(offer.offer.expiredCreativeDate)) {
      errors.push(`${route}: expired offer date "${pretty}" is published`);
    }
  }

  // --- WhatsApp CTAs must be well-formed
  for (const m of html.matchAll(/href="(https:\/\/wa\.me\/[^"]*)"/g)) {
    const href = m[1];
    if (!/^https:\/\/wa\.me\/8801865385348(\?|$)/.test(href)) {
      errors.push(`${route}: WhatsApp link has an unexpected number — ${href.slice(0, 60)}`);
    }
    // Spec section 18: no personal data in the URL.
    if (/\b(email|phone|name)=/i.test(href)) errors.push(`${route}: WhatsApp link carries personal-data params`);
  }

  // --- images: dimensions (CLS) and alt text
  for (const m of html.matchAll(/<img\b([^>]*)>/g)) {
    const attrs = m[1];
    if (!/\balt=/.test(attrs)) errors.push(`${route}: <img> without alt`);
    if (!(/\bwidth=/.test(attrs) && /\bheight=/.test(attrs)) && !/\bstyle="[^"]*aspect-ratio/.test(attrs)) {
      warnings.push(`${route}: <img> without width/height — a layout-shift source`);
    }
  }

  // --- JSON-LD must parse, and must not contradict the compliance state
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let json;
    try { json = JSON.parse(m[1]); }
    catch { errors.push(`${route}: JSON-LD does not parse`); continue; }
    const nodes = Array.isArray(json) ? json : [json];
    for (const n of nodes) {
      if (n.aggregateRating || n.review) errors.push(`${route}: JSON-LD carries rating/review data (none is verified)`);
      if (route.includes(offer.productSlug) && n.offers && offer.compliance.status === "inquiry-only") {
        errors.push(`${route}: JSON-LD emits an Offer while the offer is inquiry-only`);
      }
    }
  }
}

// --- cross-page duplicates
for (const [title, group] of titles) {
  if (group.length < 2) continue;
  const canonicals = new Set(group.map((g) => g.canonicalPath));
  if (canonicals.size === 1) continue; // alias set sharing one canonical — intended
  const routes = group.map((g) => g.route);
  errors.push(`duplicate title across ${routes.length} competing pages ("${title.slice(0, 60)}"): ${routes.slice(0, 4).join(", ")}${routes.length > 4 ? " …" : ""}`);
}
for (const [desc, routes] of descs) {
  if (routes.length > 1) warnings.push(`duplicate meta description across ${routes.length} pages: ${routes.slice(0, 4).join(", ")}${routes.length > 4 ? " …" : ""}`);
}

// --- report
console.log(`seo-check: scanned ${pages.length} built pages`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings.slice(0, 40)) console.log(`  warn  ${w}`);
  if (warnings.length > 40) console.log(`  … and ${warnings.length - 40} more`);
}
if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors.slice(0, 60)) console.error(`  FAIL  ${e}`);
  if (errors.length > 60) console.error(`  … and ${errors.length - 60} more`);
  if (!WARN_ONLY) process.exit(1);
}
if (!errors.length) console.log("seo-check: no errors");
