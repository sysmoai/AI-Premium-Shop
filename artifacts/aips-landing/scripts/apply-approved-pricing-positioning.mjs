#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(APP, "src/pages/PricingPage.tsx");
let source = fs.readFileSync(file, "utf8");

const replacements = [
  ['  shared: "Shared",\n', ''],
  ['<p style={{ color: "#c9ceda" }}>Shared, personal, team, bundle and service arrangements have different operational implications.</p>', '<p style={{ color: "#c9ceda" }}>Personal, provider-supported team/workspace, bundle and service arrangements have different operational implications.</p>'],
  ['            <option value="shared">Shared</option>\n', ''],
];

for (const [from, to] of replacements) {
  if (!source.includes(from)) throw new Error(`[pricing-positioning] expected source phrase missing: ${from}`);
  source = source.replaceAll(from, to);
}

if (/option value="shared"|Shared, personal, team/i.test(source)) {
  throw new Error("[pricing-positioning] stale Shared-first pricing UI remains");
}

fs.writeFileSync(file, source, "utf8");
console.log(`[pricing-positioning] applied ${replacements.length} approved pricing-page rewrites`);
