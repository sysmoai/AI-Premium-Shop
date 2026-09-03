#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const runtime = process.argv.includes("--runtime");
const failures = [];
const fail = (message) => failures.push(message);
const read = (base, file) => readFileSync(join(base, file), "utf8");
const json = (base, file) => JSON.parse(read(base, file));

const commercial = json(REPO, "ops/ssot/commercial.json");
const providers = json(REPO, "ops/ssot/provider-sources.json");
const policy = json(APP, "api/_policy.json");
const conciergeSource = read(APP, "api/concierge.js");
const knowledgeSource = read(APP, "api/_knowledge.js");
const buildSource = read(APP, "scripts/build-public-site.mjs");
const generatorSource = read(APP, "scripts/generate-concierge-catalog.mjs");

const payment = commercial?.public_claim_policy?.payment ?? {};
const access = commercial?.public_claim_policy?.access_model ?? {};
const delivery = commercial?.public_claim_policy?.delivery ?? {};
const resolution = commercial?.public_claim_policy?.warranty_refund ?? {};

if (commercial?.schema_version !== 2) fail("commercial SSOT schema v2 is required");
if (JSON.stringify(payment.approved_public_methods) !== JSON.stringify(["bKash", "Nagad"])) fail("commercial approved_public_methods must be exactly bKash + Nagad until owner/evidence changes them");
if (payment.unlisted_payment_method_claim_allowed !== false) fail("unlisted payment methods must remain blocked");
if (payment.payment_credentials_may_be_requested !== false) fail("payment credential requests must remain prohibited");
if (payment.exact_payment_instruction_requires_order_confirmation !== true) fail("exact payment instructions must require order confirmation");
if (delivery.mode !== "confirm-before-payment" || delivery.fixed_sla_allowed !== false) fail("delivery policy must remain confirm-before-payment without fixed SLA");
if (resolution.mode !== "order-specific-resolution" || resolution.blanket_period_allowed !== false || resolution.guaranteed_outcome_allowed !== false) fail("resolution policy must remain order-specific without blanket period/guarantee");
for (const [key, expected] of Object.entries({
  vendor_authorization_claim_allowed: false,
  seat_count_claim_allowed_without_plan_evidence: false,
  privacy_specifics_claim_allowed_without_plan_evidence: false,
  full_feature_access_claim_allowed_without_plan_evidence: false,
  dedicated_or_exclusive_account_claim_allowed_without_plan_evidence: false,
})) {
  if (access?.[key] !== expected) fail(`commercial access policy drift: ${key}`);
}

if (policy?.schema_version !== 1 || policy?.generated_from !== "ops/ssot/commercial.json") fail("runtime policy projection identity is invalid");
if (policy?.commercial_policy_revision !== commercial?.policy_revision) fail("api/_policy.json commercial policy revision is stale");
if (JSON.stringify(policy?.payment?.approved_public_methods) !== JSON.stringify(payment.approved_public_methods)) fail("runtime policy payment methods drifted from commercial SSOT");
if (policy?.delivery?.fixed_sla_allowed !== false || policy?.resolution?.blanket_period_allowed !== false || policy?.resolution?.guaranteed_outcome_allowed !== false) fail("runtime policy re-enabled blocked delivery/resolution claims");
if (policy?.access?.vendor_authorization_claim_allowed !== false || policy?.access?.privacy_specifics_claim_allowed_without_plan_evidence !== false || policy?.access?.seat_count_claim_allowed_without_plan_evidence !== false || policy?.access?.full_feature_access_claim_allowed_without_plan_evidence !== false || policy?.access?.dedicated_or_exclusive_account_claim_allowed_without_plan_evidence !== false) fail("runtime policy re-enabled blocked access-model inferences");

const stalePositiveClaims = [
  "Every order includes a 30-day replacement warranty",
  "Refunds: only within 15 minutes",
  "2-7 customers share one legitimate subscription",
  "like family sharing",
  "full feature access, less privacy",
  "a dedicated account for one customer — full privacy",
  "standard starting recommendation is ChatGPT Plus Starter Shared",
  "paid via bKash/Nagad/Rocket/Bank Transfer",
  "pay via bKash/Nagad/Rocket/Bank Transfer",
  "from BDT 499/mo",
];
for (const claim of stalePositiveClaims) {
  if (conciergeSource.includes(claim)) fail(`concierge source still contains stale protected claim: ${claim}`);
  if (knowledgeSource.includes(claim)) fail(`knowledge source still contains stale protected claim: ${claim}`);
}

for (const required of [
  'readAdjacentJson("./_policy.json")',
  "assertRuntimeTruth();",
  "violatesCommercialTruth",
  "deliverySLA: null",
  "badge: null",
  "CURRENT PUBLIC CATALOG",
]) {
  if (!conciergeSource.includes(required)) fail(`concierge source missing truth guard: ${required}`);
}
if (/function productBlock[\s\S]{0,500}p\.caps/.test(conciergeSource)) fail("model-facing productBlock still exposes unverified capability claims");
if (/function formatTiers[\s\S]{0,700}deliverySLA/.test(conciergeSource)) fail("model-facing tier formatter still exposes delivery SLA");
if (/function formatTiers[\s\S]{0,700}badge/.test(conciergeSource)) fail("model-facing tier formatter still exposes unverified badge");

for (const required of [
  'generate-concierge-policy.mjs',
  'generate-concierge-catalog.mjs", "--source-public", "--public-safe"',
  'validate-concierge-truth.mjs", "--runtime"',
]) {
  if (!buildSource.includes(required)) fail(`production build missing concierge truth step: ${required}`);
}
if (!generatorSource.includes("publicSafe ? null") || !generatorSource.includes('process.argv.includes("--source-public")')) fail("concierge catalog generator does not expose explicit public-safe governed mode");

if (runtime) {
  const runtimeCatalog = json(APP, "api/_catalog.json");
  const projection = json(APP, "data/public-products.json");
  const projectedProducts = Array.isArray(projection) ? projection : (projection.products ?? []);
  const projectedSlugs = new Set(projectedProducts.map((p) => p.slug));
  const runtimePaths = new Set(runtimeCatalog.map((p) => p.path));

  if (!Array.isArray(runtimeCatalog) || runtimeCatalog.length === 0) fail("runtime concierge catalog is empty");
  if (runtimeCatalog.length !== projectedSlugs.size) fail(`runtime concierge family count ${runtimeCatalog.length} != governed projection unique slugs ${projectedSlugs.size}`);

  for (const product of runtimeCatalog) {
    if (product.blurb != null) fail(`${product.path}: provider-controlled blurb survived runtime catalog`);
    if (Array.isArray(product.caps) && product.caps.length) fail(`${product.path}: provider-controlled capability list survived runtime catalog`);
    for (const tier of product.tiers ?? []) {
      if (tier.deliverySLA != null) fail(`${product.path}/${tier.tier}: delivery SLA survived runtime catalog`);
      if (tier.badge != null) fail(`${product.path}/${tier.tier}: badge survived runtime catalog`);
    }
  }

  for (const slug of projectedSlugs) {
    if (!runtimePaths.has(`/${slug}`) && !runtimePaths.has(`/product/${slug}`)) fail(`governed projected slug ${slug} is missing from runtime concierge catalog`);
  }

  const approvedCommerce = projection?.projection?.mode === "approved-commerce";
  if (approvedCommerce) {
    const rawDocument = json(APP, "data/products.json");
    const rawProducts = Array.isArray(rawDocument) ? rawDocument : (rawDocument.products ?? []);
    const controls = Object.values(providers?.providers ?? {})
      .flatMap((provider) => provider?.public_catalog_controls ?? [])
      .filter((control) => control?.status === "ENFORCED" && control?.action === "exclude-from-approved-commerce-projection");

    for (const control of controls) {
      const excluded = rawProducts.filter((record) => Object.entries(control.match ?? {}).every(([key, value]) => record?.[key] === value));
      for (const row of excluded) {
        const entry = runtimeCatalog.find((p) => p.path === `/${row.slug}` || p.path === `/product/${row.slug}`);
        if (!entry) continue; // Family may disappear completely if no eligible sibling remains.
        if ((entry.tiers ?? []).some((tier) => tier.tier === row.tier && tier.accessType === row.accessType)) {
          fail(`${entry.path}: provider-blocked raw tier ${row.tier}/${row.accessType} survived concierge runtime catalog`);
        }
      }
    }
  } else {
    for (const product of runtimeCatalog) {
      for (const tier of product.tiers ?? []) {
        if (tier.priceBDT != null || tier.accessType != null) fail(`${product.path}/${tier.tier}: commerce survived informational fail-closed runtime catalog`);
      }
    }
  }
}

if (failures.length) {
  console.error(`[concierge-truth] FAIL (${failures.length})`);
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}
console.log(`[concierge-truth] PASS: source policy is SSOT-aligned${runtime ? "; generated runtime catalog is provider-filtered and protected-field-free" : ""}`);
