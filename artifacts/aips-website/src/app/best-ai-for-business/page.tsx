import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export const metadatanswer: Metadata = buildMetadata({
  title: "Best AI Tools for Business Owners in Bangladesh 2026",
  description: "Top AI tools for Bangladeshi SMEs and business owners — ChatGPT Business, Google AI Pro ৳499, Notion, Midjourney. bKash/Nagad. 5-15 min delivery.",
  canonical: "https://aipremiumshop.com/best-ai-for-business",
});

const tools = [
  { name: "Google AI Pro", slug: "gemini-advanced-bangladesh", price: "৳599/mo", desc: "AI in Gmail, Docs, Sheets, and Meet + 2TB storage. Google's own price: ৳2,500. Save 80%." },
  { name: "ChatGPT Business", slug: "chatgpt-business-bangladesh", price: "৳699/mo", desc: "Team AI assistant with admin controls, privacy, and unlimited usage for the whole team." },
  { name: "Notion Business", slug: "notion-business-bangladesh", price: "৳800/mo", desc: "Centralize docs, wikis, project management, and team knowledge with AI search." },
  { name: "Canva Pro", slug: "canva-pro-bangladesh", price: "৳499/mo", desc: "Create social media posts, ads, presentations, and brand materials without a designer." },
  { name: "Midjourney", slug: "midjourney-bangladesh", price: "৳1,199/mo", desc: "Product mockups, marketing visuals, and ad creatives at production quality." },
  { name: "Claude Pro", slug: "claude-pro-bangladesh", price: "৳1,590/mo", desc: "Contracts, business proposals, and long-document analysis with 200K context window." },
  { name: "Grammarly Premium", slug: "grammarly-premium-bangladesh", price: "৳399/mo", desc: "Professional business communication — emails, proposals, and reports with perfect English." },
  { name: "GitHub Copilot", slug: "github-copilot-bangladesh", price: "৳1,495/mo", desc: "If you have a tech team — 3x faster coding with AI pair programming." },
];

const faqs = [
  { question: "Which AI tools are best for small businesses in Bangladesh?", answer: "Google AI Pro (৳499/mo) is the #1 recommendation — it adds AI to Gmail, Docs, Sheets, and gives you 2TB storage. ChatGPT Business (৳699/mo shared) gives your team AI access with admin controls. Total: ৳1,199/mo for a complete business AI stack." },
  { question: "How can my business pay with bKash or Nagad?", answer: "AI Premium Shop accepts bKash, Nagad, Rocket, and bank transfer. No international credit card or PayPal needed. Pay in BDT via your phone — subscriptions delivered within 5-15 minutes." },
  { question: "Can my whole team use the AI tools?", answer: "Yes — shared plans work for up to 7 team members. For larger teams, we recommend ChatGPT Business at ৳699/seat/mo with admin controls. Personal accounts available for privacy-sensitive work." },
  { question: "How much can AI reduce our operational costs?", answer: "Bangladeshi SMEs report 30-40% cost reduction by using AI for content creation, customer support drafts, data analysis, and design work. A ৳2,000-3,000/mo AI stack can replace ৳20,000-40,000 in freelance or employee costs." },
];

export default function BestAIForBusinessPage() {
  return (
    <>
      <FAQPageJsonLd items={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Best AI for Business", path: "/best-ai-for-business" }]} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Business</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Best AI Tools for Business in Bangladesh — 2026</h1>
          <p className="mt-4 text-lg leading-7 text-[#8a91a8]">
            Reduce costs, automate workflows, and compete globally. Curated AI stack for Bangladeshi SMEs. bKash/Nagad payment.
          </p>

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
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi, I run a business. Help me choose the right AI tools.")}`} className="btn-whatsapp h-12 px-8 text-[0.875rem]">
              <MessageCircle className="size-4" /> Get a custom business recommendation
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
