import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ORG_SCHEMA, WEBSITE_SCHEMA } from "@/utils/schemas";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { bnFrom, bnTaka, priceOf } from "@/lib/banglaPricing";
import { tierPrice } from "@/lib/catalogStats";
import { CheckCircle } from "lucide-react";

export default function StudentsBN() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title="শিক্ষার্থীদের জন্য AI টুলস — অ্যাসাইনমেন্ট, রিসার্চ ও প্রজেক্ট"
        description="শিক্ষার্থীদের জন্য ChatGPT, Claude ও Perplexityসহ AI টুল বাছাইয়ের গাইড। বর্তমান AIPS দাম, অ্যাক্সেস মডেল ও অর্ডার-নির্দিষ্ট শর্ত পেমেন্টের আগে নিশ্চিত করুন।"
        canonical="https://aipremiumshop.com/students-bn"
        lang="bn-BD"
        jsonLd={[ORG_SCHEMA, WEBSITE_SCHEMA]}
        hreflang={{ "bn-BD": "/students-bn", "en-BD": "/best-ai-for-students" }}
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
              শিক্ষার্থীদের জন্য AI — অ্যাসাইনমেন্ট ও গবেষণায় সহায়তা নিন
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              ChatGPT, Claude ও Perplexity দিয়ে ধারণা বোঝা, গবেষণা সাজানো এবং কোডিং প্রজেক্টে সহায়তা নিন। কোন প্ল্যান আপনার জন্য উপযুক্ত, তা বর্তমান দাম ও অ্যাক্সেস মডেল দেখে ঠিক করুন।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমি একজন ছাত্র। এআই টুল নিতে চাই অ্যাসাইনমেন্টের জন্য। কোনটা সাজেস্ট করবেন?"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#25d366" }}
            >
              WhatsApp-এ বর্তমান অপশন জিজ্ঞেস করুন
            </a>
          </motion.div>
        </section>

        {/* কীভাবে সাহায্য করে */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">AI কীভাবে আপনার পড়াশোনায় সহায়তা করতে পারে?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                task: "অ্যাসাইনমেন্টের খসড়া",
                tools: "ChatGPT Plus, Claude Pro",
                help: "থিসিস, ইস্যু এনালাইসিস ও রিসার্চ পেপারের স্ট্রাকচার তৈরি করুন। জমা দেওয়ার আগে তথ্য, সোর্স ও ভাষা নিজে যাচাই করুন।",
              },
              {
                task: "ইংরেজি উন্নত করুন",
                tools: "Grammarly, QuillBot",
                help: "ইমেইল, থিসিস ও সিভির ব্যাকরণ এবং স্টাইল পর্যালোচনায় সহায়তা নিন। চূড়ান্ত লেখা নিজে পড়ে নিন।",
              },
              {
                task: "কোডিং প্রজেক্ট",
                tools: "GitHub Copilot, Claude Pro",
                help: "কোডের খসড়া, ডিবাগিং, অ্যালগরিদম ব্যাখ্যা ও রিভিউতে সহায়তা নিন। উৎপাদনে ব্যবহারের আগে কোড টেস্ট করুন।",
              },
              {
                task: "গবেষণা সাজান",
                tools: "Perplexity Pro, Claude Pro",
                help: "সোর্স খোঁজা, সারাংশ তৈরি ও গবেষণার প্রশ্ন সাজাতে AI ব্যবহার করুন। মূল সোর্স খুলে দাবিগুলো যাচাই করুন।",
              },
              {
                task: "এক্সাম প্রস্তুতি",
                tools: "ChatGPT Plus, Perplexity",
                help: "কঠিন কনসেপ্ট ধাপে ধাপে ব্যাখ্যা, অনুশীলনী প্রশ্ন ও রিভিশন প্ল্যান তৈরিতে সহায়তা নিন।",
              },
              {
                task: "প্রজেক্ট আইডিয়া",
                tools: "Claude Pro, Midjourney",
                help: "আইডিয়া ব্রেইনস্টর্ম, কাঠামো ও ভিজ্যুয়াল কনসেপ্ট তৈরি করুন। মৌলিকতা ও কোর্সের নিয়ম নিজে নিশ্চিত করুন।",
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

        {/* প্যাকেজ */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">কিছু বর্তমান স্টুডেন্ট অপশন</h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto -mt-7 mb-10">
            নিচের দাম ক্যাটালগ থেকে আসে। পেমেন্টের আগে সঠিক প্ল্যান, সময়কাল, অ্যাক্সেস মডেল, বর্তমান availability, delivery ETA এবং প্রযোজ্য resolution terms নিশ্চিত করুন।
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "বাজেট অপশন",
                price: bnFrom("chatgpt-plus-bangladesh"),
                desc: "ChatGPT Plus Starter",
                features: ["অ্যাসাইনমেন্টের খসড়া", "গবেষণা সহায়তা", "কোড ডিবাগিং", "অর্ডার-নির্দিষ্ট ETA আগে নিশ্চিত করুন"],
              },
              {
                name: "রিসার্চ অপশন",
                price: bnTaka(tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0),
                desc: "Claude Pro Premium",
                features: ["দীর্ঘ ডকুমেন্ট বিশ্লেষণ", "জটিল সমস্যা ব্যাখ্যা", "থিসিসের কাঠামো", "অ্যাক্সেস ও resolution terms আগে নিশ্চিত করুন"],
                recommended: true,
              },
              {
                name: "রিসার্চ কম্বো",
                price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("perplexity-pro-bangladesh") ?? 0)),
                desc: "Claude Pro + Perplexity",
                features: ["একাধিক workflow", "সোর্স যাচাইয়ে সহায়তা", "রিসার্চ সংগঠন", "দুই প্ল্যানের availability আগে নিশ্চিত করুন"],
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
                  <div className="text-xs font-bold text-yellow-400 mb-2">রিসার্চ-কেন্দ্রিক অপশন</div>
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
                  href={`https://wa.me/8801865385348?text=আমি ছাত্র। ${pkg.name} (${pkg.price}) সম্পর্কে বর্তমান availability, access model ও terms জানতে চাই।`}
                  className="w-full py-2 rounded-lg font-bold text-center transition-all hover:scale-105"
                  style={{
                    backgroundColor: pkg.recommended ? "#f4b942" : "#374151",
                    color: pkg.recommended ? "#000" : "#fff",
                  }}
                >
                  অর্ডারের তথ্য নিশ্চিত করুন
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">ছাত্রছাত্রীদের জন্য ব্যবহারিক টিপস</h2>
          <div className="space-y-4">
            {[
              "AI-কে আপনার বিষয় ও স্তর বলে দিন, কিন্তু গুরুত্বপূর্ণ তথ্য ও উদ্ধৃতি মূল সোর্সে যাচাই করুন।",
              "রিসার্চে AI যে সোর্স দেখায়, জমা দেওয়ার আগে মূল পেপার বা প্রকাশনা খুলে মিলিয়ে নিন।",
              "প্রথম ড্রাফট শেষ হলে AI দিয়ে রিভিউ করাতে পারেন; চূড়ান্ত সিদ্ধান্ত ও সম্পাদনা নিজের রাখুন।",
              "কোডিং সহায়কের সাজেশন সরাসরি জমা বা deploy না করে test, lint ও review করুন।",
              "আপনার স্কুল, কলেজ বা বিশ্ববিদ্যালয়ের academic-integrity এবং AI-use policy মেনে চলুন।",
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
            <h2 className="text-3xl font-bold text-white mb-4">আপনার বাজেট ও কাজ অনুযায়ী বর্তমান অপশন দেখুন</h2>
            <p className="text-gray-300 mb-8">
              পেমেন্টের আগে সঠিক দাম, অ্যাক্সেস মডেল, availability, delivery ETA এবং প্রযোজ্য terms নিশ্চিত করুন।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমি ছাত্র। আমার কাজ ও বাজেট অনুযায়ী বর্তমান AI টুল অপশন জানতে চাই।"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-black text-lg transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#25d366" }}
            >
              WhatsApp-এ অপশন যাচাই করুন →
            </a>
          </div>
        </section>
      </main>

      <FloatingWhatsApp />
    </div>
  );
}