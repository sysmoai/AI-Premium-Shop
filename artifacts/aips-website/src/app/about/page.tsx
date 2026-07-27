import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { MessageCircle, MapPin, Mail, Phone, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "About Us — AI Premium Shop Bangladesh",
  description:
    "Learn about AI Premium Shop, Bangladesh's trusted premium subscription reseller. Founded by Emon Hossain in Dhaka. a growing community of customers since 2024.",
  canonical: "https://aipremiumshop.com/about",
});

export default function AboutPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">About</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">About AI Premium Shop</h1>

          <div className="mt-10 space-y-8">
            <p className="text-[1rem] leading-relaxed text-[#8a91a8]">
              <strong className="text-white">AI Premium Shop</strong> is Bangladesh&apos;s most
              trusted destination for premium digital subscriptions. Founded in 2024 by{" "}
              <strong className="text-white">Emon Hossain</strong> in Dhaka, we exist to solve
              a simple problem: Bangladeshi customers need access to world-class AI, design,
              productivity, and streaming tools — but international payment barriers make direct
              purchases frustrating or impossible.
            </p>

            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white">Our story</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#8a91a8]">
                It started with a single problem: friends and classmates in Dhaka wanted ChatGPT Plus
                and Midjourney but could not pay with local cards. Emon Hossain built AI Premium Shop
                to bridge that gap — one subscription at a time. Today, we serve a growing community of customers
                across Bangladesh, from students in Rajshahi to agencies in Gulshan.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white">Our mission</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#8a91a8]">
                We believe that access to premium digital tools should not depend on whether you own
                a foreign credit card. Every freelancer, student, designer, developer, and business
                owner in Bangladesh deserves the same tools that power global competitors.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Why customers trust us</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Local payment — bKash, Nagad, Rocket, and local bank cards",
                  "Speed — 5-15 minute average delivery via WhatsApp",
                  "Human support — Real Bangladeshi support staff, not chatbots",
                  "Warranty — 7-day replacement on shared slots",
                  "Transparency — No hidden fees; price confirmed before payment",
                  "Privacy — We never store your payment details",
                  "Choice — 86+ products across 8 categories",
                  "Flexibility — Upgrade anytime from shared to Personal Account",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.875rem] text-[#8a91a8]">
                    <CheckCircle2 className="size-4 text-[#f4b942] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white">Contact</h2>
              <p className="mt-2 text-[0.875rem] text-[#5b6280]">
                Online-only store. No physical storefront. We operate 100% via WhatsApp and email.
              </p>
              <ul className="mt-5 space-y-3">
                <li className="flex items-center gap-3 text-[0.875rem] text-[#8a91a8]">
                  <MessageCircle className="size-4 text-[#25d366]" />
                  <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#f4b942] transition">+880 1865-385348</a>
                </li>
                <li className="flex items-center gap-3 text-[0.875rem] text-[#8a91a8]">
                  <Mail className="size-4 text-[#f4b942]" />
                  <a href="mailto:hello@aipremiumshop.com" className="hover:text-[#f4b942] transition">hello@aipremiumshop.com</a>
                </li>
                <li className="flex items-center gap-3 text-[0.875rem] text-[#8a91a8]">
                  <Phone className="size-4 text-[#f4b942]" />
                  <span>+880 1865-385348</span>
                </li>
                <li className="flex items-center gap-3 text-[0.875rem] text-[#8a91a8]">
                  <MapPin className="size-4 text-[#f4b942]" />
                  <span>Dhaka, Bangladesh</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
