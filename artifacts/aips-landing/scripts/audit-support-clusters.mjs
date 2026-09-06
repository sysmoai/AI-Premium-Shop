#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(APP, "../..");
const DIST = path.join(APP, "dist/public");
const SITE = "https://aipremiumshop.com";
const ownership = JSON.parse(fs.readFileSync(path.join(REPO, "ops/seo/support-cluster-ownership-2026-09-07.json"), "utf8"));
const projectionRaw = JSON.parse(fs.readFileSync(path.join(APP, "data/public-products.json"), "utf8"));
const products = (Array.isArray(projectionRaw) ? projectionRaw : projectionRaw.products ?? [])
  .filter((product) => product.publicStatus !== "retired" && product.slug !== "replit-bangladesh");
const routesSource = fs.readFileSync(path.join(APP, "src/lib/productRoutes.ts"), "utf8");
const brandSlugs = new Set([...routesSource.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]));
const vercel = JSON.parse(fs.readFileSync(path.join(APP, "vercel.json"), "utf8"));
const redirectSources = new Set((vercel.redirects ?? []).map((redirect) => redirect.source));

const productHref = (slug) => brandSlugs.has(slug) ? `/${slug}` : `/product/${slug}`;
const accessLabel = (mode) => mode === "personal" ? "Personal" : mode === "team" ? "Team" : mode === "bundle" ? "Bundle" : mode === "shared" ? "Shared" : (mode === "setup-service" || mode === "setup" || mode === "service") ? "Setup / service" : String(mode || "Confirm").replaceAll("-", " ");
const money = (value) => `BDT ${Number(value).toLocaleString("en-BD")}`;

function fileFor(route) { return path.join(DIST, route.replace(/^\//, ""), "index.html"); }
function family(slug) {
  const rows = products.filter((product) => product.slug === slug);
  if (!rows.length) throw new Error(`[support-cluster-audit] governed product family missing: ${slug}`);
  const fixed = rows.filter((row) => !row.requestPrice && typeof row.price === "number" && row.price > 0).map((row) => Number(row.price));
  return {
    rows,
    min: fixed.length ? Math.min(...fixed) : null,
    max: fixed.length ? Math.max(...fixed) : null,
    modes: [...new Set(rows.map((row) => row.accessType).filter(Boolean))]
  };
}
function expectedPrice(familyData) {
  if (familyData.min == null) return "Current price on request";
  if (familyData.min === familyData.max) return money(familyData.min);
  return `${money(familyData.min)}–${money(familyData.max)}`;
}
function getCanonical(html) {
  const matches = [...html.matchAll(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/gi)];
  return { count: matches.length, value: matches[0]?.[1] ?? null };
}
function jsonLdBlocks(html) {
  return [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
}
function hrefs(html) { return [...html.matchAll(/href=["']([^"']+)["']/gi)].map((match) => match[1]); }

const owners = [
  ...(ownership.comparisons ?? []).map((entry) => ({ ...entry, kind: "comparison" })),
  ...(ownership.audience_guides ?? []).map((entry) => ({ ...entry, kind: "audience" })),
  ...(ownership.budget_hubs ?? []).map((entry) => ({ ...entry, kind: "budget" })),
  { ...(ownership.umbrella ?? {}), kind: "umbrella" }
].filter((entry) => entry.route);

if (owners.length !== 20) throw new Error(`[support-cluster-audit] expected 20 support owners, found ${owners.length}`);
if (new Set(owners.map((owner) => owner.route)).size !== owners.length) throw new Error("[support-cluster-audit] duplicate canonical support route in ownership SSOT");

const titles = new Map();
let comparisons = 0;
let audiences = 0;
let budgets = 0;
let umbrella = 0;

for (const owner of owners) {
  const route = owner.route;
  if (redirectSources.has(route)) throw new Error(`[support-cluster-audit] canonical owner is configured as redirect source: ${route}`);
  const file = fileFor(route);
  if (!fs.existsSync(file)) throw new Error(`[support-cluster-audit] missing generated owner ${route}`);
  const html = fs.readFileSync(file, "utf8");
  const lower = html.toLowerCase();
  const canonical = getCanonical(html);
  if (canonical.count !== 1 || canonical.value !== `${SITE}${route}`) throw new Error(`[support-cluster-audit] ${route} canonical mismatch: count=${canonical.count}, value=${canonical.value}`);
  if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) throw new Error(`[support-cluster-audit] ${route} is unexpectedly noindex`);
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) throw new Error(`[support-cluster-audit] ${route} must have exactly one H1`);
  if (!lower.includes(`data-go6-support-links="${route.toLowerCase()}"`)) throw new Error(`[support-cluster-audit] ${route} missing GO6 canonical link graph`);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) throw new Error(`[support-cluster-audit] ${route} missing title`);
  if (titles.has(title)) throw new Error(`[support-cluster-audit] duplicate title between ${titles.get(title)} and ${route}: ${title}`);
  titles.set(title, route);

  for (const block of jsonLdBlocks(html)) {
    const schema = block.toLowerCase();
    if (/"@type"\s*:\s*"(?:product|offer|aggregateoffer|aggregaterating|review)"/.test(schema)) {
      throw new Error(`[support-cluster-audit] ${route} contains commerce/review JSON-LD not allowed on support owners`);
    }
  }
  for (const href of hrefs(html)) {
    const local = href.startsWith(SITE) ? new URL(href).pathname : href.startsWith("/") ? href.split(/[?#]/)[0] : null;
    if (local && redirectSources.has(local)) throw new Error(`[support-cluster-audit] ${route} links to redirect-source alias ${local}`);
  }

  if (owner.kind === "comparison") {
    comparisons += 1;
    if (!lower.includes(`data-go6-comparison="${route.toLowerCase()}"`)) throw new Error(`[support-cluster-audit] ${route} missing governed comparison marker`);
    for (const phrase of ["you can use shared access", "compare shared plans", "shared-access arrangement"]) {
      if (lower.includes(phrase)) throw new Error(`[support-cluster-audit] ${route} still contains stale access advice: ${phrase}`);
    }
    if (!Array.isArray(owner.product_slugs) || owner.product_slugs.length !== 2) throw new Error(`[support-cluster-audit] ${route} comparison mapping must have two products`);
    for (const slug of owner.product_slugs) {
      const current = family(slug);
      const expectedAccess = current.modes.length ? current.modes.map(accessLabel).join(", ") : "Confirm before payment";
      const expectedPriceText = expectedPrice(current);
      if (!lower.includes(`data-go6-product="${slug.toLowerCase()}"`)) throw new Error(`[support-cluster-audit] ${route} missing governed row for ${slug}`);
      if (!html.includes(expectedPriceText)) throw new Error(`[support-cluster-audit] ${route} missing current price evidence for ${slug}: ${expectedPriceText}`);
      if (!html.includes(expectedAccess)) throw new Error(`[support-cluster-audit] ${route} missing current access evidence for ${slug}: ${expectedAccess}`);
      if (!hrefs(html).includes(productHref(slug))) throw new Error(`[support-cluster-audit] ${route} missing canonical product owner link for ${slug}`);
    }
    const schema = jsonLdBlocks(html).join("\n").toLowerCase();
    if (!schema.includes('"@type":"breadcrumblist"')) throw new Error(`[support-cluster-audit] ${route} missing static BreadcrumbList semantics`);
    if (schema.includes('"@type":"webpage"')) throw new Error(`[support-cluster-audit] ${route} static WebPage would duplicate the React runtime WebPage after hydration`);
  } else if (owner.kind === "budget") {
    budgets += 1;
    const records = products.filter((product) => !product.requestPrice && typeof product.price === "number" && product.price > 0 && product.price <= Number(owner.max_bdt));
    const families = new Set(records.map((product) => product.slug)).size;
    if (!html.includes(`<strong>${records.length}</strong> fixed-price plan records across <strong>${families}</strong> tool families`)) throw new Error(`[support-cluster-audit] ${route} plan/family counts diverge from governed projection`);
    for (const phrase of ["best value", "cheapest premium", "biggest savings", "% off"]) if (lower.includes(phrase)) throw new Error(`[support-cluster-audit] ${route} contains ranking/discount claim: ${phrase}`);
  } else if (owner.kind === "audience") {
    audiences += 1;
    for (const slug of owner.product_slugs ?? []) {
      if (!products.some((product) => product.slug === slug)) continue;
      if (!hrefs(html).includes(productHref(slug))) throw new Error(`[support-cluster-audit] ${route} missing mapped current product owner link for ${slug}`);
    }
  } else if (owner.kind === "umbrella") {
    umbrella += 1;
    if (lower.includes("universal product ranking") && !lower.includes("not a universal product ranking")) throw new Error(`[support-cluster-audit] ${route} makes an unsupported universal ranking claim`);
  }
}

if (comparisons !== 7 || audiences !== 9 || budgets !== 3 || umbrella !== 1) throw new Error(`[support-cluster-audit] owner-kind counts unexpected: comparisons=${comparisons}, audiences=${audiences}, budgets=${budgets}, umbrella=${umbrella}`);
console.log(`[support-cluster-audit] PASS: ${owners.length} canonical support owners (${comparisons} comparisons, ${audiences} audience guides, ${budgets} budget hubs, ${umbrella} umbrella); governed price/access aligned; static/runtime schema ownership single; legacy aliases and commerce/review schema excluded`);
