import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, MessageCircle, ShieldCheck } from "lucide-react";
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
  brandColor: string | null;
  category: string;
  tier: string | null;
  price: number | null;
  requestPrice?: boolean;
  accessType: string | null;
  description: string | null;
}

const CATEGORY_META: Record<string, { label: string; href: string; question: string }> = {
  "ai-assistant": { label: "AI Chat & Assistants", href: "/ai-assistant", question: "General reasoning, research, documents and everyday AI work" },
  "ai-image": { label: "AI Image & Design", href: "/ai-image", question: "Image generation, editing and visual asset workflows" },
  "ai-video": { label: "AI Video", href: "/ai-video", question: "Video generation, avatars, editing and production" },
  "ai-voice-music": { label: "AI Voice & Music", href: "/ai-voice-music", question: "Voice, speech, audio and music workflows" },
  "ai-code": { label: "AI Code & Development", href: "/ai-code", question: "Coding assistance, development agents and app building" },
  "ai-workspace": { label: "AI Workspace", href: "/ai-workspace", question: "Documents, meetings, automation and productivity" },
  "ai-writing": { label: "AI Writing & SEO", href: "/ai-writing", question: "Writing, editing, research and search workflows" },
  "ai-design": { label: "AI Design & Creative", href: "/ai-design", question: "Design systems, presentations and creative production" },
  bundles: { label: "Bundles & Services", href: "/bundles", question: "Multi-tool packages, implementation and setup services" },
};

const catalog = (productsData.products as ProductRecord[]).filter((product) => !RETIRED.has(product.slug));

function baseName(value: string): string {
  return value.split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
}

function accessLabel(value: string | null): string {
  if (value === "shared") return "Shared";
  if (value === "personal") return "Personal";
  if (value === "team") return "Team";
  if (value === "bundle") return "Bundle";
  if (value === "setup-service" || value === "setup" || value === "service") return "Setup / Service";
  return "Confirm";
}

export default function BestAISubscriptionPage() {
  const reducedMotion = useReducedMotion();

  const categoryRows = useMemo(() => Object.entries(CATEGORY_META).map(([category, meta]) => {
    const records = catalog.filter((product) => product.category === category);
    const priced = records.filter((product) => !product.requestPrice && typeof product.price === "number" && product.price > 0);
    const families = [...new Map(records.map((product) => [product.slug, product])).values()];
    const examples = [...families]
      .sort((a, b) => {
        const priceA = priced.filter((record) => record.slug === a.slug).map((record) => Number(record.price));
        const priceB = priced.filter((record) => record.slug === b.slug).map((record) => Number(record.price));
        return (priceA.length ? Math.min(...priceA) : Infinity) - (priceB.length ? Math.min(...priceB) : Infinity);
      })
      .slice(0, 3);
    const prices = priced.map((product) => Number(product.price));
    return { category, meta, records, families, examples, minPrice: prices.length ? Math.min(...prices) : null };
  }), []);

  const currentExamples = useMemo(() => {
    const seen = new Set<string>();
    const items: ProductRecord[] = [];
    for (const row of categoryRows) {
      const example = row.examples.find((product) => !seen.has(product.slug));
      if (example) {
        seen.add(example.slug);
        items.push(example);
      }
    }
    return items;
  }, [categoryRows]);

  const title = "Best AI Subscription in Bangladesh 2026 | How to Choose";
  const description = "How to choose the best AI subscription for your workflow in Bangladesh in 2026. Compare current AIPS categories, BDT prices and access models without stale rankings or provider-limit claims.";

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={`${SITE}/best-ai-subscription-2026`} />
      <main id="main-content" className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs mb-8" style={{ color: "#9ca3af" }}><Link href="/" className="hover:text-white">Home</Link><ChevronRight className="w-3.5 h-3.5" /><Link href="/guides" className="hover:text-white">Guides</Link><ChevronRight className="w-3.5 h-3.5" /><span className="text-white">AI subscription guide 2026</span></nav>

        <motion.header initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="max-w-4xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold mb-4" style={{ color: "#f4b942", backgroundColor: "rgba(244,185,66,0.08)" }}><ShieldCheck className="w-3.5 h-3.5" /> 2026 decision guide · current public catalog</div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">How to Choose the Best AI Subscription in Bangladesh</h1>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#c9ceda" }}>There is no single objectively “best” AI subscription for every user. The right choice depends on the work you need to do, the access model your data requires, your budget, and the provider limits that apply to the exact plan today.</p>
        </motion.header>

        <section className="rounded-2xl border border-white/10 p-6 md:p-8 mb-10" style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-xl font-bold text-white mb-4">Use this 4-part decision test</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ["1", "Start with the workflow", "Choose the category that solves the job: assistant, writing, coding, video, image, voice, workspace, design or implementation."],
              ["2", "Choose the access model", "Personal access is generally more appropriate for privacy-sensitive work; shared, team and service arrangements have different operational constraints."],
              ["3", "Compare the current BDT price", "Use the public AIPS price as a comparison point, not an inferred discount against a provider price that may have changed."],
              ["4", "Confirm provider-controlled details", "Check current models, credits, quotas, storage, exports, integrations and other provider limits for the exact plan before payment."],
            ].map(([number, heading, body]) => <div key={number} className="flex gap-3 rounded-xl border border-white/10 p-4" style={{ backgroundColor: "#0a0e27" }}><div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: "rgba(244,185,66,0.14)", color: "#f4b942" }}>{number}</div><div><h3 className="font-semibold text-white text-sm">{heading}</h3><p className="text-sm mt-1 leading-relaxed" style={{ color: "#c9ceda" }}>{body}</p></div></div>)}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-5"><p className="text-xs uppercase tracking-[0.18em] font-semibold mb-2" style={{ color: "#f4b942" }}>Compare by workflow</p><h2 className="text-2xl font-bold text-white">Current catalog categories</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryRows.map((row, index) => (
              <motion.article key={row.category} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.15) }} className="rounded-2xl border border-white/10 p-5" style={{ backgroundColor: "#151b3d" }}>
                <h3 className="font-bold text-white mb-2">{row.meta.label}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#c9ceda" }}>{row.meta.question}</p>
                <dl className="space-y-2 text-xs mb-4"><div className="flex justify-between gap-3"><dt style={{ color: "#9ca3af" }}>Tool families</dt><dd className="font-semibold text-white">{row.families.length}</dd></div><div className="flex justify-between gap-3"><dt style={{ color: "#9ca3af" }}>Lowest fixed price</dt><dd className="font-semibold" style={{ color: "#f4b942" }}>{row.minPrice ? formatBDT(row.minPrice) : "On request"}</dd></div></dl>
                <Link href={row.meta.href} className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#f4b942" }}>Explore category <ArrowRight className="w-4 h-4" /></Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-end justify-between gap-4 mb-5"><div><p className="text-xs uppercase tracking-[0.18em] font-semibold mb-2" style={{ color: "#f4b942" }}>Examples, not rankings</p><h2 className="text-2xl font-bold text-white">A cross-category starting set</h2></div><Link href="/pricing" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#f4b942" }}>All current pricing <ArrowRight className="w-4 h-4" /></Link></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentExamples.map((product, index) => {
              const sameSlug = catalog.filter((record) => record.slug === product.slug);
              const prices = sameSlug.map((record) => record.price).filter((value): value is number => typeof value === "number" && value > 0);
              const minPrice = prices.length ? Math.min(...prices) : null;
              const access = [...new Set(sameSlug.map((record) => accessLabel(record.accessType)))].join(", ");
              const label = baseName(product.name);
              return (
                <motion.article key={product.slug} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.15) }} className="rounded-2xl border border-white/10 p-5" style={{ backgroundColor: "#151b3d" }}>
                  <div className="flex items-start gap-3 mb-4"><div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center" style={{ backgroundColor: `${product.brandColor || "#f4b942"}16` }}><BrandIcon brand={product.brand ?? label} color={product.brandColor || "#f4b942"} size={26} /></div><div><h3 className="font-bold text-white">{label}</h3><p className="text-xs mt-1" style={{ color: "#9ca3af" }}>{access || "Access: confirm"}</p></div></div>
                  {product.description && <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: "#c9ceda" }}>{product.description}</p>}
                  <div className="flex items-end justify-between gap-3"><div><div className="text-[11px]" style={{ color: "#9ca3af" }}>Published AIPS price</div><div className="font-bold" style={{ color: "#f4b942" }}>{minPrice ? `From ${formatBDT(minPrice)}` : "Current price on request"}</div></div><Link href={productPath(product.slug)} className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: product.brandColor || "#f4b942" }}>Details <ArrowRight className="w-4 h-4" /></Link></div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="grid lg:grid-cols-[1fr_330px] gap-5">
          <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "rgba(21,27,61,0.65)" }}><h2 className="text-xl font-bold text-white mb-4">What this guide intentionally does not claim</h2><div className="space-y-3">{["No universal Top 10 or objective #1 ranking without a published scoring methodology and current evidence.", "No fixed provider model, context-window, storage, credit or unlimited-usage claim unless it is verified for the exact plan.", "No inferred discount, ROI, delivery-time or availability promise. Those details are confirmed for the exact order."].map((point) => <div key={point} className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} /><p className="text-sm" style={{ color: "#c9ceda" }}>{point}</p></div>)}</div></div>
          <aside className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}><h2 className="text-lg font-bold text-white mb-3">Need a recommendation for your workflow?</h2><p className="text-sm leading-relaxed mb-4" style={{ color: "#c9ceda" }}>Tell us the work, privacy requirement and budget. Confirm the exact price, access model, availability, provider limits, delivery ETA and terms before payment.</p><a href={`${WHATSAPP}?text=${encodeURIComponent("Hi, help me choose an AI subscription for my workflow. Please ask about my use case, privacy needs and budget, then confirm current price, access model, availability, provider limits, delivery ETA and applicable terms before payment.")}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm" style={{ backgroundColor: "#008236", color: "#fff" }}><MessageCircle className="w-4 h-4" /> Ask for a current fit</a></aside>
        </section>
      </main>
    </PageLayout>
  );
}
