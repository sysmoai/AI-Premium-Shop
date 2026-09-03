#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const REGISTRY_PATH = join(REPO, "ops/seo/legacy-url-registry-2026-09-04.json");
const VERCEL_PATH = join(APP, "vercel.json");

function fail(message) {
  console.error(`[legacy-url-registry] FAIL: ${message}`);
  process.exitCode = 1;
}

function normalizePath(value) {
  if (typeof value !== "string" || !value.startsWith("/")) return value;
  if (value === "/") return value;
  return value.replace(/\/+$/, "");
}

const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
const vercel = JSON.parse(readFileSync(VERCEL_PATH, "utf8"));
const records = Array.isArray(registry.records) ? registry.records : [];
const redirects = Array.isArray(vercel.redirects) ? vercel.redirects : [];

const redirectBySource = new Map();
for (const redirect of redirects) {
  const source = normalizePath(redirect.source);
  if (!source) {
    fail(`redirect without a valid source: ${JSON.stringify(redirect)}`);
    continue;
  }
  if (redirectBySource.has(source)) {
    fail(`duplicate Vercel redirect source ${source}`);
    continue;
  }
  redirectBySource.set(source, redirect);
}

const registrySources = new Set();
let exactCount = 0;
let goneCount = 0;
let reviewCount = 0;

for (const record of records) {
  const source = normalizePath(record.source_path);
  const destination = normalizePath(record.destination);

  if (!source) {
    fail(`registry record has invalid source_path: ${JSON.stringify(record)}`);
    continue;
  }
  if (registrySources.has(source)) {
    fail(`duplicate registry source ${source}`);
    continue;
  }
  registrySources.add(source);

  if (record.classification === "REDIRECT_EXACT") {
    exactCount += 1;
    if (!destination || destination === source) {
      fail(`${source} must have a distinct destination for REDIRECT_EXACT`);
      continue;
    }
    const redirect = redirectBySource.get(source);
    if (!redirect) {
      fail(`${source} is REDIRECT_EXACT but has no Vercel redirect`);
      continue;
    }
    if (normalizePath(redirect.destination) !== destination) {
      fail(`${source} redirect destination ${redirect.destination} does not match registry ${record.destination}`);
    }
    if (redirect.permanent !== true) {
      fail(`${source} is REDIRECT_EXACT but Vercel permanent is not true`);
    }
    if (redirectBySource.has(destination)) {
      fail(`${source} redirects to ${destination}, which is itself a redirect source; redirect chains are not allowed for REDIRECT_EXACT`);
    }
    continue;
  }

  if (record.classification === "GONE_404") {
    goneCount += 1;
    if (redirectBySource.has(source)) {
      fail(`${source} is GONE_404 but is configured as a Vercel redirect`);
    }
    continue;
  }

  if (record.classification === "REVIEW_NON_EQUIVALENT") {
    reviewCount += 1;
    const redirect = redirectBySource.get(source);
    if (redirect) {
      if (destination && normalizePath(redirect.destination) !== destination) {
        fail(`${source} review redirect drifted from registry destination ${record.destination}`);
      }
      if (typeof record.current_redirect_permanent === "boolean" && redirect.permanent !== record.current_redirect_permanent) {
        fail(`${source} review redirect permanence drifted from registry`);
      }
    }
    continue;
  }

  if (record.classification === "KEEP_CANONICAL") {
    if (redirectBySource.has(source)) {
      fail(`${source} is KEEP_CANONICAL but is configured as a redirect source`);
    }
    continue;
  }

  fail(`${source} has unknown classification ${record.classification}`);
}

if (process.exitCode) process.exit(process.exitCode);
console.log(`[legacy-url-registry] PASS: ${records.length} records (${exactCount} exact redirects, ${goneCount} gone, ${reviewCount} review) match Vercel routing policy`);
