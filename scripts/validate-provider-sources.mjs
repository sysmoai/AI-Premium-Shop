import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const fail = (message) => {
  console.error(`[provider-sources] ${message}`);
  process.exitCode = 1;
};

let registry;
try {
  registry = JSON.parse(fs.readFileSync(path.join(root, 'ops/ssot/provider-sources.json'), 'utf8'));
} catch (error) {
  fail(`cannot read ops/ssot/provider-sources.json: ${error.message}`);
  process.exit();
}

const nonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;

if (registry?.schema_version !== 1) fail('schema_version must be 1');
if (!nonEmpty(registry?.updated_at) || Number.isNaN(Date.parse(registry.updated_at))) fail('updated_at must be a valid ISO timestamp');
if (registry?.authority?.commercial_source_of_truth !== 'ops/ssot/commercial.json') fail('commercial authority must remain ops/ssot/commercial.json');
if (!nonEmpty(registry?.authority?.rule)) fail('authority.rule is required');
if (!registry?.providers || typeof registry.providers !== 'object' || Array.isArray(registry.providers)) fail('providers must be an object');

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
}

if (!process.exitCode) {
  console.log(`[provider-sources] ${Object.keys(registry.providers).length} provider evidence record(s) validated; unknown authorization remains fail-closed`);
}
