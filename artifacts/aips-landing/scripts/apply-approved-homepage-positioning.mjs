#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(APP, "src/pages/HomeV2.tsx");
let source = fs.readFileSync(file, "utf8");

const replacements = [
  [
    "Personal · Shared · Bundle · Setup access models",
    "Personal · Team/Workspace · Bundle · Setup services",
  ],
  [
    "Personal · Shared · Bundle · Setup",
    "Personal · Team/Workspace · Bundle · Setup",
  ],
  [
    "The homepage is designed to surface the buying model early—so Personal, Shared, Bundle and Setup or Service options are decisions, not surprises after payment.",
    "The homepage surfaces the buying model early—so Personal, provider-supported Team/Workspace, Bundle and Setup or Service options are clear before payment.",
  ],
  [
    '["Shared", "Shared access is labeled before you choose a plan."],',
    '["Team / Workspace", "Provider-supported seats and workspaces where applicable."],',
  ],
];

for (const [from, to] of replacements) {
  if (!source.includes(from)) {
    throw new Error(`[homepage-positioning] expected legacy source phrase is missing: ${from}`);
  }
  source = source.replaceAll(from, to);
}

if (/Personal\s*·\s*Shared|\["Shared",\s*"Shared access/i.test(source)) {
  throw new Error("[homepage-positioning] stale Shared-first homepage positioning remains after rewrite");
}

fs.writeFileSync(file, source, "utf8");
console.log(`[homepage-positioning] applied ${replacements.length} approved access-positioning rewrites`);
