import { useEffect } from "react";

const DEFAULT_OG_IMAGE = "https://aipremiumshop.com/images/og/default-og.png";

interface SEOHeadProps {
  title: string;
  description?: string;
  canonical?: string;
  ogUrl?: string;
  ogImage?: string;
}

const SITE_NAME = "AI Premium Shop";
const DEFAULT_DESC =
  "Bangladesh's most trusted AI subscription shop. ChatGPT Plus from BDT 350, Google AI Pro BDT 500. Pay with bKash or Nagad. Delivered in minutes. 1,200+ happy customers.";

export function SEOHead({
  title,
  description = DEFAULT_DESC,
  canonical,
  ogUrl,
  ogImage = DEFAULT_OG_IMAGE,
}: SEOHeadProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ?? (ogUrl ?? "https://aipremiumshop.com/");

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (sel: string, content: string) => {
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement("meta");
        const [, attr, val] = sel.match(/\[(\w+[\w:]+)="([^"]+)"\]/) ?? [];
        if (attr && val) {
          (el as HTMLMetaElement).setAttribute(attr, val);
          document.head.appendChild(el);
        }
      }
      (el as HTMLMetaElement).setAttribute("content", content);
    };

    setMeta('meta[name="description"]', description);

    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:site_name"]', SITE_NAME);
    setMeta('meta[property="og:type"]', "website");
    setMeta('meta[property="og:locale"]', "en_US");
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[property="og:image:width"]', "1200");
    setMeta('meta[property="og:image:height"]', "630");

    setMeta('meta[name="twitter:card"]', "summary_large_image");
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', ogImage);

    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) {
      canon = document.createElement("link");
      canon.setAttribute("rel", "canonical");
      document.head.appendChild(canon);
    }
    canon.setAttribute("href", canonicalUrl);

    return () => {
      document.title = "AI Premium Shop";
    };
  }, [fullTitle, description, canonicalUrl, ogImage]);

  return null;
}
