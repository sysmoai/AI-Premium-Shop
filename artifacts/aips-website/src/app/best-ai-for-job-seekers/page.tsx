import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export const metadatanswer: Metadata = buildMetadata({
  title: "Best AI Tools for Job Seekers in Bangladesh 2026",
  description: "AI tools to land jobs faster in Bangladesh — CV writing, cover letters, interview prep, LinkedIn optimization. bKash/Nagad.",
  canonical: "https://aipremiumshop.com/best-ai-for-job-seekers",
});

const tools = [{ name: "ChatGPT Plus", slug: "chatgpt-plus-bangladesh", price: "৳499/mo", desc: "Write tailored CVs, cover letters, and interview answers for any job." },
    { name: "Grammarly Premium", slug: "grammarly-premium-bangladesh", price: "৳399/mo", desc: "Perfect English for CVs, cover letters, and professional emails." },
    { name: "Canva Pro", slug: "canva-pro-bangladesh", price: "৳499/mo", desc: "Create professional CV templates, portfolio presentations, and LinkedIn banners." },
    { name: "Claude Pro", slug: "claude-pro-bangladesh", price: "৳1,590/mo", desc: "Mock interviews, complex career strategy, and long-form research." }];

const faqs = [{ question: "How can AI help me get a job in Bangladesh?", answer: "ChatGPT Plus (৳499/mo) writes tailored CVs and cover letters in seconds. Grammarly (৳399/mo) polishes your English to professional standard. Canva Pro (৳499/mo) creates stunning CV designs. Total: ৳1,319/mo — less than one week's transport cost in Dhaka." }];

export default function Page() {
  return (
    <>
      <FAQPageJsonLd items={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Job Seekers", path: "/best-ai-for-job-seekers" }]} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Job Seekers</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Best AI Tools for Job Seekers in Bangladesh 2026</h1>
          <p className="mt-4 text-lg leading-7 text-[#8a91a8]">Top AI tools for Bangladeshi job seekers — ChatGPT for CV writing, Grammarly, LinkedIn Premium, Canva. bKash/Nagad.</p>
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
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi, I'm job hunting. How can AI help my career?")}`} className="btn-whatsapp h-12 px-8 text-[0.875rem]">
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
