import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, MessageCircle, ShieldCheck, WalletCards } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BrandIcon } from "@/components/BrandIcon";
import { formatBDT } from "@/lib/format";
import { productPath } from "@/lib/productRoutes";
import productsData from "../../data/catalog-pages.json";

const WHATSAPP = "https://wa.me/8801865385348";
const RETIRED = new Set(["replit-bangladesh"]);

interface CategoryConfig {
  id: string;
  displayName: string;
  seoTitle: string;
  metaDescription: string;
  subtitle: string;
  description: string;
  accent: string;
  decisions: string[];
  related: { label: string; href: string }[];
  guides: { label: string; href: string }[];
}

const CATEGORIES: Record<string, CategoryConfig> = {
  "ai-assistant": {
    id: "ai-assistant",
    displayName: "AI Assistants & Chat",
    seoTitle: "AI Assistants in Bangladesh — Current BDT Prices | AIPS",
    metaDescription: "Compare current AI assistant catalog families, published AIPS BDT prices and access models. Confirm provider limits, availability, delivery ETA and terms before payment.",
    subtitle: "Chat, research, writing and general-purpose AI",
    description: "Browse current AIPS catalog families for assistant, research, writing and general-purpose workflows. Compare published entry prices and access models without assuming a fixed provider model, feature set or usage limit.",
    accent: "#10a37f",
    decisions: ["Choose an access model appropriate to the sensitivity of your prompts and files.", "Verify provider-controlled models, files, search and usage limits for the exact plan.", "Confirm current availability, delivery ETA and applicable terms before payment."],
    related: [{ label: "AI Code", href: "/ai-code" }, { label: "AI Workspace", href: "/ai-workspace" }, { label: "AI Writing", href: "/ai-writing" }],
    guides: [{ label: "Student guide", href: "/best-ai-for-students" }, { label: "Freelancer guide", href: "/best-ai-for-freelancers" }, { label: "Business guide", href: "/best-ai-for-business" }],
  },
  "ai-image": {
    id: "ai-image",
    displayName: "AI Image & Design",
    seoTitle: "AI Image Tools in Bangladesh — Current BDT Prices | AIPS",
    metaDescription: "Compare current AI image catalog families, published AIPS BDT prices and access models. Verify provider credits, licensing, exports and plan limits before payment.",
    subtitle: "Image generation, editing and creative asset workflows",
    description: "Browse current AIPS image and creative-tool families by published price and access model. Provider-controlled generation credits, licensing, exports and feature availability should be checked for the exact plan.",
    accent: "#8b5cf6",
    decisions: ["Match the tool to the deliverable: generated image, edit, asset, typography or design workflow.", "Check current provider licensing, credit and export terms before commercial work.", "Use an access model appropriate for private client or unreleased creative assets."],
    related: [{ label: "AI Design", href: "/ai-design" }, { label: "AI Video", href: "/ai-video" }, { label: "Voice & Music", href: "/ai-voice-music" }],
    guides: [{ label: "Creator guide", href: "/best-ai-for-creators" }, { label: "Designer guide", href: "/best-ai-for-designers" }, { label: "Freelancer guide", href: "/best-ai-for-freelancers" }],
  },
  "ai-video": {
    id: "ai-video",
    displayName: "AI Video",
    seoTitle: "AI Video Tools in Bangladesh — Current BDT Prices | AIPS",
    metaDescription: "Compare current AI video catalog families, published AIPS BDT prices and access models. Verify provider credits, exports, availability and plan limits before payment.",
    subtitle: "Video generation, editing, avatars and repurposing",
    description: "Compare current AIPS video-tool families without relying on fixed generation counts, model names or delivery promises. Use published AIPS prices for discovery, then verify provider-controlled credits and exports for the exact plan.",
    accent: "#ec4899",
    decisions: ["Start with the production step you need to improve: generation, editing, avatar, repurposing or export.", "Verify provider credits, duration, watermark and export limits for the exact plan.", "Confirm current access model, availability, delivery ETA and applicable terms before payment."],
    related: [{ label: "AI Image", href: "/ai-image" }, { label: "AI Design", href: "/ai-design" }, { label: "Voice & Music", href: "/ai-voice-music" }],
    guides: [{ label: "Creator guide", href: "/best-ai-for-creators" }, { label: "Designer guide", href: "/best-ai-for-designers" }, { label: "Marketing guide", href: "/best-ai-for-marketers" }],
  },
  "ai-voice-music": {
    id: "ai-voice-music",
    displayName: "AI Voice & Music",
    seoTitle: "AI Voice & Music Tools Bangladesh — BDT Prices | AIPS",
    metaDescription: "Compare current AI voice and music catalog families, published AIPS BDT prices and access models. Verify provider credits, rights, limits and availability before payment.",
    subtitle: "Speech, voice, audio and music workflows",
    description: "Browse current voice, speech, audio and music-tool families by published AIPS price and access model. Check provider-controlled credits, rights, cloning rules and export limits for the exact plan.",
    accent: "#f97316",
    decisions: ["Separate speech, voice, dubbing, audio and music needs before choosing a tool.", "Check provider consent, licensing, credits and commercial-use terms for the exact workflow.", "Confirm current access model, availability, delivery ETA and applicable terms before payment."],
    related: [{ label: "AI Video", href: "/ai-video" }, { label: "AI Image", href: "/ai-image" }, { label: "AI Design", href: "/ai-design" }],
    guides: [{ label: "Creator guide", href: "/best-ai-for-creators" }, { label: "Freelancer guide", href: "/best-ai-for-freelancers" }],
  },
  "ai-code": {
    id: "ai-code",
    displayName: "AI Code & Development",
    seoTitle: "AI Coding Tools in Bangladesh — Current BDT Prices | AIPS",
    metaDescription: "Compare current AI coding catalog families, published AIPS BDT prices and access models. Verify provider models, quotas, repository privacy and availability before payment.",
    subtitle: "Coding assistants, IDE tools, app builders and setup services",
    description: "Compare active AIPS coding and development families without relying on stale provider model names, quota promises or retired platforms. Choose by workflow fit, then verify provider-controlled limits for the exact plan.",
    accent: "#06b6d4",
    decisions: ["Check repository privacy and provider data-retention settings before using proprietary code.", "Choose by workflow fit: editor assistance, app building, autonomous tasks, APIs or setup services.", "Verify current provider quotas, model availability and commercial details for the exact plan."],
    related: [{ label: "AI Assistants", href: "/ai-assistant" }, { label: "AI Workspace", href: "/ai-workspace" }, { label: "All Products", href: "/products" }],
    guides: [{ label: "Developer guide", href: "/best-ai-for-developers" }, { label: "Freelancer guide", href: "/best-ai-for-freelancers" }],
  },
  "ai-workspace": {
    id: "ai-workspace",
    displayName: "AI Workspace",
    seoTitle: "AI Workspace Tools Bangladesh — Current BDT Prices | AIPS",
    metaDescription: "Compare current AI workspace catalog families, published AIPS BDT prices and access models. Verify provider collaboration, storage, privacy and plan limits before payment.",
    subtitle: "Productivity, meetings, documents and team workflows",
    description: "Browse current workspace and productivity families by published AIPS price and access model. Verify provider-controlled collaboration, storage, retention and usage limits for the exact plan before putting work data into a service.",
    accent: "#f4b942",
    decisions: ["Choose personal or team-appropriate access before adding private company or client data.", "Check provider collaboration, storage, admin and retention controls for the exact plan.", "Confirm current availability, delivery ETA and applicable terms before payment."],
    related: [{ label: "AI Assistants", href: "/ai-assistant" }, { label: "AI Code", href: "/ai-code" }, { label: "Bundles & Services", href: "/bundles" }],
    guides: [{ label: "Business guide", href: "/best-ai-for-business" }, { label: "Student guide", href: "/best-ai-for-students" }, { label: "Freelancer guide", href: "/best-ai-for-freelancers" }],
  },
  "ai-writing": {
    id: "ai-writing",
    displayName: "AI Writing & SEO",
    seoTitle: "AI Writing & SEO Tools Bangladesh — BDT Prices | AIPS",
    metaDescription: "Compare current AI writing and SEO catalog families, published AIPS BDT prices and access models. Verify provider limits, sources and integrations before payment.",
    subtitle: "Writing, editing, research and content operations",
    description: "Compare current AIPS writing and SEO families by price and access model. Treat generated copy, citations, search data and marketing claims as material that still requires source checking and human review.",
    accent: "#3b82f6",
    decisions: ["Choose around the workflow: drafting, editing, research, SEO, paraphrasing or campaign production.", "Verify factual claims, citations and search data before publishing client-facing content.", "Confirm provider limits, integrations, availability and applicable terms for the exact plan."],
    related: [{ label: "AI Assistants", href: "/ai-assistant" }, { label: "AI Design", href: "/ai-design" }, { label: "AI Workspace", href: "/ai-workspace" }],
    guides: [{ label: "Marketing guide", href: "/best-ai-for-marketers" }, { label: "Freelancer guide", href: "/best-ai-for-freelancers" }, { label: "Student guide", href: "/best-ai-for-students" }],
  },
  "ai-design": {
    id: "ai-design",
    displayName: "AI Design & Creative",
    seoTitle: "AI Design Tools in Bangladesh — Current BDT Prices | AIPS",
    metaDescription: "Compare current AI design catalog families, published AIPS BDT prices and access models. Verify provider licensing, exports, collaboration and plan limits before payment.",
    subtitle: "Design, presentations, creative assets and production",
    description: "Browse current AIPS design and creative families by published price and access model. Verify provider-controlled licensing, exports, credits and collaboration limits for the exact plan before production work.",
    accent: "#a855f7",
    decisions: ["Choose around the output you need: editable design, presentation, asset, image or video.", "Check provider licensing, export and collaboration terms for the exact plan.", "Use an access model appropriate for client assets and confirm current commercial details before payment."],
    related: [{ label: "AI Image", href: "/ai-image" }, { label: "AI Video", href: "/ai-video" }, { label: "AI Writing", href: "/ai-writing" }],
    guides: [{ label: "Designer guide", href: "/best-ai-for-designers" }, { label: "Creator guide", href: "/best-ai-for-creators" }, { label: "Marketing guide", href: "/best-ai-for-marketers" }],
  },
  bundles: {
    id: "bundles",
    displayName: "Bundles & Services",
    seoTitle: "AI Bundles & Services Bangladesh — Current BDT Prices | AIPS",
    metaDescription: "Compare current AIPS bundles and setup-service catalog records by published BDT price and access model. Confirm exact inclusions, availability, delivery ETA and terms before payment.",
    subtitle: "Multi-tool bundles, setup and implementation services",
    description: "Browse only the bundle and service records currently published in the AIPS catalog. Exact inclusions, service scope, savings and delivery commitments are not assumed here; confirm the current offer before payment.",
    accent: "#e11d48",
    decisions: ["Confirm exactly which tools, access models and service deliverables are included in the current offer.", "Compare the bundle against the current individual plan records rather than relying on a typed savings claim.", "Confirm scope, owner, availability, delivery ETA and applicable terms before payment."],
    related: [{ label: "AI Assistants", href: "/ai-assistant" }, { label: "AI Workspace", href: "/ai-workspace" }, { label: "All Products", href: "/products" }],
    guides: [{ label: "Business guide", href: "/best-ai-for-business" }, { label: "Freelancer guide", href: "/best-ai-for-freelancers" }, { label: "Student guide", href: "/best-ai-for-students" }],
  },
};

interface ProductRecord {
  id: string;
  name: string;
  slug: string;
  brand: string | null;
  brandColor: string | null;
  category: string;
  price: number | null;
  requestPrice?: boolean;
  tier: string | null;
  accessType: string | null;
}

interface ProductFamily {
  slug: string;
  label: string;
  brand: string | null;
  brandColor: string | null;
  category: string;
  planCount: number;
  minPrice: number | null;
  access: string[];
}

const catalog = (productsData.products as ProductRecord[]).filter((product) => !RETIRED.has(product.slug));

function baseName(value: string): string {
  return value.split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
}

function slugLabel(slug: string): string {
  const acronyms: Record<string, string> = { ai: "AI", api: "API", seo: "SEO", chatgpt: "ChatGPT", github: "GitHub", pdf: "PDF" };
  return slug.replace(/-bangladesh$/, "").split("-").map((part) => acronyms[part] ?? (part === "v0" ? "v0" : part.charAt(0).toUpperCase() + part.slice(1))).join(" ");
}

function safeFamilyLabel(record: ProductRecord): string {
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

function familyGroups(categoryId: string): ProductFamily[] {
  const groups = new Map<string, ProductRecord[]>();
  for (const product of catalog) {
    if (product.category !== categoryId) continue;
    if (!groups.has(product.slug)) groups.set(product.slug, []);
    groups.get(product.slug)?.push(product);
  }

  return [...groups.entries()].map(([slug, records]) => {
    const first = records[0];
    const prices = records
      .filter((record) => !record.requestPrice && typeof record.price === "number" && record.price > 0)
      .map((record) => record.price as number);
    return {
      slug,
      label: safeFamilyLabel(first),
      brand: first.brand,
      brandColor: first.brandColor,
      category: first.category,
      planCount: records.length,
      minPrice: prices.length ? Math.min(...prices) : null,
      access: [...new Set(records.map((record) => accessLabel(record.accessType)))],
    };
  }).sort((a, b) => (a.minPrice ?? Infinity) - (b.minPrice ?? Infinity) || a.label.localeCompare(b.label));
}

function FamilyCard({ family, accent, reducedMotion }: { family: ProductFamily; accent: string; reducedMotion: boolean | null }) {
  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-white/10 p-5 flex flex-col"
      style={{ backgroundColor: "#151b3d" }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${family.brandColor || accent}16` }}>
          <BrandIcon brand={family.brand ?? family.label} color={family.brandColor || accent} size={28} />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-white leading-tight">{family.label}</h3>
          <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>{family.planCount} current plan record{family.planCount === 1 ? "" : "s"}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {family.access.map((label) => <span key={label} className="text-xs px-2 py-1 rounded-full border border-white/10" style={{ color: "#c9ceda" }}>{label}</span>)}
      </div>

      <div className="mt-auto flex items-end justify-between gap-4">
        <div>
          <div className="text-[11px]" style={{ color: "#9ca3af" }}>Published AIPS entry price</div>
          <div className="text-lg font-bold" style={{ color: accent }}>{family.minPrice ? `From ${formatBDT(family.minPrice)}` : "Current price on request"}</div>
        </div>
        <Link href={productPath(family.slug)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white whitespace-nowrap">
          Details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function CategoryPage({ categoryId }: { categoryId: string }) {
  const reducedMotion = useReducedMotion();
  const config = CATEGORIES[categoryId];
  const families = useMemo(() => familyGroups(categoryId), [categoryId]);
  const planCount = useMemo(() => catalog.filter((product) => product.category === categoryId).length, [categoryId]);

  if (!config) {
    return <PageLayout><SEOHead title="Category Not Found | AI Premium Shop" description="This AI tool category is not available." noindex /><div id="main-content" className="text-center py-32 text-white">Category not found.</div></PageLayout>;
  }

  const confirmUrl = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I am comparing ${config.displayName} options. Please confirm the current AIPS price, access model, availability, provider-controlled limits, delivery ETA and applicable terms before payment.`)}`;

  return (
    <PageLayout>
      <SEOHead title={config.seoTitle} description={config.metaDescription} canonical={`https://aipremiumshop.com/${categoryId}`} />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: config.displayName }]} />

      <div id="main-content" className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <motion.header initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 mb-4 text-xs font-semibold" style={{ color: config.accent, backgroundColor: `${config.accent}12` }}>
            <ShieldCheck className="w-3.5 h-3.5" /> Current public catalog
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">{config.displayName}</h1>
          <p className="text-lg font-semibold mb-4" style={{ color: config.accent }}>{config.subtitle}</p>
          <p className="max-w-3xl leading-relaxed" style={{ color: "#c9ceda" }}>{config.description}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="px-3 py-1.5 rounded-full border border-white/10 text-xs" style={{ color: "#c9ceda" }}>{families.length} catalog families</span>
            <span className="px-3 py-1.5 rounded-full border border-white/10 text-xs" style={{ color: "#c9ceda" }}>{planCount} current plan records</span>
          </div>
        </motion.header>

        <section className="grid lg:grid-cols-[1fr_350px] gap-6 mb-12">
          <div>
            <div className="flex items-end justify-between gap-4 mb-5">
              <div><p className="text-xs uppercase tracking-[0.18em] font-semibold mb-2" style={{ color: config.accent }}>Compare current options</p><h2 className="text-2xl md:text-3xl font-bold text-white">Catalog families</h2></div>
              <Link href="/pricing" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: config.accent }}>All pricing <ChevronRight className="w-4 h-4" /></Link>
            </div>
            {families.length ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {families.map((family) => <FamilyCard key={family.slug} family={family} accent={config.accent} reducedMotion={reducedMotion} />)}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 p-8" style={{ backgroundColor: "#151b3d" }}><p className="text-white font-semibold">No current public catalog families are available in this category.</p><p className="text-sm mt-2" style={{ color: "#c9ceda" }}>Use the full catalog or ask AIPS to confirm current options.</p></div>
            )}
          </div>

          <aside className="rounded-2xl border border-white/10 p-6 h-fit lg:sticky lg:top-24" style={{ backgroundColor: "#151b3d" }}>
            <WalletCards className="w-6 h-6 mb-3" style={{ color: config.accent }} />
            <h2 className="text-lg font-bold text-white mb-4">Before choosing</h2>
            <div className="space-y-4">
              {config.decisions.map((decision) => <div key={decision} className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} /><p className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{decision}</p></div>)}
            </div>
            <a href={confirmUrl} target="_blank" rel="noopener noreferrer" className="mt-6 flex min-h-11 items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#008236" }}>
              <MessageCircle className="w-4 h-4" /> Confirm current details
            </a>
          </aside>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "rgba(21,27,61,0.65)" }}>
            <h2 className="text-lg font-bold text-white mb-4">Related categories</h2>
            <div className="flex flex-wrap gap-2">{config.related.map((item) => <Link key={item.href} href={item.href} className="px-3 py-2 rounded-xl border border-white/10 text-sm font-medium" style={{ color: "#e5e7eb" }}>{item.label}</Link>)}</div>
          </div>
          <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "rgba(21,27,61,0.65)" }}>
            <h2 className="text-lg font-bold text-white mb-4">Decision guides</h2>
            <div className="flex flex-wrap gap-2">{config.guides.map((item) => <Link key={item.href} href={item.href} className="px-3 py-2 rounded-xl border border-white/10 text-sm font-medium" style={{ color: "#e5e7eb" }}>{item.label}</Link>)}</div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
