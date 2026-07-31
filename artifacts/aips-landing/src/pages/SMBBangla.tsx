import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ORG_SCHEMA, WEBSITE_SCHEMA, breadcrumbSchema } from "@/utils/schemas";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { bnFrom, bnTaka, priceOf } from "@/lib/banglaPricing";
import { tierPrice } from "@/lib/catalogStats";
import { CheckCircle } from "lucide-react";

export default function SMBBangla() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title="ছোট ব্যবসার জন্য সেরা AI সমাধান — অটোমেশন, স্কেলিং, কাস্টমার সার্ভিস"
        description="আপনার ছোট ব্যবসা স্বয়ংক্রিয় করুন AI দিয়ে। গ্রাহক সেবা, মার্কেটিং, বিক্রয় অটোমেশন। বাংলাদেশে ৳499 থেকে।"
        canonical="https://aipremiumshop.com/smb-bn"
        jsonLd={[ORG_SCHEMA, WEBSITE_SCHEMA, breadcrumbSchema([{ name: "হোম", href: "/bn" }, { name: "ছোট ব্যবসার জন্য AI" }])]}
        hreflang={{ bn: "/smb-bn", en: "/best-ai-for-business" }}
      />

      <Navbar />
      <Breadcrumb items={[{ name: "হোম", href: "/bn" }, { name: "ছোট ব্যবসার জন্য AI" }]} />

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
              ছোট ব্যবসার জন্য AI — গ্রাহক সেবা, মার্কেটিং ও বিক্রয়
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              ChatGPT, Claude, Zapier দিয়ে গ্রাহক সেবা, বিক্রয়, মার্কেটিং স্বয়ংক্রিয় করুন। আপনার ছোট দল বড় কোম্পানির মতো কাজ করতে পারবে।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমার ছোট ব্যবসা আছে। ব্যবসা বৃদ্ধিতে AI চাই। পরামর্শ দেবেন?"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#25d366" }}
            >
              WhatsApp করুন
            </a>
          </motion.div>
        </section>

        {/* AI সাহায্য */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">ব্যবসায় AI কীভাবে সাহায্য করে?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                task: "গ্রাহক সেবা স্বয়ংক্রিয় করুন",
                tools: "ChatGPT, Claude, Zapier",
                help: "২৪/৭ চ্যাটবট দিয়ে গ্রাহক প্রশ্নের উত্তর দিন। সহজ প্রশ্ন আইআই সামলায়, কঠিন প্রশ্ন দলে যায়। পুনরাবৃত্ত প্রশ্নগুলো AI সামলায়, দল জটিল কেসে মন দেয়।",
              },
              {
                task: "বিক্রয় ফানেল অপটিমাইজ করুন",
                tools: "ChatGPT Plus, Claude Pro",
                help: "ওয়েবসাইট ভিজিটরদের স্বয়ংক্রিয় অনুসরণ পাঠান। পার্সোনালাইজড প্রস্তাব, ছাড় অফার, ফলো-আপ সব AI করবে।",
              },
              {
                task: "সোশ্যাল মিডিয়া বিষয়বস্তু তৈরি করুন",
                tools: "ChatGPT Plus, Midjourney",
                help: "মাসের কন্টেন্ট ক্যালেন্ডার এক দিনে তৈরি করুন। পোস্ট, ছবি, ক্যাপশন সব AI তৈরি করবে। আপনি শুধু অনুমোদন করুন।",
              },
              {
                task: "ইমেইল মার্কেটিং স্কেল করুন",
                tools: "ChatGPT Plus, Zapier",
                help: "গ্রাহক বিভাগ অনুযায়ী স্বয়ংক্রিয় ইমেইল। নতুন গ্রাহক → স্বাগত ইমেইল। কোন ক্রয় নেই → পুনরায় নিয়োজন ইমেইল।",
              },
              {
                task: "রিপোর্ট এবং বিশ্লেষণ",
                tools: "Claude Pro, ChatGPT Plus",
                help: "বিক্রয়, লাভ, ট্রেন্ড বিশ্লেষণ করান AI-কে। পরবর্তী মাসের প্রবণতা পূর্বাভাস পান। ডেটা-চালিত সিদ্ধান্ত নিন।",
              },
              {
                task: "দলের উৎপাদনশীলতা বাড়ান",
                tools: "Claude Pro, GitHub Copilot",
                help: "দলের প্রতিটি সদস্যকে ব্যক্তিগত AI সহায়ক দিন। ডেটা প্রবেশ, নথি, বিশ্লেষণ দ্রুততর হবে।",
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
          <h2 className="text-3xl font-bold text-center mb-12">ছোট ব্যবসার জন্য সেরা প্যাকেজ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "স্টার্টআপ",
                price: bnFrom("chatgpt-plus-bangladesh"),
                desc: "ChatGPT Plus",
                features: ["গ্রাহক সেবা চ্যাট", "বিক্রয় ইমেইল", "কন্টেন্ট লেখা", "মৌলিক অটোমেশন"],
              },
              {
                name: "ব্যবসা বৃদ্ধি",
                price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("chatgpt-plus-bangladesh") ?? 0)),
                desc: "Claude Pro + ChatGPT Plus",
                features: ["উন্নত চ্যাটবট", "ডেটা বিশ্লেষণ", "মার্কেটিং অটোমেশন", "দলের জন্য বিশ্লেষণ"],
                recommended: true,
              },
              {
                name: "এন্টারপ্রাইজ",
                price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("chatgpt-plus-bangladesh") ?? 0) + (priceOf("notion-business-bangladesh") ?? 0)),
                desc: "Claude Pro + ChatGPT + Notion Business",
                features: ["সম্পূর্ণ অটোমেশন", "কাস্টম ওয়ার্কফ্লো", "উন্নত বিশ্লেষণ", "২৪/৭ সহায়তা"],
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
                  <div className="text-xs font-bold text-yellow-400 mb-2">সর্বোত্তম মূল্য ⭐</div>
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
                  href={`https://wa.me/8801865385348?text=আমার ব্যবসায় ${pkg.name} (${pkg.price}) লাগবে। সাহায্য করবেন?`}
                  className="w-full py-2 rounded-lg font-bold text-center transition-all hover:scale-105"
                  style={{
                    backgroundColor: pkg.recommended ? "#f4b942" : "#374151",
                    color: pkg.recommended ? "#000" : "#fff",
                  }}
                >
                  এখনই যোগাযোগ করুন
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* টিপস */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">ব্যবসায়ীদের জন্য প্রো টিপস</h2>
          <div className="space-y-4">
            {[
              "সোশ্যাল মিডিয়া ক্যালেন্ডার হবেন AI-এর সেরা বন্ধু: মাসের সব পোস্ট একদিনে, বাকি সময় গ্রাহক সম্পর্ক তৈরিতে ফোকাস করুন।",
              "চ্যাটবট দিয়ে ২৪/৭ গ্রাহক সেবা: রাত থাকুন না থাকুন, AI সবসময় উত্তর দেবে। জটিল প্রশ্ন শুধু দলের কাছে যাবে।",
              "ইমেইল অটোমেশন সেটআপ করুন: নতুন গ্রাহক তালিকা → স্বয়ংক্রিয় ইমেইল সিরিজ → বিক্রয় বৃদ্ধি। কাজ নেই, আয় আছে।",
              "প্রতি সপ্তাহে বিক্রয় রিপোর্ট তৈরি করান AI-কে: কি কাজ করছে, কি করছে না, পরবর্তী সপ্তাহে কি করবেন।",
              "দলের সাথে AI শেয়ার করুন: প্রতিটি সদস্য ব্যক্তিগত সহায়ক পাবে। কেউ কেউ নিজেই লাভ বুঝতে পারবেন।",
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
            <h2 className="text-3xl font-bold text-white mb-4">{`আজই শুরু করুন — ${bnFrom("chatgpt-plus-bangladesh")} থেকে`}</h2>
            <p className="text-gray-300 mb-8">
              পুনরাবৃত্তিমূলক কাজ AI-কে দিন, দলকে গ্রাহকের জন্য রাখুন।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমার ছোট ব্যবসা আছে। গ্রাহক সেবা এবং অটোমেশনে AI চাই। সাহায্য করুন।"
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
