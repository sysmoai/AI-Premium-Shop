// Catalog-derived pricing for the Bangla pages.
//
// WHY THIS EXISTS. The Bangla pages were written with prices typed in by hand,
// and every one of them drifted. GitHub Copilot was advertised at ৳1,495
// against a real ৳399, Cursor at ৳2,088 against ৳699, Claude Pro at ৳1,590
// against a ৳599 entry tier — customers on the Bangla side of the site were
// quoted up to 3.7x the real price, with a WhatsApp order button attached.
// Four "package" prices (৳2,988, ৳4,980, ৳6,990, ৳4,490) matched no tier of
// any product at all; they were invented totals.
//
// Those are the same stale figures the navbar was already fixed for once —
// see the comment in Navbar.tsx. Hand-typed prices in this repo do not stay
// correct, which is why CLAUDE.md makes deriving them from the catalog rule
// number one. These helpers make following that rule the path of least
// resistance in Bangla copy specifically, where the numerals also differ.
import { cheapestPriceFor } from "@/lib/catalogStats";

const BN = "০১২৩৪৫৬৭৮৯";

/** Western digits to Bengali, so figures match surrounding Bangla copy. */
export function bnDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => BN[Number(d)]);
}

/** "৳১,৫৯০" — grouped, Bengali numerals, taka sign. */
export function bnTaka(n: number): string {
  return `৳${bnDigits(n.toLocaleString("en-US"))}`;
}

/**
 * Cheapest real tier for a product, formatted for Bangla copy.
 * Returns null when the product is request-price, so callers render
 * "WhatsApp-এ দাম জানুন" rather than inventing a number.
 */
export function bnFrom(slug: string): string | null {
  const p = cheapestPriceFor(slug);
  return p == null ? null : bnTaka(p);
}

/** Raw cheapest price, for arithmetic (bundle totals). */
export function priceOf(slug: string): number | null {
  return cheapestPriceFor(slug);
}

/**
 * Sum of the cheapest tiers of several products. Used where a page offers a
 * combination — the total is computed from the catalog rather than typed, so
 * it cannot drift away from the parts it claims to add up.
 * Returns null if any component is request-price, since a total containing an
 * unknown is not a total.
 */
export function bnBundleTotal(slugs: string[]): { total: number; label: string } | null {
  const prices = slugs.map(priceOf);
  if (prices.some((p) => p == null)) return null;
  const total = (prices as number[]).reduce((a, b) => a + b, 0);
  return { total, label: bnTaka(total) };
}
