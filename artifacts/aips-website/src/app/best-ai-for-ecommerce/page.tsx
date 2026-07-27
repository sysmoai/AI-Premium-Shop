import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export const metadatanswer: Metadata = buildMetadata({
  title: "Best AI Tools for E-commerce in Bangladesh 2026",
  description: "Top AI e-commerce tools for Bangladesh — product photos, ad copy, social media content. bKash/Nagad payment. 5-15 min delivery.",
  canonical: "https://aipremiumshop.com/best-ai-for-ecommerce",
});

const tools = [{ name: "ChatGPT Plus", slug: "chatgpt-plus-bangladesh", price: "৳499/mo", desc: "Product descriptions, ad copy, customer support emails, and FB ad scripts." },
    { name: "Midjourney", slug: "midjourney-bangladesh", price: "৳1,199/mo", desc: "Professional product mockups and lifestyle images without a photographer." },
    { name: "Canva Pro", slug: "canva-pro-bangladesh", price: "৳499/mo", desc: "Product banners, social media posts, and brand assets — no designer needed." },
    { name: "CapCut Pro", slug: "capcut-pro-bangladesh", price: "৳299/mo", desc: "Product videos and promotional content for TikTok/Reels — AI effects and captions." },
    { name: "Google AI Pro", slug: "gemini-advanced-bangladesh", price: "৳599/mo", desc: "AI in Gmail and Sheets + 2TB storage. Google's price: ৳2,500." },
    { name: "Freepik Premium", slug: "freepik-premium-bangladesh", price: "৳499/mo", desc: "Millions of stock photos and vectors for product listings + AI image generator." }];

const faqs = [{ question: "How can AI help my e-commerce business in Bangladesh?", answer: "AI creates product descriptions in seconds, generates professional product photos without a studio, writes FB ad copy that converts, and produces video content for TikTok/Reels. A ৳2,000/mo AI stack replaces ৳30,000+ in freelancer costs." },
    { question: "Can I create product images with AI?", answer: "Yes — Midjourney and Freepik's AI generator create professional product photos and lifestyle images. No photographer or studio needed. Perfect for Daraz, Shopify, and Facebook Shop sellers." }];

export default function Page() {
  return (
    <>
      <FAQPageJsonLd items={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "E-Commerce", path: "/best-ai-for-ecommerce" }]} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">E-Commerce</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Best AI Tools for E-commerce in Bangladesh 2026</h1>
          <p className="mt-4 text-lg leading-7 text-[#8a91a8]">Top AI tools for Bangladeshi e-commerce — ChatGPT, Midjourney for product images, Canva Pro, CapCut. Boost sales with AI.</p>
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
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi, I run an e-commerce business. Help me pick AI tools.")}`} className="btn-whatsapp h-12 px-8 text-[0.875rem]">
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
