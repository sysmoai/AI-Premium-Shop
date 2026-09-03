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
const providerSourcesPath = join(REPO, "ops/ssot/provider-sources.json");

const raw = JSON.parse(readFileSync(rawPath, "utf8"));
const commercial = JSON.parse(readFileSync(commercialPath, "utf8"));
const site = JSON.parse(readFileSync(sitePath, "utf8"));
const providerSources = JSON.parse(readFileSync(providerSourcesPath, "utf8"));

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
if (commercial?.schema_version !== 2 || commercial?.public_projection_policy?.approved_mode !== "governed-approved-commerce-v2") {
  throw new Error("Public projection refused: commercial truth v2 policy is missing");
}
if (providerSources?.schema_version !== 1 || commercial?.public_projection_policy?.provider_compliance_source !== "ops/ssot/provider-sources.json") {
  throw new Error("Public projection refused: provider compliance source is missing or not governed");
}

const neutralizeLegacyApprovedFields = (product) => {
  const safe = { ...product };

  // Provider MSRP is not an AIPS-owned fact. It stays hidden until the exact
  // record has a current evidence path and is approved for public comparison.
  safe.officialUSD = null;

  safe.deliverySLA = null;
  safe.estimatedDeliveryTime = null;
  safe.deliveryMethod = null;
  safe.stock = null;
  safe.trust = null;
  safe.badge = null;
  safe.badges = [];
  safe.competitorCompare = [];
  safe.whatsappMsg = null;
  safe.activationType = null;
  safe.bundleSuggestions = [];
  safe.higherPlanUpsell = null;
  safe.howItWorksSteps = [];

  return safe;
};

const stripCommercialFields = (product) => {
  const safe = neutralizeLegacyApprovedFields(product);

  safe.price = null;
  safe.requestPrice = true;
  safe.accessType = null;
  safe.plans = [];
  safe.relatedProducts = Array.isArray(safe.relatedProducts)
    ? safe.relatedProducts.map(({ priceBDT: _priceBDT, ...related }) => related)
    : [];

  return safe;
};

const nonEmpty = (value) => typeof value === "string" && value.trim().length > 0;
const matches = (value, criteria) => Object.entries(criteria ?? {}).every(([key, expected]) => value?.[key] === expected);

const providerControls = [];
for (const [providerKey, provider] of Object.entries(providerSources?.providers ?? {})) {
  for (const control of provider?.public_catalog_controls ?? []) {
    if (control?.status !== "ENFORCED") continue;
    if (control?.action !== "exclude-from-approved-commerce-projection") {
      throw new Error(`[public-projection] unsupported ENFORCED provider control action for ${providerKey}: ${control?.action}`);
    }
    if (!control?.match || !nonEmpty(control.match.provider) || !nonEmpty(control.match.accessType)) {
      throw new Error(`[public-projection] malformed ENFORCED provider control match for ${providerKey}`);
    }
    if (control?.nested_plan_match && !nonEmpty(control.nested_plan_match.deliveryType)) {
      throw new Error(`[public-projection] malformed nested plan match for ${providerKey}`);
    }
    providerControls.push({ providerKey, control });
  }
}

const sourceProducts = Array.isArray(raw) ? raw : raw.products ?? [];
let excludedRecords = [];
let filteredNestedPlans = 0;

const applyApprovedProviderControls = (products) => {
  const kept = [];
  for (const source of products) {
    const blocking = providerControls.find(({ control }) => matches(source, control.match));
    if (blocking) {
      excludedRecords.push({
        id: source?.id ?? null,
        slug: source?.slug ?? null,
        tier: source?.tier ?? null,
        provider: source?.provider ?? null,
        control_id: blocking.control.id,
      });
      continue;
    }

    let safe = { ...source };
    if (Array.isArray(safe.plans) && safe.plans.length) {
      for (const { control } of providerControls) {
        if (safe.provider !== control.match.provider || !control.nested_plan_match) continue;
        const before = safe.plans.length;
        safe.plans = safe.plans.filter((plan) => !matches(plan, control.nested_plan_match));
        filteredNestedPlans += before - safe.plans.length;
      }
    }
    kept.push(neutralizeLegacyApprovedFields(safe));
  }
  return kept;
};

const approvedCommerce = publicationAllowed && !commercialQuarantine;
const publicProducts = approvedCommerce
  ? applyApprovedProviderControls(sourceProducts)
  : sourceProducts.map(stripCommercialFields);

const output = {
  projection: {
    schema_version: 2,
    generated_from: "data/products.json + ops/ssot/site.json + ops/ssot/commercial.json + ops/ssot/provider-sources.json",
    commercial_policy_revision: commercial.policy_revision,
    publication_allowed: publicationAllowed,
    quarantine: commercialQuarantine,
    mode: approvedCommerce ? "approved-commerce" : "informational-fail-closed",
    approved_mode_policy: commercial.public_projection_policy.approved_mode,
    legacy_commercial_fields_neutralized: true,
    unverified_provider_pricing_neutralized: true,
    provider_compliance_controls_applied: approvedCommerce,
    provider_compliance_control_count: providerControls.length,
    provider_compliance_excluded_records: excludedRecords.length,
    provider_compliance_excluded_record_refs: excludedRecords,
    provider_compliance_filtered_nested_plans: filteredNestedPlans,
  },
  products: publicProducts,
};

writeFileSync(outPath, `${JSON.stringify(output)}\n`, "utf8");
const compliance = approvedCommerce
  ? `; provider-controls=${providerControls.length}; excluded=${excludedRecords.length}; nested-plans-filtered=${filteredNestedPlans}`
  : "; provider-controls not applied in informational fail-closed mode";
console.log(`[public-projection] ${publicProducts.length}/${sourceProducts.length} records -> ${output.projection.mode}; policy=${output.projection.approved_mode_policy}${compliance}`);
if (excludedRecords.length) {
  console.log(`[public-projection] excluded source rows: ${excludedRecords.map((item) => `${item.id ?? item.slug ?? "unknown"}(${item.control_id})`).join(", ")}`);
}
