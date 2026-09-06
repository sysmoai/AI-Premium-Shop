import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import seoData from "../../data/tier-a-seo-links.json";
import productsData from "../../data/catalog-pages.json";
import informationalProductsData from "../../data/informational-products.json";

type SeoRoute = {
  path: string;
  label: string;
  category_path: string;
  category_label: string;
  inquiry_only?: boolean;
  related: string[];
};

type CatalogRecord = {
  slug: string;
  price?: number | null;
  requestPrice?: boolean;
};

const SITE = "https://aipremiumshop.com";
const ROUTES = (seoData.routes as SeoRoute[]) ?? [];
const BY_PATH = new Map(ROUTES.map((route) => [route.path, route]));
const CATALOG = ((productsData as { products?: CatalogRecord[] }).products ?? []) as CatalogRecord[];
const INFORMATIONAL = new Set(
  (((informationalProductsData as { products?: Array<{ slug?: string }> }).products ?? []))
    .map((product) => product.slug)
    .filter((slug): slug is string => Boolean(slug)),
);

function slugFromPath(path: string) {
  const parts = path.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

function offerSchema(records: CatalogRecord[], canonical: string) {
  const priced = records
    .filter((record) => record.requestPrice !== true && typeof record.price === "number" && Number(record.price) > 0)
    .map((record) => Number(record.price));
  if (!priced.length) return undefined;
  const seller = { "@type": "Organization", name: "AI Premium Shop", url: SITE };
  if (priced.length === 1) {
    return { "@type": "Offer", url: canonical, price: priced[0], priceCurrency: "BDT", seller };
  }
  return {
    "@type": "AggregateOffer",
    url: canonical,
    lowPrice: Math.min(...priced),
    highPrice: Math.max(...priced),
    offerCount: priced.length,
    priceCurrency: "BDT",
    seller,
  };
}

function appendRuntimeSchema(value: unknown) {
  const script = document.createElement("script");
  script.setAttribute("type", "application/ld+json");
  script.setAttribute("data-tier-a-runtime", "true");
  script.textContent = JSON.stringify(value);
  document.head.appendChild(script);
}

export function TierASeoLayer() {
  const [location] = useLocation();
  const route = BY_PATH.get(location);

  useEffect(() => {
    // Non-JS crawlers keep the final-artifact schema tagged data-tier-a-static.
    // Once React owns the page, remove those static copies so hydrated and SPA
    // navigation never expose duplicate Product/Breadcrumb nodes.
    document.querySelectorAll('script[data-tier-a-static], script[data-tier-a-runtime]').forEach((node) => node.remove());

    if (!route) return undefined;
    const slug = slugFromPath(route.path);
    const informational = INFORMATIONAL.has(slug);
    const inquiryOnly = route.inquiry_only === true;

    // Dedicated informational/inquiry pages already manage their authoritative
    // runtime JSON-LD through SEOHead. We only remove the prerender copy here.
    if (informational || inquiryOnly) {
      return () => {
        document.querySelectorAll('script[data-tier-a-runtime]').forEach((node) => node.remove());
      };
    }

    const records = CATALOG.filter((record) => record.slug === slug);
    const canonical = `${SITE}${route.path}`;
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: route.category_label, item: `${SITE}${route.category_path}` },
        { "@type": "ListItem", position: 3, name: route.label, item: canonical },
      ],
    };
    const offers = offerSchema(records, canonical);
    const product = records.length ? {
      "@context": "https://schema.org",
      "@type": "Product",
      name: route.label,
      url: canonical,
      category: route.category_label,
      ...(offers ? { offers } : {}),
    } : null;

    appendRuntimeSchema(breadcrumb);
    if (product) appendRuntimeSchema(product);

    return () => {
      document.querySelectorAll('script[data-tier-a-runtime]').forEach((node) => node.remove());
    };
  }, [location, route]);

  if (!route) return null;
  const related = route.related.map((path) => BY_PATH.get(path)).filter((item): item is SeoRoute => Boolean(item));

  return related.length > 0 ? (
    <section data-tier-a-internal-links className="border-t border-white/10 bg-[#0d1230]">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">Tier-A comparison paths</p>
        <h2 className="mt-2 text-xl font-bold text-white">Compare related AI tools</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Use the canonical product pages below to compare current AI Premium Shop listings. Provider-controlled plans, limits and eligibility can change independently.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {related.map((item) => (
            <Link key={item.path} href={item.path} className="rounded-xl border border-white/10 bg-[#151b3d] px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  ) : null;
}
