import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { bnFrom, bnTaka, priceOf } from "@/lib/banglaPricing";
import { tierPrice } from "@/lib/catalogStats";
import { CheckCircle } from "lucide-react";

export default function EducatorsBangla() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title="শিক্ষক এবং শিক্ষা প্রতিষ্ঠানের জন্য AI সমাধান — পাঠ পরিকল্পনা, মূল্যায়ন, শিক্ষার্থী সহায়তা"
        description="শিক্ষাকে AI দিয়ে সহজ করুন। পাঠ পরিকল্পনা, প্রশ্ন তৈরি, শিক্ষার্থী প্রতিক্রিয়া স্বয়ংক্রিয়। বাংলাদেশে ৳499 থেকে।"
        canonical="https://aipremiumshop.com/educators-bn"
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
              শিক্ষকদের জন্য AI — পাঠ প্রস্তুতি ৮০% দ্রুততর করুন
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              ChatGPT, Claude দিয়ে পাঠ পরিকল্পনা, মূল্যায়ন উপকরণ, শিক্ষার্থী প্রতিক্রিয়া তৈরি করুন। প্রতিটি ছাত্রকে ব্যক্তিগত মনোযোগ দিতে পারবেন।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমি একজন শিক্ষক। পাঠ প্রস্তুতিতে AI চাই। সাহায্য করবেন?"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#25d366" }}
            >
              WhatsApp করুন
            </a>
          </motion.div>
        </section>

        {/* AI সাহায্য */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">শিক্ষায় AI কীভাবে সাহায্য করে?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                task: "পাঠ পরিকল্পনা তৈরি করুন",
                tools: "ChatGPT Plus, Claude Pro",
                help: "ইউনিট পরিকল্পনা, সাপ্তাহিক পাঠ, উদ্দেশ্য সব লিখিয়ে নিন AI-কে। শুধু পর্যালোচনা করুন এবং কাস্টমাইজ করুন।",
              },
              {
                task: "মূল্যায়ন প্রশ্ন তৈরি করুন",
                tools: "ChatGPT Plus, Claude Pro",
                help: "কুইজ, পরীক্ষা, অ্যাসাইনমেন্ট প্রশ্ন মিনিটে তৈরি করুন। কঠিনতার স্তর নির্দিষ্ট করুন, AI তৈরি করবে।",
              },
              {
                task: "শিক্ষার্থী সহায়তা ব্যক্তিগতকৃত করুন",
                tools: "Claude Pro, Perplexity",
                help: "প্রতিটি ছাত্রের দুর্বলতা চিহ্নিত করুন। ব্যক্তিগত শেখার পথ তৈরি করুন। AI প্রতিটি শিক্ষার্থীকে ব্যক্তিগত কোচিং দেবে।",
              },
              {
                task: "প্রতিক্রিয়া দ্রুত দিন",
                tools: "ChatGPT Plus, Claude Pro",
                help: "১০০টি অ্যাসাইনমেন্টের উপর মন্তব্য লিখিয়ে নিন। প্রতিটি শিক্ষার্থী বিস্তারিত প্রতিক্রিয়া পাবে।",
              },
              {
                task: "সম্পদ ও উপকরণ তৈরি করুন",
                tools: "ChatGPT Plus, Claude Pro",
                help: "পাঠ স্লাইড, হ্যান্ডআউট, কার্যকলাপ সব তৈরি করুন। বিভিন্ন শেখার শৈলীর জন্য সংস্করণ তৈরি করুন।",
              },
              {
                task: "পরীক্ষার কাগজ ডিজাইন করুন",
                tools: "ChatGPT Plus",
                help: "শেখার উদ্দেশ্যের সাথে সংযুক্ত পরীক্ষা তৈরি করুন। একাধিক সংস্করণ তৈরি করুন একই বিষয়বস্তুর জন্য।",
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
          <h2 className="text-3xl font-bold text-center mb-12">শিক্ষকদের জন্য সেরা প্যাকেজ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "নতুন শিক্ষক",
                price: bnFrom("chatgpt-plus-bangladesh"),
                desc: "ChatGPT Plus",
                features: ["পাঠ পরিকল্পনা", "প্রশ্ন তৈরি", "কন্টেন্ট ধারণা", "মৌলিক সহায়তা"],
              },
              {
                name: "অভিজ্ঞ শিক্ষক",
                price: bnTaka(tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0),
                desc: "Claude Pro Premium",
                features: ["উন্নত পাঠ ডিজাইন", "ব্যক্তিগত প্রতিক্রিয়া", "মূল্যায়ন সরঞ্জাম", "পরীক্ষা ডিজাইন"],
                recommended: true,
              },
              {
                name: "প্রতিষ্ঠান / বিভাগ",
                price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("chatgpt-plus-bangladesh") ?? 0) + (priceOf("grammarly-premium-bangladesh") ?? 0)),
                desc: "Claude Pro + ChatGPT + Grammarly",
                features: ["দলের জন্য অ্যাক্সেস", "পাঠ্যক্রম পরিকল্পনা", "মান নিয়ন্ত্রণ", "সম্পূর্ণ সহায়তা"],
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
                  <div className="text-xs font-bold text-yellow-400 mb-2">বেশিরভাগ শিক্ষক নির্বাচন করেন ⭐</div>
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
                  href={`https://wa.me/8801865385348?text=আমি শিক্ষক। ${pkg.name} (${pkg.price}) নিতে আগ্রহী।`}
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
          <h2 className="text-3xl font-bold text-center mb-12">শিক্ষকদের জন্য প্রো টিপস</h2>
          <div className="space-y-4">
            {[
              "পাঠ পরিকল্পনা টেমপ্লেট সংরক্ষণ করুন: একবার তৈরি করুন, আগামী বছর পরিবর্তন করুন। সময় বাঁচান, উদ্ভাবনে ফোকাস করুন।",
              "প্রতিটি শিক্ষার্থীর জন্য ব্যক্তিগত প্রশ্নপত্র তৈরি করুন: একই বিষয়বস্তু, একই স্তর, আলাদা প্রশ্ন। সাংহারা প্রতিরোধ করুন।",
              "শিক্ষার্থী প্রতিক্রিয়া স্বয়ংক্রিয় করুন: সাধারণ প্রতিক্রিয়া AI দিক, আপনি ব্যক্তিগত মন্তব্য যোগ করুন।",
              "শেখার সম্পদ বৈচিত্র্যময় করুন: AI ভিডিও স্ক্রিপ্ট, ইন্টারেক্টিভ প্রশ্নাবলী, কেস স্টাডি তৈরি করে। সব শৈলীর শিক্ষার্থী অন্তর্ভুক্ত করুন।",
              "পাঠ্যক্রম সারিবদ্ধতা পরীক্ষা করুন: প্রতিটি পাঠ এবং মূল্যায়ন শেখার উদ্দেশ্যের সাথে সংযুক্ত নিশ্চিত করুন।",
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
              এই সেমিস্টারে পাঠ প্রস্তুতি সময় অর্ধেক করুন। শিক্ষার্থীদের সাথে আরও সময় ব্যয় করুন।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমি শিক্ষক। পাঠ প্রস্তুতি এবং মূল্যায়নে AI চাই। সাহায্য করুন।"
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
