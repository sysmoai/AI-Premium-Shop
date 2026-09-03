#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const sitePath = join(REPO, "ops/ssot/site.json");
const commercialPath = join(REPO, "ops/ssot/commercial.json");
const providerSourcesPath = join(REPO, "ops/ssot/provider-sources.json");
const rawPath = join(APP, "data/products.json");
const projectedPath = join(APP, "data/public-products.json");
const publicationStatePath = join(APP, "src/generated/publicationState.ts");
const homepageV2Path = join(APP, "src/generated/homepageV2.ts");

const originalSite = readFileSync(sitePath, "utf8");
const originalCommercial = readFileSync(commercialPath, "utf8");

function runScript(script) {
  const result = spawnSync(process.execPath, [script], {
    cwd: APP,
    stdio: "inherit",
  });
  if (result.status !== 0) throw new Error(`${script} failed with ${result.status}`);
}

function runProjection() {
  runScript("scripts/generate-public-projection.mjs");
  return JSON.parse(readFileSync(projectedPath, "utf8"));
}

function runPublicationState() {
  runScript("scripts/generate-publication-state.mjs");
  return readFileSync(publicationStatePath, "utf8");
}

function runHomepageV2() {
  runScript("scripts/generate-media-catalog.mjs");
  runScript("scripts/generate-homepage-v2-view.mjs");
  const source = readFileSync(homepageV2Path, "utf8");
  const marker = "export const HOMEPAGE_V2: PublicHomepageView = ";
  const start = source.indexOf(marker);
  if (start < 0) throw new Error("could not parse generated Homepage V2 view");
  const jsonText = source.slice(start + marker.length).trim().replace(/;$/, "");
  return JSON.parse(jsonText);
}

function assert(condition, message) {
  if (!condition) throw new Error(`[public-projection-test] ${message}`);
}

function assertNeutralizedProtectedFields(product, label) {
  assert(product.officialUSD == null, `${label}: unverified officialUSD survived governed projection`);
  assert(product.deliverySLA == null, `${label}: deliverySLA survived governed projection`);
  assert(product.estimatedDeliveryTime == null, `${label}: estimatedDeliveryTime survived governed projection`);
  assert(product.deliveryMethod == null, `${label}: deliveryMethod survived governed projection`);
  assert(product.stock == null, `${label}: stock survived governed projection`);
  assert(product.trust == null, `${label}: trust/rating block survived governed projection`);
  assert(product.badge == null, `${label}: singular badge survived governed projection`);
  assert(!Array.isArray(product.badges) || product.badges.length === 0, `${label}: badges survived governed projection`);
  assert(!Array.isArray(product.competitorCompare) || product.competitorCompare.length === 0, `${label}: competitorCompare survived governed projection`);
  assert(product.whatsappMsg == null, `${label}: stale product-specific WhatsApp message survived governed projection`);
  assert(product.activationType == null, `${label}: activationType survived governed projection`);
  assert(!Array.isArray(product.bundleSuggestions) || product.bundleSuggestions.length === 0, `${label}: bundleSuggestions survived governed projection`);
  assert(product.higherPlanUpsell == null, `${label}: higherPlanUpsell survived governed projection`);
  assert(!Array.isArray(product.howItWorksSteps) || product.howItWorksSteps.length === 0, `${label}: howItWorksSteps survived governed projection`);
}

const matches = (value, criteria) => Object.entries(criteria ?? {}).every(([key, expected]) => value?.[key] === expected);

try {
  const raw = JSON.parse(readFileSync(rawPath, "utf8"));
  const rawProducts = Array.isArray(raw) ? raw : raw.products ?? [];
  const providerSources = JSON.parse(readFileSync(providerSourcesPath, "utf8"));
  const controls = Object.values(providerSources?.providers ?? {})
    .flatMap((provider) => provider?.public_catalog_controls ?? [])
    .filter((control) => control?.status === "ENFORCED" && control?.action === "exclude-from-approved-commerce-projection");

  const excludedSourceRows = rawProducts.filter((record) => controls.some((control) => matches(record, control.match)));
  const excludedIds = new Set(excludedSourceRows.map((record) => record.id));
  const retainedRawProducts = rawProducts.filter((record) => !excludedIds.has(record.id));
  const expectedApprovedCount = retainedRawProducts.length;
  const expectedNestedFilters = retainedRawProducts.reduce((total, record) => {
    let count = 0;
    for (const control of controls) {
      if (record?.provider !== control?.match?.provider || !control?.nested_plan_match) continue;
      count += (record?.plans ?? []).filter((plan) => matches(plan, control.nested_plan_match)).length;
    }
    return total + count;
  }, 0);
  const rawById = new Map(rawProducts.map((record) => [record.id, record]));

  const current = runProjection();
  const currentState = runPublicationState();
  const currentHomepage = runHomepageV2();

  assert(current.products.length === expectedApprovedCount, `approved projection count ${current.products.length} does not equal raw ${rawProducts.length} minus controlled exclusions ${excludedSourceRows.length}`);
  assert(current.projection.schema_version === 2, "current projection is not schema v2");
  assert(current.projection.approved_mode_policy === "governed-approved-commerce-v2", "approved projection policy revision is missing");
  assert(current.projection.legacy_commercial_fields_neutralized === true, "approved projection did not record legacy-field neutralization");
  assert(current.projection.unverified_provider_pricing_neutralized === true, "approved projection did not record provider-price neutralization");
  assert(current.projection.provider_compliance_controls_applied === true, "approved projection did not apply provider controls");
  assert(current.projection.provider_compliance_control_count === controls.length, "provider control count metadata disagrees with SSOT");
  assert(current.projection.provider_compliance_excluded_records === excludedSourceRows.length, "provider exclusion metadata disagrees with catalog impact");
  assert(current.projection.provider_compliance_filtered_nested_plans === expectedNestedFilters, `nested-plan metadata ${current.projection.provider_compliance_filtered_nested_plans} does not equal expected retained-row filtering ${expectedNestedFilters}`);
  assert(current.projection.mode === "approved-commerce", `expected approved-commerce current mode, got ${current.projection.mode}`);
  assert(currentState.includes('"publicationAllowed": true'), "current compile-time gate did not allow approved commerce");
  assert(currentState.includes('"quarantine": false'), "current compile-time gate unexpectedly enabled quarantine");
  assert(currentHomepage.publication.mode === "approved-commerce", "Homepage V2 did not inherit approved publication mode");
  assert(!currentHomepage.recommendations.some((p) => p.slug === "replit-bangladesh"), "retired platform leaked into Homepage V2 recommendations");

  for (const excluded of excludedSourceRows) {
    assert(!current.products.some((product) => product.id === excluded.id), `${excluded.id}: provider-controlled excluded source row survived approved projection`);
  }

  let preservedPriceCount = 0;
  let preservedAccessCount = 0;
  for (const projected of current.products) {
    const source = rawById.get(projected.id);
    assert(source, `${projected.id}: projected record does not map to a raw source record`);
    assert(!excludedIds.has(projected.id), `${projected.id}: excluded source record reappeared in approved projection`);
    assertNeutralizedProtectedFields(projected, projected.slug ?? projected.id);
    if (typeof source.price === "number" && Number.isFinite(source.price)) {
      assert(projected.price === source.price, `${projected.slug}: approved AIPS price changed during governance projection`);
      preservedPriceCount += 1;
    }
    if (source.accessType != null) {
      assert(projected.accessType === source.accessType, `${projected.slug}: approved catalog access label changed during governance projection`);
      preservedAccessCount += 1;
    }
    for (const control of controls) {
      if (projected.provider !== control?.match?.provider || !control?.nested_plan_match) continue;
      assert(!(projected.plans ?? []).some((plan) => matches(plan, control.nested_plan_match)), `${projected.id}: provider-controlled nested plan survived approved projection`);
    }
  }
  assert(preservedPriceCount > 0, "approved projection preserved no numeric AIPS prices");
  assert(preservedAccessCount > 0, "approved projection preserved no access labels");

  const openaiControl = controls.find((control) => control?.match?.provider === "OpenAI" && control?.match?.accessType === "shared");
  if (openaiControl) {
    const rawEligibleOpenAi = rawProducts.filter((record) => record?.provider === "OpenAI" && !matches(record, openaiControl.match));
    assert(rawEligibleOpenAi.length > 0, "OpenAI control would remove every OpenAI source row; no non-matching option remains to preserve the family");
    assert(current.products.some((record) => record?.provider === "OpenAI" && !matches(record, openaiControl.match)), "approved projection removed all OpenAI options instead of preserving non-matching records");
    if (rawProducts.some((record) => record?.slug === "chatgpt-plus-bangladesh" && record?.provider === "OpenAI" && !matches(record, openaiControl.match))) {
      assert(current.products.some((record) => record?.slug === "chatgpt-plus-bangladesh" && record?.provider === "OpenAI"), "ChatGPT family route lost despite a remaining non-matching OpenAI record");
    }
  }

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
  const quarantinedState = runPublicationState();
  const quarantinedHomepage = runHomepageV2();
  assert(quarantined.projection.mode === "informational-fail-closed", "quarantine did not switch projection mode");
  assert(quarantined.products.length === rawProducts.length, "quarantine changed raw identity record count");
  assert(quarantined.projection.provider_compliance_controls_applied === false, "provider commerce exclusions should not delete identity rows in informational quarantine mode");
  assert(quarantined.projection.provider_compliance_excluded_records === 0, "quarantine incorrectly recorded approved-commerce exclusions");
  assert(quarantinedState.includes('"publicationAllowed": false'), "compile-time gate remained publishable under quarantine");
  assert(quarantinedState.includes('"quarantine": true'), "compile-time gate did not enable quarantine");
  assert(quarantinedState.includes('"mode": "informational-fail-closed"'), "compile-time gate did not record fail-closed mode");
  assert(quarantinedHomepage.publication.mode === "informational-fail-closed", "Homepage V2 did not inherit fail-closed publication mode");
  assert(quarantinedHomepage.catalog.minPrice == null, "Homepage V2 retained a minimum price under quarantine");
  assert(quarantinedHomepage.catalog.publicPlans === 0, "Homepage V2 retained public sellable plan count under quarantine");

  for (const product of quarantined.products) {
    assertNeutralizedProtectedFields(product, product.slug);
    assert(product.price == null, `${product.slug}: numeric/public price survived quarantine`);
    assert(product.requestPrice === true, `${product.slug}: request-price fallback not enforced`);
    assert(product.accessType == null, `${product.slug}: accessType survived quarantine`);
    assert(!Array.isArray(product.plans) || product.plans.length === 0, `${product.slug}: plans survived quarantine`);
  }

  for (const recommendation of quarantinedHomepage.recommendations) {
    assert(Array.isArray(recommendation.variants) && recommendation.variants.length > 0, `${recommendation.slug}: Homepage V2 recommendation variants missing`);
    for (const variant of recommendation.variants) {
      assert(variant.price == null, `${recommendation.slug}: Homepage V2 variant numeric price survived quarantine`);
      assert(variant.requestPrice === true, `${recommendation.slug}: Homepage V2 variant request-price fallback not enforced`);
      assert(variant.accessType == null, `${recommendation.slug}: Homepage V2 variant access type survived quarantine`);
    }
  }

  console.log(`[public-projection-test] PASS: raw=${rawProducts.length}; approved=${current.products.length}; provider-excluded=${excludedSourceRows.length}; nested-filtered=${current.projection.provider_compliance_filtered_nested_plans}; approved prices/access preserved for eligible records; quarantine retains all identities and fails closed`);
} finally {
  writeFileSync(sitePath, originalSite, "utf8");
  writeFileSync(commercialPath, originalCommercial, "utf8");
  runProjection();
  runPublicationState();
  runHomepageV2();
}
