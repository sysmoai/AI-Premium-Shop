import { readFile } from "node:fs/promises";
import path from "node:path";
import { db, productsTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { logger } from "./logger";

type RawProduct = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  brandSlug: string;
  provider?: string;
  brandColor?: string;
  category: string;
  price: number;
  officialUSD?: number;
  tier?: string;
  accessType?: string;
  badge?: string;
  description: string;
  capabilities?: string[];
  deliverySLA?: string;
  featured?: boolean;
  whatsappMsg?: string;
  status?: string;
};

export async function seedProductsFromJson(): Promise<number> {
  const [{ count }] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(productsTable);
  if (count > 0) {
    logger.info({ existing: count }, "products already seeded");
    return 0;
  }
  const candidates = [
    path.resolve(process.cwd(), "../aips-landing/data/products.json"),
    path.resolve(process.cwd(), "artifacts/aips-landing/data/products.json"),
    path.resolve("/home/runner/workspace/artifacts/aips-landing/data/products.json"),
  ];
  let raw: string | null = null;
  for (const p of candidates) {
    try {
      raw = await readFile(p, "utf-8");
      logger.info({ path: p }, "loaded products.json");
      break;
    } catch {
      // try next
    }
  }
  if (!raw) {
    logger.warn("products.json not found; skipping seed");
    return 0;
  }
  const parsed = JSON.parse(raw) as { products: RawProduct[] } | RawProduct[];
  const items = Array.isArray(parsed) ? parsed : parsed.products;
  if (!items?.length) return 0;
  const rows = items.map((p) => ({
    externalId: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    brandSlug: p.brandSlug,
    provider: p.provider ?? null,
    brandColor: p.brandColor ?? null,
    category: p.category,
    price: p.price,
    officialUsd: p.officialUSD ?? null,
    tier: p.tier ?? null,
    accessType: p.accessType ?? "shared",
    badge: p.badge ?? null,
    description: p.description,
    capabilities: p.capabilities ?? [],
    deliverySla: p.deliverySLA ?? null,
    featured: Boolean(p.featured),
    whatsappMsg: p.whatsappMsg ?? null,
    status: p.status ?? "Active",
    stock: 999,
  }));
  await db.insert(productsTable).values(rows).onConflictDoNothing();
  logger.info({ inserted: rows.length }, "seeded products");
  return rows.length;
}
