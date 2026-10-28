#!/usr/bin/env node
// Build-time regression guard: SEO metadata should retain meaningful product
// terms and never contain literal ellipses added by the build pipeline.
// This checks generated public HTML, not historical catalog data or SERP text.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(APP, "dist/public");
const productDir = path.join(DIST, "product");
const informational = JSON.parse(fs.readFileSync(path.join(APP, "data/informational-products.json"), "utf8")).products ?? [];
const routesSource = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...routesSource.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]));
const errors = [];
let checked = 0;

const htmlFor = (route) => {
  const pathname = route === "/" ? "index.html" : path.join(route.slice(1), "index.html");
  const file = path.join(DIST, pathname);
  if (!fs.existsSync(file)) {
    errors.push(`Missing generated page ${route}`);
    return "";
  }
  return fs.readFileSync(file, "utf8");
};
const titleOf = (html) => html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
const descOf = (html) => html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? "";
const assertMeta = (route, html, { description = false } = {}) => {
  const title = titleOf(html);
  if (!title) errors.push(`${route}: missing title`);
  if (title.includes("…")) errors.push(`${route}: literal ellipsis in title`);
  if (description && descOf(html).includes("…")) errors.push(`${route}: literal ellipsis in description`);
  checked += 1;
};

for (const product of informational) {
  const route = brandSlugs.has(product.slug) ? `/${product.slug}` : `/product/${product.slug}`;
  assertMeta(route, htmlFor(route), { description: true });
}
if (fs.existsSync(productDir)) {
  for (const entry of fs.readdirSync(productDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !fs.existsSync(path.join(productDir, entry.name, "index.html"))) continue;
    const route = `/product/${entry.name}`;
    const html = htmlFor(route);
    if (!titleOf(html)) errors.push(`${route}: missing product title`);
    if (titleOf(html).includes("…")) errors.push(`${route}: literal ellipsis in product title`);
    checked += 1;
  }
}

for (const route of ["/chatgpt-vs-gemini", "/claude-vs-gemini"]) {
  const html = htmlFor(route);
  const title = titleOf(html);
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";
  assertMeta(route, html);
  for (const term of ["Google AI Pro", "Gemini"]) {
    if (!title.includes(term)) errors.push(`${route}: title missing ${term}`);
    if (!h1.includes(term)) errors.push(`${route}: H1 missing ${term}`);
  }
}

if (errors.length) {
  console.error(`[aips-metadata-contract] ${errors.length} failure(s) across ${checked} checks:`);
  for (const error of errors.slice(0, 40)) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`[aips-metadata-contract] ${checked} generated pages checked: no literal title ellipses, Gemini comparisons preserve product intent`);
