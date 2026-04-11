import { useMemo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import { faqSchema, schemaJson } from "@/utils/schemas";
import productsData from "../../data/products.json";

const WHATSAPP = "https://wa.me/8801865385348";

interface CategoryConfig {
  id: string;
  displayName: string;
  seoTitle: string;
  subtitle: string;
  description: string;
  metaDescription: string;
  accent: string;
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
  guides: { label: string; href: string }[];
}

const CATEGORIES: Record<string, CategoryConfig> = {
  "ai-assistant": {
    id: "ai-assistant",
    displayName: "AI Assistant & Chat",
    seoTitle: "AI Assistant & Chat — ChatGPT, Claude, Gemini Bangladesh",
    subtitle: "ChatGPT, Claude, Gemini, Grok & more",
    description:
      "The world's most powerful AI assistants. Write, code, research, create images, and automate tasks. From ChatGPT and Claude to Gemini and Perplexity — find your perfect AI partner. All plans available with local payment via bKash, Nagad, or Rocket.",
    metaDescription:
      "ChatGPT, Claude, Gemini, Grok, Perplexity in Bangladesh. From BDT 350. Shared & Personal. bKash/Nagad. Fast delivery.",
    accent: "#10a37f",
    faqs: [
      { q: "What's the difference between Shared and Personal accounts?", a: "Shared accounts are cost-effective: you access the same plan as other users (no chat history sharing). Personal accounts are yours alone — full privacy, custom settings, and no usage limits from others." },
      { q: "Which AI assistant is best for students in Bangladesh?", a: "ChatGPT Plus Shared (BDT 350) is the best starter. For more demanding work, Claude Pro Shared (BDT 599) offers the best writing and analysis — ranked #1 on Chatbot Arena." },
      { q: "Can I switch models after ordering?", a: "Yes — you get access to all models within your plan. ChatGPT Plus includes GPT-5.4, image generation, web search, and AI agents. Claude Pro includes all Claude models including Opus 4.6." },
      { q: "How fast is delivery?", a: "Most AI assistant accounts are delivered within 5–30 minutes of payment confirmation, even at midnight." },
    ],
    related: [
      { label: "AI Image & Design", href: "/ai-image" },
      { label: "AI Code & Dev Tools", href: "/ai-code" },
      { label: "AI Workspace", href: "/ai-workspace" },
    ],
    guides: [
      { label: "Best AI for Students", href: "/best-ai-for-students" },
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
      { label: "Best AI for Business", href: "/best-ai-for-business" },
      { label: "Best AI for Job Seekers", href: "/best-ai-for-job-seekers" },
    ],
  },
  "ai-image": {
    id: "ai-image",
    displayName: "AI Image & Design",
    seoTitle: "AI Image Generator — Midjourney, Ideogram Bangladesh",
    subtitle: "Midjourney, Ideogram, Leonardo AI — text-to-image",
    description:
      "Create stunning visuals with AI. Generate images from text prompts, design logos, and produce photorealistic graphics. Midjourney for artistic quality, Ideogram for perfect text rendering, Leonardo AI for 3D and motion. All available in Bangladesh via bKash — no international card needed.",
    metaDescription:
      "Midjourney, Ideogram, Leonardo AI in Bangladesh. From BDT 599. AI image generation. bKash/Nagad payment.",
    accent: "#8b5cf6",
    faqs: [
      { q: "Which AI image tool is best for logo design?", a: "Ideogram is the best for logos and text-heavy designs — it renders text perfectly inside images. For artistic or photorealistic images, Midjourney Standard Plan is the top choice." },
      { q: "Can I use these images commercially?", a: "Midjourney Standard+ plans include stealth mode and commercial licensing rights. Ideogram Pro images can be used commercially. Leonardo AI Apprentice also includes commercial use. Always review each platform's full licensing terms." },
      { q: "What makes Ideogram different from Midjourney?", a: "Ideogram excels at rendering text accurately inside images — perfect for logos, posters, and typography. Midjourney creates more artistic, painterly images. Leonardo AI specializes in 3D textures and motion effects. They serve different creative needs." },
      { q: "How many images can I generate per month?", a: "Midjourney Basic: 200 fast images. Standard: 15hr fast GPU (roughly 900+ images) + unlimited relaxed. Ideogram Basic: 400 priority + unlimited slower generation." },
    ],
    related: [
      { label: "AI Video", href: "/ai-video" },
      { label: "AI Voice & Music", href: "/ai-voice-music" },
      { label: "AI Assistant & Chat", href: "/ai-assistant" },
    ],
    guides: [
      { label: "Best AI for Content Creators", href: "/best-ai-for-creators" },
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
      { label: "Best AI for Business", href: "/best-ai-for-business" },
    ],
  },
  "ai-video": {
    id: "ai-video",
    displayName: "AI Video",
    seoTitle: "AI Video Generator — Runway, HeyGen Bangladesh",
    subtitle: "Runway, HeyGen — text-to-video & AI avatars",
    description:
      "Generate and edit videos with AI. Text-to-video, image-to-video, 4K upscaling, and AI avatar creation. Runway Gen-4 is the leading platform used by filmmakers worldwide. HeyGen creates professional talking-head videos with AI avatars in 15+ languages — all accessible in Bangladesh with bKash payment.",
    metaDescription:
      "Runway & HeyGen AI video in Bangladesh. From BDT 1,499. AI video generation & avatars. Local payment.",
    accent: "#ec4899",
    faqs: [
      { q: "What can I make with Runway?", a: "Runway Gen-4 creates video from text prompts or reference images, applies motion effects, removes backgrounds from video, and provides advanced editing tools used by professional filmmakers and video editors." },
      { q: "What is HeyGen and who is it for?", a: "HeyGen creates AI avatar videos — professional talking-head videos where a digital avatar speaks your script in 15+ languages. Perfect for YouTube, product demos, and multilingual content without recording yourself." },
      { q: "Is AI video good enough for client work?", a: "For social media, concept visualization, and mood boards — yes. For broadcast commercial work, AI video is a complement to traditional production, not a replacement." },
      { q: "How fast is delivery?", a: "Runway and HeyGen accounts are delivered within 30–60 minutes after payment confirmation." },
    ],
    related: [
      { label: "AI Image & Design", href: "/ai-image" },
      { label: "AI Voice & Music", href: "/ai-voice-music" },
      { label: "AI Assistant & Chat", href: "/ai-assistant" },
    ],
    guides: [
      { label: "Best AI for Content Creators", href: "/best-ai-for-creators" },
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
    ],
  },
  "ai-voice-music": {
    id: "ai-voice-music",
    displayName: "AI Voice & Music",
    seoTitle: "AI Voice & Music — ElevenLabs, Suno Bangladesh",
    subtitle: "ElevenLabs, Suno AI — voice cloning & music generation",
    description:
      "Clone voices, generate speech, and create music with AI. ElevenLabs produces human-quality voiceovers in 29+ languages for content creators, podcasters, and businesses. Suno creates complete AI-generated songs — lyrics, vocals, and instrumentation — in any genre. Now available in Bangladesh via local payment.",
    metaDescription:
      "ElevenLabs, Suno AI, Udio in Bangladesh. From BDT 499. Voice cloning & AI music. Local payment.",
    accent: "#f97316",
    faqs: [
      { q: "Can I clone my own voice with ElevenLabs?", a: "Yes — ElevenLabs Starter and Creator plans include voice cloning from a short audio sample. The cloned voice can then generate unlimited audio in that voice." },
      { q: "What languages does ElevenLabs support?", a: "ElevenLabs supports 29+ languages including Bengali. You can generate speech in English, Hindi, Arabic, Spanish, and many more with native-quality pronunciation." },
      { q: "Can I use Suno music in my YouTube videos?", a: "Suno Pro allows commercial use of generated music. Always check Suno's current licensing terms before using in monetized content." },
      { q: "What's the difference between Suno and ElevenLabs?", a: "ElevenLabs generates speech and voiceovers (text-to-speech + voice cloning). Suno generates complete music tracks with vocals and instruments. They serve different creative needs." },
    ],
    related: [
      { label: "AI Video", href: "/ai-video" },
      { label: "AI Image & Design", href: "/ai-image" },
      { label: "AI Assistant & Chat", href: "/ai-assistant" },
    ],
    guides: [
      { label: "Best AI for Content Creators", href: "/best-ai-for-creators" },
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
    ],
  },
  "ai-code": {
    id: "ai-code",
    displayName: "AI Code & Dev Tools",
    seoTitle: "AI Coding Tools — GitHub Copilot, Cursor Bangladesh",
    subtitle: "GitHub Copilot, Cursor, v0.dev, Replit",
    description:
      "Code faster with AI pair programming. GitHub Copilot Pro integrates directly into VS Code, JetBrains, and Neovim. Cursor is the AI-native editor trusted by teams at OpenAI, Stripe, and Figma. v0.dev generates complete React UIs from text. Replit's agent builds full-stack apps — all available in Bangladesh via bKash from ৳500/month.",
    metaDescription:
      "GitHub Copilot, Cursor, v0.dev, Replit in Bangladesh. From BDT 500. AI coding tools. bKash/Nagad.",
    accent: "#06b6d4",
    faqs: [
      { q: "GitHub Copilot vs Cursor — which is better?", a: "GitHub Copilot integrates into your existing IDE (VS Code, JetBrains, Vim). Cursor is a standalone AI-first IDE built on VS Code. Cursor is more powerful for AI-driven development; Copilot is more convenient if you already use a specific IDE." },
      { q: "Can beginners use these tools?", a: "Yes — Replit's agent and v0.dev are built for non-developers. You describe what you want in English and the AI builds the full app or UI. GitHub Copilot and Cursor are best for developers who already code." },
      { q: "Does Cursor work with any programming language?", a: "Cursor supports all major languages: Python, JavaScript, TypeScript, Go, Rust, Java, C++, and more. It indexes your entire codebase for context-aware completions." },
      { q: "How fast is delivery?", a: "All AI code tools are delivered within 30–60 minutes of payment. Some like GitHub Copilot require a few steps to activate on your account." },
    ],
    related: [
      { label: "AI Workspace", href: "/ai-workspace" },
      { label: "AI Assistant & Chat", href: "/ai-assistant" },
      { label: "All Products", href: "/products" },
    ],
    guides: [
      { label: "Best AI for Developers", href: "/best-ai-for-developers" },
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
    ],
  },
  "ai-workspace": {
    id: "ai-workspace",
    displayName: "AI Workspace",
    seoTitle: "AI Workspace — Notion, Manus AI Bangladesh",
    subtitle: "Notion, Manus AI, Otter.ai, Gamma — productivity",
    description:
      "AI-powered productivity and collaboration for teams and individuals. Notion Business includes AI writing, summarization, and database features. Manus AI is an autonomous research and automation agent. Gamma generates beautiful presentations from one sentence. Otter.ai transcribes meetings automatically — all available in Bangladesh via bKash.",
    metaDescription:
      "Notion, Manus AI, Otter.ai, Gamma in Bangladesh. From BDT 399. AI productivity tools. Local payment.",
    accent: "#f4b942",
    faqs: [
      { q: "What does Notion AI add over regular Notion?", a: "Notion AI can write pages from prompts, summarize long documents, translate content, fill databases automatically, and answer questions about your workspace. It's integrated directly into your workflow." },
      { q: "What is Gamma and how is it different from Notion?", a: "Gamma generates beautifully designed presentations, docs, and websites from a single text prompt. Notion is for organizing notes, projects, and databases. They complement each other well — Gamma for presentations, Notion for ongoing work management." },
      { q: "Can Otter.ai transcribe Bangla meetings?", a: "Otter.ai is currently optimized for English. It works best for English-language meetings on Zoom, Google Meet, and Teams. For bilingual teams that use English professionally, it significantly reduces meeting follow-up time." },
      { q: "How fast is delivery?", a: "Notion Business and Manus AI are delivered within 2–4 hours after payment confirmation. Gamma and Otter.ai shared accounts are delivered within 5–30 minutes." },
    ],
    related: [
      { label: "AI Assistant & Chat", href: "/ai-assistant" },
      { label: "AI Code & Dev Tools", href: "/ai-code" },
      { label: "All Products", href: "/products" },
    ],
    guides: [
      { label: "Best AI for Business", href: "/best-ai-for-business" },
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
      { label: "Best AI for Students", href: "/best-ai-for-students" },
    ],
  },
  "ai-writing": {
    id: "ai-writing",
    displayName: "AI Writing & SEO",
    seoTitle: "AI Writing & SEO Tools — Writesonic Bangladesh",
    subtitle: "Writesonic — AI content writing, SEO & marketing copy",
    description:
      "AI-powered content writing and SEO tools. Writesonic Individual generates SEO-optimized blog posts, product descriptions, marketing copy, and social media content. Outrank competitors with AI-driven content at a fraction of the cost of hiring writers.",
    metaDescription:
      "AI writing tools in Bangladesh 2026. Writesonic Individual shared from BDT 799/mo. SEO content, blog writing, marketing copy. Pay with bKash, Nagad, Rocket.",
    accent: "#6366f1",
    faqs: [
      { q: "What is Writesonic used for?", a: "Writesonic is an AI content writing platform. It can generate SEO blog posts, product descriptions, ad copy, email campaigns, and social media content from short prompts. It uses GPT-4o and integrates with SurferSEO for keyword-optimized content." },
      { q: "Can Writesonic write in Bangla?", a: "Writesonic supports 25+ languages including Bangla. You can generate content in English and translate, or directly prompt in Bangla for local market content." },
      { q: "How is Writesonic different from ChatGPT for content?", a: "Writesonic is purpose-built for marketing and SEO content with templates, tone controls, brand voice settings, and an Article Writer that produces publish-ready long-form content. ChatGPT is more general-purpose. For content writers, Writesonic saves significant time with structured outputs." },
      { q: "Does AIPS sell Writesonic personal accounts?", a: "Currently we offer a shared Writesonic Individual plan. Message us on WhatsApp if you need a personal plan — we can arrange it based on your usage requirements." },
      { q: "How fast is delivery?", a: "Shared Writesonic accounts are delivered within 5–30 minutes after payment confirmation via WhatsApp." },
    ],
    related: [
      { label: "AI Assistant & Chat", href: "/ai-assistant" },
      { label: "AI Workspace", href: "/ai-workspace" },
      { label: "All Products", href: "/products" },
    ],
    guides: [
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
      { label: "Best AI for Content Creators", href: "/best-ai-for-creators" },
      { label: "Best AI for Business", href: "/best-ai-for-business" },
    ],
  },
  "bundles": {
    id: "bundles",
    displayName: "Bundles & Packages",
    seoTitle: "AI Tool Bundles — Student to Business Packages | From BDT 449",
    subtitle: "Multiple AI tools at a package price",
    description:
      "Save more with curated AI tool bundles. Each bundle is designed for a specific use case — students, freelancers, content creators, or business owners. Get multiple premium AI subscriptions at a discounted price compared to buying individually. Message us on WhatsApp to create a custom bundle.",
    metaDescription:
      "AI tool bundles for students, freelancers & business. From BDT 449. Save more. AI Premium Shop.",
    accent: "#e11d48",
    faqs: [
      { q: "What bundles are available?", a: "We're building curated bundles for specific needs. Message us on WhatsApp and we'll create a custom bundle based on your workflow and budget." },
      { q: "Can I get a discount if I buy multiple tools?", a: "Yes — ordering 2+ tools together qualifies for a bundle discount. Message us on WhatsApp with the tools you want and we'll provide a custom package price." },
      { q: "Can I mix and match tools in a bundle?", a: "Absolutely. Tell us your use case (e.g. 'I create YouTube videos' or 'I'm a developer') and we'll recommend and price the ideal combination for you." },
      { q: "How do I order a bundle?", a: "Message us on WhatsApp with your requirements. We'll confirm pricing, send payment details, and deliver all accounts after payment — usually within 30–60 minutes." },
    ],
    related: [
      { label: "AI Assistant & Chat", href: "/ai-assistant" },
      { label: "AI Image & Design", href: "/ai-image" },
      { label: "All Products", href: "/products" },
    ],
    guides: [
      { label: "Best AI for Students", href: "/best-ai-for-students" },
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
      { label: "Best AI for Content Creators", href: "/best-ai-for-creators" },
      { label: "Best AI for Business", href: "/best-ai-for-business" },
    ],
  },
};

interface Product {
  id: string;
  name: string;
  brand: string;
  brandColor: string;
  category: string;
  price: number;
  officialUSD: number | null;
  tier: string;
  accessType: string;
  badge?: string;
  description: string;
  deliverySLA: string;
  whatsappMsg?: string;
}

function ProductCard({ p, accent }: { p: Product; accent: string }) {
  const waLink = `${WHATSAPP}?text=${encodeURIComponent(p.whatsappMsg ?? `Hi, I want to order ${p.name} (BDT ${p.price})`)}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className="relative rounded-2xl border border-white/10 flex flex-col overflow-hidden"
      style={{ backgroundColor: "#151b3d" }}
    >
      <div className="h-1 w-full" style={{ backgroundColor: p.brandColor }} />
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-bold text-white text-sm leading-tight">{p.name}</div>
            <div className="text-xs mt-0.5" style={{ color: p.brandColor }}>{p.brand}</div>
          </div>
          {p.badge && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "#f4b942" + "22", color: "#f4b942" }}>
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
        </div>

        <div className="flex items-center justify-between mt-1">
          <div>
            <div className="text-xl font-bold" style={{ color: "#f4b942" }}>BDT {p.price.toLocaleString()}</div>
            {p.officialUSD != null && <div className="text-xs" style={{ color: "#c9ceda" }}>${p.officialUSD}/mo official</div>}
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
}

interface CategoryPageProps {
  categoryId: string;
}

export default function CategoryPage({ categoryId }: CategoryPageProps) {
  const config = CATEGORIES[categoryId];
  const [, navigate] = useLocation();

  const products = useMemo(
    () => (productsData.products as Product[])
      .filter((p) => p.category === categoryId)
      .sort((a, b) => a.price - b.price),
    [categoryId]
  );

  if (!config) {
    return (
      <PageLayout>
        <div className="text-center py-40 text-white">Category not found.</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SEOHead
        title={config.seoTitle}
        description={config.metaDescription}
        canonical={`https://aipremiumshop.com/${categoryId}`}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(faqSchema(config.faqs)) }} />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: config.displayName }]} />

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-medium"
            style={{ backgroundColor: config.accent + "20", color: config.accent }}>
            AI Tool Category
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{config.displayName}</h1>
          <p className="text-lg mb-4" style={{ color: config.accent }}>{config.subtitle}</p>
          <p className="max-w-2xl leading-relaxed" style={{ color: "#c9ceda" }}>{config.description}</p>
        </div>

        {products.length > 0 ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-white">Available Plans</h2>
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: config.accent + "20", color: config.accent }}>
                {products.length} plans
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {products.map((p) => <ProductCard key={p.id} p={p} accent={config.accent} />)}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-white/10 p-12 text-center mb-12" style={{ backgroundColor: "#151b3d" }}>
            <p className="text-white font-semibold text-lg mb-2">Custom bundles available</p>
            <p className="mb-6" style={{ color: "#c9ceda" }}>Message us on WhatsApp and we&apos;ll build the perfect package for you.</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#25d366", color: "#fff" }}>
              <MessageCircle className="w-5 h-5" />
              Get a Custom Bundle Quote
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          <div className="p-6 rounded-2xl border border-white/10" style={{ backgroundColor: "#151b3d" }}>
            <h3 className="font-bold text-white mb-4">Shared vs Personal — Which to choose?</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-white/10" style={{ backgroundColor: "#0a0e27" }}>
                <div className="font-semibold text-sm mb-2" style={{ color: "#c9ceda" }}>Shared Access</div>
                <ul className="text-xs space-y-1" style={{ color: "#c9ceda" }}>
                  <li>✓ Lower cost — best for budget-conscious users</li>
                  <li>✓ Access to the same AI models as the full plan</li>
                  <li>✓ No personal data shared with other users</li>
                  <li>✓ Good for occasional use (a few hours per day)</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border" style={{ backgroundColor: "#0a0e27", borderColor: config.accent + "40" }}>
                <div className="font-semibold text-sm mb-2" style={{ color: "#f4b942" }}>Personal Account</div>
                <ul className="text-xs space-y-1" style={{ color: "#c9ceda" }}>
                  <li>✓ Fully private — only your data, your history</li>
                  <li>✓ Custom instructions, plugins, and settings</li>
                  <li>✓ No usage limits from other users</li>
                  <li>✓ Best for professionals and daily heavy users</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10" style={{ backgroundColor: "#151b3d" }}>
            <h3 className="font-bold text-white mb-4">Not sure which plan to choose?</h3>
            <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
              Our team is available 10 AM – Midnight BST, 7 days a week. Message us on WhatsApp and we&apos;ll recommend the best plan for your specific use case and budget.
            </p>
            <a href={`${WHATSAPP}?text=${encodeURIComponent(`Hi, I need help choosing a ${config.displayName} plan`)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity w-full justify-center"
              style={{ backgroundColor: "#25d366", color: "#fff" }}>
              <MessageCircle className="w-5 h-5" />
              Ask us on WhatsApp
            </a>
          </div>
        </div>

        <div className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {config.faqs.map((faq, i) => (
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

        <div className="mb-10">
          <h3 className="font-semibold text-white mb-4">Browse other categories</h3>
          <div className="flex flex-wrap gap-3">
            {config.related.map((rel) => (
              <a key={rel.label} href={rel.href}
                onClick={(e) => { e.preventDefault(); navigate(rel.href); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-sm hover:border-white/30 transition-colors"
                style={{ color: "#c9ceda", minHeight: "44px" }}>
                {rel.label}
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {config.guides.length > 0 && (
          <div className="mb-14 p-6 rounded-2xl border border-white/10" style={{ backgroundColor: "#151b3d" }}>
            <h3 className="font-semibold text-white mb-1">Who is this for?</h3>
            <p className="text-sm mb-4" style={{ color: "#c9ceda" }}>See our role-specific guides for tailored recommendations.</p>
            <div className="flex flex-wrap gap-3">
              {config.guides.map((g) => (
                <a key={g.href} href={g.href}
                  onClick={(e) => { e.preventDefault(); navigate(g.href); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity border"
                  style={{ backgroundColor: "#f4b94212", borderColor: "#f4b94230", color: "#f4b942", minHeight: "44px" }}>
                  {g.label}
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="p-8 rounded-2xl text-center border border-white/10" style={{ backgroundColor: "#151b3d" }}>
          <p className="font-semibold text-white text-lg mb-2">Ready to get started?</p>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>Order on WhatsApp in under 2 minutes. Delivered fast. 30-day warranty.</p>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#25d366", color: "#fff" }}>
            <MessageCircle className="w-5 h-5" />
            Order on WhatsApp
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
