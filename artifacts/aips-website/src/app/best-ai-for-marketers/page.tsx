import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export const metadatanswer: Metadata = buildMetadata({
  title: "Best AI Tools for Marketers in Bangladesh 2026",
  description: "Top AI marketing tools — Jasper, Canva Pro ৳499, Midjourney, Writesonic, ChatGPT. Create ads and content faster. bKash/Nagad payment.",
  canonical: "https://aipremiumshop.com/best-ai-for-marketers",
});

const tools = [
  { name: "ChatGPT Plus", slug: "chatgpt-plus-bangladesh", price: "৳499/mo", desc: "Ad copy, email sequences, social posts, and marketing strategy in seconds." },
  { name: "Canva Pro", slug: "canva-pro-bangladesh", price: "৳499/mo", desc: "Facebook ads, Instagram posts, and brand kits with AI Magic Studio." },
  { name: "Jasper", slug: "jasper-bangladesh", price: "৳1,499/mo", desc: "Purpose-built AI marketing platform — brand voice, SEO mode, 50+ templates." },
  { name: "Midjourney", slug: "midjourney-bangladesh", price: "৳1,199/mo", desc: "Ad creative images, campaign visuals, and social graphics at production quality." },
  { name: "Writesonic", slug: "writesonic-bangladesh", price: "৳799/mo", desc: "AI SEO content, blog posts, and product descriptions that rank on Google." },
];

export default function BestAIForMarketersPage() {
  return (
    <>
      <FAQPageJsonLd items={[{ question: "What AI tools do Bangladeshi digital marketers use?", answer: "ChatGPT Plus (৳499/mo) for copy and strategy, Canva Pro (৳499/mo) for visuals, and Midjourney (৳1,199/mo) for ad creative. Total: ~৳2,048/mo. All with bKash/Nagad." }]} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Best AI for best-ai-for-marketers", path: "/best-ai-for-marketers" }]} />
      <main className="min-h-screen"><section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Marketers</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Best AI Tools for Marketers — 2026</h1>
        <p className="mt-4 text-lg leading-7 text-[#8a91a8]">Create campaigns, write copy, and design ads faster with AI. bKash/Nagad.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">{tools.map((tool) => (
          <Link key={tool.slug} href={`/products/${tool.slug}`} className="glass-card rounded-xl p-5 hover:border-[#f4b942]/20 border border-white/[0.06] transition group">
            <div className="flex items-center justify-between"><h3 className="font-semibold text-white group-hover:text-[#f4b942] transition">{tool.name}</h3><span className="text-sm font-bold text-[#f4b942]">{tool.price}</span></div>
            <p className="mt-2 text-[0.8125rem] text-[#8a91a8]">{tool.desc}</p>
          </Link>
        ))}</div>
        <div className="mt-10 flex justify-center">
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi, I need AI tools for marketing.")}`} className="btn-whatsapp h-12 px-8 text-[0.875rem]"><MessageCircle className="size-4" /> Get marketing AI recommendations <ArrowRight className="size-4" /></a>
        </div>
      </section></main>
    </>
  );
}
