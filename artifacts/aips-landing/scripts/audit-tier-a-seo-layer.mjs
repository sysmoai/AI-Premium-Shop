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
const routePaths = new Set(routes.map((route) => route.path));
const failures = [];
const fail = (message) => failures.push(message);

function slugFromPath(routePath) {
  return routePath.split("/").filter(Boolean).at(-1) ?? "";
}
function fileFor(routePath) {
  return path.join(DIST, ...routePath.split("/").filter(Boolean), "index.html");
}
function types(node) {
  const type = node?.["@type"];
  return Array.isArray(type) ? type : type ? [type] : [];
}
function jsonNodes(html) {
  const nodes = [];
  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(match[1]);
      nodes.push(...(Array.isArray(parsed) ? parsed : [parsed]));
    } catch (error) {
      fail(`invalid JSON-LD: ${error.message}`);
    }
  }
  return nodes;
}
function priced(records) {
  return records
    .filter((record) => record.requestPrice !== true && typeof record.price === "number" && Number(record.price) > 0)
    .map((record) => Number(record.price));
}
function hasForbiddenProductField(product) {
  const text = JSON.stringify(product);
  return /"(?:availability|shippingDetails|hasMerchantReturnPolicy|priceValidUntil|aggregateRating|review|dateModified)"\s*:/i.test(text);
}

const owners = (ownership.owners ?? []).filter((owner) => owner.tier_a === true);
if (owners.length !== 20 || routes.length !== 20) fail(`expected 20 Tier-A owners/routes, got owners=${owners.length} routes=${routes.length}`);
for (const owner of owners) if (!routePaths.has(owner.primary_url)) fail(`missing configured Tier-A owner ${owner.primary_url}`);

let commerceCount = 0;
let informationalCount = 0;
let inquiryCount = 0;
for (const route of routes) {
  const file = fileFor(route.path);
  if (!fs.existsSync(file)) { fail(`${route.path}: final artifact missing`); continue; }
  const html = fs.readFileSync(file, "utf8");
  const nodes = jsonNodes(html);
  const breadcrumbs = nodes.filter((node) => types(node).includes("BreadcrumbList"));
  const productNodes = nodes.filter((node) => types(node).includes("Product"));
  const slug = slugFromPath(route.path);
  const records = products.filter((record) => record.slug === slug);
  const isInformational = informational.has(slug) || records.length === 0;
  const isInquiry = route.inquiry_only === true;
  const canonical = `${SITE}${route.path}`;

  if (!html.includes(`rel="canonical" href="${canonical}"`)) fail(`${route.path}: canonical link missing/drifted`);
  if (breadcrumbs.length !== 1) fail(`${route.path}: expected exactly one BreadcrumbList, found ${breadcrumbs.length}`);
  if (breadcrumbs.length === 1) {
    const items = breadcrumbs[0].itemListElement ?? [];
    if (items.length !== 3) fail(`${route.path}: breadcrumb must have exactly 3 items`);
    if (items[0]?.item !== `${SITE}/` || items[1]?.item !== `${SITE}${route.category_path}` || items[2]?.item !== canonical) fail(`${route.path}: breadcrumb canonical/category chain drift`);
  }

  if (isInformational) {
    informationalCount += 1;
    if (productNodes.length !== 0) fail(`${route.path}: provider-restricted informational route must not carry Product schema`);
  } else {
    if (productNodes.length !== 1) fail(`${route.path}: expected exactly one Product schema, found ${productNodes.length}`);
    const product = productNodes[0];
    if (product) {
      if (product.url !== canonical || product.name !== route.label) fail(`${route.path}: Product name/url drift`);
      if (hasForbiddenProductField(product)) fail(`${route.path}: Product schema contains protected/unsupported merchant or social-proof fields`);
      if (isInquiry) {
        inquiryCount += 1;
        if (product.offers) fail(`${route.path}: inquiry-only route must not emit Offer/AggregateOffer`);
      } else {
        commerceCount += 1;
        const prices = priced(records);
        if (!prices.length && product.offers) fail(`${route.path}: offer emitted without a governed fixed public price`);
        if (prices.length === 1) {
          if (types(product.offers).join() !== "Offer" || Number(product.offers.price) !== prices[0] || product.offers.priceCurrency !== "BDT") fail(`${route.path}: single Offer does not match governed projected price`);
        }
        if (prices.length > 1) {
          if (types(product.offers).join() !== "AggregateOffer") fail(`${route.path}: multiple prices require AggregateOffer`);
          else if (Number(product.offers.lowPrice) !== Math.min(...prices) || Number(product.offers.highPrice) !== Math.max(...prices) || Number(product.offers.offerCount) !== prices.length || product.offers.priceCurrency !== "BDT") fail(`${route.path}: AggregateOffer does not match governed projected prices`);
        }
      }
    }
  }

  const blocks = [...html.matchAll(/<section\s+data-tier-a-internal-links[^>]*>([\s\S]*?)<\/section>/gi)];
  if (blocks.length !== 1) fail(`${route.path}: expected exactly one Tier-A internal-link block, found ${blocks.length}`);
  if (blocks.length === 1) {
    const block = blocks[0][1];
    if (!block.includes("Compare related AI tools")) fail(`${route.path}: link block heading missing`);
    if (block.includes(`href="${route.path}"`)) fail(`${route.path}: self-link present in Tier-A block`);
    for (const target of route.related) if (!block.includes(`href="${target}"`)) fail(`${route.path}: configured related canonical missing ${target}`);
    const linked = [...block.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    if (linked.some((target) => !routePaths.has(target))) fail(`${route.path}: non-Tier-A route leaked into Tier-A block`);
    if (new Set(linked).size !== linked.length) fail(`${route.path}: duplicate Tier-A internal links`);
  }
}

if (failures.length) {
  console.error(`[tier-a-seo-audit] FAIL (${failures.length})`);
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}
console.log(`[tier-a-seo-audit] PASS: 20 canonicals; commerce=${commerceCount}; informational=${informationalCount}; inquiry-only=${inquiryCount}; BreadcrumbList exact; Product offers projection-matched; protected merchant/review fields absent; internal link graph canonical-only`);
