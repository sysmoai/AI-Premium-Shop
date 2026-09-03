import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const fail = (message) => failures.push(message);

let registry;
let catalogDocument;
try {
  registry = JSON.parse(fs.readFileSync(path.join(root, 'ops/ssot/provider-sources.json'), 'utf8'));
  catalogDocument = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/aips-landing/data/products.json'), 'utf8'));
} catch (error) {
  console.error(`[provider-sources] cannot read provider registry/catalog JSON: ${error.message}`);
  process.exit(1);
}

const catalog = Array.isArray(catalogDocument) ? catalogDocument : catalogDocument?.products ?? [];
const sharedCatalog = catalog.filter((record) => record?.accessType === 'shared');
const nonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;
const normalize = (value) => String(value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '');
const matches = (value, criteria) => Object.entries(criteria ?? {}).every(([key, expected]) => value?.[key] === expected);
const allowedControlActions = new Set(['exclude-from-approved-commerce-projection']);
const allowedControlStatuses = new Set(['DRAFT', 'ENFORCED', 'RETIRED']);
const allowedReviewStatuses = new Set(['reviewed-current-sources', 'reviewed-current-source-access-limited']);
const controlIds = new Set();
const enforcedMatches = [];

if (registry?.schema_version !== 2) fail('schema_version must be 2');
if (!nonEmpty(registry?.updated_at) || Number.isNaN(Date.parse(registry.updated_at))) fail('updated_at must be a valid ISO timestamp');
if (registry?.authority?.commercial_source_of_truth !== 'ops/ssot/commercial.json') fail('commercial authority must remain ops/ssot/commercial.json');
if (!nonEmpty(registry?.authority?.rule)) fail('authority.rule is required');
if (!registry?.providers || typeof registry.providers !== 'object' || Array.isArray(registry.providers)) fail('providers must be an object');
if (!Array.isArray(catalog) || catalog.length === 0) fail('raw catalog must contain records');
if (sharedCatalog.length !== 44) fail(`current governed shared scope expects 44 raw records; found ${sharedCatalog.length}. Reopen provider review before changing this scope.`);
if (registry?.review_queue?.status !== 'closed-for-current-shared-catalog-scope') fail('review_queue must be closed for the current shared catalog scope before approved commerce');

const providers = Object.entries(registry?.providers ?? {});
const providerByNormalizedName = new Map();
for (const [providerKey, provider] of providers) {
  if (!nonEmpty(provider?.provider_name)) {
    fail(`${providerKey}: provider_name is required`);
    continue;
  }
  const normalized = normalize(provider.provider_name);
  if (providerByNormalizedName.has(normalized)) fail(`${providerKey}: duplicate normalized provider_name ${provider.provider_name}`);
  providerByNormalizedName.set(normalized, { providerKey, provider });
}

const sharedProviderNames = [...new Set(sharedCatalog.map((record) => String(record?.provider ?? '').trim()).filter(Boolean))].sort();
if (sharedProviderNames.length !== 37) fail(`current governed shared scope expects 37 providers; found ${sharedProviderNames.length}. Reopen provider review before changing this scope.`);
if (registry?.review_method?.providers_in_scope !== sharedProviderNames.length) fail(`review_method.providers_in_scope must equal ${sharedProviderNames.length}`);
if (!nonEmpty(registry?.review_method?.scope)) fail('review_method.scope is required');

for (const providerName of sharedProviderNames) {
  if (!providerByNormalizedName.has(normalize(providerName))) fail(`raw shared provider ${providerName} has no evidence registry entry`);
}

let accessLimitedCount = 0;
let blockedProviderCount = 0;
for (const [providerKey, provider] of providers) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(provider?.reviewed_at ?? '')) || Number.isNaN(Date.parse(`${provider.reviewed_at}T00:00:00Z`))) {
    fail(`${providerKey}: reviewed_at must be YYYY-MM-DD`);
  }
  if (!allowedReviewStatuses.has(provider?.status)) fail(`${providerKey}: unsupported review status ${provider?.status}`);
  if (provider?.status === 'reviewed-current-source-access-limited') accessLimitedCount += 1;
  if (!Array.isArray(provider?.sources) || provider.sources.length === 0) {
    fail(`${providerKey}: at least one current first-party source record is required`);
    continue;
  }

  const sourceIds = new Set();
  for (const source of provider.sources) {
    if (!nonEmpty(source?.id)) fail(`${providerKey}: source id is required`);
    if (sourceIds.has(source?.id)) fail(`${providerKey}: duplicate source id ${source?.id}`);
    sourceIds.add(source?.id);
    if (!nonEmpty(source?.url) || !/^https:\/\//.test(source.url)) fail(`${providerKey}/${source?.id ?? 'unknown'}: source URL must be HTTPS`);
    if (!nonEmpty(source?.source_type)) fail(`${providerKey}/${source?.id ?? 'unknown'}: source_type is required`);
    if (!nonEmpty(source?.fact_scope)) fail(`${providerKey}/${source?.id ?? 'unknown'}: fact_scope is required`);
    if (!nonEmpty(source?.finding)) fail(`${providerKey}/${source?.id ?? 'unknown'}: finding is required`);
    if (!nonEmpty(source?.classification)) fail(`${providerKey}/${source?.id ?? 'unknown'}: classification is required`);
  }

  if (!provider?.access_policy || typeof provider.access_policy !== 'object') fail(`${providerKey}: access_policy is required`);
  if (provider?.access_policy?.vendor_authorized_shared_resale === 'evidenced' && provider?.commerce_implication?.public_vendor_authorization_claim_allowed !== true) {
    fail(`${providerKey}: evidenced vendor authorization and commerce implication disagree`);
  }
  if (provider?.access_policy?.vendor_authorized_shared_resale !== 'evidenced' && provider?.commerce_implication?.public_vendor_authorization_claim_allowed !== false) {
    fail(`${providerKey}: vendor authorization cannot be published without explicit evidence`);
  }

  let providerHasEnforcedBlock = false;
  for (const control of provider?.public_catalog_controls ?? []) {
    if (!nonEmpty(control?.id)) {
      fail(`${providerKey}: public catalog control id is required`);
      continue;
    }
    if (controlIds.has(control.id)) fail(`${providerKey}: duplicate public catalog control id ${control.id}`);
    controlIds.add(control.id);
    if (!allowedControlStatuses.has(control?.status)) fail(`${providerKey}/${control.id}: unsupported status ${control?.status}`);
    if (!allowedControlActions.has(control?.action)) fail(`${providerKey}/${control.id}: unsupported action ${control?.action}`);
    if (!control?.match || !nonEmpty(control.match.provider) || !nonEmpty(control.match.accessType)) {
      fail(`${providerKey}/${control.id}: match must include provider and accessType`);
      continue;
    }
    if (control.match.provider !== provider.provider_name) fail(`${providerKey}/${control.id}: match.provider must equal provider_name exactly`);
    if (control.match.accessType !== 'shared') fail(`${providerKey}/${control.id}: current provider block must be scoped to shared access`);
    if (!Array.isArray(control?.evidence_refs) || control.evidence_refs.length === 0) {
      fail(`${providerKey}/${control.id}: evidence_refs are required`);
    } else {
      for (const ref of control.evidence_refs) if (!sourceIds.has(ref)) fail(`${providerKey}/${control.id}: unknown evidence ref ${ref}`);
    }
    if (!nonEmpty(control?.reason)) fail(`${providerKey}/${control.id}: reason is required`);
    if (control?.nested_plan_match && control.nested_plan_match.deliveryType !== 'shared') {
      fail(`${providerKey}/${control.id}: nested_plan_match.deliveryType must be shared when configured`);
    }

    if (control.status === 'ENFORCED') {
      providerHasEnforcedBlock = true;
      const matchedRows = catalog.filter((record) => matches(record, control.match));
      if (matchedRows.length === 0) fail(`${providerKey}/${control.id}: ENFORCED control matches no current raw catalog rows`);
      let nestedPlanMatches = 0;
      if (control.nested_plan_match) {
        // This selector is intentionally allowed to match zero nested plans today:
        // it is a future-safe constraint that prevents a later shared nested plan
        // from bypassing the same provider evidence. The source-row match above is
        // the required current anchor, and projection validation proves that any
        // matching nested plans that do exist cannot survive publication.
        for (const record of catalog.filter((item) => item?.provider === control.match.provider)) {
          nestedPlanMatches += (record?.plans ?? []).filter((plan) => matches(plan, control.nested_plan_match)).length;
        }
      }
      enforcedMatches.push({
        providerKey,
        controlId: control.id,
        rows: matchedRows.map((row) => ({ id: row?.id ?? null, slug: row?.slug ?? null, tier: row?.tier ?? null })),
        nestedPlanMatches,
      });
    }
  }

  if (providerHasEnforcedBlock) blockedProviderCount += 1;
  if (provider?.commerce_implication?.shared_access_publication_block_enforced !== providerHasEnforcedBlock) {
    fail(`${providerKey}: commerce_implication.shared_access_publication_block_enforced disagrees with ENFORCED controls`);
  }
}

if (providers.length !== 37) fail(`registry must contain exactly the 37 providers in the current shared-access review scope; found ${providers.length}`);
if (accessLimitedCount !== registry?.review_method?.reviewed_current_source_access_limited) {
  fail(`review_method access-limited count=${registry?.review_method?.reviewed_current_source_access_limited}; actual=${accessLimitedCount}`);
}
if (blockedProviderCount !== registry?.review_method?.provider_specific_publication_blocks) {
  fail(`review_method blocked provider count=${registry?.review_method?.provider_specific_publication_blocks}; actual=${blockedProviderCount}`);
}
if (blockedProviderCount !== 26) fail(`current reviewed scope expects 26 evidence-backed blocked providers; found ${blockedProviderCount}`);

const openai = providerByNormalizedName.get(normalize('OpenAI'))?.provider;
if (!openai) {
  fail('openai: required evidence entry missing');
} else {
  if (openai?.access_policy?.multi_user_or_account_sharing !== 'individual-account-sharing-prohibited') fail('openai: reviewed account-sharing classification changed unexpectedly');
  if (openai?.commerce_implication?.shared_access_publication_block_enforced !== true) fail('openai: shared-access block must remain enforced while current evidence applies');
  const openaiBlock = (openai?.public_catalog_controls ?? []).find((control) => control?.status === 'ENFORCED');
  if (!openaiBlock || openaiBlock?.match?.provider !== 'OpenAI' || openaiBlock?.match?.accessType !== 'shared') fail('openai: scoped publication block is missing or malformed');
}

if (failures.length) {
  console.error(`[provider-sources] FAIL (${failures.length})`);
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log(`[provider-sources] PASS: ${providers.length} shared-provider evidence records cover ${sharedCatalog.length} raw shared records; blocked-providers=${blockedProviderCount}; access-limited=${accessLimitedCount}; controls=${controlIds.size}`);
for (const item of enforcedMatches) {
  const rows = item.rows.map((row) => `${row.id ?? row.slug ?? 'unknown'}${row.tier ? `/${row.tier}` : ''}`).join(', ');
  console.log(`[provider-sources] ENFORCED ${item.providerKey}/${item.controlId}: rows=${item.rows.length} [${rows}]; nested-plans=${item.nestedPlanMatches}`);
}
console.log('[provider-sources] all current shared providers are classified; unknown vendor authorization remains fail-closed');
