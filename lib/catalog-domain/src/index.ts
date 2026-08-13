export const COMMERCIAL_STATUSES = [
  "RESEARCH_ONLY",
  "DRAFT",
  "VERIFYING",
  "APPROVAL_PENDING",
  "PUBLIC_INFO_ONLY",
  "PUBLIC_REQUEST_PRICE",
  "PUBLIC_SELLABLE",
  "SUSPENDED",
  "RETIRED",
] as const;
export type CommercialStatus = (typeof COMMERCIAL_STATUSES)[number];

export const INDEX_POLICIES = [
  "INDEX_SELF",
  "CANONICAL_PARENT",
  "NOINDEX_REVIEW",
] as const;
export type IndexPolicy = (typeof INDEX_POLICIES)[number];

export const MEDIA_KINDS = [
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
] as const;
export type MediaKind = (typeof MEDIA_KINDS)[number];

export const PUBLICATION_STATUSES = [
  "DRAFT",
  "APPROVED",
  "SUSPENDED",
  "RETIRED",
] as const;
export type PublicationStatus = (typeof PUBLICATION_STATUSES)[number];

export interface ProductIdentity {
  id: string;
  externalId?: string;
  canonicalName: string;
  slug: string;
  brand: string;
  brandSlug: string;
  provider?: string | null;
  category: string;
  canonicalPath: `/${string}`;
}

export interface Plan {
  id: string;
  productId: string;
  planKey: string;
  planName: string;
  billingCycle?: string | null;
  status: PublicationStatus;
  indexPolicy: IndexPolicy;
  canonicalPath: `/${string}`;
}

export interface VerificationRef {
  source: string;
  verifiedAt: string;
  verifiedBy: string;
  approvalReference?: string;
  reviewDueAt?: string | null;
}

export interface CommercialOffer {
  id: string;
  productId: string;
  planId?: string | null;
  sku: string;
  commercialStatus: CommercialStatus;
  priceBdt?: number | null;
  currency?: "BDT";
  accessModel?: string | null;
  availability?: string | null;
  activationMethod?: string | null;
  deliveryWindow?: string | null;
  approved: boolean;
  verification?: VerificationRef | null;
}

export interface MediaAsset {
  id: string;
  mediaKey: string;
  kind: MediaKind;
  publicUri: string;
  mimeType: string;
  width?: number | null;
  height?: number | null;
  durationMs?: number | null;
  posterMediaId?: string | null;
  altEn?: string | null;
  altBn?: string | null;
  captionEn?: string | null;
  captionBn?: string | null;
  publicationStatus: PublicationStatus;
  offerId?: string | null;
}

export interface PublicOffer {
  id: string;
  sku: string;
  mode: "REQUEST_PRICE" | "SELLABLE";
  priceBdt: number | null;
  currency: "BDT";
  accessModel: string | null;
  availability: string | null;
  activationMethod: string | null;
  deliveryWindow: string | null;
}

export interface PublicProductView {
  identity: ProductIdentity;
  plans: Plan[];
  media: MediaAsset[];
  offer: PublicOffer | null;
  canRenderPrice: boolean;
  canRenderPurchaseCta: boolean;
  canRenderOfferSchema: boolean;
}

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

const isNonEmpty = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isValidNonNegativeInteger = (value: number | null | undefined): value is number =>
  typeof value === "number" && Number.isInteger(value) && value >= 0;

const hasValidPath = (value: string): value is `/${string}` => value.startsWith("/");

export function assertProductIdentity(identity: ProductIdentity): void {
  if (!isNonEmpty(identity.id)) throw new Error("product identity requires id");
  if (!isNonEmpty(identity.canonicalName)) throw new Error("product identity requires canonicalName");
  if (!isNonEmpty(identity.slug)) throw new Error("product identity requires slug");
  if (!isNonEmpty(identity.brand)) throw new Error("product identity requires brand");
  if (!isNonEmpty(identity.brandSlug)) throw new Error("product identity requires brandSlug");
  if (!isNonEmpty(identity.category)) throw new Error("product identity requires category");
  if (!hasValidPath(identity.canonicalPath)) throw new Error("product canonicalPath must start with /");
}

export function assertPlan(plan: Plan): void {
  if (!isNonEmpty(plan.id) || !isNonEmpty(plan.productId)) throw new Error("plan requires id and productId");
  if (!isNonEmpty(plan.planKey) || !isNonEmpty(plan.planName)) throw new Error("plan requires planKey and planName");
  if (!PUBLICATION_STATUSES.includes(plan.status)) throw new Error(`invalid plan publication status: ${plan.status}`);
  if (!INDEX_POLICIES.includes(plan.indexPolicy)) throw new Error(`invalid plan index policy: ${plan.indexPolicy}`);
  if (!hasValidPath(plan.canonicalPath)) throw new Error("plan canonicalPath must start with /");
}

export function assertCommercialOffer(offer: CommercialOffer): void {
  if (!isNonEmpty(offer.id) || !isNonEmpty(offer.productId) || !isNonEmpty(offer.sku)) {
    throw new Error("commercial offer requires id, productId and sku");
  }
  if (!COMMERCIAL_STATUSES.includes(offer.commercialStatus)) {
    throw new Error(`invalid commercial status: ${offer.commercialStatus}`);
  }
  if (offer.priceBdt != null && !isValidNonNegativeInteger(offer.priceBdt)) {
    throw new Error("priceBdt must be a non-negative integer when present");
  }
}

export function assertMediaAsset(asset: MediaAsset): void {
  if (!isNonEmpty(asset.id) || !isNonEmpty(asset.mediaKey) || !isNonEmpty(asset.publicUri)) {
    throw new Error("media asset requires id, mediaKey and publicUri");
  }
  if (!isNonEmpty(asset.mimeType)) throw new Error("media asset requires mimeType");
  if (!MEDIA_KINDS.includes(asset.kind)) throw new Error(`invalid media kind: ${asset.kind}`);
  if (!PUBLICATION_STATUSES.includes(asset.publicationStatus)) {
    throw new Error(`invalid media publication status: ${asset.publicationStatus}`);
  }
}

function offerIsVerified(offer: CommercialOffer): boolean {
  return Boolean(
    offer.approved &&
      offer.verification &&
      isNonEmpty(offer.verification.source) &&
      isNonEmpty(offer.verification.verifiedAt) &&
      isNonEmpty(offer.verification.verifiedBy),
  );
}

export function canRenderPrice(
  context: PublicationContext,
  offer?: CommercialOffer | null,
): boolean {
  if (!context.publicationAllowed || context.quarantine || !offer) return false;
  return (
    offer.commercialStatus === "PUBLIC_SELLABLE" &&
    offerIsVerified(offer) &&
    isValidNonNegativeInteger(offer.priceBdt)
  );
}

export function canRenderPurchaseCta(
  context: PublicationContext,
  offer?: CommercialOffer | null,
): boolean {
  if (!context.publicationAllowed || context.quarantine || !offer) return false;
  return offerIsVerified(offer) && offer.commercialStatus === "PUBLIC_SELLABLE";
}

export function canRenderRequestPriceCta(
  context: PublicationContext,
  offer?: CommercialOffer | null,
): boolean {
  if (!context.publicationAllowed || context.quarantine || !offer) return false;
  return offerIsVerified(offer) && offer.commercialStatus === "PUBLIC_REQUEST_PRICE";
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
    assertMediaAsset(asset);
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
  assertCommercialOffer(offer);
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
  if (!isValidNonNegativeInteger(offer.priceBdt)) return null;

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
  assertProductIdentity(input.identity);
  const plans = (input.plans ?? []).filter((plan) => {
    assertPlan(plan);
    return plan.status === "APPROVED";
  });
  const offer = input.offer ?? null;
  if (offer) assertCommercialOffer(offer);

  return {
    identity: input.identity,
    plans,
    media: filterPublicMedia(context, input.media ?? [], offer),
    offer: buildPublicOffer(context, offer),
    canRenderPrice: canRenderPrice(context, offer),
    canRenderPurchaseCta: canRenderPurchaseCta(context, offer),
    canRenderOfferSchema: canRenderOfferSchema(context, offer),
  };
}
