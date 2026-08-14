import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BrandIcon } from "@/components/BrandIcon";
import { formatBDT } from "@/lib/format";
import { productPath } from "@/lib/productRoutes";
import productsData from "../../data/catalog-pages.json";

const SITE = "https://aipremiumshop.com";
const WHATSAPP = "https://wa.me/8801865385348";
const RETIRED_PRODUCT_SLUGS = new Set(["replit-bangladesh"]);

type ProductRecord = (typeof productsData.products)[number];

interface BudgetDefinition {
  maxPrice: number;
  label: string;
  next?: { label: string; href: string };
}

const BUDGETS: Record<string, BudgetDefinition> = {
  "ai-under-500": { maxPrice: 500, label: "BDT 500", next: { label: "See tools under BDT 1,000", href: "/ai-under-1000" } },
  "ai-under-1000": { maxPrice: 1000, label: "BDT 1,000", next: { label: "See tools under BDT 3,000", href: "/ai-under-3000" } },
  "ai-under-3000": { maxPrice: 3000, label: "BDT 3,000" },
};

const catalog = (productsData.products as ProductRecord[]).filter(
  (product) =>
    !RETIRED_PRODUCT_SLUGS.has(product.slug) &&
    !product.requestPrice &&
    typeof product.price === "number" &&
    product.price > 0,
);

function accessLabel(value: string | null | undefined): string {
  if (value === "shared") return "Shared";
  if (value === "personal") return "Personal";
  if (value === "team") return "Team";
  if (value === "bundle") return "Bundle";
  if (value === "setup-service" || value === "setup" || value === "service") return "Setup / service";
  return "Confirm";
}

export default function BudgetPage({ budgetKey }: { budgetKey: string }) {
  const reducedMotion = useReducedMotion();
  const definition = BUDGETS[budgetKey];

  const products = useMemo(() => {
    if (!definition) return [];
    return catalog
      .filter((product) => Number(product.price) <= definition.maxPrice)
      .sort((a, b) => Number(a.price) - Number(b.price) || a.name.localeCompare(b.name));
  }, [definition]);

  if (!definition) {
    return (
      <PageLayout>
        <SEOHead title="Budget Page Not Found | AI Premium Shop" description="This budget comparison is not available." noindex />
        <div id="main-content" className="mx-auto max-w-4xl px-4 py-24 text-center">
          <h1 className="mb-4 text-3xl font-bold text-white">Budget comparison not found</h1>
          <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl bg-[#f4b942] px-5 py-3 font-semibold text-[#0a0e27]">View current pricing <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </PageLayout>
    );
  }

  const distinct = new Set(products.map((product) => product.slug)).size;
  const minPrice = products[0]?.price ?? null;
  const title = `AI Tools Under ${definition.label} in Bangladesh | AIPS`;
  const description = `Browse current fixed-price AIPS plans at or below ${definition.label}. Compare published BDT price and access model, then confirm availability, provider limits, delivery ETA and terms before payment.`;
  const canonical = `${SITE}/${budgetKey}`;

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={canonical} />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Pricing", href: "/pricing" }, { name: `Under ${definition.label}` }]} />

      <div id="main-content" className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <motion.header initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Current budget filter</div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">AI Tools Under {definition.label}</h1>
          <p className="text-base leading-relaxed text-slate-300 md:text-lg">This page filters the current fixed-price public AIPS catalog by one rule: published price at or below {definition.label}. It uses no inferred savings or rankings and makes no universal delivery or warranty promise. Confirm current availability, provider limits, delivery ETA and applicable terms before payment.</p>
        </motion.header>

        <section className="mb-9 grid gap-4 sm:grid-cols-3" aria-label="Budget catalog summary">
          <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-5"><div className="text-2xl font-bold text-white">{products.length}</div><div className="mt-1 text-xs text-slate-400">fixed-price plan records</div></div>
          <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-5"><div className="text-2xl font-bold text-white">{distinct}</div><div className="mt-1 text-xs text-slate-400">tool families represented</div></div>
          <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-5"><div className="text-2xl font-bold text-[#f4b942]">{minPrice ? formatBDT(Number(minPrice)) : "—"}</div><div className="mt-1 text-xs text-slate-400">lowest current published price</div></div>
        </section>

        <section className="mb-10" aria-labelledby="budget-current-plans">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4b942]">Current catalog</p><h2 id="budget-current-plans" className="text-2xl font-bold text-white">Plans within this threshold</h2></div>
            {definition.next && <Link href={definition.next.href} className="hidden items-center gap-1.5 text-sm font-semibold text-[#f4b942] sm:inline-flex">{definition.next.label} <ArrowRight className="h-4 w-4" /></Link>}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {products.map((product, index) => {
              const wa = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I want ${product.name}. Published AIPS price: ${formatBDT(Number(product.price))}. Please confirm the current access model, availability, provider limits, delivery ETA and applicable terms before payment.`)}`;
              return (
                <motion.article key={product.id} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.14) }} whileHover={reducedMotion ? undefined : { y: -3 }} className="rounded-2xl border border-white/10 bg-[#151b3d] p-5">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10" style={{ backgroundColor: `${product.brandColor || "#f4b942"}16` }}><BrandIcon brand={product.brand ?? product.name} color={product.brandColor || "#f4b942"} size={26} /></div>
                    <div className="min-w-0"><h3 className="font-bold leading-snug text-white">{product.name}</h3><div className="mt-1 text-xs text-slate-400">{accessLabel(product.accessType)}</div></div>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-slate-300">Use the product page to confirm the exact access arrangement, current availability, provider limits and delivery details before purchase.</p>
                  <div className="flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                    <div><div className="text-[11px] text-slate-400">Published AIPS price</div><div className="font-bold text-[#f4b942]">{formatBDT(Number(product.price))}</div></div>
                    <div className="flex gap-2"><Link href={productPath(product.slug)} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white">Details</Link><a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#008236] px-3 py-2 text-xs font-semibold text-white"><MessageCircle className="h-3.5 w-3.5" /> Confirm</a></div>
                  </div>
                </motion.article>
              );
            })}
          </div>
          {products.length === 0 && <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-8 text-center text-slate-300">No current fixed-price plans are published within this threshold.</div>}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-white/10 bg-[#151b3d]/70 p-6"><h2 className="mb-4 text-xl font-bold text-white">Budget is only one filter</h2><div className="space-y-3">{["Check whether the plan uses shared, personal, team, bundle or service access.", "Check provider-controlled credits, quotas and feature limits for the exact plan.", "Confirm delivery ETA and applicable order terms before payment."].map((point) => <div key={point} className="flex gap-2.5"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" /><p className="text-sm text-slate-300">{point}</p></div>)}</div></div>
          <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6"><h2 className="mb-3 text-lg font-bold text-white">Need a workflow-based choice?</h2><p className="mb-4 text-sm leading-relaxed text-slate-300">A cheaper tool is not automatically a better fit. Start with the work you need to do and your access/privacy requirements.</p><Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f4b942]">Browse decision guides <ArrowRight className="h-4 w-4" /></Link></div>
        </section>
      </div>
    </PageLayout>
  );
}
