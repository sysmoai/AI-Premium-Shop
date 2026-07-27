import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Canva Pro vs Adobe Firefly in Bangladesh — Best AI Design Tool?",
  description:
    "Compare Canva Pro and Adobe Firefly for Bangladeshi creators. Templates vs generative AI. Prices in BDT. Buy with bKash/Nagad. 5-15 min delivery.",
  canonical: "https://aipremiumshop.com/canva-vs-adobe",
});

const faqItems = [
  {
    question: "Which is better for social media content in Bangladesh?",
    answer:
      "Canva Pro is the better choice for social media content because it offers 100M+ templates, Magic Studio AI, and a drag-and-drop interface that requires no design skills. Adobe Firefly excels at generative AI tasks like generative fill and text-to-image but is more suited to advanced creative workflows.",
  },
  {
    question: "Can I pay for Canva Pro or Adobe Firefly with bKash?",
    answer:
      "Neither Canva nor Adobe accepts bKash directly. AI Premium Shop is a local reseller in Bangladesh — you pay us via bKash, Nagad, or Rocket and receive your subscription within 5-15 minutes on WhatsApp.",
  },
  {
    question: "Is Adobe Firefly included in Photoshop?",
    answer:
      "Adobe Firefly powers generative AI features inside Photoshop, Illustrator, and Express. The Firefly subscription we offer includes generative credits that can be used across all Adobe Creative Cloud apps with AI features.",
  },
  {
    question: "Which one should I choose as a beginner?",
    answer:
      "Canva Pro is the clear winner for beginners. It requires zero design experience, has thousands of templates sized for Bangladeshi social platforms, and includes AI writing and background removal. Adobe Firefly is better for designers who already know Adobe tools.",
  },
  {
    question: "Can I use these tools for commercial client work?",
    answer:
      "Yes. Both Canva Pro and Adobe Firefly include commercial usage rights. Canva Pro allows commercial use for client projects. Adobe Firefly is trained on commercially safe data, making it ideal for commercial work without copyright concerns.",
  },
];

export default function CanvaVsAdobePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";

  return (
    <>
      <FAQPageJsonLd items={faqItems} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Canva vs Adobe Firefly", path: "/canva-vs-adobe" },
        ]}
      />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Comparison</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Canva Pro vs Adobe Firefly</h1>
          <p className="mt-4 text-[1rem] leading-relaxed text-[#8a91a8]">
            A detailed comparison for Bangladeshi creators deciding between Canva Pro and Adobe Firefly. Both use AI — but for very different workflows.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-[0.875rem]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="py-3 pr-4 text-left font-semibold text-[#5b6280]">Feature</th>
                  <th className="py-3 px-4 text-left font-semibold text-white">Canva Pro</th>
                  <th className="py-3 pl-4 text-left font-semibold text-white">Adobe Firefly</th>
                </tr>
              </thead>
              <tbody className="text-[#8a91a8]">
                {[
                  ["Price (BDT/month)", "৳499 – ৳1,990/mo", "৳599 – ৳2,490/mo"],
                  ["Best for", "Social media, presentations, quick designs", "Generative AI, professional photo editing"],
                  ["Ease of use", "Very easy — drag & drop", "Moderate — requires Adobe knowledge"],
                  ["Templates", "100M+ built-in", "Adobe Stock (separate subscription)"],
                  ["AI image generation", "Magic Media (basic)", "Firefly — industry-leading generative fill"],
                  ["Text in images", "Limited", "Excellent with Photoshop integration"],
                  ["Video editing", "Canva Video (basic)", "Premiere Pro integration (separate)"],
                  ["Commercial safety", "Standard license", "Trained on safe data — no copyright risk"],
                  ["Best for Bangladeshi creators", "Social media managers, small businesses", "Professional designers, agencies"],
                ].map(([feature, canva, adobe]) => (
                  <tr key={feature} className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-[#5b6280]">{feature}</td>
                    <td className="py-3 px-4">{canva}</td>
                    <td className="py-3 pl-4">{adobe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 glass-card rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white">Which one should you choose?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-[#f4b942]">Choose Canva Pro if…</h3>
                <ul className="mt-2 space-y-1 text-[0.8125rem] text-[#8a91a8]">
                  <li>You manage social media for businesses</li>
                  <li>You need designs fast without learning curves</li>
                  <li>You want templates for Facebook, Instagram, LinkedIn</li>
                  <li>You are a small business owner or marketer</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#f4b942]">Choose Adobe Firefly if…</h3>
                <ul className="mt-2 space-y-1 text-[0.8125rem] text-[#8a91a8]">
                  <li>You are a professional designer or photographer</li>
                  <li>You need generative fill and AI photo editing</li>
                  <li>You already use Photoshop or Illustrator</li>
                  <li>You need commercially safe AI-generated content</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi AI Premium Shop, I want Canva Pro.")}`} className="btn-whatsapp h-10 px-6 text-[0.8125rem]">
              Order Canva Pro
              <ArrowRight className="size-4" />
            </a>
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi AI Premium Shop, I want Adobe Firefly.")}`} className="btn-primary h-10 px-6 text-[0.8125rem]">
              Order Adobe Firefly
              <ArrowRight className="size-4" />
            </a>
          </div>

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
            <dl className="mt-6 space-y-4">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-white/[0.06] glass-card p-6 transition hover:border-[#f4b942]/20"
                >
                  <dt className="text-lg font-semibold text-white">{item.question}</dt>
                  <dd className="mt-2 leading-7 text-[#8a91a8]">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </section>
      </main>
    </>
  );
}
