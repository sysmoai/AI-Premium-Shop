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

type ProductRecord = (typeof productsData.products)[number];

type GuideDefinition = {
  label: string;
  heading: string;
  intro: string;
  categories: string[];
  signals: string[];
  decisions: string[];
  links: { label: string; href: string }[];
};

const GUIDES: Record<string, GuideDefinition> = {
  students: {
    label: "Students", heading: "AI Tools for Students in Bangladesh",
    intro: "Compare current tools for research, writing, documents, study workflows and general assistance using published AIPS catalog evidence.",
    categories: ["ai-assistant", "ai-writing", "ai-workspace"], signals: ["research", "citations", "document", "pdf-chat", "math", "writing"],
    decisions: ["Use an access model appropriate for private coursework or unpublished research.", "Check current provider citation, file and usage limits before relying on a tool for academic work.", "Follow your institution's rules for AI assistance and verify submitted facts yourself."],
    links: [{ label: "AI assistants", href: "/ai-assistant" }, { label: "Writing tools", href: "/ai-writing" }, { label: "Workspace tools", href: "/ai-workspace" }],
  },
  freelancers: {
    label: "Freelancers", heading: "AI Tools for Freelancers in Bangladesh",
    intro: "Build a current client-work stack across research, writing, design, coding and productivity while keeping price and access type visible.",
    categories: ["ai-assistant", "ai-writing", "ai-design", "ai-code", "ai-workspace"], signals: ["research", "writing", "design", "code", "automation"],
    decisions: ["Use privacy-appropriate access for client files, credentials and unpublished work.", "Choose tools around repeatable billable workflows instead of accumulating overlapping subscriptions.", "Confirm provider limits and availability before committing to client deadlines."],
    links: [{ label: "AI assistants", href: "/ai-assistant" }, { label: "AI design", href: "/ai-design" }, { label: "AI code", href: "/ai-code" }],
  },
  creators: {
    label: "Creators", heading: "AI Tools for Content Creators in Bangladesh",
    intro: "Compare current image, video, voice, music, writing and design tools by the production step you need to improve.",
    categories: ["ai-video", "ai-image", "ai-design", "ai-voice-music", "ai-writing"], signals: ["video-gen", "image-gen", "video-edit", "music-gen", "tts", "writing"],
    decisions: ["Map each subscription to a repeatable production step such as scripting, visuals, editing or voice.", "Check current export, credit and commercial-use terms with the provider for the exact plan.", "Use access appropriate to client or unreleased creative assets."],
    links: [{ label: "AI video", href: "/ai-video" }, { label: "AI image", href: "/ai-image" }, { label: "Voice & music", href: "/ai-voice-music" }],
  },
  business: {
    label: "Businesses", heading: "AI Tools for Businesses in Bangladesh",
    intro: "Evaluate current assistants, workspace tools, automation and service options around governance, access control and measurable workflow value.",
    categories: ["ai-workspace", "ai-assistant", "ai-code", "bundles"], signals: ["automation", "agents", "support", "meetings", "email"],
    decisions: ["Separate personal, shared, team and service access before putting business data into a tool.", "Define the workflow and accountable owner before buying automation or setup services.", "Confirm current provider admin, retention and usage controls from provider documentation."],
    links: [{ label: "AI workspace", href: "/ai-workspace" }, { label: "AI assistants", href: "/ai-assistant" }, { label: "Bundles & services", href: "/bundles" }],
  },
  developers: {
    label: "Developers", heading: "AI Coding Tools for Developers in Bangladesh",
    intro: "Compare current coding assistants, IDE tools, app builders and agents without relying on fixed model-name, context-window or quota claims.",
    categories: ["ai-code", "ai-assistant"], signals: ["code", "agents", "automation", "api", "no-code"],
    decisions: ["Check repository privacy and data-retention settings before using proprietary code.", "Verify current provider quotas and model availability for the exact plan.", "Choose by workflow fit: editor help, autonomous tasks, app building, debugging or general reasoning."],
    links: [{ label: "AI code & development", href: "/ai-code" }, { label: "AI assistants", href: "/ai-assistant" }, { label: "All guides", href: "/guides" }],
  },
  "job-seekers": {
    label: "Job Seekers", heading: "AI Tools for Job Seekers in Bangladesh",
    intro: "Use current writing, research and assistant tools for CV iteration, interview preparation, role research and communication with human review.",
    categories: ["ai-assistant", "ai-writing", "ai-workspace"], signals: ["writing", "research", "document"],
    decisions: ["Review every factual statement in a CV or application before submitting it.", "Avoid putting unnecessary sensitive identity or employer information into shared access.", "Use AI to prepare and edit, not to fabricate experience, credentials or references."],
    links: [{ label: "AI assistants", href: "/ai-assistant" }, { label: "Writing tools", href: "/ai-writing" }, { label: "Workspace tools", href: "/ai-workspace" }],
  },
  designers: {
    label: "Designers", heading: "AI Design Tools for Designers in Bangladesh",
    intro: "Compare current design, image and video tools for concepting, assets, presentations and creative production.",
    categories: ["ai-design", "ai-image", "ai-video"], signals: ["design", "image-gen", "image-edit", "logo", "video-gen"],
    decisions: ["Check provider licensing and commercial-use terms for the exact plan.", "Choose around the deliverable: editable design, generated image, presentation, video or brand asset.", "Verify current credits, exports and collaboration limits before a production deadline."],
    links: [{ label: "AI design", href: "/ai-design" }, { label: "AI image", href: "/ai-image" }, { label: "AI video", href: "/ai-video" }],
  },
  marketers: {
    label: "Marketers", heading: "AI Tools for Marketers in Bangladesh",
    intro: "Compare current writing, research, design and automation tools for campaigns, SEO, content operations and reporting.",
    categories: ["ai-writing", "ai-design", "ai-workspace", "ai-assistant"], signals: ["seo", "keywords", "ads", "social", "writing", "research"],
    decisions: ["Keep factual and performance claims evidence-backed before publishing them.", "Choose tools around campaign bottlenecks such as research, production, repurposing or reporting.", "Confirm current provider quotas and integrations for the plan you will use."],
    links: [{ label: "Writing & SEO", href: "/ai-writing" }, { label: "AI design", href: "/ai-design" }, { label: "AI workspace", href: "/ai-workspace" }],
  },
  ecommerce: {
    label: "E-commerce Teams", heading: "AI Tools for E-commerce in Bangladesh",
    intro: "Compare current tools for product content, creative production, research, customer operations and workflow automation with human review around customer-facing facts.",
    categories: ["ai-writing", "ai-design", "ai-workspace", "ai-assistant"], signals: ["seo", "writing", "design", "support", "automation"],
    decisions: ["Verify generated product specifications, pricing and claims against source data before publishing.", "Use privacy-appropriate access for customer, order and supplier information.", "Evaluate automation on measurable operational value rather than the number of tools connected."],
    links: [{ label: "Writing & SEO", href: "/ai-writing" }, { label: "AI workspace", href: "/ai-workspace" }, { label: "Bundles & services", href: "/bundles" }],
  },
};

const catalog = (productsData.products as ProductRecord[]).filter((product) => !RETIRED.has(product.slug));
function baseName(value: string) { return value.split(/—\s*/)[0].split(/\s+-\s+/)[0].trim(); }
function accessText(values: Array<string | null | undefined>) {
  const labels = values.map((value) => value === "shared" ? "Shared" : value === "personal" ? "Personal" : value === "team" ? "Team" : value === "bundle" ? "Bundle" : value ? "Service" : null).filter(Boolean);
  return labels.length ? [...new Set(labels)].join(", ") : "Confirm before payment";
}
function score(record: ProductRecord, definition: GuideDefinition) {
  let value = 0;
  const position = definition.categories.indexOf(record.category);
  if (position >= 0) value += (definition.categories.length - position) * 12;
  for (const capability of record.capabilities ?? []) if (definition.signals.includes(capability)) value += 4;
  if (typeof record.price === "number" && record.price > 0) value += 2;
  return value;
}
function recommendations(definition: GuideDefinition) {
  const groups = new Map<string, ProductRecord[]>();
  for (const record of catalog) {
    if (!definition.categories.includes(record.category)) continue;
    if (!groups.has(record.slug)) groups.set(record.slug, []);
    groups.get(record.slug)?.push(record);
  }
  return [...groups.entries()].map(([slug, records]) => {
    const first = [...records].sort((a, b) => score(b, definition) - score(a, definition))[0];
    const prices = records
      .filter((record) => !record.requestPrice && typeof record.price === "number" && record.price > 0)
      .map((record) => record.price as number);
    return { slug, first, score: Math.max(...records.map((record) => score(record, definition))), price: prices.length ? Math.min(...prices) : null, access: records.map((record) => record.accessType) };
  }).sort((a, b) => b.score - a.score || (a.price ?? Infinity) - (b.price ?? Infinity)).slice(0, 8);
}
function fit(value: string, max: number) { return value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`; }

export default function GuidePage({ guideKey }: { guideKey: string }) {
  const reducedMotion = useReducedMotion();
  const definition = GUIDES[guideKey];
  const items = useMemo(() => definition ? recommendations(definition) : [], [definition]);

  if (!definition) return <PageLayout><SEOHead title="Guide Not Found | AI Premium Shop" description="This AI tool guide is not available." noindex /><div id="main-content" className="mx-auto max-w-4xl px-4 py-24 text-center"><h1 className="mb-4 text-3xl font-bold text-white">Guide not found</h1><Link href="/guides" className="inline-flex items-center gap-2 rounded-xl bg-[#f4b942] px-5 py-3 font-semibold text-[#0a0e27]">Browse guides <ArrowRight className="h-4 w-4" /></Link></div></PageLayout>;

  const canonical = `${SITE}/best-ai-for-${guideKey}`;
  const title = fit(`${definition.heading} | Current AIPS Guide`, 68);
  const description = fit(`${definition.intro} Compare current AIPS prices/access and confirm provider limits, availability, delivery ETA and terms before payment.`, 158);
  const askUrl = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I need help choosing an AI tool for ${definition.label.toLowerCase()}. Please compare current AIPS price and access, then confirm availability, provider limits, delivery ETA and terms before payment.`)}`;

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={canonical} />
      <div id="main-content" className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <nav aria-label="breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-slate-400"><Link href="/">Home</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/guides">Guides</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-white">{definition.label}</span></nav>
        <motion.header initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10 max-w-4xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Current-catalog decision guide</div><h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">{definition.heading}</h1><p className="text-base leading-7 text-slate-300 md:text-lg">{definition.intro}</p></motion.header>

        <section className="mb-12 grid gap-6 lg:grid-cols-[1fr_330px]">
          <div><div className="mb-5 flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4b942]">Current shortlist</p><h2 className="text-2xl font-bold text-white">Relevant catalog options</h2></div><span className="text-xs text-slate-500">Ordered by guide relevance, not an objective ranking</span></div><div className="grid gap-4 md:grid-cols-2">{items.map((item, index) => <motion.article key={item.slug} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.15) }} className="rounded-2xl border border-white/10 bg-[#151b3d] p-5"><div className="mb-4 flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10" style={{ backgroundColor: `${item.first.brandColor || "#f4b942"}16` }}><BrandIcon brand={item.first.brand ?? baseName(item.first.name)} color={item.first.brandColor || "#f4b942"} size={26} /></div><div><h3 className="font-bold text-white">{baseName(item.first.name)}</h3><p className="mt-1 text-xs text-slate-400">{accessText(item.access)}</p></div></div><p className="text-sm font-bold text-[#f4b942]">{item.price ? `From ${formatBDT(item.price)}` : "Check current price"}</p><p className="mt-3 text-xs leading-5 text-slate-500">Current AIPS catalog evidence only. Verify current provider-controlled features and limits for the exact plan.</p><Link href={productPath(item.slug)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">View current details <ArrowRight className="h-4 w-4" /></Link></motion.article>)}</div></div>
          <aside className="rounded-2xl border border-white/10 bg-[#151b3d] p-6"><h2 className="text-lg font-bold text-white">Decision checklist</h2><div className="mt-4 space-y-3">{definition.decisions.map((decision) => <div key={decision} className="flex gap-2.5 text-sm leading-6 text-slate-300"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" /><span>{decision}</span></div>)}</div><a href={askUrl} target="_blank" rel="noopener noreferrer" className="mt-6 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Ask AIPS to compare</a></aside>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#151b3d]/70 p-6"><h2 className="text-xl font-bold text-white">Explore by workflow category</h2><p className="mt-2 text-sm leading-6 text-slate-300">Use the category pages when you need a broader current catalog view before choosing a specific plan.</p><div className="mt-4 flex flex-wrap gap-2">{definition.links.map((link) => <Link key={link.href} href={link.href} className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200">{link.label}</Link>)}<Link href="/pricing" className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200">Current pricing</Link></div></section>
      </div>
    </PageLayout>
  );
}
