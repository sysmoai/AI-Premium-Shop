#!/usr/bin/env node
// Generates api/_catalog.json — the compact catalog the AI Concierge is
// grounded in. One entry per distinct slug (first record wins, matching
// ProductPage's merge rule). Run after editing data/products.json:
//   node scripts/generate-concierge-catalog.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const products = JSON.parse(readFileSync(join(ROOT, "data/products.json"), "utf8")).products;
const routesSrc = readFileSync(join(ROOT, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...routesSrc.matchAll(/"([a-z0-9-]+-bangladesh)",/g)].map((m) => m[1]));

const seen = new Set();
const out = [];
for (const p of products) {
  if (seen.has(p.slug)) continue;
  seen.add(p.slug);
  out.push({
    name: p.name,
    path: brandSlugs.has(p.slug) ? `/${p.slug}` : `/product/${p.slug}`,
    priceBDT: p.requestPrice ? null : p.price,
    requestPrice: !!p.requestPrice,
    category: p.category,
    accessType: p.accessType,
  });
}
writeFileSync(join(ROOT, "api/_catalog.json"), JSON.stringify(out));
console.log(`api/_catalog.json: ${out.length} products`);
