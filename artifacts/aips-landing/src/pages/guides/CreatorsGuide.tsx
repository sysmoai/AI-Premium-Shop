import { useState } from "react";
import { stackTotal, taka, cheapestByName, cheapestPriceFor } from "@/lib/catalogStats";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Play,
  BarChart3,
  Zap,
  Award,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";
import { productPath } from "@/lib/productRoutes";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { breadcrumbSchema } from "@/utils/schemas";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20order%20an%20AI%20subscription";

export default function CreatorsGuide() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const tools = [
    {
      rank: 1,
      name: "ChatGPT Plus",
      slug: "chatgpt-plus-bangladesh",
      price: "BDT 999/month",
      description:
        "Your scriptwriter and content strategist. Generate video scripts, YouTube titles, TikTok hooks, Instagram captions, and content ideas. GPT-5.4 understands what makes content viral.",
      useCases: ["Video scripts", "Viral titles", "Content calendars", "Caption writing", "Hook generation"],
      badge: "Essential",
      color: "#10a37f",
    },
    {
      rank: 2,
      name: "Midjourney",
      slug: "midjourney-bangladesh",
      price: "BDT 1,199/month",
      description:
        "Create stunning thumbnails and graphics without a designer. Generate unique visuals for every video, unlimited image variations. CTR improves dramatically with AI-designed thumbnails.",
      useCases: ["Thumbnails", "Thumbnail variations", "Channel art", "Thumbnail testing", "Graphics"],
      badge: "For Thumbnails",
      color: "#8b5cf6",
    },
    {
      rank: 3,
      name: "ElevenLabs",
      slug: "elevenlabs-bangladesh",
      price: "BDT 748/month",
      description:
        "AI voiceovers in 29 languages. Clone your own voice for auto-generated videos. Never re-record voiceovers again. Supports multiple voices for engaging narrative.",
      useCases: ["Voiceovers", "Voice cloning", "Multilingual content", "Auto-narration", "Podcast production"],
      badge: "For Voiceovers",
      color: "#f97316",
    },
    {
      rank: 4,
      name: "Suno AI",
      slug: "suno-ai-bangladesh",
      price: `from ${taka(cheapestPriceFor("suno-ai-bangladesh") ?? 0)}/month`,
      description:
        "Generate copyright-free music and jingles for your videos. Full commercial use rights. No copyright strikes. Background music, intros, and outros in seconds.",
      useCases: ["Background music", "Jingles", "Intros/outros", "Royalty-free tracks", "Music production"],
      badge: "For Music",
      color: "#f59e0b",
    },
    {
      rank: 5,
      name: "Runway",
      slug: "runway-bangladesh",
      price: "BDT 1,794/month",
      description:
        "AI video generation from text prompts. Create B-roll, transitions, effects, and entire video sequences. Great for shorts and social media video content.",
      useCases: ["Video generation", "B-roll creation", "Transitions", "Visual effects", "Video editing"],
      badge: "For Video",
      color: "#ec4899",
    },
  ];


  const faqs = [
    {
      q: "Which AI tool should content creators start with?",
      a: `Start with ChatGPT Plus (from ${taka(cheapestByName("ChatGPT Plus") ?? 0)}) for scripting and content planning. Then add Midjourney (from ${taka(cheapestByName("Midjourney") ?? 0)}) for thumbnails once you see CTR improvements. Together they start at ${taka(stackTotal(["ChatGPT Plus", "Midjourney"]) ?? 0)}/month.`,
    },
    {
      q: "Is AI-generated content allowed on YouTube, TikTok, and Instagram?",
      a: "Yes, completely. YouTube and TikTok allow AI-generated content. You can generate scripts, thumbnails, voiceovers, music, and videos with AI. No copyright strikes if you use licensed AI tools like Suno AI (commercial license) and Midjourney.",
    },
    {
      q: "Can I clone my voice with ElevenLabs?",
      a: "Yes. The Starter Plan includes voice cloning. Record a 1-minute sample of your voice and ElevenLabs will clone it. Your voice will sound natural reading scripts in any language.",
    },
    {
      q: "How much does my CTR improve with AI thumbnails?",
      a: "On average, creators report 20-40% CTR improvement when switching to AI-designed thumbnails. A/B test with Midjourney variations to see which designs resonate most with your audience.",
    },
    {
      q: "Can I use Suno AI music on YouTube and TikTok?",
      a: "Yes, with commercial rights on Pro plan. Suno AI Pro includes explicit commercial use licensing for YouTube, TikTok, Instagram, and streaming platforms. No copyright strikes.",
    },
    {
      q: "Is there a learning curve?",
      a: "Not really. ChatGPT, Midjourney, and ElevenLabs are all intuitive. Most creators get productive within the first hour. We provide onboarding and best practices when you order via WhatsApp.",
    },
  ];

  const budgetPlans = [
    {
      name: `Starter (${taka(stackTotal(["ChatGPT Plus", "Midjourney"]) ?? 0)}/month)`,
      tools: ["ChatGPT Plus", "Midjourney"],
      features: [
        "Unlimited video scripts",
        "Viral thumbnail ideas",
        "Content calendars",
        "SEO-optimized titles",
        "Thumbnail design",
      ],
      best: "For new creators",
    },
    {
      name: `Growth (${taka(stackTotal(["ChatGPT Plus", "Midjourney", "ElevenLabs"]) ?? 0)}/month)`,
      tools: ["ChatGPT Plus", "Midjourney", "ElevenLabs"],
      features: [
        "All Starter features",
        "AI voiceovers",
        "Voice cloning",
        "Multilingual content",
        "29-language support",
      ],
      best: "For growing channels",
    },
    {
      name: `Pro (${taka(stackTotal(["ChatGPT Plus", "Midjourney", "ElevenLabs", "Suno AI", "Runway"]) ?? 0)}/month)`,
      tools: ["ChatGPT Plus", "Midjourney", "ElevenLabs", "Suno AI", "Runway"],
      features: [
        "All Growth features",
        "AI music generation",
        "Video generation",
        "Commercial music license",
        "Full creator stack",
      ],
      best: "For pro creators",
    },
  ];

  return (
    <PageLayout>
      <SEOHead
        title="AI Content Creation Toolkit: YouTube, TikTok, Instagram | Bangladesh"
        description="Best AI tools for content creators in Bangladesh 2026. Scripts, thumbnails, voiceovers, music. Grow faster on YouTube, TikTok, Instagram. From BDT 999."
        canonical="https://aipremiumshop.com/guides/creators"
        ogImage="https://aipremiumshop.com/og-creators.jpg"
        jsonLd={[breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Creators Guide" }])]}
      />

      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-16 md:py-24 text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">3x Faster Production • Updated July 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Content Creation Toolkit: YouTube, TikTok, Instagram
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Create faster. Edit smarter. Grow your audience. Scripts, thumbnails, voiceovers, music—everything powered by AI.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition"
            >
              <MessageCircle className="w-5 h-5" />
              Get Started Now
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Browse Tools
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-pink-600">3x</div>
              <div className="text-sm text-gray-600">Production speed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">850+</div>
              <div className="text-sm text-gray-600">Content creators using us</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">+40%</div>
              <div className="text-sm text-gray-600">Average CTR boost</div>
            </div>
          </div>
        </motion.section>

        {/* Problem */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <div className="bg-red-50 rounded-lg p-8 border-l-4 border-red-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Creator's Reality</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Spending 20+ hours per week writing scripts, designing thumbnails, editing videos</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Can't publish consistently because content creation is exhausting</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Low CTR because thumbnails aren't professional enough</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Can't hire a team because production costs exceed revenue</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>International software subscriptions are expensive in BDT</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Solution */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How AI Becomes Your Production Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-lg p-8"
            >
              <Play className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Publish 3x More Content</h3>
              <p>AI writes scripts, creates thumbnails, generates voiceovers, composes music. What took 4 days now takes 1 day.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-8"
            >
              <BarChart3 className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Boost Your CTR</h3>
              <p>AI-designed thumbnails increase click-through rate by 20-40%. Test variations and see which designs work best.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-8"
            >
              <Award className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Professional Quality</h3>
              <p>Your content looks like it was produced by a professional team. Better scripts, better thumbnails, better audio.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-8"
            >
              <Zap className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Stay Consistent</h3>
              <p>Publish on a schedule without burnout. AI handles the repetitive work. You focus on strategy and growth.</p>
            </motion.div>
          </div>
        </section>

        {/* Top 5 Tools */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Top 5 AI Tools for Creators</h2>

          <div className="space-y-6">
            {tools.map((tool) => (
              <motion.div
                key={tool.rank}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-gray-400">#{tool.rank}</span>
                      <h3 className="text-2xl font-bold text-gray-900">{tool.name}</h3>
                    </div>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: `${tool.color}20`, color: tool.color }}
                    >
                      {tool.badge}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{tool.price}</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{tool.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Perfect for:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.useCases.map((useCase) => (
                      <span key={useCase} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href={productPath(tool.slug)}>
                  <a className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Budget Plans */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Plans for Every Creator</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {budgetPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`rounded-lg p-8 ${idx === 1 ? "bg-pink-600 text-white border-4 border-pink-600" : "bg-white border-2 border-gray-200"}`}
              >
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className={idx === 1 ? "text-pink-100" : "text-gray-600"}>{plan.best}</p>

                <ul className="space-y-3 my-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 items-start">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${idx === 1 ? "text-pink-200" : "text-pink-600"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center font-bold py-3 rounded-lg transition ${
                    idx === 1 ? "bg-white text-pink-600 hover:bg-gray-50" : "bg-pink-600 text-white hover:bg-pink-700"
                  }`}
                >
                  Order Now
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Creator FAQs</h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-gray-900">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 transition-transform ${expandedFaq === idx ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-200"
                      >
                        <div className="p-6 bg-gray-50 text-gray-700">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16 bg-gradient-to-r from-pink-600 to-pink-700 text-white max-w-4xl mx-auto rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Produce Like a Pro?</h2>
          <p className="text-pink-100 mb-8 text-lg">
            850+ content creators are already using AI to produce 3x more content. Your audience is waiting.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-pink-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Start Creating Faster
          </a>
        </section>
      </div>
    </PageLayout>
  );
}
