#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");
const rawPath = join(APP, "data/products.json");
const outPath = join(APP, "data/public-products.json");
const commercialPath = join(REPO, "ops/ssot/commercial.json");
const sitePath = join(REPO, "ops/ssot/site.json");
const RETIRED_PRODUCT_SLUGS = new Set(["replit-bangladesh"]);

const raw = JSON.parse(readFileSync(rawPath, "utf8"));
const commercial = JSON.parse(readFileSync(commercialPath, "utf8"));
const site = JSON.parse(readFileSync(sitePath, "utf8"));

const siteQuarantine = Boolean(site?.current_publication_state?.commerce_quarantine);
const commercialQuarantine = Boolean(commercial?.quarantine);
const publicationAllowed = Boolean(commercial?.publication_allowed);
const sitePublishAllowed = Boolean(site?.current_publication_state?.commerce_publish_allowed);

if (siteQuarantine !== commercialQuarantine) throw new Error("Public projection refused: site/commercial quarantine flags disagree");
if (publicationAllowed !== sitePublishAllowed) throw new Error("Public projection refused: site/commercial publication flags disagree");
if (commercialQuarantine && publicationAllowed) throw new Error("Public projection refused: commerce cannot be publishable while quarantine is active");

const HARD_UNVERIFIED = [
  /\bwarranty\b/i,
  /\b(?:full\s+)?replacement\s+guarantee\b/i,
  /\binstant\s+(?:delivery|access|activation)\b/i,
  /\b5\s*[–-]\s*(?:15|30)\s*(?:min|minutes)\b/i,
  /\btrusted\s+by\b/i,
  /\bbest[ -]?seller\b/i,
  /\blimited\s+(?:time|offer)\b/i,
  /\bmoney[ -]?back\b/i,
  /\bguaranteed\s+(?:income|permanent)\b/i,
  /\b\d{1,3}%\s*off\b/i,
  /\bauthorized\s+(?:reseller|partner|to offer)\b/i,
  /\bexclusive\s+(?:promotional\s+)?rate\b/i,
];
const NEGATION = /\b(no|not|never|without|cannot)\b/i;
const UNLIMITED_SCOPE = /\b(fair[ -]?use|provider\s+limit|subject\s+to|credit|relaxed|slow|scope|usage\s+limit|rate\s+limit|limit applies|limits apply)\b/i;

function isUnsafeClaim(value) {
  const text = String(value ?? "").trim();
  if (!text) return false;
  if (!NEGATION.test(text) && HARD_UNVERIFIED.some((pattern) => pattern.test(text))) return true;
  if (/\bunlimited\b/i.test(text) && !NEGATION.test(text) && !UNLIMITED_SCOPE.test(text)) return true;
  return false;
}

function sanitizeText(value, fallback = "") {
  if (typeof value !== "string" || !value.trim()) return fallback;
  const sentences = value.split(/(?<=[.!?।])\s+/).map((sentence) => sentence.trim()).filter(Boolean).filter((sentence) => !isUnsafeClaim(sentence));
  return sentences.length ? sentences.join(" ") : fallback;
}

function safeList(values) {
  return Array.isArray(values) ? values.map((value) => String(value ?? "").trim()).filter((value) => value && !isUnsafeClaim(value)) : [];
}

function fitTitle(value) {
  if (value.length <= 68) return value;
  const suffix = " | AI Premium Shop";
  const room = Math.max(24, 68 - suffix.length);
  return `${value.slice(0, room - 1).trimEnd()}…${suffix}`;
}

function fitDescription(value) {
  return value.length <= 158 ? value : `${value.slice(0, 157).trimEnd()}…`;
}

function safeSeo(product) {
  const displayName = String(product.name ?? "AI tool").split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
  const title = fitTitle(`${displayName} Price in Bangladesh | AI Premium Shop`);
  const metaDescription = fitDescription(`Compare current AIPS plan records for ${displayName} in Bangladesh. Confirm the access model, availability, provider limits, delivery ETA and terms before paying in BDT.`);
  return { ...(product.seo ?? {}), title, metaDescription, description: metaDescription };
}

function sanitizePlan(plan, verified) {
  if (!plan || typeof plan !== "object") return plan;
  const safe = { ...plan };
  safe.whatsIncluded = safeList(plan.whatsIncluded);
  safe.features = safeList(plan.features);
  safe.limitations = safeList(plan.limitations);
  if (plan.badge && isUnsafeClaim(plan.badge)) delete safe.badge;
  if (!verified) {
    delete safe.deliverySLA;
    delete safe.officialUSD;
    delete safe.inStock;
    delete safe.warrantyDays;
  }
  return safe;
}

function sanitizeApprovedProduct(product) {
  const safe = { ...product };
  const verified = Boolean(product?.verificationDate && product?.sourceUrl);
  const displayName = String(product?.name ?? "AI tool").split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();

  safe.description = sanitizeText(product.description, `${displayName} is listed in the current AI Premium Shop catalog. Confirm current product and plan details before purchase.`);
  if (product.tagline && isUnsafeClaim(product.tagline)) delete safe.tagline;
  if (product.badge && isUnsafeClaim(product.badge)) delete safe.badge;
  safe.capabilities = safeList(product.capabilities);
  safe.uniqueSellingPoints = safeList(product.uniqueSellingPoints);
  safe.useCasesBD = safeList(product.useCasesBD);
  safe.badges = safeList(product.badges);
  safe.seo = safeSeo(product);
  safe.plans = Array.isArray(product.plans) ? product.plans.map((plan) => sanitizePlan(plan, verified)) : product.plans;
  safe.trust = verified && product.trust ? Object.fromEntries(Object.entries(product.trust).filter(([key]) => !["reviewCount", "rating"].includes(key))) : null;

  if (!verified) {
    delete safe.deliverySLA;
    delete safe.estimatedDeliveryTime;
    delete safe.deliveryMethod;
    delete safe.officialUSD;
    delete safe.stock;
    delete safe.warrantyDays;
    delete safe.discountPercent;
    delete safe.discountLabel;
    delete safe.competitorCompare;
    delete safe.higherPlanUpsell;
    safe.faq = [];
    safe.howItWorksSteps = [];
  } else {
    safe.faq = Array.isArray(product.faq) ? product.faq : [];
    safe.howItWorksSteps = Array.isArray(product.howItWorksSteps) ? product.howItWorksSteps : [];
  }
  return safe;
}

function stripCommercialFields(product) {
  const safe = sanitizeApprovedProduct(product);
  safe.price = null;
  safe.requestPrice = true;
  safe.officialUSD = null;
  safe.accessType = null;
  safe.deliverySLA = null;
  safe.whatsappMsg = null;
  safe.activationType = null;
  safe.estimatedDeliveryTime = null;
  safe.deliveryMethod = null;
  safe.stock = null;
  safe.trust = null;
  safe.badges = [];
  delete safe.badge;
  delete safe.warrantyDays;
  delete safe.discountPercent;
  delete safe.discountLabel;
  safe.competitorCompare = [];
  safe.bundleSuggestions = [];
  safe.higherPlanUpsell = null;
  safe.howItWorksSteps = [];
  safe.faq = [];
  safe.plans = [];
  safe.relatedProducts = Array.isArray(safe.relatedProducts) ? safe.relatedProducts.map(({ priceBDT: _priceBDT, ...related }) => related) : [];
  return safe;
}

function retireProduct(product) {
  const safe = stripCommercialFields(product);
  safe.publicStatus = "retired";
  safe.description = "This historical catalog identity is retired and is not an active public commerce offer.";
  safe.seo = {
    ...(safe.seo ?? {}),
    title: "Retired Listing | AI Premium Shop",
    metaDescription: "This older listing is no longer part of the active AI Premium Shop catalog.",
    description: "This older listing is no longer part of the active AI Premium Shop catalog.",
    noindex: true,
  };
  return safe;
}

const sourceProducts = Array.isArray(raw) ? raw : raw.products ?? [];
const publicProducts = sourceProducts.map((product) => {
  if (RETIRED_PRODUCT_SLUGS.has(product.slug)) return retireProduct(product);
  if (publicationAllowed && !commercialQuarantine) return sanitizeApprovedProduct(product);
  return stripCommercialFields(product);
});

const output = {
  projection: {
    schema_version: 4,
    generated_from: "data/products.json + ops/ssot/site.json + ops/ssot/commercial.json",
    publication_allowed: publicationAllowed,
    quarantine: commercialQuarantine,
    mode: publicationAllowed && !commercialQuarantine ? "approved-commerce" : "informational-fail-closed",
    truth_policy: "unverified marketing/delivery/warranty/review/stock/discount/comparison claims are stripped; retired identities are preserved only as non-commercial tombstones",
  },
  products: publicProducts,
};

writeFileSync(outPath, `${JSON.stringify(output)}\n`, "utf8");
console.log(`[public-projection] ${publicProducts.length} identity records -> ${output.projection.mode} (truth-sanitized v${output.projection.schema_version}; retired=${publicProducts.filter((product) => product.publicStatus === "retired").length})`);