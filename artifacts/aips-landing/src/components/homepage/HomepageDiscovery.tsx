import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import type {
  HomepageRecommendation,
  HomepageRecommendationVariant,
  PublicHomepageView,
} from "@/lib/homepageV2";
import { trackHomepageEvent } from "@/lib/homepageAnalytics";

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
  return String(variant.accessType ?? "").toLowerCase().includes(preference);
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
  return product.variants
    .filter((variant) => matchesAccess(variant, accessPreference) && matchesBudget(variant, budgetPreference))
    .sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY))[0] ?? null;
}

interface HomepageDiscoveryProps {
  data: PublicHomepageView;
  commerceEnabled: boolean;
}

export function HomepageDiscovery({ data, commerceEnabled }: HomepageDiscoveryProps) {
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
    <>
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
                onClick={() => {
                  if (!selectedIntentId) trackHomepageEvent({ name: "homepage_finder_start" });
                  trackHomepageEvent({ name: "homepage_finder_select_intent", intent_id: intent.id });
                  setSelectedIntentId(intent.id);
                }}
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
              <a
                href={selectedIntent.href}
                onClick={() => trackHomepageEvent({ name: "homepage_guide_click", placement: "finder", guide_id: selectedIntent.id })}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#f4b942]"
              >
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
                        onClick={() => {
                          trackHomepageEvent({ name: "homepage_finder_filter", filter_type: "access", filter_id: option.id });
                          setAccessPreference(option.id);
                        }}
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
                        onClick={() => {
                          trackHomepageEvent({ name: "homepage_finder_filter", filter_type: "budget", filter_id: option.id });
                          setBudgetPreference(option.id);
                        }}
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
                      <a
                        href={product.href}
                        onClick={() => trackHomepageEvent({ name: "homepage_recommendation_click", placement: "finder", product_slug: product.slug })}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#f4b942]"
                      >
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
                        trackHomepageEvent({ name: "homepage_finder_filter", filter_type: "access", filter_id: "any" });
                        trackHomepageEvent({ name: "homepage_finder_filter", filter_type: "budget", filter_id: "any" });
                        setAccessPreference("any");
                        setBudgetPreference("any");
                      }}
                      className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Clear filters
                    </button>
                    <a
                      href={selectedIntent.href}
                      onClick={() => trackHomepageEvent({ name: "homepage_guide_click", placement: "finder", guide_id: selectedIntent.id })}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#f4b942] px-4 py-2 text-sm font-bold text-[#07101f]"
                    >
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
                    <a
                      href={product.href}
                      onClick={() => trackHomepageEvent({ name: "homepage_recommendation_click", placement: "popular", product_slug: product.slug })}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-[#f4b942]"
                    >
                      Details <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
