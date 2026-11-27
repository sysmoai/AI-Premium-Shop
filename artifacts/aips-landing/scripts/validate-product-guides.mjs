#!/usr/bin/env node
// Gate for data/product-guides.json. Runs against the raw catalog before the build.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadGuides, validateGuide } from "./lib/product-guides.mjs";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const { products } = JSON.parse(fs.readFileSync(path.join(APP, "data/products.json"), "utf8"));
const guides = loadGuides();
const errors = [];
for (const [slug, guide] of Object.entries(guides)) {
  errors.push(...validateGuide(slug, guide, products.filter((record) => record.slug === slug)));
}
if (errors.length) {
  for (const error of errors) console.error(`[product-guides] FAIL ${error}`);
  process.exit(1);
}
console.log(`[product-guides] PASS: ${Object.keys(guides).length} guide(s) match catalog prices, approved payment methods and claim rules`);
