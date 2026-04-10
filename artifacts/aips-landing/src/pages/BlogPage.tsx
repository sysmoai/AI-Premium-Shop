import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, Clock, User } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";

const POSTS = [
  {
    slug: "best-ai-tools-bangladesh-2026",
    title: "Best AI Tools in Bangladesh 2026: Complete Guide",
    excerpt: "ChatGPT, Claude, Midjourney, and 54 more. We rank every major AI tool by value, use case, and availability in Bangladesh — with BDT prices and local payment info.",
    category: "Guide",
    readTime: "8 min read",
    date: "April 2026",
    accentColor: "#10a37f",
  },
  {
    slug: "chatgpt-vs-claude-bangladesh",
    title: "ChatGPT vs Claude in Bangladesh 2026: Which is Better?",
    excerpt: "Side-by-side comparison of ChatGPT Plus and Claude Pro for writing, coding, research, and everyday tasks. With prices in BDT and honest recommendations.",
    category: "Comparison",
    readTime: "6 min read",
    date: "April 2026",
    accentColor: "#d97706",
  },
  {
    slug: "how-to-get-chatgpt-plus-bangladesh",
    title: "How to Get ChatGPT Plus in Bangladesh (No Visa Card Needed)",
    excerpt: "Step-by-step guide to activating ChatGPT Plus in Bangladesh using bKash or Nagad — from BDT 350/month. No international credit card required.",
    category: "How-to",
    readTime: "4 min read",
    date: "March 2026",
    accentColor: "#f4b942",
  },
  {
    slug: "ai-tools-for-freelancers-bangladesh",
    title: "5 AI Tools Every Bangladeshi Freelancer Needs in 2026",
    excerpt: "Freelancers using AI earn 44% more on average. Here are the 5 tools that pay for themselves fastest — with realistic prices in BDT and use cases for Upwork and Fiverr.",
    category: "Freelancers",
    readTime: "5 min read",
    date: "March 2026",
    accentColor: "#ec4899",
  },
  {
    slug: "midjourney-bangladesh-guide",
    title: "Midjourney in Bangladesh 2026: Full Guide + Pricing",
    excerpt: "Everything you need to know about Midjourney in Bangladesh. Plans from ৳1,199/mo. How to order, what you can create, and how shared accounts work.",
    category: "Guide",
    readTime: "5 min read",
    date: "February 2026",
    accentColor: "#8b5cf6",
  },
];

export default function BlogPage() {
  return (
    <PageLayout>
      <SEOHead
        title="AI Tools Blog Bangladesh — Guides, Reviews & Tips | AI Premium Shop"
        description="AI tools guides, reviews, and how-to articles for Bangladesh. Learn how to use ChatGPT, Claude, Midjourney, and more. Tips for freelancers, students, and businesses."
        canonical="https://aipremiumshop.com/blog"
      />

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-medium"
            style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942" }}>
            AI Knowledge Hub
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Blog</h1>
          <p className="text-lg max-w-2xl" style={{ color: "#c9ceda" }}>
            Guides, comparisons, and tips for getting the most out of AI tools in Bangladesh.
          </p>
        </motion.div>

        <div className="space-y-5">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row gap-5 p-6 rounded-2xl border border-white/10 hover:border-white/25 transition-colors"
                style={{ backgroundColor: "#151b3d" }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: post.accentColor + "22", color: post.accentColor }}>
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:opacity-80 transition-opacity leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#c9ceda" }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: "#c9ceda" }}>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      AI Premium Shop
                    </span>
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="flex items-center justify-end sm:justify-center flex-shrink-0">
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: "#f4b942" }} />
                </div>
              </Link>
            </motion.article>
          ))}
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
