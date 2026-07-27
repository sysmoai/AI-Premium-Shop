import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Suno AI vs Udio in Bangladesh — Best AI Music Generator?",
  description:
    "Compare Suno AI and Udio for Bangladeshi musicians and content creators. AI music generation, pricing in BDT, features, and use cases. Buy with bKash/Nagad.",
  canonical: "https://aipremiumshop.com/suno-vs-udio",
});

const faqItems = [
  {
    question: "Which AI music tool is best for Bangladeshi YouTubers?",
    answer:
      "Suno AI is better for YouTubers who need full songs with vocals and lyrics in multiple styles. Udio is ideal for instrumental background music and beats. Both offer commercial rights on Personal plans.",
  },
  {
    question: "Can I pay for Suno AI or Udio with bKash in Bangladesh?",
    answer:
      "Neither Suno nor Udio accepts bKash directly. AI Premium Shop is a local reseller — pay via bKash, Nagad, or Rocket and receive your subscription within 5-15 minutes on WhatsApp.",
  },
  {
    question: "Can I use AI-generated music commercially?",
    answer:
      "Yes. Both Suno AI Pro and Udio Pro Personal plans include commercial usage rights. You can use the generated music in YouTube videos, podcasts, ads, and client projects without copyright issues.",
  },
  {
    question: "Which one produces better audio quality?",
    answer:
      "Suno AI v5.5 produces studio-quality vocals and instrumentation that rivals commercial releases. Udio focuses on high-fidelity instrumental generation and beat-making. For vocal tracks, Suno leads. For beats and instrumentals, Udio is excellent.",
  },
  {
    question: "Can I generate Bangla music with these tools?",
    answer:
      "Both tools support multiple languages including English. Bangla vocal generation is experimental on both platforms. For Bangla lyrics, you may need to generate instrumental tracks and add vocals separately.",
  },
];

export default function SunoVsUdioPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";

  return (
    <>
      <FAQPageJsonLd items={faqItems} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Suno vs Udio", path: "/suno-vs-udio" },
        ]}
      />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Comparison</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Suno AI vs Udio</h1>
          <p className="mt-4 text-[1rem] leading-relaxed text-[#8a91a8]">
            A detailed comparison for Bangladeshi musicians, YouTubers, and content creators deciding between Suno AI and Udio for AI music generation.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-[0.875rem]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="py-3 pr-4 text-left font-semibold text-[#5b6280]">Feature</th>
                  <th className="py-3 px-4 text-left font-semibold text-white">Suno AI</th>
                  <th className="py-3 pl-4 text-left font-semibold text-white">Udio</th>
                </tr>
              </thead>
              <tbody className="text-[#8a91a8]">
                {[
                  ["Price (BDT/month)", "৳1,495 – ৳3,990/mo", "৳499 – ৳1,990/mo"],
                  ["Shared plan entry", "৳1,495/mo (Pro)", "৳499/mo (Shared)"],
                  ["Personal plan", "৳3,990/mo (Premier)", "৳1,990/mo (Personal)"],
                  ["Vocals & lyrics", "✅ Excellent — full songs", "✅ Good — vocals supported"],
                  ["Instrumental beats", "✅ Yes", "✅ Excellent — beat-focused"],
                  ["Audio quality", "Studio-grade (v5.5)", "High-fidelity"],
                  ["Genres supported", "All major genres", "All major genres"],
                  ["Best for", "Full songs, background music, podcasts", "Beats, instrumentals, remixes"],
                  ["Commercial rights", "✅ On Pro/Premier", "✅ On Personal plans"],
                ].map(([feature, suno, udio]) => (
                  <tr key={feature} className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-[#5b6280]">{feature}</td>
                    <td className="py-3 px-4">{suno}</td>
                    <td className="py-3 pl-4">{udio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 glass-card rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white">Which one should you choose?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-[#f4b942]">Choose Suno AI if…</h3>
                <ul className="mt-2 space-y-1 text-[0.8125rem] text-[#8a91a8]">
                  <li>You need full songs with vocals and lyrics</li>
                  <li>You create background music for YouTube videos</li>
                  <li>You want the highest audio quality available</li>
                  <li>You produce podcast intros and outros</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#f4b942]">Choose Udio if…</h3>
                <ul className="mt-2 space-y-1 text-[0.8125rem] text-[#8a91a8]">
                  <li>You need instrumental beats and loops</li>
                  <li>You want the lowest entry price (৳499/mo)</li>
                  <li>You create remixes and DJ sets</li>
                  <li>You focus on beat-making over vocal tracks</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi AI Premium Shop, I want Suno AI.")}`} className="btn-whatsapp h-10 px-6 text-[0.8125rem]">
              Order Suno AI
              <ArrowRight className="size-4" />
            </a>
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi AI Premium Shop, I want Udio.")}`} className="btn-primary h-10 px-6 text-[0.8125rem]">
              Order Udio
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
