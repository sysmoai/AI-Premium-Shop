/**
 * Notion CMS bridge for AI Premium Shop
 *
 * Usage:
 *   import { getProducts, getVariants, getCategories } from "@/lib/notion";
 *
 * When NOTION_API_KEY is set, data is fetched live from Notion.
 * When NOTION_API_KEY is missing, data falls back to local static files.
 *
 * To set up Notion integration:
 *   1. Go to https://www.notion.so/my-integrations
 *   2. Create a new integration named "AI Premium Shop CMS"
 *   3. Copy the "Internal Integration Token"
 *   4. Add it to .env.local as NOTION_API_KEY=secret_xxx
 *   5. Create Notion databases (see NOTION_SETUP.md)
 *   6. Share each database with the integration
 *   7. Copy each database ID to .env.local
 */

export {
  isNotionConfigured,
  syncProductsFromNotion,
  syncVariantsFromNotion,
  syncCategoriesFromNotion,
  syncBlogPostsFromNotion,
  syncFaqsFromNotion,
} from "./client";

export type {
  NotionProduct,
  NotionVariant,
  NotionCategory,
  NotionBlogPost,
  NotionFaq,
  NotionSyncResult,
} from "./types";
