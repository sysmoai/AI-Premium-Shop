#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEffectiveProviderEvidence, PROVIDER_AMENDMENT_SOURCE, PROVIDER_BASE_SOURCE } from "../../../scripts/lib/provider-evidence.mjs";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const rawPath = join(APP, "data/products.json");
const outPath = join(APP, "data/public-products.json");
const informationalPath = join(APP, "data/informational-products.json");
const commercialPath = join(REPO, "ops/ssot/commercial.json");
const sitePath = join(REPO, "ops/ssot/site.json");
const pricingPath = join(REPO, "ops/ssot/pricing-v2.json");

const raw = JSON.parse(readFileSync(rawPath, "utf8"));
const commercial = JSON.parse(readFileSync(commercialPath, "utf8"));
const site = JSON.parse(readFileSync(sitePath, "utf8"));
const pricing = JSON.parse(readFileSync(pricingPath, "utf8"));
const providerSources = loadEffectiveProviderEvidence(REPO);

const siteQuarantine = Boolean(site?.current_publication_state?.commerce_quarantine);
const commercialQuarantine = Boolean(commercial?.quarantine);
const publicationAllowed = Boolean(commercial?.publication_allowed);
const sitePublishAllowed = Boolean(site?.current_publication_state?.commerce_publish_allowed);

if (siteQuarantine !== commercialQuarantine) throw new Error("Public projection refused: site/commercial quarantine flags disagree");
if (publicationAllowed !== sitePublishAllowed) throw new Error("Public projection refused: site/commercial publication flags disagree");
if (commercialQuarantine && publicationAllowed) throw new Error("Public projection refused: commerce cannot be publishable while quarantine is active");
if (commercial?.schema_version !== 2 || commercial?.public_projection_policy?.approved_mode !== "governed-approved-commerce-v2") {
  throw new Error("Public projection refused: commercial truth v2 policy is missing");
}
if (pricing?.schema_version !== 1 || pricing?.revision !== "aips-pricing-v2-2026-09-17") {
  throw new Error("Public projection refused: approved pricing v2 SSOT is missing or unexpected");
}
if (providerSources?.schema_version !== 2 || commercial?.public_projection_policy?.provider_compliance_source !== PROVIDER_BASE_SOURCE) {
  throw new Error("Public projection refused: provider compliance base source v2 is missing or not governed");
}
if (commercial?.public_projection_policy?.provider_compliance_amendment_source !== PROVIDER_AMENDMENT_SOURCE) {
  throw new Error("Public projection refused: current provider evidence amendment is not governed by commercial SSOT");
}
if (providerSources?.review_queue?.status !== "closed-for-current-shared-catalog-scope") {
  throw new Error("Public projection refused: shared-provider evidence review is not closed for the current catalog scope");
}

const neutralizeLegacyApprovedFields = (product) => {
  const safe = { ...product };
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

const baseName = (value) => String(value ?? "AI tool").split(/—\s*/)[0].split(/\s+-\s+/)[0].trim() || "AI tool";
const informationalIdentity = (source) => {
  const name = baseName(source?.name);
  const safe = stripCommercialFields(source ?? {});
  return {
    ...safe,
    id: `informational-${source?.slug ?? "unknown"}`,
    name,
    tier: null,
    price: null,
    requestPrice: false,
    accessType: null,
    plans: [],
    capabilities: [],
    uniqueSellingPoints: [],
    useCasesBD: [],
    howItWorksSteps: [],
    faq: [],
    relatedProducts: [],
    description: `${name} remains available here as a reference page. AI Premium Shop does not currently publish a purchasable plan for this product. Browse active alternatives and verify the provider's current access rules before deciding.`,
    descriptionBN: null,
    informationalOnly: true,
    commerceEligible: false,
    publicationStatus: "informational-provider-restricted",
  };
};

const nonEmpty = (value) => typeof value === "string" && value.trim().length > 0;
const matches = (value, criteria) => Object.entries(criteria ?? {}).every(([key, expected]) => value?.[key] === expected);
const numeric = (value) => typeof value === "number" && Number.isFinite(value);
const near = (a, b) => numeric(a) && numeric(b) && Math.abs(a - b) < 0.011;
const searchable = (...values) => values.filter(Boolean).join(" ").toLowerCase();

const approvedPriceForUsd = (usd) => {
  if (!numeric(usd)) return null;
  for (const [key, value] of Object.entries(pricing.approved_price_by_usd ?? {})) {
    if (near(Number(key), usd)) return Number(value);
  }
  return null;
};

const matchingPricingRule = (text) => (pricing.rules ?? []).find((rule) => {
  try {
    return new RegExp(rule.pattern, "i").test(text);
  } catch {
    throw new Error(`[public-projection] invalid pricing rule regex: ${rule.id}`);
  }
}) ?? null;

const mustVerifyPrice = (text) => (pricing.verify_before_fixed_price ?? []).some((needle) => text.includes(String(needle).toLowerCase()));

const applyPricingToPlan = (plan, parent, rule) => {
  const safe = { ...plan };
  const text = searchable(parent?.name, parent?.tier, parent?.brand, parent?.provider, parent?.slug, plan?.planName, plan?.tier, plan?.deliveryType);
  const usd = numeric(plan?.officialUSD) ? plan.officialUSD : null;

  if (mustVerifyPrice(text)) {
    safe.priceBDT = null;
    safe.requestPrice = true;
    safe.priceSource = "verify-before-sale";
    return safe;
  }

  if (!rule) {
    safe.priceBDT = null;
    safe.requestPrice = true;
    safe.priceSource = "unmapped-current-price";
    return safe;
  }

  if (Array.isArray(rule.blocked_usd) && usd != null && rule.blocked_usd.some((value) => near(value, usd))) return null;

  if (rule.fixed_bdt != null) {
    safe.priceBDT = Number(rule.fixed_bdt);
    safe.requestPrice = false;
    safe.priceSource = pricing.revision;
    safe.priceVerifiedDate = pricing.approved_at;
    return safe;
  }

  const allowed = Array.isArray(rule.allowed_usd) && usd != null && rule.allowed_usd.some((value) => near(value, usd));
  const mapped = allowed ? approvedPriceForUsd(usd) : null;
  if (mapped == null) {
    safe.priceBDT = null;
    safe.requestPrice = true;
    safe.priceSource = "price-review-required";
    return safe;
  }

  safe.priceBDT = mapped;
  safe.requestPrice = false;
  safe.priceSource = pricing.revision;
  safe.priceVerifiedDate = pricing.approved_at;
  return safe;
};

const applyApprovedPricing = (source) => {
  const text = searchable(source?.name, source?.tier, source?.brand, source?.provider, source?.slug);
  const rule = matchingPricingRule(text);
  const safe = { ...source };

  // Credential/account sharing is no longer a default AIPS commerce model.
  // Provider-supported named seats/workspaces remain eligible when represented as non-shared records.
  if (String(source?.accessType ?? "").toLowerCase() === "shared") return null;

  if (mustVerifyPrice(text)) {
    safe.price = null;
    safe.requestPrice = true;
    safe.priceSource = "verify-before-sale";
  } else if (rule?.fixed_bdt != null) {
    safe.price = Number(rule.fixed_bdt);
    safe.requestPrice = false;
    safe.priceSource = pricing.revision;
    safe.priceVerifiedDate = pricing.approved_at;
  } else if (rule) {
    const usd = numeric(source?.officialUSD) ? source.officialUSD : null;
    if (Array.isArray(rule.blocked_usd) && usd != null && rule.blocked_usd.some((value) => near(value, usd))) return null;
    const allowed = Array.isArray(rule.allowed_usd) && usd != null && rule.allowed_usd.some((value) => near(value, usd));
    const mapped = allowed ? approvedPriceForUsd(usd) : null;
    if (mapped != null) {
      safe.price = mapped;
      safe.requestPrice = false;
      safe.priceSource = pricing.revision;
      safe.priceVerifiedDate = pricing.approved_at;
    } else {
      safe.price = null;
      safe.requestPrice = true;
      safe.priceSource = "price-review-required";
    }
  } else {
    safe.price = null;
    safe.requestPrice = true;
    safe.priceSource = "unmapped-current-price";
  }

  if (Array.isArray(safe.plans)) {
    safe.plans = safe.plans
      .filter((plan) => String(plan?.deliveryType ?? "").toLowerCase() !== "shared")
      .map((plan) => applyPricingToPlan(plan, safe, rule))
      .filter(Boolean);
  }

  safe.relatedProducts = Array.isArray(safe.relatedProducts)
    ? safe.relatedProducts.map(({ priceBDT: _legacyPrice, ...related }) => related)
    : [];

  return safe;
};

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
let pricingExcludedRecords = 0;
let pricingMappedRecords = 0;
let pricingReviewRecords = 0;

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

    const priced = applyApprovedPricing(safe);
    if (!priced) {
      pricingExcludedRecords += 1;
      continue;
    }
    if (priced.price != null) pricingMappedRecords += 1;
    else if (priced.requestPrice) pricingReviewRecords += 1;
    kept.push(neutralizeLegacyApprovedFields(priced));
  }
  return kept;
};

const approvedCommerce = publicationAllowed && !commercialQuarantine;
const publicProducts = approvedCommerce
  ? applyApprovedProviderControls(sourceProducts)
  : sourceProducts.map(stripCommercialFields);

const sourceFamilies = new Map();
for (const source of sourceProducts) {
  if (!source?.slug) continue;
  if (!sourceFamilies.has(source.slug)) sourceFamilies.set(source.slug, []);
  sourceFamilies.get(source.slug).push(source);
}
const publicSlugs = new Set(publicProducts.map((product) => product?.slug).filter(Boolean));
const informationalProducts = approvedCommerce
  ? [...sourceFamilies.entries()]
      .filter(([slug]) => !publicSlugs.has(slug))
      .map(([, records]) => informationalIdentity(records[0]))
      .sort((a, b) => a.slug.localeCompare(b.slug))
  : [];

const output = {
  projection: {
    schema_version: 2,
    generated_from: `data/products.json + ops/ssot/site.json + ops/ssot/commercial.json + ops/ssot/pricing-v2.json + ${PROVIDER_BASE_SOURCE} + ${PROVIDER_AMENDMENT_SOURCE}`,
    commercial_policy_revision: commercial.policy_revision,
    pricing_revision: pricing.revision,
    pricing_approved_at: pricing.approved_at,
    provider_evidence_schema_version: providerSources.schema_version,
    provider_evidence_amendment_schema_version: providerSources?.effective_evidence?.amendment_schema_version ?? null,
    provider_evidence_effective_updated_at: providerSources?.effective_evidence?.effective_updated_at ?? null,
    provider_review_status: providerSources.review_queue.status,
    publication_allowed: publicationAllowed,
    quarantine: commercialQuarantine,
    mode: approvedCommerce ? "approved-commerce" : "informational-fail-closed",
    approved_mode_policy: commercial.public_projection_policy.approved_mode,
    legacy_commercial_fields_neutralized: true,
    unverified_provider_pricing_neutralized: true,
    approved_pricing_v2_applied: approvedCommerce,
    pricing_mapped_records: pricingMappedRecords,
    pricing_review_records: pricingReviewRecords,
    pricing_excluded_records: pricingExcludedRecords,
    shared_credential_records_excluded: approvedCommerce,
    provider_compliance_controls_applied: approvedCommerce,
    provider_compliance_control_count: providerControls.length,
    provider_compliance_excluded_records: excludedRecords.length,
    provider_compliance_excluded_record_refs: excludedRecords,
    provider_compliance_filtered_nested_plans: filteredNestedPlans,
    informational_route_preservation_count: informationalProducts.length,
    informational_route_preservation_slugs: informationalProducts.map((product) => product.slug),
  },
  products: publicProducts,
};

writeFileSync(outPath, `${JSON.stringify(output)}\n`, "utf8");
writeFileSync(informationalPath, `${JSON.stringify({
  schema_version: 1,
  generated_from: `data/products.json + ops/ssot/pricing-v2.json + ${PROVIDER_BASE_SOURCE} + ${PROVIDER_AMENDMENT_SOURCE}`,
  purpose: "Preserve existing canonical product URLs whose current commerce records are entirely blocked by provider evidence or current AIPS pricing/access controls. These records are informational only and must never enter commerce listings, price surfaces or the concierge catalog.",
  products: informationalProducts,
}, null, 2)}\n`, "utf8");

const compliance = approvedCommerce
  ? `; provider-controls=${providerControls.length}; excluded=${excludedRecords.length}; nested-plans-filtered=${filteredNestedPlans}; pricing-mapped=${pricingMappedRecords}; pricing-review=${pricingReviewRecords}; pricing-excluded=${pricingExcludedRecords}; informational-routes=${informationalProducts.length}`
  : "; provider-controls not applied in informational fail-closed mode";
console.log(`[public-projection] ${publicProducts.length}/${sourceProducts.length} commerce records -> ${output.projection.mode}; policy=${output.projection.approved_mode_policy}; pricing=${pricing.revision}${compliance}`);
if (excludedRecords.length) console.log(`[public-projection] excluded source rows: ${excludedRecords.map((item) => `${item.id ?? item.slug ?? "unknown"}(${item.control_id})`).join(", ")}`);
if (informationalProducts.length) console.log(`[public-projection] preserved informational-only routes: ${informationalProducts.map((item) => item.slug).join(", ")}`);
