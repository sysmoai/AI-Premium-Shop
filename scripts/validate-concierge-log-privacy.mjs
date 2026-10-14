#!/usr/bin/env node
// Prevent the active Worker and the legacy handler from logging raw customer
// question content or client-supplied session IDs to operational console logs.
// This is a focused regression guard, not a full privacy/security audit.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const files = [
  "functions/api/concierge.js",
  "artifacts/aips-landing/api/concierge.js",
];
const unsafe = [
  { pattern: /\bq\s*:\s*lastQuestion\b/, label: "raw customer question" },
  { pattern: /\bsession\s*:\s*sessionId\b/, label: "client session identifier" },
  { pattern: /console\.(?:log|warn|error)\s*\([^\n]*\b(?:q|question|rawQuestion|session)\s*:/, label: "raw question/session field in console log" },
];
let problems = [];
for (const path of files) {
  const source = readFileSync(resolve(path), "utf8");
  for (const {pattern, label} of unsafe) {
    if (pattern.test(source)) problems.push(`${path}: unsafe ${label} logging found`);
  }
}
if (problems.length) {
  for (const p of problems) console.error("[concierge-log-privacy] " + p);
  process.exit(1);
}
console.log("[concierge-log-privacy] PASS: both handlers use metadata-only customer message logs");
