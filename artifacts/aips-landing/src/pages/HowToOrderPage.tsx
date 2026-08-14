import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20order%20an%20AI%20tool.%20Please%20confirm%20the%20exact%20product%2C%20plan%2C%20duration%2C%20published%20AIPS%20price%2C%20access%20model%2C%20availability%2C%20provider%20limits%2C%20delivery%20ETA%20and%20applicable%20terms%20before%20payment.";

const STEPS = [
  ["1", "Choose the exact product and plan", "Start from the current product or pricing page. Note the plan, duration and access model you want rather than ordering only by brand name."],
  ["2", "Confirm the order details", "Message AIPS with the exact plan. Confirm the current published AIPS price, access model, availability, provider-controlled limits, delivery ETA and applicable order terms."],
  ["3", "Receive order-specific payment instructions", "Pay only after the exact amount and payment method are confirmed for your order. Never share a banking PIN, OTP, password, full card details or unrelated financial credentials."],
  ["4", "Receive and verify the access details", "Follow the instructions supplied for the exact order. Verify that the stated access model matches what was confirmed, and raise any mismatch with support without sending sensitive credentials."],
];

export default function HowToOrderPage() {
  return (
    <PageLayout>
      <SEOHead
        title="How to Order AI Tools from AIPS | Bangladesh"
        description="How to order from AI Premium Shop: choose the exact plan, confirm price/access/availability/terms, receive payment instructions and verify access."
        canonical="https://aipremiumshop.com/how-to-order"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "How to Order" }]} />

      <div id="main-content" className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
        <header className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Confirm before payment</div>
          <h1 className="text-3xl font-bold text-white md:text-5xl">How to Order from AI Premium Shop</h1>
          <p className="mt-4 text-base leading-7 text-slate-300">The ordering flow is built around the exact product and access arrangement. Do not assume a fixed delivery time, universal payment method or blanket coverage from a category label alone.</p>
        </header>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {STEPS.map(([number, title, body]) => <article key={number} className="rounded-2xl border border-white/10 bg-[#151b3d] p-6"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4b942]/15 text-xs font-bold text-[#f4b942]">{number}</div><h2 className="mt-4 text-lg font-bold text-white">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-300">{body}</p></article>)}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-white/10 bg-[#151b3d]/70 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white">Before you send payment</h2>
            <div className="mt-4 space-y-3">{[
              "Match the product, plan, duration and access model to the order message.",
              "Confirm current availability and a delivery ETA for that exact order.",
              "Check provider-controlled features or limits that are essential to your workflow.",
              "Review any refund, replacement or other order-specific terms that apply.",
            ].map((point) => <div key={point} className="flex gap-2.5"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" /><p className="text-sm leading-6 text-slate-300">{point}</p></div>)}</div>
          </div>
          <aside className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
            <h2 className="text-lg font-bold text-white">Start an order check</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">The prefilled message asks for the exact details that should be settled before payment.</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Confirm an order</a>
          </aside>
        </section>

        <div className="mt-10 flex flex-wrap gap-3"><Link href="/products" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white">Browse products <ArrowRight className="h-4 w-4" /></Link><Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white">Current pricing <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </PageLayout>
  );
}
