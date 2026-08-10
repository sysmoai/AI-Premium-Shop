#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const sitePath = join(REPO, "ops/ssot/site.json");
const commercialPath = join(REPO, "ops/ssot/commercial.json");
const rawPath = join(APP, "data/products.json");
const projectedPath = join(APP, "data/public-products.json");

const originalSite = readFileSync(sitePath, "utf8");
const originalCommercial = readFileSync(commercialPath, "utf8");

function runProjection() {
  const result = spawnSync(process.execPath, ["scripts/generate-public-projection.mjs"], {
    cwd: APP,
    stdio: "inherit",
  });
  if (result.status !== 0) throw new Error(`projection generator failed with ${result.status}`);
  return JSON.parse(readFileSync(projectedPath, "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(`[public-projection-test] ${message}`);
}

try {
  const raw = JSON.parse(readFileSync(rawPath, "utf8"));
  const rawProducts = Array.isArray(raw) ? raw : raw.products ?? [];
  const current = runProjection();

  assert(current.products.length === rawProducts.length, "current projection changed catalog record count");
  assert(
    current.projection.mode === "approved-commerce",
    `expected approved-commerce current mode, got ${current.projection.mode}`,
  );

  const site = JSON.parse(originalSite);
  const commercial = JSON.parse(originalCommercial);
  site.current_publication_state.commerce_quarantine = true;
  site.current_publication_state.commerce_publish_allowed = false;
  site.current_publication_state.public_indexing = "noindex,nofollow";
  commercial.quarantine = true;
  commercial.publication_allowed = false;

  writeFileSync(sitePath, `${JSON.stringify(site, null, 2)}\n`, "utf8");
  writeFileSync(commercialPath, `${JSON.stringify(commercial, null, 2)}\n`, "utf8");

  const quarantined = runProjection();
  assert(quarantined.projection.mode === "informational-fail-closed", "quarantine did not switch projection mode");
  assert(quarantined.products.length === rawProducts.length, "quarantine changed identity record count");

  for (const product of quarantined.products) {
    assert(product.price == null, `${product.slug}: numeric/public price survived quarantine`);
    assert(product.requestPrice === true, `${product.slug}: request-price fallback not enforced`);
    assert(product.officialUSD == null, `${product.slug}: officialUSD survived quarantine`);
    assert(product.accessType == null, `${product.slug}: accessType survived quarantine`);
    assert(product.deliverySLA == null, `${product.slug}: deliverySLA survived quarantine`);
    assert(product.whatsappMsg == null, `${product.slug}: product-specific order message survived quarantine`);
    assert(!Array.isArray(product.plans) || product.plans.length === 0, `${product.slug}: plans survived quarantine`);
    assert(product.trust == null, `${product.slug}: trust/warranty block survived quarantine`);
  }

  console.log(`[public-projection-test] PASS: ${quarantined.products.length} records fail closed under simulated quarantine`);
} finally {
  writeFileSync(sitePath, originalSite, "utf8");
  writeFileSync(commercialPath, originalCommercial, "utf8");
  runProjection();
}
