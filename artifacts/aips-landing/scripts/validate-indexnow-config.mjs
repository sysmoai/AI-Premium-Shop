#!/usr/bin/env node
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const SEO_DIR = join(REPO, "ops/seo");
const LEGACY_PATH = join(SEO_DIR, "legacy-url-registry-2026-09-04.json");
const VERCEL_PATH = join(APP, "vercel.json");

function fail(message) {
  console.error(`[indexnow-config] FAIL: ${message}`);
  process.exitCode = 1;
}

const requestedPath = process.argv[2]
  ? resolve(REPO, process.argv[2])
  : null;
const changeSetPaths = requestedPath
  ? [requestedPath]
  : readdirSync(SEO_DIR)
      .filter((name) => /^indexnow-change-set-.*\.json$/.test(name))
      .sort()
      .map((name) => join(SEO_DIR, name));

if (!changeSetPaths.length) fail(`no IndexNow change-set files found`);

const legacy = JSON.parse(readFileSync(LEGACY_PATH, "utf8"));
const vercel = JSON.parse(readFileSync(VERCEL_PATH, "utf8"));
const exactBySource = new Map(
  (legacy.records || [])
    .filter((record) => record.classification === "REDIRECT_EXACT")
    .map((record) => [record.source_path.replace(/\/+$/, ""), record])
);
const redirects = new Map(
  (vercel.redirects || []).map((redirect) => [redirect.source.replace(/\/+$/, ""), redirect])
);

let totalUrls = 0;
for (const changeSetPath of changeSetPaths) {
  const label = relative(REPO, changeSetPath);
  let config;
  try {
    config = JSON.parse(readFileSync(changeSetPath, "utf8"));
  } catch (error) {
    fail(`${label} cannot be read/parsed: ${error.message}`);
    continue;
  }

  const host = String(config.host || "").toLowerCase();
  const keyFile = String(config.key_file || "");
  const urls = Array.isArray(config.urls) ? config.urls : [];

  if (host !== "aipremiumshop.com") fail(`${label}: unexpected host ${host}`);
  if (String(config.endpoint || "") !== "https://api.indexnow.org/indexnow") {
    fail(`${label}: unexpected endpoint ${config.endpoint}`);
  }
  if (!/^[A-Za-z0-9-]{8,128}\.txt$/.test(keyFile)) fail(`${label}: invalid key_file ${keyFile}`);

  const keyPath = join(APP, "public", keyFile);
  let key = "";
  try {
    key = readFileSync(keyPath, "utf8").trim();
  } catch {
    fail(`${label}: missing public key file ${keyFile}`);
  }
  if (key && `${key}.txt` !== keyFile) fail(`${label}: key filename must exactly match key content`);
  if (key && !/^[A-Za-z0-9-]{8,128}$/.test(key)) fail(`${label}: invalid key content format`);

  if (urls.length === 0) fail(`${label}: change set contains no URLs`);
  if (urls.length > 10000) fail(`${label}: change set exceeds IndexNow 10,000 URL protocol limit`);
  if (new Set(urls).size !== urls.length) fail(`${label}: change set contains duplicate URLs`);

  for (const value of urls) {
    let url;
    try {
      url = new URL(value);
    } catch {
      fail(`${label}: invalid URL ${value}`);
      continue;
    }
    if (url.protocol !== "https:" || url.hostname !== host || url.port || url.username || url.password || url.search || url.hash) {
      fail(`${label}: URL must be a clean HTTPS URL on ${host}: ${value}`);
      continue;
    }
    const path = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
    const legacyRecord = exactBySource.get(path);
    if (!legacyRecord) {
      fail(`${label}: ${path} is not an evidence-backed REDIRECT_EXACT source in the legacy registry`);
      continue;
    }
    const redirect = redirects.get(path);
    if (!redirect || redirect.permanent !== true || redirect.destination !== legacyRecord.destination) {
      fail(`${label}: ${path} does not match the exact permanent Vercel redirect in the legacy registry`);
    }
  }

  totalUrls += urls.length;
  console.log(`[indexnow-config] validated ${label}: ${urls.length} explicit changed URL(s)`);
}

if (process.exitCode) process.exit(process.exitCode);
console.log(`[indexnow-config] PASS: ${changeSetPaths.length} change set(s), ${totalUrls} explicit same-host evidence-backed changed URLs; no sitemap-wide submission is configured`);
