import { ArrowRight, CheckCircle2, ExternalLink, Info, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { formatBDT } from "@/lib/format";
import evidence from "../../data/chatgpt-money-page-v2.json";

type Product = {
  id: string;
  slug: string;
  name: string;
  tier?: string | null;
  price?: number | null;
  requestPrice?: boolean;
  accessType?: string | null;
};

type Props = {
  brandSlug: string;
  products: Product[];
};

type FactKey = "go" | "plus" | "pro" | "business";

const WHATSAPP = "https://wa.me/8801865385348";
const ROUTES = new Set(["chatgpt-plus-bangladesh", "chatgpt-plans-bangladesh"]);

function accessLabel(value?: string | null) {
  if (value === "personal") return "Personal access";
  if (value === "team") return "Team access";
  if (value === "bundle") return "Bundle";
  return "Confirm exact access model";
}

function currentPrice(records: Product[]) {
  const fixed = records
    .filter((product) => !product.requestPrice && typeof product.price === "number" && product.price > 0)
    .sort((a, b) => Number(a.price) - Number(b.price));
  return fixed[0] ?? null;
}

function SourceLinks({ ids }: { ids: string[] }) {
  const sources = evidence.sources.filter((source) => ids.includes(source.id));
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0d1230] p-6" aria-labelledby="chatgpt-evidence-sources">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">Evidence</p>
      <h2 id="chatgpt-evidence-sources" className="mt-2 text-xl font-bold text-white">First-party sources reviewed</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">Reviewed {evidence.reviewed_at}. Provider plans, prices, models and usage limits can change, so the linked first-party pages remain the final reference for provider-controlled details.</p>
      <ul className="mt-4 space-y-3">
        {sources.map((source) => (
          <li key={source.id}>
            <a href={source.url} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-start gap-2 text-sm font-semibold text-[#f4b942] hover:underline">
              <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{source.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SafetyPanel() {
  return (
    <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-6" aria-labelledby="chatgpt-account-safety">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" />
        <div>
          <h2 id="chatgpt-account-safety" className="text-xl font-bold text-white">Account and access safety</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">{evidence.provider_facts.account_policy.statement}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">Under current AI Premium Shop provider governance, shared OpenAI account offers are not published on these ChatGPT money pages. Confirm that the exact order gives you the access model you expect before payment.</p>
        </div>
      </div>
    </section>
  );
}

function PlusPage({ products }: { products: Product[] }) {
  const listing = currentPrice(products.filter((product) => product.slug === "chatgpt-plus-bangladesh"));
  const plus = evidence.provider_facts.plus;
  const route = evidence.routes["chatgpt-plus-bangladesh"];
  const askUrl = `${WHATSAPP}?text=${encodeURIComponent("Hi, I want ChatGPT Plus Personal. Please confirm the current AI Premium Shop price, personal access model, availability, delivery ETA and applicable order terms before payment.")}`;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pb-12 md:px-8">
      <section className="grid gap-4 lg:grid-cols-3" aria-label="ChatGPT Plus quick answer">
        <article className="rounded-2xl border border-white/10 bg-[#151b3d] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Current AI Premium Shop listing</p>
          <p className="mt-3 text-2xl font-bold text-white">{listing?.price ? `${formatBDT(listing.price)}/month` : "Confirm current price"}</p>
          <p className="mt-2 text-sm text-slate-300">{listing ? accessLabel(listing.accessType) : "Confirm exact access model"}. Exact order price is reconfirmed before payment.</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-[#151b3d] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">OpenAI provider reference</p>
          <p className="mt-3 text-2xl font-bold text-[#f4b942]">{plus.official_reference}</p>
          <p className="mt-2 text-sm text-slate-300">{plus.billing}. This is OpenAI's provider price reference, not an AI Premium Shop MSRP or discount claim.</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-[#151b3d] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Local payment at AI Premium Shop</p>
          <p className="mt-3 text-2xl font-bold text-white">{evidence.local_payment.methods.join(" · ")}</p>
          <p className="mt-2 text-sm text-slate-300">These are AI Premium Shop payment references. They do not describe payment methods accepted directly by OpenAI.</p>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">What the provider currently says</p>
          <h2 className="mt-2 text-2xl font-bold text-white">What ChatGPT Plus is for</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">{plus.positioning}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {plus.features.map((feature) => (
              <li key={feature} className="flex gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-5 text-slate-500">Model names, feature availability and usage limits are provider-controlled and can change. Verify the current model picker and provider documentation for the exact account.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
          <h2 className="text-lg font-bold text-white">Before ordering Plus</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {["Confirm Personal access for the exact order.", "Reconfirm the current AI Premium Shop price before payment.", "Check current OpenAI model and usage limits for Plus.", "Confirm availability, delivery ETA and applicable order terms."].map((item) => (
              <div key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /><span>{item}</span></div>
            ))}
          </div>
          <a href={askUrl} target="_blank" rel="noopener noreferrer" className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white">
            <MessageCircle className="h-4 w-4" /> Confirm Plus on WhatsApp
          </a>
        </div>
      </section>

      <SafetyPanel />

      <section className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#f4b942]" />
          <div>
            <h2 className="text-xl font-bold text-white">Not sure Plus is the right plan?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">The broader ChatGPT plan guide separates Go, Plus, Pro and Business so the exact Plus transactional page does not compete with the family-comparison intent.</p>
            <Link href="/chatgpt-plans-bangladesh" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#f4b942]">Compare all ChatGPT plans <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <SourceLinks ids={[...route.source_ids]} />
    </div>
  );
}

const PLAN_SPECS: Array<{ slug: string; label: string; fact: FactKey; fit: string; check: string }> = [
  { slug: "chatgpt-go-bangladesh", label: "Go", fact: "go", fit: "Lower-cost individual access when you need more core ChatGPT use than Free.", check: "Check OpenAI's current country/currency price and current Go limits before comparing it with Plus." },
  { slug: "chatgpt-plus-bangladesh", label: "Plus", fact: "plus", fit: "Individual use when broader tools, higher limits and advanced reasoning access matter.", check: "Model availability and usage limits can change; verify the current account before purchase." },
  { slug: "chatgpt-pro-bangladesh", label: "Pro", fact: "pro", fit: "Higher-usage individual work where the Pro tier's additional allowance is valuable.", check: "OpenAI currently documents $100 and $200 Pro tiers. Confirm which exact provider tier the local listing corresponds to before payment." },
  { slug: "chatgpt-business-bangladesh", label: "Business", fact: "business", fit: "A team workspace when centralized billing and admin controls are required.", check: "OpenAI Business requires at least two paid seats. Do not infer a full direct-provider workspace configuration from a local listing name; confirm the exact seat/workspace arrangement." },
];

function PlansPage({ products }: { products: Product[] }) {
  const route = evidence.routes["chatgpt-plans-bangladesh"];
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pb-12 md:px-8">
      <section className="rounded-2xl border border-white/10 bg-[#151b3d] p-6" aria-labelledby="chatgpt-plan-guide">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">Decision guide</p>
        <h2 id="chatgpt-plan-guide" className="mt-2 text-2xl font-bold text-white">Go vs Plus vs Pro vs Business</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">Use the OpenAI reference column to understand the provider's current plan structure, and the AI Premium Shop column for the current local catalog listing. They are different reference points; one should not be treated as a hidden conversion of the other.</p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead className="bg-white/[0.04] text-slate-300">
              <tr><th className="p-4">Plan</th><th className="p-4">OpenAI reference</th><th className="p-4">Current AI Premium Shop listing</th><th className="p-4">Best fit / check</th></tr>
            </thead>
            <tbody>
              {PLAN_SPECS.map((spec) => {
                const records = products.filter((product) => product.slug === spec.slug);
                const listing = currentPrice(records);
                const fact = evidence.provider_facts[spec.fact];
                return (
                  <tr key={spec.slug} className="border-t border-white/10 align-top">
                    <td className="p-4"><Link href={`/${spec.slug}`} className="font-bold text-white hover:text-[#f4b942]">{spec.label}</Link></td>
                    <td className="p-4 text-slate-300"><strong className="text-white">{fact.official_reference}</strong><div className="mt-2 leading-6">{fact.positioning}</div></td>
                    <td className="p-4 text-slate-300">{listing?.price ? <><strong className="text-[#f4b942]">{formatBDT(listing.price)}/month</strong><div className="mt-2">{accessLabel(listing.accessType)}</div></> : "Confirm current price and access"}</td>
                    <td className="p-4 text-slate-300"><div>{spec.fit}</div><div className="mt-2 text-xs leading-5 text-slate-500">{spec.check}</div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">AI Premium Shop prices above come from the current governed public catalog and are reconfirmed before payment. OpenAI references come from the first-party sources listed below.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
          <h2 className="text-xl font-bold text-white">Choose by the work, not by the highest tier</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {["Start with whether this is individual use or a team workspace.", "Compare the provider's current limits and tools for the exact plan.", "Use the current AI Premium Shop BDT price only as the local seller reference.", "Confirm access, availability, delivery ETA and order terms before payment."].map((item) => (
              <div key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /><span>{item}</span></div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
          <h2 className="text-xl font-bold text-white">Buying ChatGPT Plus specifically?</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">The dedicated Plus page owns exact Plus price/buying intent and has the focused Personal-plan ordering checklist.</p>
          <Link href="/chatgpt-plus-bangladesh" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#f4b942]">Open the ChatGPT Plus buying guide <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <SafetyPanel />
      <SourceLinks ids={[...route.source_ids]} />
    </div>
  );
}

export function ChatGPTMoneyPageV2({ brandSlug, products }: Props) {
  if (!ROUTES.has(brandSlug)) return null;
  return brandSlug === "chatgpt-plus-bangladesh" ? <PlusPage products={products} /> : <PlansPage products={products} />;
}
