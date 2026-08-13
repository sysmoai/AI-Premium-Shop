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
let homepage;

try {
  site = readJson('ops/ssot/site.json');
  commercial = readJson('ops/ssot/commercial.json');
  policy = readJson('ops/ssot/autonomy-policy.json');
  homepage = readJson('ops/ssot/homepage.json');
} catch (error) {
  fail(`cannot read required SSOT JSON: ${error.message}`);
  process.exit();
}

if (site?.authority?.business_ssot !== 'git') fail('site.authority.business_ssot must be git');
if (site?.authority?.notion_is_authority !== false) fail('Notion must not be authority');
if (site?.authority?.chatgpt_is_operator !== true) fail('ChatGPT operator flag must be true');
if (site?.identity?.canonical_repository !== 'sysmoai/AI-Premium-Shop') fail('canonical repository mismatch');
if (site?.identity?.domain !== 'aipremiumshop.com') fail('canonical domain mismatch');

const quarantine = site?.current_publication_state?.commerce_quarantine;
if (quarantine !== commercial?.quarantine) fail('site/commercial quarantine flags disagree');
if (quarantine === true && commercial?.publication_allowed !== false) fail('commerce cannot be publishable while quarantine is active');
if (quarantine === true && site?.current_publication_state?.public_indexing !== 'noindex,nofollow') {
  fail('quarantine requires noindex,nofollow publication state');
}

if (policy?.failure_behavior !== 'fail_closed') fail('autonomy policy must fail closed');
if (policy?.protected_fact_behavior !== 'do_not_guess_or_publish_when_unknown') fail('protected facts must not be inferred');
if (!Array.isArray(policy?.release_model?.protected) || policy.release_model.protected.length === 0) fail('protected fact list is required');

const allowedHomepageStatuses = new Set(['DRAFT', 'APPROVED', 'SUSPENDED', 'RETIRED']);
const dateOnly = /^\d{4}-\d{2}-\d{2}$/;
const nonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;

if (homepage?.schema_version !== 1) fail('homepage.schema_version must be 1');
if (!nonEmpty(homepage?.updated_at) || Number.isNaN(Date.parse(homepage.updated_at))) fail('homepage.updated_at must be a valid ISO timestamp');
if (!Array.isArray(homepage?.editorial_spotlights)) fail('homepage.editorial_spotlights must be an array');
if (!Array.isArray(homepage?.campaigns)) fail('homepage.campaigns must be an array');

const seenHomepageIds = new Set();
for (const item of homepage?.editorial_spotlights ?? []) {
  if (!nonEmpty(item?.id)) {
    fail('homepage editorial spotlight id is required');
    continue;
  }
  if (seenHomepageIds.has(item.id)) fail(`duplicate homepage content id: ${item.id}`);
  seenHomepageIds.add(item.id);
  if (!allowedHomepageStatuses.has(item.status)) fail(`${item.id}: unsupported editorial status ${item.status}`);
  if (item.status !== 'APPROVED') continue;
  if (!nonEmpty(item.revision)) fail(`${item.id}: approved editorial requires revision`);
  if (!dateOnly.test(String(item.as_of ?? '')) || Number.isNaN(Date.parse(`${item.as_of}T00:00:00Z`))) fail(`${item.id}: approved editorial requires valid as_of`);
  if (!dateOnly.test(String(item.review_after ?? '')) || Number.isNaN(Date.parse(`${item.review_after}T00:00:00Z`))) fail(`${item.id}: approved editorial requires valid review_after`);
  if (dateOnly.test(String(item.as_of ?? '')) && dateOnly.test(String(item.review_after ?? '')) && item.review_after < item.as_of) fail(`${item.id}: review_after cannot precede as_of`);
  for (const field of ['eyebrow', 'title', 'summary', 'cta_label', 'href', 'source_kind']) {
    if (!nonEmpty(item[field])) fail(`${item.id}: approved editorial requires ${field}`);
  }
  if (!String(item.href ?? '').startsWith('/') || String(item.href ?? '').startsWith('//')) fail(`${item.id}: editorial href must be root-relative`);
  if (!Array.isArray(item.source_refs) || item.source_refs.length === 0 || item.source_refs.some((ref) => !nonEmpty(ref))) fail(`${item.id}: approved editorial requires source_refs`);
}

for (const item of homepage?.campaigns ?? []) {
  if (!nonEmpty(item?.id)) {
    fail('homepage campaign id is required');
    continue;
  }
  if (seenHomepageIds.has(item.id)) fail(`duplicate homepage content id: ${item.id}`);
  seenHomepageIds.add(item.id);
  if (!allowedHomepageStatuses.has(item.status)) fail(`${item.id}: unsupported campaign status ${item.status}`);
  if (item.status !== 'APPROVED') continue;
  for (const field of ['revision', 'starts_at', 'ends_at', 'eyebrow', 'headline', 'body', 'cta_label', 'href']) {
    if (!nonEmpty(item[field])) fail(`${item.id}: approved campaign requires ${field}`);
  }
  const startsAt = Date.parse(item.starts_at);
  const endsAt = Date.parse(item.ends_at);
  if (Number.isNaN(startsAt) || Number.isNaN(endsAt) || endsAt <= startsAt) fail(`${item.id}: approved campaign requires a valid finite starts_at/ends_at window`);
  if (!String(item.href ?? '').startsWith('/') || String(item.href ?? '').startsWith('//')) fail(`${item.id}: campaign href must be root-relative`);
  if (!Array.isArray(item.offer_ids) || item.offer_ids.length === 0 || item.offer_ids.some((offerId) => !nonEmpty(offerId))) fail(`${item.id}: approved campaign requires one or more governed offer_ids`);
}

if (!process.exitCode) console.log('[ssot] canonical GitHub authority, homepage governance, and fail-closed invariants verified');
