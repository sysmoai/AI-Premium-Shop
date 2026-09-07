#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const useSource = process.argv.includes("--source");
const SITEMAP = useSource
  ? path.join(APP, "public/sitemap.xml")
  : path.join(APP, "dist/public/sitemap.xml");
const BLOG = path.join(APP, "data/blog-guides.json");
const SITE = "https://aipremiumshop.com";

if (!fs.existsSync(SITEMAP)) {
  throw new Error(`[editorial-sitemap] ${useSource ? "public" : "dist/public"}/sitemap.xml not found`);
}

const editorial = JSON.parse(fs.readFileSync(BLOG, "utf8"));
const updatedOn = String(editorial?.updatedOn ?? "");
if (!/^\d{4}-\d{2}-\d{2}$/.test(updatedOn)) {
  throw new Error(`[editorial-sitemap] invalid blog updatedOn: ${updatedOn || "missing"}`);
}
if (!Array.isArray(editorial?.posts) || editorial.posts.length === 0) {
  throw new Error("[editorial-sitemap] blog-guides.json has no posts");
}

let xml = fs.readFileSync(SITEMAP, "utf8");
if (!xml.includes("</urlset>")) throw new Error("[editorial-sitemap] malformed sitemap: missing </urlset>");

let added = 0;
let refreshed = 0;
const expected = [];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function upsert(route, lastmod) {
  const absolute = `${SITE}${route === "/" ? "/" : route.replace(/\/+$/, "")}`;
  expected.push(absolute);
  const blockPattern = new RegExp(`(<url>\\s*<loc>${escapeRegex(absolute)}<\\/loc>)([\\s\\S]*?)(<\\/url>)`, "m");
  const match = xml.match(blockPattern);

  if (match) {
    let middle = match[2];
    if (/<lastmod>[^<]*<\/lastmod>/.test(middle)) {
      middle = middle.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${lastmod}</lastmod>`);
    } else {
      middle = `\n    <lastmod>${lastmod}</lastmod>${middle}`;
    }
    xml = xml.replace(blockPattern, `${match[1]}${middle}${match[3]}`);
    refreshed += 1;
    return;
  }

  const block = `  <url>\n    <loc>${absolute}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>\n`;
  xml = xml.replace(/<\/urlset>\s*$/, `${block}</urlset>\n`);
  added += 1;
}

upsert("/blog", updatedOn);
for (const post of editorial.posts) {
  const slug = String(post?.slug ?? "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`[editorial-sitemap] invalid blog slug: ${slug || "missing"}`);
  }
  upsert(`/blog/${slug}`, updatedOn);
}

for (const absolute of expected) {
  const count = [...xml.matchAll(new RegExp(`<loc>${escapeRegex(absolute)}<\\/loc>`, "g"))].length;
  if (count !== 1) throw new Error(`[editorial-sitemap] expected exactly one canonical ${absolute}, found ${count}`);
}

fs.writeFileSync(SITEMAP, xml, "utf8");
console.log(`[editorial-sitemap] ${editorial.posts.length} current blog guides + index covered; added ${added}, refreshed ${refreshed}; lastmod ${updatedOn}`);
