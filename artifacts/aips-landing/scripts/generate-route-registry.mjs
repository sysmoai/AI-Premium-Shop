#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const products = JSON.parse(readFileSync(join(APP, "data/public-products.json"), "utf8")).products ?? [];
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
  const first = records[0];
  const canonicalPath = brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`;
  routes.push({
    entityType: "product",
    entityKey: slug,
    canonicalPath,
    routeType: brandSlugs.has(slug) ? "brand-product" : "product",
    indexPolicy: "INDEX_SELF",
    active: true,
  });

  const planCandidates = [];
  for (const record of records) {
    if (record.tier) planCandidates.push({ name: record.tier, source: "record-tier" });
    if (Array.isArray(record.plans)) {
      for (const plan of record.plans) {
        planCandidates.push({ name: plan.planName ?? plan.name ?? plan.tier, source: "nested-plan" });
      }
    }
  }

  const seenPlanKeys = new Set();
  for (const candidate of planCandidates) {
    if (!candidate.name) continue;
    let planKey = slugify(candidate.name);
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
      active: false,
      preparedOnly: true,
      source: candidate.source,
    });
  }
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
  if (previous) {
    throw new Error(`Duplicate active canonical path ${route.canonicalPath}: ${previous} and ${route.entityKey}`);
  }
  canonicalOwners.set(route.canonicalPath, route.entityKey);
}

const redirectSources = new Set();
for (const redirect of redirects) {
  if (redirectSources.has(redirect.sourcePath)) throw new Error(`Duplicate redirect source: ${redirect.sourcePath}`);
  redirectSources.add(redirect.sourcePath);
  if (redirect.sourcePath === redirect.destinationPath) throw new Error(`Self redirect: ${redirect.sourcePath}`);
}

const outDir = join(APP, "data/generated");
mkdirSync(outDir, { recursive: true });
const output = {
  schema_version: 1,
  generated_at: new Date().toISOString(),
  source: "public-products.json + productRoutes.ts + vercel.json",
  active_product_routes: routes.filter((route) => route.entityType === "product" && route.active).length,
  prepared_plan_routes: routes.filter((route) => route.entityType === "plan").length,
  routes,
  redirects,
};
writeFileSync(join(outDir, "route-registry.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`[route-registry] ${output.active_product_routes} active products, ${output.prepared_plan_routes} prepared plan routes, ${redirects.length} redirects`);
