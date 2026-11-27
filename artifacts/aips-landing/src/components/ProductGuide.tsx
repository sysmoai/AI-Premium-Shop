import { ArrowRight, Check, ChevronDown, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { formatBDT } from "@/lib/format";
import { schemaJson } from "@/utils/schemas";
import guidesData from "../../data/product-guides.json";

// Long-form, validated product content. The same file feeds the crawler HTML
// (scripts/lib/product-guides.mjs) and is checked by scripts/validate-product-guides.mjs.
export interface ProductGuideData {
  provider: string;
  sourceCheckedOn: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  summaryBN?: string;
  plans?: { tier: string; providerUSD?: number; points: string[]; fit: string }[];
  planNote?: string;
  sections: { heading: string; paragraphs?: string[]; bullets?: string[]; steps?: string[] }[];
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
  categoryLabel?: string;
  relatedGuides?: { title: string; href: string }[];
  comparison?: { heading: string; intro: string; columns: string[]; rows: { label: string; values: string[] }[]; note: string };
  alternatives?: { heading: string; intro: string; items: { name: string; href: string; note: string }[] };
}

const guides = (guidesData as { guides?: Record<string, ProductGuideData> }).guides ?? {};

/** Returns the guide only when every plan it describes has a published price. */
export function productGuideFor(slug: string, prices: Map<string, number>): ProductGuideData | null {
  const guide = guides[slug];
  if (!guide || prices.size === 0) return null;
  if ((guide.plans ?? []).some((plan) => !prices.has(plan.tier))) return null;
  return guide;
}

const card = "rounded-2xl border border-white/10 bg-[#151b3d] p-6";

export default function ProductGuide({ guide, prices, whatsappLink, canonical }: { guide: ProductGuideData; prices: Map<string, number>; whatsappLink: string; canonical: string }) {
  // Same shape as the approved Tier-A product schema: published BDT prices only, and
  // deliberately no availability, shipping, return policy, rating or review fields.
  const priced = [...prices.values()];
  const seller = { "@type": "Organization", name: "AI Premium Shop", url: "https://aipremiumshop.com" };
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: guide.provider,
    url: canonical,
    ...(guide.categoryLabel ? { category: guide.categoryLabel } : {}),
    offers: priced.length === 1
      ? { "@type": "Offer", url: canonical, price: priced[0], priceCurrency: "BDT", seller }
      : { "@type": "AggregateOffer", url: canonical, lowPrice: Math.min(...priced), highPrice: Math.max(...priced), offerCount: priced.length, priceCurrency: "BDT", seller },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  const checked = new Date(`${guide.sourceCheckedOn}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <div data-testid="product-guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(productSchema) }} />

      <section className={`mb-12 ${card}`} aria-labelledby="guide-overview">
        <h2 id="guide-overview" className="mb-3 text-2xl font-bold text-white">{guide.provider} in Bangladesh at a glance</h2>
        <p className="leading-7 text-slate-300">{guide.summary}</p>
        {guide.summaryBN && <p lang="bn" className="mt-4 leading-7 text-white/85">{guide.summaryBN}</p>}
      </section>

      {guide.plans && guide.plans.length > 0 && (
        <section className="mb-14" aria-labelledby="guide-plans">
          <h2 id="guide-plans" className="mb-6 text-2xl font-bold text-white">{guide.provider} plans and prices in Bangladesh</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {guide.plans.map((plan) => (
              <div key={plan.tier} className={card}>
                <h3 className="text-lg font-semibold text-white">{guide.provider} {plan.tier}</h3>
                <div className="mt-2 text-2xl font-bold text-[#f4b942]">{formatBDT(prices.get(plan.tier) ?? 0)}<span className="ml-1 text-sm font-normal text-slate-400">/month</span></div>
                <ul className="mt-4 space-y-2">
                  {plan.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm leading-6 text-slate-300"><Check className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-300" aria-hidden="true" />{point}</li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-slate-300">{plan.fit}</p>
              </div>
            ))}
          </div>
          {guide.planNote && <p className="mt-4 text-sm leading-6 text-slate-400">{guide.planNote}</p>}
        </section>
      )}

      {guide.comparison && (
        <section className="mb-14" aria-labelledby="guide-comparison">
          <h2 id="guide-comparison" className="mb-3 text-2xl font-bold text-white">{guide.comparison.heading}</h2>
          <p className="mb-5 max-w-4xl leading-7 text-slate-300">{guide.comparison.intro}</p>
          {/* Wide table: scrolls sideways inside its own box on small screens, with the first column pinned. */}
          <div role="region" aria-label="Plan comparison table, scrolls sideways" tabIndex={0} data-testid="guide-comparison-scroll" className="overflow-x-auto rounded-2xl border border-white/10 bg-[#151b3d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4b942]">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm sm:min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th scope="col" className="sticky left-0 z-10 w-32 min-w-32 max-w-32 bg-[#151b3d] px-3 py-3 font-semibold text-slate-300 sm:w-auto sm:min-w-0 sm:max-w-none sm:px-4">Feature</th>
                  {guide.comparison.columns.map((column) => <th key={column} scope="col" className="px-4 py-3 font-bold text-white">{column}</th>)}
                </tr>
              </thead>
              <tbody>
                {guide.comparison.rows.map((row, index) => (
                  <tr key={row.label} className={index === 0 ? "border-b border-white/10 bg-[#f4b942]/[0.06]" : "border-b border-white/5 last:border-0"}>
                    <th scope="row" className="sticky left-0 z-10 w-32 min-w-32 max-w-32 bg-[#151b3d] px-3 py-3 font-medium text-slate-200 sm:w-auto sm:min-w-0 sm:max-w-none sm:px-4">{row.label}</th>
                    {row.values.map((value, column) => <td key={`${row.label}-${column}`} className={`px-4 py-3 ${index === 0 ? "font-bold text-[#f4b942]" : "text-slate-300"}`}>{value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-400">{guide.comparison.note}</p>
        </section>
      )}

      {guide.sections.map((section) => (
        <section key={section.heading} className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mb-4 max-w-4xl leading-7 text-slate-300">{paragraph}</p>)}
          {section.bullets && (
            <ul className="max-w-4xl space-y-3">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 leading-7 text-slate-300"><Check className="mt-1.5 h-4 w-4 flex-shrink-0 text-[#f4b942]" aria-hidden="true" />{bullet}</li>
              ))}
            </ul>
          )}
          {section.steps && (
            <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {section.steps.map((step, index) => (
                <li key={step} className="rounded-xl border border-white/10 bg-[#151b3d] p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#f4b942]/10 text-sm font-bold text-[#f4b942]" aria-hidden="true">{index + 1}</div>
                  <p className="text-sm leading-6 text-slate-300">{step}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}

      <section className="mb-14" aria-labelledby="guide-faq">
        <h2 id="guide-faq" className="mb-6 text-2xl font-bold text-white">{guide.provider} in Bangladesh: questions and answers</h2>
        <div className="space-y-3">
          {guide.faq.map((item) => (
            <details key={item.q} className="group rounded-xl border border-white/10 bg-[#151b3d] open:border-white/20">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-white [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-semibold">{item.q}</h3>
                <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-5 pb-5 leading-7 text-slate-300">{item.a}</p>
            </details>
          ))}
        </div>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#008236] px-6 py-3 font-bold text-white">Ask a question on WhatsApp</a>
      </section>

      {guide.alternatives && guide.alternatives.items.length > 0 && (
        <section className="mb-14" aria-labelledby="guide-alternatives">
          <h2 id="guide-alternatives" className="mb-3 text-2xl font-bold text-white">{guide.alternatives.heading}</h2>
          <p className="mb-5 max-w-4xl leading-7 text-slate-300">{guide.alternatives.intro}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {guide.alternatives.items.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl border border-white/10 bg-[#151b3d] p-4 transition hover:border-[#f4b942]/40">
                <span className="flex items-center justify-between gap-3 font-semibold text-white">{item.name}<ArrowRight className="h-4 w-4 flex-shrink-0 text-[#f4b942]" aria-hidden="true" /></span>
                <span className="mt-1 block text-sm leading-6 text-slate-300">{item.note}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {guide.relatedGuides && guide.relatedGuides.length > 0 && (
        <section className="mb-14" aria-labelledby="guide-related">
          <h2 id="guide-related" className="mb-5 text-2xl font-bold text-white">{guide.provider} guides</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guide.relatedGuides.map((item) => (
              <Link key={item.href} href={item.href} className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#151b3d] p-4 font-semibold text-white transition hover:border-[#f4b942]/40">
                {item.title}
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#f4b942]" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={`mb-14 ${card}`} aria-labelledby="guide-sources">
        <h2 id="guide-sources" className="mb-2 text-lg font-bold text-white">Sources</h2>
        <p className="text-sm leading-6 text-slate-300">Provider facts on this page were checked against these {guide.provider} pages on {checked}. {guide.provider} can change them at any time.</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {guide.sources.map((source) => (
            <li key={source.url}><a href={source.url} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#f4b942] underline-offset-4 hover:underline">{source.label}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
