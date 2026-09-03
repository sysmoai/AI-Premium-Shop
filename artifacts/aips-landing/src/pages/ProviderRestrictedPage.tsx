import { ChevronRight, ExternalLink, Info, ShieldAlert } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { productPath } from "@/lib/productRoutes";
import { breadcrumbSchema, schemaJson } from "@/utils/schemas";
import informationalProductsData from "../../data/informational-products.json";

const SITE = "https://aipremiumshop.com";

type InformationalProduct = {
  id: string;
  slug: string;
  name: string;
  brand?: string | null;
  category: string;
  description?: string | null;
  informationalOnly: true;
  commerceEligible: false;
  publicationStatus: "informational-provider-restricted";
};

const INFORMATIONAL_PRODUCTS = ((informationalProductsData as { products?: InformationalProduct[] }).products ?? []) as InformationalProduct[];
const BY_SLUG = new Map(INFORMATIONAL_PRODUCTS.map((product) => [product.slug, product]));

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

function fitTitle(value: string): string {
  return value.length <= 68 ? value : `${value.slice(0, 47).trimEnd()}… | AI Premium Shop`;
}

function fitDescription(value: string): string {
  return value.length <= 158 ? value : `${value.slice(0, 157).trimEnd()}…`;
}

export default function ProviderRestrictedPage({ productSlug }: { productSlug: string }) {
  const product = BY_SLUG.get(productSlug);

  if (!product) {
    return (
      <PageLayout>
        <SEOHead title="Listing Not Available | AI Premium Shop" description="This listing is not part of the current AI Premium Shop public catalog." noindex />
        <div id="main-content" className="mx-auto max-w-4xl px-4 py-24 text-center">
          <Info className="mx-auto mb-4 h-7 w-7 text-[#f4b942]" />
          <h1 className="text-3xl font-bold text-white">Listing not available</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">Browse the current catalog for active AI tools and plans.</p>
          <Link href="/products" className="mt-7 inline-flex items-center rounded-xl bg-[#f4b942] px-5 py-3 font-semibold text-[#0a0e27]">Browse current catalog</Link>
        </div>
      </PageLayout>
    );
  }

  const canonicalPath = productPath(product.slug);
  const canonical = `${SITE}${canonicalPath}`;
  const categoryPath = product.category === "bundles" ? "/bundles" : `/${product.category}`;
  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;
  const title = fitTitle(`${product.name} in Bangladesh — Current Listing Status | AI Premium Shop`);
  const description = fitDescription(`AI Premium Shop does not currently publish a purchasable plan for ${product.name}. View the current listing status and browse active alternatives.`);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: categoryLabel, href: categoryPath },
    { name: product.name },
  ];
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${product.name} current listing status`,
    url: canonical,
    description,
    isPartOf: { "@type": "WebSite", url: SITE, name: "AI Premium Shop" },
  };

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={canonical} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(breadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-5xl px-4 pb-24 pt-7 md:px-8">
        <nav aria-label="breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={categoryPath} className="transition-colors hover:text-white">{categoryLabel}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">{product.name}</span>
        </nav>

        <section className="rounded-3xl border border-amber-300/20 bg-[#151b3d] p-6 md:p-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]">
            <ShieldAlert className="h-4 w-4" /> Current listing status
          </div>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-white md:text-4xl">{product.name} in Bangladesh</h1>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-7 text-white">No current purchasable AI Premium Shop plan is published for this product.</p>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            This page is retained so existing links and search references do not lead to a missing page. Provider access rules and plan structures can change. AI Premium Shop will only publish a purchasable option here again after the applicable access model is reviewed against current provider evidence.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link href="/products" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#f4b942] px-5 py-3 font-bold text-[#0a0e27]">Browse active alternatives</Link>
            <Link href={categoryPath} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-bold text-white hover:border-white/20">Browse {categoryLabel} <ExternalLink className="h-4 w-4" /></Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
            <h2 className="text-lg font-bold text-white">What this status means</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>• No price or access plan is offered on this page.</li>
              <li>• No provider authorization is implied.</li>
              <li>• Historical catalog records remain internal audit evidence, not current sale authority.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
            <h2 className="text-lg font-bold text-white">What to do next</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">Use the current catalog to compare active alternatives. For provider-controlled capabilities, limits, account rules and eligibility, verify the current provider documentation for the exact plan you are considering.</p>
          </div>
        </section>

        <p className="mt-8 text-center text-xs leading-5 text-slate-500">Product names and trademarks belong to their respective owners. This informational page does not represent an offer for sale or imply provider authorization.</p>
      </main>
    </PageLayout>
  );
}
