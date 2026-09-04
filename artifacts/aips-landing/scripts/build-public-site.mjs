#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const productsPath = join(APP, "data/products.json");
const publicProductsPath = join(APP, "data/public-products.json");
const originalProducts = readFileSync(productsPath, "utf8");

function runAt(cwd, command, args) {
  console.log(`[public-build] ${command} ${args.join(" ")} (cwd=${cwd === APP ? "app" : "repo"})`);
  const result = spawnSync(command, args, { cwd, env: process.env, stdio: "inherit", shell: false });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
}
const run = (command, args) => runAt(APP, command, args);
const runRepo = (command, args) => runAt(REPO, command, args);

try {
  run(process.execPath, ["scripts/validate-blog-prices.mjs"]);
  run(process.execPath, ["scripts/validate-higgsfield-offer.mjs"]);
  run(process.execPath, ["scripts/validate-media-registry.mjs"]);
  run(process.execPath, ["scripts/validate-legacy-url-registry.mjs"]);
  run(process.execPath, ["scripts/validate-indexnow-config.mjs"]);
  run(process.execPath, ["scripts/submit-indexnow.mjs", "ops/seo/indexnow-change-set-2026-09-04.json", "--dry-run"]);
  run(process.execPath, ["scripts/validate-chatgpt-money-pages.mjs"]);
  // The full provider registry validator lives at repo scope because provider
  // evidence is a Git business SSOT, not an app-local data file. Vercel builds
  // must run the same registry gate as GitHub CI before projecting commerce.
  runRepo(process.execPath, ["scripts/validate-provider-sources.mjs"]);
  run(process.execPath, ["scripts/audit-provider-coverage.mjs", "--strict"]);
  run(process.execPath, ["scripts/generate-public-projection.mjs"]);
  run(process.execPath, ["scripts/audit-provider-coverage.mjs", "--strict", "--projection"]);
  run(process.execPath, ["scripts/generate-publication-state.mjs"]);

  // Serverless concierge assets are generated from the SAME governed sources
  // as the browser/crawler site. This happens before Vercel bundles api/*.
  run(process.execPath, ["scripts/generate-concierge-policy.mjs"]);
  run(process.execPath, ["scripts/generate-concierge-catalog.mjs", "--source-public", "--public-safe"]);
  run(process.execPath, ["scripts/validate-concierge-truth.mjs", "--runtime"]);

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
  // Provider-restricted families are absent from the commerce projection, so
  // preserve their established canonical URLs as neutral informational pages
  // before the normal commerce prerenderers run.
  run(process.execPath, ["scripts/prerender-informational-products.mjs"]);
  run(process.execPath, ["scripts/prerender-plans.mjs"]);
  run(process.execPath, ["scripts/prerender-products.mjs"]);
  run(process.execPath, ["scripts/sanitize-brand-prerender.mjs"]);
  run(process.execPath, ["scripts/enhance-chatgpt-money-prerender.mjs"]);
  run(process.execPath, ["scripts/sanitize-category-prerender.mjs"]);
  run(process.execPath, ["scripts/sanitize-product-prerender.mjs"]);
  run(process.execPath, ["scripts/sanitize-budget-prerender.mjs"]);
  run(process.execPath, ["scripts/sanitize-guide-prerender.mjs"]);
  run(process.execPath, ["scripts/sanitize-best-subscription-prerender.mjs"]);
  run(process.execPath, ["scripts/sanitize-blog-prerender.mjs"]);
  run(process.execPath, ["scripts/sanitize-editorial-index-prerender.mjs"]);
  run(process.execPath, ["scripts/sanitize-info-prerender.mjs"]);
  run(process.execPath, ["scripts/prerender-homepage-v2-preview.mjs"]);
  run(process.execPath, ["scripts/normalize-public-brand-name.mjs"]);
  run(process.execPath, ["scripts/validate-public-brand-name.mjs"]);
  run(process.execPath, ["scripts/audit-chatgpt-money-pages.mjs"]);
  run(process.execPath, ["scripts/normalize-sitemap-metadata.mjs"]);
  run(process.execPath, ["scripts/prune-sitemap-canonicals.mjs"]);
  run(process.execPath, ["scripts/audit-keyword-ownership.mjs"]);
  run(process.execPath, ["scripts/audit-informational-routes.mjs"]);
  run(process.execPath, ["scripts/audit-homepage-v2-preview.mjs"]);
  run(process.execPath, ["scripts/audit-plan-pages.mjs"]);
  run(process.execPath, ["scripts/audit-prerender.mjs"]);
  run(process.execPath, ["scripts/apply-commerce-quarantine.mjs"]);
  run(process.execPath, ["scripts/write-build-identity.mjs"]);
} finally {
  writeFileSync(productsPath, originalProducts, "utf8");
  console.log("[public-build] restored canonical raw data/products.json; generated concierge runtime assets remain public-safe for serverless bundling");
}
