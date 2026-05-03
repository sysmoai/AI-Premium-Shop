import { Router, type IRouter } from "express";
import { db, productsTable } from "@workspace/db";
import { and, eq, ilike, or, sql, asc, desc } from "drizzle-orm";
import { serializeProduct } from "../lib/cart";

const router: IRouter = Router();

router.get("/products", async (req, res): Promise<void> => {
  const category = typeof req.query.category === "string" ? req.query.category : undefined;
  const brandSlug = typeof req.query.brandSlug === "string" ? req.query.brandSlug : undefined;
  const search = typeof req.query.search === "string" ? req.query.search : undefined;
  const featured = req.query.featured === "true" ? true : req.query.featured === "false" ? false : undefined;
  const limit = Math.min(Number(req.query.limit) || 200, 200);
  const offset = Number(req.query.offset) || 0;

  const conditions = [] as ReturnType<typeof eq>[];
  if (category) conditions.push(eq(productsTable.category, category));
  if (brandSlug) conditions.push(eq(productsTable.brandSlug, brandSlug));
  if (typeof featured === "boolean") conditions.push(eq(productsTable.featured, featured));
  if (search) {
    const like = `%${search}%`;
    conditions.push(
      or(ilike(productsTable.name, like), ilike(productsTable.description, like))!,
    );
  }
  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const items = await db
    .select()
    .from(productsTable)
    .where(where)
    .orderBy(desc(productsTable.featured), asc(productsTable.price))
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(productsTable)
    .where(where);

  res.json({ items: items.map(serializeProduct), total: count });
});

router.get("/products/:slug", async (req, res): Promise<void> => {
  const { slug } = req.params;
  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.slug, slug))
    .limit(1);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(serializeProduct(product));
});

export default router;
