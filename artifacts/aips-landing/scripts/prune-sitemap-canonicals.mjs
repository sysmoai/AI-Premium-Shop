#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const SITEMAP = path.join(DIST, "sitemap.xml");
const SITE = "https://aipremiumshop.com";
const RETIRED_PREFIXES = ["/replit-bangladesh", "/product/replit-bangladesh"];

if (!fs.existsSync(SITEMAP)) throw new Error("canonical sitemap audit: dist/public/sitemap.xml not found");

const vercel = JSON.parse(fs.readFileSync(path.join(APP, "vercel.json"), "utf8"));
const redirectSources = new Set((vercel.redirects ?? []).map((redirect) => redirect.source.replace(/\/$/, "") || "/"));
const normalizeUrl = (value) => value.replace(/\/$/, "");
const normalizePath = (value) => (value.replace(/\/$/, "") || "/");

function routeFile(routePath) {
  if (routePath === "/") return path.join(DIST, "index.html");
  return path.join(DIST, routePath.replace(/^\//, ""), "index.html");
}

function reasonFor(url) {
  let parsed;
  try { parsed = new URL(url); } catch { return "invalid-url"; }
  if (parsed.origin !== SITE) return "foreign-origin";
  const routePath = normalizePath(parsed.pathname);
  if (redirectSources.has(routePath)) return "redirect-source";
  if (RETIRED_PREFIXES.some((prefix) => routePath === prefix || routePath.startsWith(`${prefix}/`))) return "retired-product";

  const file = routeFile(routePath);
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, "utf8");
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  if (canonical && normalizeUrl(canonical) !== normalizeUrl(url)) return `canonical-mismatch:${canonical}`;
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) return "noindex";
  return null;
}

let xml = fs.readFileSync(SITEMAP, "utf8");
const removed = [];
xml = xml.replace(/\s*<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g, (block, loc) => {
  const reason = reasonFor(loc.trim());
  if (!reason) return block;
  removed.push({ url: loc.trim(), reason });
  return "";
});
xml = xml.replace(/\n{3,}/g, "\n\n").replace(/<\/urlset>\s*$/, "</urlset>\n");
fs.writeFileSync(SITEMAP, xml, "utf8");

const remaining = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const violations = remaining.map((url) => ({ url, reason: reasonFor(url) })).filter((item) => item.reason);
if (violations.length) {
  console.error("canonical sitemap audit: violations remain after pruning");
  for (const item of violations) console.error(`- ${item.url}: ${item.reason}`);
  process.exit(1);
}

console.log(`[canonical-sitemap] ${remaining.length} canonical/indexable URLs; removed ${removed.length}`);
for (const item of removed) console.log(`[canonical-sitemap] removed ${item.url} (${item.reason})`);
