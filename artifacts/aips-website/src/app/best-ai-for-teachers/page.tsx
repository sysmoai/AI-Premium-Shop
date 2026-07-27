import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export const metadatanswer: Metadata = buildMetadata({
  title: "Best AI Tools for Teachers in Bangladesh 2026",
  description: "AI tools for teachers in Bangladesh — lesson planning, quiz generation, grading help, and classroom content. bKash/Nagad payment.",
  canonical: "https://aipremiumshop.com/best-ai-for-teachers",
});

const tools = [{ name: "ChatGPT Plus", slug: "chatgpt-plus-bangladesh", price: "৳499/mo", desc: "Lesson plans, quiz questions, worksheets, and teaching materials in minutes." },
    { name: "Gamma Plus", slug: "gamma-bangladesh", price: "৳399/mo", desc: "AI presentations and slides — perfect for classroom lectures and workshops." },
    { name: "Canva Pro", slug: "canva-pro-bangladesh", price: "৳499/mo", desc: "Create visual teaching aids, classroom posters, and student handouts." },
    { name: "Google AI Pro", slug: "gemini-advanced-bangladesh", price: "৳599/mo", desc: "AI in Google Classroom, Docs, Sheets + 2TB storage for course materials." },
    { name: "Grammarly Premium", slug: "grammarly-premium-bangladesh", price: "৳399/mo", desc: "Check student essays, proofread materials, and write professional reports." },
    { name: "Notion Business", slug: "notion-business-bangladesh", price: "৳800/mo", desc: "Organize lesson plans, student progress trackers, and curriculum in one place." }];

const faqs = [{ question: "What AI tools should Bangladeshi teachers use?", answer: "ChatGPT Plus (৳499/mo) for lesson planning and quiz generation, Gamma (৳399/mo) for AI presentations, and Google AI Pro (৳499/mo) for Google Classroom integration. Total: ৳1,249/mo for a complete teaching AI stack. All with bKash." }];

export default function Page() {
  return (
    <>
      <FAQPageJsonLd items={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Teachers", path: "/best-ai-for-teachers" }]} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Teachers</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Best AI Tools for Teachers in Bangladesh 2026</h1>
          <p className="mt-4 text-lg leading-7 text-[#8a91a8]">Top AI tools for Bangladeshi teachers and educators — lesson planning, grading automation, presentations. bKash/Nagad.</p>
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
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi, I'm a teacher/educator. What AI tools should I use?")}`} className="btn-whatsapp h-12 px-8 text-[0.875rem]">
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
