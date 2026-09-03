#!/usr/bin/env node
// Generates api/_catalog.json — the catalog the AI Concierge is grounded in.
//
// Two dimensions are explicit:
// - source: canonical data/products.json (default) or the governed
//   data/public-products.json projection (--source-public);
// - exposure: canonical mirror (default) or model-safe runtime fields
//   (--public-safe).
//
// Production and local dev must use BOTH --source-public and --public-safe.
// The default mode exists only so validate-catalog.mjs can prove the committed
// canonical mirror has not drifted from raw source data before a build starts.
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
      // Until exact-plan evidence is wired into this runtime, production
      // retrieval uses identity/category/tier only and does not receive them.
      blurb: publicSafe ? null : blurbOf(first),
      caps: publicSafe ? [] : (Array.isArray(first.capabilities) ? first.capabilities.slice(0, 6) : []),
      tiers,
    });
  }
  return out;
}

export function readSources({ publicProjection = false } = {}) {
  const source = publicProjection ? "data/public-products.json" : "data/products.json";
  const document = JSON.parse(readFileSync(join(ROOT, source), "utf8"));
  const products = Array.isArray(document) ? document : (document.products ?? []);
  const routesSrc = readFileSync(join(ROOT, "src/lib/productRoutes.ts"), "utf8");
  return {
    source,
    products,
    brandSlugs: new Set([...routesSrc.matchAll(/"([a-z0-9-]+-bangladesh)",/g)].map((m) => m[1])),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const publicSafe = process.argv.includes("--public-safe");
  const publicProjection = process.argv.includes("--source-public");
  if (publicSafe !== publicProjection) {
    throw new Error("[concierge-catalog] runtime generation requires --public-safe and --source-public together; canonical validation uses neither");
  }

  const { source, products, brandSlugs } = readSources({ publicProjection });
  const out = buildCatalog(products, brandSlugs, { publicSafe });
  writeFileSync(join(ROOT, "api/_catalog.json"), JSON.stringify(out));
  const bytes = JSON.stringify(out).length;
  console.log(
    `api/_catalog.json: ${out.length} products (${products.length} records, ` +
      `${products.length - out.length} tier-merges), source=${source}, mode=${publicSafe ? "public-safe" : "canonical-mirror"}, ` +
      `${out.filter((p) => p.blurb).length} with blurb, ${(bytes / 1024).toFixed(1)} KB`,
  );
}
