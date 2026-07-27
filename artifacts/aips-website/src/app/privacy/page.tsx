import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy — AI Premium Shop Bangladesh",
  description:
    "Read the privacy policy of AI Premium Shop. We never store your bKash, Nagad, or card details. Your data stays private.",
  canonical: "https://aipremiumshop.com/privacy",
});

export default function PrivacyPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Legal</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-[0.875rem] text-[#5b6280]">Last updated: 20 May 2026</p>

          <div className="mt-10 space-y-8 text-[0.9375rem] leading-relaxed text-[#8a91a8]">
            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">1. What information we collect</h2>
              <p className="mt-3">
                We collect only the information necessary to deliver your order: your WhatsApp number,
                the product you ordered, and your payment screenshot for verification. We do not collect
                or store your bKash, Nagad, Rocket, or bank card details.
              </p>
            </section>

            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">2. How we use your information</h2>
              <p className="mt-3">
                Your information is used solely to process your order and provide customer support.
                We do not sell, rent, or share your personal information with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">3. Payment security</h2>
              <p className="mt-3">
                All payments are made directly through your mobile banking app (bKash, Nagad, Rocket).
                We only require a transaction screenshot for verification. We never handle or store your
                financial credentials.
              </p>
            </section>

            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">4. Data retention</h2>
              <p className="mt-3">
                We retain order records for up to 12 months for warranty and dispute resolution purposes.
                After this period, all personal data associated with your order is permanently deleted.
              </p>
            </section>

            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">5. Your rights</h2>
              <p className="mt-3">
                You have the right to request access to, correction of, or deletion of your personal data.
                Contact us on WhatsApp at +880 1865-385348 to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-[1.125rem] font-semibold text-white">6. Contact</h2>
              <p className="mt-3">
                For privacy-related inquiries, contact us via WhatsApp at{" "}
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
