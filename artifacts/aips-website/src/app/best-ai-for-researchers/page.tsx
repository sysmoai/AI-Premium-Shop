import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export const metadatanswer: Metadata = buildMetadata({
  title: "Best AI Tools for Researchers in Bangladesh 2026",
  description: "AI research tools for Bangladeshi researchers, PhD students, and academics — literature review, citations, long-form analysis. bKash/Nagad.",
  canonical: "https://aipremiumshop.com/best-ai-for-researchers",
});

const tools = [{ name: "Claude Pro", slug: "claude-pro-bangladesh", price: "৳1,590/mo", desc: "200K context window for analyzing entire research papers and long documents at once." },
    { name: "Perplexity Pro", slug: "perplexity-pro-bangladesh", price: "৳599/mo", desc: "AI-powered deep research with real citations. 300+ Pro searches/day." },
    { name: "ChatGPT Plus", slug: "chatgpt-plus-bangladesh", price: "৳499/mo", desc: "Literature review, research structuring, and academic writing assistance." },
    { name: "Notion Business", slug: "notion-business-bangladesh", price: "৳800/mo", desc: "Organize research notes, bibliographies, and project timelines with AI search." },
    { name: "Google AI Pro", slug: "gemini-advanced-bangladesh", price: "৳599/mo", desc: "Google Scholar integration, Deep Research, 2TB storage for datasets." }];

const faqs = [{ question: "Which AI is best for academic research in Bangladesh?", answer: "Claude Pro (৳1,590/mo) is the best for long-document analysis with 200K context — upload entire theses or books. Perplexity Pro (৳599/mo) provides real citations for literature review. Together they're an unbeatable research stack." }];

export default function Page() {
  return (
    <>
      <FAQPageJsonLd items={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Researchers", path: "/best-ai-for-researchers" }]} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Researchers</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Best AI Tools for Researchers in Bangladesh 2026</h1>
          <p className="mt-4 text-lg leading-7 text-[#8a91a8]">Top AI research tools — Claude Pro, Perplexity, ChatGPT, Notion. Deep research, literature review, citations. bKash/Nagad.</p>
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
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi, I'm a researcher. Which AI tools do I need?")}`} className="btn-whatsapp h-12 px-8 text-[0.875rem]">
              <MessageCircle className="size-4" /> Get personalized recommendations <ArrowRight className="size-4" />
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
