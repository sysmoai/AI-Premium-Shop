import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Code2 } from "lucide-react";

export const metadatanswer: Metadata = buildMetadata({
  title: "Best AI Coding Tools for Developers in Bangladesh 2026",
  description: "Top AI coding tools for Bangladeshi developers — GitHub Copilot ৳1,590, Cursor ৳2,990, Claude Pro, Windsurf ৳590. bKash/Nagad payment. 5-15 min delivery.",
  canonical: "https://aipremiumshop.com/best-ai-for-developers",
});

const tools = [
  { name: "GitHub Copilot", slug: "github-copilot-bangladesh", price: "৳1,495/mo", desc: "Best AI code completion in VS Code and JetBrains. 300 premium requests/month." },
  { name: "Cursor Pro", slug: "cursor-bangladesh", price: "৳2,990/mo", desc: "AI-native code editor with multi-model support and agentic editing." },
  { name: "Claude Pro", slug: "claude-pro-bangladesh", price: "৳1,590/mo", desc: "Best for complex code reasoning, debugging, and 200K context code reviews." },
  { name: "Windsurf Pro", slug: "windsurf-bangladesh", price: "৳590/mo", desc: "AI-native IDE with autonomous cascade agent — great value for money." },
  { name: "v0.dev Pro", slug: "v0-dev-bangladesh", price: "৳999/mo", desc: "AI web app builder — describe what you want and deploy instantly." },
  { name: "ChatGPT Plus", slug: "chatgpt-plus-bangladesh", price: "৳499/mo", desc: "Universal AI for coding help, documentation writing, and architecture questions." },
];

const faqs = [
  { question: "Which AI coding tool is best for Bangladeshi developers?", answer: "GitHub Copilot (৳1,495/mo) is the best starting point — it works in your existing IDE. For AI-native editing with agentic features, Cursor Pro (৳2,990/mo) or Windsurf (৳590/mo) are excellent alternatives. All with bKash/Nagad." },
  { question: "How much faster can I code with AI?", answer: "Studies show 55% faster coding with AI pair programming. Bangladeshi freelancers using Copilot report completing projects 40-50% faster on average." },
  { question: "Can I pay with bKash from Bangladesh?", answer: "Yes — all developer tools are available with bKash, Nagad, or bank transfer. No international card needed." },
];

export default function BestAIForDevelopersPage() {
  return (
    <>
      <FAQPageJsonLd items={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Best AI for best-ai-for-developers", path: "/best-ai-for-developers" }]} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Developers</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Best AI Coding Tools for Developers in Bangladesh — 2026</h1>
          <p className="mt-4 text-lg leading-7 text-[#8a91a8]">Code faster, debug smarter, ship more. bKash/Nagad payment.</p>

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
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi, I'm a developer. Which AI coding tool should I get?")}`} className="btn-whatsapp h-12 px-8 text-[0.875rem]">
              <MessageCircle className="size-4" /> Get coding tool recommendations
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
