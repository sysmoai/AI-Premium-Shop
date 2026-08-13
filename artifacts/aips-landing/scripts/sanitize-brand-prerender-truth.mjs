#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(here, "..");
const DIST = path.join(APP, "dist/public");
const publicCatalog = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = Array.isArray(publicCatalog) ? publicCatalog : publicCatalog.products ?? [];
const routesSource = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const arrayBlock = routesSource.match(/BRAND_PAGE_SLUGS\s*=\s*\[([\s\S]*?)\]\s*as const/);
if (!arrayBlock) throw new Error("[brand-truth] Could not parse BRAND_PAGE_SLUGS");
const brandSlugs = [...arrayBlock[1].matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
const RETIRED = new Set(["replit-bangladesh"]);

const BLOCKED = [
  /\b30[ -]day\s+warranty\b/i,
  /\b30[ -]day\s+replacement\s+guarantee\b/i,
  /\binstant\s+(?:delivery|access|activation)\b/i,
  /\b5\s*[–-]\s*(?:15|30)\s*(?:min|minutes)(?:\s+delivery)?\b/i,
  /\bauthorized\s+(?:reseller|partner|to offer)\b/i,
  /\bexclusive\s+(?:promotional\s+)?rate\b/i,
  /\b\d{1,3}%\s*off\b/i,
  /\btrusted\s+by\b/i,
  /\bbest[ -]?seller\b/i,
];

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function baseName(name) {
  return String(name ?? "AI tool").split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
}

function fitTitle(value) {
  if (value.length <= 68) return value;
  const suffix = " | AI Premium Shop";
  const room = Math.max(24, 68 - suffix.length);
  return `${value.slice(0, room - 1).trimEnd()}…${suffix}`;
}

function fitDescription(value) {
  return value.length <= 158 ? value : `${value.slice(0, 157).trimEnd()}…`;
}

const failures = [];
let rewritten = 0;

for (const slug of brandSlugs) {
  const file = path.join(DIST, slug, "index.html");
  if (!fs.existsSync(file)) continue;

  if (RETIRED.has(slug)) {
    const html = fs.readFileSync(file, "utf8")
      .replace(/<title>[\s\S]*?<\/title>/, "<title>Retired Listing | AI Premium Shop</title>")
      .replace(/(<meta name="description" content=")[^"]*(")/, "$1This older listing is no longer part of the current AI Premium Shop catalog. Browse active AI development tools instead.$2")
      .replace(/<link rel="canonical" href="[^"]+" \/?>/g, '<link rel="canonical" href="https://aipremiumshop.com/ai-code" />')
      .replace("</head>", '<meta name="robots" content="noindex, follow" />\n</head>')
      .replace(/<div id="root">[\s\S]*?<\/div>\s*<\/body>/, '<div id="root"><div id="prerender-shell"><main><h1>This listing has been retired</h1><p>It is no longer part of the current public AIPS catalog.</p><p><a href="/ai-code">Browse active AI development tools</a></p></main></div></div>\n</body>');
    fs.writeFileSync(file, html, "utf8");
    rewritten++;
    continue;
  }

  const recs = products.filter((product) => product.slug === slug);
  if (!recs.length) continue;
  const first = recs[0];
  const displayName = baseName(first.name);
  const prices = recs.map((record) => record.price).filter((value) => typeof value === "number" && value > 0);
  const fromPrice = prices.length ? Math.min(...prices) : null;
  const title = fitTitle(`${displayName} Price in Bangladesh | AI Premium Shop`);
  const desc = fitDescription(
    `${fromPrice ? `${displayName} plans currently start from BDT ${fromPrice.toLocaleString("en-US")}.` : `Check the current ${displayName} price.`} Compare access options and confirm availability, provider limits, delivery ETA and terms before paying in BDT.`,
  );

  let html = fs.readFileSync(file, "utf8")
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);

  for (const pattern of BLOCKED) {
    const match = html.match(pattern);
    if (match) failures.push(`${slug}: blocked brand claim remains in static HTML: "${match[0]}"`);
  }

  fs.writeFileSync(file, html, "utf8");
  rewritten++;
}

if (failures.length) {
  console.error(`[brand-truth] FAIL: ${failures.length} issue(s)`);
  for (const failure of failures.slice(0, 100)) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`[brand-truth] PASS: ${rewritten} brand prerender page(s) rewritten/validated against fail-closed commercial claims`);