import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Midjourney vs Leonardo AI in Bangladesh — Best AI Image Generator?",
  description:
    "Compare Midjourney and Leonardo AI for Bangladeshi designers and creators. Artistic quality vs versatile models. Prices in BDT. Buy with bKash/Nagad.",
  canonical: "https://aipremiumshop.com/midjourney-vs-leonardo",
});

const faqItems = [
  {
    question: "Which AI image generator is best for Bangladeshi freelancers?",
    answer:
      "Midjourney is best for freelancers who need stunning artistic and photorealistic images for client work. Leonardo AI is better for creators who want more control over the AI model, style, and generation parameters, and who need video generation alongside images.",
  },
  {
    question: "Can I pay for Midjourney or Leonardo AI with bKash?",
    answer:
      "Neither Midjourney nor Leonardo AI accepts bKash directly. AI Premium Shop is a local reseller in Bangladesh — you pay us via bKash, Nagad, or Rocket and receive your subscription within 5-15 minutes on WhatsApp.",
  },
  {
    question: "Does Leonardo AI have a free plan?",
    answer:
      "Leonardo AI offers a limited free tier with daily tokens. However, the free plan has restrictions on commercial use and generation speed. Our shared plans at ৳499/mo give you full access without the free-tier limits.",
  },
  {
    question: "Which one is better for game art and concept design?",
    answer:
      "Both are excellent for game art. Midjourney produces more polished, production-ready concept art with a single prompt. Leonardo AI offers more granular control with multiple AI models (including fine-tuned models) which is ideal for art directors who need precise style matching.",
  },
  {
    question: "Can I use these tools for e-commerce product photos?",
    answer:
      "Yes. Midjourney excels at creating lifestyle product shots and marketing visuals. Leonardo AI is better for generating product mockups and backgrounds because it offers more control over composition and lighting through its advanced settings.",
  },
];

export default function MidjourneyVsLeonardoPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";

  return (
    <>
      <FAQPageJsonLd items={faqItems} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Midjourney vs Leonardo AI", path: "/midjourney-vs-leonardo" },
        ]}
      />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Comparison</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Midjourney vs Leonardo AI</h1>
          <p className="mt-4 text-[1rem] leading-relaxed text-[#8a91a8]">
            A detailed comparison for Bangladeshi creators and designers deciding between Midjourney and Leonardo AI for image and video generation.
          </p>

          {/* AIO Answer Block */}
          <div className="mt-6 p-4 rounded-xl border border-[#f4b942]/10 bg-[#f4b942]/[0.03]">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#f4b942]">Quick Answer</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-[#c9ceda]">
              <strong>Midjourney (from BDT 1,199/mo)</strong> is the premium choice for highest-quality artistry and photorealism.
              <strong>Leonardo AI (from BDT 599/mo)</strong> is the budget-friendly alternative with character consistency and 3D-to-image features.
              Both available at AI Premium Shop with bKash/Nagad payment — no international card needed.
            </p>
          </div>

          {/* Bangla block */}
          <div className="mt-6 p-4 rounded-xl border border-white/[0.04] bg-white/[0.02]">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280] mb-2">বাংলা</p>
            <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">
              <strong>Midjourney (BDT 1,199/মাস থেকে)</strong> — প্রিমিয়াম কোয়ালিটি, ফটোরিয়েলিস্টিক ও আর্টিস্টিক ইমেজের জন্য সেরা।
              <strong>Leonardo AI (BDT 599/মাস থেকে)</strong> — বাজেট-বান্ধব, ক্যারেক্টার কনসিসটেন্সি ও 3D-টু-ইমেজ ফিচারসহ।
              bKash/Nagad দিয়ে পেমেন্ট, আন্তর্জাতিক কার্ড লাগবে না।
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-[0.875rem]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="py-3 pr-4 text-left font-semibold text-[#5b6280]">Feature</th>
                  <th className="py-3 px-4 text-left font-semibold text-white">Midjourney</th>
                  <th className="py-3 pl-4 text-left font-semibold text-white">Leonardo AI</th>
                </tr>
              </thead>
              <tbody className="text-[#8a91a8]">
                {[
                  ["Price (BDT/month)", "৳1,199 – ৳17,940/mo", "৳599 – ৳2,990/mo"],
                  ["Shared plan entry", "৳1,199/mo (Standard)", "৳599/mo (Apprentice Shared)"],
                  ["Personal plan", "৳3,990/mo (Standard)", "৳2,990/mo (Personal)"],
                  ["Image quality", "Best-in-class artistic & photorealistic", "Excellent — multiple model options"],
                  ["Text in images", "Often garbled", "Good — better than Midjourney"],
                  ["Video generation", "✅ Yes (limited)", "✅ Yes — AI video included"],
                  ["Interface", "Web app + Discord", "Clean web app"],
                  ["Model control", "Limited — single pipeline", "Extensive — choose from 20+ models"],
                  ["Best for", "Art, marketing visuals, concept art", "Game art, product mockups, video"],
                  ["Commercial rights", "✅ On Personal plans", "✅ On paid plans"],
                ].map(([feature, mj, leo]) => (
                  <tr key={feature} className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-[#5b6280]">{feature}</td>
                    <td className="py-3 px-4">{mj}</td>
                    <td className="py-3 pl-4">{leo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 glass-card rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white">Which one should you choose?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-[#f4b942]">Choose Midjourney if…</h3>
                <ul className="mt-2 space-y-1 text-[0.8125rem] text-[#8a91a8]">
                  <li>You want the highest quality artistic images</li>
                  <li>You create marketing visuals and concept art</li>
                  <li>You value a strong community and style references</li>
                  <li>Budget is not the primary constraint</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#f4b942]">Choose Leonardo AI if…</h3>
                <ul className="mt-2 space-y-1 text-[0.8125rem] text-[#8a91a8]">
                  <li>You want more control over AI models and styles</li>
                  <li>You need video generation alongside images</li>
                  <li>You are a game developer or 3D artist</li>
                  <li>You want the best value entry price (৳599/mo)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi AI Premium Shop, I want Midjourney.")}`} className="btn-whatsapp h-10 px-6 text-[0.8125rem]">
              Order Midjourney
              <ArrowRight className="size-4" />
            </a>
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi AI Premium Shop, I want Leonardo AI.")}`} className="btn-primary h-10 px-6 text-[0.8125rem]">
              Order Leonardo AI
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
