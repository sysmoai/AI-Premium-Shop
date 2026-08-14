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
  (product) => !RETIRED.has(product.slug) && !product.requestPrice && typeof product.price === "number" && product.price > 0,
);

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

export default function BudgetPageTruthSafe({ budgetKey }: { budgetKey: string }) {
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
        <main className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Budget comparison not found</h1>
          <Link href="/pricing" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }}>View current pricing <ArrowRight className="w-4 h-4" /></Link>
        </main>
      </PageLayout>
    );
  }

  const distinct = new Set(products.map((product) => product.slug)).size;
  const minPrice = products[0]?.price ?? null;
  const title = `AI Tools Under ${definition.label} in Bangladesh | AIPS`;
  const description = `Browse ${products.length} current fixed-price AIPS plan records at or below ${definition.label}, across ${distinct} tool families. Compare BDT price and access model, then confirm availability, delivery ETA and terms.`;
  const canonical = `${SITE}/${budgetKey}`;

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical={canonical} />
      <main id="main-content" className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs mb-8" style={{ color: "#9ca3af" }}><Link href="/" className="hover:text-white">Home</Link><ChevronRight className="w-3.5 h-3.5" /><Link href="/pricing" className="hover:text-white">Pricing</Link><ChevronRight className="w-3.5 h-3.5" /><span className="text-white">Under {definition.label}</span></nav>

        <motion.header initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-4xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold mb-4" style={{ color: "#f4b942", backgroundColor: "rgba(244,185,66,0.08)" }}><ShieldCheck className="w-3.5 h-3.5" /> Live budget filter</div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">AI Tools Under {definition.label}</h1>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#c9ceda" }}>This page is generated from the current fixed-price public AIPS catalog. It does not calculate unofficial discounts, provider savings or a “best value” ranking. Confirm current availability, provider limits, delivery ETA and applicable terms before payment.</p>
        </motion.header>

        <section className="grid sm:grid-cols-3 gap-4 mb-9">
          <div className="rounded-2xl border border-white/10 p-5" style={{ backgroundColor: "#151b3d" }}><div className="text-2xl font-bold text-white">{products.length}</div><div className="text-xs mt-1" style={{ color: "#9ca3af" }}>fixed-price plan records</div></div>
          <div className="rounded-2xl border border-white/10 p-5" style={{ backgroundColor: "#151b3d" }}><div className="text-2xl font-bold text-white">{distinct}</div><div className="text-xs mt-1" style={{ color: "#9ca3af" }}>tool families represented</div></div>
          <div className="rounded-2xl border border-white/10 p-5" style={{ backgroundColor: "#151b3d" }}><div className="text-2xl font-bold" style={{ color: "#f4b942" }}>{minPrice ? formatBDT(Number(minPrice)) : "—"}</div><div className="text-xs mt-1" style={{ color: "#9ca3af" }}>lowest current published price</div></div>
        </section>

        <section className="mb-10">
          <div className="flex items-end justify-between gap-4 mb-5"><div><p className="text-xs uppercase tracking-[0.18em] font-semibold mb-2" style={{ color: "#f4b942" }}>Current catalog</p><h2 className="text-2xl font-bold text-white">Plans within this threshold</h2></div>{definition.next && <Link href={definition.next.href} className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#f4b942" }}>{definition.next.label} <ArrowRight className="w-4 h-4" /></Link>}</div>
          <div className="grid md:grid-cols-2 gap-4">
            {products.map((product, index) => {
              const label = baseName(product.name);
              const wa = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I want ${product.name}. Published AIPS price: ${formatBDT(Number(product.price))}. Please confirm access model, current availability, provider limits, delivery ETA and applicable terms before payment.`)}`;
              return (
                <motion.article key={product.id} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.14) }} whileHover={reducedMotion ? undefined : { y: -3 }} className="rounded-2xl border border-white/10 p-5" style={{ backgroundColor: "#151b3d" }}>
                  <div className="flex items-start gap-3 mb-4"><div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${product.brandColor || "#f4b942"}16` }}><BrandIcon brand={product.brand ?? label} color={product.brandColor || "#f4b942"} size={26} /></div><div className="min-w-0"><h3 className="font-bold text-white leading-snug">{product.name}</h3><div className="text-xs mt-1" style={{ color: "#9ca3af" }}>{accessLabel(product.accessType)}</div></div></div>
                  {product.description && <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: "#c9ceda" }}>{product.description}</p>}
                  <div className="flex items-end justify-between gap-3 border-t border-white/10 pt-4"><div><div className="text-[11px]" style={{ color: "#9ca3af" }}>Published AIPS price</div><div className="font-bold" style={{ color: "#f4b942" }}>{formatBDT(Number(product.price))}</div></div><div className="flex gap-2"><Link href={productPath(product.slug)} className="px-3 py-2 rounded-lg border border-white/10 text-xs font-semibold text-white">Details</Link><a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold" style={{ backgroundColor: "#008236", color: "#fff" }}><MessageCircle className="w-3.5 h-3.5" /> Confirm</a></div></div>
                </motion.article>
              );
            })}
          </div>
          {products.length === 0 && <div className="rounded-2xl border border-white/10 p-8 text-center" style={{ color: "#c9ceda", backgroundColor: "#151b3d" }}>No current fixed-price plans are published within this threshold.</div>}
        </section>

        <section className="grid lg:grid-cols-[1fr_320px] gap-5">
          <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "rgba(21,27,61,0.65)" }}><h2 className="text-xl font-bold text-white mb-4">Budget is only one filter</h2><div className="space-y-3">{["Check whether the plan uses shared, personal, team, bundle or service access.", "Check provider-controlled credits, quotas and feature limits for the exact plan.", "Confirm delivery ETA and applicable order terms before payment."].map((point) => <div key={point} className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#10b981" }} /><p className="text-sm" style={{ color: "#c9ceda" }}>{point}</p></div>)}</div></div>
          <div className="rounded-2xl border border-white/10 p-6" style={{ backgroundColor: "#151b3d" }}><h2 className="text-lg font-bold text-white mb-3">Need a workflow-based choice?</h2><p className="text-sm leading-relaxed mb-4" style={{ color: "#c9ceda" }}>A cheaper tool is not automatically a better fit. Tell us the work you need to do and your access/privacy requirements.</p><Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#f4b942" }}>Browse decision guides <ArrowRight className="w-4 h-4" /></Link></div>
        </section>
      </main>
    </PageLayout>
  );
}
