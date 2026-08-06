import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ORG_SCHEMA, WEBSITE_SCHEMA } from "@/utils/schemas";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { bnFrom, bnTaka, priceOf } from "@/lib/banglaPricing";
import { tierPrice } from "@/lib/catalogStats";
import { CheckCircle } from "lucide-react";

export default function FreelancersBN() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title="ফ্রিল্যান্সারদের জন্য সেরা AI টুলস — Upwork, Fiverr, দক্ষতা বৃদ্ধি"
        description="Upwork ও Fiverr-এর কাজের জন্য AI। ChatGPT, Claude, Midjourney দিয়ে প্রস্তাব লেখা, কন্টেন্ট তৈরি, কোড ডেলিভারি। বাংলাদেশে ৳499 থেকে।"
        canonical="https://aipremiumshop.com/freelancers-bn"
        jsonLd={[ORG_SCHEMA, WEBSITE_SCHEMA]}
        hreflang={{ "bn-BD": "/freelancers-bn", "en-BD": "/best-ai-for-freelancers" }}
      />

      <Navbar />
      <Breadcrumb items={[{ name: "হোম", href: "/bn" }, { name: "ফ্রিল্যান্সারদের জন্য AI" }]} />

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
              ফ্রিল্যান্সারদের জন্য AI — প্রস্তাব থেকে ডেলিভারি পর্যন্ত
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              ChatGPT, Claude, Midjourney দিয়ে Upwork ও Fiverr-এ প্রতিযোগীদের থেকে এগিয়ে থাকুন। প্রস্তাব দ্রুত লিখুন, কোয়ালিটি বাড়ান, আরও ক্লায়েন্ট পান।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমি ফ্রিল্যান্সার। Upwork/Fiverr কাজের জন্য AI টুল চাই। কোনটা রেকমেন্ড করবেন?"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#25d366" }}
            >
              WhatsApp করুন
            </a>
          </motion.div>
        </section>

        {/* AI সাহায্য */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">ফ্রিল্যান্সিং-এ AI কীভাবে সাহায্য করে?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                task: "Upwork প্রস্তাব লেখা",
                tools: "ChatGPT Plus, Claude Pro",
                help: "ক্লায়েন্টের প্রজেক্ট পড়ুন, Claude-কে বলুন। ৫ মিনিটে জয়ী প্রস্তাব পাবেন। কাস্টমাইজড, প্রফেশনাল, ক্লায়েন্টের ভাষায়।",
              },
              {
                task: "রাইটিং প্রজেক্ট ডেলিভার করুন",
                tools: "ChatGPT Plus, Grammarly",
                help: "ব্লগ পোস্ট, ইমেইল কপি, সোশ্যাল মিডিয়া কন্টেন্ট অর্ধেক সময়ে শেষ করুন। Grammarly দিয়ে ৫ মিনিটে পলিশ করুন।",
              },
              {
                task: "ছবি ও ডিজাইন তৈরি করুন",
                tools: "Midjourney, Ideogram",
                help: "টেক্সট প্রম্পট থেকে সেকেন্ডে স্টান্নিং ভিজ্যুয়াল তৈরি করুন। ক্লায়েন্টকে দেখান, রেভিশন চেয়ে AI-তে আপডেট করুন।",
              },
              {
                task: "কোডিং প্রজেক্ট সম্পন্ন করুন",
                tools: "GitHub Copilot, Claude Pro",
                help: "WordPress থিম কাস্টমাইজ, PHP ফিক্স, JavaScript ফিচার যোগ করুন। বয়লারপ্লেট ও রিপিটেটিভ কোড AI লিখে দেয়। আপনি রিভিউ ও ডিপ্লয় করুন।",
              },
              {
                task: "ভিডিও কন্টেন্ট তৈরি",
                tools: "Runway, HeyGen",
                help: "স্ক্রিপ্ট থেকে সেকেন্ডে ভিডিও তৈরি করুন। নিজের কন্ঠ দিয়ে ন্যারেশন করিয়ে নিন। ক্লায়েন্টকে দ্রুত ডেলিভার করুন।",
              },
              {
                task: "রিসার্চ ও রিপোর্ট দ্রুত করুন",
                tools: "Perplexity Pro, Claude Pro",
                help: "মার্কেট রিসার্চ, কম্পিটিটর এনালাইসিস, কন্টেন্ট রিসার্চ ঘন্টায় শেষ করুন। সোর্স ভেরিফাইড রেসপন্স পাবেন।",
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
          <h2 className="text-3xl font-bold text-center mb-12">ফ্রিল্যান্সারদের জন্য সেরা প্যাকেজ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "স্টার্টার",
                price: bnFrom("chatgpt-plus-bangladesh"),
                desc: "ChatGPT Plus",
                features: ["টেক্সট ও কন্টেন্ট", "প্রস্তাব লেখা", "বেসিক কোডিং", "বিগিনার-ফ্রেন্ডলি"],
              },
              {
                name: "প্রফেশনাল",
                price: bnTaka(tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0),
                desc: "Claude Pro Premium",
                features: ["দীর্ঘ রিসার্চ পেপার", "জটিল কোডিং ট্যাস্ক", "ডকুমেন্টেশন জেনারেশন", "৩০ দিনের ওয়ারেন্টি"],
                recommended: true,
              },
              {
                name: "পাওয়ার ইউজার",
                price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("midjourney-bangladesh") ?? 0)),
                desc: "Claude Pro + Midjourney",
                features: ["টেক্সট + ভিজ্যুয়াল", "উন্নত ডিজাইন", "মাল্টি-ফরম্যাট কন্টেন্ট", "৩ মাস সাপোর্ট"],
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
                  <div className="text-xs font-bold text-yellow-400 mb-2">সেরা পছন্দ ⭐</div>
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
                  href={`https://wa.me/8801865385348?text=আমি ফ্রিল্যান্সার। ${pkg.name} (${pkg.price}) নিতে আগ্রহী।`}
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
          <h2 className="text-3xl font-bold text-center mb-12">ফ্রিল্যান্সারদের জন্য প্রো টিপস</h2>
          <div className="space-y-4">
            {[
              "ChatGPT-এ সেভ করুন: সফল প্রস্তাবের টেমপ্লেট, আপনার দক্ষতা, রেট — পরবর্তী প্রস্তাব লিখা ৫ সেকেন্ডে।",
              "Midjourney দিয়ে পোর্টফোলিও বৌদ্ধিকৃত করুন: ক্লায়েন্ট যখন দেখে 'AI-ডিজাইন', তারা বুঝে আপনি মডার্ন।",
              "Claude কে আপনার বিড প্রিভিউ দিন: জমা দেওয়ার আগে Claude বলে 'এটা গড়-মানের, এখানে আরও উন্নত করুন'।",
              "Perplexity দিয়ে দ্রুত রিসার্চ করুন: Google খোঁজার চেয়ে Perplexity-তে প্রশ্ন করুন, সরাসরি উত্তর পাবেন।",
              "প্রতিটি টুল একবার পরীক্ষা করুন: বিনামূল্যে ট্রায়াল ব্যবহার করুন, তারপর AIPS-এ বাংলাদেশি রেট-এ নিন।",
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
              একটি প্রজেক্টেই খরচ উঠে আসতে পারে — বাকিটা আপনার সময় বাঁচায়।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমি Upwork ফ্রিল্যান্সার। AI টুল চাই। কোনটা দিয়ে শুরু করব?"
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
