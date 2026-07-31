import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { bnFrom, bnTaka, priceOf } from "@/lib/banglaPricing";
import { tierPrice } from "@/lib/catalogStats";
import { CheckCircle } from "lucide-react";

export default function CreatorsBN() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title="কন্টেন্ট ক্রিয়েটরদের জন্য সেরা AI টুলস — ভিডিও, লেখা, ডিজাইন"
        description="YouTube, TikTok, Instagram ক্রিয়েটরদের জন্য ChatGPT, Midjourney, Runway, ElevenLabs। আরও দ্রুত, আরও ভাল কন্টেন্ট তৈরি করুন। বাংলাদেশে ৳599 থেকে।"
        canonical="https://aipremiumshop.com/creators-bn"
      />

      <Navbar />

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
              ক্রিয়েটরদের জন্য AI — সপ্তাহে ১০ ঘন্টা বাঁচান
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              ChatGPT, Midjourney, Runway, ElevenLabs দিয়ে YouTube, TikTok, Instagram-এর জন্য কন্টেন্ট তৈরি করুন। আইডিয়া থেকে পাবলিশ করা পর্যন্ত দ্রুত।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমি কন্টেন্ট ক্রিয়েটর। YouTube/TikTok-এর জন্য AI টুল চাই। সাজেস্ট করবেন?"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#25d366" }}
            >
              WhatsApp করুন
            </a>
          </motion.div>
        </section>

        {/* AI সাহায্য */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">কন্টেন্ট ক্রিয়েটিং-এ AI কীভাবে সাহায্য করে?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                task: "ভিডিও স্ক্রিপ্ট লেখা",
                tools: "ChatGPT Plus, Claude Pro",
                help: "আপনার ইউটিউব ভিডিওর জন্য এনগেজিং স্ক্রিপ্ট লিখিয়ে নিন। হুক, স্ট্রাকচার, কল-টু-এক্শন সব যুক্ত থাকবে।",
              },
              {
                task: "থাম্বনেইল ও সোশ্যাল পোস্ট ডিজাইন",
                tools: "Midjourney, Ideogram, Canva",
                help: "AI দিয়ে স্টাইল কনসেপ্ট তৈরি করুন। Canva-তে কাস্টমাইজ করুন। ক্লিক-যোগ্য থাম্বনেইল সেকেন্ডে।",
              },
              {
                task: "টিকটক/রিলস কন্টেন্ট জেনারেট করুন",
                tools: "ChatGPT Plus, Runway",
                help: "ভাইরাল আইডিয়া চাইলে ChatGPT বলুন, Runway দিয়ে ভিডিও তৈরি করুন। ৫ মিনিটে পোস্ট করার মতো কন্টেন্ট।",
              },
              {
                task: "ভয়েসওভার ও ন্যারেশন",
                tools: "ElevenLabs, Murf",
                help: "নিজের কণ্ঠ AI-তে ক্লোন করুন বা প্রফেশনাল ভয়েস নির্বাচন করুন। ভিডিও সিঙ্ক্রোনাইজ করুন।",
              },
              {
                task: "ব্লগ পোস্ট & সোশ্যাল ক্যাপশন",
                tools: "ChatGPT Plus, Claude Pro",
                help: "একটি ভিডিও আইডিয়া থেকে ব্লগ, ইনস্টাগ্রাম ক্যাপশন, লিংকডইন পোস্ট সব তৈরি করুন।",
              },
              {
                task: "ভিডিও এডিটিং এবং ট্রান্সক্রিপশন",
                tools: "Descript, Runway, ClipChamp",
                help: "অটোমেটিক সাবটাইটেল, বি-রোল সাজেশন, সাউন্ড ডিজাইন টিপস পান AI থেকে।",
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
          <h2 className="text-3xl font-bold text-center mb-12">ক্রিয়েটরদের জন্য সেরা প্যাকেজ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "স্টার্টার ক্রিয়েটর",
                price: bnFrom("chatgpt-plus-bangladesh"),
                desc: "ChatGPT Plus",
                features: ["স্ক্রিপ্ট লেখা", "আইডিয়া জেনারেশন", "ক্যাপশন লেখা", "বেসিক ভিডিও টিপস"],
              },
              {
                name: "প্রো ক্রিয়েটর",
                price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("midjourney-bangladesh") ?? 0)),
                desc: "Claude Pro + Midjourney",
                features: ["এডভান্সড স্ক্রিপ্ট", "AI-ডিজাইন", "স্টাইল কনসেপ্ট", "৩০ দিনের সাপোর্ট"],
                recommended: true,
              },
              {
                name: "মাল্টি-ফরম্যাট ক্রিয়েটর",
                price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("midjourney-bangladesh") ?? 0) + (priceOf("runway-bangladesh") ?? 0)),
                desc: "Claude + Midjourney + Runway",
                features: ["সব ফরম্যাট কন্টেন্ট", "ভিডিও জেনারেশন", "ভয়েসওভার", "প্রিমিয়াম সাপোর্ট"],
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
                  <div className="text-xs font-bold text-yellow-400 mb-2">সবচেয়ে জনপ্রিয় ⭐</div>
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
                  href={`https://wa.me/8801865385348?text=আমি ইউটিউব/টিকটক ক্রিয়েটর। ${pkg.name} (${pkg.price}) নিতে আগ্রহী।`}
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

        {/* টিপস */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">ক্রিয়েটরদের জন্য প্রো টিপস</h2>
          <div className="space-y-4">
            {[
              "এক সপ্তাহের কন্টেন্ট ক্যালেন্ডার AI দিয়ে তৈরি করুন: ৭টি ভিডিও আইডিয়া, স্ক্রিপ্ট, থাম্বনেইল কনসেপ্ট সব এক দিনে।",
              "Midjourney স্টাইল খুঁজুন: আপনার ব্র্যান্ড ভিজ্যুয়াল অনন্য করার জন্য স্টাইল গাইড তৈরি করুন।",
              "ElevenLabs-এ ভয়েস রেজিস্টার করুন: ১ মিনিটের রেকর্ডিং দিয়ে নিজের AI কপি তৈরি করুন। সবসময় পাওয়া যাবে।",
              "ক্রস-ফরম্যাট কন্টেন্ট তৈরি করুন: একটি ইউটিউব ভিডিও থেকে ২০টি টিকটক/রিলস কাটুন।",
              "মাসিক ড্যাশবোর্ড তৈরি করুন: AI দিয়ে পারফরম্যান্স রিপোর্ট, ট্রেন্ড এনালাইসিস, পরবর্তী মাসের স্ট্র্যাটেজি।",
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
            <h2 className="text-3xl font-bold text-white mb-4">আজই শুরু করুন — ৳599 থেকে</h2>
            <p className="text-gray-300 mb-8">
              এই মাসে আরও ১০টি ভিডিও পাবলিশ করুন AI-তে সময় বাঁচিয়ে।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমি ইউটিউব/টিকটক ক্রিয়েটর। কন্টেন্ট তৈরিতে AI চাই। কোনটা দিয়ে শুরু করব?"
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
