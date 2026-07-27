import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service — AI Premium Shop Bangladesh",
  description:
    "Read the terms of service for AI Premium Shop. Resolution Policy, warranty, and usage conditions for premium subscriptions in Bangladesh.",
  canonical: "https://aipremiumshop.com/terms",
});

export default function TermsPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Legal</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-4 text-[0.875rem] text-[#5b6280]">Last updated: 20 May 2026</p>

          <div className="mt-10 space-y-8 text-[0.9375rem] leading-relaxed text-[#8a91a8]">
            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">1. Service description</h2>
              <p className="mt-3">
                AI Premium Shop provides access to premium digital subscriptions for customers in Bangladesh.
                We are an independent reseller and are not affiliated with, endorsed by, or sponsored by
                any of the brands we offer. We are an independent reseller with no direct affiliation with any company.
              </p>
            </section>

            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">2. Account types</h2>
              <p className="mt-3">
                We offer both Personal Account setup guidance and shared slot access depending on the product.
                The exact account type is confirmed with you on WhatsApp before payment. Shared slot
                products come with a 7-day warranty.
              </p>
            </section>

            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">3. Payment</h2>
              <p className="mt-3">
                All payments must be made via bKash, Nagad, Rocket, or local bank card. The full amount
                must be paid before delivery. We do not accept PayPal, international credit cards, or cash on delivery.
              </p>
            </section>

            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">4. Delivery</h2>
              <p className="mt-3">
                Delivery is typically completed within 5–15 minutes after payment confirmation via WhatsApp.
                During peak hours (7 PM – 11 PM BST), delivery may take up to 1 hour.
              </p>
            </section>

            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">5. Resolution policy (refunds)</h2>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>Full refund if service is not delivered within 2 hours.</li>
                <li>Partial refund (50%) if you change your mind within 6 hours and credentials are unused.</li>
                <li>No refund after 24 hours or once credentials are used.</li>
                <li>Refund requests must be made via WhatsApp with your order details.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">6. Warranty</h2>
              <p className="mt-3">
                Shared slot products come with a 7-day warranty from the date of delivery.
                If the service stops working within this period, we will replace the slot at no extra cost.
                Warranty claims must be submitted via WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">7. Prohibited use</h2>
              <p className="mt-3">
                You may not resell, share, or transfer purchased credentials to third parties.
                Violation of this policy will result in immediate termination of service without refund.
              </p>
            </section>

            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">8. Changes to terms</h2>
              <p className="mt-3">
                We may update these terms at any time. Continued use of our service after changes
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">9. Contact</h2>
              <p className="mt-3">
                For questions about these terms, contact us via WhatsApp at{" "}
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}`} className="text-[#f4b942] hover:underline">+880 1865-385348</a>
                {" or email "}
                <a href="mailto:hello@aipremiumshop.com" className="text-[#f4b942] hover:underline">hello@aipremiumshop.com</a>.
              </p>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
