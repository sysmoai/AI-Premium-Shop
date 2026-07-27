/**
 * Notion database schema types for AI Premium Shop CMS
 * These types map Notion database properties to our app data model.
 */

export interface NotionProduct {
  id: string;
  slug: string;
  brand: string;
  name: string;
  provider: string;
  category: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  brandColor: string;
  isActive: boolean;
  sortOrder: number;
}

export interface NotionVariant {
  id: string;
  productSlug: string;
  name: string;
  tier: string;
  accessType: string;
  price: number;
  period: string;
  deliverySLA: string;
  badge: string | null;
  capabilities: string[];
  isActive: boolean;
}

export interface NotionCategory {
  id: string;
  slug: string;
  label: string;
  description: string;
  sortOrder: number;
}

export interface NotionBlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  datePublished: string;
  dateModified: string;
  readTime: string;
  authorName: string;
  content: string;
  isPublished: boolean;
}

export interface NotionFaq {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
}

export interface NotionSyncResult<T> {
  data: T[];
  source: "notion" | "local";
  lastSyncedAt: string | null;
  error: string | null;
}
