#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const evidence = JSON.parse(fs.readFileSync(path.join(APP, "data/chatgpt-money-page-v2.json"), "utf8"));
const BLOCKED = [
  "30-day warranty", "30 day warranty", "replacement guarantee", "instant delivery", "instant access",
  "5-15 min", "5–15 min", "5-30 min", "5–30 min", "authorized reseller", "official reseller",
  "official distributor", "exclusive promotional rate", "no international card", "no intl card",
  "lifetime support", "guaranteed activation", "guaranteed delivery", "gpt-5.4",
];

function fail(message) {
  console.error(`[chatgpt-money-audit] FAIL: ${message}`);
  process.exitCode = 1;
}

function read(slug) {
  const file = path.join(DIST, slug, "index.html");
  if (!fs.existsSync(file)) {
    fail(`${slug} built artifact is missing`);
    return "";
  }
  return fs.readFileSync(file, "utf8");
}

function auditCommon(slug, html) {
  const route = evidence.routes[slug];
  const lower = html.toLowerCase();
  if (!html.includes(`<title>${route.title}</title>`)) fail(`${slug} final title does not match V2 evidence`);
  if (!html.includes(`content="${route.description}"`)) fail(`${slug} final description does not match V2 evidence`);
  if (!html.includes(`rel="canonical" href="https://aipremiumshop.com${route.path}"`)) fail(`${slug} canonical drift`);
  if (!html.includes(`<h1>${route.h1}</h1>`)) fail(`${slug} H1 drift`);
  if (!lower.includes("first-party sources reviewed")) fail(`${slug} evidence section is missing`);
  if (!lower.includes("help.openai.com")) fail(`${slug} has no first-party OpenAI Help source link`);
  if (!lower.includes("evidence reviewed 2026-09-04")) fail(`${slug} reviewed date is missing`);
  if (lower.includes("shared access")) fail(`${slug} exposes an OpenAI Shared access catalog row`);
  if (/"@type"\s*:\s*"faqpage"/i.test(html)) fail(`${slug} contains FAQPage schema without a governed FAQ evidence layer`);
  for (const phrase of BLOCKED) if (lower.includes(phrase.toLowerCase())) fail(`${slug} contains blocked phrase: ${phrase}`);
}

const plus = read("chatgpt-plus-bangladesh");
auditCommon("chatgpt-plus-bangladesh", plus);
if (!plus.includes("$20/month")) fail(`Plus page missing OpenAI $20/month provider reference`);
if (!plus.includes("bKash") || !plus.includes("Nagad")) fail(`Plus page missing approved AI Premium Shop payment references`);
if (!plus.toLowerCase().includes("account is meant for the individual who created it")) fail(`Plus page missing account-sharing policy summary`);
if (!plus.includes("/chatgpt-plans-bangladesh")) fail(`Plus page does not link to the plan-family owner`);
if (!/BDT\s+[0-9,]+\/month/.test(plus)) fail(`Plus page missing governed local BDT listing`);

const plans = read("chatgpt-plans-bangladesh");
auditCommon("chatgpt-plans-bangladesh", plans);
for (const label of ["Go", "Plus", "Pro", "Business"]) {
  if (!plans.includes(`>${label}<`) && !plans.includes(`>${label}</a>`)) fail(`plan-family page missing ${label}`);
}
if (!plans.includes("$100 and $200 Pro tiers")) fail(`plan-family page missing current OpenAI Pro tier reference`);
if (!plans.toLowerCase().includes("at least two paid seats")) fail(`plan-family page missing current OpenAI Business minimum-seat reference`);
if (!plans.includes("/chatgpt-plus-bangladesh")) fail(`plan-family page does not link to exact Plus owner`);
if (!plans.includes("OpenAI reference") || !plans.includes("Current AI Premium Shop listing")) fail(`plan-family page does not separate provider and local seller references`);

if (plus === plans) fail(`Plus and plan-family artifacts are identical`);
if (process.exitCode) process.exit(process.exitCode);
console.log(`[chatgpt-money-audit] PASS: transactional Plus and broad plan-family artifacts are distinct, evidence-rich, canonical, and free of blocked OpenAI shared-access commerce`);
