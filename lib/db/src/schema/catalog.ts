import {
  pgTable,
  serial,
  integer,
  text,
  boolean,
  timestamp,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const productFamiliesTable = pgTable(
  "product_families",
  {
    id: serial("id").primaryKey(),
    externalId: text("external_id").notNull().unique(),
    canonicalName: text("canonical_name").notNull(),
    slug: text("slug").notNull().unique(),
    brand: text("brand").notNull(),
    brandSlug: text("brand_slug").notNull(),
    provider: text("provider"),
    category: text("category").notNull(),
    entityType: text("entity_type").notNull().default("software"),
    canonicalPath: text("canonical_path").notNull(),
    status: text("status").notNull().default("DRAFT"),
    primaryOfficialUrl: text("primary_official_url"),
    termsUrl: text("terms_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("product_families_canonical_path_idx").on(table.canonicalPath),
    index("product_families_category_idx").on(table.category),
    index("product_families_provider_idx").on(table.provider),
  ],
);

export const productPlansTable = pgTable(
  "product_plans",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    planKey: text("plan_key").notNull(),
    planName: text("plan_name").notNull(),
    billingCycle: text("billing_cycle"),
    seatModel: text("seat_model"),
    featureProfile: jsonb("feature_profile").$type<Record<string, unknown>>().default({}).notNull(),
    position: integer("position").notNull().default(0),
    status: text("status").notNull().default("DRAFT"),
    canonicalPath: text("canonical_path").notNull(),
    indexPolicy: text("index_policy").notNull().default("CANONICAL_PARENT"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("product_plans_product_key_idx").on(table.productId, table.planKey),
    uniqueIndex("product_plans_canonical_path_idx").on(table.canonicalPath),
    index("product_plans_product_idx").on(table.productId),
  ],
);

export const providerFactSnapshotsTable = pgTable(
  "provider_fact_snapshots",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    planId: integer("plan_id"),
    factType: text("fact_type").notNull(),
    value: jsonb("value").$type<unknown>().notNull(),
    sourceUrl: text("source_url").notNull(),
    sourceTitle: text("source_title"),
    contentHash: text("content_hash"),
    status: text("status").notNull().default("VERIFIED"),
    verifiedAt: timestamp("verified_at", { withTimezone: true }).notNull(),
    verifiedBy: text("verified_by").notNull(),
    validFrom: timestamp("valid_from", { withTimezone: true }),
    validUntil: timestamp("valid_until", { withTimezone: true }),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("provider_facts_product_idx").on(table.productId),
    index("provider_facts_plan_idx").on(table.planId),
    index("provider_facts_type_idx").on(table.factType),
  ],
);

export const commercialOffersTable = pgTable(
  "commercial_offers",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    planId: integer("plan_id"),
    sku: text("sku").notNull().unique(),
    commercialStatus: text("commercial_status").notNull().default("DRAFT"),
    accessModel: text("access_model"),
    priceBdt: integer("price_bdt"),
    billingCycle: text("billing_cycle"),
    availability: text("availability"),
    stockPolicy: text("stock_policy"),
    activationMethod: text("activation_method"),
    deliveryWindow: text("delivery_window"),
    paymentMethods: jsonb("payment_methods").$type<string[]>().default([]).notNull(),
    approved: boolean("approved").notNull().default(false),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    approvedBy: text("approved_by"),
    approvalReference: text("approval_reference"),
    reviewDueAt: timestamp("review_due_at", { withTimezone: true }),
    suspendedAt: timestamp("suspended_at", { withTimezone: true }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("commercial_offers_product_idx").on(table.productId),
    index("commercial_offers_plan_idx").on(table.planId),
    index("commercial_offers_status_idx").on(table.commercialStatus),
  ],
);

export const mediaAssetsTable = pgTable(
  "media_assets",
  {
    id: serial("id").primaryKey(),
    mediaKey: text("media_key").notNull().unique(),
    kind: text("kind").notNull(),
    mimeType: text("mime_type").notNull(),
    sourceKind: text("source_kind").notNull().default("upload"),
    originalUri: text("original_uri"),
    publicUri: text("public_uri").notNull(),
    width: integer("width"),
    height: integer("height"),
    fileSizeBytes: integer("file_size_bytes"),
    durationMs: integer("duration_ms"),
    posterMediaId: integer("poster_media_id"),
    altEn: text("alt_en"),
    altBn: text("alt_bn"),
    captionEn: text("caption_en"),
    captionBn: text("caption_bn"),
    copyrightOwner: text("copyright_owner"),
    licenseSourceUrl: text("license_source_url"),
    checksum: text("checksum"),
    processingStatus: text("processing_status").notNull().default("READY"),
    publicationStatus: text("publication_status").notNull().default("DRAFT"),
    offerId: integer("offer_id"),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("media_assets_kind_idx").on(table.kind),
    index("media_assets_publication_idx").on(table.publicationStatus),
    index("media_assets_offer_idx").on(table.offerId),
  ],
);

export const entityMediaTable = pgTable(
  "entity_media",
  {
    id: serial("id").primaryKey(),
    mediaId: integer("media_id").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: integer("entity_id").notNull(),
    placement: text("placement").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    isPrimary: boolean("is_primary").notNull().default(false),
    locale: text("locale").notNull().default("en-BD"),
    visibility: text("visibility").notNull().default("PUBLIC"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("entity_media_placement_idx").on(
      table.mediaId,
      table.entityType,
      table.entityId,
      table.placement,
    ),
    index("entity_media_entity_idx").on(table.entityType, table.entityId),
  ],
);

export const routeRegistryTable = pgTable(
  "route_registry",
  {
    id: serial("id").primaryKey(),
    entityType: text("entity_type").notNull(),
    entityId: integer("entity_id").notNull(),
    canonicalPath: text("canonical_path").notNull().unique(),
    routeType: text("route_type").notNull(),
    indexPolicy: text("index_policy").notNull().default("NOINDEX_REVIEW"),
    locale: text("locale").notNull().default("en-BD"),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("route_registry_entity_idx").on(table.entityType, table.entityId),
    index("route_registry_index_policy_idx").on(table.indexPolicy),
  ],
);

export const redirectRegistryTable = pgTable(
  "redirect_registry",
  {
    id: serial("id").primaryKey(),
    sourcePath: text("source_path").notNull().unique(),
    destinationPath: text("destination_path").notNull(),
    statusCode: integer("status_code").notNull().default(308),
    active: boolean("active").notNull().default(true),
    reason: text("reason"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("redirect_registry_destination_idx").on(table.destinationPath)],
);

export const verificationEventsTable = pgTable(
  "verification_events",
  {
    id: serial("id").primaryKey(),
    entityType: text("entity_type").notNull(),
    entityId: integer("entity_id").notNull(),
    verificationType: text("verification_type").notNull(),
    sourceUrl: text("source_url"),
    result: text("result").notNull(),
    changesDetected: jsonb("changes_detected").$type<Record<string, unknown>>().default({}).notNull(),
    verifiedBy: text("verified_by").notNull(),
    verifiedAt: timestamp("verified_at", { withTimezone: true }).defaultNow().notNull(),
    nextReviewAt: timestamp("next_review_at", { withTimezone: true }),
  },
  (table) => [
    index("verification_events_entity_idx").on(table.entityType, table.entityId),
    index("verification_events_next_review_idx").on(table.nextReviewAt),
  ],
);

export const publicationRevisionsTable = pgTable(
  "publication_revisions",
  {
    id: serial("id").primaryKey(),
    entityType: text("entity_type").notNull(),
    entityId: integer("entity_id").notNull(),
    revision: integer("revision").notNull(),
    publicPayload: jsonb("public_payload").$type<Record<string, unknown>>().notNull(),
    sourceHashes: jsonb("source_hashes").$type<Record<string, string>>().default({}).notNull(),
    publishedBy: text("published_by").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow().notNull(),
    supersededAt: timestamp("superseded_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("publication_revisions_entity_revision_idx").on(
      table.entityType,
      table.entityId,
      table.revision,
    ),
    index("publication_revisions_entity_idx").on(table.entityType, table.entityId),
  ],
);

export type ProductFamily = typeof productFamiliesTable.$inferSelect;
export type InsertProductFamily = typeof productFamiliesTable.$inferInsert;
export type ProductPlan = typeof productPlansTable.$inferSelect;
export type InsertProductPlan = typeof productPlansTable.$inferInsert;
export type ProviderFactSnapshot = typeof providerFactSnapshotsTable.$inferSelect;
export type CommercialOffer = typeof commercialOffersTable.$inferSelect;
export type MediaAsset = typeof mediaAssetsTable.$inferSelect;
export type EntityMedia = typeof entityMediaTable.$inferSelect;
export type RouteRegistryEntry = typeof routeRegistryTable.$inferSelect;
export type RedirectRegistryEntry = typeof redirectRegistryTable.$inferSelect;
export type VerificationEvent = typeof verificationEventsTable.$inferSelect;
export type PublicationRevision = typeof publicationRevisionsTable.$inferSelect;
