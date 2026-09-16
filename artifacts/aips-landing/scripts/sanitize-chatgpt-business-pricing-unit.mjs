#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(APP, "dist/public/chatgpt-business-bangladesh/index.html");
if (!fs.existsSync(file)) throw new Error(`[business-unit] missing prerendered ChatGPT Business page: ${file}`);

let html = fs.readFileSync(file, "utf8");
const from = "<strong>Current AI Premium Shop listing:</strong> BDT 4,290/month · catalog label Team access.";
const to = "<strong>Current AI Premium Shop listing:</strong> BDT 4,290/user/month · Team / Workspace access.";

if (!html.includes(from)) throw new Error("[business-unit] expected governed ChatGPT Business price line is missing");
html = html.replaceAll(from, to);

if (/BDT 4,290\/month · catalog label Team access/.test(html)) {
  throw new Error("[business-unit] ambiguous non-per-user Business price remains");
}

fs.writeFileSync(file, html, "utf8");
console.log("[business-unit] ChatGPT Business local price is explicit as BDT 4,290/user/month with Team / Workspace access");
