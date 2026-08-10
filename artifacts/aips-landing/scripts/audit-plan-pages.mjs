#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(here, "..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";
const { plans = [] } = JSON.parse(fs.readFileSync(path.join(APP, "public/generated/plan-catalog.json"), "utf8"));

const errors = [];
const textOnly = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

for (const plan of plans) {
  const file = path.join(DIST, plan.canonicalPath.replace(/^\//, ""), "index.html");
  if (!fs.existsSync(file)) {
    errors.push(`${plan.canonicalPath}: missing static index.html`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const expectedCanonical = plan.indexPolicy === "INDEX_SELF"
    ? `${SITE}${plan.canonicalPath}`
    : `${SITE}${plan.parentCanonicalPath}`;
  const expectedRobots = plan.indexPolicy === "INDEX_SELF" ? "index,follow" : "noindex,follow";

  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}"`)) {
    errors.push(`${plan.canonicalPath}: wrong/missing canonical; expected ${expectedCanonical}`);
  }
  if (!html.includes(`<meta name="robots" content="${expectedRobots}"`)) {
    errors.push(`${plan.canonicalPath}: wrong/missing robots; expected ${expectedRobots}`);
  }
  if (!html.includes(`<h1>${plan.productName} — ${plan.planName}</h1>`)) {
    errors.push(`${plan.canonicalPath}: plan identity missing from static H1`);
  }
  if (plan.requestPrice) {
    const body = textOnly(html);
    if (!body.includes("Request current price")) {
      errors.push(`${plan.canonicalPath}: request-price label missing`);
    }
    const pricePattern = /(?:৳|BDT\s*)\s*\d[\d,]*/i;
    if (pricePattern.test(body)) {
      errors.push(`${plan.canonicalPath}: numeric BDT price leaked into request-price page`);
    }
  } else if (typeof plan.priceBDT === "number" && !html.includes(`৳${plan.priceBDT.toLocaleString("en-US")}`)) {
    errors.push(`${plan.canonicalPath}: approved public price is missing from plan page`);
  }
}

if (errors.length) {
  console.error(`[audit-plan-pages] FAIL: ${errors.length} issue(s)`);
  for (const error of errors.slice(0, 100)) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`[audit-plan-pages] PASS: ${plans.length} static plan pages validated`);
