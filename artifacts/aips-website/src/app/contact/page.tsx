import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import { MessageCircle, Mail, Phone, MapPin, Clock, ChevronRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Contact — AI Premium Shop Bangladesh",
  description:
    "Contact AI Premium Shop via WhatsApp, email, or phone. Based in Dhaka, Bangladesh. 24/7 support for AI subscriptions and premium tools.",
  canonical: "https://aipremiumshop.com/contact",
});

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  const channels = [
    {
      icon: MessageCircle,
      title: "WhatsApp (Fastest)",
      desc: "24/7 human support for orders and questions. Average response time: under 5 minutes.",
      action: { label: "Chat on WhatsApp", href: whatsappUrl, style: "whatsapp" as const },
    },
    {
      icon: Mail,
      title: "Email",
      desc: "For business inquiries, partnerships, and media. Response time: 12-24 hours.",
      action: { label: "hello@aipremiumshop.com", href: "mailto:hello@aipremiumshop.com", style: "link" as const },
    },
    {
      icon: Phone,
      title: "Phone / WhatsApp Call",
      desc: "Voice and WhatsApp calls accepted during business hours (7 AM – 12 AM BST).",
      action: { label: "+880 1865-385348", href: `tel:+${whatsappNumber}`, style: "text" as const },
    },
    {
      icon: Clock,
      title: "Business hours",
      desc: "We process orders around the clock. Peak response time: 7 AM – 12 AM BST. Orders outside these hours are queued for morning delivery.",
      action: null,
    },
  ];

  const miniFaq = [
    {
      q: "I paid but haven't received my order. What should I do?",
      a: "First, check your WhatsApp — we may have sent credentials that were marked as read. If not, message us again with your transaction ID. We deliver within 2 hours or provide a full refund.",
    },
    {
      q: "Can I get a refund if I change my mind?",
      a: "Yes — full refund if not delivered within 2 hours. 50% partial refund if you request within 6 hours and credentials are unused. No refund after 24 hours or once actively used.",
    },
    {
      q: "How do I report a problem with my subscription?",
      a: "Message us on WhatsApp with your order details. For shared slots, we offer 7-day replacement warranty. For Personal Accounts, we provide setup support and troubleshooting.",
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Contact</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Contact AI Premium Shop</h1>
          <p className="mt-4 text-[1rem] leading-relaxed text-[#8a91a8]">
            Have a question about a product, payment, or delivery? Reach out — we reply fast.
          </p>

          <div className="mt-10 grid gap-4">
            {channels.map((c) => (
              <div key={c.title} className="glass-card rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f4b942]/20 to-[#f4b942]/5 border border-[#f4b942]/10 shrink-0">
                    <c.icon className="size-5 text-[#f4b942]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-[1rem] font-semibold text-white">{c.title}</h2>
                    <p className="mt-1 text-[0.8125rem] text-[#5b6280]">{c.desc}</p>
                    {c.action && (
                      <div className="mt-3">
                        {c.action.style === "whatsapp" ? (
                          <a href={c.action.href} target="_blank" rel="noopener noreferrer" className="btn-whatsapp h-9 px-4 text-[0.8125rem]">
                            <MessageCircle className="size-4" />
                            {c.action.label}
                          </a>
                        ) : c.action.style === "link" ? (
                          <a href={c.action.href} className="text-[0.8125rem] font-medium text-[#f4b942] hover:underline">
                            {c.action.label}
                          </a>
                        ) : (
                          <p className="text-[0.8125rem] font-medium text-white">{c.action.label}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <section className="mt-12">
            <h2 className="text-xl font-bold text-white">Common support questions</h2>
            <div className="mt-6 space-y-3">
              {miniFaq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-colors open:border-[#f4b942]/15"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                    <span className="text-[0.9375rem] font-medium text-white">{item.q}</span>
                    <ChevronRight className="size-4 text-[#5b6280] transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="border-t border-white/[0.04] px-5 pb-4 pt-3">
                    <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
