import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description?: string;
  canonical?: string;
  ogUrl?: string;
}

const SITE_NAME = "AI Premium Shop";
const DEFAULT_DESC =
  "Bangladesh's most trusted AI subscription shop. ChatGPT Plus from BDT 350, Google AI Pro BDT 500. Pay with bKash or Nagad. Delivered in minutes. 1,200+ happy customers.";

export function SEOHead({
  title,
  description = DEFAULT_DESC,
  canonical,
  ogUrl,
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
  }, [fullTitle, description, canonicalUrl]);

  return null;
}
