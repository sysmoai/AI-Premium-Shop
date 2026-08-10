import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ExternalLink, MessageCircle } from "lucide-react";

const SITE = "https://aipremiumshop.com";
const WHATSAPP = "https://wa.me/8801865385348";

type PlanRecord = {
  productSlug: string;
  productName: string;
  brand: string | null;
  brandSlug: string | null;
  brandColor: string | null;
  category: string;
  planKey: string;
  planName: string;
  canonicalPath: string;
  parentCanonicalPath: string;
  indexPolicy: "INDEX_SELF" | "CANONICAL_PARENT" | "NOINDEX_REVIEW";
  publicationMode: string;
  requestPrice: boolean;
  priceBDT: number | null;
  officialUSD: number | null;
  billingCycle: string | null;
  accessType: string | null;
  features: string[];
  whatsIncluded: string[];
  limitations: string[];
  bestFor: string | null;
  deliverySLA: string | null;
  badge: string | null;
  source: string;
};

type PlanCatalog = {
  schema_version: number;
  publication?: { mode?: string; publication_allowed?: boolean; quarantine?: boolean };
  plans: PlanRecord[];
};

const money = (value: number) => `৳${value.toLocaleString("en-BD")}`;

function setMeta(name: string, content: string) {
  let node = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.name = name;
    document.head.appendChild(node);
  }
  node.content = content;
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

function Loading() {
  return (
    <main className="min-h-screen bg-[#070b1d] text-white grid place-items-center px-5">
      <div className="text-center">
        <div className="h-8 w-8 rounded-full border-2 border-white/20 border-t-[#f4b942] animate-spin mx-auto mb-4" />
        <p className="text-white/70">Loading plan details…</p>
      </div>
    </main>
  );
}

function Missing({ productSlug }: { productSlug: string }) {
  return (
    <main className="min-h-screen bg-[#070b1d] text-white px-5 py-20">
      <div className="max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/[0.04] p-7">
        <p className="text-[#f4b942] text-sm font-bold uppercase tracking-wider">Plan unavailable</p>
        <h1 className="text-3xl font-bold mt-2">This plan page is not currently published.</h1>
        <p className="text-white/70 mt-4 leading-7">The product itself may still be available. Use the product page for the current public information.</p>
        <a href={`/product/${encodeURIComponent(productSlug)}`} className="inline-flex items-center gap-2 mt-6 text-[#f4b942] font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to product
        </a>
      </div>
    </main>
  );
}

export default function PlanPage({ productSlug, planKey }: { productSlug: string; planKey: string }) {
  const [catalog, setCatalog] = useState<PlanCatalog | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/generated/plan-catalog.json", { signal: controller.signal, cache: "no-cache" })
      .then((response) => {
        if (!response.ok) throw new Error(`Plan catalog returned ${response.status}`);
        return response.json() as Promise<PlanCatalog>;
      })
      .then(setCatalog)
      .catch((error) => {
        if (error?.name !== "AbortError") setFailed(true);
      });
    return () => controller.abort();
  }, []);

  const plan = useMemo(
    () => catalog?.plans.find((item) => item.productSlug === productSlug && item.planKey === planKey) ?? null,
    [catalog, productSlug, planKey],
  );

  useEffect(() => {
    if (!plan) return;
    document.title = `${plan.productName} ${plan.planName} — Plan Details | AI Premium Shop`;
    const canonical = plan.indexPolicy === "INDEX_SELF" ? `${SITE}${plan.canonicalPath}` : `${SITE}${plan.parentCanonicalPath}`;
    setCanonical(canonical);
    setMeta("robots", plan.indexPolicy === "INDEX_SELF" ? "index,follow" : "noindex,follow");
    setMeta(
      "description",
      `${plan.productName} ${plan.planName} plan details for Bangladesh. Review the current public price or request the current price from AI Premium Shop.`,
    );
  }, [plan]);

  if (failed) return <Missing productSlug={productSlug} />;
  if (!catalog) return <Loading />;
  if (!plan) return <Missing productSlug={productSlug} />;

  const publicCommerce = catalog.publication?.publication_allowed !== false && catalog.publication?.quarantine !== true;
  const sellable = publicCommerce && !plan.requestPrice && typeof plan.priceBDT === "number";
  const contactText = encodeURIComponent(
    `Hi, I am asking about ${plan.productName} — ${plan.planName}. Page: ${SITE}${plan.canonicalPath}`,
  );
  const featureList = [...new Set([...(plan.whatsIncluded ?? []), ...(plan.features ?? [])])].filter(Boolean).slice(0, 12);

  return (
    <div className="min-h-screen bg-[#070b1d] text-white">
      <header className="border-b border-white/10 bg-[#0a0e27]/95">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <a href="/" className="font-extrabold tracking-tight">AI Premium Shop</a>
          <a href={plan.parentCanonicalPath} className="text-sm text-white/70 hover:text-white inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Product page
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8 md:py-12">
        <nav aria-label="Breadcrumb" className="text-sm text-white/55 mb-7 flex flex-wrap gap-2">
          <a href="/" className="hover:text-white">Home</a><span>/</span>
          <a href="/products" className="hover:text-white">Products</a><span>/</span>
          <a href={plan.parentCanonicalPath} className="hover:text-white">{plan.productName}</a><span>/</span>
          <span className="text-white/85">{plan.planName}</span>
        </nav>

        <section className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-8 items-start">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65">
              Dedicated plan view · {plan.brand ?? plan.productName}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 leading-[1.03]">
              {plan.productName}
              <span className="block text-[#f4b942] mt-2">{plan.planName}</span>
            </h1>
            <p className="mt-5 text-lg text-white/65 leading-8 max-w-3xl">
              Plan-specific information separated from the main product page so pricing, access details, media and future verification can be managed independently.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <div className="text-xs uppercase tracking-wider text-white/45">Billing</div>
                <div className="font-bold mt-2 capitalize">{plan.billingCycle || "Check current terms"}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <div className="text-xs uppercase tracking-wider text-white/45">Access model</div>
                <div className="font-bold mt-2 capitalize">{plan.accessType || "Verify before purchase"}</div>
              </div>
            </div>

            {featureList.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold">What this plan includes</h2>
                <div className="grid sm:grid-cols-2 gap-3 mt-4">
                  {featureList.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4">
                      <Check className="w-5 h-5 text-[#f4b942] shrink-0 mt-0.5" />
                      <span className="text-white/80 leading-6">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {plan.bestFor && (
              <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="text-xl font-bold">Best fit</h2>
                <p className="text-white/70 mt-2 leading-7">{plan.bestFor}</p>
              </section>
            )}

            {plan.limitations?.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold">Plan limitations</h2>
                <ul className="mt-3 space-y-2 text-white/70 list-disc pl-5">
                  {plan.limitations.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            )}

            <section className="mt-10 border-t border-white/10 pt-8">
              <h2 className="text-xl font-bold">Product context</h2>
              <p className="text-white/65 mt-2 leading-7">
                This page is a plan-specific view. The main product page remains the canonical source while plan-level SEO, provider verification and commercial records are being progressively normalized.
              </p>
              <a href={plan.parentCanonicalPath} className="inline-flex items-center gap-2 mt-4 text-[#f4b942] font-semibold">
                View {plan.productName} product page <ExternalLink className="w-4 h-4" />
              </a>
            </section>
          </div>

          <aside className="lg:sticky lg:top-6 rounded-3xl border border-white/10 bg-[#0f1631] p-6 shadow-2xl shadow-black/20">
            <div className="text-sm text-white/55">Current public price</div>
            {sellable ? (
              <div className="text-4xl font-extrabold text-[#f4b942] mt-2">{money(plan.priceBDT!)}</div>
            ) : (
              <div className="text-2xl font-extrabold text-[#f4b942] mt-2">Request current price</div>
            )}
            {sellable && plan.billingCycle && <div className="text-sm text-white/50 mt-1">per {plan.billingCycle}</div>}

            <div className="mt-6 rounded-xl bg-black/20 border border-white/10 p-4 text-sm text-white/65 leading-6">
              {sellable
                ? "This amount comes from the current public catalog projection. Confirm plan suitability and current availability before payment."
                : "A numeric price is intentionally not shown when the current public projection does not authorize one."}
            </div>

            <a
              href={`${WHATSAPP}?text=${contactText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full min-h-12 rounded-xl bg-[#008236] hover:bg-[#06752f] font-bold inline-flex items-center justify-center gap-2 px-4 transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> {sellable ? "Ask about this plan" : "Request current price"}
            </a>

            <a
              href={plan.parentCanonicalPath}
              className="mt-3 w-full min-h-12 rounded-xl border border-white/10 hover:bg-white/[0.04] font-semibold inline-flex items-center justify-center gap-2 px-4 transition-colors"
            >
              Compare product plans
            </a>

            <dl className="mt-6 border-t border-white/10 pt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-white/45">Index state</dt><dd className="text-white/75">Canonical to product</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-white/45">Publication</dt><dd className="text-white/75">{plan.publicationMode}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-white/45">Category</dt><dd className="text-white/75 text-right">{plan.category}</dd></div>
            </dl>
          </aside>
        </section>
      </main>
    </div>
  );
}
