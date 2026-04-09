import { useMemo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import productsData from "../../data/products.json";

const WHATSAPP = "https://wa.me/8801865385348";

interface CategoryConfig {
  id: string;
  displayName: string;
  subtitle: string;
  description: string;
  metaDescription: string;
  accent: string;
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
}

const CATEGORIES: Record<string, CategoryConfig> = {
  "ai-assistant": {
    id: "ai-assistant",
    displayName: "AI Assistant & Chat",
    subtitle: "ChatGPT, Claude, Gemini, Grok & more",
    description:
      "The world's most powerful AI assistants. Write, code, research, create images, and automate tasks. From ChatGPT and Claude to Gemini and Perplexity — find your perfect AI partner. All plans available with local payment via bKash, Nagad, or Rocket.",
    metaDescription:
      "Buy ChatGPT Plus, Claude Pro, Gemini Advanced, Grok in Bangladesh. From BDT 350. Pay with bKash. Delivered in minutes. 30-day warranty.",
    accent: "#10a37f",
    faqs: [
      { q: "What's the difference between Shared and Personal accounts?", a: "Shared accounts are cost-effective: you access the same plan as other users (no chat history sharing). Personal accounts are yours alone — full privacy, custom settings, and no usage limits from others." },
      { q: "Which AI assistant is best for students in Bangladesh?", a: "ChatGPT Plus Shared (BDT 350) is the best starter. For more demanding work, Claude Pro Shared (BDT 400) offers the best writing and analysis at an affordable price." },
      { q: "Can I switch models after ordering?", a: "Yes — you get access to all models within your plan. ChatGPT Plus includes GPT-4o, GPT-4, and DALL-E. Claude Pro includes all Claude models." },
      { q: "How fast is delivery?", a: "Most AI assistant accounts are delivered within 5–30 minutes of payment confirmation, even at midnight." },
    ],
    related: [
      { label: "AI Image & Design", href: "/ai-image" },
      { label: "AI Code & Dev Tools", href: "/ai-code" },
      { label: "AI Workspace", href: "/ai-workspace" },
    ],
  },
  "ai-image": {
    id: "ai-image",
    displayName: "AI Image & Design",
    subtitle: "Midjourney, Ideogram, Adobe Firefly, Canva Pro",
    description:
      "Create stunning visuals with AI. Generate images from text, edit photos, and design graphics. Midjourney for artistic quality, Ideogram for perfect text rendering, Adobe Firefly for Photoshop integration, and Canva Pro for complete design workflows. All available in Bangladesh via bKash.",
    metaDescription:
      "Buy Midjourney, Ideogram, Adobe Firefly, Canva Pro in Bangladesh. Starting BDT 450. Pay with bKash. 30-day warranty.",
    accent: "#8b5cf6",
    faqs: [
      { q: "Which AI image tool is best for logo design?", a: "Ideogram is the best for logos and text-heavy designs — it renders text perfectly inside images. For artistic or photorealistic images, Midjourney Standard Plan is the top choice." },
      { q: "Can I use these images commercially?", a: "Adobe Firefly is trained on licensed content and is 100% commercially safe. Midjourney Standard+ includes stealth mode. Always review each platform's commercial terms." },
      { q: "Is Canva Pro different from Canva with AI?", a: "Canva Pro includes Magic Write (AI writing), Magic Design, background remover, and 100M+ premium assets. The free plan has limited AI features. Canva Pro unlocks everything." },
      { q: "How many images can I generate per month?", a: "Midjourney Basic: 200 fast images. Standard: 15hr fast GPU (roughly 900+ images) + unlimited relaxed. Ideogram Basic: 400 priority + unlimited slower generation." },
    ],
    related: [
      { label: "AI Video", href: "/ai-video" },
      { label: "AI Voice & Music", href: "/ai-voice-music" },
      { label: "AI Assistant & Chat", href: "/ai-assistant" },
    ],
  },
  "ai-video": {
    id: "ai-video",
    displayName: "AI Video",
    subtitle: "Runway, Pika — text-to-video & image-to-video",
    description:
      "Generate and edit videos with AI. Text-to-video, image-to-video, 4K upscaling, and motion effects. Runway ML is the leading platform used by filmmakers worldwide. Pika 2.2 creates stunning short-form content for social media — all accessible in Bangladesh with bKash payment.",
    metaDescription:
      "Buy Runway ML, Pika in Bangladesh. AI video generation from BDT 900. Pay with bKash or Nagad. 30-day warranty.",
    accent: "#ec4899",
    faqs: [
      { q: "What can I make with Runway?", a: "Runway Gen-2 creates video from text prompts or reference images, applies motion effects, removes backgrounds from video, and provides advanced editing tools used by professional video editors." },
      { q: "How long are the videos generated?", a: "Runway Standard generates up to 4-second clips per generation. Pika Pro generates 3–5 second clips. You can chain multiple clips for longer videos." },
      { q: "Is AI video good enough for client work?", a: "For social media, concept visualization, and mood boards — yes. For broadcast commercial work, AI video is a complement to traditional production, not a replacement." },
      { q: "How fast is delivery?", a: "Runway and Pika accounts are delivered within 30–60 minutes after payment confirmation." },
    ],
    related: [
      { label: "AI Image & Design", href: "/ai-image" },
      { label: "AI Voice & Music", href: "/ai-voice-music" },
      { label: "AI Assistant & Chat", href: "/ai-assistant" },
    ],
  },
  "ai-voice-music": {
    id: "ai-voice-music",
    displayName: "AI Voice & Music",
    subtitle: "ElevenLabs, Suno AI — voice cloning & music generation",
    description:
      "Clone voices, generate speech, and create music with AI. ElevenLabs produces human-quality voiceovers in 29+ languages for content creators, podcasters, and businesses. Suno creates complete AI-generated songs — lyrics, vocals, and instrumentation — in any genre. Now available in Bangladesh via local payment.",
    metaDescription:
      "Buy ElevenLabs, Suno AI in Bangladesh. AI voice cloning from BDT 500. Pay with bKash. 30-day warranty.",
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
  },
  "ai-code": {
    id: "ai-code",
    displayName: "AI Code & Dev Tools",
    subtitle: "GitHub Copilot, Cursor, Windsurf, Lovable, Bolt",
    description:
      "Code faster with AI pair programming. GitHub Copilot integrates directly into your IDE. Cursor is the AI-native editor trusted by teams at OpenAI, Stripe, and Figma. Windsurf's agentic approach understands your entire codebase. Lovable and Bolt build full-stack apps from plain English descriptions.",
    metaDescription:
      "Buy GitHub Copilot, Cursor, Windsurf in Bangladesh. AI coding tools from BDT 600. Pay with bKash. 30-day warranty.",
    accent: "#06b6d4",
    faqs: [
      { q: "GitHub Copilot vs Cursor — which is better?", a: "GitHub Copilot integrates into your existing IDE (VS Code, JetBrains, Vim). Cursor is a standalone AI-first IDE built on VS Code. Cursor is more powerful for AI-driven development; Copilot is more convenient if you already use a specific IDE." },
      { q: "Can beginners use these tools?", a: "Yes — Lovable and Bolt are specifically built for non-developers. You describe what you want in English and the AI builds the full app. GitHub Copilot and Cursor are best for developers who already code." },
      { q: "Does Cursor work with any programming language?", a: "Cursor supports all major languages: Python, JavaScript, TypeScript, Go, Rust, Java, C++, and more. It indexes your entire codebase for context-aware completions." },
      { q: "How fast is delivery?", a: "All AI code tools are delivered within 30–60 minutes of payment. Some like GitHub Copilot require a few steps to activate on your account." },
    ],
    related: [
      { label: "AI Workspace", href: "/ai-workspace" },
      { label: "AI Assistant & Chat", href: "/ai-assistant" },
      { label: "All Products", href: "/products" },
    ],
  },
  "ai-workspace": {
    id: "ai-workspace",
    displayName: "AI Workspace",
    subtitle: "Notion AI, Grammarly — productivity & writing",
    description:
      "AI-powered productivity and collaboration for teams and individuals. Notion Plus includes AI writing, summarization, and database features in one workspace. Grammarly Pro delivers advanced grammar correction, tone suggestions, and GrammarlyGO generative writing across every platform you use — in Bangladesh via bKash.",
    metaDescription:
      "Buy Notion AI, Grammarly Pro in Bangladesh. AI workspace tools from BDT 550. Pay with bKash. 30-day warranty.",
    accent: "#f4b942",
    faqs: [
      { q: "What does Notion AI add over regular Notion?", a: "Notion AI can write pages from prompts, summarize long documents, translate content, fill databases automatically, and answer questions about your workspace. It's integrated directly into your workflow." },
      { q: "Does Grammarly work in Bengali?", a: "Grammarly is optimized for English. It works in the browser, Google Docs, Microsoft Office, and most writing apps. For English content — emails, reports, social posts — Grammarly Pro is excellent." },
      { q: "Can I share a Notion workspace with my team?", a: "Notion Plus supports up to 10 guests on personal plans. We set up the account for you so you can invite collaborators immediately." },
      { q: "How fast is delivery?", a: "Notion and Grammarly accounts are delivered within 30–60 minutes after payment confirmation." },
    ],
    related: [
      { label: "AI Assistant & Chat", href: "/ai-assistant" },
      { label: "AI Code & Dev Tools", href: "/ai-code" },
      { label: "All Products", href: "/products" },
    ],
  },
  "bundles": {
    id: "bundles",
    displayName: "Bundles & Packages",
    subtitle: "Multiple AI tools at a package price",
    description:
      "Save more with curated AI tool bundles. Each bundle is designed for a specific use case — students, freelancers, content creators, or business owners. Get multiple premium AI subscriptions at a discounted price compared to buying individually. Message us on WhatsApp to create a custom bundle.",
    metaDescription:
      "AI tool bundles in Bangladesh. Multiple premium subscriptions at a package price. Pay with bKash. 30-day warranty.",
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
  },
};

interface Product {
  id: string;
  name: string;
  brand: string;
  brandColor: string;
  category: string;
  price: number;
  officialUSD: number;
  tier: string;
  accessType: string;
  badge: string | null;
  description: string;
  deliveryMinutes: string;
  warrantyDays: number;
}

function ProductCard({ p, accent }: { p: Product; accent: string }) {
  const waLink = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I want to order ${p.name} (BDT ${p.price})`)}`;
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
          <span className="text-xs" style={{ color: "#c9ceda" }}>⚡ {p.deliveryMinutes} min</span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div>
            <div className="text-xl font-bold" style={{ color: "#f4b942" }}>BDT {p.price.toLocaleString()}</div>
            <div className="text-xs" style={{ color: "#c9ceda" }}>${p.officialUSD}/mo official</div>
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
        title={`${config.displayName} — AI Subscriptions Bangladesh | AI Premium Shop`}
        description={config.metaDescription}
        canonical={`https://aipremiumshop.com/${categoryId}`}
      />

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

        <div className="mb-14">
          <h3 className="font-semibold text-white mb-4">Browse other categories</h3>
          <div className="flex flex-wrap gap-3">
            {config.related.map((rel) => (
              <a key={rel.label} href={rel.href}
                onClick={(e) => { e.preventDefault(); navigate(rel.href); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-sm hover:border-white/30 transition-colors"
                style={{ color: "#c9ceda" }}>
                {rel.label}
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

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
