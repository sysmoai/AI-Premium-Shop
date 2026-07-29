import { pgTable, text, varchar, integer, decimal, boolean, timestamp, uuid, jsonb, serial, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

// Enable UUID extension
export const enableUUID = sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

// 1. Brands Table
export const brands = pgTable(
  'brands',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    logo: varchar('logo', { length: 500 }),
    description: text('description'),
    website: varchar('website', { length: 500 }),
    color: varchar('color', { length: 7 }), // hex color
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => ({
    slugIdx: index('brands_slug_idx').on(t.slug),
  })
);

// 2. Policies Table
export const policies = pgTable(
  'policies',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    type: varchar('type', { length: 100 }).notNull(), // 'privacy', 'terms', 'refund', etc
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    contentBn: text('content_bn'), // Bengali version
    effectiveDate: timestamp('effective_date'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  }
);

// 3. Categories Table
export const categories = pgTable(
  'categories',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    description: text('description'),
    descriptionBn: text('description_bn'),
    icon: varchar('icon', { length: 100 }), // emoji or icon name
    order: integer('order').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => ({
    slugIdx: index('categories_slug_idx').on(t.slug),
    orderIdx: index('categories_order_idx').on(t.order),
  })
);

// 4. Products Table
export const products = pgTable(
  'products',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    brandId: uuid('brand_id').references(() => brands.id),
    categoryId: uuid('category_id').references(() => categories.id),
    description: text('description'),
    descriptionBn: text('description_bn'),
    priceBdt: integer('price_bdt'),
    priceUsd: decimal('price_usd', { precision: 10, scale: 2 }),
    features: jsonb('features'), // JSON array of features
    useCase: text('use_case'),
    useCaseBn: text('use_case_bn'),
    imageUrl: varchar('image_url', { length: 500 }),
    demoVideoUrl: varchar('demo_video_url', { length: 500 }),
    rating: decimal('rating', { precision: 3, scale: 1 }).default('4.8'),
    reviewCount: integer('review_count').default(0),
    inStock: boolean('in_stock').default(true),
    accessType: varchar('access_type', { length: 50 }), // 'shared', 'personal', etc
    deliveryTime: varchar('delivery_time', { length: 100 }), // '5-30 minutes', etc
    warranty: varchar('warranty', { length: 100 }), // '30 days', etc
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => ({
    slugIdx: index('products_slug_idx').on(t.slug),
    categoryIdx: index('products_category_idx').on(t.categoryId),
    brandIdx: index('products_brand_idx').on(t.brandId),
  })
);

// 5. Variants Table
export const variants = pgTable(
  'variants',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    priceBdt: integer('price_bdt'),
    priceUsd: decimal('price_usd', { precision: 10, scale: 2 }),
    features: jsonb('features'),
    inStock: boolean('in_stock').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => ({
    productIdx: index('variants_product_idx').on(t.productId),
  })
);

// 6. Bullets/Features Table
export const bullets = pgTable(
  'bullets',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }),
    variantId: uuid('variant_id').references(() => variants.id, { onDelete: 'cascade' }),
    text: text('text').notNull(),
    textBn: text('text_bn'),
    order: integer('order').default(0),
    createdAt: timestamp('created_at').defaultNow(),
  }
);

// 7. FAQ Table
export const faq = pgTable(
  'faq',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    question: text('question').notNull(),
    questionBn: text('question_bn'),
    answer: text('answer').notNull(),
    answerBn: text('answer_bn'),
    category: varchar('category', { length: 100 }),
    order: integer('order').default(0),
    visible: boolean('visible').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  }
);

// 8. Customers Table
export const customers = pgTable(
  'customers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }),
    phone: varchar('phone', { length: 20 }),
    country: varchar('country', { length: 2 }).default('BD'),
    segment: varchar('segment', { length: 100 }), // 'student', 'freelancer', 'business', etc
    language: varchar('language', { length: 10 }).default('en'), // 'en', 'bn'
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => ({
    emailIdx: index('customers_email_idx').on(t.email),
    countryIdx: index('customers_country_idx').on(t.country),
  })
);

// 9. Leads Table
export const leads = pgTable(
  'leads',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull(),
    productId: uuid('product_id').references(() => products.id),
    segment: varchar('segment', { length: 100 }),
    source: varchar('source', { length: 100 }), // 'whatsapp', 'website', 'email', etc
    status: varchar('status', { length: 50 }).default('new'), // 'new', 'contacted', 'qualified', 'lost'
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => ({
    emailIdx: index('leads_email_idx').on(t.email),
    statusIdx: index('leads_status_idx').on(t.status),
  })
);

// 10. Orders Table
export const orders = pgTable(
  'orders',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    customerId: uuid('customer_id').references(() => customers.id),
    productId: uuid('product_id').references(() => products.id),
    variantId: uuid('variant_id').references(() => variants.id),
    quantity: integer('quantity').default(1),
    totalBdt: integer('total_bdt').notNull(),
    paymentMethod: varchar('payment_method', { length: 50 }), // 'bkash', 'nagad', 'rocket', 'bank', 'binance'
    transactionId: varchar('transaction_id', { length: 255 }),
    status: varchar('status', { length: 20 }).default('pending'), // 'pending', 'paid', 'delivered', 'refunded'
    deliveryDate: timestamp('delivery_date'),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => ({
    customerIdx: index('orders_customer_idx').on(t.customerId),
    statusIdx: index('orders_status_idx').on(t.status),
    productIdx: index('orders_product_idx').on(t.productId),
  })
);

// 11. Conversations Table
export const conversations = pgTable(
  'conversations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    customerId: uuid('customer_id').references(() => customers.id),
    subject: varchar('subject', { length: 255 }),
    channel: varchar('channel', { length: 50 }), // 'whatsapp', 'email', 'chat', etc
    status: varchar('status', { length: 50 }).default('open'), // 'open', 'closed', 'pending'
    lastMessageAt: timestamp('last_message_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => ({
    customerIdx: index('conversations_customer_idx').on(t.customerId),
    statusIdx: index('conversations_status_idx').on(t.status),
  })
);

// 12. Cases/Support Tickets Table
export const cases = pgTable(
  'cases',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    customerId: uuid('customer_id').references(() => customers.id),
    orderId: uuid('order_id').references(() => orders.id),
    subject: varchar('subject', { length: 255 }).notNull(),
    description: text('description').notNull(),
    priority: varchar('priority', { length: 20 }).default('normal'), // 'low', 'normal', 'high', 'urgent'
    status: varchar('status', { length: 50 }).default('open'), // 'open', 'in_progress', 'resolved', 'closed'
    resolution: text('resolution'),
    resolvedAt: timestamp('resolved_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => ({
    customerIdx: index('cases_customer_idx').on(t.customerId),
    statusIdx: index('cases_status_idx').on(t.status),
    priorityIdx: index('cases_priority_idx').on(t.priority),
  })
);

// 13. Media Table
export const media = pgTable(
  'media',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    url: varchar('url', { length: 500 }).notNull(),
    type: varchar('type', { length: 50 }), // 'image', 'video', 'document'
    alt: varchar('alt', { length: 255 }),
    altBn: varchar('alt_bn', { length: 255 }),
    bucket: varchar('bucket', { length: 100 }), // 'product-images', 'generated-content', etc
    uploadedBy: uuid('uploaded_by'),
    size: integer('size'), // in bytes
    createdAt: timestamp('created_at').defaultNow(),
  }
);

// 14. Blog Posts Table
export const blogPosts = pgTable(
  'blog_posts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    titleBn: varchar('title_bn', { length: 255 }),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    content: text('content').notNull(),
    contentBn: text('content_bn'),
    excerpt: text('excerpt'),
    excerptBn: text('excerpt_bn'),
    author: varchar('author', { length: 255 }),
    tags: jsonb('tags'), // JSON array of tags
    featured: boolean('featured').default(false),
    published: boolean('published').default(false),
    publishedAt: timestamp('published_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => ({
    slugIdx: index('blog_posts_slug_idx').on(t.slug),
    publishedIdx: index('blog_posts_published_idx').on(t.published),
  })
);

// 15. Change Log Table
export const changeLog = pgTable(
  'change_log',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    entityType: varchar('entity_type', { length: 100 }).notNull(), // 'product', 'order', 'customer', etc
    entityId: uuid('entity_id').notNull(),
    action: varchar('action', { length: 50 }).notNull(), // 'create', 'update', 'delete'
    changes: jsonb('changes'), // what changed
    changedBy: uuid('changed_by'),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (t) => ({
    entityIdx: index('change_log_entity_idx').on(t.entityType),
    createdAtIdx: index('change_log_created_at_idx').on(t.createdAt),
  })
);

// Relations
export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  variants: many(variants),
  bullets: many(bullets),
  leads: many(leads),
  orders: many(orders),
}));

export const variantsRelations = relations(variants, ({ one, many }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
  }),
  bullets: many(bullets),
  orders: many(orders),
}));

export const bulletsRelations = relations(bullets, ({ one }) => ({
  product: one(products, {
    fields: [bullets.productId],
    references: [products.id],
  }),
  variant: one(variants, {
    fields: [bullets.variantId],
    references: [variants.id],
  }),
}));

export const customersRelations = relations(customers, ({ many }) => ({
  orders: many(orders),
  leads: many(leads),
  conversations: many(conversations),
  cases: many(cases),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  product: one(products, {
    fields: [leads.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  product: one(products, {
    fields: [orders.productId],
    references: [products.id],
  }),
  variant: one(variants, {
    fields: [orders.variantId],
    references: [variants.id],
  }),
  cases: many(cases),
}));

export const conversationsRelations = relations(conversations, ({ one }) => ({
  customer: one(customers, {
    fields: [conversations.customerId],
    references: [customers.id],
  }),
}));

export const casesRelations = relations(cases, ({ one }) => ({
  customer: one(customers, {
    fields: [cases.customerId],
    references: [customers.id],
  }),
  order: one(orders, {
    fields: [cases.orderId],
    references: [orders.id],
  }),
}));
