import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  Star,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  getProductGroups,
  getProductBySlug,
  getRelatedProducts,
  getCategoryLabel,
  getWhatsappUrl,
} from "@/lib/data/products";
import type { LiveProduct, ProductGroup } from "@/lib/data/products";
import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, ProductJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";

const USD_TO_BDT = 110;

export function generateStaticParams() {
  return getProductGroups().map((g) => ({ slug: g.slug }));
}

/** Percentage saved against the official USD price of the cheapest variant. */
function computeSavings(group: ProductGroup): number {
  const anchor = group.variants.find((v) => v.officialUSD && v.officialUSD > 0);
  if (!anchor?.officialUSD) return 0;
  const officialBdt = anchor.officialUSD * USD_TO_BDT;
  return Math.max(0, Math.round(((officialBdt - anchor.price) / officialBdt) * 100));
}

function priceLabel(group: ProductGroup): string {
  return group.minPrice === group.maxPrice
    ? `৳${group.minPrice.toLocaleString("en-US")}`
    : `৳${group.minPrice.toLocaleString("en-US")} – ৳${group.maxPrice.toLocaleString("en-US")}`;
}

/** The variant carrying the richest enrichment, used for page-level copy. */
function primaryVariant(group: ProductGroup): LiveProduct {
  const score = (v: LiveProduct) =>
    (v.faq?.length ? 2 : 0) +
    (v.useCases?.length ? 1 : 0) +
    (v.whyBuyFromAIPS ? 1 : 0) +
    (v.trust ? 1 : 0) +
    (v.seo ? 1 : 0);
  return [...group.variants].sort((a, b) => score(b) - score(a))[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const group = getProductBySlug(slug);
  if (!group) {
    return {
      title: "Product Not Found | AI Premium Shop",
      robots: { index: false, follow: false },
    };
  }

  const main = primaryVariant(group);
  const seo = main.seo;

  return buildMetadata({
    title: seo?.title ?? `${group.name} price in Bangladesh — from ৳${group.minPrice}`,
    description:
      seo?.metaDescription ??
      `${group.name} in Bangladesh from ৳${group.minPrice}/mo at AI Premium Shop. Pay with bKash or Nagad. Delivery in ${main.deliverySLA}.`,
    canonical: seo?.canonical ?? `https://aipremiumshop.com/products/${slug}`,
    ogImage: seo?.ogImage,
    keywords:
      seo?.keywords ?? [
        `${group.name} Bangladesh`,
        `${group.name} price BD`,
        `${group.name} bKash`,
        `buy ${group.name} Nagad`,
        `${group.brand} subscription Bangladesh`,
      ],
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const group = getProductBySlug(slug);
  if (!group) notFound();

  const main = primaryVariant(group);
  const savings = computeSavings(group);
  const related = getRelatedProducts(slug, group.category, 4);
  const categoryLabel = getCategoryLabel(group.category);
  const faq = main.faq ?? [];

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: group.name, path: `/products/${slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ProductJsonLd
        name={group.name}
        description={group.description}
        slug={slug}
        priceBdt={group.minPrice}
        comparePriceBdt={
          main.officialUSD ? Math.round(main.officialUSD * USD_TO_BDT) : undefined
        }
        brandName={group.brand}
        categoryName={categoryLabel}
      />
      {faq.length > 0 && (
        <FAQPageJsonLd items={faq.map((f) => ({ question: f.q, answer: f.a }))} />
      )}

      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-8 pb-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[0.8125rem] text-[#5b6280]"
          >
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/products" className="hover:text-white transition">
              Products
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-white">{group.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-12">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {main.icon && (
                  <span aria-hidden="true" className="text-3xl">
                    {main.icon}
                  </span>
                )}
                <Link
                  href={`/category/${group.category}`}
                  className="text-[0.8125rem] font-medium text-[#f4b942] hover:text-white transition"
                >
                  {categoryLabel}
                </Link>
                {main.badge && (
                  <span className="rounded-full border border-[#f4b942]/30 bg-[#f4b942]/10 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-[#f4b942]">
                    {main.badge}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                {group.name} in Bangladesh
              </h1>
              <p className="text-[0.9375rem] text-[#8a91a8] mb-2">
                by {group.provider}
                {group.provider !== group.brand && ` · ${group.brand}`}
              </p>

              {main.trust?.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < Math.round(main.trust!.rating!)
                            ? "size-4 fill-[#f4b942] text-[#f4b942]"
                            : "size-4 text-[#3a4060]"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[0.8125rem] text-[#8a91a8]">
                    {main.trust.rating.toFixed(1)}
                    {main.trust.reviewCount
                      ? ` · ${main.trust.reviewCount.toLocaleString("en-US")} reviews`
                      : ""}
                  </span>
                </div>
              )}

              <p className="text-base sm:text-lg leading-relaxed text-[#c3c8da] mb-4">
                {group.description}
              </p>
              {main.descriptionBN && (
                <p lang="bn" className="text-[0.9375rem] leading-relaxed text-[#8a91a8]">
                  {main.descriptionBN}
                </p>
              )}
            </div>

            {/* Price / CTA card */}
            <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-[0.8125rem] text-[#5b6280] mb-1">
                {group.variants.length > 1 ? "Plans from" : "Price"}
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-[#f4b942] mb-1">
                {priceLabel(group)}
                <span className="ml-1 text-base font-medium text-[#8a91a8]">/mo</span>
              </p>
              {savings > 0 && main.officialUSD > 0 && (
                <p className="text-[0.8125rem] text-[#4ade80] mb-4">
                  Save ~{savings}% vs official ${main.officialUSD}/mo
                </p>
              )}

              <a
                href={getWhatsappUrl(main)}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25d366] px-5 py-3 font-semibold text-[#07240f] transition hover:brightness-110"
              >
                <MessageCircle className="size-4" />
                Order via WhatsApp
              </a>

              <ul className="mt-5 space-y-2 text-[0.8125rem] text-[#8a91a8]">
                <li className="flex items-center gap-2">
                  <Clock className="size-3.5 text-[#f4b942]/70" />
                  Delivery in {main.deliverySLA}
                </li>
                {main.trust?.warrantyDays && (
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="size-3.5 text-[#f4b942]/70" />
                    {main.trust.warrantyDays}-day warranty
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-[#f4b942]/70" />
                  bKash · Nagad accepted
                </li>
              </ul>
            </aside>
          </div>
        </section>

        {/* Plans / variants */}
        {group.variants.length > 1 && (
          <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-14">
            <h2 className="text-2xl font-bold text-white mb-5">
              Choose your {group.name} plan
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.variants.map((v) => (
                <div
                  key={v.id}
                  className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-[0.9375rem] font-semibold text-white">{v.tier}</p>
                  <p className="mt-1 text-[0.75rem] uppercase tracking-wide text-[#5b6280]">
                    {v.accessType} access
                  </p>
                  <p className="mt-3 text-2xl font-bold text-[#f4b942]">
                    ৳{v.price.toLocaleString("en-US")}
                    <span className="ml-1 text-sm font-medium text-[#8a91a8]">/mo</span>
                  </p>
                  {v.officialUSD > 0 && (
                    <p className="mt-1 text-[0.75rem] text-[#5b6280]">
                      official ${v.officialUSD}/mo
                    </p>
                  )}
                  <a
                    href={getWhatsappUrl(v)}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-[#25d366]/40 bg-[#25d366]/10 px-4 py-2.5 text-[0.875rem] font-semibold text-[#25d366] transition hover:bg-[#25d366]/20"
                  >
                    <MessageCircle className="size-3.5" />
                    Order {v.tier}
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Capabilities */}
        {group.capabilities.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-14">
            <h2 className="text-2xl font-bold text-white mb-5">What you can do</h2>
            <div className="flex flex-wrap gap-2">
              {group.capabilities.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[0.8125rem] text-[#c3c8da]"
                >
                  {c}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Use cases */}
        {main.useCases && main.useCases.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-14">
            <h2 className="text-2xl font-bold text-white mb-5">Popular use cases</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {main.useCases.map((u, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-[0.9375rem] text-[#c3c8da]"
                >
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-[#f4b942]/70" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Why buy from AIPS */}
        {main.whyBuyFromAIPS && (
          <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-14">
            <div className="rounded-2xl border border-[#f4b942]/20 bg-[#f4b942]/[0.06] p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white mb-3">
                Why buy from AI Premium Shop
              </h2>
              <p className="text-[0.9375rem] leading-relaxed text-[#c3c8da]">
                {main.whyBuyFromAIPS}
              </p>
              {main.uniqueSellingPoints && main.uniqueSellingPoints.length > 0 && (
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {main.uniqueSellingPoints.map((p, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-[0.875rem] text-[#c3c8da]"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#4ade80]/80" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* How it works */}
        {main.howItWorksSteps && main.howItWorksSteps.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-14">
            <h2 className="text-2xl font-bold text-white mb-5">How it works</h2>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {main.howItWorksSteps.map((s, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <span className="text-[0.75rem] font-semibold text-[#f4b942]">
                    Step {i + 1}
                  </span>
                  <p className="mt-1.5 font-semibold text-white">{s.title}</p>
                  <p className="mt-1 text-[0.875rem] text-[#8a91a8]">{s.desc}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Price comparison */}
        {main.competitorCompare && main.competitorCompare.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-14">
            <h2 className="text-2xl font-bold text-white mb-5">
              How this compares
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[540px] text-left text-[0.875rem]">
                <thead className="bg-white/5 text-[0.75rem] uppercase tracking-wide text-[#5b6280]">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Seller</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Price</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {main.competitorCompare.map((c, i) => (
                    <tr key={i} className="border-t border-white/10">
                      <td className="px-4 py-3 font-medium text-white">{c.seller}</td>
                      <td className="px-4 py-3 text-[#c3c8da]">{c.price}</td>
                      <td className="px-4 py-3 text-[#8a91a8]">{c.risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faq.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-14">
            <h2 className="text-2xl font-bold text-white mb-5">
              {group.name} — frequently asked questions
            </h2>
            <div className="space-y-3">
              {faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 font-semibold text-white">
                    {item.q}
                    <ChevronRight className="size-4 shrink-0 text-[#5b6280] transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#8a91a8]">
                    {item.a}
                  </p>
                  {item.aBN && (
                    <p
                      lang="bn"
                      className="mt-2 text-[0.875rem] leading-relaxed text-[#5b6280]"
                    >
                      {item.aBN}
                    </p>
                  )}
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Refund / warranty note */}
        {main.trust?.refundPolicy && (
          <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-14">
            <div className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-5">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#f4b942]/70" />
              <div>
                <p className="font-semibold text-white">Warranty &amp; refunds</p>
                <p className="mt-1 text-[0.875rem] text-[#8a91a8]">
                  {main.trust.refundPolicy}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
            <h2 className="text-2xl font-bold text-white mb-5">You might also like</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/products/${r.slug}`}
                  className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-[#f4b942]/30"
                >
                  <p className="font-semibold text-white group-hover:text-[#f4b942] transition">
                    {r.name}
                  </p>
                  <p className="mt-1 text-[0.75rem] text-[#5b6280]">
                    {getCategoryLabel(r.category)}
                  </p>
                  <p className="mt-3 text-[0.9375rem] font-semibold text-[#f4b942]">
                    from ৳{r.minPrice.toLocaleString("en-US")}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Closing CTA */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-24">
          <div className="rounded-2xl border border-[#f4b942]/20 bg-gradient-to-r from-[#f4b942]/10 to-[#E2136E]/10 p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to get {group.name}?
            </h2>
            <p className="text-[0.9375rem] text-[#8a91a8] mb-6">
              Order on WhatsApp and pay with bKash or Nagad. Delivery in{" "}
              {main.deliverySLA}.
            </p>
            <a
              href={getWhatsappUrl(main)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25d366] px-6 py-3.5 font-semibold text-[#07240f] transition hover:brightness-110"
            >
              <MessageCircle className="size-4" />
              Order via WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
