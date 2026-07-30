import { useEffect } from "react";

const DEFAULT_OG_IMAGE = "https://aipremiumshop.com/images/og/default-og.png";
const SITE_URL = "https://aipremiumshop.com";

interface JsonLdEntry {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

interface SEOHeadProps {
  title: string;
  description?: string;
  canonical?: string;
  ogUrl?: string;
  ogImage?: string;
  /** Additional OG images for social sharing diversity */
  ogImages?: string[];
  /** JSON-LD structured data entries to inject */
  jsonLd?: JsonLdEntry[];
  /** Hreflang tags: e.g. { en: "/", bn: "/faq" } */
  hreflang?: Record<string, string>;
  /**
   * Set true on pages that should never be indexed (currently: NotFound).
   * Every unmatched path returns HTTP 200 through the SPA's catch-all
   * rewrite, so without an explicit noindex a crawler has no signal that
   * this isn't real content — it would happily index the 404 page under
   * every mistyped/removed URL it finds.
   */
  noindex?: boolean;
}

const SITE_NAME = "AI Premium Shop";
const DEFAULT_DESC =
  "Bangladesh's most trusted AI subscription shop. ChatGPT Plus from BDT 499, Google AI Pro BDT 499. Pay with bKash or Nagad. Delivered in minutes. thousands happy customers.";

export function SEOHead({
  title,
  description = DEFAULT_DESC,
  canonical,
  ogUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogImages,
  jsonLd,
  hreflang,
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ?? (ogUrl ?? SITE_URL);

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (sel: string, content: string) => {
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement("meta");
        const [, attr, val] = sel.match(/\[(\w+[\w:]+)=\"([^\"]+)\"\]/) ?? [];
        if (attr && val) {
          (el as HTMLMetaElement).setAttribute(attr, val);
          document.head.appendChild(el);
        }
      }
      (el as HTMLMetaElement).setAttribute("content", content);
    };


    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };


    // Basic meta
    setMeta('meta[name="description"]', description);
    // Explicit either way, not just "absent = indexable": a page that WAS
    // noindexed (e.g. user hits a bad URL) then navigates client-side to a
    // real page must not leave the noindex tag behind on the new page.
    setMeta('meta[name="robots"]', noindex ? "noindex, nofollow" : "index, follow");

    // OG tags
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:site_name"]', SITE_NAME);
    setMeta('meta[property="og:type"]', "website");
    setMeta('meta[property="og:locale"]', "en_BD");
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[property="og:image:width"]', "1200");
    setMeta('meta[property="og:image:height"]', "630");

    // Additional OG images
    if (ogImages && ogImages.length > 0) {
      ogImages.forEach((img, i) => {
        if (i === 0) return; // first is already set as the primary
        setMeta(`meta[property="og:image"][data-idx="${i}"]`, img);
      });
    }

    // Twitter Card
    setMeta('meta[name="twitter:card"]', "summary_large_image");
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', ogImage);

    // Canonical
    setLink("canonical", canonicalUrl);

    // Hreflang — remove existing, set new
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (hreflang) {
      Object.entries(hreflang).forEach(([lang, path]) => {
        const href = path.startsWith("http") ? path : `${SITE_URL}${path}`;
        const link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", lang);
        link.setAttribute("href", href);
        document.head.appendChild(link);
      });
    }
    // Always keep x-default
    if (!hreflang?.["x-default"]) {
      const xd = document.createElement("link");
      xd.setAttribute("rel", "alternate");
      xd.setAttribute("hreflang", "x-default");
      xd.setAttribute("href", SITE_URL);
      document.head.appendChild(xd);
    }

    // JSON-LD structured data — remove old, inject new
    document.querySelectorAll('script[type="application/ld+json"][data-seo]').forEach((el) => el.remove());
    if (jsonLd && jsonLd.length > 0) {
      jsonLd.forEach((entry) => {
        const script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute("data-seo", "true");
        script.textContent = JSON.stringify(entry);
        document.head.appendChild(script);
      });
    }

    return () => {
      document.title = SITE_NAME;
      // Reset robots to indexable on unmount so a noindex page (NotFound)
      // never leaves the tag behind for whatever page mounts next.
      setMeta('meta[name="robots"]', "index, follow");
    };
  }, [fullTitle, description, canonicalUrl, ogImage, ogImages, jsonLd, hreflang, noindex]);

  return null;
}
