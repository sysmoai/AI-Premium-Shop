import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, MapPin } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Buy AI Subscriptions in Khulna — bKash/Nagad Payment",
  description: "Buy ChatGPT Plus, Claude Pro, Midjourney & 103+ AI tools in Khulna, Bangladesh. bKash/Nagad payment. 5-15 min WhatsApp delivery. a growing community of customers.",
  canonical: "https://aipremiumshop.com/khulna",
});

const tools = [
  { name: "ChatGPT Plus", slug: "chatgpt-plus-bangladesh", price: "৳499/mo", desc: "Bangladesh's most popular AI — writing, coding, research, images." },
  { name: "Google AI Pro", slug: "gemini-advanced-bangladesh", price: "৳599/mo", desc: "AI in Gmail, Docs + 2TB storage. Google price: ৳2,500." },
  { name: "Claude Pro", slug: "claude-pro-bangladesh", price: "৳1,590/mo", desc: "Best writing quality, 200K context, PDF analysis." },
  { name: "Midjourney", slug: "midjourney-bangladesh", price: "৳1,199/mo", desc: "Professional AI images — photorealistic and artistic." },
  { name: "Canva Pro", slug: "canva-pro-bangladesh", price: "৳499/mo", desc: "All-in-one design with AI Magic Studio and templates." },
  { name: "GitHub Copilot", slug: "github-copilot-bangladesh", price: "৳1,495/mo", desc: "AI code completion for VS Code and JetBrains IDEs." },
];

const faqs = [
  { question: "Can I buy AI subscriptions from Khulna with bKash?", answer: "Yes! AI Premium Shop delivers to all 64 districts including Khulna. Pay with bKash, Nagad, Rocket, or bank transfer. No international credit card needed. 5-15 minute delivery via WhatsApp." },
  { question: "How fast is delivery in Khulna?", answer: "Most subscriptions are delivered within 5-15 minutes of payment confirmation via WhatsApp. Personal accounts may take 2-4 hours for individual setup. All of Bangladesh is covered — Khulna included." },
  { question: "Which AI tool should I buy from Khulna?", answer: "Start with ChatGPT Plus (BDT 499/mo) — it covers writing, coding, research, and image generation. For Khulna freelancers, add Midjourney (BDT 1,199/mo) for design work. Students should get ChatGPT Plus + Grammarly (BDT 470/mo)." },
];

export default function KhulnaPage() {
  return (<>
    <FAQPageJsonLd items={faqs} />
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Khulna", path: "/khulna" }]} />
    <main className="min-h-screen"><section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]"><MapPin className="size-3 inline mr-1" />Khulna</p>
      <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Premium AI Subscriptions in Khulna</h1>
      <p className="mt-4 text-lg leading-7 text-[#8a91a8]">Buy ChatGPT, Claude, Midjourney & 103+ AI tools from Khulna with bKash/Nagad. 5-15 min WhatsApp delivery.</p>

      <div className="mt-6 p-4 rounded-xl border border-[#f4b942]/10 bg-[#f4b942]/[0.03]">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#f4b942]">Quick Answer</p>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-[#c9ceda]">
          Yes — you can buy <strong>103+ premium AI subscriptions from Khulna</strong> through AI Premium Shop. Pay with bKash, Nagad, or Rocket — no international card needed. Delivery in 5-15 minutes via WhatsApp. Trusted by a growing community of customers across all 64 districts since 2024.
        </p>
      </div>

      <div className="mt-6 p-4 rounded-xl border border-white/[0.04] bg-white/[0.02]">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280] mb-2">বাংলা</p>
        <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">
          <strong>Khulna থেকে bKash/Nagad দিয়ে AI সাবস্ক্রিপশন কিনুন —</strong> ChatGPT Plus (৳৩৫০), Google AI Pro (৳৫০০), Midjourney (৳১,১৯৯) সহ ১০৩+ টুল। WhatsApp-এ ৫-১৫ মিনিটে ডেলিভারি। ২০২৪ সাল থেকে ৩,০০০+ কাস্টমার।
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/products/${tool.slug}`} className="glass-card rounded-xl p-5 hover:border-[#f4b942]/20 border border-white/[0.06] transition group">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white group-hover:text-[#f4b942] transition">{tool.name}</h3>
              <span className="text-sm font-bold text-[#f4b942]">{tool.price}</span>
            </div>
            <p className="mt-2 text-[0.8125rem] text-[#8a91a8]">{tool.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi, I am from Khulna. I want an AI subscription.")}`} className="btn-whatsapp h-12 px-8 text-[0.875rem]">
          <MessageCircle className="size-4" /> Order from Khulna <ArrowRight className="size-4" />
        </a>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
        <dl className="mt-6 space-y-4">{faqs.map((item, i) => (
          <div key={i} className="rounded-lg border border-white/[0.06] glass-card p-6">
            <dt className="text-lg font-semibold text-white">{item.question}</dt>
            <dd className="mt-2 leading-7 text-[#8a91a8]">{item.answer}</dd>
          </div>
        ))}
        </dl>
      </section>
    </section></main>
  </>);
}
