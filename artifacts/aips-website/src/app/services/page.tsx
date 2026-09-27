import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getServiceOffers, servicePriceLabel, serviceWhatsappUrl } from "@/lib/data/services";

export const metadata: Metadata = buildMetadata({
  title: "AI, Website, SEO & Automation Services in Bangladesh",
  description:
    "Explore AI Premium Shop service packages for API setup, AI-assisted development, websites, e-commerce, automation, SEO, maintenance and content production.",
  canonical: "https://aipremiumshop.com/services",
});

export default function ServicesPage() {
  const offers = getServiceOffers();
  const faqs = [
    {
      question: "Are third-party AI, domain and hosting costs included?",
      answer:
        "Only when a quotation explicitly says they are included. Paid AI/API usage, domains, premium software, payment gateways and other third-party costs are otherwise separate.",
    },
    {
      question: "Can AI Premium Shop build the complete website for me?",
      answer:
        "Yes. You can choose a full website package where we handle design, development, deployment and handover, or a Developer Full Setup where we prepare your computer so you can build and edit with AI assistance yourself.",
    },
    {
      question: "Do you guarantee SEO rankings, leads or sales?",
      answer:
        "No. We provide technical SEO, search-readiness and growth foundations, but search rankings, traffic, leads and revenue depend on many external factors and cannot be guaranteed.",
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <FAQPageJsonLd items={faqs} />

      <main className="min-h-screen">
        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
          <div className="max-w-3xl">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">
              AI Premium Shop Services
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
              Build, automate and grow with a practical AI-ready stack
            </h1>
            <p className="mt-4 text-lg leading-7 text-[#8a91a8]">
              Choose a ready package or ask us to scope a custom solution. We can set up your development
              environment, build the full website, deploy it, connect lead flows, and prepare the site for search.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {offers.map((offer) => (
              <article
                key={offer.slug}
                className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.6875rem] uppercase tracking-[0.13em] text-[#5b6280]">{offer.category}</p>
                    <h2 className="mt-2 text-xl font-bold text-white">{offer.name}</h2>
                  </div>
                  {offer.featured && (
                    <span className="rounded-full border border-[#f4b942]/25 bg-[#f4b942]/10 px-2.5 py-1 text-[0.6875rem] font-semibold text-[#f4b942]">
                      Popular
                    </span>
                  )}
                </div>

                <p className="mt-4 text-2xl font-bold text-[#f4b942]">{servicePriceLabel(offer)}</p>
                <p className="mt-3 text-sm leading-6 text-[#8a91a8]">{offer.summary}</p>

                <ul className="mt-5 space-y-2">
                  {offer.features.slice(0, 5).map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-[#c9ceda]">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#4ade80]/80" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 flex gap-3">
                  <Link
                    href={`/services/${offer.slug}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5"
                  >
                    View details <ArrowRight className="size-4" />
                  </Link>
                  <a
                    href={serviceWhatsappUrl(offer)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ask about ${offer.name} on WhatsApp`}
                    className="inline-flex items-center justify-center rounded-lg bg-[#25d366] px-3.5 text-[#07240f] transition hover:brightness-110"
                  >
                    <MessageCircle className="size-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-16 rounded-2xl border border-[#f4b942]/15 bg-[#f4b942]/[0.04] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-2 text-[#f4b942]">
                  <Sparkles className="size-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.12em]">Not sure which package fits?</span>
                </div>
                <h2 className="mt-3 text-2xl font-bold text-white">Tell us what you want to build.</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#c9ceda]">
                  We will separate the required setup, one-time build cost, recurring provider cost and optional
                  maintenance so you know exactly what you are paying for.
                </p>
              </div>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent(
                  "Hi AI Premium Shop, I need help choosing the right website/AI service package."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold"
              >
                <MessageCircle className="size-4" /> Get a recommendation
              </a>
            </div>
          </section>

          <section className="mt-16">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-[#f4b942]" />
              <h2 className="text-2xl font-bold text-white">Clear commercial boundaries</h2>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#8a91a8]">
              Package prices cover the stated AIPS service scope. Paid third-party products, provider usage,
              domains, premium plugins/software and gateway/platform fees are separate unless the final quotation
              explicitly includes them.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
            <dl className="mt-6 space-y-4">
              {faqs.map((item) => (
                <div key={item.question} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                  <dt className="font-semibold text-white">{item.question}</dt>
                  <dd className="mt-2 text-sm leading-6 text-[#8a91a8]">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </section>
      </main>
    </>
  );
}
