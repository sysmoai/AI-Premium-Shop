# Notion CMS Setup for AI Premium Shop

This site supports live content syncing from Notion databases. When configured, products, variants, categories, blog posts, and FAQs are fetched directly from Notion — no code changes required to update your storefront.

## Quick Start

### 1. Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"New integration"**
3. Name it: `AI Premium Shop CMS`
4. Associate it with your workspace
5. Copy the **Internal Integration Token** (starts with `secret_`)

### 2. Create Databases

Create the following databases in your Notion workspace. Each database must have exactly these property names (case-sensitive):

#### Products Database

| Property | Type | Notes |
|----------|------|-------|
| Brand | Title | Product brand name (e.g. "ChatGPT") |
| Slug | Rich text | URL slug (e.g. "chatgpt-plus-bangladesh") |
| Name | Rich text | Full product name |
| Provider | Select | e.g. "OpenAI", "Anthropic" |
| Category | Select | e.g. "ai-assistant", "ai-code" |
| Description | Rich text | Short product description |
| Min Price | Number | Starting price in BDT |
| Max Price | Number | Highest price in BDT |
| Brand Color | Rich text | Hex color (e.g. "#10a37f") |
| Active | Checkbox | Only checked items appear on site |
| Sort Order | Number | Display order |

#### Variants Database

| Property | Type | Notes |
|----------|------|-------|
| Name | Title | Plan name (e.g. "Starter Shared") |
| Product Slug | Rich text | Links to parent product |
| Tier | Select | e.g. "Starter", "Premium", "Personal" |
| Access Type | Select | e.g. "Shared", "Personal" |
| Price | Number | Price in BDT |
| Period | Select | e.g. "month", "year" |
| Delivery SLA | Rich text | e.g. "5-15 minutes" |
| Badge | Select | e.g. "BEST SELLER", "HIGH STABILITY" |
| Capabilities | Multi-select | Feature list |
| Active | Checkbox | Only checked items appear |

#### Categories Database

| Property | Type | Notes |
|----------|------|-------|
| Label | Title | Display name |
| Slug | Rich text | URL-safe slug |
| Description | Rich text | Short description |
| Sort Order | Number | Display order |

#### Blog Posts Database

| Property | Type | Notes |
|----------|------|-------|
| Title | Title | Post title |
| Slug | Rich text | URL slug |
| Description | Rich text | Meta description |
| Category | Select | e.g. "Guide", "Tutorial" |
| Date | Rich text | Display date |
| Date Published | Rich text | ISO 8601 timestamp |
| Date Modified | Rich text | ISO 8601 timestamp |
| Read Time | Rich text | e.g. "8 min read" |
| Author | Select | Author name |
| Content | Rich text | HTML or Markdown content |
| Published | Checkbox | Only checked posts appear |

#### FAQ Database

| Property | Type | Notes |
|----------|------|-------|
| Question | Title | FAQ question |
| Answer | Rich text | FAQ answer |
| Category | Select | e.g. "Payment", "Delivery" |
| Sort Order | Number | Display order |

### 3. Share Databases with Integration

For each database:
1. Open the database in Notion
2. Click the **"..."** menu (top right)
3. Click **"Add connections"**
4. Select **"AI Premium Shop CMS"**
5. The integration now has read access

### 4. Get Database IDs

For each database:
1. Open the database in full-page view
2. Copy the URL: `https://www.notion.so/workspace/Database-Name-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
3. The database ID is the last 32-character string

### 5. Configure Environment Variables

Create `.env.local` in the project root:

```env
# Notion CMS Integration
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DB_PRODUCTS=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DB_VARIANTS=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DB_CATEGORIES=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DB_BLOG=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DB_FAQ=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 6. Redeploy

```bash
pnpm build
wrangler pages deploy dist --project-name=aips-landing --branch=main
```

Your site will now pull live data from Notion. Changes in Notion appear on the site within ~60 seconds (revalidation cache).

## Fallback Behavior

If `NOTION_API_KEY` is missing or invalid, the site automatically falls back to local static data in `src/lib/data/products.ts` and `src/lib/blog.ts`. The site **never breaks** — it simply uses the best available data source.

## Security Notes

- Never commit `.env.local` to Git
- The Notion integration token has read-only access to specific databases
- Keep your token private — rotate it immediately if leaked
