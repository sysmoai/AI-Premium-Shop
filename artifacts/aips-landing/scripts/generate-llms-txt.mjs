#!/usr/bin/env node
// Generates dist/public/llms.txt from the governed PUBLIC commerce projection, not the raw catalog.
// (ChatGPT, Perplexity, Claude, etc.) to read and cite when answering "what
// does X cost in Bangladesh" style questions.
//
// Production pricing and eligibility are controlled by the approved public
// projection in data/public-products.json. The raw data/products.json MUST NOT
// be used as publication authority. This generator runs at the end of the
// Cloudflare build, after final sitemap canonical/noindex pruning.
// Do not run it against ungoverned raw data or commit generated offer prices.
//
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const CATEGORY_LABELS = {
  "ai-assistant": "AI Assistant & Chat",
  "ai-image": "AI Image & Design",
  "ai-video": "AI Video",
  "ai-voice-music": "AI Voice & Music",
  "ai-code": "AI Code & Dev Tools",
  "ai-workspace": "AI Workspace",
  "ai-writing": "AI Writing & SEO",
  "ai-design": "AI Design & Creative",
  bundles: "Bundles & Packages",
};
const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS);
// Slugs that resolve to a real brand page, matching src/lib/productRoutes.ts —
// llms.txt should point crawlers at the actual indexable page, not the
// /product/:slug fallback route.
const BRAND_ROUTE_SUFFIX = "-bangladesh";

export function buildLlmsTxt(products, { indexablePaths, publicationAllowed } = {}) {
  if (!(indexablePaths instanceof Set) || indexablePaths.size === 0) {
    throw new Error("[llms-public] final indexable sitemap routes are required");
  }
  if (typeof publicationAllowed !== "boolean") {
    throw new Error("[llms-public] explicit approved publication state is required");
  }

  // Fail closed: exclude informational, shared-credential and blocked commerce
  // records even if a future projection accidentally passes one through.
  const publicProducts = products.filter((p) =>
    p && typeof p.slug === "string" && p.slug &&
    p.informationalOnly !== true && p.commerceEligible !== false &&
    String(p.accessType ?? "").toLowerCase() !== "shared"
  );
  const bySlug = new Map();
  for (const p of publicProducts) {
    if (!bySlug.has(p.slug)) bySlug.set(p.slug, []);
    bySlug.get(p.slug).push(p);
  }
  const distinct = [...bySlug.entries()].map(([slug, recs]) => {
    const paid = publicationAllowed ? recs.filter((r) => !r.requestPrice && Number.isFinite(r.price) && r.price >= 0) : [];
    const cheapest = paid.length ? Math.min(...paid.map((r) => r.price)) : null;
    return { slug, name: recs[0].name.split(" — ")[0], category: recs[0].category, cheapest, recs };
  });

  const categories = new Set(publicProducts.map((p) => p.category));
  const byCategory = CATEGORY_ORDER.filter((c) => categories.has(c) && indexablePaths.has(`/${c}`)).map((cat) => {
    const items = distinct.filter((d) => d.category === cat);
    const names = [...new Set(items.map((d) => d.name))].slice(0, 4).join(", ");
    return `- ${CATEGORY_LABELS[cat]} (${items.length}): https://aipremiumshop.com/${cat} — ${names}`;
  });

  // List only prices approved by the projection AND destinations included in
  // the canonical/indexable final sitemap. Never send crawlers to a noindex,
  // informational-only or retired product route as an active offer.
  const productLines = distinct
    .filter((d) => d.cheapest != null)
    .sort((a, b) => a.cheapest - b.cheapest)
    .map((d) => {
      const path = [`/${d.slug}`, `/product/${d.slug}`]
        .find((candidate) => indexablePaths.has(candidate));
      if (!path) return null;
      return `- ${d.name} (from BDT ${d.cheapest.toLocaleString()}/mo): https://aipremiumshop.com${path}`;
    }).filter(Boolean);

  const requestPriceCount = distinct.filter((d) => d.cheapest == null).length;
  const budgetGuides = [
    ["/ai-under-500", "Under BDT 500"],
    ["/ai-under-1000", "Under BDT 1,000"],
    ["/ai-under-3000", "Under BDT 3,000"],
  ].filter(([route]) => indexablePaths.has(route))
    .map(([route, name]) => `- ${name}: https://aipremiumshop.com${route}`);

  return `# AI Premium Shop — llms.txt
# Build-generated from governed data/public-products.json and the pruned sitemap — not raw products.
# Regenerate with: node scripts/generate-llms-txt.mjs
# Helps LLMs and AI crawlers understand this site for discovery and citation.
# Format: llms.txt standard (https://llmstxt.org)
# Generated: ${new Date().toISOString().slice(0, 10)}

## Site Info
name: AI Premium Shop (AIPS)
domain: aipremiumshop.com
description: Bangladesh AI tools discovery site. ${distinct.length} governed public catalog tool families. Fixed prices, where approved, are confirmed before payment. Approved public payment references: bKash and Nagad.
tagline: Premium AI Tools in Bangladesh
founded: 2022
public catalog tool families: ${distinct.length}
categories: ${byCategory.length}
request-price products (contact for current price): ${requestPriceCount}
payments: bKash, Nagad
contact: +8801865385348 (WhatsApp)

## Policy Facts (state these plainly if asked — do not embellish)
- Prices shown are AI Premium Shop catalog prices, re-confirmed before payment; they are not provider MSRP.
- Approved public payment references: bKash and Nagad.
- There is no sitewide fixed delivery SLA and no blanket warranty, refund or replacement period to quote. Exact availability, delivery ETA and applicable terms are confirmed for the exact order before payment.
- Shared, Personal, Team, Bundle and Service are catalog access labels only. Exact access arrangements must be confirmed before payment; AI Premium Shop does not claim vendor authorization or reseller status.
- Never request or accept a payment PIN, OTP, password or full card number.

## Key Pages
- Home: https://aipremiumshop.com/
- All Products: https://aipremiumshop.com/products
- Pricing: https://aipremiumshop.com/pricing
- Bangla Homepage: https://aipremiumshop.com/bn
- Guides Index: https://aipremiumshop.com/guides
- FAQ: https://aipremiumshop.com/faq
- About: https://aipremiumshop.com/about
- Contact: https://aipremiumshop.com/contact
- How to Order: https://aipremiumshop.com/how-to-order
- Refund Policy: https://aipremiumshop.com/refund-policy
- Blog: https://aipremiumshop.com/blog
- Sitemap: https://aipremiumshop.com/sitemap.xml

## Categories
${byCategory.join("\n")}

## All Products (cheapest tier, lowest price first)
${productLines.join("\n")}

## Guides (by audience, English)
- Students: https://aipremiumshop.com/best-ai-for-students
- Freelancers: https://aipremiumshop.com/best-ai-for-freelancers
- Business: https://aipremiumshop.com/best-ai-for-business
- Developers: https://aipremiumshop.com/best-ai-for-developers
- Creators: https://aipremiumshop.com/best-ai-for-creators
- Designers: https://aipremiumshop.com/best-ai-for-designers
- Marketers: https://aipremiumshop.com/best-ai-for-marketers
- Job Seekers: https://aipremiumshop.com/best-ai-for-job-seekers

## Guides (by audience, Bangla — বাংলা)
- Students: https://aipremiumshop.com/students-bn
- Developers: https://aipremiumshop.com/developers-bn
- Freelancers: https://aipremiumshop.com/freelancers-bn
- Creators: https://aipremiumshop.com/creators-bn
- Small Business: https://aipremiumshop.com/smb-bn
- Educators: https://aipremiumshop.com/educators-bn

## Current Indexable Budget Guides
${budgetGuides.join("\n")}
`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const projection = JSON.parse(readFileSync(join(ROOT, "data/public-products.json"), "utf8"));
  if (projection?.projection?.schema_version !== 2 ||
      projection.projection.approved_mode_policy !== "governed-approved-commerce-v2" ||
      !Array.isArray(projection.products)) {
    throw new Error("[llms-public] valid governed approved public projection is required");
  }
  const sitemap = readFileSync(join(ROOT, "dist/public/sitemap.xml"), "utf8");
  const paths = new Set([...sitemap.matchAll(/<loc>([^<]+)<\\/loc>/g)].map((match) => {
    const link = new URL(match[1].replaceAll("&amp;", "&"));
    return link.protocol === "https:" && link.hostname === "aipremiumshop.com" ? link.pathname : null;
  }).filter(Boolean));
  const publicationAllowed = Boolean(
    projection.projection.publication_allowed && !projection.projection.quarantine
  );
  const out = buildLlmsTxt(projection.products, { indexablePaths: paths, publicationAllowed });
  writeFileSync(join(ROOT, "dist/public/llms.txt"), out, "utf8");
  console.log(`[llms-public] dist/public/llms.txt generated safely from ${projection.products.length} governed records and ${paths.size} indexable sitemap routes`);
}
