#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(readFileSync(join(APP, "vercel.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(`[vercel-config-test] ${message}`);
}

assert(config.ignoreCommand === "node scripts/vercel-ignore-build.mjs", "ignoreCommand must use the SSOT-safe change detector");
assert(config.installCommand === "pnpm install --frozen-lockfile", "Vercel installs must stay frozen-lockfile reproducible");
assert(config.outputDirectory === "dist/public", "Vercel output directory must remain dist/public");

const cspValues = [];
for (const rule of config.headers ?? []) {
  for (const header of rule.headers ?? []) {
    if (String(header.key).toLowerCase() === "content-security-policy") {
      cspValues.push(String(header.value));
    }
  }
}

assert(cspValues.length > 0, "at least one Content-Security-Policy header is required");
for (const value of cspValues) {
  assert(/(?:^|;\s*)media-src\s+'self'\s+https:\/\/media\.aipremiumshop\.com(?:\s|;|$)/.test(value), "every CSP must allow only the canonical R2 media origin for cross-origin audio/video");
  assert(!/(?:^|;\s*)media-src[^;]*\shttps:\s*(?:;|$)/.test(value), "media-src must not allow arbitrary HTTPS origins");
}

console.log(`[vercel-config-test] PASS: ${cspValues.length} CSP rules allow canonical R2 media; install and ignored-build invariants are locked`);
