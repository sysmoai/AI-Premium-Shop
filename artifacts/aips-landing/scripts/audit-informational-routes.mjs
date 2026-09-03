#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";
const infoDoc = JSON.parse(fs.readFileSync(path.join(APP, "data/informational-products.json"), "utf8"));
const routeRegistry = JSON.parse(fs.readFileSync(path.join(APP, "data/generated/route-registry.json"), "utf8"));
const routesSrc = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...routesSrc.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]));
const sitemap = fs.readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
const failures = [];
const fail = (message) => failures.push(message);
const routeFor = (slug) => brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`;

for (const product of infoDoc?.products ?? []) {
  const route = routeFor(product.slug);
  const canonical = `${SITE}${route}`;
  const file = path.join(DIST, route.replace(/^\//, ""), "index.html");
  if (!fs.existsSync(file)) {
    fail(`${route}: static informational page is missing`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const shell = html.match(/<div\s+id="prerender-shell">([\s\S]*?)<\/div>\s*<\/div>\s*<\/body>/i)?.[1] ?? "";
  if (!shell) fail(`${route}: prerender shell is missing or malformed`);
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  if (canonicalMatch !== canonical) fail(`${route}: canonical=${canonicalMatch ?? "missing"}, expected=${canonical}`);
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) fail(`${route}: informational page must remain indexable`);
  if (!/No current purchasable AI Premium Shop plan is published for this product/i.test(shell)) fail(`${route}: status disclosure is missing`);
  if (!/does not represent an offer for sale/i.test(shell)) fail(`${route}: no-offer disclosure is missing`);
  if (/"@type"\s*:\s*"(?:Product|Offer|SoftwareApplication)"/i.test(html)) fail(`${route}: Product/Offer software commerce schema must not appear`);
  // The shared HTML template legitimately contains Organization metadata such as
  // currenciesAccepted=BDT. Commerce assertions are therefore scoped to the
  // product-specific prerender shell, not global site identity markup.
  if (/(?:৳|\bBDT\b|\bprice\s+on\s+request\b|\bpublished\s+(?:AI Premium Shop\s+)?price\b)/i.test(shell)) fail(`${route}: price language survived on restricted informational page`);
  if (/wa\.me\/8801865385348[^"'<\s]*/i.test(shell)) fail(`${route}: direct WhatsApp ordering CTA survived on restricted informational shell`);

  const registry = (routeRegistry?.routes ?? []).filter((item) => item?.canonicalPath === route && item?.active);
  if (registry.length !== 1) fail(`${route}: expected exactly one active route-registry owner, found ${registry.length}`);
  else {
    const item = registry[0];
    if (item?.routeType !== "informational-product" || item?.commerceEligible !== false || item?.indexPolicy !== "INDEX_SELF") {
      fail(`${route}: route-registry flags are not informational fail-closed`);
    }
  }

  if (!sitemap.includes(`<loc>${canonical}</loc>`)) fail(`${route}: canonical URL is missing from sitemap`);
}

const infoCount = (infoDoc?.products ?? []).length;
if (routeRegistry?.schema_version !== 2) fail("route registry schema_version must be 2");
if (routeRegistry?.active_informational_product_routes !== infoCount) fail(`route registry informational count=${routeRegistry?.active_informational_product_routes}; data count=${infoCount}`);
if (routeRegistry?.active_product_routes !== routeRegistry?.active_commerce_product_routes + routeRegistry?.active_informational_product_routes) fail("route registry product totals do not reconcile");

if (failures.length) {
  console.error(`[informational-route-audit] FAIL (${failures.length})`);
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}
console.log(`[informational-route-audit] PASS: ${infoCount} provider-restricted canonical URL(s) are indexable, commerce-free, schema-safe and present in sitemap/route registry`);
