import { buildMetadata } from "@/lib/seo/metadata";
import { FAQPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import { MessageCircle, ChevronRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "FAQ — AI Premium Shop Bangladesh",
  description:
    "Answers to common questions about ChatGPT Plus, Midjourney, Canva Pro, and more in Bangladesh. Payment, delivery, warranty, and Resolution Policy.",
  canonical: "https://aipremiumshop.com/faq",
});

const defaultFaqs = [
  {
    q: "How does delivery work?",
    a: "After you confirm your order on WhatsApp and send a payment screenshot, we verify the transaction and send your login credentials within 5–15 minutes. Personal Accounts take 2-4 hours due to individual setup. During peak hours (7 PM – 11 PM BST), delivery may take slightly longer.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bKash Send Money, Nagad Send Money, Rocket, and local bank cards (Visa/Mastercard via SSLCommerz). All payments are confirmed via WhatsApp screenshot for your security. We do not accept PayPal or international credit cards.",
  },
  {
    q: "Are the accounts original? Will my account get banned?",
    a: "Personal Accounts are set up through standard sign-up processes using legitimate payment methods. Shared slots are pre-registered accounts shared among a small group of users. We are an independent reseller with no direct affiliation with any brand. Shared slots carry a small risk if usage patterns trigger platform security — which is why we offer a 7-day replacement warranty. We confirm the exact account type before payment.",
  },
  {
    q: "What is your Resolution Policy?",
    a: "Full refund if service is not delivered within 2 hours. Partial refund (50%) if you change your mind within 6 hours and credentials are unused. No refund after 24 hours or once credentials are actively used. Shared plans include a 7-day replacement warranty if the service stops working.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes — all shared slot products come with a 7-day replacement warranty. If the service stops working within 7 days, we will replace the slot at no extra cost. Personal Accounts do not need a warranty because they are fully under your control.",
  },
  {
    q: "Can I use my own email address?",
    a: "For Personal Account products, you can use your own email. For shared slot products, the account is pre-registered. We confirm which option is available for your specific product on WhatsApp before you pay.",
  },
  {
    q: "Is my payment information secure?",
    a: "We never collect or store your bKash, Nagad, or bank card details. You pay directly through your mobile money app. We only need the transaction screenshot for verification. Your financial data never touches our servers.",
  },
  {
    q: "Do you provide invoices or receipts?",
    a: "Yes — we can provide a digital receipt for every purchase upon request. Message us on WhatsApp after your order is delivered and we will send a receipt with transaction details for your records.",
  },
  {
    q: "Can I upgrade or change my plan later?",
    a: "Yes — you can upgrade from a shared plan to a Personal Account at any time. We will calculate the price difference and apply it to your new plan. Contact us on WhatsApp to discuss plan changes.",
  },
  {
    q: "Do subscriptions auto-renew?",
    a: "No — we do not store your payment details or charge you automatically. Each month, we send a reminder on WhatsApp. You manually renew by sending payment again. This gives you full control over your spending.",
  },
  {
    q: "Do you support bulk orders for teams or agencies?",
    a: "Yes — we offer bulk pricing for agencies, design studios, development teams, and educational institutions. Contact us on WhatsApp with your requirements for a custom quote and dedicated support.",
  },
];

export default function FAQPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <>
      <FAQPageJsonLd
        items={defaultFaqs.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">FAQ</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Frequently asked questions</h1>
          <p className="mt-4 text-[1rem] leading-relaxed text-[#8a91a8]">
            Everything you need to know about ordering, payment, delivery, and support.
          </p>
          <p className="mt-2 text-[0.75rem] text-[#5b6280]">
            Last updated: <time dateTime="2026-05-20">20 May 2026</time>
          </p>

          <div className="mt-10 space-y-3">
            {defaultFaqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-colors open:border-[#f4b942]/15"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                  <span className="text-[0.9375rem] font-medium text-white">{faq.q}</span>
                  <ChevronRight className="size-4 text-[#5b6280] transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <div className="border-t border-white/[0.04] px-5 pb-4 pt-3">
                  <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 glass-card rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-white">Still have questions?</h2>
            <p className="mt-2 text-[0.875rem] text-[#8a91a8]">
              Our support team is available 24/7 on WhatsApp. We usually respond within minutes.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              className="btn-whatsapp inline-flex h-10 px-6 mt-6 text-[0.8125rem]"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
