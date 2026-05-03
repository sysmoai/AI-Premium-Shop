import { Router, type IRouter } from "express";
import {
  db,
  ordersTable,
  orderItemsTable,
  productsTable,
} from "@workspace/db";
import { and, desc, eq, sql } from "drizzle-orm";
import {
  ADMIN_COOKIE,
  SESSION_DURATION_MS,
  loginAdmin,
  logoutAdmin,
  requireAdmin,
} from "../lib/admin-auth";
import { serializeProduct } from "../lib/cart";
import { serializeOrder } from "./orders";

const router: IRouter = Router();

router.post("/admin/login", async (req, res): Promise<void> => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    res.status(400).json({ error: "email and password required" });
    return;
  }
  const result = await loginAdmin(String(email), String(password));
  if (!result) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  res.cookie(ADMIN_COOKIE, result.token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: SESSION_DURATION_MS,
    path: "/",
  });
  res.json({
    id: result.admin.id,
    email: result.admin.email,
    name: result.admin.name,
    role: result.admin.role,
  });
});

router.post("/admin/logout", async (req, res): Promise<void> => {
  await logoutAdmin(req.cookies?.[ADMIN_COOKIE]);
  res.clearCookie(ADMIN_COOKIE, { path: "/" });
  res.json({ ok: true });
});

router.get("/admin/me", requireAdmin, async (req, res): Promise<void> => {
  const admin = (req as typeof req & { admin: { id: number; email: string; name: string; role: string } }).admin;
  res.json({
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });
});

router.get("/admin/stats", requireAdmin, async (_req, res): Promise<void> => {
  const [{ totalOrders }] = await db
    .select({ totalOrders: sql<number>`cast(count(*) as int)` })
    .from(ordersTable);
  const [{ pendingOrders }] = await db
    .select({ pendingOrders: sql<number>`cast(count(*) as int)` })
    .from(ordersTable)
    .where(eq(ordersTable.status, "pending"));
  const [{ completedOrders }] = await db
    .select({ completedOrders: sql<number>`cast(count(*) as int)` })
    .from(ordersTable)
    .where(eq(ordersTable.status, "completed"));
  const [{ totalRevenue }] = await db
    .select({
      totalRevenue: sql<number>`coalesce(cast(sum(${ordersTable.total}) as int), 0)`,
    })
    .from(ordersTable)
    .where(eq(ordersTable.status, "completed"));
  const [{ totalProducts }] = await db
    .select({ totalProducts: sql<number>`cast(count(*) as int)` })
    .from(productsTable);

  const recent = await db
    .select()
    .from(ordersTable)
    .orderBy(desc(ordersTable.createdAt))
    .limit(10);
  const recentSerialized = await Promise.all(
    recent.map(async (o) => {
      const items = await db
        .select()
        .from(orderItemsTable)
        .where(eq(orderItemsTable.orderId, o.id));
      return serializeOrder(o, items, false);
    }),
  );

  res.json({
    totalOrders,
    pendingOrders,
    completedOrders,
    totalRevenue,
    totalProducts,
    recentOrders: recentSerialized,
  });
});

router.get("/admin/orders", requireAdmin, async (req, res): Promise<void> => {
  const status = typeof req.query.status === "string" ? req.query.status : undefined;
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  const offset = Number(req.query.offset) || 0;
  const where = status ? eq(ordersTable.status, status) : undefined;
  const orders = await db
    .select()
    .from(ordersTable)
    .where(where)
    .orderBy(desc(ordersTable.createdAt))
    .limit(limit)
    .offset(offset);
  const [{ count }] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(ordersTable)
    .where(where);
  const serialized = await Promise.all(
    orders.map(async (o) => {
      const items = await db
        .select()
        .from(orderItemsTable)
        .where(eq(orderItemsTable.orderId, o.id));
      return serializeOrder(o, items, false);
    }),
  );
  res.json({ items: serialized, total: count });
});

router.patch("/admin/orders/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const update: Record<string, unknown> = { updatedAt: new Date() };
  if (typeof req.body?.status === "string") update.status = req.body.status;
  if (typeof req.body?.notes === "string" || req.body?.notes === null)
    update.notes = req.body.notes;
  if (
    typeof req.body?.paymentReference === "string" ||
    req.body?.paymentReference === null
  )
    update.paymentReference = req.body.paymentReference;

  const [updated] = await db
    .update(ordersTable)
    .set(update)
    .where(eq(ordersTable.id, id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  const items = await db
    .select()
    .from(orderItemsTable)
    .where(eq(orderItemsTable.orderId, updated.id));
  res.json(serializeOrder(updated, items, false));
});

router.post("/admin/products", requireAdmin, async (req, res): Promise<void> => {
  const body = req.body ?? {};
  const required = ["externalId", "slug", "name", "brand", "brandSlug", "category", "price", "description"];
  for (const k of required) {
    if (body[k] === undefined || body[k] === null || body[k] === "") {
      res.status(400).json({ error: `${k} required` });
      return;
    }
  }
  const [created] = await db
    .insert(productsTable)
    .values({
      externalId: String(body.externalId),
      slug: String(body.slug),
      name: String(body.name),
      brand: String(body.brand),
      brandSlug: String(body.brandSlug),
      provider: body.provider ?? null,
      brandColor: body.brandColor ?? null,
      category: String(body.category),
      price: Number(body.price),
      officialUsd: body.officialUsd != null ? Number(body.officialUsd) : null,
      tier: body.tier ?? null,
      accessType: body.accessType ?? "shared",
      badge: body.badge ?? null,
      description: String(body.description),
      capabilities: Array.isArray(body.capabilities) ? body.capabilities : [],
      deliverySla: body.deliverySla ?? null,
      featured: Boolean(body.featured),
      whatsappMsg: body.whatsappMsg ?? null,
      status: body.status ?? "Active",
      stock: body.stock != null ? Number(body.stock) : 999,
    })
    .returning();
  res.status(201).json(serializeProduct(created));
});

router.patch("/admin/products/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const body = req.body ?? {};
  const update: Record<string, unknown> = { updatedAt: new Date() };
  const fields = [
    "externalId",
    "slug",
    "name",
    "brand",
    "brandSlug",
    "provider",
    "brandColor",
    "category",
    "price",
    "officialUsd",
    "tier",
    "accessType",
    "badge",
    "description",
    "capabilities",
    "deliverySla",
    "featured",
    "whatsappMsg",
    "status",
    "stock",
  ];
  for (const f of fields) {
    if (body[f] !== undefined) update[f] = body[f];
  }
  const [updated] = await db
    .update(productsTable)
    .set(update)
    .where(eq(productsTable.id, id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(serializeProduct(updated));
});

router.delete("/admin/products/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  await db.delete(productsTable).where(eq(productsTable.id, id));
  res.json({ ok: true });
});

export default router;
