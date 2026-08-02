// Single source of truth for blog categories. BlogPage's filter, Navbar's
// Blog mega-menu, and PageFooter's Blog column all read this list — adding a
// category here surfaces it everywhere at once, the same fix applied to the
// product category list (ai-design was invisible in one place before that
// fix). Keys must match the `category` field used on POSTS in BlogPage.tsx.
export interface BlogCategory {
  key: string;
  label: string;
  emoji: string;
  color: string;
  href: string; // /blog?category=<key>
  description: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { key: "assistant", label: "AI Assistants", emoji: "🧠", color: "#4285f4", href: "/blog?category=assistant",
    description: "ChatGPT, Claude, Gemini, Grok — comparisons, pricing and mastery guides." },
  { key: "image-video", label: "Image & Video AI", emoji: "🎬", color: "#a855f7", href: "/blog?category=image-video",
    description: "Midjourney, Runway, HeyGen, CapCut and every AI creative tool." },
  { key: "voice-music", label: "Voice & Music AI", emoji: "🎵", color: "#ec4899", href: "/blog?category=voice-music",
    description: "ElevenLabs, Suno and voice cloning / music generation guides." },
  { key: "coding", label: "AI for Developers", emoji: "💻", color: "#22c55e", href: "/blog?category=coding",
    description: "GitHub Copilot, Cursor, coding agents and dev workflows." },
  { key: "agents", label: "AI Agents", emoji: "🤖", color: "#f4b942", href: "/blog?category=agents",
    description: "Manus and the agentic-AI shift — what it means for BD users." },
  { key: "payments", label: "Payments & Access", emoji: "💳", color: "#10b981", href: "/blog?category=payments",
    description: "Paying for AI tools from Bangladesh without an international card." },
  { key: "safety", label: "Safety & Scams", emoji: "🛡", color: "#ef4444", href: "/blog?category=safety",
    description: "Spotting fake sellers, scam red flags, and staying protected." },
  { key: "students", label: "For Students", emoji: "🎓", color: "#3b82f6", href: "/blog?category=students",
    description: "Study, research and assignment workflows with AI." },
  { key: "freelancers", label: "For Freelancers", emoji: "💼", color: "#f97316", href: "/blog?category=freelancers",
    description: "Earning more and delivering faster with an AI toolkit." },
  { key: "strategy", label: "Strategy & Comparisons", emoji: "💡", color: "#eab308", href: "/blog?category=strategy",
    description: "Which tools to combine, and why one AI subscription is rarely enough." },
];

export const BLOG_CATEGORY_MAP: Record<string, BlogCategory> = Object.fromEntries(
  BLOG_CATEGORIES.map((c) => [c.key, c]),
);
