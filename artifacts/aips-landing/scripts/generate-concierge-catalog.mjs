#!/usr/bin/env node
// Generates api/_catalog.json — the catalog the AI Concierge is grounded in.
//
// Two modes exist deliberately:
// - default: mirrors canonical data/products.json for source-drift validation;
// - --public-safe: used only after build-public-site activates the governed
//   public projection. It keeps current AIPS price/access labels but strips
//   provider-controlled capability copy, delivery SLAs and badges from the
//   model-facing runtime catalog.
//
// The public-safe mode prevents the serverless concierge from bypassing the
// same truth controls that protect browser and crawler surfaces.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function blurbOf(rec) {
  const d = (rec.description ?? "").trim();
  if (!d) return null;
  const first = d.split(/(?<=\.)\s/)[0];
  return (first.length > 120 ? `${first.slice(0, 117)}…` : first) || null;
}

// Exported so validate-catalog.mjs can validate the committed canonical mirror
// without duplicating the aggregation algorithm. publicSafe defaults false so
// the existing raw-catalog drift check remains exact.
export function buildCatalog(products, brandSlugs, { publicSafe = false } = {}) {
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
        deliverySLA: publicSafe ? null : (p.deliverySLA ?? null),
        badge: publicSafe ? null : (p.badge ?? null),
      }))
      .sort((a, b) => (a.priceBDT ?? Infinity) - (b.priceBDT ?? Infinity));

    out.push({
      name: first.name.split(" — ")[0],
      path: brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`,
      category: first.category,
      brand: first.brand ?? null,
      // Description/capability fields can contain provider-controlled claims.
      // Until an exact-plan evidence layer exists, the production concierge
      // retrieves by identity/category/tier only and does not receive them.
      blurb: publicSafe ? null : blurbOf(first),
      caps: publicSafe ? [] : (Array.isArray(first.capabilities) ? first.capabilities.slice(0, 6) : []),
      tiers,
    });
  }
  return out;
}

export function readSources() {
  const products = JSON.parse(readFileSync(join(ROOT, "data/products.json"), "utf8")).products;
  const routesSrc = readFileSync(join(ROOT, "src/lib/productRoutes.ts"), "utf8");
  return { products, brandSlugs: new Set([...routesSrc.matchAll(/"([a-z0-9-]+-bangladesh)",/g)].map((m) => m[1])) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { products, brandSlugs } = readSources();
  const publicSafe = process.argv.includes("--public-safe");
  const out = buildCatalog(products, brandSlugs, { publicSafe });
  writeFileSync(join(ROOT, "api/_catalog.json"), JSON.stringify(out));
  const bytes = JSON.stringify(out).length;
  console.log(
    `api/_catalog.json: ${out.length} products (${products.length} records, ` +
      `${products.length - out.length} tier-merges), mode=${publicSafe ? "public-safe" : "canonical-mirror"}, ` +
      `${out.filter((p) => p.blurb).length} with blurb, ${(bytes / 1024).toFixed(1)} KB`,
  );
}
