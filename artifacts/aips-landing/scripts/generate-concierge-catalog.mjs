#!/usr/bin/env node
// Generates api/_catalog.json — the compact catalog the AI Concierge is
// grounded in. One entry per distinct slug, with ALL sibling price tiers
// aggregated (not just the first record) so the bot can see the full price
// range — e.g. Claude Pro's real cheapest tier (Starter Shared, BDT 599),
// not just whichever record happens to be first in products.json. Run
// after editing data/products.json:
//   node scripts/generate-concierge-catalog.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const products = JSON.parse(readFileSync(join(ROOT, "data/products.json"), "utf8")).products;
const routesSrc = readFileSync(join(ROOT, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...routesSrc.matchAll(/"([a-z0-9-]+-bangladesh)",/g)].map((m) => m[1]));

const bySlug = new Map();
for (const p of products) {
  if (!bySlug.has(p.slug)) bySlug.set(p.slug, []);
  bySlug.get(p.slug).push(p);
}

const out = [];
for (const [slug, recs] of bySlug) {
  const first = recs[0];
  const tiers = recs
    .map((p) => ({
      tier: p.tier,
      priceBDT: p.requestPrice ? null : p.price,
      accessType: p.accessType,
      deliverySLA: p.deliverySLA ?? null,
      badge: p.badge ?? null,
    }))
    .sort((a, b) => (a.priceBDT ?? Infinity) - (b.priceBDT ?? Infinity));
  out.push({
    // Base product name with the " — TierName" suffix stripped (e.g. "ChatGPT
    // Plus — Starter Shared" -> "ChatGPT Plus"). Standalone products (bundles,
    // request-price singles) have no suffix, so split() is a no-op for them.
    name: first.name.split(" — ")[0],
    path: brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`,
    category: first.category,
    tiers,
  });
}
writeFileSync(join(ROOT, "api/_catalog.json"), JSON.stringify(out));
console.log(`api/_catalog.json: ${out.length} products (${products.length} records, ${products.length - out.length} tier-merges)`);
