// Post-build SEO audit of the prerendered output. Run after `pnpm run build`.
//
// Exists because three separate defects shipped that every other gate passed:
// blog pages prerendered at slugs that were not routes, the homepage serving
// an empty root div while 271 other URLs had content, and alias routes
// self-canonicalising into duplicate-content pairs. None of those are type
// errors or catalog errors — they are only visible by reading the built HTML.
//
//   node scripts/audit-prerender.mjs        (exit 1 on any hard failure)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";

const sitemap = fs.readFileSync(path.join(APP, "public/sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>https:\/\/aipremiumshop\.com([^<]*)<\/loc>/g)]
  .map((m) => m[1] || "/");

const fileFor = (route) => {
  const rel = route.replace(/^\//, "").replace(/\/$/, "");
  return rel ? path.join(DIST, rel, "index.html") : path.join(DIST, "index.html");
};

const fail = [];
const warn = [];
const byTitle = new Map();

for (const route of routes) {
  const file = fileFor(route);
  if (!fs.existsSync(file)) { fail.push(`${route}: no static file (sitemap URL serves the bare SPA shell)`); continue; }
  const html = fs.readFileSync(file, "utf8");

  const root = html.match(/<div id="root">([\s\S]*)$/);
  const inner = root ? root[1] : "";
  if (inner.length < 200) fail.push(`${route}: empty/near-empty root div — invisible without JS`);

  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  if (!title) fail.push(`${route}: no <title>`);

  const cans = [...html.matchAll(/rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
  if (!cans.length) fail.push(`${route}: no canonical`);
  else if (new Set(cans).size > 1) fail.push(`${route}: ${new Set(cans).size} conflicting canonicals`);

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) fail.push(`${route}: no meta description`);
  else if (desc.length < 50) warn.push(`${route}: meta description only ${desc.length} chars`);

  if (title && cans.length) {
    if (!byTitle.has(title)) byTitle.set(title, []);
    byTitle.get(title).push({ route, canonical: cans[0] });
  }
}

// Duplicate titles are fine when the pages share a canonical (aliases); they
// are a keyword-cannibalisation problem when each self-canonicalises.
for (const [title, entries] of byTitle) {
  if (entries.length < 2) continue;
  if (new Set(entries.map((e) => e.canonical)).size > 1) {
    fail.push(`duplicate title with competing canonicals: "${title}" on ${entries.map((e) => e.route).join(", ")}`);
  }
}

console.log(`audit-prerender: ${routes.length} sitemap URLs checked`);
warn.forEach((w) => console.log(`  ⚠ ${w}`));
if (fail.length) {
  console.error(`\n✖ ${fail.length} hard failure(s):`);
  fail.forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
}
console.log(`✔ all routes: static content, unique title, single canonical, meta description${warn.length ? ` (${warn.length} warning(s))` : ""}`);
