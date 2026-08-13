#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(here, "..");
const DIST = path.join(APP, "dist/public");
const productRoot = path.join(DIST, "product");
const publicCatalogPath = path.join(APP, "data/public-products.json");
const HIGGSFIELD_SLUG = "higgsfield-ai-bangladesh";

if (!fs.existsSync(productRoot)) {
  throw new Error("[product-truth] dist/public/product is missing; run prerender-products first");
}
if (!fs.existsSync(publicCatalogPath)) {
  throw new Error("[product-truth] data/public-products.json is missing; generate the public projection first");
}

const publicCatalog = JSON.parse(fs.readFileSync(publicCatalogPath, "utf8"));
const products = Array.isArray(publicCatalog) ? publicCatalog : publicCatalog.products ?? [];
const bySlug = new Map();
for (const product of products) {
  if (!bySlug.has(product.slug)) bySlug.set(product.slug, []);
  bySlug.get(product.slug).push(product);
}

const BLOCKED_PUBLIC_PATTERNS = [
  /\b30[ -]day\s+warranty\b/i,
  /\b30[ -]day\s+replacement\s+guarantee\b/i,
  /\bfull\s+replacement\s+guarantee\b/i,
  /\binstant\s+(?:delivery|access|activation)\b/i,
  /\b5\s*[–-]\s*(?:15|30)\s*(?:min|minutes)(?:\s+delivery)?\b/i,
  /\btrusted\s+by\b/i,
  /\bbest[ -]?seller\b/i,
  /\b\d{1,3}%\s*off\b/i,
];

function removeFaqJsonLd(html) {
  return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (block, json) =>
    /"@type"\s*:\s*"FAQPage"/.test(json) ? "" : block,
  );
}

function sanitizeStructuredFreshness(html, verified) {
  let next = html.replace(/,?"availability":"https:\/\/schema\.org\/InStock"/g, "");
  if (!verified) {
    next = next
      .replace(/,?"dateModified":"[^"]+"/g, "")
      .replace(/\s*<meta http-equiv="last-modified" content="[^"]+" \/>\n?/g, "");
  }
  return next;
}

const failures = [];
let written = 0;
let faqScriptsRemoved = 0;
let freshnessRemoved = 0;

for (const entry of fs.readdirSync(productRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const slug = entry.name;
  const file = path.join(productRoot, slug, "index.html");
  if (!fs.existsSync(file)) continue;

  const records = bySlug.get(slug) ?? [];
  const dedicatedCompliance = slug === HIGGSFIELD_SLUG;
  const verified = dedicatedCompliance || records.some((record) => Boolean(record?.verificationDate && record?.sourceUrl));
  let html = fs.readFileSync(file, "utf8");
  const before = html;

  const faqBefore = (html.match(/"@type":"FAQPage"/g) ?? []).length;
  if (!verified) {
    html = removeFaqJsonLd(html);
    html = html.replace(/<section><h2>Frequently asked questions<\/h2>[\s\S]*?<\/section>/g, "");
  }
  const faqAfter = (html.match(/"@type":"FAQPage"/g) ?? []).length;
  faqScriptsRemoved += Math.max(0, faqBefore - faqAfter);

  const hadFreshness = /"dateModified":"|http-equiv="last-modified"|schema\.org\/InStock/.test(html);
  html = sanitizeStructuredFreshness(html, verified);
  if (hadFreshness && html !== before) freshnessRemoved++;

  if (!dedicatedCompliance) {
    for (const pattern of BLOCKED_PUBLIC_PATTERNS) {
      const match = html.match(pattern);
      if (match) failures.push(`${slug}: blocked unverified public claim "${match[0]}"`);
    }
  }
  if (!verified && /"@type":"FAQPage"/.test(html)) {
    failures.push(`${slug}: unverified product still emits FAQPage structured data`);
  }
  if (!verified && /"dateModified":"|http-equiv="last-modified"/.test(html)) {
    failures.push(`${slug}: unverified product still emits synthetic freshness metadata`);
  }
  if (/schema\.org\/InStock/.test(html)) {
    failures.push(`${slug}: product schema still hardcodes InStock without a stock evidence gate`);
  }

  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    written++;
  }
}

if (failures.length) {
  console.error(`[product-truth] FAIL: ${failures.length} issue(s)`);
  for (const failure of failures.slice(0, 100)) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`[product-truth] PASS: sanitized ${written} generic product pages; removed ${faqScriptsRemoved} unverified FAQ schema block(s); structured stock/freshness claims fail closed; dedicated Higgsfield context delegated to its own validator`);