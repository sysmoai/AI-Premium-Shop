import { useMemo, useState } from "react";
import { ExternalLink, MessageCircle, ShieldCheck } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const NUMBER = "8801865385348";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("Plan or pricing question");
  const [message, setMessage] = useState("");

  const whatsappUrl = useMemo(() => {
    const text = [
      "Hi AI Premium Shop,",
      name.trim() ? `Name: ${name.trim()}` : "",
      `Topic: ${topic}`,
      message.trim() ? `Message: ${message.trim()}` : "",
      "Please confirm any current price, access model, availability, provider-controlled limits, delivery ETA and applicable terms relevant to my question before payment.",
    ].filter(Boolean).join("\n");
    return `https://wa.me/${NUMBER}?text=${encodeURIComponent(text)}`;
  }, [name, topic, message]);

  return (
    <PageLayout>
      <SEOHead
        title="Contact AI Premium Shop | WhatsApp Support"
        description="Contact AI Premium Shop on WhatsApp for current plan, order and access questions. Do not send passwords, PINs, OTPs or unrelated financial credentials."
        canonical="https://aipremiumshop.com/contact"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />

      <div id="main-content" className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
        <header className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Direct order and support contact</div>
          <h1 className="text-3xl font-bold text-white md:text-5xl">Contact AI Premium Shop</h1>
          <p className="mt-4 text-base leading-7 text-slate-300">Use WhatsApp for current plan, order and support questions. Response time depends on current support load; do not rely on a fixed response-time promise.</p>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6 md:p-8">
            <h2 className="text-xl font-bold text-white">Prepare a WhatsApp message</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">This form does not silently submit data to AIPS. The button opens WhatsApp with the text you entered, where you can review it before sending.</p>
            <div className="mt-6 space-y-4">
              <label className="block"><span className="mb-2 block text-sm font-semibold text-white">Name <span className="font-normal text-slate-500">(optional)</span></span><input value={name} onChange={(event) => setName(event.target.value)} className="min-h-11 w-full rounded-xl border border-white/10 bg-[#0a0e27] px-4 py-3 text-sm text-white outline-none focus:border-[#f4b942]/50" placeholder="Your name" /></label>
              <label className="block"><span className="mb-2 block text-sm font-semibold text-white">Topic</span><select value={topic} onChange={(event) => setTopic(event.target.value)} className="min-h-11 w-full rounded-xl border border-white/10 bg-[#0a0e27] px-4 py-3 text-sm text-white outline-none focus:border-[#f4b942]/50"><option>Plan or pricing question</option><option>Order status</option><option>Access issue</option><option>Provider feature or limit</option><option>Refund or resolution question</option><option>Privacy or account handling</option></select></label>
              <label className="block"><span className="mb-2 block text-sm font-semibold text-white">Message <span className="font-normal text-slate-500">(optional)</span></span><textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={5} className="w-full rounded-xl border border-white/10 bg-[#0a0e27] px-4 py-3 text-sm text-white outline-none focus:border-[#f4b942]/50" placeholder="Product/plan, order context, or your question" /></label>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#008236] px-5 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Review and send in WhatsApp <ExternalLink className="h-3.5 w-3.5" /></a>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6"><h2 className="font-bold text-white">Do not send sensitive credentials</h2><p className="mt-3 text-sm leading-6 text-slate-300">Do not send banking PINs, OTPs, passwords, full card details or unrelated private information. For troubleshooting, use screenshots that mask sensitive data.</p></div>
            <div className="rounded-2xl border border-white/10 bg-[#151b3d] p-6"><h2 className="font-bold text-white">Before payment</h2><p className="mt-3 text-sm leading-6 text-slate-300">Confirm the exact product, plan, duration, published AIPS price, access model, availability, delivery ETA and applicable terms for the order.</p></div>
          </aside>
        </section>
      </div>
    </PageLayout>
  );
}
