import { motion } from "framer-motion";

interface Brand {
  name: string;
  slug: string;
  category: string;
  color: string;
  products: string[];
  officialWebsite: string;
}

export function BrandShowcaseSection() {
  // Top brands to feature - will be populated from brands-registry.json
  const topBrands: Brand[] = [
    { name: "ChatGPT", slug: "chatgpt", category: "ai-assistant", color: "#10a37f", products: [], officialWebsite: "https://openai.com/chatgpt" },
    { name: "Claude", slug: "claude", category: "ai-assistant", color: "#9ca3af", products: [], officialWebsite: "https://claude.ai" },
    { name: "Midjourney", slug: "midjourney", category: "ai-image", color: "#8b5cf6", products: [], officialWebsite: "https://midjourney.com" },
    { name: "Google", slug: "google", category: "ai-assistant", color: "#4285f4", products: [], officialWebsite: "https://gemini.google.com" },
    { name: "GitHub", slug: "github", category: "ai-code", color: "#ffffff", products: [], officialWebsite: "https://github.com/copilot" },
    { name: "Cursor", slug: "cursor", category: "ai-code", color: "#000000", products: [], officialWebsite: "https://cursor.sh" },
    { name: "Runway", slug: "runway", category: "ai-video", color: "#ffffff", products: [], officialWebsite: "https://runwayml.com" },
    { name: "Grok", slug: "grok", category: "ai-assistant", color: "#6b7280", products: [], officialWebsite: "https://grok.com" },
    { name: "Perplexity", slug: "perplexity", category: "ai-assistant", color: "#ffffff", products: [], officialWebsite: "https://perplexity.ai" },
    { name: "ElevenLabs", slug: "elevenlabs", category: "ai-voice-music", color: "#ffffff", products: [], officialWebsite: "https://elevenlabs.io" },
    { name: "Suno", slug: "suno", category: "ai-voice-music", color: "#ff6b35", products: [], officialWebsite: "https://suno.ai" },
    { name: "Ideogram", slug: "ideogram", category: "ai-image", color: "#000000", products: [], officialWebsite: "https://ideogram.ai" },
    { name: "Notion", slug: "notion", category: "ai-workspace", color: "#000000", products: [], officialWebsite: "https://notion.so" },
    { name: "Canva", slug: "canva", category: "ai-design", color: "#00c4cc", products: [], officialWebsite: "https://canva.com" },
    { name: "Grammarly", slug: "grammarly", category: "ai-writing", color: "#15c784", products: [], officialWebsite: "https://grammarly.com" },
    { name: "QuillBot", slug: "quillbot", category: "ai-writing", color: "#2e5090", products: [], officialWebsite: "https://quillbot.com" },
    { name: "Jasper", slug: "jasper", category: "ai-writing", color: "#4f47f7", products: [], officialWebsite: "https://jasper.ai" },
    { name: "Pika", slug: "pika", category: "ai-video", color: "#ffd166", products: [], officialWebsite: "https://pika.art" },
    { name: "Descript", slug: "descript", category: "ai-video", color: "#ffffff", products: [], officialWebsite: "https://descript.com" },
    { name: "Zapier", slug: "zapier", category: "ai-workspace", color: "#ff4f00", products: [], officialWebsite: "https://zapier.com" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          118+ Tools from Top AI Brands
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Access the world's leading AI tools at Bangladesh-friendly prices. All brands, all features, all working.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {topBrands.map((brand) => (
          <motion.div
            key={brand.slug}
            variants={itemVariants}
            className="group relative rounded-xl p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300 bg-gray-900/40 hover:bg-gray-900/60 hover:scale-105 cursor-pointer"
          >
            {/* Brand color accent */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity"
              style={{ backgroundColor: brand.color }}
            />

            {/* Content */}
            <div className="relative z-10">
              <div
                className="w-12 h-12 rounded-lg mb-3 flex items-center justify-center mb-3"
                style={{
                  backgroundColor: `${brand.color}22`,
                  borderLeft: `3px solid ${brand.color}`,
                }}
              >
                <div
                  className="w-7 h-7 rounded-full"
                  style={{ backgroundColor: brand.color }}
                />
              </div>
              <h3 className="font-bold text-white text-sm md:text-base">{brand.name}</h3>
              <p className="text-xs text-gray-400 mt-1 capitalize">{brand.category.replace("ai-", "")}</p>
            </div>

            {/* Hover indicator */}
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-semibold text-[#f4b942]">→</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <a
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
          style={{
            backgroundColor: "#f4b942",
            color: "#000",
          }}
        >
          Browse All Tools
          <span>→</span>
        </a>
      </motion.div>
    </section>
  );
}
