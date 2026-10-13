#!/usr/bin/env node
// Builds the AIPS keyword universe artifacts from the raw catalog plus
// maintained seed files. Demand evidence is NEVER invented: volumes and
// difficulty are recorded as UNKNOWN until a real measurement source
// (Search Console, Trends, ads data) provides them.
//
// Outputs:
//   ops/seo/keyword-universe.csv
//   ops/seo/keyword-clusters.json
//   ops/seo/keyword-url-ownership.json
//
// Usage: node scripts/build-keyword-universe.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(REPO, "ops/seo");
const catalogFile = join(REPO, "artifacts/aips-landing/data/products.json");
const routeRegistryFile = join(REPO, "artifacts/aips-landing/data/generated/route-registry.json");

const raw = JSON.parse(readFileSync(catalogFile, "utf8"));
const products = Array.isArray(raw) ? raw : raw.products ?? [];

// Known brand-level money pages: a slug is a brand page when the catalog
// convention maps it to /<slug> (see generate-concierge-catalog.mjs). We
// derive it from the route registry when present, else from the slug list
// used by the concierge build.
const registry = existsSync(routeRegistryFile)
  ? JSON.parse(readFileSync(routeRegistryFile, "utf8"))
  : null;
const registryPaths = new Set(
  Array.isArray(registry?.routes)
    ? registry.routes.map((r) => r.path)
    : Object.keys(registry?.routes ?? {}),
);

const rows = [];
const clusters = new Map();
const ownership = new Map();
let id = 1;

const add = ({ keyword, language, intent, cluster, brand, pageType, url, source, sourceDate, status, notes = "" }) => {
  const key = `${keyword}|${language}|${intent}`;
  rows.push({ id: id++, keyword, language, intent, cluster, brand, pageType, url, source, sourceDate, status, demandEvidence: "UNKNOWN", notes });
  if (!clusters.has(cluster)) clusters.set(cluster, []);
  clusters.get(cluster).push(keyword);
  const existing = ownership.get(url) ?? new Set();
  existing.add(keyword);
  ownership.set(url, existing);
};

// Templates: [label, en, bn, bnlish]
const T = {
  price: ["price", "দাম", "dam koto"],
  priceCountry: ["price in bangladesh", "বাংলাদেশে দাম", "price in bd"],
  priceCountryBd: ["price in bd", "বাংলাদেশে দাম", "bangladesh price"],
  subscription: ["subscription price", "সাবস্ক্রিপশন দাম", "subscription koto"],
  subscriptionBd: ["subscription price in bangladesh", "বাংলাদেশে সাবস্ক্রিপশন দাম", "subscription price bd"],
  monthly: ["monthly price", "মাসিক দাম", "monthly koto"],
  personal: ["personal account price bangladesh", "পার্সোনাল অ্যাকাউন্ট দাম", "personal account price"],
  bkash: ["bkash payment", "বিকাশে পেমেন্ট", "bkash diye kinbo"],
  howToBuy: ["how to buy in bangladesh", "কিনব কিভাবে", "kivabe kinbo"],
  plans: ["plans compared", "প্ল্যান তুলনা", "plans comparison"],
  worthIt: ["is it worth it", "এটা কি মূল্যবান", "worth it ki na"],
  officialVsLocal: ["official price vs local offer", "অফিসিয়াল দাম বনাম লোকাল অফার", "official vs local price"],
};

const seenBrands = new Set();
for (const p of products) {
  const brand = (p.brand ?? p.name ?? "").trim();
  if (!brand || seenBrands.has(brand)) continue;
  seenBrands.add(brand);
  const slug = p.slug ?? "";
  const isMoneyPage = slug && registryPaths.has(`/${slug}`);
  const url = isMoneyPage ? `/${slug}` : slug ? `/product/${slug}` : "/products";
  const cluster = `brand:${brand.toLowerCase()}`;
  const lower = brand.toLowerCase();
  const spelled = lower.replace(/[^a-z0-9]+/g, "");
  const src = "catalog-brand-seed";
  const d = "2026-10-14";
  add({ keyword: `${lower} ${T.priceCountryBd[0]}`, language: "en", intent: "commercial", cluster, brand, pageType: "product-money", url, source: src, sourceDate: d, status: "proposed" });
  add({ keyword: `${lower} ${T.subscription[0]}`, language: "en", intent: "commercial", cluster, brand, pageType: "product-money", url, source: src, sourceDate: d, status: "proposed" });
  add({ keyword: `${lower} ${T.plans[0]}`, language: "en", intent: "commercial", cluster, brand, pageType: "product-money", url, source: src, sourceDate: d, status: "proposed" });
  add({ keyword: `${spelled} ${T.priceCountryBd[1]}`, language: "bn", intent: "commercial", cluster, brand, pageType: "product-money", url, source: src, sourceDate: d, status: "proposed" });
  add({ keyword: `${spelled} ${T.price[2]}`, language: "bnlish", intent: "commercial", cluster, brand, pageType: "product-money", url, source: src, sourceDate: d, status: "proposed" });
}

// Use-case and category clusters (educational/comparison intents).
const useCases = [
  ["best-ai-for-students", "students", ["best ai tools for students", "best ai tools for students bangladesh", "এআই টুলস ছাত্রদের জন্য"], "guide"],
  ["best-ai-for-freelancers", "freelancers", ["best ai tools for freelancers", "best ai tools for freelancers bangladesh", "ফ্রিল্যান্সারদের জন্য এআই টুল"], "guide"],
  ["best-ai-for-business", "business", ["best ai tools for business", "ai tools for small business bangladesh", "ব্যবসার জন্য এআই টুল"], "guide"],
  ["best-ai-for-creators", "creators", ["best ai tools for content creators", "ai video tools for creators", "কন্টেন্ট ক্রিয়েটরের এআই টুল"], "guide"],
  ["best-ai-for-developers", "developers", ["best ai coding assistant", "best ai coding tools 2026", "কোডিংয়ের জন্য সেরা এআই"], "guide"],
  ["ai-under-500", "budget", ["ai tools under 500 taka", "ai subscription under bdt 500", "৫০০ টাকার মধ্যে এআই টুল"], "budget"],
  ["ai-under-1000", "budget", ["ai tools under 1000 taka", "ai subscription under bdt 1000", "১০০০ টাকার মধ্যে এআই টুল"], "budget"],
  ["ai-under-3000", "budget", ["ai tools under 3000 taka", "ai subscription under bdt 3000", "৩০০০ টাকার মধ্যে এআই টুল"], "budget"],
  ["how-to-order", "ordering", ["how to buy ai subscription in bangladesh", "pay ai tools with bkash", "এআই সাবস্ক্রিপশন কেনার নিয়ম"], "how-to"],
  ["best-ai-subscription-2026", "discovery", ["best ai subscription 2026", "best ai subscription bangladesh", "সেরা এআই সাবস্ক্রিপশন"], "guide"],
];

for (const [url, clusterName, kws, pageType] of useCases) {
  const cluster = `usecase:${clusterName}`;
  for (const k of kws) {
    const lang = /[\u0980-\u09FF]/.test(k) ? "bn" : "en";
    add({ keyword: k, language: lang, intent: "informational", cluster, brand: null, pageType, url: `/${url}`, source: "usecase-seed", sourceDate: "2026-10-14", status: "proposed" });
  }
}

// Comparison intents (Layer C). Only include pairs that have real material
// differences and existing or planned comparison pages.
const comparisons = [
  ["chatgpt-vs-claude", "chatgpt vs claude", "comparison"],
  ["chatgpt-vs-gemini", "chatgpt vs gemini", "comparison"],
  ["copilot-vs-cursor", "github copilot vs cursor", "comparison"],
  ["midjourney-vs-ideogram", "midjourney vs ideogram", "comparison"],
  ["chatgpt-vs-perplexity", "chatgpt vs perplexity", "comparison"],
  ["claude-vs-gemini", "claude vs gemini", "comparison"],
];
for (const [url, kw, type] of comparisons) {
  add({ keyword: kw, language: "en", intent: "commercial", cluster: "comparison", brand: null, pageType: type, url: `/${url}`, source: "comparison-seed", sourceDate: "2026-10-14", status: "proposed" });
  add({ keyword: `${kw} bangladesh`, language: "en", intent: "commercial", cluster: "comparison", brand: null, pageType: type, url: `/${url}`, source: "comparison-seed", sourceDate: "2026-10-14", status: "proposed" });
}

// Write CSV.
const csvHeader = "id,keyword,language,intent,cluster,brand,page_type,url,demand_evidence,source,source_date,status,notes";
const csvLines = rows.map((r) =>
  [r.id, `"${r.keyword}"`, r.language, r.intent, r.cluster, r.brand ?? "", r.pageType, r.url, r.demandEvidence, r.source, r.sourceDate, r.status, `"${r.notes}"`].join(","),
);
writeFileSync(join(OUT, "keyword-universe.csv"), `${csvHeader}\n${csvLines.join("\n")}\n`, "utf8");

// Write clusters.
const clusterObj = {};
for (const [name, kws] of clusters) clusterObj[name] = { keywords: [...new Set(kws)], count: new Set(kws).size };
writeFileSync(join(OUT, "keyword-clusters.json"), `${JSON.stringify(clusterObj, null, 2)}\n`, "utf8");

// Write URL ownership.
const ownershipObj = {};
for (const [url, kws] of ownership) ownershipObj[url] = { keywords: [...kws], count: kws.size };
writeFileSync(join(OUT, "keyword-url-ownership.json"), `${JSON.stringify(ownershipObj, null, 2)}\n`, "utf8");

console.log(`[keyword-universe] wrote ${rows.length} keyword rows across ${clusters.size} clusters and ${ownership.size} owned URLs; demand evidence intentionally UNKNOWN until measured`);
