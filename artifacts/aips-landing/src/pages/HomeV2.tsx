import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle, Search, ShieldCheck, Sparkles } from "lucide-react";
import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import { SEOHead } from "@/components/SEOHead";
import { HomepageHeroMedia } from "@/components/homepage/HomepageHeroMedia";
import { HomepageMediaRail } from "@/components/homepage/HomepageMediaRail";
import { HOMEPAGE_V2 } from "@/generated/homepageV2";
import type { HomepageRecommendation, HomepageRecommendationVariant } from "@/lib/homepageV2";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

type AccessPreference = "any" | "personal" | "shared";
type BudgetPreference = "any" | "under-1000" | "1001-3000" | "3001-plus";

const ACCESS_FILTERS: Array<{ id: AccessPreference; label: string }> = [
  { id: "any", label: "Any access" },
  { id: "personal", label: "Personal" },
  { id: "shared", label: "Shared" },
];

const BUDGET_FILTERS: Array<{ id: BudgetPreference; label: string }> = [
  { id: "any", label: "Any budget" },
  { id: "under-1000", label: "Up to BDT 1,000" },
  { id: "1001-3000", label: "BDT 1,001–3,000" },
  { id: "3001-plus", label: "BDT 3,001+" },
];

function formatBDT(value: number | null) {
  if (value == null) return null;
  return `BDT ${value.toLocaleString("en-BD")}`;
}

function accessLabel(value: string | null) {
  if (!value) return "Access details on product page";
  const normalized = value.toLowerCase();
  if (normalized.includes("personal")) return "Personal";
  if (normalized.includes("shared")) return "Shared";
  return value;
}

function matchesAccess(variant: HomepageRecommendationVariant, preference: AccessPreference) {
  if (preference === "any") return true;
  const normalized = String(variant.accessType ?? "").toLowerCase();
  return normalized.includes(preference);
}

function matchesBudget(variant: HomepageRecommendationVariant, preference: BudgetPreference) {
  if (preference === "any") return true;
  if (variant.price == null) return false;
  if (preference === "under-1000") return variant.price <= 1000;
  if (preference === "1001-3000") return variant.price > 1000 && variant.price <= 3000;
  return variant.price > 3000;
}

function lowestMatchingVariant(
  product: HomepageRecommendation,
  accessPreference: AccessPreference,
  budgetPreference: BudgetPreference,
) {
  const variants = product.variants
    .filter((variant) => matchesAccess(variant, accessPreference) && matchesBudget(variant, budgetPreference))
    .sort((a, b) => {
      const ap = a.price ?? Number.POSITIVE_INFINITY;
      const bp = b.price ?? Number.POSITIVE_INFINITY;
      return ap - bp;
    });
  return variants[0] ?? null;
}

export default function HomeV2() {
  const data = HOMEPAGE_V2;
  const commerceEnabled = data.publication.publicationAllowed && !data.publication.quarantine;
  const [selectedIntentId, setSelectedIntentId] = useState("");
  const [accessPreference, setAccessPreference] = useState<AccessPreference>("any");
  const [budgetPreference, setBudgetPreference] = useState<BudgetPreference>("any");

  const selectedIntent = useMemo(
    () => data.finder.find((intent) => intent.id === selectedIntentId) ?? null,
    [data.finder, selectedIntentId],
  );

  const finderMatches = useMemo(() => {
    if (!selectedIntent) return [];

    return selectedIntent.recommendationSlugs
      .map((slug) => data.recommendations.find((product) => product.slug === slug) ?? null)
      .filter((product): product is HomepageRecommendation => product !== null)
      .map((product) => ({
        product,
        variant: lowestMatchingVariant(product, accessPreference, budgetPreference),
      }))
      .filter((match): match is { product: HomepageRecommendation; variant: HomepageRecommendationVariant } => match.variant !== null);
  }, [accessPreference, budgetPreference, data.recommendations, selectedIntent]);

  return (
    <div className="min-h-screen bg-[#07101f] text-white" data-testid="homepage-v2-canary">
      <SEOHead
        title="Homepage V2 Preview — AI Premium Shop"
        description="Private noindex preview of the next AI Premium Shop homepage experience."
        canonical="https://aipremiumshop.com/"
        noindex
      />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07101f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <a href="/" aria-label="AI Premium Shop home">
            <PrimaryBrandLogo size="small" layout="horizontal" decorative />
          </a>
          <div className="flex items-center gap-2">
            <a
              href="/products"
              className="hidden rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 sm:inline-flex"
            >
              Browse tools
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#19a55a] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#148c4c]"
            >
              <MessageCircle className="h-4 w-4" />
              Ask AIPS
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(244,185,66,0.12),transparent_32%),radial-gradient(circle_at_25%_80%,rgba(99,102,241,0.11),transparent_34%)]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f4b942]/30 bg-[#f4b942]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f4b942]">
                <Sparkles className="h-3.5 w-3.5" />
                Built for AI buyers in Bangladesh
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                Find the right AI tool. Pay locally. Know exactly what access you get.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Compare AI tools by the work you need to do, understand Personal vs Shared access before paying, and move from research to the right product without sorting through the whole catalog yourself.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#finder"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f4b942] px-6 py-3 font-bold text-[#07101f] transition hover:bg-[#ffc95f]"
                >
                  Find my AI tool
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/products"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-white/30"
                >
                  <Search className="h-4 w-4" />
                  Browse all tools
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 text-xs text-slate-300">
                {data.payments.map((payment) => (
                  <span key={payment.id} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                    {payment.label} payment
                  </span>
                ))}
                {data.catalog.productFamilies > 0 && (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                    {data.catalog.productFamilies} public AI tool families
                  </span>
                )}
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                  Access type shown before purchase
                </span>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 sm:p-7">
              <HomepageHeroMedia asset={data.media.hero} />
            </div>
          </div>
        </section>

        <section id="finder" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f4b942]">Start with your job</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">What do you want AI to help you do?</h2>
            <p className="mt-4 text-slate-300">Choose a real job-to-be-done first. We narrow the catalog before asking you to compare products or prices.</p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.finder.map((intent) => {
              const selected = intent.id === selectedIntentId;
              return (
                <button
                  key={intent.id}
                  type="button"
                  data-testid={`finder-intent-${intent.id}`}
                  aria-pressed={selected}
                  onClick={() => setSelectedIntentId(intent.id)}
                  className={`group rounded-2xl border p-6 text-left transition hover:-translate-y-0.5 ${
                    selected
                      ? "border-[#f4b942]/55 bg-[#f4b942]/10 shadow-lg shadow-[#f4b942]/5"
                      : "border-white/10 bg-white/[0.025] hover:border-[#f4b942]/35 hover:bg-white/[0.04]"
                  }`}
                >
                  <h3 className="text-lg font-semibold text-white">{intent.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{intent.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f4b942]">
                    {selected ? "Selected" : "Choose this goal"} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </button>
              );
            })}
          </div>

          {selectedIntent && (
            <div className="mt-8 rounded-3xl border border-white/10 bg-[#0a1427] p-5 sm:p-7" data-testid="finder-panel">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f4b942]">Your goal</p>
                  <h3 className="mt-2 text-2xl font-semibold">{selectedIntent.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Now narrow by the commercial facts that materially change which plan fits.</p>
                </div>
                <a href={selectedIntent.href} className="inline-flex items-center gap-2 text-sm font-semibold text-[#f4b942]">
                  Open full guide <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {commerceEnabled && (
                <div className="mt-6 grid gap-5 border-t border-white/10 pt-6 lg:grid-cols-2">
                  <fieldset>
                    <legend className="text-sm font-semibold text-white">Access preference</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {ACCESS_FILTERS.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          data-testid={`finder-access-${option.id}`}
                          aria-pressed={accessPreference === option.id}
                          onClick={() => setAccessPreference(option.id)}
                          className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                            accessPreference === option.id
                              ? "border-[#f4b942]/60 bg-[#f4b942]/10 text-[#f4b942]"
                              : "border-white/10 text-slate-300 hover:border-white/25"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-semibold text-white">Monthly budget preference</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {BUDGET_FILTERS.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          data-testid={`finder-budget-${option.id}`}
                          aria-pressed={budgetPreference === option.id}
                          onClick={() => setBudgetPreference(option.id)}
                          className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                            budgetPreference === option.id
                              ? "border-[#f4b942]/60 bg-[#f4b942]/10 text-[#f4b942]"
                              : "border-white/10 text-slate-300 hover:border-white/25"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              <div className="mt-7" data-testid="finder-results" aria-live="polite">
                {finderMatches.length ? (
                  <div className="grid gap-4 lg:grid-cols-3">
                    {finderMatches.map(({ product, variant }) => (
                      <article
                        key={`${product.slug}-${variant.tier ?? variant.name}`}
                        data-testid={`finder-result-${product.slug}`}
                        className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                      >
                        <p className="text-xs uppercase tracking-wide text-slate-400">{product.brand}</p>
                        <h4 className="mt-1 font-semibold text-white">{variant.name}</h4>
                        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                          <span className="rounded-full border border-white/10 px-2.5 py-1">{accessLabel(variant.accessType)}</span>
                          {variant.tier && <span className="rounded-full border border-white/10 px-2.5 py-1">{variant.tier}</span>}
                        </div>
                        <p className="mt-5 text-xs text-slate-400">Best matching public variant</p>
                        <p className="mt-1 text-lg font-bold text-[#f4b942]">
                          {variant.requestPrice ? "Check current price" : formatBDT(variant.price)}
                        </p>
                        <a href={product.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#f4b942]">
                          Compare plans <ArrowRight className="h-4 w-4" />
                        </a>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
                    <p className="font-semibold text-white">No governed recommendation matches all selected filters.</p>
                    <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-300">Change the access/budget filters or open the full guide. The finder will not invent a plan just to fill this space.</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setAccessPreference("any");
                          setBudgetPreference("any");
                        }}
                        className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Clear filters
                      </button>
                      <a href={selectedIntent.href} className="inline-flex items-center gap-1.5 rounded-lg bg-[#f4b942] px-4 py-2 text-sm font-bold text-[#07101f]">
                        Open guide <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="border-y border-white/10 bg-[#0a1427]">
          <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f4b942]">Fast path</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Popular starting points</h2>
                <p className="mt-4 text-slate-300">Only data from the governed public projection enters these cards.</p>
              </div>
              <a href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#f4b942]">
                View full catalog <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.recommendations.slice(0, 6).map((product) => {
                const variant = lowestMatchingVariant(product, "any", "any");
                if (!variant) return null;
                return (
                  <article key={product.slug} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">{product.brand}</p>
                        <h3 className="mt-1 font-semibold text-white">{variant.name}</h3>
                      </div>
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                        {accessLabel(variant.accessType)}
                      </span>
                    </div>
                    <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                      <div>
                        <p className="text-xs text-slate-400">Current public state</p>
                        <p className="mt-1 text-lg font-bold text-[#f4b942]">
                          {variant.requestPrice ? "Check current price" : formatBDT(variant.price)}
                        </p>
                      </div>
                      <a href={product.href} className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-[#f4b942]">
                        Details <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4b942]/10 text-[#f4b942]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight">Understand the access model before you pay</h2>
              <p className="mt-4 leading-7 text-slate-300">Price is not enough. Homepage V2 makes the account/access arrangement a first-class buying fact.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {data.accessModels.map((model) => (
                <div key={model.id} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <h3 className="font-semibold text-white">{model.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{model.description}</p>
                  {model.caution && (
                    <p className="mt-4 border-l-2 border-[#f4b942]/50 pl-3 text-xs leading-5 text-slate-400">{model.caution}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <HomepageMediaRail assets={data.media.demos} />

        <section className="border-y border-white/10 bg-[#0a1427]">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
            <div className="grid gap-4 md:grid-cols-3">
              {data.trustFacts.map((fact) => (
                <div key={fact.id} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <CheckCircle2 className="h-5 w-5 text-[#f4b942]" />
                  <p className="mt-4 text-xs uppercase tracking-wide text-slate-400">{fact.label}</p>
                  <p className="mt-1 text-xl font-semibold text-white">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-20 text-center md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f4b942]">Canary status</p>
          <h2 className="mt-3 text-3xl font-semibold">The guided finder and governed media slots are now live in preview.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            This route remains deliberately noindex and isolated from the production homepage. Approved hero and demonstration assets can now be added through the media registry without changing the page component.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#finder" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f4b942] px-6 py-3 font-bold text-[#07101f]">
              Use the guided finder <ArrowRight className="h-4 w-4" />
            </a>
            {commerceEnabled && (
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-white">
                <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
              </a>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
