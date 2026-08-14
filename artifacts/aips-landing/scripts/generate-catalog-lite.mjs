#!/usr/bin/env node
// Generates the two trimmed catalogs the UI actually reads.
// Public identity history may include retired tombstones, but UI/search/catalog
// surfaces must contain only active public records.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export const buildLite = (products) =>
  products.map((p) => ({
    slug: p.slug,
    name: p.name,
    brand: p.brand ?? null,
    category: p.category,
    tier: p.tier ?? null,
    price: p.price ?? null,
    requestPrice: p.requestPrice ?? false,
    officialUSD: p.officialUSD ?? null,
  }));

export const buildPages = (products) =>
  products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand ?? null,
    brandSlug: p.brandSlug ?? null,
    brandColor: p.brandColor ?? null,
    category: p.category,
    tier: p.tier ?? null,
    price: p.price ?? null,
    requestPrice: p.requestPrice ?? false,
    officialUSD: p.officialUSD ?? null,
    accessType: p.accessType ?? null,
    deliverySLA: p.deliverySLA ?? null,
    badge: p.badge ?? null,
    description: p.description ?? null,
    whatsappMsg: p.whatsappMsg ?? null,
    featured: p.featured ?? false,
    capabilities: p.capabilities ?? [],
  }));

export const readProducts = () => {
  const projected = JSON.parse(readFileSync(join(ROOT, "data/public-products.json"), "utf8"));
  return (projected.products ?? []).filter((product) => product.publicStatus !== "retired");
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const products = readProducts();
  const lite = buildLite(products);
  const pages = buildPages(products);
  writeFileSync(join(ROOT, "data/catalog-lite.json"), JSON.stringify({ products: lite }));
  writeFileSync(join(ROOT, "data/catalog-pages.json"), JSON.stringify({ products: pages }));

  const kb = (object) => (JSON.stringify({ products: object }).length / 1024).toFixed(1);
  console.log(`data/catalog-lite.json:  ${lite.length} active records, ${kb(lite)} KB`);
  console.log(`data/catalog-pages.json: ${pages.length} active records, ${kb(pages)} KB`);
  console.log(`(from ${kb(projectedForLog())} KB public projection including identity tombstones)`);
}

function projectedForLog() {
  const projected = JSON.parse(readFileSync(join(ROOT, "data/public-products.json"), "utf8"));
  return projected.products ?? [];
}
