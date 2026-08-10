#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(APP, "dist/public");
const sourcePath = join(dist, "index.html");
const outDir = join(dist, "__preview/homepage-v2");
const outPath = join(outDir, "index.html");

let html = readFileSync(sourcePath, "utf8");

const robots = '<meta name="robots" content="noindex, nofollow">';
if (/<meta\s+name=["']robots["'][^>]*>/i.test(html)) {
  html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, robots);
} else {
  html = html.replace(/<head([^>]*)>/i, `<head$1>\n    ${robots}`);
}

const canonical = '<link rel="canonical" href="https://aipremiumshop.com/">';
if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, canonical);
} else {
  html = html.replace(/<head([^>]*)>/i, `<head$1>\n    ${canonical}`);
}

html = html.replace(/<title>[^<]*<\/title>/i, "<title>Homepage V2 Preview — AI Premium Shop</title>");
html = html.replace(/<html([^>]*)>/i, '<html$1 data-aips-preview="homepage-v2">');

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log(`[homepage-v2-preview] wrote ${outPath}`);
