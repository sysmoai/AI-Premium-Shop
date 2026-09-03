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

const sharedGovernance = providerSources?.shared_access_governance;
if (
  sharedGovernance?.status !== "ENFORCED" ||
  sharedGovernance?.default_publication_rule !== "BLOCK_COMMERCE_UNTIL_EXPLICIT_PROVIDER_EVIDENCE_ALLOWS" ||
  sharedGovernance?.explicit_allow_required !== true ||
  !Array.isArray(sharedGovernance?.explicit_publication_allows)
) {
  throw new Error("Public projection refused: shared-access fail-closed governance is missing or malformed");
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

const neutralizeUnverifiedSharedIdentity = (product) => {
  const safe = stripCommercialFields(product);
  const baseName = String(product?.name ?? "AI subscription").split(" — ")[0];

  safe.name = baseName;
  safe.tier = "Availability Review";
  safe.status = "Inquiry Only";
  safe.commercialStatus = "INQUIRY_ONLY_PROVIDER_ACCESS_UNVERIFIED";
  safe.description = "Shared or multi-user access for this provider is not published as a current sellable offer while provider authorization and the exact access model remain unverified. Ask us to check a current provider-supported personal, team, or other compliant option.";
  safe.descriptionBN = "এই প্রোভাইডারের শেয়ার্ড বা মাল্টি-ইউজার অ্যাক্সেস বর্তমানে বিক্রয়যোগ্য অফার হিসেবে প্রকাশ করা হচ্ছে না, কারণ প্রোভাইডার অনুমোদন ও সঠিক অ্যাক্সেস মডেল যাচাই করা হয়নি। বর্তমান provider-supported personal, team বা অন্য compliant option যাচাই করতে আমাদের জিজ্ঞেস করুন।";
  safe.capabilities = [];
  safe.useCases = [];
  safe.whyBuyFromAIPS = null;
  safe.faq = [];
  safe.uniqueSellingPoints = [];
  safe.plans = [];

  const canonical = safe?.seo?.canonical ?? null;
  safe.seo = {
    ...(safe.seo ?? {}),
    title: `${baseName} in Bangladesh | AI Premium Shop`,
    metaDescription: `Check current provider-supported access options for ${baseName} in Bangladesh. Shared access is not published while provider authorization and the exact access model remain unverified.`,
    ...(canonical ? { canonical } : {}),
  };

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

const sharedAllows = sharedGovernance.explicit_publication_allows;
for (const allow of sharedAllows) {
  if (
    allow?.status !== "ALLOW" ||
    !nonEmpty(allow?.provider) ||
    allow?.accessType !== "shared" ||
    !Array.isArray(allow?.evidence_refs) ||
    allow.evidence_refs.length === 0
  ) {
    throw new Error("[public-projection] malformed explicit shared publication allow");
  }
}

const sharedAllowed = (source) => sharedAllows.some((allow) => allow.status === "ALLOW" && allow.provider === source?.provider && allow.accessType === source?.accessType);
const nestedSharedAllowed = (source) => sharedAllows.some((allow) => allow.status === "ALLOW" && allow.provider === source?.provider && allow.accessType === "shared");

const sourceProducts = Array.isArray(raw) ? raw : raw.products ?? [];
const familyHasNonSharedSource = new Map();
for (const product of sourceProducts) {
  if (!nonEmpty(product?.slug)) continue;
  if (product?.accessType !== "shared") familyHasNonSharedSource.set(product.slug, true);
  else if (!familyHasNonSharedSource.has(product.slug)) familyHasNonSharedSource.set(product.slug, false);
}

let excludedRecords = [];
let filteredNestedPlans = 0;
let unresolvedSharedExcluded = 0;
let unresolvedSharedInformational = 0;
let unresolvedSharedNestedPlansFiltered = 0;

const exclusionRef = (source, controlId) => ({
  id: source?.id ?? null,
  slug: source?.slug ?? null,
  tier: source?.tier ?? null,
  provider: source?.provider ?? null,
  control_id: controlId,
});

const applyApprovedProviderControls = (products) => {
  const kept = [];

  for (const source of products) {
    const blocking = providerControls.find(({ control }) => matches(source, control.match));
    if (blocking) {
      excludedRecords.push(exclusionRef(source, blocking.control.id));
      continue;
    }

    if (source?.accessType === "shared" && !sharedAllowed(source)) {
      if (familyHasNonSharedSource.get(source?.slug) === true) {
        excludedRecords.push(exclusionRef(source, "shared-access-default-fail-closed-2026-09-03"));
        unresolvedSharedExcluded += 1;
      } else {
        kept.push(neutralizeUnverifiedSharedIdentity(source));
        unresolvedSharedInformational += 1;
      }
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

      if (!nestedSharedAllowed(safe)) {
        const before = safe.plans.length;
        safe.plans = safe.plans.filter((plan) => plan?.deliveryType !== "shared");
        unresolvedSharedNestedPlansFiltered += before - safe.plans.length;
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

if (approvedCommerce) {
  const leakedShared = publicProducts.filter((product) => product?.accessType === "shared" && !sharedAllowed(product));
  if (leakedShared.length) {
    throw new Error(`[public-projection] shared-access fail-closed leak: ${leakedShared.map((product) => product?.id ?? product?.slug ?? "unknown").join(", ")}`);
  }
  const leakedNested = publicProducts.flatMap((product) => (product?.plans ?? []).filter((plan) => plan?.deliveryType === "shared" && !nestedSharedAllowed(product)).map(() => product?.id ?? product?.slug ?? "unknown"));
  if (leakedNested.length) {
    throw new Error(`[public-projection] unresolved shared nested-plan leak: ${[...new Set(leakedNested)].join(", ")}`);
  }
}

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
    shared_access_default_fail_closed: approvedCommerce,
    shared_access_explicit_allow_count: sharedAllows.length,
    unresolved_shared_records_excluded: unresolvedSharedExcluded,
    unresolved_shared_records_retained_informational: unresolvedSharedInformational,
    unresolved_shared_nested_plans_filtered: unresolvedSharedNestedPlansFiltered,
  },
  products: publicProducts,
};

writeFileSync(outPath, `${JSON.stringify(output)}\n`, "utf8");
const compliance = approvedCommerce
  ? `; provider-controls=${providerControls.length}; excluded=${excludedRecords.length}; nested-plans-filtered=${filteredNestedPlans}; shared-default=fail-closed; shared-allows=${sharedAllows.length}; unresolved-shared-excluded=${unresolvedSharedExcluded}; unresolved-shared-informational=${unresolvedSharedInformational}; unresolved-shared-nested-filtered=${unresolvedSharedNestedPlansFiltered}`
  : "; provider-controls not applied in informational fail-closed mode";
console.log(`[public-projection] ${publicProducts.length}/${sourceProducts.length} records -> ${output.projection.mode}; policy=${output.projection.approved_mode_policy}${compliance}`);
if (excludedRecords.length) {
  console.log(`[public-projection] excluded source rows: ${excludedRecords.map((item) => `${item.id ?? item.slug ?? "unknown"}(${item.control_id})`).join(", ")}`);
}
