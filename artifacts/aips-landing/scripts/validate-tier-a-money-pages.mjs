#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEffectiveProviderEvidence, PROVIDER_AMENDMENT_SOURCE } from "../../../scripts/lib/provider-evidence.mjs";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(APP, "../..");
const evidence = JSON.parse(fs.readFileSync(path.join(APP, "data/tier-a-money-page-v2.json"), "utf8"));
const commercial = JSON.parse(fs.readFileSync(path.join(REPO, "ops/ssot/commercial.json"), "utf8"));
const ownership = JSON.parse(fs.readFileSync(path.join(REPO, "ops/seo/keyword-ownership-2026-09-03.json"), "utf8"));
const rawDoc = JSON.parse(fs.readFileSync(path.join(APP, "data/products.json"), "utf8"));
const raw = Array.isArray(rawDoc) ? rawDoc : rawDoc.products ?? [];
const providers = loadEffectiveProviderEvidence(REPO);
const failures = [];
const fail = (message) => failures.push(message);
const ROUTES = ["claude-pro-bangladesh", "gemini-advanced-bangladesh"];
const ALLOWED_HOSTS = new Set(["support.claude.com", "claude.com", "www.anthropic.com", "one.google.com", "support.google.com"]);
const todayDhaka = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

if (evidence?.schema_version !== 1) fail("tier-a money-page evidence schema_version must be 1");
if (!/^\d{4}-\d{2}-\d{2}$/.test(String(evidence?.reviewed_at ?? ""))) fail("reviewed_at must be YYYY-MM-DD");
if (String(evidence?.reviewed_at ?? "") > todayDhaka) fail(`reviewed_at ${evidence.reviewed_at} cannot be after current Dhaka date ${todayDhaka}`);
if (evidence?.authority?.provider_governance_amendment !== PROVIDER_AMENDMENT_SOURCE) fail("money-page evidence must point to the current provider amendment source");
if (/BDT\s*[0-9৳]|৳\s*[0-9]/i.test(JSON.stringify(evidence))) fail("editorial evidence must not hardcode local BDT prices");

const approvedPayments = commercial?.public_claim_policy?.payment?.approved_public_methods ?? [];
if (JSON.stringify(evidence?.local_payment?.methods ?? []) !== JSON.stringify(approvedPayments)) fail("money-page payment references must exactly match commercial SSOT");
if (commercial?.public_projection_policy?.provider_compliance_amendment_source !== PROVIDER_AMENDMENT_SOURCE) fail("commercial SSOT must govern the current provider evidence amendment");
if (commercial?.public_claim_policy?.access_model?.shared_provider_effective_enforced_block_provider_count !== 27) fail("commercial SSOT effective provider block count must be 27");

const sourceIds = new Set();
for (const source of evidence?.sources ?? []) {
  if (!source?.id || sourceIds.has(source.id)) fail(`duplicate or missing source id ${source?.id ?? "<missing>"}`);
  sourceIds.add(source?.id);
  let url;
  try { url = new URL(source.url); } catch { fail(`${source?.id ?? "unknown"}: source URL is invalid`); continue; }
  if (url.protocol !== "https:") fail(`${source.id}: source URL must use HTTPS`);
  if (!ALLOWED_HOSTS.has(url.hostname)) fail(`${source.id}: non-first-party source host ${url.hostname}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(source.checked_at ?? "")) || source.checked_at > todayDhaka) fail(`${source.id}: checked_at is invalid or future-dated`);
}

for (const slug of ROUTES) {
  const route = evidence?.routes?.[slug];
  if (!route) { fail(`${slug}: route evidence missing`); continue; }
  if (route.path !== `/${slug}`) fail(`${slug}: route path mismatch`);
  if (route.page_type !== "transactional") fail(`${slug}: must remain transactional`);
  if (route.suppress_generic_plan_grid !== true) fail(`${slug}: dedicated V2 must suppress the generic plan grid`);
  if (!route.title?.includes("AI Premium Shop")) fail(`${slug}: public title must use full brand name`);
  if (!Array.isArray(route.source_ids) || route.source_ids.length < 3) fail(`${slug}: route requires first-party evidence links`);
  for (const id of route.source_ids ?? []) if (!sourceIds.has(id)) fail(`${slug}: unknown source id ${id}`);
  const owner = (ownership?.owners ?? []).find((item) => item?.primary_url === `/${slug}`);
  if (!owner || owner?.tier_a !== true || owner?.priority !== "P0") fail(`${slug}: keyword ownership must remain P0 Tier-A on this exact canonical`);
  if (!raw.some((record) => record?.slug === slug)) fail(`${slug}: no raw catalog family exists`);
}

const anthropic = providers?.providers?.anthropic;
if (anthropic?.commerce_implication?.shared_access_publication_block_enforced !== true) fail("Anthropic shared-access block must be effective");
if (!(anthropic?.public_catalog_controls ?? []).some((control) => control?.status === "ENFORCED" && control?.match?.provider === "Anthropic" && control?.match?.accessType === "shared")) fail("Anthropic ENFORCED shared control is missing");
if (!(anthropic?.sources ?? []).some((source) => source?.url === "https://www.anthropic.com/legal/consumer-terms")) fail("Anthropic Consumer Terms source is missing from effective governance");

const google = providers?.providers?.google;
if (!google) fail("Google provider evidence missing");
if ((google?.public_catalog_controls ?? []).some((control) => control?.status === "ENFORCED" && control?.match?.accessType === "shared")) fail("Google shared access must not be auto-blocked without new scoped evidence");
if (google?.commerce_implication?.public_vendor_authorization_claim_allowed !== false) fail("Google vendor authorization must remain unevidenced");
const geminiText = JSON.stringify({ route: evidence?.routes?.["gemini-advanced-bangladesh"], facts: evidence?.provider_facts?.google }).toLowerCase();
if (!geminiText.includes("must not be assumed") || !geminiText.includes("provider-authorized")) fail("Google V2 evidence must preserve family-sharing non-equivalence warning");

for (const [providerKey, facts] of Object.entries(evidence?.provider_facts ?? {})) {
  const text = JSON.stringify(facts);
  if (/guaranteed|official reseller|authorized reseller|30[- ]day warranty|instant delivery/i.test(text)) fail(`${providerKey}: protected/unsupported claim leaked into evidence`);
}

if (failures.length) {
  console.error(`[tier-a-money-pages] FAIL (${failures.length})`);
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}
console.log(`[tier-a-money-pages] PASS: ${ROUTES.length} Tier-A canonical routes, ${sourceIds.size} first-party sources, Dhaka-reviewed=${evidence.reviewed_at}, Anthropic shared block effective, Google family-sharing equivalence not inferred`);
