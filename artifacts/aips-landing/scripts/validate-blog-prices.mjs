// Checks hand-typed BDT figures in blog prose against the catalog.
//
// Exists because "Claude Pro — BDT 1,495" shipped on seven surfaces (excerpt
// in two files, meta description, an h2, two comparison tables and Bangla body
// copy) while Claude's real tiers are 599 / 1,590 / 2,990 / 3,990 / 14,950 /
// 29,900. 1,495 IS a real price — GitHub Copilot Pro — which is exactly why
// the mix-up survived review. ProductBox is catalog-derived now; prose is not.
//
// Attribution rule, deliberately conservative: a figure is only checked
// against a brand when that brand is the ONLY watched brand within the short
// window before it, and the surrounding text is not a range, a saving, a
// total, an official/abroad price or a quoted scam price. Everything else is
// left alone — a noisy gate gets muted, and a muted gate catches nothing.
//
//   node scripts/validate-blog-prices.mjs      (exit 1 on mismatch)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const { products } = JSON.parse(fs.readFileSync(path.join(APP, "data/products.json"), "utf8"));

const pricesByBrand = new Map();
for (const p of products) {
  if (typeof p.price !== "number") continue;
  for (const key of [p.brand, p.name].filter(Boolean)) {
    const norm = String(key).toLowerCase();
    if (!pricesByBrand.has(norm)) pricesByBrand.set(norm, new Set());
    pricesByBrand.get(norm).add(p.price);
  }
}

// Distinctive brands only. Generic tokens ("google", "notion") appear in prose
// about other subjects and would produce noise.
const WATCHED = ["claude", "chatgpt", "midjourney", "perplexity", "elevenlabs",
  "suno", "cursor", "copilot", "canva", "grammarly", "runway", "heygen"];

// Contexts where a number legitimately is not this brand's AIPS tier price.
// A literal "+" in the window ("ChatGPT + Notion ৳1,150", "+ Claude Pro BDT
// 7,475") marks an additive combo/stack total, not a single product's price
// — those can't be checked against one brand's tier list at all.
const EXEMPT = /officially|official|abroad|exchange|saving|save[ds]?\b|total|combined|bundle|package|scam|fake|lifetime|earn|income|revenue|per project|per hour|\/hour|up to|budget|under |\$|month total|stack|\+/i;

const FILES = ["src/pages/BlogPostPage.tsx", "src/pages/BlogPage.tsx", "src/pages/GuidePage.tsx"];
const problems = [];

for (const rel of FILES) {
  const lines = fs.readFileSync(path.join(APP, rel), "utf8").split("\n");
  lines.forEach((line, i) => {
    if (/^\s*\/\//.test(line)) return; // our own comments about past bugs
    const lower = line.toLowerCase();
    for (const m of line.matchAll(/(?:BDT|৳)\s?([\d,]{3,7})/g)) {
      const amount = Number(m[1].replace(/,/g, ""));
      if (!Number.isFinite(amount) || amount < 100) continue;

      // Ranges like "BDT 5,000-15,000" describe earnings, not a tier price.
      const after = line.slice(m.index + m[0].length, m.index + m[0].length + 3);
      if (/^\s*[-–]\s*\d/.test(after)) continue;

      const windowText = lower.slice(Math.max(0, m.index - 55), m.index);
      if (EXEMPT.test(windowText)) continue;

      // If another figure sits between the brand and this one, this figure
      // belongs to whatever came after that brand — e.g. "Cursor Pro (৳2,990)
      // or Replit Core (৳500)", where ৳500 is Replit's, not Cursor's.
      if (/(?:BDT|৳)\s?[\d,]{3,7}/.test(windowText)) continue;

      const near = WATCHED.filter((b) => windowText.includes(b));
      if (near.length !== 1) continue; // ambiguous or unattributed — skip

      const brand = near[0];
      const valid = pricesByBrand.get(brand);
      if (!valid?.size || valid.has(amount)) continue;

      problems.push({ file: rel, line: i + 1, brand, amount,
        valid: [...valid].sort((a, b) => a - b).join(", "), text: line.trim().slice(0, 110) });
    }
  });
}

// --- Structured check: `slug: "x-bangladesh", price: "BDT N/month"` pairs.
// This shape (persona guides, GuidePage.tsx's tool tables, DevelopersBN) names
// the exact catalog slug next to the price, so unlike free-form prose it can
// be checked exactly rather than by fuzzy brand-proximity — and it's exactly
// where this bug keeps recurring: three separate persona guides quoted
// Claude Pro at 1,495 (Copilot's real price) on top of the seven earlier
// prose surfaces. Every file with this literal shape should be listed here.
const STRUCTURED_FILES = [
  "src/pages/guides/StudentsGuide.tsx",
  "src/pages/guides/FreelancersGuide.tsx",
  "src/pages/guides/CreatorsGuide.tsx",
  "src/pages/guides/SMBGuide.tsx",
  "src/pages/guides/EducatorsGuide.tsx",
  "src/pages/GuidePage.tsx",
  "src/pages/DevelopersBN.tsx",
];
const pricesBySlug = new Map();
for (const p of products) {
  if (typeof p.price !== "number") continue;
  if (!pricesBySlug.has(p.slug)) pricesBySlug.set(p.slug, new Set());
  pricesBySlug.get(p.slug).add(p.price);
}
const structuredProblems = [];
for (const rel of STRUCTURED_FILES) {
  const full = path.join(APP, rel);
  if (!fs.existsSync(full)) continue;
  const src = fs.readFileSync(full, "utf8");
  for (const m of src.matchAll(/slug:\s*"([a-z0-9-]+)",\s*price:\s*"(?:BDT|৳)\s?([\d,]+)\/month"/g)) {
    const [, slug, amountStr] = m;
    const amount = Number(amountStr.replace(/,/g, ""));
    const valid = pricesBySlug.get(slug);
    if (!valid?.size || valid.has(amount)) continue;
    const line = src.slice(0, m.index).split("\n").length;
    structuredProblems.push({ file: rel, line, slug, amount, valid: [...valid].sort((a, b) => a - b).join(", ") });
  }
}

const allProblems = [...problems.map((p) => ({ ...p, kind: "prose" })), ...structuredProblems.map((p) => ({ ...p, kind: "structured" }))];

if (allProblems.length) {
  console.error(`✖ validate-blog-prices: ${allProblems.length} price(s) do not match any catalog tier\n`);
  for (const p of allProblems) {
    if (p.kind === "structured") {
      console.error(`  ${p.file}:${p.line}  slug "${p.slug}" quoted at ${p.amount}`);
    } else {
      console.error(`  ${p.file}:${p.line}  "${p.brand}" quoted at ${p.amount}`);
      console.error(`     ${p.text}`);
    }
    console.error(`     real tiers: ${p.valid}\n`);
  }
  process.exit(1);
}
console.log(`✔ validate-blog-prices: no brand/slug quoted at a price it does not have (${WATCHED.length} brands + ${STRUCTURED_FILES.length} structured files checked)`);
