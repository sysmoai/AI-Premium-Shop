#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(APP, "../..");
const useSource = process.argv.includes("--source");
const SITEMAP = useSource
  ? path.join(APP, "public/sitemap.xml")
  : path.join(APP, "dist/public/sitemap.xml");
const OVERRIDES = path.join(REPO, "ops/seo/sitemap-lastmod-overrides-2026-09-07.json");

if (!fs.existsSync(SITEMAP)) {
  throw new Error(`sitemap metadata audit: ${useSource ? "public" : "dist/public"}/sitemap.xml not found`);
}

let xml = fs.readFileSync(SITEMAP, "utf8");
const beforeUrls = [...xml.matchAll(/<url>/g)].length;
const changefreqCount = [...xml.matchAll(/<changefreq>[^<]*<\/changefreq>/g)].length;
const priorityCount = [...xml.matchAll(/<priority>[^<]*<\/priority>/g)].length;

xml = xml
  .replace(/\n\s*<changefreq>[^<]*<\/changefreq>/g, "")
  .replace(/\n\s*<priority>[^<]*<\/priority>/g, "");

const todayDhaka = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Dhaka",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

let appliedOverrides = 0;
if (fs.existsSync(OVERRIDES)) {
  const registry = JSON.parse(fs.readFileSync(OVERRIDES, "utf8"));
  if (registry?.schema_version !== 1 || registry?.host !== "aipremiumshop.com") {
    throw new Error("sitemap metadata audit: lastmod override registry schema/host mismatch");
  }
  const seen = new Set();
  for (const item of registry?.routes ?? []) {
    if (!item?.path || !item.path.startsWith("/") || item.path.startsWith("//")) throw new Error("sitemap metadata audit: invalid override path");
    if (seen.has(item.path)) throw new Error(`sitemap metadata audit: duplicate override path ${item.path}`);
    seen.add(item.path);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(item.lastmod ?? "")) || item.lastmod > todayDhaka) {
      throw new Error(`sitemap metadata audit: invalid/future override lastmod ${item?.path}=${item?.lastmod}`);
    }
    if (!item?.reason || !Array.isArray(item?.evidence) || item.evidence.length === 0) {
      throw new Error(`sitemap metadata audit: ${item.path} requires reason + evidence`);
    }
    const absolute = `https://aipremiumshop.com${item.path === "/" ? "/" : item.path.replace(/\/+$/, "")}`;
    const escaped = absolute.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const blockPattern = new RegExp(`(<url>\\s*<loc>${escaped}<\\/loc>)([\\s\\S]*?)(<\\/url>)`, "m");
    const match = xml.match(blockPattern);
    if (!match) throw new Error(`sitemap metadata audit: override canonical not found ${absolute}`);
    let middle = match[2];
    if (/<lastmod>[^<]*<\/lastmod>/.test(middle)) {
      middle = middle.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${item.lastmod}</lastmod>`);
    } else {
      middle = `\n    <lastmod>${item.lastmod}</lastmod>${middle}`;
    }
    xml = xml.replace(blockPattern, `${match[1]}${middle}${match[3]}`);
    appliedOverrides += 1;
  }
}

const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1].trim());
const invalidLastmods = lastmods.filter((value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return true;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value || value > todayDhaka;
});

if (invalidLastmods.length) {
  throw new Error(`sitemap metadata audit: invalid/future lastmod values: ${[...new Set(invalidLastmods)].join(", ")}`);
}

const afterUrls = [...xml.matchAll(/<url>/g)].length;
if (beforeUrls !== afterUrls) {
  throw new Error(`sitemap metadata audit: URL count changed unexpectedly (${beforeUrls} -> ${afterUrls})`);
}
if (/<changefreq>|<priority>/.test(xml)) {
  throw new Error("sitemap metadata audit: legacy changefreq/priority metadata survived normalization");
}

fs.writeFileSync(SITEMAP, xml, "utf8");
console.log(
  `[sitemap-metadata] ${afterUrls} URLs; removed ${changefreqCount} changefreq + ${priorityCount} priority hints; applied ${appliedOverrides} evidence-backed lastmod override(s); ${lastmods.length} valid lastmod value(s) remain`,
);
