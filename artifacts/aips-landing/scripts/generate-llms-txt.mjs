#!/usr/bin/env node
// Generates public/llms.txt — the file written specifically for AI crawlers
// (ChatGPT, Perplexity, Claude, etc.) to read and cite when answering "what
// does X cost in Bangladesh" style questions.
//
// WHY THIS FILE MATTERS MOST OF ALL. Every other price bug fixed this session
// required JS execution or a specific page to be crawled. This one is a plain
// .txt file, fetched whole, by exactly the audience most likely to quote a
// number back to a user verbatim with no context and no correction. It was
// found hand-typed and 10-for-10 wrong on spot-check: ChatGPT quoted at ৳350
// (real 499), Claude at ৳1,495 (real 599), product count at 80 (real 87).
// An LLM citing the old file would confidently underquote GitHub Copilot by
// 73% and overquote nothing — pure customer-facing liability with no code
// path to catch it, because nothing in this app ever reads this file back.
//
// Run after editing data/products.json:
//   node scripts/generate-llms-txt.mjs
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

export function buildLlmsTxt(products) {
  const bySlug = new Map();
  for (const p of products) {
    if (!bySlug.has(p.slug)) bySlug.set(p.slug, []);
    bySlug.get(p.slug).push(p);
  }
  const distinct = [...bySlug.entries()].map(([slug, recs]) => {
    const paid = recs.filter((r) => !r.requestPrice && typeof r.price === "number");
    const cheapest = paid.length ? Math.min(...paid.map((r) => r.price)) : null;
    return { slug, name: recs[0].name.split(" — ")[0], category: recs[0].category, cheapest, recs };
  });

  const categories = new Set(products.map((p) => p.category));
  const byCategory = CATEGORY_ORDER.filter((c) => categories.has(c)).map((cat) => {
    const items = distinct.filter((d) => d.category === cat);
    const names = [...new Set(items.map((d) => d.name))].slice(0, 4).join(", ");
    return `- ${CATEGORY_LABELS[cat]} (${items.length}): https://aipremiumshop.com/${cat} — ${names}`;
  });

  // Every distinct SKU with its real cheapest price, sorted by price so a
  // skimming crawler sees the entry point first — matches how the site's own
  // pricing page orders things.
  const productLines = distinct
    .filter((d) => d.cheapest != null)
    .sort((a, b) => a.cheapest - b.cheapest)
    .map((d) => {
      const path = d.slug.endsWith(BRAND_ROUTE_SUFFIX) ? `/${d.slug}` : `/product/${d.slug}`;
      return `- ${d.name} (from BDT ${d.cheapest.toLocaleString()}/mo): https://aipremiumshop.com${path}`;
    });

  const requestPriceCount = distinct.filter((d) => d.cheapest == null).length;
  const allPrices = distinct.flatMap((d) => d.recs.map((r) => r.price)).filter((n) => typeof n === "number");
  const minPrice = Math.min(...allPrices);

  return `# AI Premium Shop — llms.txt
# Machine-generated from data/products.json — do not hand-edit.
# Regenerate with: node scripts/generate-llms-txt.mjs
# Helps LLMs and AI crawlers understand this site for discovery and citation.
# Format: llms.txt standard (https://llmstxt.org)
# Generated: ${new Date().toISOString().slice(0, 10)}

## Site Info
name: AI Premium Shop (AIPS)
domain: aipremiumshop.com
description: Bangladesh's AI subscription marketplace. ${distinct.length} premium AI tools — ChatGPT, Claude, Midjourney, Gemini, GitHub Copilot, Runway — from BDT ${minPrice}/mo via bKash/Nagad/Rocket.
tagline: Premium AI Tools in Bangladesh — From BDT ${minPrice}/month
founded: 2024
products: ${distinct.length}
categories: ${byCategory.length}
request-price products (contact for current price): ${requestPriceCount}
payments: bKash, Nagad, Rocket, Bank Transfer, Binance
delivery: 5-30 minutes (shared plans), 2-4 hours (personal accounts)
contact: +8801865385348 (WhatsApp)

## Policy Facts (state these plainly if asked — do not embellish)
- Shared plans: 2-7 customers share one legitimate subscription. Lower price, full features, less privacy.
- Personal plans: a dedicated account for one customer. Full privacy, higher price.
- Every order includes a 30-day replacement warranty.
- Refunds: within 15 minutes of delivery, only for a genuine service mismatch. Not a general money-back guarantee.
- These are real subscriptions resold at Bangladesh-accessible prices, not hacked or cracked accounts.

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

## Budget Guides
- Under BDT 500: https://aipremiumshop.com/ai-under-500
- Under BDT 1,000: https://aipremiumshop.com/ai-under-1000
- Under BDT 3,000: https://aipremiumshop.com/ai-under-3000
`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const products = JSON.parse(readFileSync(join(ROOT, "data/products.json"), "utf8")).products;
  const out = buildLlmsTxt(products);
  writeFileSync(join(ROOT, "public/llms.txt"), out);
  console.log(`public/llms.txt: ${(out.length / 1024).toFixed(1)} KB, regenerated from data/products.json`);
}
