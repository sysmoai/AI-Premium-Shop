import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "ChatGPT Plus vs Claude Pro in Bangladesh — Which AI Assistant to Buy?",
  description:
    "Compare ChatGPT Plus and Claude Pro for Bangladeshi users. ChatGPT from ৳499/mo, Claude from ৳1,590/mo. Features, coding, reasoning, and use cases. Buy with bKash/Nagad.",
  canonical: "https://aipremiumshop.com/chatgpt-vs-claude",
});

export default function ChatGPTVsClaudePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "ChatGPT vs Claude", path: "/chatgpt-vs-claude" },
  ];

  const faqItems = [
    {
      question: "Which AI assistant is best for Bangladeshi students?",
      answer: "ChatGPT Plus is the best all-rounder for students due to DALL-E image generation, web browsing, and broader plugin support. Claude Pro excels at long-document analysis and research papers with its 200K context window.",
    },
    {
      question: "Can I pay for ChatGPT Plus or Claude Pro with bKash?",
      answer: "Neither OpenAI nor Anthropic accepts bKash directly. AI Premium Shop acts as a local reseller — you pay us via bKash, Nagad, or Rocket, and we deliver the subscription within 5–15 minutes on WhatsApp.",
    },
    {
      question: "Is Claude Pro better than ChatGPT Plus for coding?",
      answer: "Claude Pro is widely preferred for complex reasoning and debugging large codebases due to its 200K context window. ChatGPT Plus is better for rapid prototyping, web browsing while coding, and generating images alongside code.",
    },
    {
      question: "Can I use a shared account, or do I need a Personal Account?",
      answer: "Shared accounts start at ৳499/mo for ChatGPT Plus and ৳1,590/mo for Claude Pro — perfect for trying the service. Personal Accounts give you full control with your own credentials and are ideal for privacy-conscious users and businesses.",
    },
    {
      question: "Will my account get banned?",
      answer: "Personal Accounts use legitimate subscriptions created through standard sign-up processes. Shared slots carry a small risk if usage patterns trigger platform security, which is why we offer a 7-day replacement warranty on all shared plans.",
    },
  ];

  return (
    <>
      <FAQPageJsonLd items={faqItems} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Comparison</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">ChatGPT Plus vs Claude Pro</h1>
          <p className="mt-4 text-[1rem] leading-relaxed text-[#8a91a8]">
            A detailed comparison for Bangladeshi users deciding between OpenAI&apos;s ChatGPT Plus and Anthropic&apos;s Claude Pro. Both available from AI Premium Shop with bKash/Nagad payment.
          </p>

          {/* AIO Answer Block */}
          <div className="mt-6 p-4 rounded-xl border border-[#f4b942]/10 bg-[#f4b942]/[0.03]">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#f4b942]">Quick Answer</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-[#c9ceda]">
              <strong>ChatGPT Plus (from ৳499/mo)</strong> is the better all-rounder with image generation, web search, and broader use cases. 
              <strong>Claude Pro (from ৳1,590/mo)</strong> excels at long-document analysis (200K context), deep reasoning, and natural writing.
              Both available at AI Premium Shop with bKash/Nagad payment — no international card needed. Trusted by a growing community of customers since 2024.
            </p>
          </div>

          {/* Bangla block */}
          <div className="mt-6 p-4 rounded-xl border border-white/[0.04] bg-white/[0.02]">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280] mb-2">বাংলা</p>
            <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">
              <strong>ChatGPT Plus (৳৩৫০/মাস থেকে)</strong> — ছবি তৈরি, ওয়েব সার্চ, কোডিং, লেখালেখি সব কাজের জন্য সেরা অল-রাউন্ডার।
              <strong>Claude Pro (৳১,৪৯৫/মাস থেকে)</strong> — লম্বা ডকুমেন্ট (২০০K কনটেক্সট), ডিপ রিজনিং, একাডেমিক রিসার্চের জন্য সেরা।
              দুটোই AI Premium Shop থেকে bKash/Nagad দিয়ে কিনতে পারবেন। আন্তর্জাতিক কার্ড লাগবে না।
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-[0.875rem]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="py-3 pr-4 text-left font-semibold text-[#5b6280]">Feature</th>
                  <th className="py-3 px-4 text-left font-semibold text-white">ChatGPT Plus</th>
                  <th className="py-3 pl-4 text-left font-semibold text-white">Claude Pro</th>
                </tr>
              </thead>
              <tbody className="text-[#8a91a8]">
                {[
                  ["Price (BDT/month)", "৳499 – ৳2,990/mo", "৳1,495 – ৳29,900/mo"],
                  ["Shared plan entry", "৳499/mo (Starter)", "৳1,495/mo (Premium Shared)"],
                  ["Personal plan", "৳2,990/mo", "৳2,990/mo"],
                  ["Model", "GPT-4o, o1, o3-mini", "Claude 3.7 Sonnet, Opus 4"],
                  ["Context window", "128K tokens", "200K tokens"],
                  ["Code quality", "Excellent — best for rapid prototyping", "Exceptional — best for complex logic and large codebases"],
                  ["Creative writing", "Strong, versatile tone", "Slightly more natural, human-like tone"],
                  ["Image generation", "DALL-E 3 built-in", "No built-in image generation"],
                  ["Web browsing", "Yes — real-time search", "No — knowledge cutoff"],
                  ["Document upload", "Yes (PDF, images, up to 128K)", "Yes (PDF, images, up to 200K)"],
                  ["Best for", "General use, coding, images, research", "Long documents, deep reasoning, academic research"],
                ].map(([feature, gpt, claude]) => (
                  <tr key={feature} className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-[#5b6280]">{feature}</td>
                    <td className="py-3 px-4">{gpt}</td>
                    <td className="py-3 pl-4">{claude}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 glass-card rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white">Which one should you choose?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-[#f4b942]">Choose ChatGPT Plus if…</h3>
                <ul className="mt-2 space-y-1 text-[0.8125rem] text-[#8a91a8]">
                  <li>You need image generation with DALL-E 3</li>
                  <li>You want real-time web browsing while working</li>
                  <li>You prefer a versatile all-rounder for coding, writing, and research</li>
                  <li>You want the lowest entry price (৳499/mo shared)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#f4b942]">Choose Claude Pro if…</h3>
                <ul className="mt-2 space-y-1 text-[0.8125rem] text-[#8a91a8]">
                  <li>You work with very long documents (200K context)</li>
                  <li>You need the best reasoning for complex analysis</li>
                  <li>You want a more natural, human-like writing style</li>
                  <li>You prioritize document analysis over image generation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi AI Premium Shop, I want ChatGPT Plus.")}`} className="btn-whatsapp h-10 px-6 text-[0.8125rem]">
              Order ChatGPT Plus
              <ArrowRight className="size-4" />
            </a>
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi AI Premium Shop, I want Claude Pro.")}`} className="btn-primary h-10 px-6 text-[0.8125rem]">
              Order Claude Pro
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
