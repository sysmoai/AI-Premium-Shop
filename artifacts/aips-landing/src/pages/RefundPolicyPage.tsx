import { AlertCircle, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20need%20an%20order%20issue%20review.%20I%20will%20send%20the%20product%2Fplan%2C%20approximate%20order%20time%2C%20payment%20reference%20if%20relevant%2C%20and%20the%20issue%20without%20sharing%20passwords%2C%20PINs%20or%20OTPs.";

export default function RefundPolicyPage() {
  return (
    <PageLayout>
      <SEOHead
        title="Refund & Resolution Policy | AI Premium Shop"
        description="How AI Premium Shop reviews order mismatches, access issues and resolution requests. Order-specific coverage and exclusions are confirmed before payment."
        canonical="https://aipremiumshop.com/refund-policy"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Refund & Resolution Policy" }]} />

      <div id="main-content" className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
        <header className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Order-specific resolution</div>
          <h1 className="text-3xl font-bold text-white md:text-5xl">Refund &amp; Resolution Policy</h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: 14 August 2026</p>
          <p className="mt-4 text-base leading-7 text-slate-300">AIPS does not publish a blanket coverage period that should be assumed for every product. Resolution eligibility depends on the exact order, access arrangement, issue and terms confirmed before payment.</p>
        </header>

        <section className="mt-10 space-y-4">
          {[
            ["1. Confirm the terms before payment", "Before paying, confirm the exact product, plan, duration, access model, current price, availability, delivery ETA and any order-specific resolution terms. Save the order confirmation for reference."],
            ["2. Report a mismatch or access problem", "If what you receive materially differs from the confirmed order, or an access issue appears, contact support with the order context and evidence. Do not send passwords, PINs, OTPs or unrelated financial credentials."],
            ["3. How AIPS reviews a request", "AIPS reviews what was confirmed, what was delivered, the current state of the access, any provider-side change, and whether customer actions or third-party restrictions affected the issue."],
            ["4. Possible resolutions", "Depending on the facts and the terms that applied to the order, a resolution may include correcting the access, providing a replacement where available, account/order credit, or a refund. No single outcome is guaranteed for every case."],
            ["5. Provider changes", "Third-party providers control their own models, features, quotas, pricing and terms. A provider change does not automatically create a particular refund outcome; AIPS will review the exact order and the material impact."],
            ["6. Misuse and prohibited activity", "AIPS cannot promise a refund or replacement for access affected by misuse, credential sharing contrary to the confirmed arrangement, prohibited automation, abuse, or actions that violate applicable provider rules."],
          ].map(([title, body]) => <article key={title} className="rounded-2xl border border-white/10 bg-[#151b3d] p-6"><h2 className="font-bold text-white">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-300">{body}</p></article>)}
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#151b3d]/70 p-6"><AlertCircle className="h-5 w-5 text-[#f4b942]" /><h2 className="mt-3 font-bold text-white">Keep evidence</h2><p className="mt-2 text-sm leading-6 text-slate-300">Keep the order confirmation, relevant payment reference and screenshots showing the issue. Mask credentials before sharing evidence.</p></div>
          <div className="rounded-2xl border border-white/10 bg-[#151b3d]/70 p-6"><CheckCircle2 className="h-5 w-5 text-emerald-400" /><h2 className="mt-3 font-bold text-white">Use the exact order as the reference</h2><p className="mt-2 text-sm leading-6 text-slate-300">Product-category marketing, an old message or another customer's arrangement does not override the terms confirmed for your order.</p></div>
        </section>

        <aside className="mt-10 rounded-2xl border border-white/10 bg-[#151b3d] p-6 text-center"><h2 className="text-lg font-bold text-white">Request an order review</h2><p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-300">Send the exact order context and a clear description of the issue. Response and resolution time depend on the case and current support load.</p><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#008236] px-5 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Contact support</a></aside>
      </div>
    </PageLayout>
  );
}
