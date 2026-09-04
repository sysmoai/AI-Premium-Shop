#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(APP, "../..");
const DATA_PATH = path.join(APP, "data/chatgpt-money-page-v2.json");
const OWNERSHIP_PATH = path.join(REPO, "ops/seo/keyword-ownership-2026-09-03.json");
const COMMERCIAL_PATH = path.join(REPO, "ops/ssot/commercial.json");
const PROVIDER_PATH = path.join(REPO, "ops/ssot/provider-sources.json");

const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
const ownership = JSON.parse(fs.readFileSync(OWNERSHIP_PATH, "utf8"));
const commercial = JSON.parse(fs.readFileSync(COMMERCIAL_PATH, "utf8"));
const providers = JSON.parse(fs.readFileSync(PROVIDER_PATH, "utf8"));

const EXPECTED_ROUTES = new Map([
  ["chatgpt-plus-bangladesh", "/chatgpt-plus-bangladesh"],
  ["chatgpt-plans-bangladesh", "/chatgpt-plans-bangladesh"],
]);
const ALLOWED_SOURCE_HOSTS = new Set(["help.openai.com", "chatgpt.com"]);
const BLOCKED = [
  "30-day warranty", "30 day warranty", "replacement guarantee", "money-back guarantee",
  "instant delivery", "instant access", "5-15 min", "5–15 min", "5-30 min", "5–30 min",
  "trusted by", "best seller", "bestseller", "authorized reseller", "official reseller",
  "official distributor", "exclusive promotional rate", "no international card", "no intl card",
  "lifetime support", "guaranteed delivery", "guaranteed activation", "full feature access",
];

function fail(message) {
  console.error(`[chatgpt-money-pages] FAIL: ${message}`);
  process.exitCode = 1;
}

function asDate(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ""))) {
    fail(`${label} must be YYYY-MM-DD`);
    return null;
  }
  const d = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) {
    fail(`${label} is invalid`);
    return null;
  }
  const today = new Date();
  const todayUtc = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  if (d > todayUtc) fail(`${label} cannot be in the future`);
  return d;
}

function deepStrings(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => deepStrings(item, out));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => deepStrings(item, out));
  return out;
}

if (data.schema_version !== 1) fail(`unsupported schema_version ${data.schema_version}`);
asDate(data.reviewed_at, "reviewed_at");

const routeEntries = Object.entries(data.routes ?? {});
if (routeEntries.length !== EXPECTED_ROUTES.size) fail(`expected exactly ${EXPECTED_ROUTES.size} governed routes, found ${routeEntries.length}`);

const owners = new Map((ownership.owners ?? []).map((owner) => [owner.primary_url, owner]));
for (const [slug, expectedPath] of EXPECTED_ROUTES) {
  const route = data.routes?.[slug];
  if (!route) {
    fail(`missing route ${slug}`);
    continue;
  }
  if (route.path !== expectedPath) fail(`${slug} path must be ${expectedPath}`);
  if (!owners.has(expectedPath)) fail(`${slug} is not a primary keyword owner in ${path.basename(OWNERSHIP_PATH)}`);
  if (String(route.title ?? "").length > 68) fail(`${slug} title exceeds 68 characters`);
  if (String(route.description ?? "").length > 158) fail(`${slug} description exceeds 158 characters`);
  if (!String(route.h1 ?? "").trim()) fail(`${slug} h1 is required`);
}

const plansOwner = owners.get("/chatgpt-plans-bangladesh");
if (plansOwner?.must_not_replace !== "/chatgpt-plus-bangladesh") {
  fail(`ChatGPT plan-family owner must protect /chatgpt-plus-bangladesh via must_not_replace`);
}

const approvedPayment = commercial.public_claim_policy?.payment?.approved_public_methods ?? [];
const configuredPayment = data.local_payment?.methods ?? [];
if (JSON.stringify(configuredPayment) !== JSON.stringify(approvedPayment)) {
  fail(`local payment methods must exactly match commercial SSOT (${approvedPayment.join(", ")})`);
}
if (!/not a claim about payment methods accepted directly by OpenAI/i.test(String(data.local_payment?.rule ?? ""))) {
  fail(`local payment rule must distinguish AI Premium Shop payment references from OpenAI payment methods`);
}

const sourceIds = new Set();
for (const source of data.sources ?? []) {
  if (!source.id || sourceIds.has(source.id)) fail(`source id is missing or duplicated: ${source.id}`);
  sourceIds.add(source.id);
  let url;
  try {
    url = new URL(source.url);
  } catch {
    fail(`invalid source URL ${source.url}`);
    continue;
  }
  if (url.protocol !== "https:" || !ALLOWED_SOURCE_HOSTS.has(url.hostname)) {
    fail(`source ${source.id} must use HTTPS on a first-party OpenAI/ChatGPT host`);
  }
  asDate(source.checked_at, `source ${source.id} checked_at`);
}

for (const [slug, route] of routeEntries) {
  for (const id of route.source_ids ?? []) {
    if (!sourceIds.has(id)) fail(`${slug} references unknown source ${id}`);
  }
}
for (const [key, fact] of Object.entries(data.provider_facts ?? {})) {
  if (!sourceIds.has(fact.source_id)) fail(`provider fact ${key} references unknown source ${fact.source_id}`);
}

const openaiProvider = providers.providers?.openai;
const governedUrls = new Set((openaiProvider?.sources ?? []).map((source) => source.url));
const plusSource = (data.sources ?? []).find((source) => source.id === "openai-plus")?.url;
const sharingSource = (data.sources ?? []).find((source) => source.id === "openai-account-sharing")?.url;
if (!governedUrls.has(plusSource)) fail(`Plus source must be anchored in current OpenAI provider governance`);
if (!governedUrls.has(sharingSource)) fail(`account-sharing source must be anchored in current OpenAI provider governance`);
if (openaiProvider?.commerce_implication?.shared_access_publication_block_enforced !== true) {
  fail(`OpenAI shared-access publication control must remain enforced before ChatGPT money pages can publish`);
}

const serialized = JSON.stringify(data).toLowerCase();
for (const phrase of BLOCKED) {
  if (serialized.includes(phrase.toLowerCase())) fail(`evidence contains blocked commercial phrase: ${phrase}`);
}
if (/\bBDT\s*\d|৳\s*\d/i.test(JSON.stringify(data))) fail(`AIPS BDT prices must come from the governed public catalog, not the editorial evidence file`);
if (/"(?:aips_)?price(?:_bdt)?"\s*:/i.test(JSON.stringify(data))) fail(`editorial evidence must not define an AIPS local price field`);

if (process.exitCode) process.exit(process.exitCode);
console.log(`[chatgpt-money-pages] PASS: ${routeEntries.length} owned routes, ${sourceIds.size} first-party sources, payment methods match commercial SSOT, OpenAI shared-access block remains enforced`);
