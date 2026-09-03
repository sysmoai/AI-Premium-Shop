#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const OWNERSHIP_PATH = join(REPO, "ops/seo/keyword-ownership-2026-09-03.json");
const LEGACY_PATH = join(REPO, "ops/seo/legacy-url-registry-2026-09-04.json");
const SITEMAP_PATH = join(APP, "dist/public/sitemap.xml");
const VERCEL_PATH = join(APP, "vercel.json");
const ORIGIN = "https://aipremiumshop.com";

function normalizePath(value) {
  if (typeof value !== "string") return value;
  let path = value;
  if (path.startsWith(ORIGIN)) path = path.slice(ORIGIN.length) || "/";
  if (!path.startsWith("/")) return path;
  if (path !== "/") path = path.replace(/\/+$/, "");
  return path;
}

function fail(message) {
  console.error(`[keyword-ownership] FAIL: ${message}`);
  process.exitCode = 1;
}

const ownership = JSON.parse(readFileSync(OWNERSHIP_PATH, "utf8"));
const legacy = JSON.parse(readFileSync(LEGACY_PATH, "utf8"));
const vercel = JSON.parse(readFileSync(VERCEL_PATH, "utf8"));
const sitemapXml = readFileSync(SITEMAP_PATH, "utf8");

const sitemapPaths = new Set(
  [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => normalizePath(match[1]))
);
const redirectSources = new Set((vercel.redirects || []).map((redirect) => normalizePath(redirect.source)));
const owners = Array.isArray(ownership.owners) ? ownership.owners : [];
const ownerPaths = new Set();

for (const owner of owners) {
  const primary = normalizePath(owner.primary_url);
  if (!primary || !primary.startsWith("/")) {
    fail(`${owner.entity || "unknown owner"} has invalid primary_url ${owner.primary_url}`);
    continue;
  }
  if (ownerPaths.has(primary)) fail(`duplicate primary owner URL ${primary}`);
  ownerPaths.add(primary);
  if (!sitemapPaths.has(primary)) fail(`${owner.entity} primary URL ${primary} is missing from final deployed sitemap`);
  if (redirectSources.has(primary)) fail(`${owner.entity} primary URL ${primary} is also a redirect source`);

  if (owner.must_not_replace) {
    const protectedSibling = normalizePath(owner.must_not_replace);
    if (!sitemapPaths.has(protectedSibling)) {
      fail(`${owner.entity} must_not_replace URL ${protectedSibling} is missing from final deployed sitemap`);
    }
    if (protectedSibling === primary) fail(`${owner.entity} primary_url and must_not_replace resolve to the same URL`);
  }
}

let exactLegacyCount = 0;
for (const record of legacy.records || []) {
  if (record.classification !== "REDIRECT_EXACT") continue;
  exactLegacyCount += 1;
  const source = normalizePath(record.source_path);
  const destination = normalizePath(record.destination);
  if (sitemapPaths.has(source)) fail(`legacy exact redirect source ${source} leaked into final sitemap`);
  if (!sitemapPaths.has(destination)) fail(`legacy exact redirect destination ${destination} is missing from final sitemap`);
}

if (process.exitCode) process.exit(process.exitCode);
const tierA = owners.filter((owner) => owner.tier_a === true).length;
console.log(`[keyword-ownership] PASS: ${owners.length} owned intent URLs (${tierA} Tier-A) are canonical/indexable; ${exactLegacyCount} exact legacy sources stay out of sitemap`);
