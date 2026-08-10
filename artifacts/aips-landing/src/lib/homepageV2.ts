export type HomepagePublicationMode = "approved-commerce" | "informational-fail-closed" | "unknown";

export interface HomepagePublicationState {
  publicationAllowed: boolean;
  quarantine: boolean;
  mode: HomepagePublicationMode;
}

export interface HomepageCatalogSummary {
  productFamilies: number;
  publicPlans: number;
  minPrice: number | null;
}

export interface HomepagePaymentMethod {
  id: string;
  label: string;
}

export interface HomepageRecommendation {
  slug: string;
  name: string;
  brand: string;
  category: string;
  tier: string | null;
  accessType: string | null;
  price: number | null;
  requestPrice: boolean;
}

export interface HomepageIntent {
  id: string;
  label: string;
  description: string;
  href: string;
  recommendationSlugs: string[];
}

export interface HomepageAccessModel {
  id: string;
  label: string;
  description: string;
  caution: string | null;
}

export interface HomepageTrustFact {
  id: string;
  label: string;
  value: string;
  source: string;
}

export interface HomepageMediaAsset {
  id: string;
  kind: string;
  publicUri: string;
  mimeType: string;
  width: number | null;
  height: number | null;
  durationMs: number | null;
  alt: string;
  caption: string;
}

export interface HomepageMediaView {
  hero: HomepageMediaAsset | null;
  demos: HomepageMediaAsset[];
}

export interface PublicHomepageView {
  schemaVersion: 1;
  generatedAt: string;
  publication: HomepagePublicationState;
  identity: {
    name: string;
    market: string;
  };
  catalog: HomepageCatalogSummary;
  payments: HomepagePaymentMethod[];
  finder: HomepageIntent[];
  recommendations: HomepageRecommendation[];
  accessModels: HomepageAccessModel[];
  trustFacts: HomepageTrustFact[];
  media: HomepageMediaView;
}
