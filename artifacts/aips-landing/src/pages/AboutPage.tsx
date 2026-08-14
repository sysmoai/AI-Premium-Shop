import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20confirm%20the%20current%20details%20for%20an%20AI%20tool%20before%20payment.";

export default function AboutPage() {
  return (
    <PageLayout>
      <SEOHead
        title="About AI Premium Shop | AI Tools in Bangladesh"
        description="Learn how AI Premium Shop presents current AI catalog prices and access models in Bangladesh, with provider-controlled details verified before purchase."
        canonical="https://aipremiumshop.com/about"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "About" }]} />

      <div id="main-content" className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
        <header className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Current-catalog buying support</div>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">About AI Premium Shop</h1>
          <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg">AI Premium Shop helps people in Bangladesh compare AI product families, published AIPS prices and stated access models. We have served customers since 2022, while keeping provider-controlled features and order-specific delivery details separate from our own catalog data.</p>
        </header>

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ["Catalog evidence", "Product identity, public AIPS BDT price and stated access model come from the current catalog used by the site."],
            ["Provider verification", "Models, credits, quotas, storage, exports, integrations and other entitlements can change and must be checked for the exact provider plan."],
            ["Order confirmation", "Availability, delivery ETA, payment instructions and applicable order terms are confirmed for the exact order before payment."],
          ].map(([title, body]) => <article key={title} className="rounded-2xl border border-white/10 bg-[#151b3d] p-6"><h2 className="font-bold text-white">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-300">{body}</p></article>)}
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-white/10 bg-[#151b3d]/70 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white">What we will not assume for you</h2>
            <div className="mt-5 space-y-3">
              {[
                "A shared, personal, team or service label does not by itself prove a particular privacy or account-control arrangement; confirm the exact handling before use.",
                "A provider plan name does not prove a model, credit amount, usage ceiling or licensing right is currently included.",
                "A published AIPS price does not imply a discount against a provider price unless a current comparison basis is explicitly stated.",
                "A product being listed does not guarantee immediate availability or a fixed delivery time.",
              ].map((point) => <div key={point} className="flex gap-2.5"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" /><p className="text-sm leading-6 text-slate-300">{point}</p></div>)}
            </div>
          </div>
          <aside className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
            <h2 className="text-lg font-bold text-white">Need a current answer?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">Send the exact tool, plan or workflow. Ask us to confirm the current AIPS price, access model, availability, provider-controlled limits, delivery ETA and applicable terms before payment.</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Confirm current details</a>
          </aside>
        </section>

        <div className="mt-10 flex flex-wrap gap-3"><Link href="/products" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white">Browse current catalog <ArrowRight className="h-4 w-4" /></Link><Link href="/how-to-order" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white">How to order <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </PageLayout>
  );
}
