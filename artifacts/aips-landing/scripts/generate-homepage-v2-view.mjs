#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = resolve(APP, "../..");

const projection = JSON.parse(readFileSync(join(APP, "data/public-products.json"), "utf8"));
const site = JSON.parse(readFileSync(join(REPO, "ops/ssot/site.json"), "utf8"));
const commercial = JSON.parse(readFileSync(join(REPO, "ops/ssot/commercial.json"), "utf8"));
const retired = JSON.parse(readFileSync(join(REPO, "ops/platforms/retired.json"), "utf8"));
const productRoutesSource = readFileSync(join(APP, "src/lib/productRoutes.ts"), "utf8");
const mediaCatalogPath = join(APP, "public/generated/media-catalog.json");
const mediaCatalog = existsSync(mediaCatalogPath)
  ? JSON.parse(readFileSync(mediaCatalogPath, "utf8"))
  : { assets: {}, links: [] };

const state = projection.projection ?? {};
const products = Array.isArray(projection.products) ? projection.products : [];
const retiredNames = new Set((retired.retired_platforms ?? []).map((p) => String(p.platform ?? "").toLowerCase()));
const retiredSlugs = new Set([...retiredNames].map((name) => `${name}-bangladesh`));

const routeArray = productRoutesSource.match(/BRAND_PAGE_SLUGS\s*=\s*\[([\s\S]*?)\]\s*as const/);
const brandRouteSlugs = new Set(
  routeArray ? [...routeArray[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]) : [],
);

const eligible = products.filter((p) => {
  if (!p || typeof p.slug !== "string") return false;
  if (retiredSlugs.has(p.slug)) return false;
  if (retiredNames.has(String(p.brand ?? "").toLowerCase())) return false;
  return true;
});

const canonicalPath = (slug) => brandRouteSlugs.has(slug) ? `/${slug}` : `/product/${slug}`;
const uniqueSlugs = [...new Set(eligible.map((p) => p.slug))];
const numericPrices = eligible.map((p) => p.price).filter((n) => typeof n === "number" && Number.isFinite(n));
const publicPlans = eligible.filter((p) => !p.requestPrice || p.price != null).length;

const finder = [
  {
    id: "study-research",
    label: "Study & research",
    description: "Understand difficult topics, organize research and improve your own drafts.",
    href: "/best-ai-for-students",
    recommendationSlugs: ["chatgpt-plus-bangladesh", "perplexity-pro-bangladesh", "claude-pro-bangladesh"],
  },
  {
    id: "freelancing",
    label: "Freelancing & client work",
    description: "Research clients, draft proposals and build repeatable delivery workflows.",
    href: "/best-ai-for-freelancers",
    recommendationSlugs: ["chatgpt-plus-bangladesh", "claude-pro-bangladesh", "canva-pro-bangladesh"],
  },
  {
    id: "content-video",
    label: "Content & video",
    description: "Plan, design, generate and edit creative work with the right specialist tools.",
    href: "/best-ai-for-creators",
    recommendationSlugs: ["midjourney-bangladesh", "runway-bangladesh", "canva-pro-bangladesh"],
  },
  {
    id: "coding-apps",
    label: "Coding & apps",
    description: "Use AI for code assistance, debugging and review while keeping human verification in the loop.",
    href: "/best-ai-for-developers",
    recommendationSlugs: ["github-copilot-bangladesh", "claude-pro-bangladesh", "chatgpt-plus-bangladesh"],
  },
  {
    id: "business-automation",
    label: "Business & automation",
    description: "Reduce repetitive support, reporting and content work with controlled AI workflows.",
    href: "/best-ai-for-business",
    recommendationSlugs: ["chatgpt-business-bangladesh", "notion-business-bangladesh", "claude-pro-bangladesh"],
  },
  {
    id: "writing-marketing",
    label: "Writing, marketing & SEO",
    description: "Draft, refine and organize content with tools matched to your workflow and budget.",
    href: "/products",
    recommendationSlugs: ["chatgpt-plus-bangladesh", "canva-pro-bangladesh", "notion-business-bangladesh"],
  },
];

const editorialRecommendationSlugs = [
  "chatgpt-plus-bangladesh",
  "claude-pro-bangladesh",
  "gemini-advanced-bangladesh",
  "midjourney-bangladesh",
  "runway-bangladesh",
  "github-copilot-bangladesh",
  "perplexity-pro-bangladesh",
  "canva-pro-bangladesh",
  "notion-business-bangladesh",
  "elevenlabs-bangladesh",
];
const recommendationSlugs = [
  ...new Set([
    ...editorialRecommendationSlugs,
    ...finder.flatMap((intent) => intent.recommendationSlugs),
  ]),
];

function publicRowsForSlug(slug) {
  return eligible
    .filter((p) => p.slug === slug)
    .sort((a, b) => {
      const ap = typeof a.price === "number" ? a.price : Number.POSITIVE_INFINITY;
      const bp = typeof b.price === "number" ? b.price : Number.POSITIVE_INFINITY;
      return ap - bp;
    });
}

const recommendations = recommendationSlugs
  .map((slug) => {
    const rows = publicRowsForSlug(slug);
    if (!rows.length) return null;
    const first = rows[0];
    return {
      slug,
      href: canonicalPath(slug),
      brand: first.brand,
      category: first.category,
      variants: rows.map((p) => ({
        name: p.name,
        tier: p.tier ?? null,
        accessType: p.accessType ?? null,
        price: typeof p.price === "number" ? p.price : null,
        requestPrice: Boolean(p.requestPrice || p.price == null),
      })),
    };
  })
  .filter(Boolean);

const accessModels = [
  {
    id: "personal",
    label: "Personal / dedicated",
    description: "A dedicated plan or account intended for one customer where the product record explicitly supports it.",
    caution: "Use product-specific provider terms and privacy guidance for sensitive work.",
  },
  {
    id: "shared",
    label: "Shared",
    description: "A lower-cost access arrangement shared across multiple users where explicitly listed on the product.",
    caution: "Shared access can have privacy, continuity and provider-policy implications. Review the exact product terms before buying.",
  },
  {
    id: "bundle",
    label: "Bundle / package",
    description: "AIPS-curated package combining multiple tools or services under one offer.",
    caution: "Included tools and access types must be checked on the package page before payment.",
  },
  {
    id: "service",
    label: "Setup / service",
    description: "AIPS provides setup, implementation or advisory work rather than a conventional subscription login.",
    caution: null,
  },
];

const approvedPaymentText = String(commercial?.commercial_facts?.approved_payment_facts ?? "");
const payments = [
  approvedPaymentText.toLowerCase().includes("bkash") ? { id: "bkash", label: "bKash" } : null,
  approvedPaymentText.toLowerCase().includes("nagad") ? { id: "nagad", label: "Nagad" } : null,
].filter(Boolean);

const trustFacts = [];
const socialProof = commercial?.commercial_facts?.approved_social_proof;
if (socialProof) trustFacts.push({ id: "social-proof", label: "Owner-attested customer history", value: String(socialProof).split(" -- ")[0], source: "ops/ssot/commercial.json" });
trustFacts.push({ id: "catalog", label: "Public AI tool families", value: String(uniqueSlugs.length), source: "public product projection" });
trustFacts.push({ id: "market", label: "Built for", value: String(site?.identity?.market ?? "Bangladesh"), source: "ops/ssot/site.json" });

function resolveHomepageMedia(link) {
  const asset = mediaCatalog.assets?.[link.mediaId];
  if (!asset) return null;
  const poster = asset.posterMediaId ? mediaCatalog.assets?.[asset.posterMediaId] : null;
  return {
    id: asset.id,
    kind: asset.kind,
    publicUri: asset.publicUri,
    mimeType: asset.mimeType,
    width: asset.width ?? null,
    height: asset.height ?? null,
    durationMs: asset.durationMs ?? null,
    posterUri: poster?.publicUri ?? null,
    alt: asset.altEn ?? "",
    caption: asset.captionEn ?? "",
  };
}

const homepageLinks = (mediaCatalog.links ?? [])
  .filter((link) => link.entityType === "homepage" && link.entityKey === "home")
  .sort((a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0));
const heroLink = homepageLinks.find((link) => link.placement === "hero" && link.isPrimary)
  ?? homepageLinks.find((link) => link.placement === "hero")
  ?? null;
const hero = heroLink ? resolveHomepageMedia(heroLink) : null;
const demos = homepageLinks
  .filter((link) => link.placement === "demo")
  .map(resolveHomepageMedia)
  .filter(Boolean);

const output = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  publication: {
    publicationAllowed: Boolean(state.publication_allowed),
    quarantine: Boolean(state.quarantine),
    mode: String(state.mode ?? "unknown"),
  },
  identity: {
    name: String(site?.identity?.name ?? "AI Premium Shop"),
    market: String(site?.identity?.market ?? "Bangladesh"),
  },
  catalog: {
    productFamilies: uniqueSlugs.length,
    publicPlans,
    minPrice: numericPrices.length ? Math.min(...numericPrices) : null,
  },
  payments,
  finder,
  recommendations,
  accessModels,
  trustFacts,
  media: { hero, demos },
};

const outDir = join(APP, "src/generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(
  join(outDir, "homepageV2.ts"),
  `// Generated by scripts/generate-homepage-v2-view.mjs. Do not hand-edit build output.\nimport type { PublicHomepageView } from "@/lib/homepageV2";\n\nexport const HOMEPAGE_V2: PublicHomepageView = ${JSON.stringify(output, null, 2)};\n`,
  "utf8",
);
console.log(`[homepage-v2] ${uniqueSlugs.length} product families, ${recommendations.length} recommendation families, ${demos.length} demo media assets, mode=${output.publication.mode}`);
