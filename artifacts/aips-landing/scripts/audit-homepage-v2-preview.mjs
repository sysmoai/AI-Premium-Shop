#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const productionPath = join(APP, "dist/public/index.html");
const previewPath = join(APP, "dist/public/__preview/homepage-v2/index.html");
const generatedPath = join(APP, "src/generated/homepageV2.ts");

function assert(condition, message) {
  if (!condition) throw new Error(`[homepage-v2-audit] ${message}`);
}

assert(existsSync(productionPath), "production homepage HTML is missing");
assert(existsSync(previewPath), "preview HTML is missing");
assert(existsSync(generatedPath), "generated Homepage V2 view is missing");

const production = readFileSync(productionPath, "utf8");
const preview = readFileSync(previewPath, "utf8");
const generated = readFileSync(generatedPath, "utf8");
const productionHead = production.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? "";

assert(!/noindex/i.test(productionHead), "production homepage head contains noindex");
assert(/rel=["']canonical["'][^>]*href=["']https:\/\/aipremiumshop\.com\/["']/i.test(production), "production canonical is not root");
assert(production.includes('id="prerender-shell"'), "production static body does not use the anti-flash prerender shell");
assert(/<h1>Find the right AI tool\. Pay locally\. Know exactly what access you get\.<\/h1>/.test(production), "production static H1 is missing or drifted from V2");
assert(!/"@type"\s*:\s*"FAQPage"/i.test(productionHead), "legacy V1 FAQPage schema leaked into production V2 head");

assert(/name=["']robots["'][^>]*content=["']noindex, nofollow["']/i.test(preview), "preview is not noindex,nofollow in static HTML");
assert(/rel=["']canonical["'][^>]*href=["']https:\/\/aipremiumshop\.com\/["']/i.test(preview), "preview canonical is not production homepage");
assert(preview.includes('data-aips-preview="homepage-v2"'), "preview marker missing");
assert(preview.includes('id="prerender-shell"'), "preview static body does not use the anti-flash prerender shell");
assert(/<h1>Find the right AI tool\. Pay locally\. Know exactly what access you get\.<\/h1>/.test(preview), "preview static H1 is missing or drifted from the canary hero");
assert(preview.includes("What do you want AI to help you do?"), "preview finder architecture is missing from static HTML");
assert(preview.includes("Understand the access model before you pay"), "preview access-model architecture is missing from static HTML");
assert(!/"@type"\s*:\s*"FAQPage"/i.test(preview), "legacy V1 FAQPage schema leaked into V2 preview");
assert(generated.includes("export const HOMEPAGE_V2"), "generated view export missing");
assert(!generated.toLowerCase().includes('"slug": "replit-bangladesh"'), "retired platform leaked into Homepage V2 recommendations");

console.log("[homepage-v2-audit] PASS: production/preview indexing, canonical, static shell, structured-data parity and retired-platform guard verified");
