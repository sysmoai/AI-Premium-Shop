#!/usr/bin/env node
// Generates the two trimmed catalogs the UI actually reads.
//
// WHY. data/products.json is 227 KB. src/lib/catalogStats.ts and
// src/components/Navbar.tsx both imported it and both live in the MAIN chunk,
// so every visitor downloaded the whole catalog on every page — to read eight
// fields. The weight is in plans (43 KB), faq (29 KB), useCases (16 KB),
// descriptionBN (14 KB) and whyBuyFromAIPS (9 KB), which only ProductPage
// renders.
//
//   catalog-lite.json   ~23 KB — main bundle (catalogStats, Navbar)
//   catalog-pages.json  ~75 KB — lazy page chunks (BrandPage, ProductsPage)
//
// Two files rather than one on purpose: folding description/whatsappMsg into
// the lite file would push them straight back into the main bundle.
//
// Run after editing data/products.json:
//   node scripts/generate-catalog-lite.mjs
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

export const readProducts = () => JSON.parse(readFileSync(join(ROOT, "data/products.json"), "utf8")).products;

// Only write when run as a script. validate-catalog.mjs imports buildPages() to
// check the committed file, and an import that regenerated it would overwrite
// the very drift the check exists to catch — which is exactly what the first
// version of this guard did, and why it silently never failed.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const products = readProducts();
  const lite = buildLite(products);
  const pages = buildPages(products);
  writeFileSync(join(ROOT, "data/catalog-lite.json"), JSON.stringify({ products: lite }));
  writeFileSync(join(ROOT, "data/catalog-pages.json"), JSON.stringify({ products: pages }));

  const kb = (o) => (JSON.stringify({ products: o }).length / 1024).toFixed(1);
  console.log(`data/catalog-lite.json:  ${lite.length} records, ${kb(lite)} KB`);
  console.log(`data/catalog-pages.json: ${pages.length} records, ${kb(pages)} KB`);
  console.log(`(from ${kb(products)} KB products.json)`);
}
