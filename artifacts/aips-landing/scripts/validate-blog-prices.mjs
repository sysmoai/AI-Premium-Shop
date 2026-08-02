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
const EXEMPT = /officially|official|abroad|exchange|saving|save[ds]?\b|total|combined|bundle|package|scam|fake|lifetime|earn|income|revenue|per project|per hour|\/hour|up to|budget|under |\$|month total|stack/i;

const FILES = ["src/pages/BlogPostPage.tsx", "src/pages/BlogPage.tsx"];
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

if (problems.length) {
  console.error(`✖ validate-blog-prices: ${problems.length} price(s) do not match any catalog tier\n`);
  for (const p of problems) {
    console.error(`  ${p.file}:${p.line}  "${p.brand}" quoted at ${p.amount}`);
    console.error(`     real tiers: ${p.valid}`);
    console.error(`     ${p.text}\n`);
  }
  process.exit(1);
}
console.log(`✔ validate-blog-prices: no brand quoted at a price it does not have (${WATCHED.length} brands checked)`);
