// Shared taxonomy for the blog index, navbar and footer. Descriptions define
// topic scope only; they deliberately avoid outcome, ranking or provider-limit
// claims so navigation copy cannot become a separate source of commercial truth.
export interface BlogCategory {
  key: string;
  label: string;
  emoji: string;
  color: string;
  href: string;
  description: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { key: "assistant", label: "AI Assistants", emoji: "🧠", color: "#4285f4", href: "/blog?category=assistant", description: "Plan, access and workflow guides for AI assistant products." },
  { key: "image-video", label: "Image & Video AI", emoji: "🎬", color: "#a855f7", href: "/blog?category=image-video", description: "Decision guides for image, design and video-generation workflows." },
  { key: "voice-music", label: "Voice & Music AI", emoji: "🎵", color: "#ec4899", href: "/blog?category=voice-music", description: "Voice, speech, audio and music workflow guides." },
  { key: "coding", label: "AI for Developers", emoji: "💻", color: "#22c55e", href: "/blog?category=coding", description: "Coding-assistant and development-workflow decision guides." },
  { key: "agents", label: "AI Agents", emoji: "🤖", color: "#f4b942", href: "/blog?category=agents", description: "Agent-product pricing, access and workflow guides." },
  { key: "payments", label: "Payments & Access", emoji: "💳", color: "#10b981", href: "/blog?category=payments", description: "Payment, account-control and access-model guidance for Bangladesh." },
  { key: "safety", label: "Safety & Scams", emoji: "🛡", color: "#ef4444", href: "/blog?category=safety", description: "Seller-evaluation, account-security and purchase-risk checklists." },
  { key: "students", label: "For Students", emoji: "🎓", color: "#3b82f6", href: "/blog?category=students", description: "Study, research and academic-policy guidance for AI use." },
  { key: "freelancers", label: "For Freelancers", emoji: "💼", color: "#f97316", href: "/blog?category=freelancers", description: "Client-work, QA and tool-selection guidance for freelancers." },
  { key: "strategy", label: "Strategy & Comparisons", emoji: "💡", color: "#eab308", href: "/blog?category=strategy", description: "Workflow-first comparison and tool-stack decision guides." },
];

export const BLOG_CATEGORY_MAP: Record<string, BlogCategory> = Object.fromEntries(BLOG_CATEGORIES.map((category) => [category.key, category]));
