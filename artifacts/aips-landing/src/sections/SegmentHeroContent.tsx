import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

// No testimonials, membership counts, or outcome multipliers here — this
// file used to carry the same fake-named-testimonial pattern already found
// and removed from the five guide pages (invented grades/earnings/follower
// counts attributed to named people), plus unsupported claims like "10x
// Your Freelance Income" and "Join 500+ students" with no source. Found in
// a full-repo sweep 2026-08-07 (BACKLOG #28) — this component had escaped
// that earlier pass because it isn't a guide page, it's the interactive
// homepage segment-picker result. Rewritten to describe real product
// capability, not invented outcomes.
type Segment = "students" | "freelancers" | "creators" | "smbs" | "educators";

const segmentContent: Record<Segment, {
  headline: string;
  subheadline: string;
  benefit: string;
  topProducts: string[];
  cta: string;
  ctaSecondary: string;
}> = {
  students: {
    headline: "AI Tools Built for University Coursework",
    subheadline: "For Bangladesh university students",
    benefit: "Research faster, get writing feedback, and work through complex topics with AI assistance",
    topProducts: ["ChatGPT Plus", "Claude Pro", "GitHub Copilot"],
    cta: "Get Started in 2 Minutes",
    ctaSecondary: "Browse AI Tools for Students",
  },
  freelancers: {
    headline: "AI Tools for Freelancers on Upwork & Fiverr",
    subheadline: "For Bangladesh freelancers",
    benefit: "Deliver client work faster and take on more with AI assistance",
    topProducts: ["ChatGPT Pro", "Midjourney", "Canva AI"],
    cta: "Get Started in 2 Minutes",
    ctaSecondary: "See Freelancer Tools",
  },
  creators: {
    headline: "AI Tools for Content Creators",
    subheadline: "For Bangladesh content creators",
    benefit: "Generate ideas, create visuals, and edit videos faster with AI",
    topProducts: ["Midjourney", "HeyGen", "Canva AI"],
    cta: "Get Started in 2 Minutes",
    ctaSecondary: "Explore Creator Tools",
  },
  smbs: {
    headline: "AI Tools to Run Your Business More Efficiently",
    subheadline: "For Bangladesh small business owners",
    benefit: "Automate repetitive tasks and save time with AI tools",
    topProducts: ["Notion AI", "Zapier", "ChatGPT Business"],
    cta: "Get Started in 2 Minutes",
    ctaSecondary: "View Business Tools",
  },
  educators: {
    headline: "AI Tools for Teaching & Grading",
    subheadline: "For Bangladesh educators",
    benefit: "Create lesson materials and assessments faster with AI",
    topProducts: ["ChatGPT", "Claude", "Notion AI"],
    cta: "Get Started in 2 Minutes",
    ctaSecondary: "Discover Educator Tools",
  },
};

interface SegmentHeroContentProps {
  segment: Segment;
}

export function SegmentHeroContent({ segment }: SegmentHeroContentProps) {
  const content = segmentContent[segment];
  const WHATSAPP_LINK = "https://wa.me/8801865385348";

  return (
    <motion.div
      className="text-center space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Headline */}
      <div className="space-y-4">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-white leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {content.headline}
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {content.subheadline}
        </motion.p>
      </div>

      {/* CTA Button */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <MessageCircle className="w-5 h-5" />
        {content.cta}
        <ArrowRight className="w-5 h-5" />
      </motion.a>

      {/* Benefit Statement */}
      <motion.div
        className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 rounded-lg p-6 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-lg text-amber-100">{content.benefit}</p>
      </motion.div>

      {/* Top Products */}
      <motion.div
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {content.topProducts.map((product, idx) => (
          <span
            key={product}
            className="bg-slate-800 border border-slate-700 text-gray-300 px-4 py-2 rounded-full text-sm hover:border-amber-500 hover:text-amber-400 transition-all cursor-pointer"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {product}
          </span>
        ))}
      </motion.div>

      {/* Secondary CTA */}
      <motion.button
        className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-2 mx-auto"
        whileHover={{ gap: 8 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {content.ctaSecondary}
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* Social Proof */}
      <motion.div
        className="flex justify-center gap-8 text-sm text-gray-400 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div>✅ Official Subscriptions</div>
        <div>💰 30-Day Replacement Warranty</div>
        <div>🚀 5-30 min Delivery</div>
      </motion.div>
    </motion.div>
  );
}
