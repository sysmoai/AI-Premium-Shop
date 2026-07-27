import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, ArrowRight, MessageCircle } from "lucide-react";

export const metadatanswer: Metadata = buildMetadata({
  title: "Best AI Tools for Freelancers in Bangladesh 2026",
  description: "Top AI tools for Bangladeshi freelancers on Upwork/Fiverr — ChatGPT ৳499, Midjourney ৳1,199, Canva Pro ৳499, GitHub Copilot. bKash/Nagad. 5-15 min delivery.",
  canonical: "https://aipremiumshop.com/best-ai-for-freelancers",
});

const tools = [
  { name: "ChatGPT Plus", slug: "chatgpt-plus-bangladesh", price: "৳499/mo", desc: "Your universal AI assistant — write proposals, answer client questions, generate content, debug code." },
  { name: "Midjourney", slug: "midjourney-bangladesh", price: "৳1,199/mo", desc: "Create portfolio-quality images, social media graphics, and design concepts that win clients." },
  { name: "Canva Pro", slug: "canva-pro-bangladesh", price: "৳499/mo", desc: "Professional social media posts, presentations, and brand kits without a designer." },
  { name: "GitHub Copilot", slug: "github-copilot-bangladesh", price: "৳1,495/mo", desc: "Code 3x faster — AI completions in VS Code, JetBrains. Essential for web dev freelancers." },
  { name: "Grammarly Premium", slug: "grammarly-premium-bangladesh", price: "৳399/mo", desc: "Perfect English for client proposals, emails, and deliverables. Non-negotiable for writers." },
  { name: "Claude Pro", slug: "claude-pro-bangladesh", price: "৳1,590/mo", desc: "Best for complex writing projects, long-form content, and deep research." },
  { name: "ElevenLabs", slug: "elevenlabs-bangladesh", price: "৳748/mo", desc: "AI voiceovers in 29+ languages — perfect for video editors and content creators." },
  { name: "Notion Business", slug: "notion-business-bangladesh", price: "৳800/mo", desc: "Track projects, clients, invoices, and deadlines in one AI-powered workspace." },
];

const faqs = [
  { question: "Which AI tools help Bangladeshi freelancers earn more?", answer: "ChatGPT Plus (৳499/mo) is the #1 tool — it helps write better Upwork/Fiverr proposals, generates content, debugs code, and answers client questions. Midjourney (৳1,199/mo) creates stunning portfolio images. The combo of both costs less than ৳1,600/mo and can help you land better-paying clients." },
  { question: "Can I pay for these tools with bKash from Bangladesh?", answer: "Yes — all tools are available with bKash, Nagad, Rocket, or bank transfer. No international credit card needed. Local payment, instant delivery." },
  { question: "What is the best AI for Bangladeshi freelance writers?", answer: "ChatGPT Plus (৳499/mo) for content generation and editing, Grammarly Premium (৳399/mo) for perfect English, and Perplexity Pro (৳599/mo) for research with citations. Total: ~৳1,170/mo for a complete freelance writing stack." },
  { question: "Which AI tool is best for freelance web developers?", answer: "GitHub Copilot (৳1,590/mo) for AI code completion in your IDE. Claude Pro (৳1,590/mo) for complex code reasoning and debugging large codebases. Plus ChatGPT Plus (৳499/mo) for client communication and documentation." },
];

export default function BestAIForFreelancersPage() {
  return (
    <>
      <FAQPageJsonLd items={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Best AI for best-ai-for-freelancers", path: "/best-ai-for-freelancers" }]} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Freelancers</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Best AI Tools for Freelancers in Bangladesh — 2026</h1>
          <p className="mt-4 text-lg leading-7 text-[#8a91a8]">
            Work faster, deliver better, earn more. The essential AI stack for Upwork, Fiverr, and direct clients. bKash/Nagad payment.
          </p>

          <div className="mt-6 p-4 rounded-xl border border-[#f4b942]/10 bg-[#f4b942]/[0.03]">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#f4b942]">Quick Answer</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-[#c9ceda]">
              <strong>ChatGPT Plus (৳499/mo) + Midjourney (৳1,199/mo) + Canva Pro (৳499/mo)</strong> is the winning combo for most Bangladeshi freelancers — ৳2,048/mo total. Writers add Grammarly (৳399/mo), developers add GitHub Copilot (৳1,495/mo). All with bKash/Nagad. Trusted by a growing community of customers since 2024.
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
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi, I'm a freelancer. Which AI tools should I get?")}`} className="btn-whatsapp h-12 px-8 text-[0.875rem]">
              <MessageCircle className="size-4" /> Get personalized recommendations
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
