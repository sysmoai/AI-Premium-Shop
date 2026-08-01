export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Premium Shop",
  alternateName: "AIPS",
  url: "https://aipremiumshop.com",
  logo: "https://aipremiumshop.com/images/brand/aips-logo.png",
  description: "Bangladesh's trusted source for premium AI tool subscriptions.",
  // Every other claim on the site (AboutPage, TrustBadges, llms.txt) says
  // 2024, and that is correct — this was the one place still saying 2026,
  // which is a live Organization-schema fact Google reads directly.
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+8801865385348",
    contactType: "sales",
    areaServed: "BD",
    availableLanguage: ["English", "Bengali"],
  },
  sameAs: [
    "https://www.facebook.com/aipremiumshopfb",
    "https://www.instagram.com/aipremiumshop/",
    "https://www.linkedin.com/showcase/aipremiumshop/",
  ],
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AI Premium Shop",
  url: "https://aipremiumshop.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://aipremiumshop.com/products?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export interface ProductForSchema {
  id: string;
  name: string;
  description: string;
  brand: string;
  // null = request-price product: no Offer is emitted (an Offer without a
  // real price would be fabricated structured data).
  price: number | null;
}

export function productSchema(product: ProductForSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    ...(product.price != null && {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "BDT",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "AI Premium Shop" },
        url: "https://aipremiumshop.com/products",
      },
    }),
  };
}

export function productListSchema(products: ProductForSchema[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Tool Subscriptions — Bangladesh",
    numberOfItems: products.length,
    itemListElement: products.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.description,
        brand: { "@type": "Brand", name: p.brand },
        ...(p.price != null && {
          offers: {
            "@type": "Offer",
            price: p.price,
            priceCurrency: "BDT",
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "AI Premium Shop" },
            url: "https://aipremiumshop.com/products",
          },
        }),
      },
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: `https://aipremiumshop.com${item.href}` } : {}),
    })),
  };
}

export function schemaJson(data: object) {
  return JSON.stringify(data);
}
