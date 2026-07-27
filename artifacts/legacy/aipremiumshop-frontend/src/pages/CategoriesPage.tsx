import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";

const CATEGORIES = [
  { id: "ai-assistant", name: "AI Assistant & Chat", icon: "🤖", count: "14 tools", desc: "ChatGPT, Claude, Gemini, Perplexity & more" },
  { id: "ai-image", name: "AI Image & Design", icon: "🎨", count: "11 tools", desc: "Midjourney, Canva, Leonardo, Ideogram & more" },
  { id: "ai-video", name: "AI Video & Audio", icon: "🎬", count: "17 tools", desc: "CapCut, Runway, Kling, Synthesia & more" },
  { id: "ai-voice-music", name: "AI Voice & Music", icon: "🎵", count: "6 tools", desc: "ElevenLabs, Suno, Udio & more" },
  { id: "ai-code", name: "AI Code & Dev", icon: "💻", count: "10 tools", desc: "GitHub Copilot, Cursor, Replit, v0.dev & more" },
  { id: "ai-workspace", name: "AI Workspace", icon: "📊", count: "9 tools", desc: "Notion, Manus, Otter, Gamma & more" },
  { id: "ai-writing", name: "AI Text & Writing", icon: "✍️", count: "20 tools", desc: "Grammarly, QuillBot, Writesonic & more" },
  { id: "ai-design", name: "AI Design", icon: "🎯", count: "5 tools", desc: "Adobe Firefly, Freepik & more" },
  { id: "bundles", name: "Student & Freelancer Bundles", icon: "🎓", count: "8 tools", desc: "Curated packages for students & professionals" },
];

export default function CategoriesPage() {
  return (
    <PageLayout>
      <SEOHead
        title="All Categories — Browse AI Tools by Category"
        description="Browse AI subscription categories in Bangladesh. ChatGPT, Claude, Midjourney, Canva Pro, CapCut, and 99+ more AI tools. Pay with bKash or Nagad."
        canonical="https://aipremium.tools/categories"
      />
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-20">
        <h1 className="text-4xl font-bold text-white mb-4">Browse by Category</h1>
        <p className="text-lg mb-12" style={{ color: "#c9ceda" }}>
          Find the perfect AI tools for your needs — from writing and coding to design and video.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.id}`}
              className="group block p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-200 hover:translate-y-[-2px]"
              style={{ backgroundColor: "#0a0e27" }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{cat.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: "#f4b942" }}>{cat.count}</p>
                  <p className="text-sm mt-1" style={{ color: "#c9ceda" }}>{cat.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}