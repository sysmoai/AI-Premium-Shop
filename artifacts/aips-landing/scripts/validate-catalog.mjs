#!/usr/bin/env node
// Catalog / route / sitemap / claims validator for aips-landing.
//
// Usage:  node scripts/validate-catalog.mjs [--strict]
//
// HARD FAILURES (always exit 1) are structural defects that ship broken pages
// or contradictory data. WARNINGS are compliance debt being worked down; they
// print with counts and exit 0 unless --strict is passed. The banned-claims
// list implements the AIPS truth rules: no unverified delivery times,
// warranties, customer counts, best-seller/scarcity claims, or "unlimited".
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readdirSync, statSync } from "node:fs";
import { buildCatalog } from "./generate-concierge-catalog.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");
const failures = [];
const warnings = [];

const read = (p) => readFileSync(join(ROOT, p), "utf8");

// ---------- load sources ----------
const catalog = JSON.parse(read("data/products.json"));
const products = catalog.products;
const appSrc = read("src/App.tsx");
const routesSrc = read("src/lib/productRoutes.ts");
const sitemap = read("public/sitemap.xml");

// ---------- 1. catalog structure ----------
const REQUIRED_FIELDS = ["id", "name", "slug", "brand", "provider", "category", "price", "whatsappMsg", "status", "accessType"];
const ids = new Map();
const bySlug = new Map();
for (const p of products) {
  for (const f of REQUIRED_FIELDS) {
    // requestPrice records legitimately have price: null — the current price
    // is quoted on WhatsApp instead of published (dynamic provider pricing).
    if (f === "price" && p.requestPrice === true) continue;
    if (p[f] === undefined || p[f] === null || p[f] === "") {
      failures.push(`record ${p.id ?? p.slug ?? "?"}: missing required field "${f}"`);
    }
  }
  if (p.requestPrice === true && typeof p.price === "number") {
    failures.push(`record ${p.id}: requestPrice record must not carry a fixed price (${p.price})`);
  }
  if (ids.has(p.id)) failures.push(`duplicate id "${p.id}" (also ${ids.get(p.id)})`);
  ids.set(p.id, p.slug);
  (bySlug.get(p.slug) ?? bySlug.set(p.slug, []).get(p.slug)).push(p);
  // duplicate planName within ONE record is a rendering bug; the same plan
  // appearing on sibling records is handled below (first record wins).
  const seen = new Set();
  for (const pl of p.plans ?? []) {
    if (seen.has(pl.planName)) failures.push(`record ${p.id} (${p.slug}): duplicate planName "${pl.planName}"`);
    seen.add(pl.planName);
  }
  // whatsappMsg price drift: if the message quotes a ৳ amount, it must match
  // the record's price — these have silently diverged before.
  const m = /৳\s?([\d,]+)/.exec(p.whatsappMsg ?? "");
  if (m) {
    const quoted = Number(m[1].replace(/,/g, ""));
    if (quoted !== p.price) {
      failures.push(`record ${p.id} (${p.slug}): whatsappMsg quotes ৳${quoted} but price is ${p.price}`);
    }
  }
}

// ProductPage's getProductBySlug takes the FIRST record for a slug and, when
// that record carries a plans array, ignores every sibling's plans entirely.
// Diverging sibling plans arrays therefore mean dead data that silently goes
// stale — warn so it gets reconciled, but it doesn't ship a broken page.
for (const [slug, recs] of bySlug) {
  if (recs.length < 2) continue;
  const shapes = new Set(recs.map((r) => JSON.stringify(r.plans ?? null)));
  if (shapes.size > 1) {
    warnings.push(`slug "${slug}": ${recs.length} sibling records with ${shapes.size} diverging plans arrays — only the first record's plans render`);
  }
}

// ---------- 2. route / canonical / sitemap integrity ----------
const brandSlugs = new Set([...routesSrc.matchAll(/"([a-z0-9-]+-bangladesh)",/g)].map((m) => m[1]));
if (brandSlugs.size === 0) failures.push("could not parse BRAND_PAGE_SLUGS from src/lib/productRoutes.ts");
if (!/BRAND_PAGE_SLUGS\.map/.test(appSrc)) {
  failures.push("App.tsx no longer maps BRAND_PAGE_SLUGS — route table and productPath() can drift");
}
const staticRoutes = new Set([...appSrc.matchAll(/<Route path="\/([^":]+)"/g)].map((m) => m[1]));
const productSlugs = new Set(products.map((p) => p.slug));

const smPaths = new Set(
  [...sitemap.matchAll(/<loc>https:\/\/aipremiumshop\.com([^<]*)<\/loc>/g)].map((m) =>
    m[1].replace(/\/$/, "").replace(/^\//, "")
  )
);
for (const path of smPaths) {
  if (path === "") continue;
  if (path.startsWith("product/")) {
    const slug = path.slice("product/".length);
    if (!productSlugs.has(slug)) failures.push(`sitemap lists /product/${slug} but no such product exists`);
    if (brandSlugs.has(slug)) failures.push(`sitemap lists /product/${slug} which duplicates brand page /${slug}`);
  } else if (path.startsWith("blog/")) {
    // blog posts are routed dynamically; existence is validated at render time
  } else if (!staticRoutes.has(path) && !brandSlugs.has(path)) {
    failures.push(`sitemap lists /${path} but no route matches — it renders NotFound with HTTP 200`);
  }
}
for (const slug of productSlugs) {
  if (!brandSlugs.has(slug) && !smPaths.has(`product/${slug}`)) {
    failures.push(`product ${slug} has no brand page and is missing from sitemap as /product/${slug}`);
  }
}
for (const slug of brandSlugs) {
  if (!smPaths.has(slug)) failures.push(`brand page /${slug} missing from sitemap`);
}

// ---------- 2a. rendered-plans price consistency ----------
// ProductPage renders only the FIRST record's `plans` array per slug.
// Each entry's priceBDT must match its own sibling record's top-level
// (CEO-owned) price for that tier — otherwise the plan selector on
// /product/{slug} silently quotes a stale number.
// Some catalogs use a shorthand plan label ("Shared") for a tier whose
// canonical top-level name is longer ("Starter Shared") — real data, not a
// bug, but it means naive exact-name matching misses real price drift.
const TIER_ALIASES = { Shared: "Starter Shared" };
for (const [slug, recs] of bySlug) {
  if (recs.length < 2) continue;
  const truth = new Map(recs.map((r) => [r.tier, r.price]));
  const first = recs[0];
  for (const pl of first.plans ?? []) {
    const canonical = TIER_ALIASES[pl.planName] ?? pl.planName;
    if (truth.has(canonical) && pl.priceBDT !== truth.get(canonical)) {
      failures.push(`slug "${slug}": rendered plans array says ${pl.planName}=${pl.priceBDT} but sibling record price is ${truth.get(canonical)}`);
    }
  }
}

// ---------- 2b. concierge catalog sync ----------
// The chatbot answers ONLY from api/_catalog.json. If products.json changed
// without regenerating it, the concierge gives stale answers — hard failure.
// The expected shape comes from the generator itself; this check previously
// kept a hand-copied duplicate of that logic and failed the moment the
// generator grew a field the copy didn't know about.
{
  const expected = buildCatalog(products, brandSlugs);
  let actual;
  try {
    actual = JSON.parse(read("api/_catalog.json"));
  } catch {
    actual = null;
  }
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    failures.push("api/_catalog.json is out of sync with data/products.json — run: node scripts/generate-concierge-catalog.mjs");
  }
}


// ---------- 2c. no hand-written catalog numbers in the UI ----------
// Every product count and entry price must come from src/lib/catalogStats.ts.
// Hard-coded ones drifted badly and shipped false claims: 8 of 9 category
// counts were wrong, four categories advertised a "from" price below anything
// purchasable, and "BDT 350" was displayed sitewide as the entry price when NO
// product has ever cost 350. This rule fails the build if such a literal
// reappears in a component.
{
  const uiFiles = [];
  (function walk(dir) {
    for (const entry of readdirSync(join(ROOT, dir))) {
      const rel = `${dir}/${entry}`;
      if (statSync(join(ROOT, rel)).isDirectory()) walk(rel);
      else if (/\.tsx$/.test(entry)) uiFiles.push(rel);
    }
  })("src");

  // Phantom price: never appeared in products.json, yet was the advertised floor.
  const PHANTOM = /(?:৳|BDT\s*)350\b/;
  // Stale catalog totals that predate the current 87-product / 129-plan catalog.
  const STALE_TOTAL = /\b118\+|\b(?:All|Browse All)\s+80\b|\b80\s+(?:premium\s+)?(?:AI\s+)?[Tt]ools\b/;

  for (const f of uiFiles) {
    const src = read(f);
    // strip comments so explanatory notes about the old values don't self-trip
    const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    if (PHANTOM.test(code)) {
      failures.push(`${f}: hard-codes the phantom entry price "350" — no product costs that. Use MIN_PRICE from src/lib/catalogStats.ts.`);
    }
    if (STALE_TOTAL.test(code)) {
      failures.push(`${f}: hard-codes a stale catalog total (118+/80 tools). Use TOTAL_PRODUCTS/TOTAL_PLANS from src/lib/catalogStats.ts.`);
    }
  }

  // index.html is static — it can't import catalogStats, so assert its numbers
  // directly against the catalog instead of leaving them unchecked.
  const distinctProducts = new Set(products.map((p) => p.slug)).size;
  const listed = products.filter((p) => !p.requestPrice && p.price != null).map((p) => p.price);
  const floor = Math.min(...listed);
  const html = read("index.html");
  const headBlock = (html.match(/<title>[\s\S]*?<\/title>/) ?? [""])[0] +
    (html.match(/<meta name="description"[^>]*>/) ?? [""])[0];
  if (!headBlock.includes(String(distinctProducts))) {
    failures.push(`index.html: <title>/<meta description> must state the real product count (${distinctProducts}).`);
  }
  if (!headBlock.includes(String(floor))) {
    failures.push(`index.html: <title>/<meta description> must state the real entry price (BDT ${floor}).`);
  }
  if (STALE_TOTAL.test(headBlock) || PHANTOM.test(headBlock)) {
    failures.push(`index.html: <title>/<meta description> still contains a stale total or the phantom "350" price.`);
  }
}

// ---------- 3. secret scan ----------
const SECRET_PATTERNS = [
  [/sk-[A-Za-z0-9_-]{20,}/, "OpenAI-style key"],
  [/nvapi-[A-Za-z0-9_-]{10,}/, "NVIDIA key"],
  [/AKIA[0-9A-Z]{16}/, "AWS key"],
  [/xox[baprs]-[A-Za-z0-9-]{10,}/, "Slack token"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "private key"],
  [/eyJ[A-Za-z0-9_-]{20,}\.eyJ/, "JWT"],
];
function* walk(dir) {
  for (const e of readdirSync(join(ROOT, dir))) {
    const rel = join(dir, e);
    const st = statSync(join(ROOT, rel));
    if (st.isDirectory()) yield* walk(rel);
    else if (/\.(tsx?|jsx?|json|xml|txt|html|css|md)$/.test(e)) yield rel;
  }
}
for (const dir of ["src", "data", "public"]) {
  for (const file of walk(dir)) {
    const content = read(file);
    for (const [re, label] of SECRET_PATTERNS) {
      if (re.test(content)) failures.push(`possible ${label} in ${file}`);
    }
  }
}

// ---------- 4. banned-claims scan (warnings; --strict makes them fail) ----------
// Terms the AIPS truth rules forbid publishing without a verified, approved
// evidence record. Counted per file so the cleanup can be tracked shrinking.
const CLAIM_TERMS = [
  "unlimited", "warranty", "instant delivery", "5-15 min", "5-30 min",
  "trusted by", "best seller", "bestseller", "best-seller", "% off",
  "limited time", "limited offer", "money-back", "guaranteed income",
];
const claimCounts = {};
const scanTargets = ["data/products.json"];
for (const f of walk("src/pages")) scanTargets.push(f);
for (const file of scanTargets) {
  const content = read(file).toLowerCase();
  for (const term of CLAIM_TERMS) {
    let idx = 0, n = 0;
    while ((idx = content.indexOf(term, idx)) !== -1) { n++; idx += term.length; }
    if (n > 0) claimCounts[term] = (claimCounts[term] ?? 0) + n;
  }
}
for (const [term, n] of Object.entries(claimCounts).sort((a, b) => b[1] - a[1])) {
  warnings.push(`unverified-claim term "${term}": ${n} occurrences (data + pages)`);
}

// ---------- 5. governance-field coverage (warnings) ----------
const GOVERNANCE_FIELDS = ["commercialStatus", "verificationDate", "sourceUrl", "officialUSD"];
for (const f of GOVERNANCE_FIELDS) {
  const missing = products.filter((p) => p[f] === undefined).length;
  if (missing > 0) warnings.push(`${missing}/${products.length} records missing "${f}"`);
}
const shared = products.filter((p) => p.accessType === "shared").length;
if (shared > 0) warnings.push(`${shared} records have accessType "shared" — pending CEO access-model classification`);
const fakeReviews = products.filter((p) => p.trust?.reviewCount || p.trust?.rating).length;
if (fakeReviews > 0) warnings.push(`${fakeReviews} records carry unverified trust.reviewCount/rating — fabricated social proof, must not be rendered`);

// ---------- report ----------
console.log(`validate-catalog: ${products.length} records, ${brandSlugs.size} brand routes, ${smPaths.size} sitemap URLs`);
if (failures.length) {
  console.error(`\n✖ ${failures.length} HARD FAILURE(S):`);
  for (const f of failures) console.error("  - " + f);
}
if (warnings.length) {
  console.warn(`\n⚠ ${warnings.length} warning(s):`);
  for (const w of warnings) console.warn("  - " + w);
}
if (!failures.length && !warnings.length) console.log("✓ all checks passed");
process.exit(failures.length || (strict && warnings.length) ? 1 : 0);
