#!/usr/bin/env node
// Generates api/_catalog.json — the catalog the AI Concierge is grounded in.
// One entry per distinct slug, with ALL sibling price tiers aggregated (not
// just the first record) so the bot can see the full price range — e.g.
// Claude Pro's real cheapest tier (Starter Shared, BDT 599), not just
// whichever record happens to be first in products.json. Run after editing
// data/products.json:
//   node scripts/generate-concierge-catalog.mjs
//
// Beyond tiers, each entry carries a `blurb` and `caps` used for two things:
// retrieval scoring in api/concierge.js (which products go into the prompt at
// all) and giving the model something concrete to say about a tool beyond its
// price. Both are truncated hard — the concierge runs on an 8B model and
// prompt size is the main latency lever.
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

// First sentence, capped. Product descriptions are already one or two short
// sentences; this keeps the long ones from dominating the prompt budget.
function blurbOf(rec) {
  const d = (rec.description ?? "").trim();
  if (!d) return null;
  const first = d.split(/(?<=\.)\s/)[0];
  return (first.length > 120 ? `${first.slice(0, 117)}…` : first) || null;
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
    brand: first.brand ?? null,
    blurb: blurbOf(first),
    caps: Array.isArray(first.capabilities) ? first.capabilities.slice(0, 6) : [],
    tiers,
  });
}
writeFileSync(join(ROOT, "api/_catalog.json"), JSON.stringify(out));

const withBlurb = out.filter((p) => p.blurb).length;
const bytes = JSON.stringify(out).length;
console.log(
  `api/_catalog.json: ${out.length} products (${products.length} records, ` +
    `${products.length - out.length} tier-merges), ${withBlurb} with blurb, ${(bytes / 1024).toFixed(1)} KB`,
);
