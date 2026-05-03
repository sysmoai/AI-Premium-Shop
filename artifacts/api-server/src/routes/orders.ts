import { Router, type IRouter } from "express";
import {
  db,
  cartItemsTable,
  productsTable,
  ordersTable,
  orderItemsTable,
} from "@workspace/db";
import { and, eq, inArray } from "drizzle-orm";
import { CART_COOKIE, getOrCreateCartByToken } from "../lib/cart";

const router: IRouter = Router();

const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "8801865385348";

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.floor(Math.random() * 36 * 36 * 36)
    .toString(36)
    .toUpperCase()
    .padStart(3, "0");
  return `AIPS-${ts}-${rnd}`;
}

function serializeOrder(
  order: typeof ordersTable.$inferSelect,
  items: (typeof orderItemsTable.$inferSelect)[],
  withWhatsapp = false,
) {
  let whatsappUrl: string | null = null;
  if (withWhatsapp) {
    const lines = [
      `Hi, I just placed order ${order.orderNumber} on AIPS:`,
      "",
      ...items.map(
        (i) =>
          `• ${i.productName} × ${i.quantity} = ৳${i.lineTotal.toLocaleString("en-US")}`,
      ),
      "",
      `Total: ৳${order.total.toLocaleString("en-US")} ${order.currency}`,
      `Name: ${order.customerName}`,
      `Email: ${order.customerEmail}`,
      `Payment: ${order.paymentMethod}${order.paymentReference ? ` (${order.paymentReference})` : ""}`,
    ];
    if (order.notes) lines.push(`Notes: ${order.notes}`);
    whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  }
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    customerPhone: order.customerPhone,
    paymentMethod: order.paymentMethod,
    paymentReference: order.paymentReference,
    notes: order.notes,
    subtotal: order.subtotal,
    total: order.total,
    currency: order.currency,
    status: order.status,
    items: items.map((i) => ({
      id: i.id,
      productId: i.productId,
      productName: i.productName,
      productSlug: i.productSlug,
      unitPrice: i.unitPrice,
      quantity: i.quantity,
      lineTotal: i.lineTotal,
    })),
    createdAt: order.createdAt.toISOString(),
    whatsappUrl,
  };
}

router.post("/orders", async (req, res): Promise<void> => {
  const { customerName, customerEmail, customerPhone, paymentMethod } = req.body ?? {};
  if (!customerName || !customerEmail || !customerPhone || !paymentMethod) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const paymentReference =
    typeof req.body?.paymentReference === "string" ? req.body.paymentReference : null;
  const notes = typeof req.body?.notes === "string" ? req.body.notes : null;

  const cart = await getOrCreateCartByToken(req.cookies?.[CART_COOKIE]);
  const items = await db
    .select()
    .from(cartItemsTable)
    .where(eq(cartItemsTable.cartId, cart.id));
  if (items.length === 0) {
    res.status(400).json({ error: "Cart is empty" });
    return;
  }
  const products = await db
    .select()
    .from(productsTable)
    .where(
      inArray(
        productsTable.id,
        items.map((i) => i.productId),
      ),
    );
  const pMap = new Map(products.map((p) => [p.id, p]));

  const lineItems = items
    .map((it) => {
      const p = pMap.get(it.productId);
      if (!p) return null;
      return {
        product: p,
        quantity: it.quantity,
        lineTotal: p.price * it.quantity,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  if (lineItems.length === 0) {
    res.status(400).json({ error: "No valid items in cart" });
    return;
  }

  const subtotal = lineItems.reduce((s, l) => s + l.lineTotal, 0);
  const orderNumber = generateOrderNumber();

  const [order] = await db
    .insert(ordersTable)
    .values({
      orderNumber,
      customerName,
      customerEmail: String(customerEmail).toLowerCase(),
      customerPhone,
      paymentMethod,
      paymentReference,
      notes,
      subtotal,
      total: subtotal,
      currency: "BDT",
      status: "pending",
      itemsSnapshot: lineItems.map((l) => ({
        productId: l.product.id,
        externalId: l.product.externalId,
        name: l.product.name,
        brand: l.product.brand,
        slug: l.product.slug,
        price: l.product.price,
        quantity: l.quantity,
      })),
    })
    .returning();

  const orderItemRows = await db
    .insert(orderItemsTable)
    .values(
      lineItems.map((l) => ({
        orderId: order.id,
        productId: l.product.id,
        productName: l.product.name,
        productSlug: l.product.slug,
        unitPrice: l.product.price,
        quantity: l.quantity,
        lineTotal: l.lineTotal,
      })),
    )
    .returning();

  await db.delete(cartItemsTable).where(eq(cartItemsTable.cartId, cart.id));

  req.log.info({ orderNumber, total: order.total }, "order placed");
  res.status(201).json(serializeOrder(order, orderItemRows, true));
});

router.post("/orders/lookup", async (req, res): Promise<void> => {
  const orderNumber = String(req.body?.orderNumber || "").trim();
  const phone = String(req.body?.phone || "").trim();
  if (!orderNumber || !phone) {
    res.status(400).json({ error: "orderNumber and phone required" });
    return;
  }
  const [order] = await db
    .select()
    .from(ordersTable)
    .where(
      and(
        eq(ordersTable.orderNumber, orderNumber),
        eq(ordersTable.customerPhone, phone),
      ),
    )
    .limit(1);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  const items = await db
    .select()
    .from(orderItemsTable)
    .where(eq(orderItemsTable.orderId, order.id));
  res.json(serializeOrder(order, items, false));
});

export { serializeOrder };
export default router;
