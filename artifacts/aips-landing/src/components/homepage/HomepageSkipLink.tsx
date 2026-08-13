import { useLayoutEffect } from "react";

export default function HomepageSkipLink() {
  useLayoutEffect(() => {
    const nested = document.querySelector<HTMLAnchorElement>(
      '[data-testid="homepage-v2"] > a[href="#main-content"]',
    );
    if (!nested) return;

    const previousTabIndex = nested.getAttribute("tabindex");
    const previousAriaHidden = nested.getAttribute("aria-hidden");
    nested.setAttribute("tabindex", "-1");
    nested.setAttribute("aria-hidden", "true");

    return () => {
      if (previousTabIndex === null) nested.removeAttribute("tabindex");
      else nested.setAttribute("tabindex", previousTabIndex);
      if (previousAriaHidden === null) nested.removeAttribute("aria-hidden");
      else nested.setAttribute("aria-hidden", previousAriaHidden);
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
