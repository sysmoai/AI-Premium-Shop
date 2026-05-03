import { Router, type IRouter } from "express";
import { db, cartItemsTable, productsTable } from "@workspace/db";
import { and, eq } from "drizzle-orm";
import {
  CART_COOKIE,
  CART_COOKIE_MAX_AGE,
  buildCartPayload,
  getOrCreateCartByToken,
} from "../lib/cart";

const router: IRouter = Router();

function setCartCookie(res: Parameters<Parameters<typeof router.get>[1]>[1], token: string) {
  res.cookie(CART_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: CART_COOKIE_MAX_AGE,
    path: "/",
  });
}

router.get("/cart", async (req, res): Promise<void> => {
  const cart = await getOrCreateCartByToken(req.cookies?.[CART_COOKIE]);
  setCartCookie(res, cart.token);
  res.json(await buildCartPayload(cart.id, cart.token));
});

router.post("/cart/items", async (req, res): Promise<void> => {
  const productId = Number(req.body?.productId);
  const quantity = Math.max(1, Number(req.body?.quantity) || 1);
  if (!productId || !Number.isFinite(productId)) {
    res.status(400).json({ error: "productId required" });
    return;
  }
  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, productId))
    .limit(1);
  if (!product) {
    res.status(400).json({ error: "Product not found" });
    return;
  }
  const cart = await getOrCreateCartByToken(req.cookies?.[CART_COOKIE]);
  setCartCookie(res, cart.token);

  const [existing] = await db
    .select()
    .from(cartItemsTable)
    .where(
      and(
        eq(cartItemsTable.cartId, cart.id),
        eq(cartItemsTable.productId, productId),
      ),
    )
    .limit(1);

  if (existing) {
    await db
      .update(cartItemsTable)
      .set({ quantity: existing.quantity + quantity })
      .where(eq(cartItemsTable.id, existing.id));
  } else {
    await db.insert(cartItemsTable).values({
      cartId: cart.id,
      productId,
      quantity,
    });
  }
  res.json(await buildCartPayload(cart.id, cart.token));
});

router.patch("/cart/items/:itemId", async (req, res): Promise<void> => {
  const itemId = Number(req.params.itemId);
  const quantity = Math.max(1, Number(req.body?.quantity) || 1);
  if (!itemId) {
    res.status(400).json({ error: "Invalid itemId" });
    return;
  }
  const cart = await getOrCreateCartByToken(req.cookies?.[CART_COOKIE]);
  setCartCookie(res, cart.token);
  await db
    .update(cartItemsTable)
    .set({ quantity })
    .where(
      and(eq(cartItemsTable.id, itemId), eq(cartItemsTable.cartId, cart.id)),
    );
  res.json(await buildCartPayload(cart.id, cart.token));
});

router.delete("/cart/items/:itemId", async (req, res): Promise<void> => {
  const itemId = Number(req.params.itemId);
  const cart = await getOrCreateCartByToken(req.cookies?.[CART_COOKIE]);
  setCartCookie(res, cart.token);
  await db
    .delete(cartItemsTable)
    .where(
      and(eq(cartItemsTable.id, itemId), eq(cartItemsTable.cartId, cart.id)),
    );
  res.json(await buildCartPayload(cart.id, cart.token));
});

router.post("/cart/clear", async (req, res): Promise<void> => {
  const cart = await getOrCreateCartByToken(req.cookies?.[CART_COOKIE]);
  setCartCookie(res, cart.token);
  await db.delete(cartItemsTable).where(eq(cartItemsTable.cartId, cart.id));
  res.json(await buildCartPayload(cart.id, cart.token));
});

export default router;
