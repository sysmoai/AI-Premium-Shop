// Deterministic SEO/quality gate over the built public output.
// Hard correctness, safety and rendering checks scan every built page. Warning-
// level search signals (SERP title length, thin static copy, unscoped usage
// language and duplicate descriptions) are limited to the final pruned sitemap,
// which is the publication authority for canonical/indexable URLs.

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
const errors = [];
const warnings = [];

const sitemapPath = path.join(DIST, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) {
  console.error("seo-check: final dist/public/sitemap.xml is missing — cannot determine the canonical/indexable warning set.");
  process.exit(1);
}
const sitemapXml = fs.readFileSync(sitemapPath, "utf8");
const indexableRoutes = new Set(
  [...sitemapXml.matchAll(/<loc>https:\/\/aipremiumshop\.com([^<]*)<\/loc>/g)]
    .map((match) => match[1] || "/"),
);
if (!indexableRoutes.size) {
  console.error("seo-check: final sitemap contains no canonical/indexable routes.");
  process.exit(1);
}

// Branded noindex 404 contract.
{
  const notFoundPath = path.join(DIST, "404.html");
  if (!fs.existsSync(notFoundPath)) {
    errors.push("dist/public/404.html is missing");
  } else {
    const html = fs.readFileSync(notFoundPath, "utf8");
    if (!/noindex/.test(html)) errors.push("dist/public/404.html: missing robots noindex");
    if (!/404/.test(html)) errors.push("dist/public/404.html: no 404 text");
  }
}

// Bangla runtime/prerender must share the same source.
{
  const bnPage = path.join(APP, "src/pages/BanglaBN.tsx");
  if (fs.existsSync(bnPage)) {
    const src = fs.readFileSync(bnPage, "utf8");
    if (!src.includes("bn-homepage.json")) errors.push("src/pages/BanglaBN.tsx no longer reads data/bn-homepage.json");
  }
}

// Pre-hydration snapshot styling contract.
{
  const assets = path.join(DIST, "assets");
  const cssFiles = fs.existsSync(assets) ? fs.readdirSync(assets).filter((file) => file.endsWith(".css")) : [];
  if (!cssFiles.length) {
    errors.push("build: no CSS bundle found in dist/public/assets");
  } else {
    const css = cssFiles.map((file) => fs.readFileSync(path.join(assets, file), "utf8")).join("\n");
    if (!css.includes("#prerender-shell>main") && !css.includes("#prerender-shell > main")) {
      errors.push("src/index.css: pre-hydration snapshot rules do not target #prerender-shell > main");
    }
  }
}

const pages = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "index.html") {
      const relative = path.relative(DIST, dir).split(path.sep).join("/");
      const route = relative ? `/${relative}` : "/";
      pages.push({ route, file: full, html: fs.readFileSync(full, "utf8") });
    }
  }
})(DIST);

const strip = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replace(/<style[\s\S]*?<\/style>/g, "")
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();
const one = (html, regex) => {
  const match = html.match(regex);
  return match ? match[1] : null;
};

const titles = new Map();
const descriptions = new Map();
const SOFT_404 = [/\bpage not found\b/i, /\bproduct not found\b/i, /\b404\b/];
const PLACEHOLDER = [/\blorem ipsum\b/i, /\bcoming soon\b/i, /\bTODO\b/, /\bLoading AI Premium Shop\b/i];
const VALUE_LEAK = [/>\s*(undefined|NaN)\s*</, /৳\s*(undefined|NaN)\b/, /\b(undefined|NaN)\s*\/\s*(mo|month)\b/, /:\s*(undefined|NaN)\s*[<,]/];
const SOURCE_LEAK = [
  /\buseState\(|\buseEffect\(|\buseMemo\(|\buseCallback\(/,
  /\bconst\s*\[\s*\w+,\s*set[A-Z]\w*\s*\]/,
  /=>\s*\{/,
  /^\)[;,]/m,
  /\bimport\s+[\w{}, ]+\s+from\s+["']/,
  /\bclassName=["']/,
];

for (const page of pages) {
  const { route, html } = page;
  const text = strip(html);
  const isIndexable = indexableRoutes.has(route);

  const title = one(html, /<title>([\s\S]*?)<\/title>/);
  if (!title) errors.push(`${route}: missing <title>`);
  else {
    if (isIndexable && title.length > 70) warnings.push(`${route}: title is ${title.length} chars (>70 truncates in SERPs)`);
    if (!titles.has(title)) titles.set(title, []);
    titles.get(title).push(page);
  }

  const description = one(html, /<meta name="description" content="([^"]*)"/);
  if (!description) errors.push(`${route}: missing meta description`);
  else if (isIndexable) {
    if (!descriptions.has(description)) descriptions.set(description, []);
    descriptions.get(description).push(route);
  }

  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length === 0) errors.push(`${route}: no <h1>`);
  else if (h1s.length > 1) errors.push(`${route}: ${h1s.length} <h1> elements (must be exactly 1)`);

  const canonical = one(html, /<link rel="canonical" href="([^"]+)"/);
  if (!canonical) errors.push(`${route}: missing canonical`);
  else if (!/^https:\/\/aipremiumshop\.com/.test(canonical)) errors.push(`${route}: canonical is not on the canonical host — ${canonical}`);
  page.canonicalPath = canonical ? canonical.replace(/^https:\/\/aipremiumshop\.com/, "") || "/" : route;

  for (const regex of SOFT_404) {
    if (regex.test(text) && !/not-found/.test(route)) {
      errors.push(`${route}: soft-404 text "${text.match(regex)[0]}" on a 200 page`);
      break;
    }
  }
  for (const regex of PLACEHOLDER) {
    if (regex.test(text)) {
      errors.push(`${route}: placeholder text "${text.match(regex)[0]}" in crawlable content`);
      break;
    }
  }
  for (const regex of VALUE_LEAK) {
    if (regex.test(html)) {
      errors.push(`${route}: leaked JS value in rendered output — "${html.match(regex)[0].trim()}"`);
      break;
    }
  }
  for (const regex of SOURCE_LEAK) {
    if (regex.test(text)) {
      errors.push(`${route}: leaked JS/TSX source fragment in crawlable text — "${text.match(regex)[0].trim()}"`);
      break;
    }
  }

  if (isIndexable && text.length < 600) warnings.push(`${route}: only ${text.length} chars of static content`);

  const head = html.split("</head>")[0];
  if (!html.includes('id="prerender-shell"')) errors.push(`${route}: prerendered body is not wrapped in #prerender-shell`);
  for (const match of head.matchAll(/<style>([\s\S]*?)<\/style>/g)) {
    const css = match[1];
    const opens = (css.match(/\/\*/g) || []).length;
    const closes = (css.match(/\*\//g) || []).length;
    if (opens !== closes) errors.push(`${route}: inline <style> has ${opens} /* and ${closes} */`);
    if (/-->/.test(css)) errors.push(`${route}: inline <style> contains --> instead of a CSS comment terminator`);
  }
  const liveCss = [...head.matchAll(/<style>([\s\S]*?)<\/style>/g)]
    .map((match) => match[1].replace(/\/\*[\s\S]*?\*\//g, ""))
    .join("\n");
  if (!/html\.js\s+#prerender-shell\s*\{[^}]*display:\s*none/.test(liveCss)) errors.push(`${route}: live CSS does not hide #prerender-shell for JS browsers`);
  if (!/document\.documentElement\.className\s*\+=\s*["'] js["']/.test(head)) errors.push(`${route}: missing synchronous html.js bootstrap`);
  if (!/background-color:\s*#0a0e27/.test(head)) errors.push(`${route}: missing inline first-paint background`);

  const NEGATION = /\b(no|not|never|neither|without|cannot)\b/i;
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    if (/\bofficial (partner|reseller|provider)\b/i.test(sentence) && !NEGATION.test(sentence)) {
      errors.push(`${route}: unsupported authorization claim — "${sentence.slice(0, 100)}"`);
    }
    if (isIndexable && /\bunlimited\b/i.test(sentence) && !NEGATION.test(sentence) && !/\b(fair.use|ceiling|scope|limit|credit)\b/i.test(sentence)) {
      warnings.push(`${route}: "unlimited" with no stated scope — "${sentence.slice(0, 100)}"`);
    }
    if (/\b(100% safe|zero risk|guaranteed permanent)\b/i.test(sentence)) {
      errors.push(`${route}: banned absolute-safety claim — "${sentence.slice(0, 100)}"`);
    }
  }

  if (offer.offer.expiredCreativeDate) {
    const date = new Date(offer.offer.expiredCreativeDate);
    const pretty = date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    if (text.includes(pretty) || text.includes(offer.offer.expiredCreativeDate)) errors.push(`${route}: expired offer date "${pretty}" is published`);
  }

  for (const match of html.matchAll(/href="(https:\/\/wa\.me\/[^"]*)"/g)) {
    const href = match[1];
    if (!/^https:\/\/wa\.me\/8801865385348(\?|$)/.test(href)) errors.push(`${route}: WhatsApp link has an unexpected number — ${href.slice(0, 60)}`);
    if (/\b(email|phone|name)=/i.test(href)) errors.push(`${route}: WhatsApp link carries personal-data params`);
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/g)) {
    const attrs = match[1];
    if (!/\balt=/.test(attrs)) errors.push(`${route}: <img> without alt`);
    if (!(/\bwidth=/.test(attrs) && /\bheight=/.test(attrs)) && !/\bstyle="[^"]*aspect-ratio/.test(attrs)) warnings.push(`${route}: <img> without width/height — a layout-shift source`);
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let json;
    try {
      json = JSON.parse(match[1]);
    } catch {
      errors.push(`${route}: JSON-LD does not parse`);
      continue;
    }
    const nodes = Array.isArray(json) ? json : [json];
    for (const node of nodes) {
      if (node.aggregateRating || node.review) errors.push(`${route}: JSON-LD carries rating/review data (none is verified)`);
      if (route.includes(offer.productSlug) && node.offers && offer.compliance.status === "inquiry-only") errors.push(`${route}: JSON-LD emits an Offer while the offer is inquiry-only`);
    }
  }
}

for (const [title, group] of titles) {
  if (group.length < 2) continue;
  const canonicals = new Set(group.map((item) => item.canonicalPath));
  if (canonicals.size === 1) continue;
  const routes = group.map((item) => item.route);
  errors.push(`duplicate title across ${routes.length} competing pages ("${title.slice(0, 60)}"): ${routes.slice(0, 4).join(", ")}${routes.length > 4 ? " …" : ""}`);
}
for (const [description, routes] of descriptions) {
  if (routes.length > 1) warnings.push(`duplicate meta description across ${routes.length} indexable pages: ${routes.slice(0, 4).join(", ")}${routes.length > 4 ? " …" : ""}`);
}

console.log(`seo-check: scanned ${pages.length} built pages; ${indexableRoutes.size} canonical/indexable sitemap routes`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const warning of warnings.slice(0, 40)) console.log(`  warn  ${warning}`);
  if (warnings.length > 40) console.log(`  … and ${warnings.length - 40} more`);
}
if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  for (const error of errors.slice(0, 60)) console.error(`  FAIL  ${error}`);
  if (errors.length > 60) console.error(`  … and ${errors.length - 60} more`);
  if (!WARN_ONLY) process.exit(1);
}
if (!errors.length) console.log("seo-check: no errors");
