import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";

export const metadatanswer: Metadata = buildMetadata({
  title: "Best AI Tools for Students in Bangladesh 2026",
  description: "Top AI tools for Bangladeshi students — ChatGPT Plus from ৳499, Grammarly, Notion, Perplexity & more. bKash/Nagad payment. 5-15 min WhatsApp delivery.",
  canonical: "https://aipremiumshop.com/best-ai-for-students",
});

const tools = [
  { name: "ChatGPT Plus", slug: "chatgpt-plus-bangladesh", price: "৳499/mo", desc: "All-rounder for assignments, research, coding, and exam prep. GPT-5.5 series with web search." },
  { name: "Grammarly Premium", slug: "grammarly-premium-bangladesh", price: "৳399/mo", desc: "Perfect English writing for essays, theses, and job applications." },
  { name: "Notion Business", slug: "notion-business-bangladesh", price: "৳800/mo", desc: "Organize notes, track deadlines, and collaborate on group projects with AI." },
  { name: "Perplexity Pro", slug: "perplexity-pro-bangladesh", price: "৳599/mo", desc: "AI-powered research with citations — perfect for academic papers." },
  { name: "Google AI Pro", slug: "gemini-advanced-bangladesh", price: "৳599/mo", desc: "AI in Gmail, Docs, Sheets + 2TB storage. Best for Google Workspace users." },
  { name: "QuillBot Premium", slug: "quillbot-premium-bangladesh", price: "৳390/mo", desc: "Paraphrasing and citation tool — essential for avoiding plagiarism." },
  { name: "Canva Pro", slug: "canva-pro-bangladesh", price: "৳499/mo", desc: "Create stunning presentations and project visuals without design skills." },
  { name: "Claude Pro", slug: "claude-pro-bangladesh", price: "৳1,590/mo", desc: "Deep reasoning for complex research papers and long document analysis." },
];

const faqs = [
  { question: "Which AI tool is best for Bangladeshi university students?", answer: "ChatGPT Plus (৳499/mo shared) is the best starter tool for most students — it handles writing, coding, research, and image generation. For thesis writing, add Grammarly (৳399/mo). For group projects, Notion Business (৳800/mo). All available with bKash/Nagad." },
  { question: "Can I pay for these AI tools with bKash?", answer: "Yes — AI Premium Shop accepts bKash, Nagad, Rocket, and bank transfer. No international credit card needed. Pay in BDT, get your subscription within 5-15 minutes." },
  { question: "What is the cheapest AI tool for students?", answer: "ChatGPT Plus Starter Shared at ৳499/mo is the best value. It covers writing, coding, research, and image generation. Perplexity Pro (৳599/mo) is also excellent for research with citation support." },
  { question: "Is it safe to use shared AI accounts?", answer: "Shared accounts are budget-friendly with multiple users. For full privacy, we recommend personal accounts. Every order includes a 7-day replacement warranty." },
  { question: "How can AI help with my thesis?", answer: "Use Perplexity Pro for literature review with real citations, ChatGPT Plus for structuring and editing, Grammarly for English polishing, and Claude Pro for analyzing long PDFs of previous research." },
];

export default function BestAIForStudentsPage() {
  return (
    <>
      <FAQPageJsonLd items={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Best AI for best-ai-for-students", path: "/best-ai-for-students" }]} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Students</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Best AI Tools for Students in Bangladesh — 2026</h1>
          <p className="mt-4 text-lg leading-7 text-[#8a91a8]">
            Top AI subscriptions for Bangladeshi university students. bKash/Nagad payment, 5-15 min delivery.
          </p>

          <div className="mt-6 p-4 rounded-xl border border-[#f4b942]/10 bg-[#f4b942]/[0.03]">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#f4b942]">Quick Answer</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-[#c9ceda]">
              <strong>ChatGPT Plus (৳499/mo)</strong> is the best all-round AI tool for Bangladeshi students — covers writing, coding, research, and image generation. Add <strong>Grammarly (৳399/mo)</strong> for perfect English in essays and theses. All available at AI Premium Shop with bKash/Nagad payment — no international card needed. Trusted by thousands students and professionals since 2024.
            </p>
          </div>

          <div className="mt-6 p-4 rounded-xl border border-white/[0.04] bg-white/[0.02]">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280] mb-2">বাংলা</p>
            <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">
              বাংলাদেশী শিক্ষার্থীদের জন্য <strong>সবচেয়ে ভালো AI টুল ChatGPT Plus (৳৩৫০/মাস)</strong> — লেখালেখি, কোডিং, রিসার্চ, ছবি তৈরি সব কাজ করে। থিসিসের জন্য <strong>Grammarly (৳৪৭০/মাস)</strong> এবং <strong>Perplexity Pro (৳৩৫০/মাস)</strong> যোগ করুন। bKash/Nagad দিয়ে পেমেন্ট — আন্তর্জাতিক কার্ড লাগবে না।
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
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi, I'm a student. Which AI tool should I start with?")}`} className="btn-whatsapp h-12 px-8 text-[0.875rem]">
              <MessageCircle className="size-4" /> Ask us which AI is best for you
              <ArrowRight className="size-4" />
            </a>
          </div>

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
            <dl className="mt-6 space-y-4">
              {faqs.map((item, i) => (
                <div key={i} className="rounded-lg border border-white/[0.06] glass-card p-6">
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
