import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ORG_SCHEMA, WEBSITE_SCHEMA, breadcrumbSchema } from "@/utils/schemas";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { bnFrom, bnTaka, priceOf } from "@/lib/banglaPricing";
import { tierPrice } from "@/lib/catalogStats";
import { CheckCircle } from "lucide-react";

export default function StudentsBN() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title="ছাত্রছাত্রীদের জন্য সেরা AI টুলস — অ্যাসাইনমেন্ট, রিসার্চ, প্রজেক্ট"
        description="ঢাবি, বুয়েট ছাত্রছাত্রীদের জন্য ChatGPT Plus, Claude Pro, Perplexity সাবস্ক্রিপশন। বাংলাদেশে সবচেয়ে সাশ্রয়ী দামে। ৳499 থেকে শুরু।"
        canonical="https://aipremiumshop.com/students-bn"
        jsonLd={[ORG_SCHEMA, WEBSITE_SCHEMA, breadcrumbSchema([{ name: "হোম", href: "/bn" }, { name: "ছাত্রছাত্রীদের জন্য AI" }])]}
        hreflang={{ bn: "/students-bn", en: "/best-ai-for-students" }}
      />

      <Navbar />
      <Breadcrumb items={[{ name: "হোম", href: "/bn" }, { name: "ছাত্রছাত্রীদের জন্য AI" }]} />

      <main>
        {/* HERO */}
        <section className="py-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              শিক্ষার্থীদের জন্য AI — অ্যাসাইনমেন্ট ও গবেষণা দ্রুত করুন
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              ChatGPT, Claude, Perplexity দিয়ে অ্যাসাইনমেন্ট, থিসিস রিসার্চ, কোডিং প্রজেক্ট করুন। বাংলাদেশে সবচেয়ে সাশ্রয়ী দামে।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমি একজন ছাত্র। এআই টুল নিতে চাই অ্যাসাইনমেন্টের জন্য। কোনটা সাজেস্ট করবেন?"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#25d366" }}
            >
              WhatsApp করুন — ২ মিনিটে উত্তর পাবেন
            </a>
          </motion.div>
        </section>

        {/* কীভাবে সাহায্য করে */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">AI কীভাবে আপনার পড়াশোনা সহজ করে?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                task: "অ্যাসাইনমেন্ট লেখা",
                tools: "ChatGPT Plus, Claude Pro",
                help: "থিসিস, ইস্যু এনালাইসিস, রিসার্চ পেপার লেখার স্ট্রাকচার পান। প্রতিটি আইডিয়া বিস্তারিত করুন।",
              },
              {
                task: "ইংরেজি উন্নত করুন",
                tools: "Grammarly, QuillBot",
                help: "আপনার ইংরেজি ইমেইল, থিসিস, সিভি সঠিক করুন। ব্যাকরণ এবং স্টাইল উন্নত করুন।",
              },
              {
                task: "কোডিং প্রজেক্ট",
                tools: "GitHub Copilot, Claude Pro",
                help: "কোড লেখা, ডিবাগিং, অ্যালগরিদম ডিজাইন সব সহজ করুন। ইন্টারভিউ প্রস্তুতিও পাবেন।",
              },
              {
                task: "গবেষণা দ্রুত করুন",
                tools: "Perplexity Pro, Claude Pro",
                help: "গুগলের বদলে Perplexity দিয়ে সোর্স সহ তথ্য পান। রিসার্চ অনেক দ্রুত শেষ হয়।",
              },
              {
                task: "এক্সাম প্রস্তুতি",
                tools: "ChatGPT Plus, Perplexity",
                help: "কোচিং ছাড়াই কনসেপ্ট বুঝুন। প্রতিটি বিষয়ে সিম্পল ব্যাখ্যা পান।",
              },
              {
                task: "প্রজেক্ট আইডিয়া",
                tools: "Claude Pro, Midjourney",
                help: "ইউনিক প্রজেক্ট আইডিয়া পান। ভিজ্যুয়ালাইজেশনের জন্য ছবিও তৈরি করুন।",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 rounded-xl p-6 border border-gray-800"
              >
                <h3 className="text-lg font-bold text-white mb-2">{item.task}</h3>
                <div className="text-sm text-yellow-400 mb-3">টুলস: {item.tools}</div>
                <p className="text-gray-300">{item.help}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* সেরা প্যাকেজ */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">ছাত্রছাত্রীদের জন্য সেরা প্যাকেজ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "বাজেট প্যাকেজ",
                price: bnFrom("chatgpt-plus-bangladesh"),
                desc: "ChatGPT Plus Starter",
                features: ["অ্যাসাইনমেন্ট লেখা", "গবেষণা সহায়তা", "কোড ডিবাগিং", "৫-৩০ মিনিট ডেলিভারি"],
              },
              {
                name: "স্টুডেন্ট বেস্ট",
                price: bnTaka(tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0),
                desc: "Claude Pro Premium",
                features: ["দীর্ঘ রিসার্চ পেপার", "জটিল সমস্যা সমাধান", "থিসিস গাইডেন্স", "30 দিনের ওয়ারেন্টি"],
                recommended: true,
              },
              {
                name: "অল-ইন-ওয়ান",
                price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("perplexity-pro-bangladesh") ?? 0)),
                desc: "Claude Pro + Perplexity",
                features: ["সব সাবজেক্ট কভার", "সোর্স ভেরিফিকেশন", "দ্রুত রিসার্চ", "৩টি মাস ওয়ারেন্টি"],
              },
            ].map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-xl p-6 border transition-all ${
                  pkg.recommended
                    ? "bg-gradient-to-br from-yellow-900/40 to-gray-900 border-yellow-400"
                    : "bg-gray-900/50 border-gray-800"
                }`}
              >
                {pkg.recommended && (
                  <div className="text-xs font-bold text-yellow-400 mb-2">সেরা বেছা ⭐</div>
                )}
                <h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-yellow-400 mb-1">{pkg.price}</div>
                <div className="text-sm text-gray-400 mb-4">{pkg.desc}</div>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/8801865385348?text=আমি ছাত্র। ${pkg.name} (${pkg.price}) নিতে আগ্রহী।`}
                  className="w-full py-2 rounded-lg font-bold text-center transition-all hover:scale-105"
                  style={{
                    backgroundColor: pkg.recommended ? "#f4b942" : "#374151",
                    color: pkg.recommended ? "#000" : "#fff",
                  }}
                >
                  এখনই অর্ডার করুন
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">ছাত্রছাত্রীদের জন্য টিপস</h2>
          <div className="space-y-4">
            {[
              "ChatGPT-কে কাস্টম ইন্সট্রাকশন দিন: আপনার বিষয়, স্তর (স্কুল/কলেজ/বিশ্ববিদ্যালয়) বলে দিন। এটা তার উত্তর সবসময় সেই লেভেলে দেবে।",
              "Perplexity-তে 'Focus' সেট করুন: শুধু একাডেমিক পেপার, তাহলে ভাল রেফারেন্স পাবেন।",
              "Claude Pro দিয়ে আপনার কাজ রিভিউ করান: প্রথম ড্রাফট শেষ করলে Claude-কে চেক করতে দিন। উন্নতির সাজেশন পাবেন।",
              "GitHub Copilot আপনার কোডিং সাথী: নিজে প্রথম লাইন লিখুন, Copilot বাকিটা সাজেস্ট করবে। শেখাও হবে, কাজও দ্রুত হবে।",
              "রাত ১টায় অ্যাসাইনমেন্ট জমা? Grammarly দিয়ে দ্রুত ইংরেজি ফিক্স করুন।",
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-yellow-400"
              >
                <p className="text-gray-200">💡 {tip}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
          <div
            className="rounded-2xl p-12 text-center border"
            style={{
              background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
              borderColor: "rgba(244, 185, 66, 0.2)",
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">আজই শুরু করুন — ৳499 থেকে</h2>
            <p className="text-gray-300 mb-8">
              কোনো লুকানো চার্জ নেই। ৩০ দিনের গ্যারান্টি।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমি ছাত্র। AI টুল চাই অ্যাসাইনমেন্টের জন্য। ৳499-এ কোনটা পাওয়া যায়?"
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
