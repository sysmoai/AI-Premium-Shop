import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "AI Tools Under BDT 1000/month in Bangladesh 2026",
  description: "Budget AI subscriptions under BDT 1000/mo in Bangladesh. 36 affordable AI tools — ChatGPT, Perplexity, Gemini & more. bKash/Nagad.",
  canonical: "https://aipremiumshop.com/ai-under-1000",
});

const tools = [{ name: "Kling AI — Starter Shared", slug: "kling-ai-bangladesh", price: "799", desc: "Kling AI creates stunning AI videos from text and images. Leading Chinese text-t" }, { name: "Replit Core", slug: "replit-bangladesh", price: "500", desc: "Shared Replit Core. Cloud IDE with AI Agent, deploy and host apps. Budget-friend" }, { name: "Meta AI Premium", slug: "meta-ai-bangladesh", price: "299", desc: "Shared Meta AI Premium. Llama 4, real-time image gen, WhatsApp/Instagram integra" }, { name: "Perplexity Pro", slug: "perplexity-pro-bangladesh", price: "599", desc: "Shared Perplexity Pro. AI-powered deep research with citations. 300+ Pro searche" }, { name: "QuillBot Premium — Starter Shared", slug: "quillbot-premium-bangladesh", price: "390", desc: "AI paraphrasing, summarizing, grammar checking, and plagiarism detection. Perfec" }, { name: "Gamma Plus", slug: "gamma-bangladesh", price: "399", desc: "Shared Gamma Plus. AI presentations, docs, websites. Remove branding, advanced A" }, { name: "Codeium", slug: "codeium-bangladesh", price: "399", desc: "Shared Codeium Pro. Full autocomplete, 500+ fast requests/mo, 70+ IDE support. B" }, { name: "Mistral AI", slug: "mistral-ai-bangladesh", price: "399", desc: "Shared Mistral AI Pro. Mistral Large, Codestral, Le Chat. Best open-source reaso" }, { name: "CapCut Pro — Starter Shared", slug: "capcut-pro-bangladesh", price: "299", desc: "CapCut Pro — the #1 video editing app for TikTok, Reels & Shorts. AI effects, au" }, { name: "Freepik Premium — Shared", slug: "freepik-premium-bangladesh", price: "499", desc: "Freepik Premium gives you unlimited access to millions of premium vectors, photo" }, { name: "Grammarly Premium — Starter Shared", slug: "grammarly-premium-bangladesh", price: "399", desc: "AI-powered writing assistant for grammar, spelling, tone, and clarity. Essential" }, { name: "Descript Pro — Starter Shared", slug: "descript-pro-bangladesh", price: "470", desc: "AI video and podcast editing. Edit video by editing text. Auto-transcription, ov" }, { name: "Udio Pro", slug: "udio-bangladesh", price: "499", desc: "Shared Udio Pro. 1200 credits/mo, generate up to 8 songs at once, all features. " }, { name: "Canva Pro", slug: "canva-pro-bangladesh", price: "399", desc: "Shared Canva Pro. 100M+ stock assets, Magic Studio AI, 1TB storage, brand kit, b" }, { name: "Murf.ai", slug: "murf-ai-bangladesh", price: "740", desc: "Shared Murf.ai. 120+ AI voices, 20+ languages, voice cloning, commercial license" }];

const faqs = [
  { question: "What is the cheapest AI subscription in Bangladesh?", answer: "You can get ChatGPT Plus Shared at BDT 499/mo, Perplexity Pro at BDT 499/mo, and CapCut Pro at BDT 299/mo. All available with bKash/Nagad payment via AI Premium Shop." },
  { question: "Can I get premium AI tools under BDT 1000 in Bangladesh?", answer: "Yes! 33 AI tools are available under BDT 1000/mo at AI Premium Shop — including ChatGPT Plus (BDT 499), Google AI Pro (BDT 499), Canva Pro (BDT 499), and more. All with bKash/Nagad payment." },
];

export default function AIUnder1000Page() {
  return (<>
    <FAQPageJsonLd items={faqs} />
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "AI Under BDT 1000", path: "/ai-under-1000" }]} />
    <main className="min-h-screen"><section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Budget AI</p>
      <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">AI Tools Under BDT 1000/Month — 2026</h1>
      <p className="mt-4 text-lg leading-7 text-[#8a91a8]">36 affordable AI subscriptions for Bangladeshi users. bKash/Nagad payment.</p>

      <div className="mt-6 p-4 rounded-xl border border-[#f4b942]/10 bg-[#f4b942]/[0.03]">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#f4b942]">Quick Answer</p>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-[#c9ceda]">
          You can get <strong>33 premium AI subscriptions under BDT 1000/month</strong> at AI Premium Shop — including ChatGPT Plus (BDT 499), Google AI Pro (BDT 499), Canva Pro (BDT 499), and Perplexity Pro (BDT 499). All with bKash/Nagad payment — no international card needed. Trusted by a growing community of customers since 2024.
        </p>
      </div>

      <div className="mt-6 p-4 rounded-xl border border-white/[0.04] bg-white/[0.02]">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280] mb-2">বাংলা</p>
        <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">
          <strong>BDT 1000/মাসের নিচে 33টি প্রিমিয়াম AI টুল</strong> পাওয়া যায় AI Premium Shop-এ — ChatGPT Plus (BDT ৩৫০), Google AI Pro (BDT ৫০০), Canva Pro (BDT ৪৯৯), Perplexity Pro (BDT ৩৫০)। bKash/Nagad দিয়ে পেমেন্ট — আন্তর্জাতিক কার্ড লাগবে না।
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/products/${tool.slug}`} className="glass-card rounded-xl p-5 hover:border-[#f4b942]/20 border border-white/[0.06] transition group">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white group-hover:text-[#f4b942] transition">{tool.name}</h3>
              <span className="text-sm font-bold text-[#f4b942]">৳{tool.price}/mo</span>
            </div>
            <p className="mt-2 text-[0.8125rem] text-[#8a91a8]">{tool.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi, what can I get under BDT 1000?")}`} className="btn-whatsapp h-12 px-8 text-[0.875rem]">
          <MessageCircle className="size-4" /> Order your budget AI tool <ArrowRight className="size-4" />
        </a>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
        <dl className="mt-6 space-y-4">{faqs.map((item, i) => (
          <div key={i} className="rounded-lg border border-white/[0.06] glass-card p-6">
            <dt className="text-lg font-semibold text-white">{item.question}</dt>
            <dd className="mt-2 leading-7 text-[#8a91a8]">{item.answer}</dd>
          </div>
        ))}
        </dl>
      </section>
    </section></main>
  </>);
}
