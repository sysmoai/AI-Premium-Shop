import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageCircle, ShieldAlert, Sparkles } from "lucide-react";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getServiceOffer,
  getServiceOffers,
  servicePriceLabel,
  serviceWhatsappUrl,
} from "@/lib/data/services";

export function generateStaticParams() {
  return getServiceOffers().map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = getServiceOffer(slug);
  if (!offer) {
    return {
      title: "Service Not Found | AI Premium Shop",
      robots: { index: false, follow: false },
    };
  }

  return buildMetadata({
    title: `${offer.name} in Bangladesh — ${servicePriceLabel(offer)}`,
    description: offer.summary,
    canonical: `https://aipremiumshop.com/services/${offer.slug}`,
    keywords: [
      offer.name,
      `${offer.name} Bangladesh`,
      "AI Premium Shop services",
      "website development Bangladesh",
      "AI setup Bangladesh",
    ],
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offer = getServiceOffer(slug);
  if (!offer) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: offer.name, path: `/services/${offer.slug}` },
        ]}
      />
      <FAQPageJsonLd items={offer.faq} />

      <main className="min-h-screen">
        <section className="mx-auto max-w-5xl px-5 sm:px-8 py-12">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-[#8a91a8] hover:text-white">
            <ArrowLeft className="size-4" /> All services
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f4b942]">{offer.category}</p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-white">{offer.name}</h1>
              <p className="mt-5 text-lg leading-8 text-[#a6acc0]">{offer.summary}</p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#5b6280]">Package price</p>
                  <p className="mt-2 text-2xl font-bold text-[#f4b942]">{servicePriceLabel(offer)}</p>
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#5b6280]">Duration</p>
                  <p className="mt-2 text-sm leading-6 font-medium text-white">{offer.duration}</p>
                </div>
              </div>

              <section className="mt-12">
                <h2 className="text-2xl font-bold text-white">What you get</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex gap-3 rounded-lg border border-white/[0.06] bg-white/[0.025] p-4 text-sm text-[#c9ceda]">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#4ade80]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-12">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 text-[#f4b942]" />
                  <h2 className="text-2xl font-bold text-white">Best for</h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {offer.idealFor.map((item) => (
                    <span key={item} className="rounded-full border border-[#f4b942]/20 bg-[#f4b942]/[0.07] px-3 py-1.5 text-sm text-[#e7d19b]">
                      {item}
                    </span>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="size-5 text-[#f4b942]" />
                  <h2 className="text-2xl font-bold text-white">Important limits</h2>
                </div>
                <ul className="mt-4 space-y-3">
                  {offer.limitations.map((item) => (
                    <li key={item} className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-6 text-[#a6acc0]">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-12">
                <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
                <dl className="mt-5 space-y-4">
                  {offer.faq.map((item) => (
                    <div key={item.question} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                      <dt className="font-semibold text-white">{item.question}</dt>
                      <dd className="mt-2 text-sm leading-6 text-[#8a91a8]">{item.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 rounded-2xl border border-[#f4b942]/20 bg-[#f4b942]/[0.05] p-6">
              <p className="text-xs uppercase tracking-[0.12em] text-[#8a91a8]">Starting price</p>
              <p className="mt-2 text-3xl font-bold text-[#f4b942]">{servicePriceLabel(offer)}</p>
              <p className="mt-3 text-sm leading-6 text-[#a6acc0]">
                Final scope and third-party costs are confirmed before payment.
              </p>
              <a
                href={serviceWhatsappUrl(offer)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25d366] px-4 py-3 text-sm font-bold text-[#07240f] transition hover:brightness-110"
              >
                <MessageCircle className="size-4" /> Ask / Order on WhatsApp
              </a>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
