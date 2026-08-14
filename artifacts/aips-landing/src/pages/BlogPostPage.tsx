import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, CheckCircle2, ChevronRight, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { BrandIcon } from "@/components/BrandIcon";
import { formatBDT } from "@/lib/format";
import { productPath } from "@/lib/productRoutes";
import blogGuides from "../../data/blog-guides.json";
import productsData from "../../data/catalog-pages.json";

const SITE = "https://aipremiumshop.com";
const WHATSAPP = "https://wa.me/8801865385348";
const RETIRED = new Set(["replit-bangladesh"]);

interface ProductRecord {
  name: string;
  slug: string;
  brand?: string | null;
  brandColor?: string | null;
  category: string;
  price?: number | null;
  requestPrice?: boolean;
  accessType?: string | null;
}

interface BlogDefinition {
  slug: string;
  title: string;
  description: string;
  h1: string;
  categoryKey: string;
  categoryLabel: string;
  intro: string;
  checks: string[];
  categories: string[];
  focusSlugs: string[];
}

interface Family {
  slug: string;
  first: ProductRecord;
  records: ProductRecord[];
  minPrice: number | null;
  access: string[];
}

const posts = blogGuides.posts as BlogDefinition[];
const catalog = (productsData.products as ProductRecord[]).filter((record) => !RETIRED.has(record.slug));

const CATEGORY_LABELS: Record<string, string> = {
  "ai-assistant": "AI Assistants",
  "ai-image": "AI Image",
  "ai-video": "AI Video",
  "ai-voice-music": "AI Voice & Music",
  "ai-code": "AI Code",
  "ai-workspace": "AI Workspace",
  "ai-writing": "AI Writing & SEO",
  "ai-design": "AI Design",
  bundles: "Bundles & Services",
};

function baseName(value: string) {
  return value.split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
}

function accessLabel(value?: string | null) {
  if (value === "shared") return "Shared";
  if (value === "personal") return "Personal";
  if (value === "team") return "Team";
  if (value === "bundle") return "Bundle";
  if (value === "setup-service" || value === "setup" || value === "service") return "Setup / Service";
  return "Confirm";
}

function familiesFor(definition: BlogDefinition): Family[] {
  const groups = new Map<string, ProductRecord[]>();
  for (const record of catalog) {
    if (!groups.has(record.slug)) groups.set(record.slug, []);
    groups.get(record.slug)?.push(record);
  }

  const chosen: string[] = [];
  for (const slug of definition.focusSlugs) if (groups.has(slug) && !chosen.includes(slug)) chosen.push(slug);

  if (chosen.length < 8) {
    for (const category of definition.categories) {
      const candidates = [...groups.entries()]
        .filter(([, records]) => records.some((record) => record.category === category))
        .map(([slug, records]) => {
          const prices = records.filter((record) => !record.requestPrice && typeof record.price === "number" && record.price > 0).map((record) => Number(record.price));
          return { slug, price: prices.length ? Math.min(...prices) : Infinity };
        })
        .sort((a, b) => a.price - b.price || a.slug.localeCompare(b.slug));
      for (const candidate of candidates) {
        if (chosen.includes(candidate.slug)) continue;
        chosen.push(candidate.slug);
        if (chosen.length >= 8) break;
      }
      if (chosen.length >= 8) break;
    }
  }

  return chosen.slice(0, 8).map((slug) => {
    const records = groups.get(slug) ?? [];
    const first = records[0];
    const prices = records.filter((record) => !record.requestPrice && typeof record.price === "number" && record.price > 0).map((record) => Number(record.price));
    return {
      slug,
      first,
      records,
      minPrice: prices.length ? Math.min(...prices) : null,
      access: [...new Set(records.map((record) => accessLabel(record.accessType)))],
    };
  }).filter((family) => Boolean(family.first));
}

function relatedFor(definition: BlogDefinition) {
  const same = posts.filter((post) => post.slug !== definition.slug && post.categoryKey === definition.categoryKey);
  const others = posts.filter((post) => post.slug !== definition.slug && post.categoryKey !== definition.categoryKey);
  return [...same, ...others].slice(0, 3);
}

export default function BlogPostPage({ postSlug }: { postSlug: string }) {
  const reducedMotion = useReducedMotion();
  const definition = posts.find((post) => post.slug === postSlug);
  const shortlist = useMemo(() => definition ? familiesFor(definition) : [], [definition]);

  if (!definition) {
    return (
      <PageLayout>
        <SEOHead title="Guide not found | AI Premium Shop" description="This AI Premium Shop guide is not available." canonical={`${SITE}/blog`} noindex />
        <div id="main-content" className="mx-auto max-w-3xl px-4 py-24 text-center md:px-8">
          <h1 className="text-3xl font-bold text-white">Guide not found</h1>
          <Link href="/blog" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#f4b942]">Browse current guides <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </PageLayout>
    );
  }

  const canonical = `${SITE}/blog/${definition.slug}`;
  const related = relatedFor(definition);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: definition.title,
    description: definition.description,
    dateModified: blogGuides.updatedOn,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "AI Premium Shop", url: SITE },
    publisher: { "@type": "Organization", name: "AI Premium Shop", url: SITE },
  };
  const askUrl = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I read the AIPS guide: ${definition.h1}. Please help me compare current catalog price and access, then confirm availability, provider-controlled limits, delivery ETA and applicable terms before payment. Page: ${canonical}`)}`;

  return (
    <PageLayout>
      <SEOHead title={definition.title} description={definition.description} canonical={canonical} jsonLd={[jsonLd]} />
      <article id="main-content" className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <nav aria-label="breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <Link href="/">Home</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-white">{definition.categoryLabel}</span>
        </nav>

        <motion.header initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10 max-w-4xl">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Verification-first editorial</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-400"><CalendarDays className="h-3.5 w-3.5" /> Updated 14 Aug 2026</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">{definition.h1}</h1>
          <p className="text-base leading-7 text-slate-300 md:text-lg">{definition.intro}</p>
        </motion.header>

        <section className="mb-10 rounded-2xl border border-white/10 bg-[#151b3d] p-6 md:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4b942]">Decision framework</p>
          <h2 className="text-2xl font-bold text-white">What to verify first</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {definition.checks.map((check, index) => <div key={check} className="rounded-xl border border-white/10 bg-[#0a0e27] p-4"><div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#f4b942]/15 text-xs font-bold text-[#f4b942]">{index + 1}</div><p className="text-sm leading-6 text-slate-300">{check}</p></div>)}
          </div>
        </section>

        {shortlist.length > 0 && (
          <section className="mb-12">
            <div className="mb-5 max-w-3xl"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4b942]">Current AIPS catalog</p><h2 className="text-2xl font-bold text-white">Relevant catalog families</h2><p className="mt-2 text-sm leading-6 text-slate-400">These cards use current public AIPS identity, price and access fields only. They are discovery examples, not rankings, endorsements or proof of a provider entitlement.</p></div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {shortlist.map((family, index) => (
                <motion.article key={family.slug} initial={reducedMotion ? false : { opacity: 0, y: 10 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.25, delay: Math.min(index * 0.025, 0.12) }} className="rounded-2xl border border-white/10 bg-[#151b3d] p-5">
                  <div className="mb-4 flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10" style={{ backgroundColor: `${family.first.brandColor || "#f4b942"}16` }}><BrandIcon brand={family.first.brand ?? baseName(family.first.name)} color={family.first.brandColor || "#f4b942"} size={25} /></div><div className="min-w-0"><h3 className="font-bold text-white">{baseName(family.first.name)}</h3><p className="mt-1 text-xs text-slate-500">{CATEGORY_LABELS[family.first.category] ?? "AI tool"}</p></div></div>
                  <p className="font-bold text-[#f4b942]">{family.minPrice ? `From ${formatBDT(family.minPrice)}` : "Check current price"}</p>
                  <p className="mt-1 text-xs text-slate-400">{family.access.join(", ")} · {family.records.length} {family.records.length === 1 ? "plan record" : "plan records"}</p>
                  <Link href={productPath(family.slug)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">Current details <ArrowRight className="h-4 w-4" /></Link>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12 grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-white/10 bg-[#151b3d]/70 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white">Provider facts and AIPS commercial facts are different</h2>
            <div className="mt-4 space-y-3">
              {[
                "AIPS catalog fields can establish the public product identity, published BDT price and stated access model.",
                "Models, credits, quotas, storage, exports, integrations, licensing and other entitlements are controlled by the provider and can change.",
                "Availability and delivery ETA are order-specific. Confirm them together with the exact access model and applicable terms before payment.",
                "For privacy-sensitive work, choose an access arrangement appropriate to the data you will process and verify the provider's current data controls.",
              ].map((point) => <div key={point} className="flex gap-2.5"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" /><p className="text-sm leading-6 text-slate-300">{point}</p></div>)}
            </div>
          </div>
          <aside className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
            <h2 className="text-lg font-bold text-white">Need current order details?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">Send the exact tool or workflow. Ask for the current price, access model, availability, provider-controlled limits, delivery ETA and applicable terms before payment.</p>
            <a href={askUrl} target="_blank" rel="noopener noreferrer" className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Ask AIPS</a>
          </aside>
        </section>

        <section className="border-t border-white/10 pt-8">
          <div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-xl font-bold text-white">Related decision guides</h2><Link href="/blog" className="text-sm font-semibold text-[#f4b942]">All guides</Link></div>
          <div className="grid gap-3 md:grid-cols-3">{related.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-xl border border-white/10 bg-[#151b3d] p-4 transition hover:border-[#f4b942]/30"><p className="text-xs font-semibold text-[#f4b942]">{post.categoryLabel}</p><h3 className="mt-2 font-semibold leading-6 text-white">{post.title}</h3></Link>)}</div>
        </section>
      </article>
    </PageLayout>
  );
}
