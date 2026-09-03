#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const PUBLIC_ACRONYM = /\bAIPS\b/;
const STALE_LINKEDIN = "https://www.linkedin.com/company/aipremiumshop/";
const CURRENT_LINKEDIN = "https://www.linkedin.com/showcase/aipremiumshop/";

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(file));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(file);
  }
  return files;
}

if (!fs.existsSync(DIST)) throw new Error("[public-brand] dist/public does not exist");

const failures = [];
let htmlCount = 0;
let currentLinkedInCount = 0;

for (const file of walk(DIST)) {
  htmlCount += 1;
  const html = fs.readFileSync(file, "utf8");
  const relative = path.relative(DIST, file) || "index.html";

  if (PUBLIC_ACRONYM.test(html)) failures.push(`${relative}: contains public acronym AIPS`);
  if (html.includes(STALE_LINKEDIN)) failures.push(`${relative}: contains stale LinkedIn company URL`);
  if (html.includes(CURRENT_LINKEDIN)) currentLinkedInCount += 1;

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1] ?? "";
  if (title.length > 70) failures.push(`${relative}: title length ${title.length} exceeds 70`);
  if (description.length > 158) failures.push(`${relative}: meta description length ${description.length} exceeds 158`);
}

if (currentLinkedInCount === 0) failures.push("no generated HTML contains the verified LinkedIn showcase URL");

if (failures.length) {
  console.error(`[public-brand] FAIL: ${failures.length} issue(s)`);
  for (const failure of failures.slice(0, 80)) console.error(`- ${failure}`);
  if (failures.length > 80) console.error(`- ... ${failures.length - 80} additional issue(s)`);
  process.exit(1);
}

console.log(`[public-brand] PASS: ${htmlCount} generated HTML files use the full public name, no stale LinkedIn sameAs remains, and title/description budgets are intact`);
