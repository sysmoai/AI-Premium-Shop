#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(here, "../dist/public");

const EXCLUDED_ROUTE_PREFIXES = [
  "/refund-policy",
  "/terms",
  "/privacy",
  "/support",
  "/product/higgsfield-ai-bangladesh",
];

const BLOCKED = [
  { label: "universal 30-day warranty", re: /\b30[ -]day\s+warranty\b/i },
  { label: "universal replacement guarantee", re: /\b(?:30[ -]day\s+|full\s+)?replacement\s+guarantee\b/i },
  { label: "instant delivery/access", re: /\binstant\s+(?:delivery|access|activation)\b/i },
  { label: "fixed fast-delivery promise", re: /\b5\s*[–-]\s*(?:15|30)\s*(?:min|minutes)(?:\s+delivery)?\b/i },
  { label: "unverified social-proof claim", re: /\btrusted\s+by\b/i },
  { label: "unverified bestseller claim", re: /\bbest[ -]?seller\b/i },
  { label: "unverified percent discount", re: /\b\d{1,3}%\s*off\b/i },
  { label: "unverified authorization claim", re: /\bauthorized\s+(?:reseller|partner|to offer)\b/i },
  { label: "unverified exclusive-rate claim", re: /\bexclusive\s+(?:promotional\s+)?rate\b/i },
];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile() && entry.name === "index.html") files.push(full);
  }
  return files;
}

function routeFor(file) {
  const rel = path.relative(DIST, file).replaceAll(path.sep, "/");
  if (rel === "index.html") return "/";
  return `/${rel.replace(/\/index\.html$/, "")}`;
}

const failures = [];
let checked = 0;

for (const file of walk(DIST)) {
  const route = routeFor(file);
  const html = fs.readFileSync(file, "utf8");
  const robots = /<meta\s+name="robots"\s+content="([^"]+)"/i.exec(html)?.[1] ?? "";
  const excluded = EXCLUDED_ROUTE_PREFIXES.some((prefix) => route === prefix || route.startsWith(`${prefix}/`));

  if (!excluded && !/noindex/i.test(robots)) {
    checked++;
    for (const rule of BLOCKED) {
      const match = html.match(rule.re);
      if (match) failures.push(`${route}: ${rule.label}: "${match[0]}"`);
    }
  }

  if (route !== "/replit-bangladesh" && route !== "/product/replit-bangladesh") {
    if (/href=["']\/(?:product\/)?replit-bangladesh(?:["'?#])/i.test(html)) {
      failures.push(`${route}: links to retired Replit commerce route`);
    }
  }
}

if (failures.length) {
  console.error(`[public-truth-audit] FAIL: ${failures.length} generated commercial-truth issue(s) across ${checked} indexable pages`);
  for (const failure of failures.slice(0, 200)) console.error(`- ${failure}`);
  if (failures.length > 200) console.error(`- ... ${failures.length - 200} more`);
  process.exit(1);
}

console.log(`[public-truth-audit] PASS: ${checked} indexable generated pages contain no blocked universal commercial claims or retired Replit commerce links`);