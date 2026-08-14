import { AlertTriangle, CheckCircle2, KeyRound, MessageCircle, ReceiptText, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20need%20support%20with%20an%20AIPS%20order.%20I%20will%20send%20the%20product%2Fplan%2C%20approximate%20order%20time%2C%20payment%20reference%20if%20relevant%2C%20and%20the%20issue.%20I%20will%20not%20send%20passwords%2C%20PINs%20or%20OTPs.";

const CASES = [
  { icon: ReceiptText, title: "Order or payment question", body: "Send the exact product/plan, approximate order time and payment reference if relevant. We will compare the issue with the order details that were confirmed." },
  { icon: KeyRound, title: "Access issue", body: "Describe what changed and include a screenshot if useful. Do not send your password, PIN, OTP or unrelated private credentials." },
  { icon: AlertTriangle, title: "Provider feature changed", body: "Provider-controlled models, credits, quotas and features can change. Tell us which capability matters so the exact plan can be re-checked." },
  { icon: ShieldCheck, title: "Privacy or account-handling question", body: "Tell us the access model and data sensitivity. Do not assume a shared or team arrangement is suitable for confidential information without confirming the exact setup." },
];

export default function SupportPage() {
  return (
    <PageLayout>
      <SEOHead
        title="AI Premium Shop Support | Order & Access Help"
        description="Get help with AIPS orders, access issues, provider changes and order terms. Send the exact plan context without sharing passwords, PINs or OTPs."
        canonical="https://aipremiumshop.com/support"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Support" }]} />

      <div id="main-content" className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
        <header className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Order-specific support</div>
          <h1 className="text-3xl font-bold text-white md:text-5xl">Support for Your AIPS Order</h1>
          <p className="mt-4 text-base leading-7 text-slate-300">Support starts with the exact order, plan and access model. Availability, delivery ETA, replacement/refund coverage and provider-controlled limits are reviewed against the terms that applied to that order—not a universal promise.</p>
        </header>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {CASES.map((item) => <article key={item.title} className="rounded-2xl border border-white/10 bg-[#151b3d] p-6"><item.icon className="h-5 w-5 text-[#f4b942]" /><h2 className="mt-4 font-bold text-white">{item.title}</h2><p className="mt-2 text-sm leading-6 text-slate-300">{item.body}</p></article>)}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-white/10 bg-[#151b3d]/70 p-6 md:p-8">
            <h2 className="text-xl font-bold text-white">What to include in a support message</h2>
            <div className="mt-4 space-y-3">{[
              "Product or plan name and the stated access model.",
              "Approximate order time and payment reference when relevant to the issue.",
              "A clear description of what you expected and what you are seeing now.",
              "A screenshot that does not expose passwords, PINs, OTPs, full card details or unrelated private data.",
            ].map((point) => <div key={point} className="flex gap-2.5"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" /><p className="text-sm leading-6 text-slate-300">{point}</p></div>)}</div>
          </div>
          <aside className="rounded-2xl border border-white/10 bg-[#151b3d] p-6">
            <h2 className="text-lg font-bold text-white">Contact support</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">WhatsApp is the direct support channel shown on this site. Response time depends on current support load; do not rely on a fixed response-time promise.</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Open support chat</a>
            <Link href="/refund-policy" className="mt-3 flex min-h-11 items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white">Refund & resolution policy</Link>
          </aside>
        </section>
      </div>
    </PageLayout>
  );
}
