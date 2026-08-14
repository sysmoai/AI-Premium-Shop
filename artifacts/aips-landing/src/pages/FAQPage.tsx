import { useState } from "react";
import { ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20have%20a%20question%20about%20an%20AI%20Premium%20Shop%20order.%20Please%20confirm%20the%20current%20details%20for%20the%20exact%20plan.";

const FAQS = [
  {
    q: "What information on an AIPS product page should I rely on?",
    a: "Use the current product identity, published AIPS BDT price and stated access model as AIPS catalog information. Provider-controlled models, credits, quotas, storage, exports, integrations and licensing can change, so verify those details for the exact provider plan before buying.",
  },
  {
    q: "What do Shared, Personal, Team and Service mean?",
    a: "They are catalog access labels that help distinguish the intended arrangement. They do not by themselves guarantee a particular privacy, credential, account-ownership or simultaneous-use setup. Confirm the exact handling for the plan before using it with sensitive data.",
  },
  {
    q: "How long will delivery take?",
    a: "Delivery depends on the exact product, access model and current availability. Ask for the current delivery ETA for your order before payment rather than relying on a universal time window.",
  },
  {
    q: "How do I pay?",
    a: "Payment instructions are confirmed for the exact order after the product, plan, duration, price and access model are agreed. Do not send payment until the amount and method are confirmed, and never share a PIN, OTP, password or unrelated financial credential.",
  },
  {
    q: "What happens if the provider changes a feature or limit?",
    a: "Third-party providers control their own models, features, credits, quotas and terms. Re-check current provider information for the exact plan, especially when a capability matters to your workflow. Contact AIPS if an order-specific issue needs review.",
  },
  {
    q: "Is every order covered by the same refund or replacement rule?",
    a: "No blanket coverage should be assumed. Review the current Refund & Resolution Policy and confirm any order-specific coverage or exclusions before payment. AIPS will review documented order issues against the terms that applied to that order.",
  },
  {
    q: "What should I send when I need support?",
    a: "Send the product or plan name, approximate order time, payment reference if relevant, and a description or screenshot of the issue. Do not send passwords, PINs, OTPs, full card details or unrelated private information.",
  },
  {
    q: "Can I use a shared-access product for private or regulated information?",
    a: "Do not assume a shared-access arrangement is appropriate for sensitive, client, student, health, financial or confidential data. Confirm the exact account and data-handling arrangement and the provider's current privacy controls before use.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <PageLayout>
      <SEOHead
        title="AI Premium Shop FAQ | Orders, Access & Support"
        description="Answers about AIPS catalog prices, access models, delivery confirmation, payment instructions, provider limits, support and order resolution."
        canonical="https://aipremiumshop.com/faq"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} />

      <div id="main-content" className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
        <header className="mb-10 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Confirm-first answers</div>
          <h1 className="text-3xl font-bold text-white md:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-base leading-7 text-slate-300">These answers separate AIPS catalog facts from provider-controlled details and order-specific terms.</p>
        </header>

        <section className="space-y-3">
          {FAQS.map((item, index) => {
            const active = open === index;
            return <article key={item.q} className="overflow-hidden rounded-2xl border border-white/10 bg-[#151b3d]"><button type="button" onClick={() => setOpen(active ? null : index)} aria-expanded={active} className="flex w-full min-h-14 items-center justify-between gap-4 px-5 py-4 text-left"><span className="font-semibold text-white">{item.q}</span><ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${active ? "rotate-180" : ""}`} /></button>{active && <div className="border-t border-white/10 px-5 py-4"><p className="text-sm leading-6 text-slate-300">{item.a}</p></div>}</article>;
          })}
        </section>

        <aside className="mt-10 rounded-2xl border border-white/10 bg-[#151b3d] p-6 text-center">
          <h2 className="text-lg font-bold text-white">Question about a specific order or plan?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-300">Send the exact product or order context. Confirm current price, access model, availability, provider-controlled limits, delivery ETA and applicable terms before payment.</p>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#008236] px-5 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Ask on WhatsApp</a>
        </aside>
      </div>
    </PageLayout>
  );
}
