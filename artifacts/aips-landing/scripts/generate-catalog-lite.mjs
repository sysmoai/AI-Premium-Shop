#!/usr/bin/env node
// Generates the two trimmed catalogs the UI actually reads.
//
// Public pages must be derived from data/public-products.json, which is built
// from data/products.json only after the Git-backed site/commercial SSOT agrees
// on publication state. This keeps list/category/brand surfaces on the same
// commercial projection as product detail and prerender output.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Exactly the fields catalogStats.ts and Navbar.tsx read. */
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

/** Fields the lazy page chunks render — description and whatsappMsg included. */
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
  return projected.products ?? [];
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const products = readProducts();
  const lite = buildLite(products);
  const pages = buildPages(products);
  writeFileSync(join(ROOT, "data/catalog-lite.json"), JSON.stringify({ products: lite }));
  writeFileSync(join(ROOT, "data/catalog-pages.json"), JSON.stringify({ products: pages }));

  const kb = (o) => (JSON.stringify({ products: o }).length / 1024).toFixed(1);
  console.log(`data/catalog-lite.json:  ${lite.length} records, ${kb(lite)} KB`);
  console.log(`data/catalog-pages.json: ${pages.length} records, ${kb(pages)} KB`);
  console.log(`(from ${kb(products)} KB public projection)`);
}
