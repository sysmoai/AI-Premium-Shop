/**
 * Notion API client for AI Premium Shop
 * Falls back to local data when Notion API is not configured.
 */

import type {
  NotionProduct,
  NotionVariant,
  NotionCategory,
  NotionBlogPost,
  NotionFaq,
  NotionSyncResult,
} from "./types";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_VERSION = "2022-06-28";

/* ------------------------------------------------------------------ */
/*  Low-level fetch helper                                             */
/* ------------------------------------------------------------------ */

async function notionFetch(path: string, options?: RequestInit) {
  if (!NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY not configured");
  }

  const res = await fetch(`https://api.notion.com/v1${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...options?.headers,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Notion API error ${res.status}: ${body}`);
  }

  return res.json();
}

/* ------------------------------------------------------------------ */
/*  Database query helpers                                             */
/* ------------------------------------------------------------------ */

export async function queryDatabase(
  databaseId: string,
  filter?: Record<string, unknown>,
  sorts?: Array<Record<string, unknown>>
) {
  const body: Record<string, unknown> = {};
  if (filter) body.filter = filter;
  if (sorts) body.sorts = sorts;

  const result = await notionFetch(`/databases/${databaseId}/query`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return result.results as Array<{
    id: string;
    properties: Record<string, unknown>;
  }>;
}

/* ------------------------------------------------------------------ */
/*  Property extractors                                                */
/* ------------------------------------------------------------------ */

function getTitle(props: Record<string, unknown>, key: string): string {
  const val = props[key] as { title?: Array<{ plain_text?: string }> } | undefined;
  return val?.title?.[0]?.plain_text ?? "";
}

function getRichText(props: Record<string, unknown>, key: string): string {
  const val = props[key] as { rich_text?: Array<{ plain_text?: string }> } | undefined;
  return val?.rich_text?.[0]?.plain_text ?? "";
}

function getNumber(props: Record<string, unknown>, key: string): number {
  const val = props[key] as { number?: number } | undefined;
  return val?.number ?? 0;
}

function getSelect(props: Record<string, unknown>, key: string): string {
  const val = props[key] as { select?: { name?: string } } | undefined;
  return val?.select?.name ?? "";
}

function getCheckbox(props: Record<string, unknown>, key: string): boolean {
  const val = props[key] as { checkbox?: boolean } | undefined;
  return val?.checkbox ?? false;
}

function getMultiSelect(props: Record<string, unknown>, key: string): string[] {
  const val = props[key] as { multi_select?: Array<{ name?: string }> } | undefined;
  return val?.multi_select?.map((m) => m.name ?? "").filter(Boolean) ?? [];
}

function getUrl(props: Record<string, unknown>, key: string): string {
  const val = props[key] as { url?: string } | undefined;
  return val?.url ?? "";
}

/* ------------------------------------------------------------------ */
/*  Product parsers                                                    */
/* ------------------------------------------------------------------ */

export function parseProductRow(row: {
  id: string;
  properties: Record<string, unknown>;
}): NotionProduct {
  const p = row.properties;
  return {
    id: row.id,
    slug: getRichText(p, "Slug"),
    brand: getTitle(p, "Brand"),
    name: getRichText(p, "Name"),
    provider: getSelect(p, "Provider"),
    category: getSelect(p, "Category"),
    description: getRichText(p, "Description"),
    minPrice: getNumber(p, "Min Price"),
    maxPrice: getNumber(p, "Max Price"),
    brandColor: getRichText(p, "Brand Color") || "#10a37f",
    isActive: getCheckbox(p, "Active"),
    sortOrder: getNumber(p, "Sort Order"),
  };
}

export function parseVariantRow(row: {
  id: string;
  properties: Record<string, unknown>;
}): NotionVariant {
  const p = row.properties;
  return {
    id: row.id,
    productSlug: getRichText(p, "Product Slug"),
    name: getTitle(p, "Name"),
    tier: getSelect(p, "Tier"),
    accessType: getSelect(p, "Access Type"),
    price: getNumber(p, "Price"),
    period: getSelect(p, "Period") || "month",
    deliverySLA: getRichText(p, "Delivery SLA") || "5-15 minutes",
    badge: getSelect(p, "Badge") || null,
    capabilities: getMultiSelect(p, "Capabilities"),
    isActive: getCheckbox(p, "Active"),
  };
}

export function parseCategoryRow(row: {
  id: string;
  properties: Record<string, unknown>;
}): NotionCategory {
  const p = row.properties;
  return {
    id: row.id,
    slug: getRichText(p, "Slug"),
    label: getTitle(p, "Label"),
    description: getRichText(p, "Description"),
    sortOrder: getNumber(p, "Sort Order"),
  };
}

export function parseBlogPostRow(row: {
  id: string;
  properties: Record<string, unknown>;
}): NotionBlogPost {
  const p = row.properties;
  return {
    id: row.id,
    slug: getRichText(p, "Slug"),
    title: getTitle(p, "Title"),
    description: getRichText(p, "Description"),
    category: getSelect(p, "Category"),
    date: getRichText(p, "Date"),
    datePublished: getRichText(p, "Date Published"),
    dateModified: getRichText(p, "Date Modified"),
    readTime: getRichText(p, "Read Time"),
    authorName: getSelect(p, "Author") || "EMON HOSSAIN",
    content: getRichText(p, "Content"),
    isPublished: getCheckbox(p, "Published"),
  };
}

export function parseFaqRow(row: {
  id: string;
  properties: Record<string, unknown>;
}): NotionFaq {
  const p = row.properties;
  return {
    id: row.id,
    question: getTitle(p, "Question"),
    answer: getRichText(p, "Answer"),
    category: getSelect(p, "Category"),
    sortOrder: getNumber(p, "Sort Order"),
  };
}

/* ------------------------------------------------------------------ */
/*  Sync orchestrators                                                 */
/* ------------------------------------------------------------------ */

export async function syncProductsFromNotion(
  databaseId: string | undefined
): Promise<NotionSyncResult<NotionProduct>> {
  if (!NOTION_API_KEY || !databaseId) {
    return {
      data: [],
      source: "local",
      lastSyncedAt: null,
      error: "Notion not configured — using local data",
    };
  }

  try {
    const rows = await queryDatabase(databaseId, {
      property: "Active",
      checkbox: { equals: true },
    });

    const data = rows.map(parseProductRow).sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      data,
      source: "notion",
      lastSyncedAt: new Date().toISOString(),
      error: null,
    };
  } catch (err) {
    return {
      data: [],
      source: "local",
      lastSyncedAt: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function syncVariantsFromNotion(
  databaseId: string | undefined
): Promise<NotionSyncResult<NotionVariant>> {
  if (!NOTION_API_KEY || !databaseId) {
    return {
      data: [],
      source: "local",
      lastSyncedAt: null,
      error: "Notion not configured — using local data",
    };
  }

  try {
    const rows = await queryDatabase(databaseId, {
      property: "Active",
      checkbox: { equals: true },
    });

    const data = rows.map(parseVariantRow);

    return {
      data,
      source: "notion",
      lastSyncedAt: new Date().toISOString(),
      error: null,
    };
  } catch (err) {
    return {
      data: [],
      source: "local",
      lastSyncedAt: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function syncCategoriesFromNotion(
  databaseId: string | undefined
): Promise<NotionSyncResult<NotionCategory>> {
  if (!NOTION_API_KEY || !databaseId) {
    return {
      data: [],
      source: "local",
      lastSyncedAt: null,
      error: "Notion not configured — using local data",
    };
  }

  try {
    const rows = await queryDatabase(databaseId);
    const data = rows.map(parseCategoryRow).sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      data,
      source: "notion",
      lastSyncedAt: new Date().toISOString(),
      error: null,
    };
  } catch (err) {
    return {
      data: [],
      source: "local",
      lastSyncedAt: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function syncBlogPostsFromNotion(
  databaseId: string | undefined
): Promise<NotionSyncResult<NotionBlogPost>> {
  if (!NOTION_API_KEY || !databaseId) {
    return {
      data: [],
      source: "local",
      lastSyncedAt: null,
      error: "Notion not configured — using local data",
    };
  }

  try {
    const rows = await queryDatabase(databaseId, {
      property: "Published",
      checkbox: { equals: true },
    });

    const data = rows.map(parseBlogPostRow);

    return {
      data,
      source: "notion",
      lastSyncedAt: new Date().toISOString(),
      error: null,
    };
  } catch (err) {
    return {
      data: [],
      source: "local",
      lastSyncedAt: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function syncFaqsFromNotion(
  databaseId: string | undefined
): Promise<NotionSyncResult<NotionFaq>> {
  if (!NOTION_API_KEY || !databaseId) {
    return {
      data: [],
      source: "local",
      lastSyncedAt: null,
      error: "Notion not configured — using local data",
    };
  }

  try {
    const rows = await queryDatabase(databaseId);
    const data = rows.map(parseFaqRow).sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      data,
      source: "notion",
      lastSyncedAt: new Date().toISOString(),
      error: null,
    };
  } catch (err) {
    return {
      data: [],
      source: "local",
      lastSyncedAt: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/* ------------------------------------------------------------------ */
/*  Health check                                                       */
/* ------------------------------------------------------------------ */

export function isNotionConfigured(): boolean {
  return !!NOTION_API_KEY;
}
