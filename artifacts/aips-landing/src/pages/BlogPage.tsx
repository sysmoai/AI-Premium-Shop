import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Clock,
  TrendingUp,
  GraduationCap,
  CreditCard,
  Scale,
  Rocket,
  Bot,
  Swords,
  Star,
  Briefcase,
  Image,
  Code2,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const POSTS = [
  {
    slug: "earn-money-with-ai-bangladesh",
    title: "How to Earn Money with AI in Bangladesh — 5 Proven Methods (2026)",
    excerpt: "5 proven ways to earn BDT 20,000-100,000/month with AI tools. Freelancing, content, tutoring, automation. Start from BDT 350.",
    category: "💰 Income",
    readTime: "5 min read",
    date: "Apr 12, 2026",
    gradient: "bg-gradient-to-br from-green-600 to-emerald-900",
    icon: TrendingUp,
    accentColor: "#10a37f",
  },
  {
    slug: "ai-tools-university-students-bangladesh",
    title: "Best AI Tools for University Students Bangladesh 2026",
    excerpt: "Top AI tools for BD university students. Research, assignments, thesis, exam prep. From BDT 350/mo.",
    category: "🎓 Students",
    readTime: "5 min read",
    date: "Apr 12, 2026",
    gradient: "bg-gradient-to-br from-blue-600 to-indigo-900",
    icon: GraduationCap,
    accentColor: "#3b82f6",
  },
  {
    slug: "pay-ai-tools-bkash-bangladesh",
    title: "How to Pay for AI Tools with bKash Bangladesh 2026",
    excerpt: "Buy ChatGPT, Claude, Midjourney with bKash or Nagad. No credit card. 5-30 min delivery.",
    category: "💳 Payment Guide",
    readTime: "5 min read",
    date: "Apr 12, 2026",
    gradient: "bg-gradient-to-br from-pink-600 to-rose-900",
    icon: CreditCard,
    accentColor: "#ec4899",
  },
  {
    slug: "chatgpt-plus-vs-free-bangladesh",
    title: "ChatGPT Plus vs Free — Worth BDT 350? Bangladesh Review",
    excerpt: "Is ChatGPT Plus worth BDT 350/mo? Honest comparison: GPT-5, DALL-E, agents, deep research.",
    category: "🔍 Comparison",
    readTime: "5 min read",
    date: "Apr 12, 2026",
    gradient: "bg-gradient-to-br from-teal-600 to-emerald-900",
    icon: Scale,
    accentColor: "#10a37f",
  },
  {
    slug: "ai-freelancing-guide-bangladesh",
    title: "AI Freelancing Guide Bangladesh 2026 — Earn in 7 Days",
    excerpt: "Start AI freelancing in Bangladesh in 7 days. Tools, platforms, pricing. Earn BDT 20,000+/mo.",
    category: "💻 Freelancing",
    readTime: "5 min read",
    date: "Apr 12, 2026",
    gradient: "bg-gradient-to-br from-purple-600 to-violet-900",
    icon: Rocket,
    accentColor: "#8b5cf6",
  },
  {
    slug: "best-ai-tools-bangladesh-2026",
    title: "Best AI Tools in Bangladesh 2026: Complete Guide",
    excerpt: "ChatGPT, Claude, Midjourney, and 54 more. We rank every major AI tool by value, use case, and availability in Bangladesh — with BDT prices and local payment info.",
    category: "Guide",
    readTime: "8 min read",
    date: "April 2026",
    gradient: "bg-gradient-to-br from-teal-700 to-green-900",
    icon: Bot,
    accentColor: "#10a37f",
  },
  {
    slug: "chatgpt-vs-claude-bangladesh",
    title: "ChatGPT vs Claude in Bangladesh 2026: Which is Better?",
    excerpt: "Side-by-side comparison of ChatGPT Plus and Claude Pro for writing, coding, research, and everyday tasks. With prices in BDT and honest recommendations.",
    category: "Comparison",
    readTime: "6 min read",
    date: "April 2026",
    gradient: "bg-gradient-to-br from-amber-600 to-orange-900",
    icon: Swords,
    accentColor: "#d97706",
  },
  {
    slug: "how-to-get-chatgpt-plus-bangladesh",
    title: "How to Get ChatGPT Plus in Bangladesh (No Visa Card Needed)",
    excerpt: "Step-by-step guide to activating ChatGPT Plus in Bangladesh using bKash or Nagad — from BDT 350/month. No international credit card required.",
    category: "How-to",
    readTime: "4 min read",
    date: "March 2026",
    gradient: "bg-gradient-to-br from-yellow-600 to-amber-900",
    icon: Star,
    accentColor: "#f4b942",
  },
  {
    slug: "ai-tools-for-freelancers-bangladesh",
    title: "5 AI Tools Every Bangladeshi Freelancer Needs in 2026",
    excerpt: "Freelancers using AI earn 44% more on average. Here are the 5 tools that pay for themselves fastest — with realistic prices in BDT and use cases for Upwork and Fiverr.",
    category: "Freelancers",
    readTime: "5 min read",
    date: "March 2026",
    gradient: "bg-gradient-to-br from-pink-600 to-rose-900",
    icon: Briefcase,
    accentColor: "#ec4899",
  },
  {
    slug: "midjourney-bangladesh-guide",
    title: "Midjourney in Bangladesh 2026: Full Guide + Pricing",
    excerpt: "Everything you need to know about Midjourney in Bangladesh. Plans from ৳1,199/mo. How to order, what you can create, and how shared accounts work.",
    category: "Guide",
    readTime: "5 min read",
    date: "February 2026",
    gradient: "bg-gradient-to-br from-violet-600 to-purple-900",
    icon: Image,
    accentColor: "#8b5cf6",
  },
  {
    slug: "openai-codex-vs-claude-code-bangladesh-2026",
    title: "OpenAI Codex vs Claude Code in Bangladesh — What Changed in April 2026?",
    excerpt: "OpenAI launched Codex on April 16, 2026. Claude Code already exists. Cursor and Replit are in the mix. Here's what changed and what it means for Bangladesh developers.",
    category: "🛠️ Developers",
    readTime: "6 min read",
    date: "Apr 17, 2026",
    gradient: "bg-gradient-to-br from-cyan-600 to-blue-900",
    icon: Code2,
    accentColor: "#06b6d4",
  },
];

const featured = POSTS[0];
const gridPosts = POSTS.slice(1);

export default function BlogPage() {
  return (
    <PageLayout>
      <SEOHead
        title="AI Blog Bangladesh — Guides, Tips & Strategies | AI Premium Shop"
        description="AI guides, comparisons, and tips for Bangladesh. Learn how to earn, study, and work smarter with AI tools."
        canonical="https://aipremiumshop.com/blog"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#0a0e27] to-[#151b3d] rounded-2xl p-8 md:p-12 mb-8 border border-white/10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white">AI Blog Bangladesh</h1>
          <p className="text-gray-400 text-lg mt-2">
            Guides, tips, and strategies to earn more and work smarter with AI
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-gray-800 text-gray-300 text-sm rounded-full px-4 py-1.5">💰 Earn with AI</span>
            <span className="bg-gray-800 text-gray-300 text-sm rounded-full px-4 py-1.5">🎓 Students</span>
            <span className="bg-gray-800 text-gray-300 text-sm rounded-full px-4 py-1.5">💻 Freelancers</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Link
            href={`/blog/${featured.slug}`}
            className="group block bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-[#f4b942]/30 transition-colors"
          >
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-6 md:p-8">
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
                  style={{ backgroundColor: featured.accentColor + "22", color: featured.accentColor }}
                >
                  {featured.category}
                </span>
                <h2 className="text-xl font-bold text-white mb-3 leading-snug group-hover:opacity-90 transition-opacity">
                  {featured.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime}
                  </span>
                  <span>{featured.date}</span>
                </div>
                <span className="text-[#f4b942] text-sm font-medium">Read More →</span>
              </div>
              <div className={`md:w-2/5 h-48 md:h-auto flex items-center justify-center ${featured.gradient}`}>
                {(() => {
                  const Icon = featured.icon;
                  return <Icon className="w-20 h-20 text-white opacity-30" />;
                })()}
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridPosts.map((post, i) => {
            const Icon = post.icon;
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-[#f4b942]/30 transition-colors h-full"
                >
                  <div className={`h-40 ${post.gradient} flex flex-col items-center justify-center gap-2`}>
                    <Icon className="w-12 h-12 text-white opacity-80" />
                    <span className="text-white text-xs opacity-70 font-medium">{post.category}</span>
                  </div>
                  <div className="p-5">
                    <span
                      className="text-xs rounded-full px-2 py-0.5"
                      style={{ backgroundColor: post.accentColor + "22", color: post.accentColor }}
                    >
                      {post.category}
                    </span>
                    <h3 className="text-white font-semibold text-base mt-2 leading-snug group-hover:opacity-90 transition-opacity">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                      {post.excerpt.slice(0, 120)}{post.excerpt.length > 120 ? "…" : ""}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-3 text-gray-500 text-xs">
                        <span>{post.readTime}</span>
                        <span>{post.date}</span>
                      </div>
                      <span className="text-[#f4b942] text-sm font-medium">Read →</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 p-8 rounded-2xl border border-white/10 text-center"
          style={{ backgroundColor: "#151b3d" }}
        >
          <p className="font-semibold text-white text-lg mb-2">Have a question?</p>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
            We answer AI tool questions on WhatsApp — recommendations, comparisons, setup help.
          </p>
          <a
            href="https://wa.me/8801865385348"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#25d366", color: "#fff" }}
          >
            Ask on WhatsApp
          </a>
        </motion.div>
      </section>
    </PageLayout>
  );
}
