import { CheckCircle2, ExternalLink, Info, MessageCircle, ShieldCheck } from "lucide-react";
import { formatBDT } from "@/lib/format";
import evidence from "../../data/tier-a-money-page-v2.json";

type Product = {
  id: string;
  slug: string;
  name: string;
  provider?: string | null;
  tier?: string | null;
  price?: number | null;
  requestPrice?: boolean;
  accessType?: string | null;
};

type Props = {
  brandSlug: string;
  products: Product[];
};

const WHATSAPP = "https://wa.me/8801865385348";
const ROUTES = new Set(["claude-pro-bangladesh", "gemini-advanced-bangladesh"]);

function accessLabel(value?: string | null) {
  if (value === "personal") return "Personal access";
  if (value === "team") return "Team access";
  if (value === "shared") return "Shared access";
  if (value === "bundle") return "Bundle";
  return "Confirm exact access model";
}

function fixedListings(products: Product[]) {
  return products
    .filter((product) => !product.requestPrice && typeof product.price === "number" && product.price > 0)
    .slice()
    .sort((a, b) => Number(a.price) - Number(b.price));
}

function tierListing(products: Product[], tier: string) {
  return fixedListings(products).find((product) => String(product.tier ?? "").toLowerCase() === tier.toLowerCase()) ?? null;
}

function SourceLinks({ ids }: { ids: readonly string[] }) {
  const sources = evidence.sources.filter((source) => ids.includes(source.id));
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0d1230] p-6" aria-labelledby="tier-a-evidence-sources">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">Evidence</p>
      <h2 id="tier-a-evidence-sources" className="mt-2 text-xl font-bold text-white">First-party sources reviewed</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">Reviewed {evidence.reviewed_at}. Provider plans, prices, limits and eligibility can change; the linked first-party pages remain the final reference for provider-controlled details.</p>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
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

function QuickCard({ label, value, body, accent = false }: { label: string; value: string; body: string; accent?: boolean }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#151b3d] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className={`mt-3 text-2xl font-bold ${accent ? "text-[#f4b942]" : "text-white"}`}>{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
    </article>
  );
}

function LocalListings({ products, provider }: { products: Product[]; provider: "Claude" | "Google" }) {
  const listings = fixedListings(products);
  return (
    <section className="rounded-2xl border border-white/10 bg-[#151b3d] p-6" aria-labelledby={`${provider.toLowerCase()}-local-listings`}>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">AI Premium Shop catalog</p>
      <h2 id={`${provider.toLowerCase()}-local-listings`} className="mt-2 text-2xl font-bold text-white">Current local listings</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">These are AI Premium Shop-owned local catalog prices and labels, not provider MSRP or proof that a similarly named local row maps one-to-one to a provider seat or billing tier. Exact order price and access are reconfirmed before payment.</p>
      <div className="mt-5 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-white/[0.04] text-slate-300"><tr><th className="p-4">AI Premium Shop label</th><th className="p-4">Current price</th><th className="p-4">Catalog access</th><th className="p-4">Before payment</th></tr></thead>
          <tbody>
            {listings.map((product) => (
              <tr key={product.id} className="border-t border-white/10 align-top">
                <td className="p-4 font-bold text-white">{product.tier ?? "Current listing"}</td>
                <td className="p-4 font-bold text-[#f4b942]">{formatBDT(Number(product.price))}/month</td>
                <td className="p-4 text-slate-300">{accessLabel(product.accessType)}</td>
                <td className="p-4 text-xs leading-5 text-slate-400">
                  {provider === "Google" && product.accessType === "shared"
                    ? "Confirm the exact access mechanism. Do not assume this Shared label means Google family sharing or provider-authorized resale."
                    : product.tier?.toLowerCase().includes("team")
                      ? "Confirm the exact seat/workspace arrangement; a local Team label does not by itself prove a direct provider Team seat."
                      : "Confirm exact access, availability, delivery ETA and applicable order terms."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ClaudePage({ products }: { products: Product[] }) {
  const route = evidence.routes["claude-pro-bangladesh"];
  const facts = evidence.provider_facts.claude;
  const personal = tierListing(products, "Personal");
  const askUrl = `${WHATSAPP}?text=${encodeURIComponent("Hi, I want Claude Pro. Please confirm the current AI Premium Shop Personal price, exact access model, availability, delivery ETA and applicable order terms before payment. I do not want a shared Claude account.")}`;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pb-12 md:px-8">
      <section className="grid gap-4 lg:grid-cols-3" aria-label="Claude Pro quick answer">
        <QuickCard label="Current AI Premium Shop Personal listing" value={personal?.price ? `${formatBDT(Number(personal.price))}/month` : "Confirm current price"} body={`${personal ? accessLabel(personal.accessType) : "Confirm exact access model"}. Exact order price is reconfirmed before payment.`} />
        <QuickCard label="Anthropic Pro reference" value={facts.pro.official_reference} body="Provider reference only. It is not represented as AI Premium Shop MSRP, a discount basis or a guaranteed local conversion." accent />
        <QuickCard label="Bangladesh + local payment" value={facts.availability.statement.includes("Bangladesh") ? "Supported location" : "Check provider"} body={`Anthropic lists Bangladesh for Claude access. AI Premium Shop public payment references are ${evidence.local_payment.methods.join(" and ")}; these are not claims about Anthropic payment methods.`} />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">What Anthropic currently says</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Pro, Max and Team are different provider tiers</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
            <div><strong className="text-white">Pro — {facts.pro.official_reference}.</strong> {facts.pro.positioning}</div>
            <div><strong className="text-white">Max — {facts.max.official_reference}.</strong> {facts.max.positioning}</div>
            <div><strong className="text-white">Team — {facts.team.official_reference}.</strong> {facts.team.positioning}</div>
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">Anthropic controls exact models, limits, features, taxes and plan changes. Verify the current provider pages for the exact tier you need.</p>
        </div>
        <aside className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
          <h2 className="text-lg font-bold text-white">Before ordering Claude</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {["Confirm the exact AI Premium Shop access model.", "Reconfirm the current local price before payment.", "Verify the provider tier and current usage limits.", "Confirm availability, delivery ETA and applicable order terms."].map((item) => (
              <div key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /><span>{item}</span></div>
            ))}
          </div>
          <a href={askUrl} target="_blank" rel="noopener noreferrer" className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Confirm Claude on WhatsApp</a>
        </aside>
      </section>

      <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-6" aria-labelledby="claude-account-safety">
        <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" /><div><h2 id="claude-account-safety" className="text-xl font-bold text-white">Account and access safety</h2><p className="mt-3 text-sm leading-6 text-slate-300">{facts.account_policy.statement}</p><p className="mt-3 text-sm leading-6 text-slate-300">Under current effective AI Premium Shop provider governance, shared Anthropic account rows are not published on this money page. The raw historical rows remain audit evidence only.</p></div></div>
      </section>

      <LocalListings products={products} provider="Claude" />
      <SourceLinks ids={route.source_ids} />
    </div>
  );
}

function GooglePage({ products }: { products: Product[] }) {
  const route = evidence.routes["gemini-advanced-bangladesh"];
  const facts = evidence.provider_facts.google;
  const personal = tierListing(products, "Personal");
  const shared = products.find((product) => product.accessType === "shared");
  const askUrl = `${WHATSAPP}?text=${encodeURIComponent("Hi, I want Google AI Pro. Please confirm the current AI Premium Shop price, whether the exact listing is Personal or Shared, the exact access mechanism, availability, delivery ETA and applicable order terms before payment. Please do not assume a Shared listing is Google family sharing unless that is explicitly confirmed.")}`;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pb-12 md:px-8">
      <section className="grid gap-4 lg:grid-cols-3" aria-label="Google AI Pro quick answer">
        <QuickCard label="Current AI Premium Shop Personal listing" value={personal?.price ? `${formatBDT(Number(personal.price))}/month` : "Confirm current price"} body={`${personal ? accessLabel(personal.accessType) : "Confirm exact access model"}. Exact order price is reconfirmed before payment.`} />
        <QuickCard label="Google AI Pro reference" value={facts.pro.official_reference} body="Provider reference only. It is separate from AI Premium Shop local catalog pricing and is not used as an unsupported discount basis." accent />
        <QuickCard label="Bangladesh + local payment" value="Google AI Pro available" body={`Google lists Bangladesh for Google AI Pro availability. AI Premium Shop public payment references are ${evidence.local_payment.methods.join(" and ")}; these are not claims about Google payment methods.`} />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">Current provider structure</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Google AI Pro, not an assumed “Gemini Advanced” package</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">{facts.pro.positioning}</p>
          <div className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
            <div className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" /><span>{facts.availability.statement}</span></div>
            <div className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" /><span>{facts.limits.statement}</span></div>
          </div>
          <div className="mt-5 rounded-xl border border-[#f4b942]/20 bg-[#f4b942]/[0.05] p-4"><div className="flex gap-2"><Info className="mt-0.5 h-5 w-5 shrink-0 text-[#f4b942]" /><div><h3 className="font-bold text-white">Why this URL still says gemini-advanced</h3><p className="mt-2 text-sm leading-6 text-slate-300">This established canonical keeps legacy Gemini Advanced search intent and link history. Google currently presents the paid Google One AI tier as Google AI Pro, so the page heading and provider references use the current name.</p></div></div></div>
        </div>
        <aside className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
          <h2 className="text-lg font-bold text-white">Before ordering Google AI Pro</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {["Choose Personal or Shared only after the exact mechanism is clear.", "Reconfirm the current AI Premium Shop price.", "Verify current Google limits and included benefits.", "Confirm availability, delivery ETA and applicable order terms."].map((item) => (
              <div key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /><span>{item}</span></div>
            ))}
          </div>
          <a href={askUrl} target="_blank" rel="noopener noreferrer" className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Confirm Google AI Pro</a>
        </aside>
      </section>

      <section className="rounded-2xl border border-[#f4b942]/20 bg-[#f4b942]/[0.05] p-6" aria-labelledby="google-family-safety">
        <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#f4b942]" /><div><h2 id="google-family-safety" className="text-xl font-bold text-white">Family sharing is not a shortcut assumption</h2><p className="mt-3 text-sm leading-6 text-slate-300">{facts.family.statement}</p>{shared ? <p className="mt-3 text-sm font-semibold leading-6 text-white">A current AI Premium Shop Shared catalog row exists at {shared.price ? `${formatBDT(Number(shared.price))}/month` : "a price that must be confirmed"}. Its exact access mechanism must be confirmed before payment; this page does not label it as Google family sharing or provider-authorized resale.</p> : <p className="mt-3 text-sm leading-6 text-slate-300">No Shared local row is currently present in the governed projection.</p>}</div></div>
      </section>

      <LocalListings products={products} provider="Google" />
      <SourceLinks ids={route.source_ids} />
    </div>
  );
}

export function TierAMoneyPageV2({ brandSlug, products }: Props) {
  if (!ROUTES.has(brandSlug)) return null;
  return brandSlug === "claude-pro-bangladesh" ? <ClaudePage products={products} /> : <GooglePage products={products} />;
}
