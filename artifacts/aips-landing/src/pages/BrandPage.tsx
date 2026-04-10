import { useMemo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import productsData from "../../data/products.json";

const WHATSAPP = "https://wa.me/8801865385348";

interface Product {
  id: string;
  name: string;
  brand: string;
  brandSlug: string;
  brandColor: string;
  category: string;
  price: number;
  officialUSD: number | null;
  tier: string;
  accessType: string;
  badge?: string;
  description: string;
  deliverySLA: string;
  capabilities?: string[];
  whatsappMsg?: string;
}

const BRAND_META: Record<string, {
  displayName: string;
  tagline: string;
  description: string;
  accentColor: string;
  faqs: { q: string; a: string }[];
}> = {
  "leonardo-ai-bangladesh": {
    displayName: "Leonardo AI",
    tagline: "AI Image Generation — from ৳599/month",
    description: "Leonardo AI is a powerful AI image generator built for creative professionals. Generate stunning visuals, 3D textures, concept art, and photorealistic images. Shared Apprentice plan available from ৳599/month — includes 8,500 tokens and full commercial rights.",
    accentColor: "#7c3aed",
    faqs: [
      { q: "What is Leonardo AI best for?", a: "Leonardo AI excels at game assets, concept art, character design, product photography, and stylized illustrations. Its fine-tuning capabilities let you train on your own style." },
      { q: "How many images can I generate with 8,500 tokens?", a: "On the Apprentice plan with 8,500 tokens, you can generate approximately 850–2,000 images per month depending on resolution and generation speed." },
      { q: "Is Leonardo AI good for commercial use?", a: "Yes. All paid Leonardo AI plans include full commercial use rights. You can use generated images for client projects, products, and publishing." },
      { q: "How does it compare to Midjourney?", a: "Midjourney generally produces more artistic and photorealistic results. Leonardo AI offers more fine-tuning options, faster generation, and a more user-friendly interface for high-volume generation." },
      { q: "How fast is delivery?", a: "Shared Leonardo AI accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },
  "udio-bangladesh": {
    displayName: "Udio",
    tagline: "AI Music Generation — from ৳499/month",
    description: "Udio is an advanced AI music generation platform that creates full songs from text prompts. Generate royalty-free music in any genre — pop, hip-hop, classical, electronic, Bangla folk, and more. Shared Pro plan with 1,200 credits/month from ৳499.",
    accentColor: "#ec4899",
    faqs: [
      { q: "What genres can Udio create?", a: "Udio can generate music in virtually any genre: pop, hip-hop, rock, classical, jazz, electronic, lo-fi, Bangla folk, Bollywood style, and more. You can specify tempo, mood, instruments, and vocals in your prompt." },
      { q: "Can I use Udio music commercially?", a: "Yes. Udio Pro plan includes commercial use rights. Generated music can be used for YouTube videos, social media, products, and client work." },
      { q: "How many songs can I create with 1,200 credits?", a: "Each generation uses approximately 5-10 credits. With 1,200 credits, you can generate approximately 120-240 songs per month on the shared plan." },
      { q: "How is Udio different from Suno AI?", a: "Both are excellent AI music generators. Udio generally has better lyrical coherence and more realistic instrument simulation. Suno is faster and has more credits at similar price points. Many creators use both." },
      { q: "How fast is delivery?", a: "Shared Udio Pro accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },
  "heygen-bangladesh": {
    displayName: "HeyGen",
    tagline: "AI Avatar Videos — from ৳1,499/month",
    description: "HeyGen is the leading AI avatar video platform. Create professional videos with 700+ AI avatars in 175+ languages — no camera or editing experience required. Clone your own avatar for authentic AI-generated presentations, training videos, and marketing content.",
    accentColor: "#6366f1",
    faqs: [
      { q: "What can I create with HeyGen?", a: "HeyGen is used for explainer videos, product demos, training content, social media videos, news reports, and marketing campaigns. The AI avatars speak naturally in 175+ languages with lip-sync accuracy." },
      { q: "Can HeyGen speak Bangla?", a: "Yes. HeyGen supports Bangla among its 175+ languages. You can create AI avatar videos in Bangla for local audiences." },
      { q: "Does the shared plan allow unlimited video creation?", a: "Yes. The Creator plan includes unlimited video generation. You can create as many videos as you need within your monthly plan." },
      { q: "Can I create a custom avatar of myself?", a: "The Creator plan shared through AIPS uses HeyGen's stock avatars. Contact us on WhatsApp if you need a personal account with custom avatar training." },
      { q: "How fast is delivery?", a: "Shared HeyGen Creator accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },
  "otter-ai-bangladesh": {
    displayName: "Otter.ai",
    tagline: "AI Meeting Transcription — from ৳799/month",
    description: "Otter.ai is the AI meeting assistant that automatically transcribes, summarizes, and captures action items from your meetings. Works with Zoom, Google Meet, and Teams. Stop taking notes — let Otter handle everything so you can focus on the conversation.",
    accentColor: "#3b82f6",
    faqs: [
      { q: "What platforms does Otter.ai work with?", a: "Otter.ai integrates with Zoom, Google Meet, Microsoft Teams, and Webex. It joins as a bot, transcribes in real time, and sends summaries automatically after meetings end." },
      { q: "Does Otter.ai work for Bangla meetings?", a: "Otter.ai is currently optimized for English meetings. For bilingual teams where English is used professionally, it works well and significantly reduces follow-up time." },
      { q: "What are action items and how does Otter extract them?", a: "Otter AI automatically identifies tasks, decisions, and follow-ups from meeting transcriptions. It labels them as action items and can send them to participants by email." },
      { q: "How many minutes of transcription do I get?", a: "The Pro shared plan includes 6,000 minutes of transcription per month — enough for roughly 100 one-hour meetings." },
      { q: "How fast is delivery?", a: "Shared Otter.ai Pro accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },
  "writesonic-bangladesh": {
    displayName: "Writesonic",
    tagline: "AI Writing & SEO Content — from ৳799/month",
    description: "Writesonic is an AI content writing platform built for marketers, bloggers, and agencies. Generate SEO-optimized blog posts, product descriptions, ad copy, and social media content with GPT-4o. Integrates with SurferSEO for keyword-optimized content that ranks.",
    accentColor: "#6366f1",
    faqs: [
      { q: "What types of content can Writesonic create?", a: "Writesonic creates SEO blog posts, product descriptions, Google and Facebook ad copy, email campaigns, landing page copy, social media captions, and press releases. The Article Writer produces complete 1,500-3,000 word posts from a headline." },
      { q: "Does Writesonic help with SEO?", a: "Yes. Writesonic integrates with SurferSEO to analyze keyword density, NLP terms, and competitor content. The AI Article Writer produces content designed to rank in search engines." },
      { q: "Can Writesonic write in Bangla?", a: "Writesonic supports 25+ languages including Bangla. You can generate content in Bangla for local audiences or start in English and translate." },
      { q: "How many credits do I get per month?", a: "The Individual plan includes 100 credits per month on the shared plan. One long-form blog post typically uses 3-5 credits. Contact us on WhatsApp if you need higher volume." },
      { q: "How fast is delivery?", a: "Shared Writesonic accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },
  "gamma-bangladesh": {
    displayName: "Gamma",
    tagline: "AI Presentations & Docs — from ৳399/month",
    description: "Gamma creates beautiful presentations, documents, and websites from a single text prompt. Replace boring PowerPoint slides with AI-designed decks that look professionally made. Used by teams at Google, Shopify, and thousands of startups. Shared Plus plan from ৳399.",
    accentColor: "#8b5cf6",
    faqs: [
      { q: "What is Gamma used for?", a: "Gamma is used for pitch decks, investor presentations, product demos, training materials, reports, and personal portfolios. It generates beautiful, shareable presentations from a brief description in under 2 minutes." },
      { q: "Is Gamma better than PowerPoint?", a: "For speed and design quality, yes. Gamma generates polished presentations without manual formatting. For complex custom designs or presentations that need pixel-perfect control, PowerPoint may be preferable. Most users find Gamma handles 90% of their presentation needs faster." },
      { q: "Can Gamma create websites?", a: "Yes. Gamma can generate shareable microsite-style websites from prompts. These are great for landing pages, link-in-bio pages, event pages, and portfolios." },
      { q: "Does the Plus plan remove Gamma branding?", a: "Yes. Gamma Plus removes the Gamma watermark from your presentations, making them fully white-labeled." },
      { q: "How fast is delivery?", a: "Shared Gamma Plus accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },
  "v0-dev-bangladesh": {
    displayName: "v0.dev",
    tagline: "AI Web App Builder — from ৳999/month",
    description: "v0.dev by Vercel is the leading AI web application builder. Describe what you want to build and v0 generates production-ready React code with Tailwind CSS. Deploy instantly to Vercel. Used by professional developers and non-technical founders to ship products 10x faster.",
    accentColor: "#111827",
    faqs: [
      { q: "What can I build with v0.dev?", a: "v0.dev can build UI components, full web app pages, dashboards, forms, landing pages, and complete web applications. It generates production-ready React + Tailwind code that you can deploy directly." },
      { q: "Do I need to know how to code to use v0?", a: "No. v0.dev is designed for both technical and non-technical users. You describe what you want in plain English and v0 generates the code. You can then iterate through conversation." },
      { q: "Is the shared plan suitable for building real projects?", a: "Yes. The shared Pro plan gives you v0.dev Pro capabilities for building and iterating on projects. For team use with multiple projects, contact us about a personal plan." },
      { q: "Can I use v0.dev with my own domain?", a: "v0.dev generates code that you own. You can deploy to Vercel, Netlify, or any hosting provider, using your own custom domain." },
      { q: "How fast is delivery?", a: "Shared v0.dev Pro accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },
  "replit-bangladesh": {
    displayName: "Replit",
    tagline: "AI Cloud Development — ৳500/month",
    description: "Replit Core is a cloud-based AI development environment. Build, host, and deploy apps with an AI agent that writes code, fixes bugs, and deploys for you — all from your browser. AIPS special pricing: ৳500/month (official price ৳2,990/month). Save 83%.",
    accentColor: "#f26207",
    faqs: [
      { q: "What is Replit Core?", a: "Replit Core is a full cloud IDE with an AI agent that writes and deploys code. You describe what you want to build, the AI writes the code, and Replit hosts and deploys it automatically." },
      { q: "Do I need programming experience to use Replit?", a: "Replit is used by experienced developers and complete beginners. The AI agent can handle coding entirely — you describe what you want and it builds it. Many Replit users have no prior coding experience." },
      { q: "What can I build with Replit?", a: "Web apps, APIs, bots, scripts, data analysis tools, games, and more. Replit handles hosting and deployment automatically — your project gets its own URL without any server configuration." },
      { q: "Why is the AIPS price so low?", a: "AI Premium Shop is authorized to offer Replit Core at a special promotional rate for Bangladesh. This ৳500 price is exclusive to AIPS customers — you cannot get this price directly from Replit." },
      { q: "How fast is delivery?", a: "Replit Core personal accounts are delivered within 2–4 hours after payment confirmation." },
    ],
  },
};

interface BrandPageProps {
  brandSlug: string;
}

export default function BrandPage({ brandSlug }: BrandPageProps) {
  const [, navigate] = useLocation();
  const meta = BRAND_META[brandSlug];

  const products = useMemo(
    () => (productsData.products as Product[])
      .filter((p) => p.brandSlug === brandSlug)
      .sort((a, b) => a.price - b.price),
    [brandSlug]
  );

  if (!meta) {
    return (
      <PageLayout>
        <div className="text-center py-40 text-white">Brand page not found.</div>
      </PageLayout>
    );
  }

  const cheapest = products[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": meta.displayName,
    "description": meta.description,
    "brand": { "@type": "Brand", "name": meta.displayName },
    "offers": products.map((p) => ({
      "@type": "Offer",
      "name": p.name,
      "price": p.price,
      "priceCurrency": "BDT",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "AI Premium Shop" },
    })),
  };

  return (
    <PageLayout>
      <SEOHead
        title={`${meta.displayName} in Bangladesh — ${meta.tagline} | AI Premium Shop`}
        description={meta.description.slice(0, 160)}
        canonical={`https://aipremiumshop.com/${brandSlug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: "#c9ceda" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-white transition-colors">All Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: meta.accentColor }}>{meta.displayName}</span>
        </nav>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-medium"
            style={{ backgroundColor: meta.accentColor + "20", color: meta.accentColor }}>
            Bangladesh Pricing
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {meta.displayName} Bangladesh
          </h1>
          <p className="text-xl font-semibold mb-4" style={{ color: meta.accentColor }}>
            {meta.tagline}
          </p>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "#c9ceda" }}>
            {meta.description}
          </p>
        </motion.div>

        {/* Products */}
        {products.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-white">Available Plans</h2>
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: meta.accentColor + "20", color: meta.accentColor }}>
                {products.length} {products.length === 1 ? "plan" : "plans"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p, i) => {
                const waLink = `${WHATSAPP}?text=${encodeURIComponent(p.whatsappMsg ?? `Hi, I want to order ${p.name} (BDT ${p.price})`)}`;
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="relative rounded-2xl border border-white/10 flex flex-col overflow-hidden"
                    style={{ backgroundColor: "#151b3d" }}
                  >
                    <div className="h-1 w-full" style={{ backgroundColor: meta.accentColor }} />
                    <div className="p-5 flex flex-col flex-1 gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-white text-sm leading-tight">{p.name}</div>
                          <div className="text-xs mt-0.5" style={{ color: meta.accentColor }}>{p.tier}</div>
                        </div>
                        {p.badge && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: "#f4b94222", color: "#f4b942" }}>
                            {p.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-xs leading-relaxed flex-1" style={{ color: "#c9ceda" }}>{p.description}</p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full border"
                          style={p.accessType === "shared"
                            ? { color: "#c9ceda", borderColor: "rgba(255,255,255,0.2)" }
                            : { color: "#f4b942", borderColor: "rgba(244,185,66,0.3)" }
                          }>
                          {p.accessType === "shared" ? "Shared" : "Personal"}
                        </span>
                        <span className="text-xs" style={{ color: "#c9ceda" }}>⚡ {p.deliverySLA}</span>
                        <span className="text-xs" style={{ color: "#c9ceda" }}>🛡 30-day warranty</span>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <div>
                          <div className="text-xl font-bold" style={{ color: "#f4b942" }}>BDT {p.price.toLocaleString()}</div>
                          {p.officialUSD != null && (
                            <div className="text-xs" style={{ color: "#c9ceda" }}>${p.officialUSD}/mo official</div>
                          )}
                        </div>
                        <a href={waLink} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: "#25d366", color: "#fff" }}>
                          <MessageCircle className="w-4 h-4" />
                          Order
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* How to Order */}
        <div className="mb-14 p-6 rounded-2xl border border-white/10" style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-xl font-bold text-white mb-4">How to Order {meta.displayName} in Bangladesh</h2>
          <ol className="space-y-3 text-sm" style={{ color: "#c9ceda" }}>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: meta.accentColor + "30", color: meta.accentColor }}>1</span>
              <span>Message us on WhatsApp: <strong className="text-white">+880 1865-385348</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: meta.accentColor + "30", color: meta.accentColor }}>2</span>
              <span>Tell us which {meta.displayName} plan you want. We&apos;ll confirm availability and price.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: meta.accentColor + "30", color: meta.accentColor }}>3</span>
              <span>Pay via bKash, Nagad, or Rocket. Send payment screenshot on WhatsApp.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: meta.accentColor + "30", color: meta.accentColor }}>4</span>
              <span>Receive your account credentials. Delivery: {cheapest?.deliverySLA ?? "5–30 min"}. 30-day warranty.</span>
            </li>
          </ol>
          <a
            href={cheapest ? `${WHATSAPP}?text=${encodeURIComponent(cheapest.whatsappMsg ?? `Hi, I want ${meta.displayName}`)}` : WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#25d366", color: "#fff" }}
          >
            <MessageCircle className="w-5 h-5" />
            Order {meta.displayName} on WhatsApp
          </a>
        </div>

        {/* FAQs */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">{meta.displayName} — Frequently Asked Questions</h2>
          <div className="space-y-3">
            {meta.faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-white/10 overflow-hidden" style={{ backgroundColor: "#151b3d" }}>
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-white text-sm">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-open:rotate-90" style={{ color: "#f4b942" }} />
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Related links */}
        <div className="mb-10">
          <h3 className="font-semibold text-white mb-4">Browse more AI categories</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "AI Assistant & Chat", href: "/ai-assistant" },
              { label: "AI Image & Design", href: "/ai-image" },
              { label: "AI Code & Dev Tools", href: "/ai-code" },
              { label: "AI Voice & Music", href: "/ai-voice-music" },
              { label: "All 57 Products", href: "/products" },
            ].map((link) => (
              <a key={link.href} href={link.href}
                onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-sm hover:border-white/30 transition-colors"
                style={{ color: "#c9ceda", minHeight: "44px" }}>
                {link.label}
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
