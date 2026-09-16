#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  path.join(APP, "dist/public/index.html"),
  path.join(APP, "dist/public/__preview/homepage-v2/index.html"),
];

const from = "Personal, Shared, Bundle and Setup or Service arrangements are explicit buying information rather than details hidden behind a price card.";
const to = "Personal, provider-supported Team or Workspace, Bundle, and Setup or Service arrangements are explicit buying information rather than details hidden behind a price card.";

for (const file of files) {
  if (!fs.existsSync(file)) throw new Error(`[homepage-positioning-static] missing built homepage: ${file}`);
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes(from)) throw new Error(`[homepage-positioning-static] expected legacy static phrase is missing in ${file}`);
  html = html.replaceAll(from, to);
  if (/Personal,\s*Shared,\s*Bundle/i.test(html)) throw new Error(`[homepage-positioning-static] stale Shared-first phrase remains in ${file}`);
  fs.writeFileSync(file, html, "utf8");
}

console.log(`[homepage-positioning-static] sanitized ${files.length} homepage artifact(s)`);
