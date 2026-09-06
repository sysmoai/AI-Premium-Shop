#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const evidence = JSON.parse(fs.readFileSync(path.join(APP, "data/tier-a-money-page-v2.json"), "utf8"));
const projection = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = Array.isArray(projection) ? projection : projection.products ?? [];
const failures = [];
const fail = (message) => failures.push(message);
const BLOCKED = [
  "30-day warranty", "30 day warranty", "replacement guarantee", "instant delivery", "instant access",
  "5-15 min", "5–15 min", "5-30 min", "5–30 min", "authorized reseller", "official reseller",
  "official distributor", "exclusive promotional rate", "lifetime support", "guaranteed activation", "guaranteed delivery",
];

const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const money = (value) => `BDT ${Number(value).toLocaleString("en-BD")}`;

function read(slug) {
  const file = path.join(DIST, slug, "index.html");
  if (!fs.existsSync(file)) { fail(`${slug}: built artifact missing`); return ""; }
  return fs.readFileSync(file, "utf8");
}

function exactDescription(slug, html, expected) {
  const matches = [...html.matchAll(/<meta\s+name="description"\s+content="([^"]*)"\s*\/>/gi)];
  if (matches.length !== 1) { fail(`${slug}: expected exactly one meta[name=description], found ${matches.length}`); return; }
  if (matches[0][1] !== esc(expected)) fail(`${slug}: meta description differs from evidence; got=${matches[0][1]}`);
}

function auditCommon(slug, html) {
  const route = evidence.routes[slug];
  const lower = html.toLowerCase();
  if (!html.includes(`<title>${esc(route.title)}</title>`)) fail(`${slug}: final title drift`);
  exactDescription(slug, html, route.description);
  if (!html.includes(`rel="canonical" href="https://aipremiumshop.com${route.path}"`)) fail(`${slug}: canonical drift`);
  if (!html.includes(`<h1>${esc(route.h1)}</h1>`)) fail(`${slug}: H1 drift`);
  if (!lower.includes("first-party sources reviewed")) fail(`${slug}: source section missing`);
  if (!lower.includes("evidence reviewed 2026-09-07")) fail(`${slug}: reviewed date missing`);
  if (!/BDT\s+[0-9,]+\/month/.test(html)) fail(`${slug}: governed local BDT listing missing`);
  if (/"@type"\s*:\s*"(Offer|Product|AggregateRating|FAQPage)"/i.test(html)) fail(`${slug}: unsupported commerce/review/FAQ schema present`);
  for (const phrase of BLOCKED) if (lower.includes(phrase.toLowerCase())) fail(`${slug}: blocked phrase ${phrase}`);
}

const claude = read("claude-pro-bangladesh");
auditCommon("claude-pro-bangladesh", claude);
const claudeRows = products.filter((p) => p?.slug === "claude-pro-bangladesh");
const claudePersonal = claudeRows.find((p) => String(p?.tier ?? "").toLowerCase() === "personal");
if (!claudePersonal?.price || !claude.includes(`${money(claudePersonal.price)}/month`)) fail("Claude: current Personal catalog price missing");
if (!claude.includes("$20/month or $200/year")) fail("Claude: Anthropic Pro provider reference missing");
if (!claude.includes("$100/month for Max 5x or $200/month for Max 20x")) fail("Claude: Max provider reference missing");
if (!claude.toLowerCase().includes("anthropic consumer terms")) fail("Claude: Consumer Terms source missing");
if (claudeRows.some((p) => p?.accessType === "shared")) fail("Claude: shared Anthropic record survived public projection");
if (claude.includes("Shared access") || claude.includes("Premium Shared") || claude.includes("Starter Shared")) fail("Claude: blocked shared-access commerce leaked into final artifact");
if (!claude.toLowerCase().includes("shared anthropic account rows are not published")) fail("Claude: provider-governance safety explanation missing");

const google = read("gemini-advanced-bangladesh");
auditCommon("gemini-advanced-bangladesh", google);
const googleRows = products.filter((p) => p?.slug === "gemini-advanced-bangladesh");
const googlePersonal = googleRows.find((p) => String(p?.tier ?? "").toLowerCase() === "personal");
const googleShared = googleRows.find((p) => p?.accessType === "shared");
if (!googlePersonal?.price || !google.includes(`${money(googlePersonal.price)}/month`)) fail("Google AI Pro: Personal catalog price missing");
if (!google.includes("$19.99/month on the current Google One plan page")) fail("Google AI Pro: provider price reference missing");
if (!google.toLowerCase().includes("google ai pro price in bangladesh")) fail("Google AI Pro: current naming missing");
if (!google.toLowerCase().includes("legacy gemini advanced")) fail("Google AI Pro: legacy query continuity explanation missing");
if (googleShared) {
  if (!google.includes(`${money(googleShared.price)}/month`)) fail("Google AI Pro: governed Shared catalog price missing");
  if (!google.includes("Shared access")) fail("Google AI Pro: current governed Shared access label missing");
  const lower = google.toLowerCase();
  if (!lower.includes("do not assume") || !lower.includes("google family sharing") || !lower.includes("provider-authorized resale")) fail("Google AI Pro: Shared/family non-equivalence warning missing");
}
if (!google.toLowerCase().includes("compute-based")) fail("Google AI Pro: compute-based usage-limit caveat missing");
if (!google.toLowerCase().includes("select ai benefits")) fail("Google AI Pro: selective family-benefit caveat missing");

if (failures.length) {
  console.error(`[tier-a-money-audit] FAIL (${failures.length})`);
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}
console.log("[tier-a-money-audit] PASS: Claude Pro and Google AI Pro artifacts are canonical, evidence-rich, price-dynamic, schema-safe, and provider-governance aligned");
