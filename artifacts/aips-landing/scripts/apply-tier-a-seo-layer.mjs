#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(APP, "../..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";
const config = JSON.parse(fs.readFileSync(path.join(APP, "data/tier-a-seo-links.json"), "utf8"));
const ownership = JSON.parse(fs.readFileSync(path.join(REPO, "ops/seo/keyword-ownership-2026-09-03.json"), "utf8"));
const projectionDoc = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = Array.isArray(projectionDoc) ? projectionDoc : projectionDoc.products ?? [];
const informationalDoc = JSON.parse(fs.readFileSync(path.join(APP, "data/informational-products.json"), "utf8"));
const informational = new Set((informationalDoc.products ?? []).map((item) => item.slug));
const routes = config.routes ?? [];
const byPath = new Map(routes.map((route) => [route.path, route]));

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

function slugFromPath(routePath) {
  const parts = routePath.split("/").filter(Boolean);
  return parts.at(-1) ?? "";
}

function fileFor(routePath) {
  const parts = routePath.split("/").filter(Boolean);
  return path.join(DIST, ...parts, "index.html");
}

function schemaTypes(value) {
  if (!value || typeof value !== "object") return [];
  const type = value["@type"];
  return Array.isArray(type) ? type : type ? [type] : [];
}

function stripTierASchema(html) {
  return html.replace(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>\s*/gi, (full, body) => {
    try {
      const parsed = JSON.parse(body);
      const nodes = Array.isArray(parsed) ? parsed : [parsed];
      const managed = nodes.some((node) => {
        const types = schemaTypes(node);
        return types.includes("Product") || types.includes("BreadcrumbList");
      });
      return managed ? "" : full;
    } catch {
      return full;
    }
  });
}

function offerSchema(records, canonical) {
  const priced = records
    .filter((record) => record.requestPrice !== true && typeof record.price === "number" && Number(record.price) > 0)
    .map((record) => Number(record.price));
  if (!priced.length) return undefined;
  const seller = { "@type": "Organization", name: "AI Premium Shop", url: SITE };
  if (priced.length === 1) {
    return { "@type": "Offer", url: canonical, price: priced[0], priceCurrency: "BDT", seller };
  }
  return {
    "@type": "AggregateOffer",
    url: canonical,
    lowPrice: Math.min(...priced),
    highPrice: Math.max(...priced),
    offerCount: priced.length,
    priceCurrency: "BDT",
    seller,
  };
}

function jsonLd(value) {
  return `<script type="application/ld+json">${JSON.stringify(value)}</script>`;
}

function schemaFor(route, records, isInformational) {
  const canonical = `${SITE}${route.path}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: route.category_label, item: `${SITE}${route.category_path}` },
      { "@type": "ListItem", position: 3, name: route.label, item: canonical },
    ],
  };
  if (isInformational) return [breadcrumb];
  const product = {
    "@context": "https://schema.org",
    "@type": route.inquiry_only === true ? ["Product", "SoftwareApplication"] : "Product",
    name: route.label,
    url: canonical,
    category: route.category_label,
    ...(route.inquiry_only === true ? { applicationCategory: "AI software" } : {}),
    ...(route.inquiry_only !== true && offerSchema(records, canonical) ? { offers: offerSchema(records, canonical) } : {}),
  };
  return [breadcrumb, product];
}

function linksBlock(route) {
  const related = route.related.map((target) => byPath.get(target)).filter(Boolean);
  return `<section data-tier-a-internal-links><h2>Compare related AI tools</h2><p>Use these canonical AI Premium Shop pages to compare current listings. Provider-controlled plans, limits and eligibility can change independently.</p><ul>${related.map((item) => `<li><a href="${esc(item.path)}">${esc(item.label)}</a></li>`).join("")}</ul></section>`;
}

if (config.schema_version !== 1 || routes.length !== 20) throw new Error(`[tier-a-seo] expected schema v1 with 20 routes, got ${routes.length}`);
const ownerPaths = new Set((ownership.owners ?? []).filter((owner) => owner.tier_a === true).map((owner) => owner.primary_url));
const configPaths = new Set(routes.map((route) => route.path));
if (ownerPaths.size !== 20 || configPaths.size !== 20 || [...ownerPaths].some((item) => !configPaths.has(item))) {
  throw new Error("[tier-a-seo] link graph must match the 20 canonical Tier-A keyword owners exactly");
}

let commerceCount = 0;
let informationalCount = 0;
let inquiryCount = 0;
for (const route of routes) {
  if (!route.path?.startsWith("/") || !route.category_path?.startsWith("/") || !Array.isArray(route.related) || route.related.length < 1) {
    throw new Error(`[tier-a-seo] invalid route config ${route.path ?? "<missing>"}`);
  }
  if (route.related.includes(route.path) || route.related.some((target) => !configPaths.has(target))) {
    throw new Error(`[tier-a-seo] invalid related canonical for ${route.path}`);
  }
  const file = fileFor(route.path);
  if (!fs.existsSync(file)) throw new Error(`[tier-a-seo] missing final artifact ${route.path}`);
  const slug = slugFromPath(route.path);
  const records = products.filter((record) => record.slug === slug);
  const isInformational = informational.has(slug) || records.length === 0;
  if (isInformational && route.inquiry_only === true) throw new Error(`[tier-a-seo] inquiry-only route cannot also be provider-restricted: ${route.path}`);
  if (!isInformational && route.inquiry_only !== true && records.length === 0) throw new Error(`[tier-a-seo] commerce route lacks governed records: ${route.path}`);

  let html = fs.readFileSync(file, "utf8");
  html = stripTierASchema(html);
  html = html.replace(/<section\s+data-tier-a-internal-links[^>]*>[\s\S]*?<\/section>\s*/gi, "");
  const schemas = schemaFor(route, records, isInformational).map(jsonLd).join("\n");
  if (!/<\/head>/i.test(html)) throw new Error(`[tier-a-seo] missing </head> for ${route.path}`);
  html = html.replace(/<\/head>/i, `${schemas}\n</head>`);
  if (!/<\/main>/i.test(html)) throw new Error(`[tier-a-seo] missing </main> for ${route.path}`);
  html = html.replace(/<\/main>/i, `${linksBlock(route)}\n</main>`);
  fs.writeFileSync(file, html, "utf8");

  if (isInformational) informationalCount += 1;
  else if (route.inquiry_only === true) inquiryCount += 1;
  else commerceCount += 1;
}

console.log(`[tier-a-seo] applied final-artifact schema + internal links to ${routes.length} Tier-A canonicals; commerce=${commerceCount}; informational=${informationalCount}; inquiry-only=${inquiryCount}`);
