// Keeps /product/* URLs in public/sitemap.xml in sync with data/products.json.
//
// The sitemap was hand-maintained, which is exactly how a route silently stops
// being indexed: someone adds a product and nobody remembers the XML. This
// syncs the product section from the catalog — adds missing entries, removes
// entries whose product no longer exists, leaves every non-product URL alone.
//
// Idempotent. Safe to run on every build.

import fs from "node:fs";

const SITEMAP = "public/sitemap.xml";
const { products } = JSON.parse(fs.readFileSync("data/products.json", "utf8"));

let xml = fs.readFileSync(SITEMAP, "utf8");

// A product with a dedicated brand page canonicalizes to /{slug}, NOT to
// /product/{slug} — see productPath() in src/lib/productRoutes.ts. Listing a
// non-canonical URL in the sitemap sends Google contradictory signals, so only
// products WITHOUT a brand page belong in the /product/* section here. The
// brand-page URLs are already covered by their own sitemap entries.
const routesSrc = fs.readFileSync("src/lib/productRoutes.ts", "utf8");
const brandBlock = routesSrc.match(/export const BRAND_PAGE_SLUGS = \[([\s\S]*?)\]/);
if (!brandBlock) throw new Error("could not read BRAND_PAGE_SLUGS from src/lib/productRoutes.ts");
const brandSlugs = new Set([...brandBlock[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]));

const slugs = [...new Set(products.map((p) => p.slug))].filter((s) => !brandSlugs.has(s)).sort();
const present = new Set(
  [...xml.matchAll(/<loc>https:\/\/aipremiumshop\.com\/product\/([^<]*)<\/loc>/g)].map((m) => m[1]),
);

const missing = slugs.filter((s) => !present.has(s));
const stale = [...present].filter((s) => !slugs.includes(s));

// drop stale product URLs
for (const s of stale) {
  const re = new RegExp(
    `\\s*<url>\\s*<loc>https://aipremiumshop\\.com/product/${s.replace(/[.*+?^\${}()|[\]\\]/g, "\\$&")}</loc>[\\s\\S]*?</url>`,
    "g",
  );
  xml = xml.replace(re, "");
}

// Append missing product URLs before </urlset>. Do not manufacture lastmod
// from the build date and do not publish arbitrary changefreq/priority hints.
// A lastmod belongs here only when a material-update evidence source exists.
if (missing.length) {
  const block = missing
    .map((s) => `  <url>\n    <loc>https://aipremiumshop.com/product/${s}</loc>\n  </url>`)
    .join("\n");
  xml = xml.replace(/<\/urlset>\s*$/, `${block}\n</urlset>\n`);
}

fs.writeFileSync(SITEMAP, xml);

const total = [...xml.matchAll(/<url>/g)].length;
console.log(`sitemap: +${missing.length} added, -${stale.length} removed, ${total} URLs total`);
if (missing.length) console.log("added:", missing.join(", "));
