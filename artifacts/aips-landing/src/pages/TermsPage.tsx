import { MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20have%20a%20question%20about%20the%20terms%20for%20an%20AIPS%20order.%20Please%20confirm%20the%20exact%20order-specific%20details%20before%20payment.";

const TERMS = [
  ["1. What AIPS provides", "AI Premium Shop presents and fulfills the AIPS products, access arrangements and services described on this site and in the exact order confirmation. The underlying AI platforms are operated by third-party providers. AIPS is independent from those providers unless a page explicitly states and evidences a different relationship."],
  ["2. Exact order controls", "Before payment, confirm the product, plan, duration, published AIPS price, stated access model, availability, delivery ETA and any order-specific support, refund or replacement terms. Those confirmed order details are the reference for resolving an order issue."],
  ["3. Provider-controlled features", "Third-party providers control their models, credits, quotas, storage, exports, integrations, licensing, availability and platform terms. These can change. AIPS does not guarantee a provider feature or limit unless it is explicitly confirmed for the exact plan and order."],
  ["4. Payment", "Payment is handled according to the instructions confirmed for the exact order. Do not send money until the amount and method are confirmed. Never disclose a banking PIN, OTP, password, full card details or unrelated financial credentials to AIPS."],
  ["5. Delivery and access", "Delivery timing and access handling depend on the exact product, access model and current availability. Do not assume a universal delivery window or account-control arrangement from a category label alone."],
  ["6. Customer responsibilities", "Use the access only as confirmed for your order and comply with applicable provider rules and law. Do not resell, redistribute, automate abuse, scrape, or share credentials contrary to the confirmed arrangement or provider terms."],
  ["7. Privacy and sensitive data", "Choose an access arrangement appropriate to the data you will process. A shared, personal, team or service label does not by itself guarantee a particular privacy or security configuration. Review the Privacy Policy and provider controls before using sensitive information."],
  ["8. Refunds and resolutions", "Refund, replacement, credit or other resolution depends on the exact order, issue and terms that applied. See the current Refund & Resolution Policy. No blanket coverage period or outcome should be assumed unless it was confirmed for the order."],
  ["9. Third-party changes and interruptions", "AIPS cannot control third-party outages, product changes, model changes, account-policy changes or provider restrictions. If one materially affects an AIPS order, contact support so the order can be reviewed against the confirmed terms."],
  ["10. Limits of service", "AI outputs can be inaccurate or unsuitable. You are responsible for reviewing generated content and for decisions made using third-party AI tools. AIPS does not promise a particular business, academic, creative, financial or technical outcome from using a subscription."],
  ["11. Changes to these terms", "AIPS may update these terms as products, operations and provider rules change. The version published on this page applies prospectively; order-specific terms already confirmed remain relevant to the review of that order."],
];

export default function TermsPage() {
  return (
    <PageLayout>
      <SEOHead
        title="Terms of Service | AI Premium Shop"
        description="AIPS terms covering exact order details, third-party provider controls, payment safety, access responsibilities, privacy and order-specific resolutions."
        canonical="https://aipremiumshop.com/terms"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Terms" }]} />

      <div id="main-content" className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
        <header className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Order-specific terms</div>
          <h1 className="text-3xl font-bold text-white md:text-5xl">Terms of Service</h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: 14 August 2026</p>
          <p className="mt-4 text-base leading-7 text-slate-300">These terms describe the general AIPS service framework. The exact product, access model, price, availability and any order-specific coverage should be confirmed before payment.</p>
        </header>

        <section className="mt-10 space-y-4">
          {TERMS.map(([title, body]) => <article key={title} className="rounded-2xl border border-white/10 bg-[#151b3d] p-6"><h2 className="font-bold text-white">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-300">{body}</p></article>)}
        </section>

        <aside className="mt-10 rounded-2xl border border-white/10 bg-[#151b3d] p-6"><h2 className="text-lg font-bold text-white">Questions about an order term?</h2><p className="mt-2 text-sm leading-6 text-slate-300">Ask for the exact plan, access, availability, provider-controlled limits, delivery ETA and applicable terms to be confirmed in the order conversation before payment.</p><div className="mt-5 flex flex-wrap gap-3"><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#008236] px-5 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Ask on WhatsApp</a><Link href="/refund-policy" className="inline-flex min-h-11 items-center rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white">Refund & resolution policy</Link></div></aside>
      </div>
    </PageLayout>
  );
}
