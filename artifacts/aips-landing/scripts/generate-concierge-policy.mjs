#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const commercial = JSON.parse(readFileSync(join(REPO, "ops/ssot/commercial.json"), "utf8"));

const claims = commercial?.public_claim_policy ?? {};
const payment = claims.payment ?? {};
const access = claims.access_model ?? {};
const delivery = claims.delivery ?? {};
const resolution = claims.warranty_refund ?? {};
const price = claims.price ?? {};

const requireTrue = (condition, message) => {
  if (!condition) throw new Error(`[concierge-policy] ${message}`);
};

requireTrue(commercial?.schema_version === 2, "commercial SSOT schema v2 is required");
requireTrue(Array.isArray(payment.approved_public_methods) && payment.approved_public_methods.length > 0, "approved payment methods are required");
requireTrue(payment.unlisted_payment_method_claim_allowed === false, "unlisted payment methods must remain blocked");
requireTrue(payment.payment_credentials_may_be_requested === false, "payment credentials must remain prohibited");
requireTrue(payment.exact_payment_instruction_requires_order_confirmation === true, "exact payment instructions must remain order-confirmed");
requireTrue(price.mode === "aips-catalog-price-confirm-before-payment", "AIPS catalog price confirmation policy changed unexpectedly");
requireTrue(delivery.mode === "confirm-before-payment" && delivery.fixed_sla_allowed === false, "delivery must remain confirm-before-payment with no fixed SLA");
requireTrue(resolution.mode === "order-specific-resolution" && resolution.blanket_period_allowed === false && resolution.guaranteed_outcome_allowed === false, "resolution must remain order-specific without blanket period or guaranteed outcome");
requireTrue(access.vendor_authorization_claim_allowed === false, "vendor authorization claims must remain blocked");
requireTrue(access.seat_count_claim_allowed_without_plan_evidence === false, "seat counts must require plan evidence");
requireTrue(access.privacy_specifics_claim_allowed_without_plan_evidence === false, "privacy specifics must require plan evidence");
requireTrue(access.full_feature_access_claim_allowed_without_plan_evidence === false, "full-feature claims must require plan evidence");
requireTrue(access.dedicated_or_exclusive_account_claim_allowed_without_plan_evidence === false, "dedicated/exclusive account claims must require plan evidence");

const policy = {
  schema_version: 1,
  generated_from: "ops/ssot/commercial.json",
  commercial_policy_revision: commercial.policy_revision,
  payment: {
    approved_public_methods: payment.approved_public_methods,
    unlisted_method_claim_allowed: false,
    credentials_may_be_requested: false,
    exact_instruction_requires_order_confirmation: true,
  },
  price: {
    mode: price.mode,
    confirm_before_payment: true,
    provider_msrp_claim_allowed: false,
  },
  access: {
    mode: access.mode,
    vendor_authorization_claim_allowed: false,
    seat_count_claim_allowed_without_plan_evidence: false,
    privacy_specifics_claim_allowed_without_plan_evidence: false,
    full_feature_access_claim_allowed_without_plan_evidence: false,
    dedicated_or_exclusive_account_claim_allowed_without_plan_evidence: false,
    provider_evidence_can_block_shared_publication: access.provider_evidence_can_block_shared_publication === true,
  },
  delivery: {
    mode: delivery.mode,
    fixed_sla_allowed: false,
    confirm_availability_before_payment: true,
    confirm_eta_before_payment: true,
  },
  resolution: {
    mode: resolution.mode,
    blanket_period_allowed: false,
    guaranteed_outcome_allowed: false,
    exact_terms_require_order_confirmation: true,
  },
  channel: {
    ordering: "WhatsApp",
    whatsapp_number_e164: "+8801865385348",
  },
};

writeFileSync(join(APP, "api/_policy.json"), `${JSON.stringify(policy, null, 2)}\n`, "utf8");
console.log(`[concierge-policy] wrote api/_policy.json from ${policy.commercial_policy_revision}; payment=${policy.payment.approved_public_methods.join("+")}; delivery=${policy.delivery.mode}; resolution=${policy.resolution.mode}`);
