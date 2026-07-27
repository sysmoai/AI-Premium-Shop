import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export const metadatanswer: Metadata = buildMetadata({
  title: "Best AI Design Tools for Designers in Bangladesh 2026",
  description: "Top AI design tools — Midjourney ৳1,199, Canva Pro ৳499, Adobe Firefly ৳799, Ideogram, Leonardo AI. bKash/Nagad payment.",
  canonical: "https://aipremiumshop.com/best-ai-for-designers",
});

const tools = [
  { name: "Midjourney", slug: "midjourney-bangladesh", price: "৳1,199/mo", desc: "Highest-quality AI image generation for concept art, branding, and mood boards." },
  { name: "Canva Pro", slug: "canva-pro-bangladesh", price: "৳499/mo", desc: "All-in-one design platform with AI Magic Studio, templates, and brand kit." },
  { name: "Adobe Firefly", slug: "adobe-firefly-bangladesh", price: "৳799/mo", desc: "Generative AI inside Photoshop — fill, expand, recolor. Commercial-safe." },
  { name: "Ideogram", slug: "ideogram-bangladesh", price: "৳2,990/mo", desc: "Best AI for text-in-image, logo design, and typography work." },
  { name: "Freepik Premium", slug: "freepik-premium-bangladesh", price: "৳499/mo", desc: "Millions of premium vectors, PSDs, icons, and stock images + AI generator." },
  { name: "Leonardo AI", slug: "leonardo-ai-bangladesh", price: "৳499/mo", desc: "Budget-friendly with character consistency and 3D-to-image features." },
  { name: "ChatGPT Plus", slug: "chatgpt-plus-bangladesh", price: "৳499/mo", desc: "DALL-E image generation, design brief writing, and creative idea generation." },
  { name: "Kling AI", slug: "kling-ai-bangladesh", price: "৳799/mo", desc: "Cinematic AI video with character consistency for motion designers." },
];

const faqs = [
  { question: "Which AI design tool is best for Bangladeshi graphic designers?", answer: "Midjourney (৳1,199/mo) for highest quality images, Canva Pro (৳499/mo) for day-to-day design work, and Adobe Firefly (৳799/mo) for Photoshop integration. Total: ~৳1,888/mo for a professional AI design stack." },
  { question: "Can I use AI for client design work in Bangladesh?", answer: "Yes — Midjourney, Ideogram, and Leonardo AI all grant commercial usage rights on their paid plans. Adobe Firefly is trained on licensed content so it's fully commercial-safe. Use these tools to speed up concepting, mockups, and asset creation." },
];

export default function BestAIForDesignersPage() {
  return (<>
    <FAQPageJsonLd items={faqs} /><BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Best AI for best-ai-for-designers", path: "/best-ai-for-designers" }]} />
    <main className="min-h-screen"><section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Designers</p>
      <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Best AI Design Tools for Designers — 2026</h1>
      <p className="mt-4 text-lg leading-7 text-[#8a91a8]">Generate, edit, and enhance — professional AI tools for graphic designers. bKash/Nagad.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">{tools.map((tool) => (
        <Link key={tool.slug} href={`/products/${tool.slug}`} className="glass-card rounded-xl p-5 hover:border-[#f4b942]/20 border border-white/[0.06] transition group">
          <div className="flex items-center justify-between"><h3 className="font-semibold text-white group-hover:text-[#f4b942] transition">{tool.name}</h3><span className="text-sm font-bold text-[#f4b942]">{tool.price}</span></div>
          <p className="mt-2 text-[0.8125rem] text-[#8a91a8]">{tool.desc}</p>
        </Link>
      ))}</div>
      <div className="mt-10 flex justify-center">
        <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi, I'm a designer. Help me pick the right AI tools.")}`} className="btn-whatsapp h-12 px-8 text-[0.875rem]"><MessageCircle className="size-4" /> Get design AI recommendations <ArrowRight className="size-4" /></a>
      </div>
    </section></main>
  </>);
}
