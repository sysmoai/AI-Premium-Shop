#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const useSource = process.argv.includes("--source");
const SITEMAP = useSource
  ? path.join(APP, "public/sitemap.xml")
  : path.join(APP, "dist/public/sitemap.xml");

if (!fs.existsSync(SITEMAP)) {
  throw new Error(`sitemap metadata audit: ${useSource ? "public" : "dist/public"}/sitemap.xml not found`);
}

let xml = fs.readFileSync(SITEMAP, "utf8");
const beforeUrls = [...xml.matchAll(/<url>/g)].length;
const changefreqCount = [...xml.matchAll(/<changefreq>[^<]*<\/changefreq>/g)].length;
const priorityCount = [...xml.matchAll(/<priority>[^<]*<\/priority>/g)].length;

// Search engines do not need speculative crawl cadence or arbitrary priority
// scores. Remove those hints mechanically while preserving the URL set,
// canonicals and any existing lastmod values.
xml = xml
  .replace(/\n\s*<changefreq>[^<]*<\/changefreq>/g, "")
  .replace(/\n\s*<priority>[^<]*<\/priority>/g, "");

const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1].trim());
const today = new Date().toISOString().slice(0, 10);
const invalidLastmods = lastmods.filter((value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return true;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value || value > today;
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
  `[sitemap-metadata] ${afterUrls} URLs; removed ${changefreqCount} changefreq + ${priorityCount} priority hints; preserved ${lastmods.length} evidenced lastmod values`,
);
