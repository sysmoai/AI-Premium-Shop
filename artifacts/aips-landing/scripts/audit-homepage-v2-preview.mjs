#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = join(APP, "dist/public/__preview/homepage-v2/index.html");
const generatedPath = join(APP, "src/generated/homepageV2.ts");

function assert(condition, message) {
  if (!condition) throw new Error(`[homepage-v2-audit] ${message}`);
}

assert(existsSync(htmlPath), "preview HTML is missing");
assert(existsSync(generatedPath), "generated Homepage V2 view is missing");

const html = readFileSync(htmlPath, "utf8");
const generated = readFileSync(generatedPath, "utf8");

assert(/name=["']robots["'][^>]*content=["']noindex, nofollow["']/i.test(html), "preview is not noindex,nofollow in static HTML");
assert(/rel=["']canonical["'][^>]*href=["']https:\/\/aipremiumshop\.com\/["']/i.test(html), "preview canonical is not production homepage");
assert(html.includes('data-aips-preview="homepage-v2"'), "preview marker missing");
assert(generated.includes("export const HOMEPAGE_V2"), "generated view export missing");
assert(!generated.toLowerCase().includes('"slug": "replit-bangladesh"'), "retired platform leaked into Homepage V2 recommendations");

console.log("[homepage-v2-audit] PASS: physical preview, noindex/canonical and retired-platform guard verified");
