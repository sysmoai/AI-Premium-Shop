#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const defaultConfig = join(REPO, "ops/seo/indexnow-change-set-2026-09-04.json");
const configPath = process.argv[2] ? resolve(REPO, process.argv[2]) : defaultConfig;
const dryRun = process.argv.includes("--dry-run");

function die(message) {
  console.error(`[indexnow] FAIL: ${message}`);
  process.exit(1);
}

const config = JSON.parse(readFileSync(configPath, "utf8"));
const host = String(config.host || "").toLowerCase();
const keyFile = String(config.key_file || "");
const endpoint = String(config.endpoint || "");
const urls = Array.isArray(config.urls) ? config.urls : [];
const keyPath = join(APP, "public", keyFile);
const key = readFileSync(keyPath, "utf8").trim();
const keyLocation = `https://${host}/${keyFile}`;

if (host !== "aipremiumshop.com") die(`unexpected host ${host}`);
if (endpoint !== "https://api.indexnow.org/indexnow") die(`unexpected endpoint ${endpoint}`);
if (`${key}.txt` !== keyFile) die(`public key filename/content mismatch`);
if (!urls.length) die(`change set has no URLs`);

for (const value of urls) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.hostname !== host || url.search || url.hash) {
    die(`invalid same-host clean URL ${value}`);
  }
}

if (dryRun) {
  console.log(`[indexnow] DRY RUN: ${urls.length} explicit changed URLs; keyLocation=${keyLocation}`);
  process.exit(0);
}

const expectedSha = process.env.GITHUB_SHA || process.env.AIPS_EXPECTED_PRODUCTION_SHA || "";
if (!expectedSha) die(`expected production SHA is required via GITHUB_SHA or AIPS_EXPECTED_PRODUCTION_SHA`);

const identityResponse = await fetch(`https://${host}/.well-known/aips-build.json`, {
  headers: { "user-agent": "AIPS-IndexNow/1.0" },
  redirect: "follow"
});
if (!identityResponse.ok) die(`production build identity returned HTTP ${identityResponse.status}`);
const identity = await identityResponse.json();
if (identity.git_sha !== expectedSha) {
  die(`production SHA ${identity.git_sha || "unknown"} does not match expected ${expectedSha}`);
}
if (identity.publication?.publication_allowed !== true || identity.publication?.commercial_quarantine === true) {
  die(`production publication state is not eligible for IndexNow submission`);
}

const keyResponse = await fetch(keyLocation, {
  headers: { "user-agent": "AIPS-IndexNow/1.0" },
  redirect: "follow"
});
if (!keyResponse.ok) die(`public IndexNow key returned HTTP ${keyResponse.status}`);
const servedKey = (await keyResponse.text()).trim();
if (servedKey !== key) die(`served IndexNow key does not match repository key`);

const payload = { host, key, keyLocation, urlList: urls };
const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "content-type": "application/json; charset=utf-8",
    "user-agent": "AIPS-IndexNow/1.0"
  },
  body: JSON.stringify(payload)
});
const responseText = (await response.text()).trim();
if (![200, 202].includes(response.status)) {
  die(`IndexNow returned HTTP ${response.status}${responseText ? `: ${responseText.slice(0, 500)}` : ""}`);
}

console.log(`[indexnow] ACCEPTED: HTTP ${response.status}; submitted ${urls.length} explicit changed URLs for ${host}; production=${expectedSha}`);
console.log(`[indexnow] Acceptance is a notification acknowledgement, not a crawl/index/ranking guarantee.`);
