import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Star } from "lucide-react";

type Segment = "students" | "freelancers" | "creators" | "smbs" | "educators";

const segmentContent: Record<Segment, {
  headline: string;
  subheadline: string;
  benefit: string;
  testimonial: string;
  testimonialAuthor: string;
  topProducts: string[];
  cta: string;
  ctaSecondary: string;
}> = {
  students: {
    headline: "Save 10+ Hours Per Week on Assignments",
    subheadline: "Join 500+ Bangladesh university students",
    benefit: "Get better grades, finish projects faster, understand complex topics instantly",
    testimonial: "Saved me so much time on assignments and exams!",
    testimonialAuthor: "Rahim, Dhaka University",
    topProducts: ["ChatGPT Plus", "Claude Pro", "GitHub Copilot"],
    cta: "Get Started in 2 Minutes",
    ctaSecondary: "Browse AI Tools for Students",
  },
  freelancers: {
    headline: "10x Your Freelance Income with AI",
    subheadline: "Join 800+ Bangladesh freelancers on Upwork/Fiverr",
    benefit: "Win more projects, deliver faster, charge premium rates",
    testimonial: "Went from $5/hour to $25/hour in 3 months!",
    testimonialAuthor: "Fatima, Freelancer",
    topProducts: ["ChatGPT Pro", "Midjourney", "Canva AI"],
    cta: "Boost My Upwork Rate",
    ctaSecondary: "See Freelancer Tools",
  },
  creators: {
    headline: "Create 10x More Content Daily",
    subheadline: "Join 400+ Bangladesh content creators",
    benefit: "Generate ideas, make stunning visuals, edit videos faster",
    testimonial: "Got 100K subscribers in 6 months with AI!",
    testimonialAuthor: "Karim, YouTube Creator",
    topProducts: ["Midjourney", "HeyGen", "Canva AI"],
    cta: "Go Viral with AI Content",
    ctaSecondary: "Explore Creator Tools",
  },
  smbs: {
    headline: "Run Your Business 24/7 with AI",
    subheadline: "Join 200+ Bangladesh small business owners",
    benefit: "Automate tasks, save time, scale without hiring",
    testimonial: "Saved me ৳50K/month in hiring costs!",
    testimonialAuthor: "Anir, SMB Owner",
    topProducts: ["Notion AI", "Zapier", "ChatGPT Business"],
    cta: "Automate My Business Today",
    ctaSecondary: "View Business Tools",
  },
  educators: {
    headline: "Teach Better & Grade Faster",
    subheadline: "Join 150+ Bangladesh educators",
    benefit: "Create lessons, generate assessments, engage students more",
    testimonial: "Student engagement increased 40%!",
    testimonialAuthor: "Mrs. Hasna, Teacher",
    topProducts: ["ChatGPT", "Claude", "Notion AI"],
    cta: "Transform My Classroom",
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

      {/* Testimonial */}
      <motion.div
        className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 max-w-xl mx-auto backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
          ))}
        </div>
        <p className="text-gray-300 text-lg italic mb-3">"{content.testimonial}"</p>
        <p className="text-amber-400 font-semibold">— {content.testimonialAuthor}</p>
      </motion.div>

      {/* Secondary CTA */}
      <motion.button
        className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-2 mx-auto"
        whileHover={{ gap: 8 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {content.ctaSecondary}
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* Social Proof */}
      <motion.div
        className="flex justify-center gap-8 text-sm text-gray-400 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div>✅ Official Subscriptions</div>
        <div>💰 30-day Money Back</div>
        <div>🚀 5-30 min Delivery</div>
      </motion.div>
    </motion.div>
  );
}
