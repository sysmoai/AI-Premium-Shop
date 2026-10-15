#!/usr/bin/env node
// Focused, fail-closed sink allowlist, not a general JavaScript taint analysis.
// Changes to log fields/expressions require deliberate review here. Arbitrary
// exception text, objects, stacks, causes and provider codes are never approved.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const files = [
  "functions/api/concierge.js",
  "artifacts/aips-landing/api/concierge.js",
];
const fields = {
  concierge_credential_blocked: 'sessionProvided: sid !== ip',
  concierge_sse_failure: 'errorCategory: "transport", errorCode: "SSE_FAILURE"',
  concierge_model_fail: 'model, errorCategory: "provider", errorCode: "MODEL_FAILURE"',
  concierge_stream_break: 'model, errorCategory: "stream", errorCode: "STREAM_INTERRUPTED"',
  concierge_claude_fallback_fail: 'errorCategory: "provider", errorCode: "FALLBACK_FAILURE"',
  concierge_degenerate: 'model, questionLength: lastQuestion.length',
  concierge_prompt_leak_blocked: 'model, questionLength: lastQuestion.length',
  concierge_truth_claim_blocked: 'model, questionLength: lastQuestion.length',
  concierge_degenerate_midstream: 'model',
  concierge_prompt_leak_midstream: 'model',
  concierge_truth_claim_blocked_midstream: 'model, questionLength: lastQuestion.length',
  concierge_reply: 'model, ms: latencyMs, cards: products.length, truthBlocked, questionLength: lastQuestion.length',
  concierge_claude_fallback: 'ms: Date.now() - overallStart, cards: products.length, questionLength: lastQuestion.length',
  concierge_truth_claim_blocked_fallback: 'questionLength: lastQuestion.length',
  concierge_all_failed: 'questionLength: lastQuestion.length',
};
const normalize = (s) => s.replace(/\s+/g, '');
const approved = new Set(Object.entries(fields).map(([event, metadata]) => {
  const level = ['concierge_credential_blocked', 'concierge_reply', 'concierge_claude_fallback'].includes(event) ? 'log' : 'error';
  return normalize(`console.${level}(JSON.stringify({ event: "${event}", ${metadata} }));`);
}));

export function validateSource(source) {
  const problems = [];
  // Remove only reviewed, complete structured calls, including multiline calls.
  const remainder = source.replace(/console\s*\.\s*(?:log|error)\s*\(JSON\s*\.\s*stringify\s*\(\{[^;]*?\}\)\s*\)\s*;/g, (call) => {
    if (approved.has(normalize(call))) return '';
    return call;
  });
  // Also rejects bracket access, aliases/destructuring, other console methods,
  // raw object/string logging, extra arguments and unreviewed structured fields.
  if (/\bconsole\b/.test(remainder)) problems.push('unapproved console use (metadata-only allowlist required)');
  if (/\bq\s*:\s*lastQuestion\b|\bsession\s*:\s*sessionId\b/.test(source)) problems.push('raw question/session field');
  return problems;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const problems = files.flatMap((path) => validateSource(readFileSync(resolve(path), 'utf8')).map((p) => `${path}: ${p}`));
  for (const p of problems) console.error('[concierge-log-privacy] ' + p);
  if (problems.length) process.exitCode = 1;
  else console.log('[concierge-log-privacy] PASS: both handlers use reviewed metadata-only operational logs');
}
