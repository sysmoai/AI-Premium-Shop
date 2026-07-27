import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Midjourney vs Ideogram in Bangladesh — Best AI Image Generator?",
  description:
    "Midjourney vs Ideogram for Bangladeshi designers and creators. Compare price, quality, features, and use cases. Buy with bKash/Nagad. 5–15 min delivery after payment confirmation.",
  canonical: "https://aipremiumshop.com/midjourney-vs-ideogram",
});

const faqItems = [
  {
    question: "Which is better for logo design: Midjourney or Ideogram?",
    answer:
      "Ideogram is significantly better for logo design and text-in-image generation because it can render readable text directly into images. Midjourney excels at artistic, photorealistic, and conceptual imagery but struggles with accurate text rendering.",
  },
  {
    question: "Is Midjourney worth the price in Bangladesh?",
    answer:
      "Midjourney Standard Shared starts at ৳1,199/mo, which is excellent value for professional designers, social media managers, and content creators. The image quality is industry-leading. For hobbyists, Ideogram Plus at ৳2,990/mo offers good value with strong text capabilities.",
  },
  {
    question: "Can I use Midjourney or Ideogram for client work in Bangladesh?",
    answer:
      "Yes, both tools allow commercial use. Midjourney Personal plans give you full commercial rights. Ideogram Pro also permits commercial usage. Many Bangladeshi freelancers on Fiverr and Upwork use these tools for client projects.",
  },
  {
    question: "Does Midjourney still require Discord?",
    answer:
      "Midjourney now has a full web app at midjourney.com where you can generate images without Discord. However, some shared plan setups may still use Discord for access. Personal Accounts are set up directly through the web app.",
  },
  {
    question: "Which one is better for social media content in Bangladesh?",
    answer:
      "For Instagram and Facebook posts, Midjourney produces more visually stunning and shareable images. For posts that include text overlays, quotes, or branding, Ideogram is the better choice because it renders readable text accurately.",
  },
];

export default function MidjourneyVsIdeogramPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Midjourney vs Ideogram", path: "/midjourney-vs-ideogram" },
        ]}
      />
      <FAQPageJsonLd items={faqItems} />

      <main className="min-h-screen  text-white">
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Midjourney vs Ideogram in Bangladesh
          </h1>
          <p className="mt-4 text-lg leading-7 text-[#8a91a8]">
            For designers, marketers, and content creators in Bangladesh. Prices in BDT.
            Payment via bKash/Nagad.
          </p>

          {/* AIO Answer Block */}
          <div className="mt-6 p-4 rounded-xl border border-[#f4b942]/10 bg-[#f4b942]/[0.03]">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#f4b942]">Quick Answer</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-[#c9ceda]">
              <strong>Midjourney (from BDT 1,199/mo)</strong> produces the highest-quality artistic and photorealistic images with the strongest style control.
              <strong>Ideogram (from BDT 2,990/mo)</strong> excels at rendering text within images — perfect for logos, typography, and branded visuals.
              Both available at AI Premium Shop with bKash/Nagad payment — no international card needed.
            </p>
          </div>

          {/* Bangla block */}
          <div className="mt-6 p-4 rounded-xl border border-white/[0.04] bg-white/[0.02]">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280] mb-2">বাংলা</p>
            <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">
              <strong>Midjourney (BDT 1,199/মাস থেকে)</strong> — সর্বোচ্চ মানের আর্টিস্টিক ও ফটোরিয়েলিস্টিক ছবি, সবচেয়ে শক্তিশালী স্টাইল কন্ট্রোল।
              <strong>Ideogram (BDT 2,990/মাস থেকে)</strong> — ছবির মধ্যে নিখুঁত টেক্সট রেন্ডারিং, লোগো ও টাইপোগ্রাফির জন্য সেরা।
              bKash/Nagad দিয়ে পেমেন্ট, আন্তর্জাতিক কার্ড লাগবে না।
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-white/[0.06] glass-card p-6">
            <h2 className="text-lg font-semibold text-white">Quick Answer</h2>
            <p className="mt-2 text-[#8a91a8]">
              <strong>Choose Midjourney</strong> for the highest quality artistic and photorealistic
              images (৳1,199–৳17,940/mo). <strong>Choose Ideogram</strong> if you need text-in-image
              generation, logo design, or typography (৳2,990–৳8,970/mo).
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-white/[0.06] glass-card p-6">
              <h3 className="text-xl font-semibold text-white">Midjourney</h3>
              <p className="mt-2 text-2xl font-bold text-white">৳1,199 – ৳17,940/mo</p>
              <ul className="mt-4 space-y-2 text-[#8a91a8]">
                <li>✓ Best-in-class image quality</li>
                <li>✓ Photorealistic and artistic mastery</li>
                <li>✓ Strong community and style references</li>
                <li>✓ Excellent for concept art, fashion, architecture</li>
                <li>✗ Poor text rendering</li>
                <li>✗ Web app available but shared plans may use Discord</li>
              </ul>
              <Link
                href="/products/midjourney-bangladesh"
                className="mt-6 inline-flex h-10 items-center justify-center rounded-lg glass-card px-4 text-sm font-semibold text-white"
              >
                View Midjourney Plans
              </Link>
            </div>
            <div className="rounded-lg border border-white/[0.06] glass-card p-6">
              <h3 className="text-xl font-semibold text-white">Ideogram</h3>
              <p className="mt-2 text-2xl font-bold text-white">৳2,990 – ৳8,970/mo</p>
              <ul className="mt-4 space-y-2 text-[#8a91a8]">
                <li>✓ Best text-in-image generation</li>
                <li>✓ Excellent for logos and posters</li>
                <li>✓ Clean web interface</li>
                <li>✓ Good for marketing materials</li>
                <li>✗ Lower image quality vs Midjourney</li>
                <li>✗ Smaller community</li>
              </ul>
              <Link
                href="/products/ideogram-bangladesh"
                className="mt-6 inline-flex h-10 items-center justify-center rounded-lg glass-card px-4 text-sm font-semibold text-white"
              >
                View Ideogram Plans
              </Link>
            </div>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-white">Frequently Asked Questions</h2>
            <dl className="mt-6 space-y-4">
              {faqItems.map((item, i) => (
                <div key={i} className="rounded-lg border border-white/[0.06] glass-card p-5">
                  <dt className="font-semibold text-white">{item.question}</dt>
                  <dd className="mt-2 text-[#8a91a8] leading-7">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </main>
    </>
  );
}
