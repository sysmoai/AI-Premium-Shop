import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aipremiumshop.com";
const siteName = "AI Premium Shop";
const defaultTitle = "Premium AI Subscriptions in Bangladesh | AI Premium Shop";
const defaultDescription =
  "Buy ChatGPT Plus, Claude Pro, Perplexity, Midjourney, Canva Pro, Netflix & more in Bangladesh. bKash/Nagad payment. 5–15 min delivery after payment confirmation. WhatsApp support.";
const defaultOgImage = `${siteUrl}/og/default.png`;

interface PageMetaInput {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  noindex?: boolean;
  publishedAt?: string;
  modifiedAt?: string;
  authors?: string[];
  keywords?: string[];
}

export function buildMetadata(input: PageMetaInput = {}): Metadata {
  const title = input.title ? `${input.title} | ${siteName}` : defaultTitle;
  const description = input.description ?? defaultDescription;
  const ogImage = input.ogImage ?? defaultOgImage;
  const canonical = input.canonical ?? siteUrl;

  return {
    title,
    description,
    keywords: input.keywords ?? [
      "AI subscription Bangladesh",
      "ChatGPT Plus BD",
      "Claude Pro Bangladesh",
      "Midjourney BD",
      "Canva Pro Bangladesh",
      "buy AI tools BD",
      "premium subscriptions Bangladesh",
      "bKash AI subscription",
      "Nagad payment AI",
    ],
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      type: (input.ogType === "article" ? "article" : "website") as "website" | "article",
      locale: "en_US",
      alternateLocale: ["bn_BD"],
      url: canonical,
      siteName,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(input.publishedAt && { publishedTime: input.publishedAt }),
      ...(input.modifiedAt && { modifiedTime: input.modifiedAt }),
      ...(input.authors && { authors: input.authors }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: !input.noindex,
      follow: !input.noindex,
      googleBot: {
        index: !input.noindex,
        follow: !input.noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "ecommerce",
    classification: "Digital Subscriptions, AI Tools, Productivity Software, Streaming Services",
    other: {
      ...(process.env.NEXT_PUBLIC_FB_APP_ID ? { "fb:app_id": process.env.NEXT_PUBLIC_FB_APP_ID } : {}),
    },
  };
}

export function buildProductMetadata(product: {
  name: string;
  shortDescription?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  slug: string;
  basePriceBdt: number;
  heroImageUrl?: string | null;
  updatedAt?: Date | null;
}): Metadata {
  const title =
    product.metaTitle ??
    `${product.name} in Bangladesh — Buy at Best Price`;
  const description =
    product.metaDescription ??
    product.shortDescription ??
    `Buy ${product.name} in Bangladesh. Starting from ৳${product.basePriceBdt.toLocaleString("en-BD")}. bKash/Nagad accepted. 5–15 min WhatsApp delivery after payment confirmation. a growing community of customers since 2024.`;
  const canonical = `${siteUrl}/products/${product.slug}`;
  const ogImage = product.heroImageUrl ?? defaultOgImage;

  const base = buildMetadata({
    title,
    description,
    canonical,
    ogImage,
    keywords: [
      `${product.name} Bangladesh`,
      `${product.name} BD`,
      `buy ${product.name} Bangladesh`,
      `${product.name} price BD`,
      `${product.name} bKash`,
      `${product.name} Nagad`,
    ],
    modifiedAt: product.updatedAt?.toISOString(),
  });

  return {
    ...base,
    other: {
      ...base.other,
      "og:price:currency": "BDT",
      "og:price:amount": String(product.basePriceBdt),
      "og:availability": "instock",
    },
  };
}

export function buildBlogMetadata(post: {
  title: string;
  excerpt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  slug: string;
  coverImageUrl?: string | null;
  authorName: string;
  publishedAt?: Date | null;
  updatedAt?: Date | null;
}): Metadata {
  const title = post.metaTitle ?? post.title;
  const description =
    post.metaDescription ?? post.excerpt ?? `Read ${post.title} on AI Premium Shop.`;
  const canonical = `${siteUrl}/blog/${post.slug}`;
  const ogImage = post.coverImageUrl ?? defaultOgImage;

  return buildMetadata({
    title,
    description,
    canonical,
    ogImage,
    ogType: "article",
    keywords: [post.title, "AI Premium Shop", "Bangladesh", "AI subscriptions"],
    publishedAt: post.publishedAt?.toISOString(),
    modifiedAt: post.updatedAt?.toISOString(),
    authors: [post.authorName],
  });
}

export { siteUrl, siteName, defaultTitle, defaultDescription };
