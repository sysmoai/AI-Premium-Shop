import { useEffect } from "react";

/**
 * Reveals `.scroll-reveal` blocks as they enter the viewport.
 *
 * `.scroll-reveal` starts at `opacity: 0` in index.css, so ANY failure to add
 * `.visible` leaves content permanently invisible on a page with full scroll
 * height. Home.tsx and BanglaBN.tsx each had their own copy of this effect with
 * two defects, which is why it lives here now:
 *
 *   1. `threshold: 0.1` required 10% of the element to be visible. An element
 *      taller than 10x the viewport can never reach a 0.1 intersection ratio, so
 *      the tallest sections — exactly the content-heavy ones — could never
 *      reveal. `threshold: 0` fires on the first visible pixel instead.
 *
 *   2. No fallback. If the observer never fires for any reason (unsupported,
 *      a throw earlier in the effect chain, a browser that does not composite a
 *      backgrounded tab), the page stayed blank.
 *
 * Content visibility must fail OPEN. An animation that does not play is a
 * cosmetic loss; content that never appears is the page being broken.
 */
export function useScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    if (!nodes.length) return;

    const revealAll = () => nodes.forEach((el) => el.classList.add("visible"));

    // Users who asked for reduced motion get the content immediately; the CSS
    // also neutralises the transition for them.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      revealAll();
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // reveal is one-way
          }
        }
      },
      // Any visible pixel counts, and start slightly before the element scrolls
      // in so the fade finishes by the time it is properly on screen.
      { threshold: 0, rootMargin: "0px 0px 10% 0px" },
    );

    nodes.forEach((el) => observer.observe(el));

    // Fail-open backstop. If anything above has silently not worked, show the
    // content rather than leaving a blank page. 3s is long enough that it never
    // pre-empts the real animation on a normal load.
    const backstop = window.setTimeout(revealAll, 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(backstop);
    };
  }, []);
}
