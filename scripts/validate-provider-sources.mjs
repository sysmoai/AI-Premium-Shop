import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const fail = (message) => {
  console.error(`[provider-sources] ${message}`);
  process.exitCode = 1;
};

let registry;
let catalogDocument;
try {
  registry = JSON.parse(fs.readFileSync(path.join(root, 'ops/ssot/provider-sources.json'), 'utf8'));
  catalogDocument = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/aips-landing/data/products.json'), 'utf8'));
} catch (error) {
  fail(`cannot read provider registry/catalog JSON: ${error.message}`);
  process.exit();
}

const catalog = Array.isArray(catalogDocument) ? catalogDocument : catalogDocument?.products ?? [];
const nonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;
const matches = (value, criteria) => Object.entries(criteria ?? {}).every(([key, expected]) => value?.[key] === expected);
const allowedControlActions = new Set(['exclude-from-approved-commerce-projection']);
const allowedControlStatuses = new Set(['DRAFT', 'ENFORCED', 'RETIRED']);
const controlIds = new Set();
const enforcedMatches = [];

if (registry?.schema_version !== 1) fail('schema_version must be 1');
if (!nonEmpty(registry?.updated_at) || Number.isNaN(Date.parse(registry.updated_at))) fail('updated_at must be a valid ISO timestamp');
if (registry?.authority?.commercial_source_of_truth !== 'ops/ssot/commercial.json') fail('commercial authority must remain ops/ssot/commercial.json');
if (!nonEmpty(registry?.authority?.rule)) fail('authority.rule is required');
if (!registry?.providers || typeof registry.providers !== 'object' || Array.isArray(registry.providers)) fail('providers must be an object');
if (!Array.isArray(catalog) || catalog.length === 0) fail('raw catalog must contain records');

for (const [providerKey, provider] of Object.entries(registry?.providers ?? {})) {
  if (!nonEmpty(provider?.provider_name)) fail(`${providerKey}: provider_name is required`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(provider?.reviewed_at ?? '')) || Number.isNaN(Date.parse(`${provider.reviewed_at}T00:00:00Z`))) {
    fail(`${providerKey}: reviewed_at must be YYYY-MM-DD`);
  }
  if (!Array.isArray(provider?.sources) || provider.sources.length === 0) {
    fail(`${providerKey}: at least one current first-party source is required`);
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
    if (control.match.provider !== provider.provider_name) {
      fail(`${providerKey}/${control.id}: match.provider must equal provider_name`);
    }
    if (!Array.isArray(control?.evidence_refs) || control.evidence_refs.length === 0) {
      fail(`${providerKey}/${control.id}: evidence_refs are required`);
    } else {
      for (const ref of control.evidence_refs) {
        if (!sourceIds.has(ref)) fail(`${providerKey}/${control.id}: unknown evidence ref ${ref}`);
      }
    }
    if (!nonEmpty(control?.reason)) fail(`${providerKey}/${control.id}: reason is required`);
    if (control?.nested_plan_match && !nonEmpty(control.nested_plan_match.deliveryType)) {
      fail(`${providerKey}/${control.id}: nested_plan_match.deliveryType is required when nested plan filtering is configured`);
    }

    if (control.status === 'ENFORCED') {
      const matchedRows = catalog.filter((record) => matches(record, control.match));
      if (matchedRows.length === 0) fail(`${providerKey}/${control.id}: ENFORCED control matches no current raw catalog rows`);
      let nestedPlanMatches = 0;
      if (control.nested_plan_match) {
        for (const record of catalog.filter((item) => item?.provider === control.match.provider)) {
          nestedPlanMatches += (record?.plans ?? []).filter((plan) => matches(plan, control.nested_plan_match)).length;
        }
        if (nestedPlanMatches === 0) fail(`${providerKey}/${control.id}: configured nested plan control matches no current raw plans`);
      }
      enforcedMatches.push({
        providerKey,
        controlId: control.id,
        rows: matchedRows.map((row) => ({ id: row?.id ?? null, slug: row?.slug ?? null, tier: row?.tier ?? null })),
        nestedPlanMatches,
      });
    }
  }

  if (provider?.commerce_implication?.public_vendor_authorization_claim_allowed === true && provider?.access_policy?.vendor_authorized_shared_resale !== 'evidenced') {
    fail(`${providerKey}: vendor authorization cannot be published without explicit evidence`);
  }
}

const openai = registry?.providers?.openai;
if (openai) {
  if (openai?.access_policy?.personal_account_multi_user_sharing !== 'prohibited-by-current-provider-guidance') {
    fail('openai: current account-sharing classification changed without replacing the reviewed evidence');
  }
  if (openai?.access_policy?.aips_shared_catalog_compatibility !== 'conflicts-with-current-provider-guidance') {
    fail('openai: AIPS shared compatibility must reflect the reviewed provider guidance');
  }
  if (openai?.commerce_implication?.public_vendor_authorization_claim_allowed !== false) {
    fail('openai: public vendor-authorization claims must remain blocked');
  }
  if (openai?.commerce_implication?.shared_access_publication_block_enforced !== true) {
    fail('openai: evidence conflict requires the scoped public catalog block to remain enforced');
  }
  const openaiBlock = (openai?.public_catalog_controls ?? []).find((control) => control?.id === 'openai-shared-account-publication-block-2026-09-03');
  if (!openaiBlock || openaiBlock.status !== 'ENFORCED') fail('openai: required scoped publication block is not ENFORCED');
  if (openaiBlock?.match?.provider !== 'OpenAI' || openaiBlock?.match?.accessType !== 'shared') fail('openai: publication block scope changed unexpectedly');
  if (openaiBlock?.nested_plan_match?.deliveryType !== 'shared') fail('openai: nested shared-plan filter changed unexpectedly');
}

if (!process.exitCode) {
  console.log(`[provider-sources] ${Object.keys(registry.providers).length} provider evidence record(s), ${controlIds.size} public catalog control(s) validated against ${catalog.length} raw catalog records`);
  for (const item of enforcedMatches) {
    const rows = item.rows.map((row) => `${row.id ?? row.slug ?? 'unknown'}${row.tier ? `/${row.tier}` : ''}`).join(', ');
    console.log(`[provider-sources] ENFORCED ${item.providerKey}/${item.controlId}: rows=${item.rows.length} [${rows}]; nested-plans=${item.nestedPlanMatches}`);
  }
  console.log('[provider-sources] evidence-backed controls are scoped, live against the catalog, and unknown authorization remains fail-closed');
}
