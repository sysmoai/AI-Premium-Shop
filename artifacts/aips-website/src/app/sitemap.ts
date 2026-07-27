export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getProductGroups, getCategories } from "@/lib/data/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aipremiumshop.com";
  const now = new Date();

  // Static core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          "en-BD": `${siteUrl}/`,
          "x-default": `${siteUrl}/`,
        },
      },
    },
    {
      url: `${siteUrl}/products`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          "en-BD": `${siteUrl}/products`,
          "x-default": `${siteUrl}/products`,
        },
      },
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          "en-BD": `${siteUrl}/blog`,
          "x-default": `${siteUrl}/blog`,
        },
      },
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

    // Dynamic product pages from extracted live-site data
  const productGroups = getProductGroups();
  const productEntries: MetadataRoute.Sitemap = productGroups.map((p) => ({
    url: `${siteUrl}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Category pages
  const categories = getCategories();
  const categoryEntries: MetadataRoute.Sitemap = categories.map((slug) => ({
    url: `${siteUrl}/category/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Comparison pages
  const comparisonEntries: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/chatgpt-vs-claude`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/chatgpt-vs-gemini`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/copilot-vs-cursor`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/midjourney-vs-ideogram`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/canva-vs-adobe`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/suno-vs-udio`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/midjourney-vs-leonardo`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
  ];

  // Blog posts
  const blogEntries: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/blog/best-ai-tools-bangladesh-2026`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/blog/how-to-get-chatgpt-plus-bangladesh`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/blog/pay-ai-tools-bkash-bangladesh`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
  ];

  // Segment audience pages
  const segmentSlugs = [
    "students", "freelancers", "business", "developers", "creators",
    "marketers", "designers", "researchers", "job-seekers", "teachers", "ecommerce",
  ];
  const segmentEntries: MetadataRoute.Sitemap = segmentSlugs.map((slug) => ({
    url: `${siteUrl}/best-ai-for-${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // City landing pages
  const cityNames = ["dhaka", "chittagong", "sylhet", "rajshahi", "khulna"];
  const cityEntries: MetadataRoute.Sitemap = cityNames.map((city) => ({
    url: `${siteUrl}/${city}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Budget filter pages
  const budgetEntries: MetadataRoute.Sitemap = [500, 1000, 3000].map((n) => ({
    url: `${siteUrl}/ai-under-${n}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...categoryEntries, ...productEntries, ...comparisonEntries, ...blogEntries, ...segmentEntries, ...budgetEntries, ...cityEntries];
}
