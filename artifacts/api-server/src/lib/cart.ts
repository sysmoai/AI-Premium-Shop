import { randomBytes } from "node:crypto";
import { db, cartsTable, cartItemsTable, productsTable } from "@workspace/db";
import { eq, inArray } from "drizzle-orm";

export const CART_COOKIE = "aips_cart";
export const CART_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days

export function newCartToken(): string {
  return randomBytes(24).toString("hex");
}

export async function getOrCreateCartByToken(token: string | undefined) {
  if (token) {
    const [existing] = await db
      .select()
      .from(cartsTable)
      .where(eq(cartsTable.token, token))
      .limit(1);
    if (existing) return existing;
  }
  const t = newCartToken();
  const [created] = await db
    .insert(cartsTable)
    .values({ token: t })
    .returning();
  return created;
}

export type ProductRow = typeof productsTable.$inferSelect;

export function serializeProduct(p: ProductRow) {
  return {
    id: p.id,
    externalId: p.externalId,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    brandSlug: p.brandSlug,
    provider: p.provider,
    brandColor: p.brandColor,
    category: p.category,
    price: p.price,
    officialUsd: p.officialUsd,
    tier: p.tier,
    accessType: p.accessType,
    badge: p.badge,
    description: p.description,
    capabilities: p.capabilities ?? [],
    deliverySla: p.deliverySla,
    featured: p.featured,
    whatsappMsg: p.whatsappMsg,
    status: p.status,
    stock: p.stock,
  };
}

export async function buildCartPayload(cartId: number, token: string) {
  const items = await db
    .select()
    .from(cartItemsTable)
    .where(eq(cartItemsTable.cartId, cartId));
  if (items.length === 0) {
    return {
      token,
      items: [],
      subtotal: 0,
      total: 0,
      itemCount: 0,
      currency: "BDT",
    };
  }
  const productIds = items.map((i) => i.productId);
  const products = await db
    .select()
    .from(productsTable)
    .where(inArray(productsTable.id, productIds));
  const pMap = new Map(products.map((p) => [p.id, p]));
  const enriched = items
    .map((it) => {
      const product = pMap.get(it.productId);
      if (!product) return null;
      return {
        id: it.id,
        productId: it.productId,
        quantity: it.quantity,
        product: serializeProduct(product),
        lineTotal: product.price * it.quantity,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
  const subtotal = enriched.reduce((s, i) => s + i.lineTotal, 0);
  const itemCount = enriched.reduce((s, i) => s + i.quantity, 0);
  return {
    token,
    items: enriched,
    subtotal,
    total: subtotal,
    itemCount,
    currency: "BDT",
  };
}
