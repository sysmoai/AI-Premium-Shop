#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const rawPath = join(APP, "data/products.json");
const outPath = join(APP, "data/public-products.json");
const commercialPath = join(REPO, "ops/ssot/commercial.json");
const sitePath = join(REPO, "ops/ssot/site.json");

const raw = JSON.parse(readFileSync(rawPath, "utf8"));
const commercial = JSON.parse(readFileSync(commercialPath, "utf8"));
const site = JSON.parse(readFileSync(sitePath, "utf8"));

const siteQuarantine = Boolean(site?.current_publication_state?.commerce_quarantine);
const commercialQuarantine = Boolean(commercial?.quarantine);
const publicationAllowed = Boolean(commercial?.publication_allowed);
const sitePublishAllowed = Boolean(site?.current_publication_state?.commerce_publish_allowed);

if (siteQuarantine !== commercialQuarantine) {
  throw new Error("Public projection refused: site/commercial quarantine flags disagree");
}
if (publicationAllowed !== sitePublishAllowed) {
  throw new Error("Public projection refused: site/commercial publication flags disagree");
}
if (commercialQuarantine && publicationAllowed) {
  throw new Error("Public projection refused: commerce cannot be publishable while quarantine is active");
}

const stripCommercialFields = (product) => {
  const safe = { ...product };

  safe.price = null;
  safe.requestPrice = true;
  safe.officialUSD = null;
  safe.accessType = null;
  safe.deliverySLA = null;
  safe.whatsappMsg = null;
  safe.activationType = null;
  safe.estimatedDeliveryTime = null;
  safe.deliveryMethod = null;
  safe.stock = null;
  safe.trust = null;
  safe.badges = [];
  safe.competitorCompare = [];
  safe.bundleSuggestions = [];
  safe.higherPlanUpsell = null;
  safe.howItWorksSteps = [];
  safe.plans = [];
  safe.relatedProducts = Array.isArray(safe.relatedProducts)
    ? safe.relatedProducts.map(({ priceBDT: _priceBDT, ...related }) => related)
    : [];

  return safe;
};

const sourceProducts = Array.isArray(raw) ? raw : raw.products ?? [];
const publicProducts = publicationAllowed && !commercialQuarantine
  ? sourceProducts
  : sourceProducts.map(stripCommercialFields);

const output = {
  projection: {
    schema_version: 1,
    generated_from: "data/products.json + ops/ssot/site.json + ops/ssot/commercial.json",
    publication_allowed: publicationAllowed,
    quarantine: commercialQuarantine,
    mode: publicationAllowed && !commercialQuarantine ? "approved-commerce" : "informational-fail-closed",
  },
  products: publicProducts,
};

writeFileSync(outPath, `${JSON.stringify(output)}\n`, "utf8");
console.log(`[public-projection] ${publicProducts.length} records -> ${output.projection.mode}`);
