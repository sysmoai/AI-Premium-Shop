import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Users, Briefcase, Zap, Lightbulb } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const GUIDE_CATEGORIES = [
  {
    title: "By Audience",
    description: "Find the perfect AI tools for your role",
    icon: Users,
    color: "#3b82f6",
    guides: [
      { name: "Students", desc: "Assignments, research, exams", href: "/best-ai-for-students", badge: "Popular" },
      { name: "Freelancers", desc: "Upwork, Fiverr, proposals", href: "/best-ai-for-freelancers", badge: "New" },
      { name: "Creators", desc: "YouTube, TikTok, content", href: "/best-ai-for-creators", badge: "New" },
      { name: "Business Owners", desc: "Automation, scaling, teams", href: "/best-ai-for-business" },
      { name: "Developers", desc: "Code, debugging, productivity", href: "/best-ai-for-developers" },
      { name: "Job Seekers", desc: "Interviews, CV, portfolio", href: "/best-ai-for-job-seekers" },
      { name: "Designers", desc: "Creative tools, inspiration", href: "/best-ai-for-designers" },
      { name: "Marketers", desc: "Copy, campaigns, analytics", href: "/best-ai-for-marketers" },
    ],
  },
  {
    title: "By Use Case",
    description: "Find tools for specific tasks",
    icon: Zap,
    color: "#f59e0b",
    guides: [
      { name: "Writing & Content", desc: "Blog, copy, social media", href: "/best-ai-for-writers" },
      { name: "Image & Design", desc: "Midjourney, Ideogram, design", href: "/ai-image" },
      { name: "Video Production", desc: "Runway, Pika, HeyGen", href: "/ai-video" },
      { name: "Code & Development", desc: "GitHub Copilot, Claude, Cursor", href: "/ai-code" },
      { name: "Voice & Audio", desc: "ElevenLabs, music generation", href: "/ai-voice-music" },
      { name: "Research & Analysis", desc: "Perplexity, data insights", href: "/best-ai-subscription-2026" },
    ],
  },
  {
    title: "By Budget",
    description: "AI tools within your price range",
    icon: Lightbulb,
    color: "#10b981",
    guides: [
      { name: "Under BDT 500", desc: "Free & budget-friendly", href: "/ai-under-500" },
      { name: "Under BDT 1,000", desc: "Best value tier", href: "/ai-under-1000" },
      { name: "Under BDT 3,000", desc: "Premium tools", href: "/ai-under-3000" },
      { name: "Best Overall Deal", desc: "Quality vs price ratio", href: "/best-ai-budget-bangladesh" },
    ],
  },
  {
    title: "Compare & Choose",
    description: "Side-by-side tool comparisons",
    icon: Briefcase,
    color: "#8b5cf6",
    guides: [
      { name: "ChatGPT vs Claude", desc: "Most popular comparison", href: "/chatgpt-vs-claude", badge: "Popular" },
      { name: "ChatGPT vs Gemini", desc: "Google's alternative", href: "/chatgpt-vs-gemini" },
      { name: "GitHub Copilot vs Cursor", desc: "Developer tools", href: "/copilot-vs-cursor" },
      { name: "Midjourney vs Ideogram", desc: "Image generation", href: "/midjourney-vs-ideogram" },
    ],
  },
];

const BANGLA_GUIDES = [
  {
    title: "বাংলায় শিখুন",
    description: "সম্পূর্ণ বাংলায় আপনার ভূমিকার জন্য AI গাইড",
    icon: BookOpen,
    color: "#ef4444",
    guides: [
      { name: "হোম", desc: "AI Premium Shop পরিচয়", href: "/bn" },
      { name: "ছাত্রছাত্রীদের জন্য", desc: "Assignment, research, পরীক্ষা", href: "/students-bn" },
      { name: "ডেভেলপারদের জন্য", desc: "কোডিং, debugging, দ্রুত উন্নয়ন", href: "/developers-bn" },
      { name: "ফ্রিল্যান্সারদের জন্য", desc: "Upwork, Fiverr, প্রস্তাব লেখা", href: "/freelancers-bn" },
      { name: "কন্টেন্ট ক্রিয়েটরদের জন্য", desc: "YouTube, TikTok, ভিডিও তৈরি", href: "/creators-bn" },
      { name: "ছোট ব্যবসার জন্য", desc: "গ্রাহক সেবা, বিক্রয় অটোমেশন", href: "/smb-bn" },
      { name: "শিক্ষকদের জন্য", desc: "পাঠ পরিকল্পনা, মূল্যায়ন, প্রতিক্রিয়া", href: "/educators-bn" },
    ],
  },
];

function GuideCard({
  name,
  desc,
  href,
  badge,
}: {
  name: string;
  desc: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link href={href}>
      <a className="group block p-4 rounded-lg border border-gray-800 hover:border-[#f4b942]/50 transition-all hover:bg-gray-900/80">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-white group-hover:text-[#f4b942] transition-colors">{name}</h4>
            <p className="text-sm text-gray-400 mt-1">{desc}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#f4b942] transition-all group-hover:translate-x-1 flex-shrink-0 mt-0.5" />
        </div>
        {badge && (
          <div className="mt-2 inline-block px-2 py-1 rounded text-xs font-semibold" style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942" }}>
            {badge}
          </div>
        )}
      </a>
    </Link>
  );
}

function CategorySection({
  title,
  description,
  icon: Icon,
  color,
  guides,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  guides: Array<{ name: string; desc: string; href: string; badge?: string }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6" style={{ color }} />
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {guides.map((g) => (
          <GuideCard key={g.name} {...g} />
        ))}
      </div>
    </motion.div>
  );
}

export default function GuidesIndexPage() {
  return (
    <PageLayout>
      <SEOHead
        title="AI Tools Guide Index — Find the Best AI by Role, Budget & Use Case"
        description="Complete guide to AI tools. By audience (students, freelancers, creators), use case (writing, code, design), budget, and comparisons. All guides in one place."
        canonical="https://aipremiumshop.com/guides"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Guides" }]} />

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-medium"
            style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942" }}>
            <BookOpen className="w-3.5 h-3.5" /> Complete Guide Index
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Find Your Perfect AI Tool
          </h1>
          <p className="text-lg max-w-2xl text-gray-300">
            Filter by your role, use case, budget, or compare tools side-by-side. Everything you need to choose the right AI subscription for Bangladesh.
          </p>
        </motion.div>

        {/* English Guides */}
        <div className="mb-20">
          {GUIDE_CATEGORIES.map((cat) => (
            <CategorySection key={cat.title} {...cat} />
          ))}
        </div>

        {/* Bangla Guides */}
        <div className="border-t border-gray-800 pt-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">🇧🇩 বাংলায় পড়ুন</h2>
          {BANGLA_GUIDES.map((cat) => (
            <CategorySection key={cat.title} {...cat} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl border border-gray-800"
          style={{ backgroundColor: "#151b3d" }}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Still not sure which tool to pick?</h3>
            <p className="text-gray-400 mb-6">
              Our AI CEO team will recommend the perfect tools for your needs in 2 minutes on WhatsApp.
            </p>
            <a
              href="https://wa.me/8801865385348?text=I'm not sure which AI tool to pick. Can you recommend?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: "#008236", color: "#fff" }}
            >
              Message on WhatsApp →
            </a>
          </div>
        </motion.div>
      </section>
    </PageLayout>
  );
}
