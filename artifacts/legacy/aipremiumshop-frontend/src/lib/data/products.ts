import rawProducts from "../../data/products.json";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
export interface LiveProduct {
  id: string;
  name: string;
  slug: string;
  brand: string;
  brandSlug: string;
  provider: string;
  brandColor: string;
  category: string;
  price: number;
  officialUSD: number;
  tier: string;
  accessType: "shared" | "personal" | "bundle";
  badge?: string;
  description: string;
  capabilities: string[];
  deliverySLA: string;
  featured: boolean;
  whatsappMsg: string;
  status: string;
  descriptionBN?: string;
  useCases?: string[];
  whyBuyFromAIPS?: string;
  faq?: { q: string; a: string }[];
  competitorCompare?: { name: string; price: string; advantage: string }[];
  relatedProducts?: string[];
  uniqueSellingPoints?: string[];
  howItWorksSteps?: { step: number; title: string; description: string }[];
  estimatedDeliveryTime?: string;
  deliveryMethod?: string;
  lastVerifiedDate?: string;
  seo?: { title: string; description: string };
  badges?: string[];
  trust?: { warrantyDays: number; replacementGuarantee: boolean };
  plans?: PlanVariant[];
}

export interface PlanVariant {
  planName: string;
  tierLevel: number;
  priceBDT: number;
  officialUSD: number;
  billingCycle: string;
  deliveryType: string;
  whatsIncluded: string[];
  features: string[];
  limitations?: string[];
  bestFor: string;
  seats?: number;
  badge?: string;
  inStock: boolean;
}

export interface ProductGroup {
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  provider: string;
  category: string;
  description: string;
  variants: LiveProduct[];
  minPrice: number;
  maxPrice: number;
  capabilities: string[];
  featured: boolean;
}

/* ------------------------------------------------------------------ */
/*  Unsafe delivery methods — these must not be publicly shown         */
/* ------------------------------------------------------------------ */
const UNSAFE_DELIVERY_METHODS = new Set([
  "account-credentials",
  "shared-account",
  "login-credentials",
  "password-delivery",
  "cookie",
  "session-token",
]);

const FORBIDDEN_TITLE_TOKENS = [
  /\bunlimited\b/i,
  /\blifetime\b/i,
  /\bguaranteed\b/i,
  /\bofficial distributor\b/i,
];

/* ------------------------------------------------------------------ */
/*  Publishability gate — mirrors the compliance branch logic          */
/* ------------------------------------------------------------------ */
export function isPublishable(item: LiveProduct): boolean {
  if (item.status !== "Active") return false;

  if (item.accessType === "shared") return false;

  if (
    item.deliveryMethod &&
    UNSAFE_DELIVERY_METHODS.has(item.deliveryMethod)
  ) {
    return false;
  }

  const searchText = [
    item.name,
    item.tier,
    item.description,
    item.whatsappMsg,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  for (const pattern of FORBIDDEN_TITLE_TOKENS) {
    if (pattern.test(searchText)) return false;
  }

  return true;
}

/* ------------------------------------------------------------------ */
/*  Data accessors                                                      */
/* ------------------------------------------------------------------ */
const allItems: LiveProduct[] = (rawProducts as { products?: LiveProduct[] }).products
  ?? (rawProducts as LiveProduct[]);

export function getPublishableProducts(): LiveProduct[] {
  return allItems.filter(isPublishable);
}

export function getAllProducts(): LiveProduct[] {
  return allItems;
}

export function getFeaturedItems(limit = 6): LiveProduct[] {
  return getPublishableProducts()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getProductBySlug(slug: string): LiveProduct | undefined {
  return allItems.find((p) => p.slug === slug);
}

export function getWhatsappUrl(
  number: string,
  message: string
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function isQuarantined(item: LiveProduct): boolean {
  return !isPublishable(item);
}
