import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ORG_SCHEMA, WEBSITE_SCHEMA } from "@/utils/schemas";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { bnFrom } from "@/lib/banglaPricing";

export default function DevelopersBN() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title="ডেভেলপারদের জন্য AI — কোড জেনারেশন, ডিবাগিং, ডকুমেন্টেশন"
        description="GitHub Copilot, Claude Pro, Cursor দিয়ে কোডিং দ্রুত করুন। বাংলাদেশে সাশ্রয়ী দামে। ৳399 থেকে শুরু।"
        canonical="https://aipremiumshop.com/developers-bn"
        jsonLd={[ORG_SCHEMA, WEBSITE_SCHEMA]}
        hreflang={{ bn: "/developers-bn", en: "/best-ai-for-developers" }}
      />

      <Navbar />
      <Breadcrumb items={[{ name: "হোম", href: "/bn" }, { name: "ডেভেলপারদের জন্য AI" }]} />

      <main>
        <section className="py-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ডেভেলপারদের জন্য AI — কোড দ্রুত লেখুন
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              GitHub Copilot, Claude Pro, Cursor দিয়ে কোড জেনারেশন, ডিবাগিং, ডকুমেন্টেশন। সপ্তাহে ঘন্টা বাঁচান।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমি ডেভেলপার। GitHub Copilot বা Claude Pro চাই। কোনটা রেকমেন্ড করবেন?"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#25d366" }}
            >
              WhatsApp করুন
            </a>
          </motion.div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">কোডিংয়ে AI ব্যবহারের সুবিধা</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "বয়লারপ্লেট কোড",
                desc: "API স্টাবস, ডেটাবেস স্কিমা, ডিফল্ট কনফিগ সব AI তৈরি করুন। ম্যানুয়াল টাইপিং কমুন।",
              },
              {
                title: "দ্রুত ডিবাগিং",
                desc: "Claude-কে এরর ম্যাসেজ দিলে সাথে সাথে সমাধান পাবেন। স্ট্যাক ওভারফ্লো খোঁজার সময় বাঁচবে।",
              },
              {
                title: "রিফ্যাক্টর করুন",
                desc: "পুরনো কোড Claude-কে দিন। আধুনিক ভার্সন, বেটার পারফরম্যান্স, ক্লিনার ফরম্যাট পাবেন।",
              },
              {
                title: "ডকুমেন্টেশন",
                desc: "কোড লিখুন, Claude দিয়ে বাংলা/ইংরেজি ডকুমেন্ট তৈরি করুন। README, API ডক সব।",
              },
              {
                title: "টেস্ট কেস",
                desc: "প্রতিটি ফাংশনের জন্য ইউনিট টেস্ট AI লেখায়। কভারেজ বেড়ায়, বাগ কমে।",
              },
              {
                title: "কোড রিভিউ",
                desc: "নিজের কোড Claude দিয়ে রিভিউ করান। সিকিউরিটি, পারফরম্যান্স, বেস্ট প্র্যাক্টিস টিপস পাবেন।",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 rounded-xl p-6 border border-gray-800"
              >
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">ডেভেলপারদের জন্য সেরা টুলস</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              // Prices come from the catalog. Typed by hand these read ৳1,495,
              // ৳1,590 and ৳2,088 against real entry tiers of ৳399, ৳599 and
              // ৳699 — every one of them wrong, and each with an order button.
              {
                name: "GitHub Copilot Pro",
                slug: "github-copilot-bangladesh",
                desc: "VSCode, GitHub এ কোড অটোকমপ্লিশন",
                best: "সবার জন্য",
              },
              {
                name: "Claude Pro",
                slug: "claude-pro-bangladesh",
                desc: "দীর্ঘ কোড ব্লক, জটিল রিফ্যাক্টিং",
                best: "যারা ডিপ রিফ্যাক্টিং করেন",
              },
              {
                name: "Cursor Pro",
                slug: "cursor-bangladesh",
                desc: "AI-প্রথম কোড এডিটর",
                best: "প্রফেশনাল ডেভেলপার",
              },
            ].map((t) => ({ ...t, price: bnFrom(t.slug) })).map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 rounded-xl p-6 border border-gray-800"
              >
                <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
                <div className="text-2xl font-bold text-yellow-400 mb-2">
                  {tool.price ? `${tool.price} থেকে` : "WhatsApp-এ দাম জানুন"}
                </div>
                <p className="text-gray-300 mb-4">{tool.desc}</p>
                <div className="text-sm text-gray-400 mb-4">সেরা: {tool.best}</div>
                <a
                  href={`https://wa.me/8801865385348?text=${encodeURIComponent(`আমি ডেভেলপার। ${tool.name} চাই${tool.price ? ` (${tool.price} থেকে)` : ""}।`)}`}
                  className="w-full py-2 rounded-lg font-bold text-center text-black transition-all hover:scale-105"
                  style={{ backgroundColor: "#f4b942" }}
                >
                  অর্ডার করুন
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
          <div
            className="rounded-2xl p-12 text-center border"
            style={{
              background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
              borderColor: "rgba(244, 185, 66, 0.2)",
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">বয়লারপ্লেট, ডিবাগিং ও ডকুমেন্টেশন AI-কে দিন</h2>
            <a
              href="https://wa.me/8801865385348?text=আমি ডেভেলপার। AI টুল নিতে চাই। কোনটা পাওয়া যায়?"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-black text-lg transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#25d366" }}
            >
              WhatsApp করুন →
            </a>
          </div>
        </section>
      </main>

      <FloatingWhatsApp />
    </div>
  );
}
