import { useLocation } from "wouter";

/**
 * Which locale the current route is written in.
 *
 * The Bangla pages use PageLayout, so they inherit the shared Navbar, footer,
 * cookie banner and payment badges — all of which were English-only. The result
 * was a page whose body is native Bangla sitting inside English chrome
 * ("We use cookies to improve your experience.", "We Accept", an English footer
 * tagline), which is exactly the "translated English template" feel the Bangla
 * homepage brief calls out.
 *
 * Route-based rather than a stored preference on purpose: the URL is the single
 * source of truth for which language a page is in, it matches what the
 * prerender writes into `<html lang>`, and it cannot desync from the content
 * the way a cookie or localStorage value can.
 */
export function useIsBangla(): boolean {
  const [location] = useLocation();
  return isBanglaPath(location);
}

/** Pure form, for use outside a component (e.g. build scripts, tests). */
export function isBanglaPath(path: string): boolean {
  // /bn and /bn/... plus the older -bn suffix routes (/students-bn etc).
  return path === "/bn" || path.startsWith("/bn/") || /-bn$/.test(path.replace(/\/$/, ""));
}

/** Picks the Bangla string on Bangla routes, English otherwise. */
export function useT(): (en: string, bn: string) => string {
  const bangla = useIsBangla();
  return (en, bn) => (bangla ? bn : en);
}
