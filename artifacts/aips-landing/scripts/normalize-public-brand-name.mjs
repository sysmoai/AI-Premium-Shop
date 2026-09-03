#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const PUBLIC_NAME = "AI Premium Shop";
const PUBLIC_ACRONYM = /\bAIPS\b/g;
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

function fitTitle(value) {
  if (value.length <= 70) return value;
  const suffix = ` | ${PUBLIC_NAME}`;
  if (value.endsWith(suffix)) {
    const available = 69 - suffix.length;
    return `${value.slice(0, Math.max(20, available)).trimEnd()}…${suffix}`;
  }
  return `${value.slice(0, 69).trimEnd()}…`;
}

function fitDescription(value) {
  return value.length <= 158 ? value : `${value.slice(0, 157).trimEnd()}…`;
}

function replaceAttr(html, regex, fitter) {
  return html.replace(regex, (_full, before, value, after) => `${before}${fitter(value)}${after}`);
}

if (!fs.existsSync(DIST)) throw new Error("[public-brand] dist/public does not exist");

let filesChanged = 0;
let acronymReplacements = 0;
let linkedinCorrections = 0;

for (const file of walk(DIST)) {
  const original = fs.readFileSync(file, "utf8");
  const acronymHits = original.match(PUBLIC_ACRONYM)?.length ?? 0;
  const linkedinHits = original.split(STALE_LINKEDIN).length - 1;

  let html = original
    .replace(PUBLIC_ACRONYM, PUBLIC_NAME)
    .replaceAll(STALE_LINKEDIN, CURRENT_LINKEDIN);

  html = html.replace(/<title>([\s\S]*?)<\/title>/i, (_full, title) => `<title>${fitTitle(title)}</title>`);
  html = replaceAttr(html, /(<meta\s+name=["']description["']\s+content=["'])([^"']*)(["'])/i, fitDescription);
  html = replaceAttr(html, /(<meta\s+property=["']og:title["']\s+content=["'])([^"']*)(["'])/i, fitTitle);
  html = replaceAttr(html, /(<meta\s+property=["']og:description["']\s+content=["'])([^"']*)(["'])/i, fitDescription);

  if (html !== original) {
    fs.writeFileSync(file, html, "utf8");
    filesChanged += 1;
  }
  acronymReplacements += acronymHits;
  linkedinCorrections += linkedinHits;
}

console.log(`[public-brand] normalized ${filesChanged} HTML files; expanded ${acronymReplacements} public acronym occurrence(s); corrected ${linkedinCorrections} stale LinkedIn sameAs occurrence(s)`);
