import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
  jsonb,
  real,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").notNull().unique(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  brandSlug: text("brand_slug").notNull(),
  provider: text("provider"),
  brandColor: text("brand_color"),
  category: text("category").notNull(),
  price: integer("price").notNull(),
  officialUsd: real("official_usd"),
  tier: text("tier"),
  accessType: text("access_type").notNull().default("shared"),
  badge: text("badge"),
  description: text("description").notNull(),
  capabilities: jsonb("capabilities").$type<string[]>().default([]).notNull(),
  deliverySla: text("delivery_sla"),
  featured: boolean("featured").notNull().default(false),
  whatsappMsg: text("whatsapp_msg"),
  status: text("status").notNull().default("Active"),
  stock: integer("stock").notNull().default(999),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Product = typeof productsTable.$inferSelect;
export type InsertProduct = typeof productsTable.$inferInsert;
