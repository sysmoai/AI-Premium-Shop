#!/usr/bin/env node
// Fail-closed release guard: no stale raw-catalog prices or blocked/noindex
// offer URLs may leak into the shipped llms.txt. Uses the SAME approved public
// projection and pruned sitemap as the Cloudflare production build.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const projection = JSON.parse(readFileSync(join(APP, "data/public-products.json"), "utf8"));
const sitemap = readFileSync(join(APP, "dist/public/sitemap.xml"), "utf8");
const published = readFileSync(join(APP, "dist/public/llms.txt"), "utf8");
const metadata = projection?.projection;
if (metadata?.schema_version !== 2 ||
    metadata?.approved_mode_policy !== "governed-approved-commerce-v2" ||
    !Array.isArray(projection.products)) {
  throw new Error("[llms-truth] governed public projection missing or invalid");
}
if (!published.includes("Build-generated from governed data/public-products.json")) {
  throw new Error("[llms-truth] published llms.txt is not generated from governed projection");
}

const allowedRoutes = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
  const link = new URL(match[1].replaceAll("&amp;", "&"));
  return link.protocol === "https:" && link.hostname === "aipremiumshop.com" ? link.pathname : null;
}).filter(Boolean));
if (!allowedRoutes.size) throw new Error("[llms-truth] empty canonical sitemap");

const canPublish = Boolean(metadata.publication_allowed && !metadata.quarantine);
const cheapestBySlug = new Map();
for (const p of projection.products) {
  if (!p || typeof p.slug !== "string" || !p.slug ||
      p.informationalOnly === true || p.commerceEligible === false ||
      String(p.accessType ?? "").toLowerCase() === "shared") continue;
  if (!canPublish || p.requestPrice || !Number.isFinite(p.price) || p.price < 0) continue;
  const earlier = cheapestBySlug.get(p.slug);
  cheapestBySlug.set(p.slug, earlier == null ? p.price : Math.min(earlier, p.price));
}
const expected = new Map();
for (const [slug, price] of cheapestBySlug) {
  const path = [`/${slug}`, `/product/${slug}`].find((route) => allowedRoutes.has(route));
  if (path) expected.set(path, price);
}

const publishedPrices = new Map();
for (const match of published.matchAll(/^- [^\r\n]+?\(from BDT ([\d,]+)\/mo\): https:\/\/aipremiumshop\.com(\/[^\s]+)/gm)) {
  const price = Number(match[1].replaceAll(",", ""));
  const path = match[2];
  if (publishedPrices.has(path)) throw new Error(`[llms-truth] duplicate product path: ${path}`);
  publishedPrices.set(path, price);
  if (expected.get(path) !== price) {
    throw new Error(`[llms-truth] stale, raw or unauthorized product price at ${path}: shown ${price}, approved ${expected.get(path) ?? "none"}`);
  }
}
for (const [path, price] of expected) {
  if (publishedPrices.get(path) !== price) {
    throw new Error(`[llms-truth] approved indexable offer missing or mismatched: ${path}`);
  }
}
if (!canPublish && publishedPrices.size) {
  throw new Error("[llms-truth] commercial offers present while publication is quarantined");
}
if (/30.day replacement warranty|Rocket or bank transfer|5.30 minutes delivery|official reseller/i.test(published)) {
  throw new Error("[llms-truth] prohibited blanket commercial claim in llms.txt");
}
for (const route of ["/ai-under-500", "/ai-under-1000", "/ai-under-3000"]) {
  if (!allowedRoutes.has(route) && published.includes(`https://aipremiumshop.com${route}\n`)) {
    throw new Error(`[llms-truth] noindex budget route linked as indexable guide: ${route}`);
  }
}
console.log(`[llms-truth] PASS: ${publishedPrices.size} prices match approved projection and ${allowedRoutes.size} canonical routes`);
