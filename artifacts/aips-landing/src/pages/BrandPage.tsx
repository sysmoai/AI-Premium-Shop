import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Info, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { BrandIcon } from "@/components/BrandIcon";
import { ChatGPTMoneyPageV2 } from "@/components/ChatGPTMoneyPageV2";
import { formatBDT } from "@/lib/format";
import { productPath } from "@/lib/productRoutes";
import productsData from "../../data/catalog-pages.json";
import chatgptMoneyData from "../../data/chatgpt-money-page-v2.json";

const SITE = "https://aipremiumshop.com";
const WHATSAPP = "https://wa.me/8801865385348";
const RETIRED = new Set(["replit-bangladesh"]);

type Product = (typeof productsData.products)[number];
const ALL = (productsData.products as Product[]).filter((product) => !RETIRED.has(product.slug));

const CATEGORY_LABELS: Record<string, string> = {
  "ai-assistant": "AI Chat & Assistants", "ai-image": "AI Image & Design", "ai-video": "AI Video",
  "ai-voice-music": "AI Voice & Music", "ai-code": "AI Code & Development", "ai-workspace": "AI Workspace",
  "ai-writing": "AI Writing & SEO", "ai-design": "AI Design & Creative", bundles: "Bundles & Services",
};

function baseName(value: string) { return value.split(/—\s*/)[0].split(/\s+-\s+/)[0].trim(); }
function accessLabel(value: string | null | undefined) {
  if (value === "shared") return "Shared access";
  if (value === "personal") return "Personal access";
  if (value === "team") return "Team access";
  if (value === "bundle") return "Bundle";
  if (value === "setup-service" || value === "setup" || value === "service") return "Setup / service";
  return "Confirm access model";
}
function categoryPath(value: string) { return value === "bundles" ? "/bundles" : `/${value}`; }
function safeTag(value: string) { return value.replaceAll("-", " "); }
function fitTitle(value: string) { return value.length <= 68 ? value : `${value.slice(0, 47).trimEnd()}… | AI Premium Shop`; }
function fitDescription(value: string) { return value.length <= 158 ? value : `${value.slice(0, 157).trimEnd()}…`; }

export default function BrandPage({ brandSlug }: { brandSlug: string }) {
  const reducedMotion = useReducedMotion();
  const products = useMemo(() => {
    if (RETIRED.has(brandSlug)) return [];
    const direct = ALL.filter((product) => product.slug === brandSlug);
    const selected = direct.length ? direct : ALL.filter((product) => product.brandSlug === brandSlug);
    return selected.slice().sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY));
  }, [brandSlug]);

  if (!products.length) {
    return (
      <PageLayout>
        <SEOHead title="Listing Not Available | AI Premium Shop" description="This listing is not part of the current public AI Premium Shop catalog." noindex />
        <div id="main-content" className="mx-auto max-w-4xl px-4 py-24 text-center">
          <Info className="mx-auto mb-4 h-7 w-7 text-[#f4b942]" />
          <h1 className="text-3xl font-bold text-white">Listing not available</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">Browse the current catalog for active AI tools and plans.</p>
          <Link href="/products" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#f4b942] px-5 py-3 font-semibold text-[#0a0e27]">Browse current catalog <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </PageLayout>
    );
  }

  const first = products[0];
  const distinctSlugs = new Set(products.map((product) => product.slug));
  const name = distinctSlugs.size > 1 ? (first.brand ?? baseName(first.name)) : baseName(first.name);
  const accent = first.brandColor || "#f4b942";
  const category = first.category;
  const priced = products.filter((product) => !product.requestPrice && typeof product.price === "number" && product.price > 0);
  const fromPrice = priced.length ? Math.min(...priced.map((product) => Number(product.price))) : null;
  const capabilities = [...new Set(products.flatMap((product) => product.capabilities ?? []))].slice(0, 10);
  const routeEditorial = brandSlug in chatgptMoneyData.routes
    ? chatgptMoneyData.routes[brandSlug as keyof typeof chatgptMoneyData.routes]
    : null;
  const title = routeEditorial?.title ?? fitTitle(`${name} Price in Bangladesh | AI Premium Shop`);
  const description = routeEditorial?.description ?? fitDescription(`${fromPrice ? `${name} AIPS plans currently start from ${formatBDT(fromPrice)}.` : `Check the current AIPS price for ${name}.`} Compare published access options and confirm availability, provider limits, delivery ETA and terms before payment.`);
  const h1 = routeEditorial?.h1 ?? `${name} in Bangladesh`;
  const canonical = `${SITE}/${brandSlug}`;
  const related = ALL.filter((product, index, array) => product.category === category && !distinctSlugs.has(product.slug) && array.findIndex((candidate) => candidate.slug === product.slug) === index).slice(0, 4);

  const schema = {
    "@context": "https://schema.org", "@type": "CollectionPage", name: routeEditorial?.h1 ?? `${name} plans in Bangladesh`, url: canonical,
    description, mainEntity: { "@type": "ItemList", numberOfItems: products.length, itemListElement: products.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.name, url: `${SITE}${productPath(product.slug)}` })) },
  };
  const askUrl = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I want to compare current ${name} options. Please confirm the exact AI Premium Shop price, access model, availability, provider limits, delivery ETA and applicable terms before payment.`)}`;

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={canonical} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div id="main-content">
        <section className="relative overflow-hidden border-b border-white/10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"><div className="absolute -right-24 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: accent }} /></div>
          <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
            <nav aria-label="breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-slate-400"><Link href="/">Home</Link><ChevronRight className="h-3.5 w-3.5" /><Link href={categoryPath(category)}>{CATEGORY_LABELS[category] ?? category}</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-white">{name}</span></nav>
            <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
              <motion.div initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="mb-5 flex items-center gap-3"><div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10" style={{ backgroundColor: `${accent}18` }}><BrandIcon brand={first.brand ?? name} color={accent} size={36} /></div><span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><Sparkles className="h-3.5 w-3.5" /> {routeEditorial?.kicker ?? "Current public catalog"}</span></div>
                <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{h1}</h1>
                <p className="mt-4 text-xl font-semibold" style={{ color: accent }}>{fromPrice ? `Published plans from ${formatBDT(fromPrice)}/month` : "Current price on request"}</p>
                <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">Compare the current AI Premium Shop listings for {name}. This page publishes AI Premium Shop catalog price and access information; provider-controlled models, quotas, credits, storage and feature limits can change independently.</p>
              </motion.div>
              <aside className="rounded-2xl border border-white/10 bg-[#151b3d] p-5"><h2 className="font-bold text-white">Before you pay</h2><div className="mt-4 space-y-3 text-sm text-slate-300">{["Confirm the exact access model.", "Confirm current availability and delivery ETA.", "Check provider-controlled limits for the exact plan.", "Confirm applicable order and support terms."].map((item) => <div key={item} className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /><span>{item}</span></div>)}</div><a href={askUrl} target="_blank" rel="noopener noreferrer" className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Confirm current details</a></aside>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 md:px-8" aria-labelledby="brand-current-plans">
          <div className="mb-6 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">Current options</p><h2 id="brand-current-plans" className="mt-2 text-2xl font-bold text-white md:text-3xl">Compare published plans</h2></div><span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">{products.length} plan record{products.length === 1 ? "" : "s"}</span></div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => {
              const price = product.requestPrice || product.price == null ? "Price on request" : `${formatBDT(product.price)}/month`;
              const wa = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I want ${baseName(product.name)} (${product.tier ?? "current plan"}). ${product.requestPrice || product.price == null ? "Please confirm the current price" : `Published AI Premium Shop price ${formatBDT(product.price)}`}. Please confirm access, availability, provider limits, delivery ETA and applicable terms before payment.`)}`;
              return <motion.article key={product.id} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.15) }} className="rounded-2xl border border-white/10 bg-[#151b3d] p-5"><h3 className="font-bold text-white">{product.tier ?? baseName(product.name)}</h3><p className="mt-2 text-xl font-bold text-[#f4b942]">{price}</p><p className="mt-2 text-sm text-slate-300">{accessLabel(product.accessType)}</p><p className="mt-4 text-xs leading-5 text-slate-500">Availability, provider limits and delivery ETA: confirm before payment.</p><div className="mt-5 flex gap-2"><Link href={productPath(product.slug)} className="flex-1 rounded-xl border border-white/10 px-3 py-2 text-center text-xs font-bold text-white">Details</Link><a href={wa} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-xl bg-[#008236] px-3 py-2 text-center text-xs font-bold text-white">Confirm</a></div></motion.article>;
            })}
          </div>
        </section>

        <ChatGPTMoneyPageV2 brandSlug={brandSlug} products={products} />

        {capabilities.length > 0 && <section className="border-y border-white/10 bg-[#0d1230] py-10"><div className="mx-auto max-w-6xl px-4 md:px-8"><h2 className="text-xl font-bold text-white">Catalog discovery tags</h2><div className="mt-4 flex flex-wrap gap-2">{capabilities.map((capability) => <span key={capability} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm capitalize text-slate-300">{safeTag(capability)}</span>)}</div><p className="mt-4 text-xs leading-5 text-slate-500">Discovery tags help visitors narrow the catalog. They are not a guarantee that every provider feature is included in every plan.</p></div></section>}

        <section className="mx-auto grid max-w-6xl gap-5 px-4 py-12 md:px-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6"><h2 className="text-xl font-bold text-white">How to compare this brand safely</h2><div className="mt-4 space-y-3">{["Start with the access model your work requires.", "Use the published AI Premium Shop price as the local buying reference.", "Verify provider-controlled features and limits for the exact plan.", "Confirm current delivery and applicable terms before payment."].map((item) => <div key={item} className="flex gap-2.5 text-sm text-slate-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /><span>{item}</span></div>)}</div></div>
          <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6"><h2 className="text-lg font-bold text-white">Compare the category</h2><p className="mt-2 text-sm leading-6 text-slate-300">Brand choice should follow the workflow, access requirement and current provider terms—not an unsupported universal ranking.</p><Link href={categoryPath(category)} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#f4b942]">Browse {CATEGORY_LABELS[category] ?? category} <ArrowRight className="h-4 w-4" /></Link></div>
        </section>

        {related.length > 0 && <section className="mx-auto max-w-6xl px-4 pb-14 md:px-8"><h2 className="mb-5 text-xl font-bold text-white">Related current catalog routes</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{related.map((product) => <Link key={product.slug} href={productPath(product.slug)} className="rounded-xl border border-white/10 bg-[#151b3d] p-4"><div className="font-semibold text-white">{baseName(product.name)}</div><div className="mt-2 text-xs text-slate-400">{product.requestPrice || product.price == null ? "Check current price" : `From ${formatBDT(product.price)}`}</div></Link>)}</div></section>}
      </div>
    </PageLayout>
  );
}
