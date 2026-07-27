import { siteUrl, siteName } from "@/lib/seo/metadata";

function ScriptLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\u003c"),
      }}
    />
  );
}

interface OrganizationProps {
  logoUrl?: string;
  sameAs?: string[];
}

export function OrganizationJsonLd({
  logoUrl = `${siteUrl}/logo.png`,
  sameAs = [],
}: OrganizationProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 512,
      height: 512,
      caption: `${siteName} logo`,
    },
    image: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 512,
      height: 512,
    },
    description:
      "Bangladesh's trusted store for premium AI subscriptions, design tools, and streaming services. Local payment, WhatsApp support, 5–15 minutes after payment confirmation.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        name: "Emon Hossain",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "BD",
      addressLocality: "Dhaka",
      addressRegion: "Dhaka Division",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: process.env.NEXT_PUBLIC_WA_PRIMARY ? "+" + process.env.NEXT_PUBLIC_WA_PRIMARY : "+880-1865-385348",
        contactType: "customer support",
        availableLanguage: ["English", "Bengali"],
        areaServed: "BD",
      },
    ],
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };

  return <ScriptLd schema={schema} />;
}

export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    inLanguage: "en-BD",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  return <ScriptLd schema={schema} />;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };

  return <ScriptLd schema={schema} />;
}

interface ProductJsonLdProps {
  name: string;
  description: string;
  slug: string;
  imageUrl?: string;
  priceBdt: number;
  comparePriceBdt?: number | null;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  priceValidUntil?: string;
  brandName?: string;
  categoryName?: string;
}

export function ProductJsonLd({
  name,
  description,
  slug,
  imageUrl,
  priceBdt,
  comparePriceBdt,
  availability = "InStock",
  priceValidUntil,
  brandName = siteName,
  categoryName = "Digital Subscription",
}: ProductJsonLdProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: imageUrl ?? `${siteUrl}/og/default.png`,
    url: `${siteUrl}/products/${slug}`,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    category: categoryName,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${slug}`,
      priceCurrency: "BDT",
      price: String(priceBdt),
      ...(comparePriceBdt && {
        priceSpecification: {
          "@type": "PriceSpecification",
          price: String(priceBdt),
          priceCurrency: "BDT",
          maxPrice: String(comparePriceBdt),
        },
      }),
      availability: `https://schema.org/${availability}`,
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
      },
      ...(priceValidUntil && { priceValidUntil }),
      eligibleRegion: {
        "@type": "Country",
        name: "Bangladesh",
      },
      acceptedPaymentMethod: [
        { "@type": "PaymentMethod", name: "bKash" },
        { "@type": "PaymentMethod", name: "Nagad" },
        { "@type": "PaymentMethod", name: "Rocket" },
        { "@type": "PaymentMethod", name: "Credit Card" },
        { "@type": "PaymentMethod", name: "Debit Card" },
      ],
    },
  };

  return <ScriptLd schema={schema} />;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageProps {
  items: FAQItem[];
}

export function FAQPageJsonLd({ items }: FAQPageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <ScriptLd schema={schema} />;
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  authorName: string;
  publishedAt: string;
  modifiedAt?: string;
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  imageUrl,
  authorName,
  publishedAt,
  modifiedAt,
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: imageUrl ?? `${siteUrl}/og/default.png`,
    url: `${siteUrl}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    datePublished: publishedAt,
    ...(modifiedAt && { dateModified: modifiedAt }),
    inLanguage: "en-BD",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
  };

  return <ScriptLd schema={schema} />;
}

interface HowToStep {
  name: string;
  text: string;
  url?: string;
  imageUrl?: string;
}

interface HowToProps {
  name: string;
  description: string;
  totalTime?: string;
  estimatedCost?: { currency: string; value: string };
  steps: HowToStep[];
}

export function HowToJsonLd({ name, description, totalTime, estimatedCost, steps }: HowToProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime && { totalTime }),
    ...(estimatedCost && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: estimatedCost.currency,
        value: estimatedCost.value,
      },
    }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url,
      ...(step.imageUrl && {
        image: {
          "@type": "ImageObject",
          url: step.imageUrl,
        },
      }),
    })),
  };

  return <ScriptLd schema={schema} />;
}

interface LocalBusinessProps {
  name?: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  areaServed?: string[];
  priceRange?: string;
}

export function LocalBusinessJsonLd({
  name = siteName,
  telephone = process.env.NEXT_PUBLIC_WA_PRIMARY ? "+" + process.env.NEXT_PUBLIC_WA_PRIMARY : "+880-1865-385348",
  address = { addressCountry: "BD", addressLocality: "Dhaka", addressRegion: "Dhaka Division" },
  areaServed = ["Bangladesh"],
  priceRange = "৳270–৳29,900",
}: LocalBusinessProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#local-business`,
    name,
    url: siteUrl,
    telephone,
    image: `${siteUrl}/logo.png`,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    areaServed: areaServed.map((area) => ({ "@type": "Place", name: area })),
    priceRange,
    openingHours: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      "https://wa.me/" + (process.env.NEXT_PUBLIC_WA_PRIMARY || "8801865385348"),
    ],
  };

  return <ScriptLd schema={schema} />;
}

interface CollectionPageProps {
  name: string;
  description: string;
  url: string;
  itemCount: number;
}

export function CollectionPageJsonLd({
  name,
  description,
  url,
  itemCount,
}: CollectionPageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "Thing",
      name,
      description,
      numberOfItems: itemCount,
    },
  };

  return <ScriptLd schema={schema} />;
}
