/**
 * Pricing Safety Layer (Phase 1)
 *
 * Centralizes exchange-rate math WITHOUT changing any displayed price.
 * Each product keeps its existing `price` (BDT, FINAL, CEO-set) — the site
 * continues to display `price` exactly as before.
 *
 * The ONLY approved new use of this formula is an optional strike-through
 * comparison, e.g.:
 *   "Direct abroad: BDT {formulaPrice(officialUSD)} + international card needed"
 *
 * Never use formulaPrice() to overwrite or auto-suggest a live `price`.
 * Discrepancies belong in /data/price-review.json for manual approval.
 */

export const EXCHANGE_RATE = 130;
export const VAT = 0.15;

/**
 * Estimated cost of buying directly from abroad, in BDT:
 * round(usd * 130 * 1.15)
 *
 * Verified anchors:
 *   20 -> 2990, 8 -> 1196, 30 -> 4485, 10 -> 1495,
 *   12 -> 1794, 5 -> 748, 200 -> 29900
 */
export function formulaPrice(usd: number): number {
  // Integer math avoids floating-point drift (e.g. 5 * 130 * 1.15 = 747.4999…).
  return Math.round((usd * EXCHANGE_RATE * (100 + VAT * 100)) / 100);
}

/** Same as formulaPrice but rounded to the nearest 10 BDT (for display-friendly anchors). */
export function formulaPriceNearest10(usd: number): number {
  return Math.round(formulaPrice(usd) / 10) * 10;
}

/** Savings vs buying direct abroad. Returns null when we cannot compute a meaningful saving. */
export function savingsVsDirect(priceBDT: number, officialUSD?: number): number | null {
  if (!officialUSD || officialUSD <= 0) return null;
  const direct = formulaPrice(officialUSD);
  return direct > priceBDT ? direct - priceBDT : null;
}
