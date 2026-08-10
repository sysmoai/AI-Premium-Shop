import { z } from "zod";

export const CommercialStatusSchema = z.enum([
  "RESEARCH_ONLY",
  "DRAFT",
  "VERIFYING",
  "APPROVAL_PENDING",
  "PUBLIC_INFO_ONLY",
  "PUBLIC_REQUEST_PRICE",
  "PUBLIC_SELLABLE",
  "SUSPENDED",
  "RETIRED",
]);
export type CommercialStatus = z.infer<typeof CommercialStatusSchema>;

export const IndexPolicySchema = z.enum([
  "INDEX_SELF",
  "CANONICAL_PARENT",
  "NOINDEX_REVIEW",
]);
export type IndexPolicy = z.infer<typeof IndexPolicySchema>;

export const MediaKindSchema = z.enum([
  "LOGO",
  "PRODUCT_HERO",
  "PLAN_HERO",
  "POSTER",
  "GALLERY_IMAGE",
  "SCREENSHOT",
  "INFOGRAPHIC",
  "COMPARISON_GRAPHIC",
  "VIDEO_DEMO",
  "VIDEO_TUTORIAL",
  "VIDEO_POSTER",
  "ANIMATION",
  "OG_IMAGE",
  "CATEGORY_HERO",
  "BRAND_ASSET",
]);
export type MediaKind = z.infer<typeof MediaKindSchema>;

export const PublicationStatusSchema = z.enum([
  "DRAFT",
  "APPROVED",
  "SUSPENDED",
  "RETIRED",
]);
export type PublicationStatus = z.infer<typeof PublicationStatusSchema>;

export const ProductIdentitySchema = z.object({
  id: z.string().min(1),
  externalId: z.string().min(1).optional(),
  canonicalName: z.string().min(1),
  slug: z.string().min(1),
  brand: z.string().min(1),
  brandSlug: z.string().min(1),
  provider: z.string().min(1).nullable().optional(),
  category: z.string().min(1),
  canonicalPath: z.string().startsWith("/"),
});
export type ProductIdentity = z.infer<typeof ProductIdentitySchema>;

export const PlanSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
  planKey: z.string().min(1),
  planName: z.string().min(1),
  billingCycle: z.string().nullable().optional(),
  status: PublicationStatusSchema.default("DRAFT"),
  indexPolicy: IndexPolicySchema.default("CANONICAL_PARENT"),
  canonicalPath: z.string().startsWith("/"),
});
export type Plan = z.infer<typeof PlanSchema>;

export const VerificationRefSchema = z.object({
  source: z.string().min(1),
  verifiedAt: z.string().datetime({ offset: true }),
  verifiedBy: z.string().min(1),
  approvalReference: z.string().min(1).optional(),
  reviewDueAt: z.string().datetime({ offset: true }).nullable().optional(),
});
export type VerificationRef = z.infer<typeof VerificationRefSchema>;

export const CommercialOfferSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
  planId: z.string().min(1).nullable().optional(),
  sku: z.string().min(1),
  commercialStatus: CommercialStatusSchema,
  priceBdt: z.number().int().nonnegative().nullable().optional(),
  currency: z.literal("BDT").default("BDT"),
  accessModel: z.string().min(1).nullable().optional(),
  availability: z.string().min(1).nullable().optional(),
  activationMethod: z.string().min(1).nullable().optional(),
  deliveryWindow: z.string().min(1).nullable().optional(),
  approved: z.boolean().default(false),
  verification: VerificationRefSchema.nullable().optional(),
});
export type CommercialOffer = z.infer<typeof CommercialOfferSchema>;

export const MediaAssetSchema = z.object({
  id: z.string().min(1),
  mediaKey: z.string().min(1),
  kind: MediaKindSchema,
  publicUri: z.string().min(1),
  mimeType: z.string().min(1),
  width: z.number().int().positive().nullable().optional(),
  height: z.number().int().positive().nullable().optional(),
  durationMs: z.number().int().nonnegative().nullable().optional(),
  posterMediaId: z.string().min(1).nullable().optional(),
  altEn: z.string().nullable().optional(),
  altBn: z.string().nullable().optional(),
  captionEn: z.string().nullable().optional(),
  captionBn: z.string().nullable().optional(),
  publicationStatus: PublicationStatusSchema,
  offerId: z.string().min(1).nullable().optional(),
});
export type MediaAsset = z.infer<typeof MediaAssetSchema>;

export const PublicOfferSchema = z.object({
  id: z.string(),
  sku: z.string(),
  mode: z.enum(["REQUEST_PRICE", "SELLABLE"]),
  priceBdt: z.number().int().nonnegative().nullable(),
  currency: z.literal("BDT"),
  accessModel: z.string().nullable(),
  availability: z.string().nullable(),
  activationMethod: z.string().nullable(),
  deliveryWindow: z.string().nullable(),
});
export type PublicOffer = z.infer<typeof PublicOfferSchema>;

export const PublicProductViewSchema = z.object({
  identity: ProductIdentitySchema,
  plans: z.array(PlanSchema),
  media: z.array(MediaAssetSchema),
  offer: PublicOfferSchema.nullable(),
  canRenderPrice: z.boolean(),
  canRenderPurchaseCta: z.boolean(),
  canRenderOfferSchema: z.boolean(),
});
export type PublicProductView = z.infer<typeof PublicProductViewSchema>;

export interface PublicationContext {
  publicationAllowed: boolean;
  quarantine: boolean;
}

export interface BuildPublicProductInput {
  identity: ProductIdentity;
  plans?: Plan[];
  media?: MediaAsset[];
  offer?: CommercialOffer | null;
}

function offerIsVerified(offer: CommercialOffer): boolean {
  return Boolean(offer.approved && offer.verification);
}

export function canRenderPrice(
  context: PublicationContext,
  offer?: CommercialOffer | null,
): boolean {
  if (!context.publicationAllowed || context.quarantine || !offer) return false;
  return (
    offer.commercialStatus === "PUBLIC_SELLABLE" &&
    offerIsVerified(offer) &&
    typeof offer.priceBdt === "number"
  );
}

export function canRenderPurchaseCta(
  context: PublicationContext,
  offer?: CommercialOffer | null,
): boolean {
  if (!context.publicationAllowed || context.quarantine || !offer) return false;
  if (!offerIsVerified(offer)) return false;
  return offer.commercialStatus === "PUBLIC_SELLABLE";
}

export function canRenderRequestPriceCta(
  context: PublicationContext,
  offer?: CommercialOffer | null,
): boolean {
  if (!context.publicationAllowed || context.quarantine || !offer) return false;
  if (!offerIsVerified(offer)) return false;
  return offer.commercialStatus === "PUBLIC_REQUEST_PRICE";
}

export function canRenderOfferSchema(
  context: PublicationContext,
  offer?: CommercialOffer | null,
): boolean {
  return canRenderPrice(context, offer) && canRenderPurchaseCta(context, offer);
}

export function filterPublicMedia(
  context: PublicationContext,
  media: MediaAsset[],
  offer?: CommercialOffer | null,
): MediaAsset[] {
  return media.filter((asset) => {
    if (asset.publicationStatus !== "APPROVED") return false;
    if (!asset.offerId) return true;
    if (!offer || asset.offerId !== offer.id) return false;
    return canRenderPrice(context, offer) || canRenderRequestPriceCta(context, offer);
  });
}

export function buildPublicOffer(
  context: PublicationContext,
  offer?: CommercialOffer | null,
): PublicOffer | null {
  if (!offer || !context.publicationAllowed || context.quarantine) return null;
  if (!offerIsVerified(offer)) return null;

  if (offer.commercialStatus === "PUBLIC_REQUEST_PRICE") {
    return {
      id: offer.id,
      sku: offer.sku,
      mode: "REQUEST_PRICE",
      priceBdt: null,
      currency: "BDT",
      accessModel: offer.accessModel ?? null,
      availability: offer.availability ?? null,
      activationMethod: offer.activationMethod ?? null,
      deliveryWindow: offer.deliveryWindow ?? null,
    };
  }

  if (offer.commercialStatus !== "PUBLIC_SELLABLE") return null;
  if (typeof offer.priceBdt !== "number") return null;

  return {
    id: offer.id,
    sku: offer.sku,
    mode: "SELLABLE",
    priceBdt: offer.priceBdt,
    currency: "BDT",
    accessModel: offer.accessModel ?? null,
    availability: offer.availability ?? null,
    activationMethod: offer.activationMethod ?? null,
    deliveryWindow: offer.deliveryWindow ?? null,
  };
}

export function buildPublicProductView(
  context: PublicationContext,
  input: BuildPublicProductInput,
): PublicProductView {
  const identity = ProductIdentitySchema.parse(input.identity);
  const plans = (input.plans ?? [])
    .map((plan) => PlanSchema.parse(plan))
    .filter((plan) => plan.status === "APPROVED");
  const offer = input.offer ? CommercialOfferSchema.parse(input.offer) : null;
  const media = (input.media ?? []).map((asset) => MediaAssetSchema.parse(asset));

  return PublicProductViewSchema.parse({
    identity,
    plans,
    media: filterPublicMedia(context, media, offer),
    offer: buildPublicOffer(context, offer),
    canRenderPrice: canRenderPrice(context, offer),
    canRenderPurchaseCta: canRenderPurchaseCta(context, offer),
    canRenderOfferSchema: canRenderOfferSchema(context, offer),
  });
}
