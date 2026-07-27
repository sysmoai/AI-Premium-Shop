import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Video } from "lucide-react";

export const metadatanswer: Metadata = buildMetadata({
  title: "Best AI Tools for Content Creators in Bangladesh 2026",
  description: "Top AI tools for Bangladeshi YouTubers, TikTok creators, and influencers — CapCut Pro ৳299, Midjourney ৳1,199, ElevenLabs, Runway. bKash/Nagad.",
  canonical: "https://aipremiumshop.com/best-ai-for-creators",
});

const tools = [
  { name: "CapCut Pro", slug: "capcut-pro-bangladesh", price: "৳299/mo", desc: "#1 video editor for TikTok, Reels & Shorts. AI effects, auto-captions, trending templates." },
  { name: "Midjourney", slug: "midjourney-bangladesh", price: "৳1,199/mo", desc: "Thumbnails, cover art, and visual assets that get clicks. Photorealistic quality." },
  { name: "Canva Pro", slug: "canva-pro-bangladesh", price: "৳499/mo", desc: "Thumbnails, channel banners, and social posts with AI Magic Studio." },
  { name: "ElevenLabs", slug: "elevenlabs-bangladesh", price: "৳748/mo", desc: "AI voiceovers in 29+ languages — narration, dubbing, character voices." },
  { name: "Runway", slug: "runway-bangladesh", price: "৳1,794/mo", desc: "Professional AI video generation, 4K upscaling, and video editing." },
  { name: "ChatGPT Plus", slug: "chatgpt-plus-bangladesh", price: "৳499/mo", desc: "Video scripts, content ideas, titles, descriptions, and SEO optimization." },
];

const faqs = [
  { question: "Which AI tools do Bangladeshi YouTubers use?", answer: "CapCut Pro (৳299/mo) for editing, ChatGPT Plus (৳499/mo) for scripts, and Canva Pro (৳499/mo) for thumbnails. Total: ৳1,148/mo for a complete creator stack. All with bKash." },
  { question: "Can I get CapCut Pro in Bangladesh with bKash?", answer: "Yes — AI Premium Shop delivers CapCut Pro (৳299/mo) via WhatsApp within 5-15 minutes. Pay with bKash or Nagad." },
];

export default function BestAIForCreatorsPage() {
  return (
    <>
      <FAQPageJsonLd items={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Best AI for best-ai-for-creators", path: "/best-ai-for-creators" }]} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Creators</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Best AI Tools for Content Creators — 2026</h1>
          <p className="mt-4 text-lg leading-7 text-[#8a91a8]">Video, voice, visuals — create faster with AI. bKash/Nagad payment.</p>
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
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi, I create content. What AI tools do I need?")}`} className="btn-whatsapp h-12 px-8 text-[0.875rem]">
              <MessageCircle className="size-4" /> Get creator recommendations <ArrowRight className="size-4" />
            </a>
          </div>
          <section className="mt-16"><h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
            <dl className="mt-6 space-y-4">{faqs.map((item, i) => (
              <div key={i} className="rounded-lg border border-white/[0.06] glass-card p-6">
                <dt className="text-lg font-semibold text-white">{item.question}</dt>
                <dd className="mt-2 leading-7 text-[#8a91a8]">{item.answer}</dd>
              </div>
            ))}</dl>
          </section>
        </section>
      </main>
    </>
  );
}
