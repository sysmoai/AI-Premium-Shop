/**
 * Pricing Safety Layer — Master Pricing v2 (approved 2026-09-17)
 *
 * Public prices are governed by ops/ssot/pricing-v2.json and injected by the
 * governed public projection at build time. UI components must not invent or
 * silently recalculate a live selling price from this helper alone.
 *
 * This module is for cost sanity checks and comparison math only.
 */

export const EXCHANGE_RATE = 124;
export const VAT = 0.15;
export const MINIMUM_PROFIT_BDT = 500;
export const PROFIT_PER_OFFICIAL_USD_BDT = 25;

/** Estimated Bangladesh landed subscription cost before AIPS profit. */
export function landedCostBDT(officialUSD: number): number {
  return Math.round((officialUSD * EXCHANGE_RATE * (100 + VAT * 100)) / 100);
}

/**
 * Required true net profit under the approved proportional rule.
 * $20 -> at least BDT 500 target threshold; $40 -> BDT 1,000; $100 -> BDT 2,500.
 * Final governed prices are rounded upward so estimated profit exceeds the
 * threshold rather than merely touching it.
 */
export function requiredNetProfitBDT(officialUSD: number): number {
  return Math.max(MINIMUM_PROFIT_BDT, officialUSD * PROFIT_PER_OFFICIAL_USD_BDT);
}

/** Minimum unrounded customer-price floor before commercial upward rounding. */
export function minimumSellingFloorBDT(officialUSD: number): number {
  return landedCostBDT(officialUSD) + requiredNetProfitBDT(officialUSD);
}

/** Backward-compatible alias for existing direct-cost comparison surfaces. */
export function formulaPrice(usd: number): number {
  return landedCostBDT(usd);
}

/** Same as landedCostBDT but rounded to the nearest 10 BDT for explanatory display. */
export function formulaPriceNearest10(usd: number): number {
  return Math.round(landedCostBDT(usd) / 10) * 10;
}

/** Savings vs estimated direct landed cost. Null means no supported saving claim. */
export function savingsVsDirect(priceBDT: number, officialUSD?: number): number | null {
  if (!officialUSD || officialUSD <= 0) return null;
  const direct = landedCostBDT(officialUSD);
  return direct > priceBDT ? direct - priceBDT : null;
}
