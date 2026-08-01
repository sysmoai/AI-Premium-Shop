#!/usr/bin/env node
// Generates data/catalog-lite.json — the slice of the catalog that the code in
// the MAIN bundle actually reads.
//
// WHY. src/lib/catalogStats.ts and src/components/Navbar.tsx both import
// data/products.json, and both live in the main chunk, so the entire 227 KB
// catalog is downloaded by every visitor on every page. Those two modules read
// eight fields between them. The rest — plans (43 KB), faq (29 KB), useCases
// (16 KB), descriptionBN (14 KB), whyBuyFromAIPS (9 KB) — is only ever rendered
// on ProductPage and BrandPage, which are lazy-loaded chunks and can keep
// importing the full file.
//
// It also means internal-only fields ride along to the browser, including the
// trust.reviewCount / trust.rating values the validator flags as fabricated
// social proof that "must not be rendered". They are not rendered, but they are
// shipped, and anyone can read them in view-source.
//
// Run after editing data/products.json:
//   node scripts/generate-catalog-lite.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const products = JSON.parse(readFileSync(join(ROOT, "data/products.json"), "utf8")).products;

// Exactly the fields read by catalogStats.ts and Navbar.tsx. Adding one here is
// cheap; adding one by accident is what this file exists to prevent.
const lite = products.map((p) => ({
  slug: p.slug,
  name: p.name,
  brand: p.brand ?? null,
  category: p.category,
  tier: p.tier ?? null,
  price: p.price ?? null,
  requestPrice: p.requestPrice ?? false,
  officialUSD: p.officialUSD ?? null,
}));

writeFileSync(join(ROOT, "data/catalog-lite.json"), JSON.stringify({ products: lite }));

const before = JSON.stringify({ products }).length;
const after = JSON.stringify({ products: lite }).length;
console.log(
  `data/catalog-lite.json: ${lite.length} records, ${(after / 1024).toFixed(1)} KB ` +
    `(from ${(before / 1024).toFixed(1)} KB — ${((1 - after / before) * 100).toFixed(0)}% smaller)`,
);
