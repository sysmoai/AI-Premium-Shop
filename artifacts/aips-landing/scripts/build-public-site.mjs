#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const productsPath = join(APP, "data/products.json");
const publicProductsPath = join(APP, "data/public-products.json");
const originalProducts = readFileSync(productsPath, "utf8");

function run(command, args) {
  console.log(`[public-build] ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, { cwd: APP, env: process.env, stdio: "inherit", shell: false });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
}

try {
  run(process.execPath, ["scripts/validate-blog-prices.mjs"]);
  run(process.execPath, ["scripts/validate-higgsfield-offer.mjs"]);
  run(process.execPath, ["scripts/validate-media-registry.mjs"]);
  run(process.execPath, ["scripts/generate-public-projection.mjs"]);
  run(process.execPath, ["scripts/generate-publication-state.mjs"]);
  const projected = JSON.parse(readFileSync(publicProductsPath, "utf8"));
  writeFileSync(productsPath, `${JSON.stringify({ products: projected.products })}\n`, "utf8");
  console.log(`[public-build] activated ${projected.projection.mode} projection for all renderers`);

  run(process.execPath, ["scripts/generate-catalog-lite.mjs"]);
  run(process.execPath, ["scripts/generate-route-registry.mjs"]);
  run(process.execPath, ["scripts/generate-plan-catalog.mjs"]);
  run(process.execPath, ["scripts/generate-media-catalog.mjs"]);
  run(process.execPath, ["scripts/generate-homepage-v2-view.mjs"]);

  const viteBin = join(APP, "node_modules/vite/bin/vite.js");
  run(process.execPath, [viteBin, "build", "--config", "vite.config.ts"]);
  run(process.execPath, ["scripts/audit-bundle-budgets.mjs"]);
  run(process.execPath, ["scripts/prerender-plans.mjs"]);
  run(process.execPath, ["scripts/prerender-products.mjs"]);
  run(process.execPath, ["scripts/sanitize-brand-prerender.mjs"]);
  // Category routes previously inherited raw catalog descriptions, delivery
  // SLAs, badges, official-price comparisons, FAQ claims and typed bundle
  // savings. Rewrite their crawler shells from the active public projection.
  run(process.execPath, ["scripts/sanitize-category-prerender.mjs"]);
  run(process.execPath, ["scripts/sanitize-product-prerender.mjs"]);
  run(process.execPath, ["scripts/sanitize-budget-prerender.mjs"]);
  // Audience guides are high-intent SEO routes. Rewrite their crawler shells
  // from the active public projection so old rankings, earnings, model-version,
  // SLA and unscoped usage claims cannot survive in generated HTML.
  run(process.execPath, ["scripts/sanitize-guide-prerender.mjs"]);
  run(process.execPath, ["scripts/sanitize-best-subscription-prerender.mjs"]);
  // Blog posts used to duplicate dated provider feature tables, rankings,
  // income claims and old commercial copy. Rebuild all 19 crawler articles from
  // the governed editorial definitions plus current public catalog fields.
  run(process.execPath, ["scripts/sanitize-blog-prerender.mjs"]);
  run(process.execPath, ["scripts/prerender-homepage-v2-preview.mjs"]);
  run(process.execPath, ["scripts/prune-sitemap-canonicals.mjs"]);
  run(process.execPath, ["scripts/audit-homepage-v2-preview.mjs"]);
  run(process.execPath, ["scripts/audit-plan-pages.mjs"]);
  run(process.execPath, ["scripts/audit-prerender.mjs"]);
  run(process.execPath, ["scripts/apply-commerce-quarantine.mjs"]);
  run(process.execPath, ["scripts/write-build-identity.mjs"]);
} finally {
  writeFileSync(productsPath, originalProducts, "utf8");
  console.log("[public-build] restored canonical raw data/products.json");
}
