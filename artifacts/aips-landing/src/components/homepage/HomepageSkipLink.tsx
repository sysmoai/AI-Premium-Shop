import { useLayoutEffect } from "react";

const LEGACY_SKIP_SELECTOR = '[data-testid="homepage-v2"] > a[href="#main-content"]';

export default function HomepageSkipLink() {
  useLayoutEffect(() => {
    const guarded = new Map<HTMLAnchorElement, { tabIndex: string | null; ariaHidden: string | null }>();

    const guardNestedSkip = () => {
      const nested = document.querySelector<HTMLAnchorElement>(LEGACY_SKIP_SELECTOR);
      if (!nested || guarded.has(nested)) return;

      guarded.set(nested, {
        tabIndex: nested.getAttribute("tabindex"),
        ariaHidden: nested.getAttribute("aria-hidden"),
      });
      nested.setAttribute("tabindex", "-1");
      nested.setAttribute("aria-hidden", "true");
    };

    guardNestedSkip();
    const observer = new MutationObserver(guardNestedSkip);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      for (const [nested, previous] of guarded) {
        if (previous.tabIndex === null) nested.removeAttribute("tabindex");
        else nested.setAttribute("tabindex", previous.tabIndex);
        if (previous.ariaHidden === null) nested.removeAttribute("aria-hidden");
        else nested.setAttribute("aria-hidden", previous.ariaHidden);
      }
    };
  }, []);

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-[#f4b942] focus:px-4 focus:py-3 focus:font-bold focus:text-[#07101f]"
    >
      Skip to main content
    </a>
  );
}
