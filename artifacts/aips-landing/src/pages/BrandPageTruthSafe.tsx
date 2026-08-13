import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Info,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { BrandIcon } from "@/components/BrandIcon";
import { formatBDT } from "@/lib/format";
import { productPath } from "@/lib/productRoutes";
import productsData from "../../data/catalog-pages.json";

const WHATSAPP = "https://wa.me/8801865385348";
const SITE = "https://aipremiumshop.com";
const RETIRED_PRODUCT_SLUGS = new Set(["replit-bangladesh"]);

interface ProductRecord {
  id: string;
  name: string;
  slug: string;
  brand: string | null;
  brandSlug: string | null;
  brandColor: string | null;
  category: string;
  tier: string | null;
  price: number | null;
  requestPrice?: boolean;
  officialUSD: number | null;
  accessType: string | null;
  deliverySLA: string | null;
  badge?: string | null;
  description: string | null;
  whatsappMsg?: string | null;
  featured?: boolean;
  capabilities?: string[];
}

const allProducts = (productsData.products as ProductRecord[]).filter(
  (product) => !RETIRED_PRODUCT_SLUGS.has(product.slug),
);

const CATEGORY_LABELS: Record<string, string> = {
  "ai-assistant": "AI Chat & Assistants",
  "ai-image": "AI Image & Design",
  "ai-video": "AI Video",
  "ai-voice-music": "AI Voice & Music",
  "ai-code": "AI Code & Development",
  "ai-workspace": "AI Workspace",
  "ai-writing": "AI Writing & SEO",
  "ai-design": "AI Design & Creative",
  bundles: "Bundles & Services",
};

const CAPABILITY_LABELS: Record<string, string> = {
  text: "Text",
  code: "Coding",
  vision: "Vision",
  document: "Documents",
  search: "Search",
  "image-gen": "Image generation",
  "video-gen": "Video generation",
  agents: "Agents",
  workspace: "Workspace",
  audio: "Audio",
  music: "Music",
  voice: "Voice",
  design: "Design",
};

function baseName(name: string): string {
  return name.split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
}

function fitTitle(value: string): string {
  if (value.length <= 68) return value;
  const suffix = " | AI Premium Shop";
  const room = Math.max(24, 68 - suffix.length);
  return `${value.slice(0, room - 1).trimEnd()}…${suffix}`;
}

function fitDescription(value: string): string {
  return value.length <= 158 ? value : `${value.slice(0, 157).trimEnd()}…`;
}

function accessLabel(accessType: string | null): string {
  switch (accessType) {
    case "shared": return "Shared access";
    case "personal": return "Personal access";
    case "team": return "Team access";
    case "bundle": return "Bundle";
    case "setup-service":
    case "setup":
    case "service": return "Setup / service";
    default: return "Access model: confirm";
  }
}

function categoryPath(category: string): string {
  return category === "bundles" ? "/bundles" : `/${category}`;
}

function safeWhatsAppText(product: ProductRecord): string {
  const price = product.requestPrice || product.price == null ? "current price on request" : `published price ${formatBDT(product.price)}`;
  return `Hi, I want ${baseName(product.name)} (${product.tier ?? "current plan"}) from AI Premium Shop. ${price}. Please confirm current access model, availability, provider limits, delivery ETA and applicable terms before payment.`;
}

function RetiredBrandPage() {
  return (
    <PageLayout>
      <SEOHead
        title="Retired Listing | AI Premium Shop"
        description="This older listing is no longer part of the current AI Premium Shop catalog. Browse active AI development tools instead."
        canonical={`${SITE}/ai-code`}
        noindex
      />
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center mb-5" style={{ backgroundColor: "#151b3d" }}>
          <Info className="w-6 h-6" style={{ color: "#f4b942" }} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">This listing has been retired</h1>
        <p className="max-w-2xl mx-auto leading-relaxed mb-8" style={{ color: "#c9ceda" }}>
          It is not part of the current public AIPS catalog. Use the active AI development category to compare currently published alternatives.
        </p>
        <Link href="/ai-code" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }}>
          Browse active development tools <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </PageLayout>
  );
}

export default function BrandPageTruthSafe({ brandSlug }: { brandSlug: string }) {
  const reducedMotion = useReducedMotion();

  if (RETIRED_PRODUCT_SLUGS.has(brandSlug)) return <RetiredBrandPage />;

  const products = useMemo(() => {
    const direct = allProducts.filter((product) => product.slug === brandSlug);
    if (direct.length) return direct.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    return allProducts
      .filter((product) => product.brandSlug === brandSlug)
      .sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  }, [brandSlug]);

  if (!products.length) {
    return (
      <PageLayout>
        <SEOHead
          title="Listing Not Found | AI Premium Shop"
          description="This listing is not available in the current public AI Premium Shop catalog."
          noindex
        />
        <section className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Listing not available</h1>
          <p className="mb-7" style={{ color: "#c9ceda" }}>Browse the current catalog for active AI tools and plans.</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }}>
            Browse current catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </PageLayout>
    );
  }

  const first = products[0];
  const distinctSlugs = new Set(products.map((product) => product.slug));
  const displayName = distinctSlugs.size > 1 ? (first.brand ?? baseName(first.name)) : baseName(first.name);
  const accent = first.brandColor || "#f4b942";
  const category = first.category;
  const categoryLabel = CATEGORY_LABELS[category] ?? category;
  const priced = products.filter((product) => typeof product.price === "number" && (product.price ?? 0) > 0);
  const fromPrice = priced.length ? Math.min(...priced.map((product) => Number(product.price))) : null;
  const capabilities = [...new Set(products.flatMap((product) => product.capabilities ?? []))]
    .map((value) => CAPABILITY_LABELS[value] ?? value.replace(/-/g, " "))
    .slice(0, 8);
  const descriptions = [...new Set(products.map((product) => product.description).filter((value): value is string => Boolean(value)))];
  const summary = descriptions[0] ?? `${displayName} is listed in the current AI Premium Shop catalog.`;
  const seoTitle = fitTitle(`${displayName} Price in Bangladesh | AI Premium Shop`);
  const seoDescription = fitDescription(
    `${fromPrice ? `${displayName} plans currently start from ${formatBDT(fromPrice)}.` : `Check the current ${displayName} price.`} Compare access options in Bangladesh and confirm availability, provider limits, delivery ETA and terms before paying in BDT.`,
  );
  const related = allProducts
    .filter((product) => product.category === category && !distinctSlugs.has(product.slug))
    .filter((product, index, array) => array.findIndex((candidate) => candidate.slug === product.slug) === index)
    .slice(0, 4);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${displayName} plans in Bangladesh`,
    url: `${SITE}/${brandSlug}`,
    description: seoDescription,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${SITE}${productPath(product.slug)}`,
      })),
    },
  };

  const heroPrice = fromPrice ? `From ${formatBDT(fromPrice)}/month` : "Current price on request";

  return (
    <PageLayout>
      <SEOHead title={seoTitle} description={seoDescription} canonical={`${SITE}/${brandSlug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <main id="main-content">
        <section className="relative overflow-hidden border-b border-white/10">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-28 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ backgroundColor: accent }} />
            <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: "#7c3aed" }} />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
            <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2 text-xs mb-8" style={{ color: "#c9ceda" }}>
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={categoryPath(category)} className="hover:text-white">{categoryLabel}</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">{displayName}</span>
            </nav>

            <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
              <motion.div initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center" style={{ backgroundColor: `${accent}18` }}>
                    <BrandIcon brand={first.brand ?? displayName} color={accent} size={36} />
                  </div>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border" style={{ color: accent, borderColor: `${accent}45`, backgroundColor: `${accent}12` }}>
                    <Sparkles className="w-3.5 h-3.5" /> Current public catalog
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">{displayName} in Bangladesh</h1>
                <p className="text-xl font-semibold mb-5" style={{ color: accent }}>{heroPrice}</p>
                <p className="max-w-3xl text-base leading-relaxed" style={{ color: "#c9ceda" }}>{summary}</p>
                <p className="max-w-3xl text-sm leading-relaxed mt-4" style={{ color: "#9ca3af" }}>
                  Published catalog information can change as providers change plans or limits. Confirm the exact access model, current availability, provider limits, delivery ETA and applicable order terms before payment.
                </p>
              </motion.div>

              <motion.aside initial={reducedMotion ? false : { opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.08 }} className="rounded-2xl border border-white/10 p-5" style={{ backgroundColor: "#151b3d" }}>
                <div className="text-sm font-semibold text-white mb-4">Before you pay</div>
                <div className="space-y-3 text-sm" style={{ color: "#c9ceda" }}>
                  <div className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} /><span>Check whether the plan is personal, shared, team, bundle or setup/service.</span></div>
                  <div className="flex items-start gap-2"><Clock3 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} /><span>Confirm the current delivery ETA instead of relying on a default promise.</span></div>
                  <div className="flex items-start gap-2"><WalletCards className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} /><span>Confirm the final BDT price and applicable terms before payment.</span></div>
                </div>
                <a
                  href={`${WHATSAPP}?text=${encodeURIComponent(`Hi, I want to compare current ${displayName} plans. Please confirm access model, availability, provider limits, delivery ETA and applicable terms before payment.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#008236", color: "#fff" }}
                >
                  <MessageCircle className="w-4 h-4" /> Confirm current details
                </a>
              </motion.aside>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-2" style={{ color: accent }}>Current options</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Compare published plans</h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full border border-white/10" style={{ color: "#c9ceda" }}>{products.length} plan record{products.length === 1 ? "" : "s"}</span>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map((product, index) => {
              const priceLabel = product.requestPrice || product.price == null ? "Price on request" : `${formatBDT(product.price)}/month`;
              const wa = `${WHATSAPP}?text=${encodeURIComponent(safeWhatsAppText(product))}`;
              return (
                <motion.article
                  key={product.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.18) }}
                  whileHover={reducedMotion ? undefined : { y: -3 }}
                  className="rounded-2xl border border-white/10 p-5 flex flex-col"
                  style={{ backgroundColor: "#151b3d" }}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-bold text-white leading-snug">{product.name}</h3>
                      {product.tier && <div className="text-xs mt-1" style={{ color: accent }}>{product.tier}</div>}
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full border border-white/10 whitespace-nowrap" style={{ color: "#c9ceda" }}>{accessLabel(product.accessType)}</span>
                  </div>
                  {product.description && <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "#c9ceda" }}>{product.description}</p>}
                  <div className="flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                    <div>
                      <div className="text-xs mb-1" style={{ color: "#9ca3af" }}>Published price</div>
                      <div className="font-bold" style={{ color: "#f4b942" }}>{priceLabel}</div>
                    </div>
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold" style={{ backgroundColor: "#008236", color: "white" }}>
                      <MessageCircle className="w-4 h-4" /> Confirm
                    </a>
                  </div>
                  <div className="mt-3 text-xs flex items-center gap-1.5" style={{ color: "#9ca3af" }}>
                    <Clock3 className="w-3.5 h-3.5" /> Delivery ETA confirmed before payment
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {capabilities.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 md:px-8 pb-12">
            <div className="rounded-2xl border border-white/10 p-6 md:p-8" style={{ backgroundColor: "rgba(21,27,61,0.7)" }}>
              <div className="flex items-center gap-2 mb-4"><Search className="w-5 h-5" style={{ color: accent }} /><h2 className="text-xl font-bold text-white">Catalog capability tags</h2></div>
              <p className="text-sm mb-5 max-w-3xl" style={{ color: "#c9ceda" }}>These are broad catalog tags for discovery, not a promise that every plan includes every feature. Check the selected plan and provider terms before purchase.</p>
              <div className="flex flex-wrap gap-2">
                {capabilities.map((capability) => (
                  <span key={capability} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-white/10" style={{ color: "#e5e7eb", backgroundColor: "rgba(255,255,255,0.03)" }}>
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#10b981" }} /> {capability}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="max-w-6xl mx-auto px-4 md:px-8 pb-14">
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
              <h2 className="text-xl font-bold text-white mb-4">How to choose safely</h2>
              <ol className="space-y-4">
                {[
                  ["1", "Choose the access model", "Use personal access for privacy-sensitive work; understand the operational limits before choosing shared access."],
                  ["2", "Confirm current provider limits", "Models, credits, quotas and included features can change. Confirm what applies to the exact plan you are buying."],
                  ["3", "Confirm ETA and order terms", "Get the current delivery estimate and applicable refund or replacement terms before payment."],
                ].map(([number, title, text]) => (
                  <li key={number} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: `${accent}1f`, color: accent }}>{number}</div>
                    <div><div className="font-semibold text-white text-sm">{title}</div><p className="text-sm mt-1" style={{ color: "#c9ceda" }}>{text}</p></div>
                  </li>
                ))}
              </ol>
              <Link href="/how-to-order" className="inline-flex items-center gap-1.5 text-sm font-semibold mt-5" style={{ color: accent }}>Read the ordering guide <ArrowRight className="w-4 h-4" /></Link>
            </div>

            <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
              <h2 className="text-xl font-bold text-white mb-4">Explore related {categoryLabel}</h2>
              {related.length ? (
                <div className="space-y-2">
                  {related.map((product) => {
                    const label = baseName(product.name);
                    return (
                      <Link key={product.slug} href={productPath(product.slug)} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 hover:border-white/20 transition-colors">
                        <span className="text-sm font-medium text-white">{label}</span>
                        <ChevronRight className="w-4 h-4" style={{ color: "#9ca3af" }} />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm" style={{ color: "#c9ceda" }}>Browse the full category for current alternatives.</p>
              )}
              <Link href={categoryPath(category)} className="inline-flex items-center gap-1.5 text-sm font-semibold mt-5" style={{ color: accent }}>Browse {categoryLabel} <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
