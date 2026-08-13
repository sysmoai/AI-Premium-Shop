#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const projection = JSON.parse(readFileSync(join(APP, "data/public-products.json"), "utf8"));
const products = projection.products ?? [];
const productRoutes = readFileSync(join(APP, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...productRoutes.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]));

const slugify = (value) => String(value ?? "plan")
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 80) || "plan";
const cleanName = (name) => String(name ?? "Product").split(/—\s*/)[0].trim();
const parentPath = (slug) => brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`;

const groups = new Map();
for (const product of products) {
  if (!groups.has(product.slug)) groups.set(product.slug, []);
  groups.get(product.slug).push(product);
}

const plans = [];
for (const [productSlug, records] of groups) {
  const seen = new Set();
  const product = records[0];

  const addPlan = (raw, source, fallbackName) => {
    const planName = raw.planName ?? raw.tier ?? raw.name ?? fallbackName ?? "Plan";
    let planKey = slugify(planName);
    if (seen.has(planKey)) {
      const qualifier = raw.deliveryType ?? raw.accessType ?? source;
      planKey = `${planKey}-${slugify(qualifier)}`;
    }
    if (seen.has(planKey)) return;
    seen.add(planKey);

    const numericPrice = typeof raw.priceBDT === "number"
      ? raw.priceBDT
      : typeof raw.price === "number" ? raw.price : null;
    const requestPrice = Boolean(product.requestPrice || raw.requestPrice || numericPrice == null);

    plans.push({
      productSlug,
      productName: cleanName(product.name),
      brand: product.brand ?? null,
      brandSlug: product.brandSlug ?? null,
      brandColor: product.brandColor ?? null,
      category: product.category,
      planKey,
      planName,
      canonicalPath: `/product/${productSlug}/plans/${planKey}`,
      parentCanonicalPath: parentPath(productSlug),
      indexPolicy: "CANONICAL_PARENT",
      publicationMode: projection.projection?.mode ?? "unknown",
      requestPrice,
      priceBDT: requestPrice ? null : numericPrice,
      officialUSD: requestPrice ? null : (raw.officialUSD ?? null),
      billingCycle: raw.billingCycle ?? "monthly",
      accessType: raw.deliveryType ?? raw.accessType ?? null,
      features: raw.features ?? raw.whatsIncluded ?? raw.capabilities ?? product.capabilities ?? [],
      whatsIncluded: raw.whatsIncluded ?? raw.features ?? raw.capabilities ?? product.capabilities ?? [],
      limitations: raw.limitations ?? [],
      bestFor: raw.bestFor ?? null,
      deliverySLA: requestPrice ? null : (raw.deliverySLA ?? product.deliverySLA ?? null),
      badge: requestPrice ? null : (raw.badge ?? product.badge ?? null),
      source,
    });
  };

  for (const record of records) {
    if (Array.isArray(record.plans) && record.plans.length) {
      for (const plan of record.plans) addPlan(plan, "nested-plan", record.tier ?? record.name);
    } else {
      addPlan(record, "catalog-record", record.tier ?? record.name);
    }
  }
}

const output = {
  schema_version: 1,
  generated_at: new Date().toISOString(),
  publication: projection.projection,
  index_default: "CANONICAL_PARENT",
  plans,
};
const outDir = join(APP, "public/generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "plan-catalog.json"), `${JSON.stringify(output)}\n`, "utf8");
console.log(`[plan-catalog] ${plans.length} dedicated plan views prepared from ${groups.size} products`);
