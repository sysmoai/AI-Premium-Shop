import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, MessageCircle, Search, ShieldCheck, WalletCards } from "lucide-react";
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
  capabilities?: string[];
}

interface GuideDefinition {
  label: string;
  heading: string;
  intro: string;
  primaryCategories: string[];
  capabilitySignals: string[];
  decisionPoints: string[];
  categoryLinks: { label: string; href: string }[];
}

const GUIDE_DEFS: Record<string, GuideDefinition> = {
  students: {
    label: "Students",
    heading: "AI Tools for Students in Bangladesh",
    intro: "Compare current AI tools for research, writing, documents, study workflows and general assistance without relying on stale model-version or unlimited-usage claims.",
    primaryCategories: ["ai-assistant", "ai-writing", "ai-workspace"],
    capabilitySignals: ["document", "search", "text", "workspace"],
    decisionPoints: ["Prefer personal access for private coursework or unpublished research.", "Check current provider citation, file and usage limits before academic work.", "Confirm whether your institution permits AI assistance for the specific assignment."],
    categoryLinks: [{ label: "AI assistants", href: "/ai-assistant" }, { label: "Writing & SEO tools", href: "/ai-writing" }, { label: "Workspace tools", href: "/ai-workspace" }],
  },
  freelancers: {
    label: "Freelancers",
    heading: "AI Tools for Freelancers in Bangladesh",
    intro: "Build a practical client-work stack from current writing, design, coding, research and productivity tools while keeping access type, client confidentiality and recurring cost visible.",
    primaryCategories: ["ai-assistant", "ai-writing", "ai-design", "ai-code", "ai-workspace"],
    capabilitySignals: ["text", "design", "code", "search", "workspace"],
    decisionPoints: ["Use personal access when client files or credentials are sensitive.", "Choose tools around billable workflows rather than collecting overlapping subscriptions.", "Verify provider limits and delivery details before committing to a client deadline."],
    categoryLinks: [{ label: "AI assistants", href: "/ai-assistant" }, { label: "AI design", href: "/ai-design" }, { label: "AI code", href: "/ai-code" }],
  },
  creators: {
    label: "Creators",
    heading: "AI Tools for Content Creators in Bangladesh",
    intro: "Compare current tools for ideation, image, video, voice, music, design and publishing workflows using the public AIPS catalog rather than fixed generation-limit claims.",
    primaryCategories: ["ai-video", "ai-image", "ai-design", "ai-voice-music", "ai-writing"],
    capabilitySignals: ["video-gen", "image-gen", "design", "audio", "music", "voice", "text"],
    decisionPoints: ["Map each subscription to a repeatable production step such as scripting, visuals, editing or voice.", "Check current export, watermark, credit and commercial-use terms with the provider.", "Keep client or unreleased assets on an access model appropriate to their confidentiality."],
    categoryLinks: [{ label: "AI video", href: "/ai-video" }, { label: "AI image", href: "/ai-image" }, { label: "Voice & music", href: "/ai-voice-music" }],
  },
  business: {
    label: "Businesses",
    heading: "AI Tools for Businesses in Bangladesh",
    intro: "Evaluate current AI assistants, workspace tools, automation services and team options with an emphasis on governance, privacy, access control and measurable workflow value.",
    primaryCategories: ["ai-workspace", "ai-assistant", "ai-code", "bundles"],
    capabilitySignals: ["workspace", "agents", "search", "code"],
    decisionPoints: ["Separate personal, shared and team access before putting business data into a tool.", "Define the workflow and owner before buying automation or setup services.", "Confirm provider admin, retention and usage controls from current provider documentation."],
    categoryLinks: [{ label: "AI workspace", href: "/ai-workspace" }, { label: "AI assistants", href: "/ai-assistant" }, { label: "Bundles & services", href: "/bundles" }],
  },
  developers: {
    label: "Developers",
    heading: "AI Coding Tools for Developers in Bangladesh",
    intro: "Compare active coding assistants, app builders and development tools from the current catalog without depending on stale model names, context windows or speed claims.",
    primaryCategories: ["ai-code", "ai-assistant"],
    capabilitySignals: ["code", "agents", "text"],
    decisionPoints: ["Check repository privacy and training/data-retention settings before using proprietary code.", "Compare provider limits for the exact plan rather than assuming unlimited agent or completion usage.", "Choose by workflow fit: editor assistance, autonomous tasks, browser building or general reasoning."],
    categoryLinks: [{ label: "AI code & development", href: "/ai-code" }, { label: "AI assistants", href: "/ai-assistant" }, { label: "Developer buying guide", href: "/guides" }],
  },
  "job-seekers": {
    label: "Job Seekers",
    heading: "AI Tools for Job Seekers in Bangladesh",
    intro: "Use current writing, research and assistant tools for CV iteration, interview preparation, role research and communication while keeping personal information and accuracy under human review.",
    primaryCategories: ["ai-assistant", "ai-writing", "ai-workspace"],
    capabilitySignals: ["text", "search", "document"],
    decisionPoints: ["Review every factual statement in a CV or application before submitting it.", "Avoid sharing unnecessary sensitive identity or employer information with shared accounts.", "Use AI to prepare and edit—not to fabricate experience, credentials or references."],
    categoryLinks: [{ label: "AI assistants", href: "/ai-assistant" }, { label: "Writing tools", href: "/ai-writing" }, { label: "Workspace tools", href: "/ai-workspace" }],
  },
  designers: {
    label: "Designers",
    heading: "AI Design Tools for Designers in Bangladesh",
    intro: "Compare current design and image tools for concepting, assets, presentations, image generation and creative production, with provider licensing and export terms checked separately.",
    primaryCategories: ["ai-design", "ai-image", "ai-video"],
    capabilitySignals: ["design", "image-gen", "video-gen"],
    decisionPoints: ["Check commercial-use and asset licensing terms for the provider and plan you select.", "Choose based on the deliverable: editable design, generated image, presentation, video or brand asset.", "Verify current credits, export limits and collaboration features before a production deadline."],
    categoryLinks: [{ label: "AI design", href: "/ai-design" }, { label: "AI image", href: "/ai-image" }, { label: "AI video", href: "/ai-video" }],
  },
  marketers: {
    label: "Marketers",
    heading: "AI Tools for Marketers in Bangladesh",
    intro: "Compare current writing, research, design and automation tools for campaigns, SEO, content operations and reporting without treating generated claims or metrics as verified marketing facts.",
    primaryCategories: ["ai-writing", "ai-design", "ai-workspace", "ai-assistant"],
    capabilitySignals: ["text", "design", "search", "workspace"],
    decisionPoints: ["Keep factual and performance claims evidence-backed before publishing them.", "Choose tools around campaign bottlenecks such as research, production, repurposing or reporting.", "Confirm provider quotas and integrations for the plan you will actually use."],
    categoryLinks: [{ label: "Writing & SEO", href: "/ai-writing" }, { label: "AI design", href: "/ai-design" }, { label: "AI workspace", href: "/ai-workspace" }],
  },
  ecommerce: {
    label: "E-commerce Teams",
    heading: "AI Tools for E-commerce in Bangladesh",
    intro: "Compare current AI tools for product content, creative production, research, customer operations and workflow automation while keeping human review around pricing, claims and customer data.",
    primaryCategories: ["ai-writing", "ai-design", "ai-workspace", "ai-assistant"],
    capabilitySignals: ["text", "design", "workspace", "search"],
    decisionPoints: ["Never publish generated product claims or specifications without checking source data.", "Use privacy-appropriate access for customer, order and supplier information.", "Evaluate automation on measurable operational time saved, not on the number of tools connected."],
    categoryLinks: [{ label: "Writing & SEO", href: "/ai-writing" }, { label: "AI workspace", href: "/ai-workspace" }, { label: "Bundles & services", href: "/bundles" }],
  },
};

const catalog = (productsData.products as ProductRecord[]).filter((product) => !RETIRED.has(product.slug));

function baseName(value: string): string {
  return value.split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
}

function score(record: ProductRecord, definition: GuideDefinition): number {
  let value = 0;
  const categoryIndex = definition.primaryCategories.indexOf(record.category);
  if (categoryIndex >= 0) value += (definition.primaryCategories.length - categoryIndex) * 10;
  for (const capability of record.capabilities ?? []) if (definition.capabilitySignals.includes(capability)) value += 3;
  if (record.price != null && record.price > 0) value += 2;
  return value;
}

function groupRecommendations(definition: GuideDefinition) {
  const bySlug = new Map<string, ProductRecord[]>();
  for (const record of catalog) {
    if (!definition.primaryCategories.includes(record.category)) continue;
    if (!bySlug.has(record.slug)) bySlug.set(record.slug, []);
    bySlug.get(record.slug)?.push(record);
  }

  return [...bySlug.entries()]
    .map(([slug, records]) => {
      const sorted = [...records].sort((a, b) => score(b, definition) - score(a, definition));
      const prices = records.map((record) => record.price).filter((price): price is number => typeof price === "number" && price > 0);
      const access = [...new Set(records.map((record) => record.accessType).filter(Boolean))];
      return { slug, first: sorted[0], score: Math.max(...records.map((record) => score(record, definition))), price: prices.length ? Math.min(...prices) : null, access };
    })
    .sort((a, b) => b.score - a.score || (a.price ?? Infinity) - (b.price ?? Infinity))
    .slice(0, 8);
}

function accessText(values: (string | null)[]): string {
  const labels = values.map((value) => {
    if (value === "shared") return "Shared";
    if (value === "personal") return "Personal";
    if (value === "team") return "Team";
    if (value === "bundle") return "Bundle";
    return "Service";
  });
  return labels.length ? [...new Set(labels)].join(", ") : "Confirm before payment";
}

export default function GuidePage({ guideKey }: { guideKey: string }) {
  const reducedMotion = useReducedMotion();
  const definition = GUIDE_DEFS[guideKey];
  const recommendations = useMemo(() => definition ? groupRecommendations(definition) : [], [definition]);

  if (!definition) {
    return (
      <PageLayout>
        <SEOHead title="Guide Not Found | AI Premium Shop" description="This AI tool guide is not available." noindex />
        <main className="max-w-4xl mx-auto px-4 py-24 text-center"><h1 className="text-3xl font-bold text-white mb-4">Guide not found</h1><Link href="/guides" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }}>Browse guides <ArrowRight className="w-4 h-4" /></Link></main>
      </PageLayout>
    );
  }

  const canonical = `${SITE}/best-ai-for-${guideKey}`;
  const title = `${definition.heading} | Compare Current Options`;
  const description = `${definition.intro} Compare current AIPS prices and access models, then confirm provider limits, availability, delivery ETA and terms before payment.`;

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={canonical} />
      <main id="main-content" className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs mb-8" style={{ color: "#9ca3af" }}><Link href="/" className="hover:text-white">Home</Link><ChevronRight className="w-3.5 h-3.5" /><Link href="/guides" className="hover:text-white">Guides</Link><ChevronRight className="w-3.5 h-3.5" /><span className="text-white">{definition.label}</span></nav>

        <motion.header initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="max-w-4xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold mb-4" style={{ color: "#f4b942", backgroundColor: "rgba(244,185,66,0.08)" }}><ShieldCheck className="w-3.5 h-3.5" /> Current-catalog decision guide</div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">{definition.heading}</h1>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#c9ceda" }}>{definition.intro}</p>
        </motion.header>

        <section className="grid lg:grid-cols-[1fr_330px] gap-6 mb-12">
          <div>
            <div className="flex items-end justify-between gap-4 mb-5"><div><p className="text-xs uppercase tracking-[0.18em] font-semibold mb-2" style={{ color: "#f4b942" }}>Current shortlist</p><h2 className="text-2xl font-bold text-white">Relevant catalog options</h2></div><span className="text-xs" style={{ color: "#9ca3af" }}>Not an objective ranking</span></div>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.map((item, index) => {
                const product = item.first;
                const label = baseName(product.name);
                return (
                  <motion.article key={item.slug} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.15) }} className="rounded-2xl border border-white/10 p-5" style={{ backgroundColor: "#151b3d" }}>
                    <div className="flex items-start gap-3 mb-4"><div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${product.brandColor || "#f4b942"}16` }}><BrandIcon brand={product.brand ?? label} color={product.brandColor || "#f4b942"} size={26} /></div><div><h3 className="font-bold text-white">{label}</h3><p className="text-xs mt-1" style={{ color: "#9ca3af" }}>{accessText(item.access)}</p></div></div>
                    <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: "#c9ceda" }}>{product.description || `${label} is in the current public AIPS catalog.`}</p>
                    <div className="flex items-end justify-between gap-3"><div><div className="text-[11px]" style={{ color: "#9ca3af" }}>Published AIPS price</div><div className="font-bold" style={{ color: "#f4b942" }}>{item.price ? `From ${formatBDT(item.price)}` : "Current price on request"}</div></div><Link href={productPath(item.slug)} className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: product.brandColor || "#f4b942" }}>Details <ArrowRight className="w-4 h-4" /></Link></div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 p-6 h-fit" style={{ backgroundColor: "#151b3d" }}>
            <Search className="w-6 h-6 mb-3" style={{ color: "#f4b942" }} /><h2 className="text-lg font-bold text-white mb-3">Decision checklist</h2>
            <div className="space-y-4">{definition.decisionPoints.map((point) => <div key={point} className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} /><p className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{point}</p></div>)}</div>
            <a href={`${WHATSAPP}?text=${encodeURIComponent(`Hi, I need an AI tool recommendation for ${definition.label.toLowerCase()}. Please ask about my workflow, privacy needs and budget, then confirm current price, access model, availability, provider limits, delivery ETA and terms before payment.`)}`} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm" style={{ backgroundColor: "#008236", color: "#fff" }}><MessageCircle className="w-4 h-4" /> Ask for a current fit</a>
          </aside>
        </section>

        <section className="rounded-2xl border border-white/10 p-6 md:p-8 mb-10" style={{ backgroundColor: "rgba(21,27,61,0.65)" }}><WalletCards className="w-6 h-6 mb-3" style={{ color: "#f4b942" }} /><h2 className="text-xl font-bold text-white mb-3">What this guide does—and does not claim</h2><p className="text-sm leading-relaxed max-w-4xl" style={{ color: "#c9ceda" }}>The shortlist is generated from current public AIPS categories and discovery tags. It is not a benchmark ranking and does not assert current provider model names, context windows, generation quotas, earnings impact or unlimited usage. Check provider-controlled features and limits against current provider documentation, and confirm AIPS commercial details before payment.</p></section>

        <section><h2 className="text-xl font-bold text-white mb-4">Explore the underlying categories</h2><div className="flex flex-wrap gap-2">{definition.categoryLinks.map((item) => <Link key={item.href} href={item.href} className="px-4 py-2.5 rounded-xl border border-white/10 text-sm font-medium hover:border-white/20" style={{ color: "#e5e7eb" }}>{item.label}</Link>)}<Link href="/pricing" className="px-4 py-2.5 rounded-xl border border-white/10 text-sm font-medium hover:border-white/20" style={{ color: "#e5e7eb" }}>Current pricing</Link></div></section>
      </main>
    </PageLayout>
  );
}
