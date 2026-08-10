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
  const result = spawnSync(command, args, {
    cwd: APP,
    env: process.env,
    stdio: "inherit",
    shell: false,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
}

try {
  // Validate raw source data first. Research/catalog truth stays independently
  // auditable; only renderers consume the public projection.
  run(process.execPath, ["scripts/validate-blog-prices.mjs"]);
  run(process.execPath, ["scripts/validate-higgsfield-offer.mjs"]);

  // Generate a projection only when site.json and commercial.json agree.
  run(process.execPath, ["scripts/generate-public-projection.mjs"]);
  const projected = JSON.parse(readFileSync(publicProductsPath, "utf8"));

  // Existing React pages and prerender scripts historically import products.json
  // directly. During the build only, provide them the governed projection. The
  // canonical raw file is restored in finally even when a later step fails.
  writeFileSync(productsPath, `${JSON.stringify({ products: projected.products })}\n`, "utf8");
  console.log(`[public-build] activated ${projected.projection.mode} projection for all renderers`);

  // Regenerate trimmed list/category/brand catalogs from the same projection.
  run(process.execPath, ["scripts/generate-catalog-lite.mjs"]);

  const viteBin = join(APP, "node_modules/vite/bin/vite.js");
  run(process.execPath, [viteBin, "build", "--config", "vite.config.ts"]);
  run(process.execPath, ["scripts/prerender-products.mjs"]);
  run(process.execPath, ["scripts/audit-prerender.mjs"]);
  run(process.execPath, ["scripts/apply-commerce-quarantine.mjs"]);
  run(process.execPath, ["scripts/write-build-identity.mjs"]);
} finally {
  writeFileSync(productsPath, originalProducts, "utf8");
  console.log("[public-build] restored canonical raw data/products.json");
}
