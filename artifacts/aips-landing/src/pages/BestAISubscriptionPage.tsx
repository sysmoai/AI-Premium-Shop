import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, MessageCircle, ShieldCheck, WalletCards } from "lucide-react";
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
  price: number | null;
  requestPrice?: boolean;
  accessType: string | null;
}

interface Family {
  slug: string;
  label: string;
  brand: string | null;
  brandColor: string | null;
  category: string;
  planCount: number;
  minPrice: number | null;
  access: string[];
}

const CATEGORY_META: Record<string, { label: string; href: string; workflow: string }> = {
  "ai-assistant": { label: "AI Chat & Assistants", href: "/ai-assistant", workflow: "Research, documents, general assistance and everyday AI work" },
  "ai-image": { label: "AI Image & Design", href: "/ai-image", workflow: "Image generation, editing and visual asset workflows" },
  "ai-video": { label: "AI Video", href: "/ai-video", workflow: "Video generation, editing, avatars and production" },
  "ai-voice-music": { label: "AI Voice & Music", href: "/ai-voice-music", workflow: "Speech, voice, audio and music workflows" },
  "ai-code": { label: "AI Code & Development", href: "/ai-code", workflow: "Coding assistance, app building and development workflows" },
  "ai-workspace": { label: "AI Workspace", href: "/ai-workspace", workflow: "Documents, meetings, productivity and team workflows" },
  "ai-writing": { label: "AI Writing & SEO", href: "/ai-writing", workflow: "Writing, editing, research and content operations" },
  "ai-design": { label: "AI Design & Creative", href: "/ai-design", workflow: "Design, presentations and creative production" },
  bundles: { label: "Bundles & Services", href: "/bundles", workflow: "Multi-tool packages, implementation and setup services" },
};

const catalog = (productsData.products as ProductRecord[]).filter((product) => !RETIRED.has(product.slug));

function baseName(value: string): string {
  return value.split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
}

function slugLabel(slug: string): string {
  const acronyms: Record<string, string> = { ai: "AI", api: "API", seo: "SEO", chatgpt: "ChatGPT", github: "GitHub", pdf: "PDF" };
  return slug.replace(/-bangladesh$/, "").split("-").map((part) => acronyms[part] ?? (part === "v0" ? "v0" : part.charAt(0).toUpperCase() + part.slice(1))).join(" ");
}

function safeLabel(record: ProductRecord): string {
  const candidate = baseName(record.name);
  return /\b(unlimited|bestseller|best seller)\b/i.test(candidate) ? slugLabel(record.slug) : candidate;
}

function accessLabel(value: string | null): string {
  if (value === "shared") return "Shared";
  if (value === "personal") return "Personal";
  if (value === "team") return "Team";
  if (value === "bundle") return "Bundle";
  if (["setup-service", "setup", "service"].includes(value ?? "")) return "Setup / service";
  return "Confirm";
}

function groupFamilies(): Family[] {
  const groups = new Map<string, ProductRecord[]>();
  for (const record of catalog) {
    if (!groups.has(record.slug)) groups.set(record.slug, []);
    groups.get(record.slug)?.push(record);
  }
  return [...groups.entries()].map(([slug, records]) => {
    const first = records[0];
    const prices = records
      .filter((record) => !record.requestPrice && typeof record.price === "number" && record.price > 0)
      .map((record) => record.price as number);
    return {
      slug,
      label: safeLabel(first),
      brand: first.brand,
      brandColor: first.brandColor,
      category: first.category,
      planCount: records.length,
      minPrice: prices.length ? Math.min(...prices) : null,
      access: [...new Set(records.map((record) => accessLabel(record.accessType)))],
    };
  });
}

const families = groupFamilies();

export default function BestAISubscriptionPage() {
  const reducedMotion = useReducedMotion();

  const categoryRows = useMemo(() => Object.entries(CATEGORY_META).map(([category, meta]) => {
    const categoryFamilies = families.filter((family) => family.category === category);
    const fixedPrices = categoryFamilies.map((family) => family.minPrice).filter((price): price is number => typeof price === "number");
    return {
      category,
      meta,
      families: categoryFamilies.length,
      plans: catalog.filter((record) => record.category === category).length,
      minPrice: fixedPrices.length ? Math.min(...fixedPrices) : null,
    };
  }), []);

  const entryExamples = useMemo(() => categoryRows
    .filter((row) => row.category !== "bundles")
    .map((row) => families
      .filter((family) => family.category === row.category && family.minPrice != null)
      .sort((a, b) => (a.minPrice ?? Infinity) - (b.minPrice ?? Infinity) || a.label.localeCompare(b.label))[0])
    .filter((family): family is Family => Boolean(family))
    .slice(0, 8), [categoryRows]);

  const title = "Best AI Subscription in Bangladesh 2026 | How to Choose";
  const description = "How to choose an AI subscription in Bangladesh in 2026 using current AIPS workflow categories, published BDT prices and access models—not stale rankings or provider-limit claims.";
  const askUrl = `${WHATSAPP}?text=${encodeURIComponent("Hi, help me choose an AI subscription for my workflow. Please ask about my use case, privacy needs and budget, then confirm current AIPS price, access model, availability, provider limits, delivery ETA and applicable terms before payment.")}`;

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={`${SITE}/best-ai-subscription-2026`} />
      <div id="main-content" className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs mb-8" style={{ color: "#9ca3af" }}>
          <Link href="/" className="hover:text-white">Home</Link><ChevronRight className="w-3.5 h-3.5" />
          <Link href="/guides" className="hover:text-white">Guides</Link><ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white">AI subscription guide 2026</span>
        </nav>

        <motion.header initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-4xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold mb-4" style={{ color: "#f4b942", backgroundColor: "rgba(244,185,66,0.08)" }}>
            <ShieldCheck className="w-3.5 h-3.5" /> 2026 decision guide · current public catalog
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">How to Choose the Best AI Subscription in Bangladesh</h1>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#c9ceda" }}>
            There is no single objectively best subscription for every user. Start with the workflow you need, choose an access model appropriate to your data, compare the current published AIPS price, and verify provider-controlled limits for the exact plan.
          </p>
        </motion.header>

        <section className="rounded-2xl border border-white/10 p-6 md:p-8 mb-10" style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-xl font-bold text-white mb-4">Use this four-part decision test</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ["1", "Start with the workflow", "Choose the category that solves the job: assistant, writing, coding, video, image, voice, workspace, design or implementation."],
              ["2", "Choose the access model", "Personal, shared, team, bundle and service access have different privacy and operational constraints. Match the access model to the work."],
              ["3", "Compare current AIPS prices", "Use published BDT prices as current AIPS catalog evidence, not as an inferred discount against a provider price that may have changed."],
              ["4", "Verify provider-controlled details", "Check current models, credits, quotas, storage, exports, integrations and other provider limits for the exact plan before payment."],
            ].map(([number, heading, body]) => (
              <div key={number} className="flex gap-3 rounded-xl border border-white/10 p-4" style={{ backgroundColor: "#0a0e27" }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: "rgba(244,185,66,0.14)", color: "#f4b942" }}>{number}</div>
                <div><h3 className="font-semibold text-white text-sm">{heading}</h3><p className="text-sm mt-1 leading-relaxed" style={{ color: "#c9ceda" }}>{body}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-5"><p className="text-xs uppercase tracking-[0.18em] font-semibold mb-2" style={{ color: "#f4b942" }}>Compare by workflow</p><h2 className="text-2xl font-bold text-white">Current catalog categories</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryRows.map((row, index) => (
              <motion.article key={row.category} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.15) }} className="rounded-2xl border border-white/10 p-5" style={{ backgroundColor: "#151b3d" }}>
                <h3 className="font-bold text-white mb-2">{row.meta.label}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#c9ceda" }}>{row.meta.workflow}</p>
                <dl className="space-y-2 text-xs mb-4">
                  <div className="flex justify-between gap-3"><dt style={{ color: "#9ca3af" }}>Catalog families</dt><dd className="font-semibold text-white">{row.families}</dd></div>
                  <div className="flex justify-between gap-3"><dt style={{ color: "#9ca3af" }}>Plan records</dt><dd className="font-semibold text-white">{row.plans}</dd></div>
                  <div className="flex justify-between gap-3"><dt style={{ color: "#9ca3af" }}>Lowest fixed entry price</dt><dd className="font-semibold" style={{ color: "#f4b942" }}>{row.minPrice ? formatBDT(row.minPrice) : "On request"}</dd></div>
                </dl>
                <Link href={row.meta.href} className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#f4b942" }}>Explore category <ArrowRight className="w-4 h-4" /></Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div><p className="text-xs uppercase tracking-[0.18em] font-semibold mb-2" style={{ color: "#f4b942" }}>Mechanical entry-price examples</p><h2 className="text-2xl font-bold text-white">One current fixed-price family per workflow</h2></div>
            <Link href="/pricing" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#f4b942" }}>All current pricing <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <p className="text-sm leading-relaxed mb-5 max-w-3xl" style={{ color: "#9ca3af" }}>These examples are selected mechanically as the lowest published fixed AIPS entry price in each workflow category. They are not quality rankings or endorsements.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {entryExamples.map((family, index) => (
              <motion.article key={family.slug} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.15) }} className="rounded-2xl border border-white/10 p-5" style={{ backgroundColor: "#151b3d" }}>
                <div className="flex items-start gap-3 mb-4"><div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center" style={{ backgroundColor: `${family.brandColor || "#f4b942"}16` }}><BrandIcon brand={family.brand ?? family.label} color={family.brandColor || "#f4b942"} size={26} /></div><div><h3 className="font-bold text-white">{family.label}</h3><p className="text-xs mt-1" style={{ color: "#9ca3af" }}>{family.access.join(", ")}</p></div></div>
                <div className="text-[11px]" style={{ color: "#9ca3af" }}>Published AIPS entry price</div><div className="font-bold mb-4" style={{ color: "#f4b942" }}>{family.minPrice ? `From ${formatBDT(family.minPrice)}` : "Current price on request"}</div>
                <Link href={productPath(family.slug)} className="inline-flex items-center gap-1 text-sm font-semibold text-white">View current details <ArrowRight className="w-4 h-4" /></Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-[1fr_330px] gap-5">
          <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "rgba(21,27,61,0.65)" }}>
            <h2 className="text-xl font-bold text-white mb-4">What this guide intentionally does not claim</h2>
            <div className="space-y-3">
              {["No universal Top 10 or objective number-one ranking without a published scoring methodology and current evidence.", "No fixed provider model, context-window, storage, credit or unrestricted-usage claim unless verified for the exact plan.", "No inferred discount, ROI, delivery-time or availability promise. Confirm commercial details for the exact order."].map((point) => <div key={point} className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} /><p className="text-sm" style={{ color: "#c9ceda" }}>{point}</p></div>)}
            </div>
          </div>
          <aside className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}>
            <WalletCards className="w-6 h-6 mb-3" style={{ color: "#f4b942" }} />
            <h2 className="text-lg font-bold text-white mb-3">Need a current fit for your workflow?</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#c9ceda" }}>Share the job, privacy requirement and budget. Confirm the exact AIPS price, access model, availability, provider limits, delivery ETA and terms before payment.</p>
            <a href={askUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm" style={{ backgroundColor: "#008236", color: "#fff" }}><MessageCircle className="w-4 h-4" /> Ask for a current fit</a>
          </aside>
        </section>
      </div>
    </PageLayout>
  );
}
