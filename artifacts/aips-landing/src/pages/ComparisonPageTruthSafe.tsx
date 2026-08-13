import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Info, MessageCircle, ShieldCheck, WalletCards } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { BrandIcon } from "@/components/BrandIcon";
import { formatBDT } from "@/lib/format";
import { productPath } from "@/lib/productRoutes";
import productsData from "../../data/catalog-pages.json";

const SITE = "https://aipremiumshop.com";
const WHATSAPP = "https://wa.me/8801865385348";
const RETIRED = new Set(["replit-bangladesh"]);

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
  accessType: string | null;
  description: string | null;
  capabilities?: string[];
}

interface ComparisonDefinition {
  a: string;
  b: string;
  labelA?: string;
  labelB?: string;
  related: { label: string; href: string }[];
}

const COMPARISONS: Record<string, ComparisonDefinition> = {
  "chatgpt-vs-claude": {
    a: "chatgpt-plus-bangladesh",
    b: "claude-pro-bangladesh",
    labelA: "ChatGPT Plus",
    labelB: "Claude",
    related: [
      { label: "Best AI for freelancers", href: "/best-ai-for-freelancers" },
      { label: "Best AI for students", href: "/best-ai-for-students" },
    ],
  },
  "chatgpt-vs-gemini": {
    a: "chatgpt-plus-bangladesh",
    b: "gemini-advanced-bangladesh",
    labelA: "ChatGPT Plus",
    labelB: "Google AI Pro",
    related: [
      { label: "Best AI for business", href: "/best-ai-for-business" },
      { label: "Best AI for students", href: "/best-ai-for-students" },
    ],
  },
  "chatgpt-vs-perplexity": {
    a: "chatgpt-plus-bangladesh",
    b: "perplexity-pro-bangladesh",
    labelA: "ChatGPT Plus",
    labelB: "Perplexity Pro",
    related: [
      { label: "Best AI for students", href: "/best-ai-for-students" },
      { label: "AI Assistant category", href: "/ai-assistant" },
    ],
  },
  "claude-vs-gemini": {
    a: "claude-pro-bangladesh",
    b: "gemini-advanced-bangladesh",
    labelA: "Claude",
    labelB: "Google AI Pro",
    related: [
      { label: "Best AI for developers", href: "/best-ai-for-developers" },
      { label: "AI Assistant category", href: "/ai-assistant" },
    ],
  },
  "midjourney-vs-ideogram": {
    a: "midjourney-bangladesh",
    b: "ideogram-bangladesh",
    labelA: "Midjourney",
    labelB: "Ideogram",
    related: [
      { label: "Best AI for designers", href: "/best-ai-for-designers" },
      { label: "AI Image category", href: "/ai-image" },
    ],
  },
  "canva-vs-adobe-express": {
    a: "canva-pro-bangladesh",
    b: "adobe-express-premium-bangladesh",
    labelA: "Canva Pro",
    labelB: "Adobe Express Premium",
    related: [
      { label: "Best AI for designers", href: "/best-ai-for-designers" },
      { label: "AI Design category", href: "/ai-design" },
    ],
  },
  "copilot-vs-cursor": {
    a: "github-copilot-bangladesh",
    b: "cursor-bangladesh",
    labelA: "GitHub Copilot",
    labelB: "Cursor",
    related: [
      { label: "Best AI for developers", href: "/best-ai-for-developers" },
      { label: "AI Code category", href: "/ai-code" },
    ],
  },
};

const records = (productsData.products as ProductRecord[]).filter((product) => !RETIRED.has(product.slug));

function baseName(value: string): string {
  return value.split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
}

function modes(items: ProductRecord[]): string {
  const values = [...new Set(items.map((item) => item.accessType).filter(Boolean))].map((mode) => {
    if (mode === "shared") return "Shared";
    if (mode === "personal") return "Personal";
    if (mode === "team") return "Team";
    if (mode === "bundle") return "Bundle";
    return "Setup / service";
  });
  return values.length ? values.join(", ") : "Confirm before payment";
}

function minPrice(items: ProductRecord[], mode?: string): number | null {
  const values = items
    .filter((item) => !mode || item.accessType === mode)
    .map((item) => item.price)
    .filter((value): value is number => typeof value === "number" && value > 0);
  return values.length ? Math.min(...values) : null;
}

function capabilityLabels(items: ProductRecord[]): string[] {
  return [...new Set(items.flatMap((item) => item.capabilities ?? []))]
    .map((item) => item.replace(/-/g, " "))
    .slice(0, 8);
}

function ProductColumn({ label, items }: { label: string; items: ProductRecord[] }) {
  const first = items[0];
  const lowest = minPrice(items);
  const shared = minPrice(items, "shared");
  const personal = minPrice(items, "personal");
  const capabilities = capabilityLabels(items);
  const accent = first?.brandColor || "#f4b942";

  return (
    <div className="rounded-2xl border border-white/10 p-5 md:p-6" style={{ backgroundColor: "#151b3d" }}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center" style={{ backgroundColor: `${accent}16` }}>
          <BrandIcon brand={first?.brand ?? label} color={accent} size={30} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{label}</h2>
          <div className="text-xs mt-1" style={{ color: "#9ca3af" }}>{items.length} current public plan record{items.length === 1 ? "" : "s"}</div>
        </div>
      </div>

      <dl className="space-y-4 text-sm">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
          <dt style={{ color: "#9ca3af" }}>Lowest published price</dt>
          <dd className="font-semibold text-right" style={{ color: "#f4b942" }}>{lowest ? `${formatBDT(lowest)}/mo` : "On request"}</dd>
        </div>
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
          <dt style={{ color: "#9ca3af" }}>Shared access</dt>
          <dd className="font-medium text-white text-right">{shared ? `From ${formatBDT(shared)}/mo` : "Not currently published"}</dd>
        </div>
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
          <dt style={{ color: "#9ca3af" }}>Personal access</dt>
          <dd className="font-medium text-white text-right">{personal ? `From ${formatBDT(personal)}/mo` : "Not currently published"}</dd>
        </div>
        <div className="flex items-start justify-between gap-4 pb-1">
          <dt style={{ color: "#9ca3af" }}>Published access modes</dt>
          <dd className="font-medium text-white text-right">{modes(items)}</dd>
        </div>
      </dl>

      {capabilities.length > 0 && (
        <div className="mt-5 pt-5 border-t border-white/10">
          <div className="text-xs font-semibold text-white mb-2">Catalog discovery tags</div>
          <div className="flex flex-wrap gap-1.5">
            {capabilities.map((capability) => (
              <span key={capability} className="px-2 py-1 rounded-full border border-white/10 text-xs capitalize" style={{ color: "#c9ceda" }}>{capability}</span>
            ))}
          </div>
          <p className="text-[11px] leading-relaxed mt-3" style={{ color: "#7f8798" }}>Tags help discovery; they are not a promise that every plan includes every feature.</p>
        </div>
      )}

      {first && (
        <Link href={productPath(first.slug)} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: accent }}>
          View current product details <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

export default function ComparisonPageTruthSafe({ compKey }: { compKey: string }) {
  const reducedMotion = useReducedMotion();
  const definition = COMPARISONS[compKey];
  const aItems = useMemo(() => records.filter((item) => item.slug === definition?.a), [definition?.a]);
  const bItems = useMemo(() => records.filter((item) => item.slug === definition?.b), [definition?.b]);

  if (!definition || !aItems.length || !bItems.length) {
    return (
      <PageLayout>
        <SEOHead title="Comparison Not Available | AI Premium Shop" description="This comparison is not available in the current public catalog." noindex />
        <section className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Comparison not available</h1>
          <Link href="/products" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }}>Browse current tools <ArrowRight className="w-4 h-4" /></Link>
        </section>
      </PageLayout>
    );
  }

  const labelA = definition.labelA ?? baseName(aItems[0].name);
  const labelB = definition.labelB ?? baseName(bItems[0].name);
  const title = `${labelA} vs ${labelB} in Bangladesh | Current Comparison`;
  const description = `Compare current AI Premium Shop catalog records for ${labelA} and ${labelB}: published BDT prices and access modes. Confirm provider features, limits, availability and delivery ETA before payment.`;
  const canonical = `${SITE}/${compKey}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: canonical,
    description,
    about: [labelA, labelB],
  };

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={canonical} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main id="main-content" className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs mb-8" style={{ color: "#9ca3af" }}>
          <Link href="/" className="hover:text-white">Home</Link><ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-white">Products</Link><ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white">Compare</span>
        </nav>

        <motion.header initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold mb-4" style={{ color: "#f4b942", backgroundColor: "rgba(244,185,66,0.08)" }}>
            <ShieldCheck className="w-3.5 h-3.5" /> Live public-catalog comparison
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">{labelA} vs {labelB}</h1>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#c9ceda" }}>Compare what AIPS can currently verify from its own public catalog: price and access model. Provider models, quotas, credits and feature limits can change, so those should be checked against current provider terms before purchase.</p>
        </motion.header>

        <div className="grid lg:grid-cols-2 gap-5 mb-8">
          <ProductColumn label={labelA} items={aItems} />
          <ProductColumn label={labelB} items={bItems} />
        </div>

        <section className="grid lg:grid-cols-[1fr_340px] gap-5 mb-10">
          <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
            <h2 className="text-xl font-bold text-white mb-4">How to decide without stale hype</h2>
            <div className="space-y-4">
              {[
                ["Start with access", "Choose whether your work requires personal access, can tolerate shared access, or needs a team/service arrangement."],
                ["Check the provider today", "Confirm the exact model lineup, credits, usage limits, storage and other provider-controlled features on the current provider plan."],
                ["Confirm the order", "Ask AIPS for the current price, availability, delivery ETA and applicable terms for the exact plan before paying."],
              ].map(([heading, body]) => (
                <div key={heading} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} />
                  <div><div className="font-semibold text-white text-sm">{heading}</div><p className="text-sm mt-1" style={{ color: "#c9ceda" }}>{body}</p></div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
            <WalletCards className="w-6 h-6 mb-3" style={{ color: "#f4b942" }} />
            <h2 className="text-lg font-bold text-white mb-2">Need a current recommendation?</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#c9ceda" }}>Tell us your workflow, privacy requirement and budget. We can confirm which currently published option fits those constraints before payment.</p>
            <a href={`${WHATSAPP}?text=${encodeURIComponent(`Hi, please compare ${labelA} vs ${labelB} for my use case. I want current price, access model, provider limits, availability and delivery ETA before payment.`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm" style={{ backgroundColor: "#008236", color: "#fff" }}>
              <MessageCircle className="w-4 h-4" /> Ask for current comparison
            </a>
          </aside>
        </section>

        <section className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "rgba(21,27,61,0.65)" }}>
          <div className="flex items-start gap-3 mb-5"><Info className="w-5 h-5 mt-0.5" style={{ color: "#f4b942" }} /><div><h2 className="font-bold text-white">Related decision guides</h2><p className="text-sm mt-1" style={{ color: "#c9ceda" }}>Use-case guides can help narrow the category before you compare specific plans.</p></div></div>
          <div className="flex flex-wrap gap-2">
            {definition.related.map((item) => <Link key={item.href} href={item.href} className="px-3 py-2 rounded-xl border border-white/10 text-sm font-medium hover:border-white/20" style={{ color: "#e5e7eb" }}>{item.label}</Link>)}
            <Link href="/pricing" className="px-3 py-2 rounded-xl border border-white/10 text-sm font-medium hover:border-white/20" style={{ color: "#e5e7eb" }}>Compare all current pricing</Link>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
