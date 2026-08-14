import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { BrandIcon } from "@/components/BrandIcon";
import { formatBDT } from "@/lib/format";
import { productPath } from "@/lib/productRoutes";
import productsData from "../../../data/catalog-pages.json";

const SITE = "https://aipremiumshop.com";
const WHATSAPP = "https://wa.me/8801865385348";
const RETIRED = new Set(["replit-bangladesh"]);
const CATEGORIES = ["ai-assistant", "ai-writing", "ai-workspace", "ai-design"];
const SIGNALS = new Set(["research", "citations", "document", "pdf-chat", "writing", "presentation", "tts", "meetings"]);

type ProductRecord = (typeof productsData.products)[number];

type Family = {
  slug: string;
  first: ProductRecord;
  price: number | null;
  access: string[];
  score: number;
};

const catalog = (productsData.products as ProductRecord[]).filter((product) => !RETIRED.has(product.slug));

function baseName(value: string) {
  return value.split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
}

function accessLabel(value: string | null | undefined) {
  if (value === "shared") return "Shared";
  if (value === "personal") return "Personal";
  if (value === "team") return "Team";
  if (value === "bundle") return "Bundle";
  if (value) return "Service";
  return "Confirm";
}

function relevance(record: ProductRecord) {
  const categoryPosition = CATEGORIES.indexOf(record.category);
  let score = categoryPosition >= 0 ? (CATEGORIES.length - categoryPosition) * 12 : 0;
  for (const capability of record.capabilities ?? []) if (SIGNALS.has(capability)) score += 4;
  if (typeof record.price === "number" && record.price > 0 && !record.requestPrice) score += 2;
  return score;
}

function shortlist(): Family[] {
  const groups = new Map<string, ProductRecord[]>();
  for (const record of catalog) {
    if (!CATEGORIES.includes(record.category)) continue;
    if (!groups.has(record.slug)) groups.set(record.slug, []);
    groups.get(record.slug)?.push(record);
  }

  return [...groups.entries()].map(([slug, records]) => {
    const first = [...records].sort((a, b) => relevance(b) - relevance(a))[0];
    const prices = records
      .filter((record) => !record.requestPrice && typeof record.price === "number" && record.price > 0)
      .map((record) => record.price as number);
    return {
      slug,
      first,
      price: prices.length ? Math.min(...prices) : null,
      access: [...new Set(records.map((record) => accessLabel(record.accessType)))],
      score: Math.max(...records.map(relevance)),
    };
  }).sort((a, b) => b.score - a.score || (a.price ?? Infinity) - (b.price ?? Infinity)).slice(0, 8);
}

export default function EducatorsGuide() {
  const reducedMotion = useReducedMotion();
  const items = useMemo(() => shortlist(), []);
  const askUrl = `${WHATSAPP}?text=${encodeURIComponent("Hi, I need help choosing an AI tool for teaching or education work. Please compare current AIPS price and access model, then confirm provider limits, privacy considerations, availability, delivery ETA and applicable terms before payment.")}`;

  return (
    <PageLayout>
      <SEOHead
        title="AI Tools for Educators in Bangladesh | Current AIPS Guide"
        description="Compare current AI tools for educators using published AIPS prices and access models. Check academic policy, privacy, provider limits and availability before use."
        canonical={`${SITE}/guides/educators`}
      />

      <div id="main-content" className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <nav aria-label="breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-slate-400">
          <Link href="/">Home</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/guides">Guides</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-white">Educators</span>
        </nav>

        <motion.header initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Current-catalog educator guide</div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">AI Tools for Educators in Bangladesh</h1>
          <p className="text-base leading-7 text-slate-300 md:text-lg">Compare current assistants, writing, workspace and design tools for lesson preparation, research, documents and teaching workflows. The shortlist uses current public AIPS catalog evidence; it is not an objective product ranking.</p>
        </motion.header>

        <section className="mb-12 grid gap-6 lg:grid-cols-[1fr_330px]">
          <div>
            <div className="mb-5"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4b942]">Current shortlist</p><h2 className="text-2xl font-bold text-white">Relevant catalog options</h2><p className="mt-2 text-sm text-slate-400">Ordered by educator-workflow relevance and then current published price, not by a universal “best” score.</p></div>
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((item, index) => (
                <motion.article key={item.slug} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.15) }} className="rounded-2xl border border-white/10 bg-[#151b3d] p-5">
                  <div className="mb-4 flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10" style={{ backgroundColor: `${item.first.brandColor || "#f4b942"}16` }}><BrandIcon brand={item.first.brand ?? baseName(item.first.name)} color={item.first.brandColor || "#f4b942"} size={26} /></div><div><h3 className="font-bold text-white">{baseName(item.first.name)}</h3><p className="mt-1 text-xs text-slate-400">{item.access.join(", ")}</p></div></div>
                  <p className="text-sm font-bold text-[#f4b942]">{item.price ? `From ${formatBDT(item.price)}` : "Check current price"}</p>
                  <p className="mt-3 text-xs leading-5 text-slate-500">Verify the exact provider features, limits, retention/privacy settings and availability for the plan you intend to use.</p>
                  <Link href={productPath(item.slug)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">View current details <ArrowRight className="h-4 w-4" /></Link>
                </motion.article>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
            <h2 className="text-lg font-bold text-white">Before using AI in education</h2>
            <div className="mt-4 space-y-3">
              {["Follow your school, university or organization policy for AI-assisted teaching and assessment.", "Use an access model appropriate for student records, unpublished research and other sensitive data.", "Verify generated facts, citations, calculations and source material before using them in instruction.", "Check current provider-controlled file, model, credit, storage and usage limits for the exact plan."].map((point) => <div key={point} className="flex gap-2.5 text-sm leading-6 text-slate-300"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" /><span>{point}</span></div>)}
            </div>
            <a href={askUrl} target="_blank" rel="noopener noreferrer" className="mt-6 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Ask AIPS to compare</a>
          </aside>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#151b3d]/70 p-6">
          <h2 className="text-xl font-bold text-white">Browse the broader current catalog</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Use category pages to compare more families before choosing a specific plan.</p>
          <div className="mt-4 flex flex-wrap gap-2"><Link href="/ai-assistant" className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200">AI assistants</Link><Link href="/ai-writing" className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200">Writing & SEO</Link><Link href="/ai-workspace" className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200">Workspace</Link><Link href="/ai-design" className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200">Design</Link><Link href="/pricing" className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200">Current pricing</Link></div>
        </section>
      </div>
    </PageLayout>
  );
}
