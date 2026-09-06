import fs from "node:fs";
import path from "node:path";

export const PROVIDER_BASE_SOURCE = "ops/ssot/provider-sources.json";
export const PROVIDER_AMENDMENT_SOURCE = "ops/ssot/provider-amendments-2026-09-07.json";

const readJson = (repoRoot, file) => JSON.parse(fs.readFileSync(path.join(repoRoot, file), "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));

export function loadEffectiveProviderEvidence(repoRoot) {
  const base = readJson(repoRoot, PROVIDER_BASE_SOURCE);
  const amendment = readJson(repoRoot, PROVIDER_AMENDMENT_SOURCE);

  if (base?.schema_version !== 2) throw new Error("provider evidence base schema_version must be 2");
  if (amendment?.schema_version !== 1) throw new Error("provider evidence amendment schema_version must be 1");
  if (amendment?.base_source !== PROVIDER_BASE_SOURCE) throw new Error("provider evidence amendment base_source mismatch");
  if (!amendment?.amendments || typeof amendment.amendments !== "object" || Array.isArray(amendment.amendments)) {
    throw new Error("provider evidence amendments must be an object");
  }

  const effective = clone(base);
  for (const [providerKey, patch] of Object.entries(amendment.amendments)) {
    const provider = effective?.providers?.[providerKey];
    if (!provider) throw new Error(`provider evidence amendment targets unknown provider ${providerKey}`);
    if (patch?.provider_name !== provider.provider_name) throw new Error(`${providerKey}: amendment provider_name mismatch`);

    const existingIds = new Set((provider.sources ?? []).map((source) => source?.id).filter(Boolean));
    const added = patch.add_sources ?? [];
    for (const source of added) {
      if (!source?.id) throw new Error(`${providerKey}: amended source id is required`);
      if (existingIds.has(source.id)) throw new Error(`${providerKey}: amended source id duplicates base source ${source.id}`);
      existingIds.add(source.id);
    }

    provider.sources = [...(provider.sources ?? []), ...clone(added)];
    if (patch.reviewed_at) provider.reviewed_at = patch.reviewed_at;
    if (patch.status) provider.status = patch.status;
    if (patch.access_policy) provider.access_policy = clone(patch.access_policy);
    if (patch.replace_public_catalog_controls) provider.public_catalog_controls = clone(patch.replace_public_catalog_controls);
    if (patch.commerce_implication) provider.commerce_implication = clone(patch.commerce_implication);
  }

  const blockedProviders = Object.values(effective?.providers ?? {}).filter((provider) =>
    (provider?.public_catalog_controls ?? []).some(
      (control) => control?.status === "ENFORCED" && control?.action === "exclude-from-approved-commerce-projection",
    ),
  ).length;
  const expected = amendment?.expected_effective_state?.provider_specific_publication_blocks;
  if (blockedProviders !== expected) {
    throw new Error(`effective provider block count=${blockedProviders}; amendment expected=${expected}`);
  }

  effective.updated_at = amendment.updated_at;
  effective.review_method = {
    ...(effective.review_method ?? {}),
    provider_specific_publication_blocks: blockedProviders,
  };
  effective.effective_evidence = {
    base_source: PROVIDER_BASE_SOURCE,
    amendment_source: PROVIDER_AMENDMENT_SOURCE,
    amendment_schema_version: amendment.schema_version,
    effective_updated_at: amendment.updated_at,
  };
  return effective;
}
