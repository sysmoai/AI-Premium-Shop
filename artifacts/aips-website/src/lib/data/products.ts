import rawProducts from "@/data/products.json";

/* ------------------------------------------------------------------ */
/*  Types (mirroring the live-site data shape)                        */
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
  // Enriched fields from Replit catalog
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
}

export interface ProductGroup {
  slug: string;
  name: string; // Display name, e.g. "Claude Pro" not "Claude"
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
/*  Raw data                                                          */
/* ------------------------------------------------------------------ */
const allItems: LiveProduct[] = rawProducts as LiveProduct[];

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */
export function getAllItems(): LiveProduct[] {
  return allItems.filter((i) => i.status === "Active");
}

export function getCategories(): string[] {
  return Array.from(new Set(getAllItems().map((i) => i.category))).sort();
}

export function getCategoryLabel(slug: string): string {
  const cleanSlug = slug.replace(/\s+/g, "");
  const map: Record<string, string> = {
    "ai-assistant": "AI Assistant",
    "ai-code": "AI Code",
    "ai-image": "AI Image",
    "ai-video": "AI Video",
    "ai-voice-music": "AI Voice & Music",
    "ai-workspace": "AI Workspace",
    "ai-writing": "AI Writing",
    bundles: "Bundles",
  };
  return map[cleanSlug] ?? map[slug] ?? slug;
}

export function getProductGroups(): ProductGroup[] {
  const bySlug = new Map<string, LiveProduct[]>();
  for (const item of getAllItems()) {
    if (!bySlug.has(item.slug)) bySlug.set(item.slug, []);
    bySlug.get(item.slug)!.push(item);
  }

  const groups: ProductGroup[] = [];
  for (const [slug, variants] of bySlug) {
    const first = variants[0];
    const prices = variants.map((v) => v.price);
    const allCapabilities = Array.from(
      new Set(variants.flatMap((v) => v.capabilities))
    );
    // Extract display name from first variant.
    const displayName = first.name.split(" - ")[0].trim();
    groups.push({
      slug,
      name: displayName,
      brand: first.brand,
      brandSlug: first.brandSlug,
      provider: first.provider,
      category: first.category,
      description: first.description,
      variants: variants.sort((a, b) => a.price - b.price),
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      capabilities: allCapabilities,
      featured: variants.some((v) => v.featured),
    });
  }

  return groups.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.minPrice - b.minPrice;
  });
}

export function getProductBySlug(slug: string): ProductGroup | undefined {
  return getProductGroups().find((g) => g.slug === slug);
}

export function getItemsByCategory(category: string): LiveProduct[] {
  return getAllItems().filter((i) => i.category === category);
}

export function getFeaturedItems(): LiveProduct[] {
  return getAllItems().filter((i) => i.featured);
}

export function getWhatsappUrl(item: LiveProduct): string {
  const num = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
  const msg = item.whatsappMsg || `Hi, I want ${item.name}`;
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

export function getRelatedProducts(
  currentSlug: string,
  category: string,
  limit = 4
): ProductGroup[] {
  const all = getProductGroups();
  // Same category first, then featured, then any
  const sameCat = all.filter((g) => g.slug !== currentSlug && g.category === category);
  const others = all.filter((g) => g.slug !== currentSlug && g.category !== category);
  return [...sameCat, ...others].slice(0, limit);
}
