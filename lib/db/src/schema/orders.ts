import {
  pgTable,
  text,
  serial,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  paymentMethod: text("payment_method").notNull().default("whatsapp"),
  paymentReference: text("payment_reference"),
  notes: text("notes"),
  subtotal: integer("subtotal").notNull(),
  total: integer("total").notNull(),
  currency: text("currency").notNull().default("BDT"),
  status: text("status").notNull().default("pending"),
  itemsSnapshot: jsonb("items_snapshot")
    .$type<
      Array<{
        productId: number;
        externalId: string;
        name: string;
        brand: string;
        slug: string;
        price: number;
        quantity: number;
      }>
    >()
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orderItemsTable = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => ordersTable.id, { onDelete: "cascade" }),
  productId: integer("product_id").notNull(),
  productName: text("product_name").notNull(),
  productSlug: text("product_slug").notNull(),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull(),
  lineTotal: integer("line_total").notNull(),
});

export type Order = typeof ordersTable.$inferSelect;
export type InsertOrder = typeof ordersTable.$inferInsert;
export type OrderItem = typeof orderItemsTable.$inferSelect;
