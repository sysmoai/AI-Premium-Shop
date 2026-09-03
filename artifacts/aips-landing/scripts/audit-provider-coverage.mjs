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
    const entry = match?.[1] ?? null;
    const reviewed = entry?.status === "reviewed-current-sources";
    const enforced = (entry?.public_catalog_controls ?? []).some((c) => c?.status === "ENFORCED");
    return {
      provider,
      shared_records: records.length,
      reviewed_current_sources: reviewed,
      enforced_control_present: enforced,
      records,
    };
  });

const unreviewed = rows.filter((r) => !r.reviewed_current_sources);
console.log(`[provider-coverage] shared records=${shared.length}; providers=${rows.length}; reviewed=${rows.length - unreviewed.length}; unreviewed=${unreviewed.length}`);
for (const row of rows) {
  const ids = row.records.map((r) => r.id).join(", ");
  console.log(`[provider-coverage] ${row.reviewed_current_sources ? "REVIEWED" : "UNREVIEWED"} | ${row.provider} | shared=${row.shared_records} | control=${row.enforced_control_present ? "yes" : "no"} | ${ids}`);
}

if (strict && unreviewed.length) {
  console.error(`[provider-coverage] FAIL: ${unreviewed.length} shared-access provider(s) lack reviewed current first-party source records`);
  process.exit(1);
}

console.log(`[provider-coverage] ${strict ? "PASS" : "REPORT"}: ${unreviewed.length ? "review queue remains" : "all shared-access providers are reviewed"}`);
