#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const CHANGE_SET_PATH = join(REPO, "ops/seo/indexnow-change-set-2026-09-04.json");
const LEGACY_PATH = join(REPO, "ops/seo/legacy-url-registry-2026-09-04.json");
const VERCEL_PATH = join(APP, "vercel.json");

function fail(message) {
  console.error(`[indexnow-config] FAIL: ${message}`);
  process.exitCode = 1;
}

const config = JSON.parse(readFileSync(CHANGE_SET_PATH, "utf8"));
const legacy = JSON.parse(readFileSync(LEGACY_PATH, "utf8"));
const vercel = JSON.parse(readFileSync(VERCEL_PATH, "utf8"));
const host = String(config.host || "").toLowerCase();
const keyFile = String(config.key_file || "");
const urls = Array.isArray(config.urls) ? config.urls : [];

if (host !== "aipremiumshop.com") fail(`unexpected host ${host}`);
if (!/^https:\/\/api\.indexnow\.org\/indexnow$/.test(String(config.endpoint || ""))) {
  fail(`unexpected endpoint ${config.endpoint}`);
}
if (!/^[A-Za-z0-9-]{8,128}\.txt$/.test(keyFile)) fail(`invalid key_file ${keyFile}`);

const keyPath = join(APP, "public", keyFile);
let key = "";
try {
  key = readFileSync(keyPath, "utf8").trim();
} catch {
  fail(`missing public key file ${keyFile}`);
}
if (key && `${key}.txt` !== keyFile) fail(`key filename must exactly match key content`);
if (key && !/^[A-Za-z0-9-]{8,128}$/.test(key)) fail(`invalid key content format`);

if (urls.length === 0) fail(`change set contains no URLs`);
if (urls.length > 10000) fail(`change set exceeds IndexNow 10,000 URL protocol limit`);
if (new Set(urls).size !== urls.length) fail(`change set contains duplicate URLs`);

const exactBySource = new Map(
  (legacy.records || [])
    .filter((record) => record.classification === "REDIRECT_EXACT")
    .map((record) => [record.source_path.replace(/\/+$/, ""), record])
);
const redirects = new Map(
  (vercel.redirects || []).map((redirect) => [redirect.source.replace(/\/+$/, ""), redirect])
);

for (const value of urls) {
  let url;
  try {
    url = new URL(value);
  } catch {
    fail(`invalid URL ${value}`);
    continue;
  }
  if (url.protocol !== "https:" || url.hostname !== host || url.port || url.username || url.password || url.search || url.hash) {
    fail(`URL must be a clean HTTPS URL on ${host}: ${value}`);
    continue;
  }
  const path = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
  const legacyRecord = exactBySource.get(path);
  if (!legacyRecord) {
    fail(`${path} is not an evidence-backed REDIRECT_EXACT source in the legacy registry`);
    continue;
  }
  const redirect = redirects.get(path);
  if (!redirect || redirect.permanent !== true || redirect.destination !== legacyRecord.destination) {
    fail(`${path} does not match the exact permanent Vercel redirect in the legacy registry`);
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log(`[indexnow-config] PASS: ${urls.length} changed URLs are explicit, same-host, evidence-backed permanent redirect sources; no sitemap-wide submission is configured`);
