import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const fail = (message) => {
  console.error(`[ssot] ${message}`);
  process.exitCode = 1;
};

let site;
let commercial;
let policy;

try {
  site = readJson('ops/ssot/site.json');
  commercial = readJson('ops/ssot/commercial.json');
  policy = readJson('ops/ssot/autonomy-policy.json');
} catch (error) {
  fail(`cannot read required SSOT JSON: ${error.message}`);
  process.exit();
}

if (site?.authority?.business_ssot !== 'git') fail('site.authority.business_ssot must be git');
if (site?.authority?.notion_is_authority !== false) fail('Notion must not be authority');
if (site?.authority?.chatgpt_is_operator !== true) fail('ChatGPT operator flag must be true');
if (site?.identity?.canonical_repository !== 'sysmoai/AI-Premium-Shop') fail('canonical repository mismatch');
if (site?.identity?.domain !== 'aipremiumshop.com') fail('canonical domain mismatch');

const state = site?.current_publication_state ?? {};
const quarantine = state.commerce_quarantine;
if (quarantine !== commercial?.quarantine) fail('site/commercial quarantine flags disagree');
if (quarantine === true && commercial?.publication_allowed !== false) fail('commerce cannot be publishable while quarantine is active');

// Commerce quarantine is narrower than a sitewide shutdown. Truth-safe
// informational pages may be indexable while commercial pages remain noindex
// and review-gated. A sitewide noindex is still valid, but selective indexing
// must explicitly declare the safe public route set and the commercial default.
if (quarantine === true) {
  if (state.public_indexing === 'noindex,nofollow') {
    // Fully fail-closed publication remains valid.
  } else if (state.public_indexing === 'selective') {
    if (state.informational_site_live !== true) fail('selective indexing requires informational_site_live=true');
    if (!Array.isArray(state.indexable_routes) || state.indexable_routes.length === 0) fail('selective indexing requires explicit indexable_routes');
    if (state.commercial_routes_default !== 'noindex,review-gated') fail('selective indexing requires commercial routes to default to noindex,review-gated');
    if (state.commerce_publish_allowed !== false) fail('selective indexing cannot enable commerce publication during quarantine');
  } else {
    fail('commerce quarantine requires either sitewide noindex,nofollow or an explicit selective publication state');
  }
}

if (policy?.failure_behavior !== 'fail_closed') fail('autonomy policy must fail closed');
if (policy?.protected_fact_behavior !== 'do_not_guess_or_publish_when_unknown') fail('protected facts must not be inferred');
if (!Array.isArray(policy?.release_model?.protected) || policy.release_model.protected.length === 0) fail('protected fact list is required');

if (!process.exitCode) console.log('[ssot] canonical GitHub authority and fail-closed commerce invariants verified');
