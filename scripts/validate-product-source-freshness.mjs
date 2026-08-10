#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ledgerPath = path.resolve('ops/research/product-official-source-ledger-2026-08-10.json');
const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
const now = new Date();
const maxAgeDays = Number(ledger.freshness_rule_days ?? 30);
const checked = new Date(ledger.checked_at);
const ageDays = (now - checked) / 86400000;

const errors = [];
if (!ledger.business_unit || ledger.business_unit !== 'AIPS') errors.push('business_unit must be AIPS');
if (!Array.isArray(ledger.records) || ledger.records.length === 0) errors.push('records must not be empty');
if (!Number.isFinite(ageDays) || ageDays > maxAgeDays) errors.push(`ledger is stale: ${ageDays.toFixed(1)} days old; max ${maxAgeDays}`);

for (const [index, record] of (ledger.records ?? []).entries()) {
  const id = `${record.provider ?? 'unknown'} / ${record.product ?? index}`;
  if (!record.provider) errors.push(`${id}: missing provider`);
  if (!record.product) errors.push(`${id}: missing product`);
  if (!Array.isArray(record.official_sources) || record.official_sources.length === 0) errors.push(`${id}: missing official_sources`);
  for (const source of record.official_sources ?? []) {
    if (!/^https:\/\//.test(source)) errors.push(`${id}: non-https source ${source}`);
  }
  if (!Array.isArray(record.verified_facts) || record.verified_facts.length === 0) errors.push(`${id}: missing verified_facts`);
  if (!record.customer_problem) errors.push(`${id}: missing customer_problem`);
  if (!record.solution_summary) errors.push(`${id}: missing solution_summary`);
  if (!Array.isArray(record.best_fit) || record.best_fit.length === 0) errors.push(`${id}: missing best_fit`);
  if (!Array.isArray(record.limitations) || record.limitations.length === 0) errors.push(`${id}: missing limitations`);
  if (!record.recommended_public_action) errors.push(`${id}: missing recommended_public_action`);
}

if (errors.length) {
  console.error('[product-source-freshness] FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`[product-source-freshness] OK records=${ledger.records.length} checked_at=${ledger.checked_at} max_age_days=${maxAgeDays}`);
