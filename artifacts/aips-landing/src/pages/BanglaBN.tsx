import { useEffect } from "react";
import { MIN_PRICE, TOTAL_PRODUCTS } from "@/lib/catalogStats";
import { Navbar } from "@/components/Navbar";
import { SEOHead } from "@/components/SEOHead";
import { ORG_SCHEMA, WEBSITE_SCHEMA, breadcrumbSchema } from "@/utils/schemas";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FAQSection } from "@/components/FAQSection";
import { motion } from "framer-motion";

export default function BanglaBN() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const FAQS_BN = [
    {
      question: "শেয়ার্ড অ্যাকাউন্ট নিরাপদ?",
      answer: "হ্যাঁ। আপনি সম্পূর্ণ প্রিমিয়াম ফিচার পাবেন। তবে ২–৭ জন একটি সাবস্ক্রিপশন শেয়ার করে। সম্পূর্ণ প্রাইভেসির জন্য পার্সোনাল অ্যাকাউন্ট নিন।",
    },
    {
      question: "ডেলিভারি কত দ্রুত?",
      answer: "শেয়ার্ড: ৫–৩০ মিনিট। পার্সোনাল: ২–৪ ঘন্টা। bKash/Nagad-এ পেমেন্ট নিশ্চিত হওয়ার পর থেকে সময় গণনা শুরু।",
    },
    {
      question: "কী কী পেমেন্ট অপশন আছে?",
      answer: "bKash, Nagad, Rocket, ব্যাংক ট্রান্সফার, এবং Binance। আন্তর্জাতিক ক্রেডিট কার্ডের দরকার নেই।",
    },
    {
      question: "রিফান্ড পলিসি কী?",
      answer: "ডেলিভারির ১৫ মিনিটের মধ্যে রিফান্ড পাবেন যদি সেবায় সমস্যা থাকে। টুল এবং সাবস্ক্রিপশন ফি রিফান্ডযোগ্য নয়।",
    },
    {
      question: "এটা সত্যিকার সাবস্ক্রিপশন?",
      answer: "হ্যাঁ। আমরা বৈধ সাবস্ক্রিপশন দিই (হ্যাক্ড নয়)। শেয়ার্ড প্ল্যান মানে ২–৭ জন ব্যবহারকারী একটি লিজিটিমেট সাবস্ক্রিপশন শেয়ার করে। প্রতিটি অর্ডারে ৩০ দিনের ওয়ারেন্টি।",
    },
    {
      question: "আমি নতুন — কোনটা দিয়ে শুরু করব?",
      answer: "ChatGPT Plus Starter Shared দিয়ে শুরু করুন (৳499/মাস)। এটা আমাদের সবচেয়ে জনপ্রিয় প্ল্যান — লেখা, কোডিং, গবেষণা সব হয়। সন্দেহ হলে WhatsApp-এ বলুন, ২ মিনিটে সঠিক টুল সাজেস্ট করব।",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title={`AI প্রিমিয়াম শপ — ৮৭টি AI টুল বাংলাদেশে | bKash/Nagad পেমেন্ট`}
        description={`ChatGPT, Claude, Midjourney, Copilot, DeepSeek সহ সকল AI টুল বাংলাদেশে। bKash/Nagad পেমেন্ট, ৫-৩০ মিনিটে ডেলিভারি। ৳${MIN_PRICE}/মাস থেকে শুরু।`}
        canonical="https://aipremiumshop.com/bn"
        jsonLd={[
          ORG_SCHEMA,
          WEBSITE_SCHEMA,
          breadcrumbSchema([{ name: "বাংলা" }, { name: "হোম" }]),
        ]}
      />

      <Navbar />

      <main>
        {/* HERO */}
        <section className="min-h-screen flex items-center justify-center py-20" style={{ backgroundColor: "#0a0e27" }}>
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                AI টুলস বাংলাদেশে সবচেয়ে সাশ্রয়ী দামে
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                {TOTAL_PRODUCTS}টি প্রিমিয়াম AI সেবা — ChatGPT, Claude, Midjourney, Copilot এবং আরও অনেক কিছু।<br />
                bKash/Nagad পেমেন্ট। ৫–৩০ মিনিটে ডেলিভারি।
              </p>
              <p className="text-lg text-gray-400 mb-8">
                মাত্র ৳{MIN_PRICE} থেকে শুরু করুন। কোনো আন্তর্জাতিক কার্ডের দরকার নেই।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/8801865385348?text=আমি AI টুল নিতে আগ্রহী। কী কী অপশন আছে?"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: "#25d366" }}
                >
                  WhatsApp-এ অর্ডার করুন
                </a>
                <a
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold border-2 transition-all duration-200 hover:scale-105"
                  style={{ borderColor: "#f4b942", color: "#f4b942" }}
                >
                  সব AI টুল দেখুন
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
            >
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <div className="text-2xl font-bold text-white">{TOTAL_PRODUCTS}</div>
                <div className="text-sm text-gray-400">প্রিমিয়াম টুলস</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <div className="text-2xl font-bold text-white">৫-৩০</div>
                <div className="text-sm text-gray-400">মিনিট ডেলিভারি</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <div className="text-2xl font-bold text-white">৳{MIN_PRICE}</div>
                <div className="text-sm text-gray-400">থেকে শুরু</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* কীভাবে কাজ করে */}
        <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">কীভাবে কাজ করে?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "১", title: "টুল খুঁজুন", desc: "আমাদের {TOTAL_PRODUCTS}টি AI টুল থেকে আপনার পছন্দের টুল বেছে নিন।" },
              { num: "২", title: "WhatsApp করুন", desc: "আমাদের WhatsApp নম্বরে মেসেজ করুন আপনার পছন্দের টুল নিয়ে।" },
              { num: "३", title: "পেমেন্ট করুন", desc: "bKash, Nagad বা ব্যাংক ট্রান্সফারে পেমেন্ট করুন (কার্ডের দরকার নেই)।" },
              { num: "४", title: "পাবেন আইডি", desc: "৫–৩০ মিনিটের মধ্যে আপনার লগইন আইডি পাবেন। সাথে ৩০ দিনের ওয়ারেন্টি।" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 rounded-xl p-6 border border-gray-800"
              >
                <div className="text-4xl font-bold text-yellow-400 mb-3">{step.num}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* পেমেন্ট মেথড */}
        <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">পেমেন্ট মেথড — সব স্থানীয় অপশন</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {["bKash", "Nagad", "Rocket", "ব্যাংক ট্রান্সফার", "Binance"].map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 text-center hover:border-yellow-400 transition-all"
              >
                <div className="text-2xl mb-2">{"🏦📱💰💳💎"[i]}</div>
                <div className="font-bold text-white">{method}</div>
                <div className="text-xs text-gray-400 mt-2">তাৎক্ষণিক</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <div className="scroll-reveal">
          <FAQSection items={FAQS_BN} title="প্রায়শ জিজ্ঞাসিত প্রশ্ন" />
        </div>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
          <div
            className="rounded-2xl p-12 text-center border"
            style={{
              background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
              borderColor: "rgba(244, 185, 66, 0.2)",
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">এখনই শুরু করুন</h2>
            <p className="text-gray-300 mb-8 text-lg">
              ৳{MIN_PRICE} থেকে শুরু করুন। কোনো লুকানো খরচ নেই।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমি AI টুল নিতে আগ্রহী। ৳299 থেকে কোনটা পাওয়া যায়?"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-black text-lg transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#25d366" }}
            >
              WhatsApp-এ মেসেজ করুন →
            </a>
          </div>
        </section>
      </main>

      <FloatingWhatsApp />
    </div>
  );
}
