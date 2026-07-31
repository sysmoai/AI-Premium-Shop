// Single source of truth for every catalog NUMBER shown on the site.
//
// Why this exists: counts and "from ৳X" prices used to be hand-written into
// data/categories.json and into individual sections. They drifted badly from
// data/products.json — 8 of 9 category counts were wrong (ai-workspace showed
// "5 tools" for 22), four categories advertised a "from" price BELOW anything
// actually purchasable (ai-assistant said ৳350 when the cheapest is ৳499), and
// the headline "118+ AI Tools" was really the count of priced plan SKUs, not
// tools. Everything here is derived from products.json at build time, so these
// numbers cannot drift again. Never hard-code a catalog count in a component —
// import it from here.
//
// Vocabulary (kept deliberately distinct, because conflating them is what
// produced the wrong claims):
//   PRODUCT / "tool" = one distinct slug, e.g. "claude-pro-bangladesh".
//   PLAN / SKU       = one record in products.json, i.e. a single price tier
//                      of a product ("Claude Pro — Starter Shared").
import productsData from "../../data/products.json";

interface RawProduct {
  slug: string;
  name: string;
  category: string;
  brand?: string;
  tier?: string;
  price: number | null;
  requestPrice?: boolean;
}

const products = (productsData as { products: RawProduct[] }).products;

/** Cheapest listed price per distinct product. Request-price products are
 *  absent — they have no published number and must never be averaged in. */
const cheapestBySlug = new Map<string, number>();
for (const p of products) {
  if (p.requestPrice || p.price == null) continue;
  const cur = cheapestBySlug.get(p.slug);
  if (cur == null || p.price < cur) cheapestBySlug.set(p.slug, p.price);
}

const allSlugs = new Set(products.map((p) => p.slug));
const listedPrices = products
  .filter((p) => !p.requestPrice && p.price != null)
  .map((p) => p.price as number);

/** Distinct products ("tools") in the catalog. */
export const TOTAL_PRODUCTS = allSlugs.size;

/** Total purchasable plan tiers across all products. */
export const TOTAL_PLANS = products.length;

/** Lowest and highest published prices, in BDT. */
export const MIN_PRICE = Math.min(...listedPrices);
export const MAX_PRICE = Math.max(...listedPrices);

/** Products whose price is quoted on WhatsApp rather than published. */
export const REQUEST_PRICE_PRODUCTS = TOTAL_PRODUCTS - cheapestBySlug.size;

/** Per-category product count and true lowest price. */
export interface CategoryStats {
  productCount: number;
  fromPrice: number | null;
}
const byCategory = new Map<string, CategoryStats>();
{
  const slugsPerCat = new Map<string, Set<string>>();
  const minPerCat = new Map<string, number>();
  for (const p of products) {
    if (!slugsPerCat.has(p.category)) slugsPerCat.set(p.category, new Set());
    slugsPerCat.get(p.category)!.add(p.slug);
    if (p.requestPrice || p.price == null) continue;
    const cur = minPerCat.get(p.category);
    if (cur == null || p.price < cur) minPerCat.set(p.category, p.price);
  }
  for (const [cat, slugs] of slugsPerCat) {
    byCategory.set(cat, { productCount: slugs.size, fromPrice: minPerCat.get(cat) ?? null });
  }
}

export function categoryStats(categoryId: string): CategoryStats {
  return byCategory.get(categoryId) ?? { productCount: 0, fromPrice: null };
}

/** How many distinct products a shopper can actually buy within a budget band,
 *  judged by each product's CHEAPEST tier — the number a shopper filtering by
 *  budget would actually see. Counting every tier instead would let one product
 *  inflate several bands at once, which is how "Premium 30+" ended up on a band
 *  that really holds 3 products. */
export function productsInPriceRange(min: number, max: number): number {
  let n = 0;
  for (const price of cheapestBySlug.values()) if (price >= min && price <= max) n++;
  return n;
}

/** Cheapest listed price for one product, or null if it's request-price only.
 *  Use this anywhere a single product's headline price is shown, so a card
 *  never advertises a mid-tier price while its neighbours show entry prices. */
export function cheapestPriceFor(slug: string): number | null {
  return cheapestBySlug.get(slug) ?? null;
}

/** Price of one specific tier of one product, e.g. tierPrice("claude-pro-
 *  bangladesh", "Premium Shared"). Returns null for request-price tiers or if
 *  the (slug, tier) pair no longer exists — callers must handle null rather
 *  than fall back to a stale literal. */
export function tierPrice(slug: string, tier: string): number | null {
  const rec = products.find((p) => p.slug === slug && p.tier === tier);
  if (!rec || rec.requestPrice || rec.price == null) return null;
  return rec.price;
}

/** Brand-level rollup, for nav/menu entries that point at a brand hub page
 *  rather than one slug (e.g. "ChatGPT" spans chatgpt-plus / -go / -business,
 *  and its nav link targets /chatgpt-plans-bangladesh, which owns no records
 *  of its own — so a slug lookup would find nothing). Matched on the `brand`
 *  field exactly. */
const brandIndex = new Map<string, { plans: number; fromPrice: number | null }>();
for (const p of products) {
  const b = p.brand;
  if (!b) continue;
  const cur = brandIndex.get(b) ?? { plans: 0, fromPrice: null };
  cur.plans += 1;
  if (!p.requestPrice && p.price != null && (cur.fromPrice == null || p.price < cur.fromPrice)) {
    cur.fromPrice = p.price;
  }
  brandIndex.set(b, cur);
}

export function brandStats(brand: string): { plans: number; fromPrice: number | null } {
  return brandIndex.get(brand) ?? { plans: 0, fromPrice: null };
}

/** "৳299" — formatted with the local currency symbol. */
export function taka(n: number): string {
  return `৳${n.toLocaleString("en-US")}`;
}

/**
 * Cheapest listed price for a product looked up by display name.
 *
 * Guide pages describe stacks by name ("ChatGPT Plus", "Grammarly Premium")
 * rather than slug, so this is the lookup they need. Names are matched against
 * the base product name with any " — Tier" suffix stripped, the same way
 * api/_catalog.json is built.
 */
export function cheapestByName(name: string): number | null {
  // Resolve the name to a SLUG first, then price across every record on that
  // slug. Matching on name alone is wrong: sibling tiers of one product do not
  // all share a base name. "GitHub Copilot — Shared" (BDT 399) and "GitHub
  // Copilot Pro — Personal" (BDT 1,495) are the same slug and the same product
  // page, so a name-only lookup for "GitHub Copilot Pro" saw only the
  // expensive tier and priced a student stack at BDT 2,992 instead of 1,896.
  const slug = products.find((p) => p.name.split(" — ")[0] === name)?.slug;
  if (!slug) return null;
  let best: number | null = null;
  for (const p of products) {
    if (p.slug !== slug || p.requestPrice) continue;
    if (typeof p.price === "number" && (best == null || p.price < best)) best = p.price;
  }
  return best;
}

/**
 * Total of the cheapest tier of each named product.
 *
 * Stack totals on the guide pages were typed by hand and every one of them had
 * drifted from the products it claimed to add up — the Freelancers stack
 * advertised BDT 1,998 for BDT 1,497 of tools, the Students Pro stack BDT
 * 2,293 for BDT 1,896. Returns null if any component is unknown or
 * request-price, because a total containing an unknown is not a total.
 */
export function stackTotal(names: string[]): number | null {
  let sum = 0;
  for (const n of names) {
    const p = cheapestByName(n);
    if (p == null) return null;
    sum += p;
  }
  return sum;
}
