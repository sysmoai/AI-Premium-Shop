#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const productsDoc = JSON.parse(readFileSync(join(APP, "data/products.json"), "utf8"));
const providerDoc = JSON.parse(readFileSync(join(REPO, "ops/ssot/provider-sources.json"), "utf8"));
const products = Array.isArray(productsDoc) ? productsDoc : (productsDoc.products ?? []);
const providerEntries = providerDoc.providers ?? {};
const strict = process.argv.includes("--strict");
const verifyProjection = process.argv.includes("--projection");
const failures = [];
const fail = (message) => failures.push(message);
const acceptedStatuses = new Set(["reviewed-current-sources", "reviewed-current-source-access-limited"]);

const shared = products.filter((p) => p?.accessType === "shared");
const byProvider = new Map();
for (const p of shared) {
  const provider = String(p?.provider ?? "UNKNOWN").trim() || "UNKNOWN";
  if (!byProvider.has(provider)) byProvider.set(provider, []);
  byProvider.get(provider).push({ id: p.id, name: p.name, slug: p.slug, tier: p.tier, price: p.price });
}

const normalize = (value) => String(value ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "");
const entryFor = (provider) => Object.entries(providerEntries).find(([, entry]) => normalize(entry?.provider_name) === normalize(provider));
const rows = [...byProvider.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([provider, records]) => {
    const match = entryFor(provider);
    const entryKey = match?.[0] ?? null;
    const entry = match?.[1] ?? null;
    const resolved = acceptedStatuses.has(entry?.status);
    const limited = entry?.status === "reviewed-current-source-access-limited";
    const controls = (entry?.public_catalog_controls ?? []).filter((c) => c?.status === "ENFORCED");
    return {
      provider,
      shared_records: records.length,
      review_resolved: resolved,
      access_limited: limited,
      enforced_control_present: controls.length > 0,
      entryKey,
      entry,
      controls,
      records,
    };
  });

if (providerDoc?.schema_version !== 2) fail("provider-sources.json schema_version must be 2");
if (providerDoc?.review_queue?.status !== "closed-for-current-shared-catalog-scope") fail("shared provider review queue is not closed for the current catalog scope");
if (providerDoc?.review_method?.providers_in_scope !== rows.length) fail(`review_method providers_in_scope=${providerDoc?.review_method?.providers_in_scope} but raw shared providers=${rows.length}`);
if (providerDoc?.review_method?.scope !== "all providers represented by the 44 raw accessType=shared catalog records") fail("provider review_method scope changed unexpectedly");
if (shared.length !== 44) fail(`raw shared record count drifted from governed review scope: expected 44, found ${shared.length}; reopen provider review before publication`);

const unresolved = rows.filter((r) => !r.review_resolved);
for (const row of rows) {
  if (!row.entry) {
    fail(`${row.provider}: no provider evidence entry`);
    continue;
  }
  if (!Array.isArray(row.entry.sources) || row.entry.sources.length === 0) fail(`${row.provider}: reviewed entry has no first-party source record`);
  if (row.entry?.commerce_implication?.public_vendor_authorization_claim_allowed !== false) fail(`${row.provider}: vendor authorization must remain false unless separately evidenced and reviewed`);
  const sourceIds = new Set((row.entry.sources ?? []).map((s) => s?.id).filter(Boolean));
  for (const control of row.controls) {
    if (control?.action !== "exclude-from-approved-commerce-projection") fail(`${row.provider}: unsupported ENFORCED control action ${control?.action}`);
    if (control?.match?.provider !== row.provider || control?.match?.accessType !== "shared") fail(`${row.provider}: ENFORCED control match must target the exact raw provider and shared access`);
    if (!Array.isArray(control?.evidence_refs) || control.evidence_refs.length === 0) fail(`${row.provider}: ENFORCED control has no evidence refs`);
    for (const ref of control?.evidence_refs ?? []) if (!sourceIds.has(ref)) fail(`${row.provider}: ENFORCED control references unknown source ${ref}`);
  }
}

const blockedProviders = rows.filter((r) => r.enforced_control_present).length;
if (providerDoc?.review_method?.provider_specific_publication_blocks !== blockedProviders) fail(`review_method block count=${providerDoc?.review_method?.provider_specific_publication_blocks} but actual blocked providers=${blockedProviders}`);

console.log(`[provider-coverage] shared records=${shared.length}; providers=${rows.length}; resolved=${rows.length - unresolved.length}; access-limited=${rows.filter((r) => r.access_limited).length}; blocked-providers=${blockedProviders}; unresolved=${unresolved.length}`);
for (const row of rows) {
  const ids = row.records.map((r) => r.id).join(", ");
  const state = row.access_limited ? "LIMITED" : row.review_resolved ? "REVIEWED" : "UNRESOLVED";
  console.log(`[provider-coverage] ${state} | ${row.provider} | shared=${row.shared_records} | control=${row.enforced_control_present ? "yes" : "no"} | ${ids}`);
}

if (verifyProjection) {
  const projectionDoc = JSON.parse(readFileSync(join(APP, "data/public-products.json"), "utf8"));
  const projected = Array.isArray(projectionDoc) ? projectionDoc : (projectionDoc.products ?? []);
  if (projectionDoc?.projection?.mode !== "approved-commerce") fail(`projection verification expected approved-commerce, got ${projectionDoc?.projection?.mode ?? "unknown"}`);
  for (const row of rows) {
    for (const control of row.controls) {
      const surviving = projected.filter((p) => p?.provider === row.provider && p?.accessType === "shared");
      if (surviving.length) fail(`${row.provider}: ${surviving.length} shared source record(s) survived an ENFORCED block`);
      if (control?.nested_plan_match?.deliveryType === "shared") {
        const nested = projected.flatMap((p) => (p?.provider === row.provider ? (p?.plans ?? []).filter((plan) => plan?.deliveryType === "shared").map((plan) => `${p.id ?? p.slug}/${plan.name ?? plan.id ?? "shared"}`) : []));
        if (nested.length) fail(`${row.provider}: shared nested plan(s) survived ENFORCED block: ${nested.join(", ")}`);
      }
    }
  }
  console.log(`[provider-coverage] projection verified: public records=${projected.length}; provider blocks=${blockedProviders}`);
}

if (strict && (unresolved.length || failures.length)) {
  console.error(`[provider-coverage] FAIL: unresolved=${unresolved.length}; invariant failures=${failures.length}`);
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}
if (failures.length) {
  console.warn(`[provider-coverage] WARN (${failures.length})`);
  for (const item of failures) console.warn(`- ${item}`);
}
console.log(`[provider-coverage] ${strict ? "PASS" : "REPORT"}: current shared-provider scope is classified${verifyProjection ? " and ENFORCED blocks are absent from the public projection" : ""}`);
