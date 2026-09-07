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
const escAttr = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

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
  const descriptionMatches = [...html.matchAll(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?\s*>/gi)];
  if (descriptionMatches.length !== 1) fail(`${slug} must contain exactly one name=description meta tag, found ${descriptionMatches.length}`);
  else if (descriptionMatches[0][1] !== escAttr(route.description)) fail(`${slug} name=description content drift: expected ${JSON.stringify(escAttr(route.description))}, got ${JSON.stringify(descriptionMatches[0][1])}`);
  if (!html.includes(`rel="canonical" href="https://aipremiumshop.com${route.path}"`)) fail(`${slug} canonical drift`);
  if (!html.includes(`<h1>${route.h1}</h1>`)) fail(`${slug} H1 drift`);
  if (!lower.includes("first-party sources reviewed")) fail(`${slug} evidence section is missing`);
  if (!lower.includes("help.openai.com")) fail(`${slug} has no first-party OpenAI Help source link`);
  if (!lower.includes(`evidence reviewed ${String(evidence.reviewed_at).toLowerCase()}`)) fail(`${slug} reviewed date is missing`);
  if (lower.includes("shared access")) fail(`${slug} exposes an OpenAI Shared access catalog row`);
  if (/"@type"\s*:\s*"faqpage"/i.test(html)) fail(`${slug} contains FAQPage schema without a governed FAQ evidence layer`);
  for (const phrase of BLOCKED) if (lower.includes(phrase.toLowerCase())) fail(`${slug} contains blocked phrase: ${phrase}`);
}

const go = read("chatgpt-go-bangladesh");
auditCommon("chatgpt-go-bangladesh", go);
if (!go.includes("bKash") || !go.includes("Nagad")) fail(`Go page missing approved AI Premium Shop payment references`);
if (!go.toLowerCase().includes("account is meant for the individual who created it")) fail(`Go page missing account-sharing policy summary`);
if (!go.includes("/chatgpt-plus-bangladesh") || !go.includes("/chatgpt-plans-bangladesh")) fail(`Go page does not link to Plus and plan-family owners`);
if (!/BDT\s+[0-9,]+\/month/.test(go)) fail(`Go page missing governed local BDT listing`);
if (!go.toLowerCase().includes("api usage is not included")) fail(`Go page missing current OpenAI API-billing caveat`);
if (!go.includes("https://help.openai.com/en/articles/11989085")) fail(`Go page missing current OpenAI Go evidence URL`);

const plus = read("chatgpt-plus-bangladesh");
auditCommon("chatgpt-plus-bangladesh", plus);
if (!plus.includes("$20/month")) fail(`Plus page missing OpenAI $20/month provider reference`);
if (!plus.includes("bKash") || !plus.includes("Nagad")) fail(`Plus page missing approved AI Premium Shop payment references`);
if (!plus.toLowerCase().includes("account is meant for the individual who created it")) fail(`Plus page missing account-sharing policy summary`);
if (!plus.includes("/chatgpt-plans-bangladesh")) fail(`Plus page does not link to the plan-family owner`);
if (!/BDT\s+[0-9,]+\/month/.test(plus)) fail(`Plus page missing governed local BDT listing`);

const business = read("chatgpt-business-bangladesh");
auditCommon("chatgpt-business-bangladesh", business);
if (!business.includes("bKash") || !business.includes("Nagad")) fail(`Business page missing approved AI Premium Shop payment references`);
if (!/BDT\s+[0-9,]+\/month/.test(business)) fail(`Business page missing governed local BDT listing`);
if (!business.includes("Standard: $25/user monthly") || !business.includes("Premium: $125/user monthly")) fail(`Business page missing current OpenAI Standard/Premium monthly references`);
if (!business.toLowerCase().includes("at least two paid seats")) fail(`Business page missing current two-seat minimum`);
if (!business.toLowerCase().includes("api usage is separate")) fail(`Business page missing separate API billing caveat`);
if (!business.toLowerCase().includes("not proof of an openai workspace or seat configuration")) fail(`Business page must distinguish the local access label from provider workspace structure`);
if (!business.includes("https://help.openai.com/en/articles/8542115") || !business.includes("https://help.openai.com/en/articles/8792828")) fail(`Business page missing current first-party OpenAI Business evidence links`);
if (!business.includes("/chatgpt-plans-bangladesh")) fail(`Business page does not link to the plan-family owner`);

const plans = read("chatgpt-plans-bangladesh");
auditCommon("chatgpt-plans-bangladesh", plans);
for (const label of ["Go", "Plus", "Pro", "Business"]) {
  if (!plans.includes(`>${label}<`) && !plans.includes(`>${label}</a>`)) fail(`plan-family page missing ${label}`);
}
if (!plans.includes("$100 and $200 Pro tiers")) fail(`plan-family page missing current OpenAI Pro tier reference`);
if (!plans.toLowerCase().includes("at least two paid seats")) fail(`plan-family page missing current OpenAI Business minimum-seat reference`);
for (const route of ["/chatgpt-plus-bangladesh", "/chatgpt-go-bangladesh", "/chatgpt-business-bangladesh"]) if (!plans.includes(route)) fail(`plan-family page does not link to exact owner ${route}`);
if (!plans.includes("OpenAI reference") || !plans.includes("Current AI Premium Shop listing")) fail(`plan-family page does not separate provider and local seller references`);

const artifacts = [go, plus, business, plans];
for (let i = 0; i < artifacts.length; i += 1) for (let j = i + 1; j < artifacts.length; j += 1) if (artifacts[i] === artifacts[j]) fail(`ChatGPT money-page artifacts must remain distinct by intent`);
if (process.exitCode) process.exit(process.exitCode);
console.log(`[chatgpt-money-audit] PASS: Go, Plus, Business and broad plan-family artifacts have exact metadata, distinct intent, first-party evidence, canonical ownership, governed local listings and no blocked OpenAI shared-access commerce`);
