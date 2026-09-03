#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const products = JSON.parse(readFileSync(join(APP, "data/public-products.json"), "utf8")).products ?? [];
const informational = JSON.parse(readFileSync(join(APP, "data/informational-products.json"), "utf8")).products ?? [];
const routesSource = readFileSync(join(APP, "src/lib/productRoutes.ts"), "utf8");
const vercel = JSON.parse(readFileSync(join(APP, "vercel.json"), "utf8"));
const brandSlugs = new Set([...routesSource.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]));

const slugify = (value) => String(value ?? "plan")
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 80) || "plan";

const groups = new Map();
for (const product of products) {
  if (!groups.has(product.slug)) groups.set(product.slug, []);
  groups.get(product.slug).push(product);
}

const routes = [];
for (const [slug, records] of groups) {
  const canonicalPath = brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`;
  routes.push({
    entityType: "product",
    entityKey: slug,
    canonicalPath,
    routeType: brandSlugs.has(slug) ? "brand-product" : "product",
    indexPolicy: "INDEX_SELF",
    active: true,
    commerceEligible: true,
  });

  const planCandidates = [];
  for (const record of records) {
    if (record.tier) planCandidates.push({ name: record.tier, source: "record-tier" });
    if (Array.isArray(record.plans)) {
      for (const plan of record.plans) planCandidates.push({ name: plan.planName ?? plan.name ?? plan.tier, source: "nested-plan" });
    }
  }

  const seenPlanKeys = new Set();
  for (const candidate of planCandidates) {
    if (!candidate.name) continue;
    const planKey = slugify(candidate.name);
    if (seenPlanKeys.has(planKey)) continue;
    seenPlanKeys.add(planKey);
    routes.push({
      entityType: "plan",
      entityKey: `${slug}:${planKey}`,
      productKey: slug,
      planKey,
      planName: candidate.name,
      canonicalPath: `/product/${slug}/plans/${planKey}`,
      routeType: "product-plan",
      indexPolicy: "CANONICAL_PARENT",
      active: true,
      source: candidate.source,
      commerceEligible: true,
    });
  }
}

const commerceSlugs = new Set(groups.keys());
for (const product of informational) {
  if (!product?.slug || commerceSlugs.has(product.slug)) throw new Error(`Invalid informational route overlap for ${product?.slug ?? "unknown"}`);
  const canonicalPath = brandSlugs.has(product.slug) ? `/${product.slug}` : `/product/${product.slug}`;
  routes.push({
    entityType: "product",
    entityKey: product.slug,
    canonicalPath,
    routeType: "informational-product",
    indexPolicy: "INDEX_SELF",
    active: true,
    commerceEligible: false,
    publicationStatus: "informational-provider-restricted",
  });
}

const redirects = (vercel.redirects ?? []).map((redirect) => ({
  sourcePath: redirect.source,
  destinationPath: redirect.destination,
  statusCode: redirect.permanent ? 308 : 307,
  active: true,
  source: "vercel.json",
}));

const canonicalOwners = new Map();
for (const route of routes.filter((route) => route.active)) {
  const previous = canonicalOwners.get(route.canonicalPath);
  if (previous) throw new Error(`Duplicate active canonical path ${route.canonicalPath}: ${previous} and ${route.entityKey}`);
  canonicalOwners.set(route.canonicalPath, route.entityKey);
}

const redirectSources = new Set();
for (const redirect of redirects) {
  if (redirectSources.has(redirect.sourcePath)) throw new Error(`Duplicate redirect source: ${redirect.sourcePath}`);
  redirectSources.add(redirect.sourcePath);
  if (redirect.sourcePath === redirect.destinationPath) throw new Error(`Self redirect: ${redirect.sourcePath}`);
}

const productRoutes = routes.filter((route) => route.entityType === "product" && route.active);
const commerceProductRoutes = productRoutes.filter((route) => route.commerceEligible === true);
const informationalProductRoutes = productRoutes.filter((route) => route.commerceEligible === false);
const planRoutes = routes.filter((route) => route.entityType === "plan" && route.active);

const outDir = join(APP, "data/generated");
mkdirSync(outDir, { recursive: true });
const output = {
  schema_version: 2,
  generated_at: new Date().toISOString(),
  source: "public-products.json + informational-products.json + productRoutes.ts + vercel.json",
  active_product_routes: productRoutes.length,
  active_commerce_product_routes: commerceProductRoutes.length,
  active_informational_product_routes: informationalProductRoutes.length,
  active_plan_routes: planRoutes.length,
  independently_indexable_plan_routes: planRoutes.filter((route) => route.indexPolicy === "INDEX_SELF").length,
  routes,
  redirects,
};
writeFileSync(join(outDir, "route-registry.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`[route-registry] ${output.active_product_routes} active product URLs (${output.active_commerce_product_routes} commerce, ${output.active_informational_product_routes} informational), ${output.active_plan_routes} active plan views, ${output.independently_indexable_plan_routes} independently indexable plans, ${redirects.length} redirects`);
