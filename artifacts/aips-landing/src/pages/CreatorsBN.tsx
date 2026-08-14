import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ORG_SCHEMA, WEBSITE_SCHEMA } from "@/utils/schemas";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { bnFrom, bnTaka, priceOf } from "@/lib/banglaPricing";
import { tierPrice } from "@/lib/catalogStats";
import { CheckCircle } from "lucide-react";

const creatorUses = [
  { task: "ভিডিও স্ক্রিপ্ট", tools: "ChatGPT, Claude", help: "Hook, outline, scene idea ও CTA-এর খসড়া তৈরি করুন। প্রকাশের আগে fact, brand voice ও platform policy নিজে যাচাই করুন।" },
  { task: "থাম্বনেইল ও ভিজ্যুয়াল", tools: "Midjourney, Ideogram, Canva", help: "Visual concept ও variation তৈরি করুন। Trademark, likeness, copyright ও commercial-use rights আলাদাভাবে যাচাই করুন।" },
  { task: "Short-form ভিডিও", tools: "Runway ও অন্যান্য video AI", help: "Storyboard, shot concept ও generated clip workflow পরীক্ষা করুন। Credit, duration, export ও model availability provider-controlled।" },
  { task: "ভয়েস ও ন্যারেশন", tools: "ElevenLabs, Murf", help: "Voice generation বা narration workflow ব্যবহার করুন। নিজের নয় এমন কণ্ঠ বা পরিচয় ব্যবহারে consent ও provider rules মেনে চলুন।" },
  { task: "ক্যাপশন ও repurposing", tools: "ChatGPT, Claude", help: "একটি long-form idea থেকে caption, summary ও platform-specific draft তৈরি করুন; final copy নিজে edit করুন।" },
  { task: "এডিটিং সহায়তা", tools: "Descript, Runway", help: "Transcript, rough cut, subtitle ও edit suggestion-এর মতো workflow ব্যবহার করুন। Exact feature ও limit plan অনুযায়ী বদলাতে পারে।" },
];

export default function CreatorsBN() {
  const packages = [
    { name: "স্ক্রিপ্ট অপশন", price: bnFrom("chatgpt-plus-bangladesh"), desc: "ChatGPT Plus", features: ["Script ও outline", "Idea exploration", "Caption draft", "Exact access model আগে নিশ্চিত করুন"] },
    { name: "টেক্সট + ইমেজ অপশন", price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("midjourney-bangladesh") ?? 0)), desc: "Claude Pro + Midjourney", features: ["Long-form draft", "Visual concept", "Prompt iteration", "দুই plan-এর availability আগে নিশ্চিত করুন"], featured: true },
    { name: "মাল্টি-ফরম্যাট অপশন", price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("midjourney-bangladesh") ?? 0) + (priceOf("runway-bangladesh") ?? 0)), desc: "Claude + Midjourney + Runway", features: ["Text workflow", "Image workflow", "Video workflow", "Provider credits ও limits আগে যাচাই করুন"] },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title="কন্টেন্ট ক্রিয়েটরদের জন্য AI — ভিডিও, লেখা ও ডিজাইন টুল"
        description="ক্রিয়েটরদের জন্য ChatGPT, Claude, Midjourney ও Runwayসহ AI টুল বাছাই করুন। বর্তমান AIPS দাম, access model, availability ও provider limits আগে যাচাই করুন।"
        canonical="https://aipremiumshop.com/creators-bn"
        lang="bn-BD"
        jsonLd={[ORG_SCHEMA, WEBSITE_SCHEMA]}
        hreflang={{ "bn-BD": "/creators-bn", "en-BD": "/best-ai-for-creators" }}
      />
      <Navbar />
      <Breadcrumb items={[{ name: "হোম", href: "/bn" }, { name: "ক্রিয়েটরদের জন্য AI" }]} />

      <main>
        <section className="py-20 px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">ক্রিয়েটরদের জন্য AI — আইডিয়া থেকে প্রকাশনা workflow</h1>
            <p className="text-xl text-gray-300 mb-8">Script, visual concept, voice, editing ও repurposing-এ AI সহায়তা নিন। কোনো tool-ই view, growth, income বা নির্দিষ্ট production time নিশ্চিত করে না।</p>
            <a href="https://wa.me/8801865385348?text=আমি কন্টেন্ট ক্রিয়েটর। আমার workflow অনুযায়ী বর্তমান AI tool, price, access model ও availability জানতে চাই।" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black transition-all duration-200 hover:scale-105" style={{ backgroundColor: "#25d366" }}>
              WhatsApp-এ বর্তমান অপশন জিজ্ঞেস করুন
            </a>
          </motion.div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-4">কন্টেন্ট workflow-এ AI কোথায় ব্যবহার করতে পারেন</h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">Feature, model, credit, export, licensing ও availability provider-controlled। Exact plan কেনার আগে current provider terms ও AIPS order details নিশ্চিত করুন।</p>
          <div className="grid md:grid-cols-2 gap-8">
            {creatorUses.map((item) => (
              <motion.div key={item.task} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-2">{item.task}</h3>
                <div className="text-sm text-yellow-400 mb-3">উদাহরণ টুল: {item.tools}</div>
                <p className="text-gray-300">{item.help}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-4">কিছু বর্তমান creator option</h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">দাম catalog-derived। Bundle যোগফল মানেই discount বা savings নয়। প্রতিটি plan-এর availability, access model, delivery ETA ও resolution terms order-এর আগে নিশ্চিত করুন।</p>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`rounded-xl p-6 border ${pkg.featured ? "bg-gradient-to-br from-yellow-900/40 to-gray-900 border-yellow-400" : "bg-gray-900/50 border-gray-800"}`}>
                {pkg.featured && <div className="text-xs font-bold text-yellow-400 mb-2">টেক্সট + ইমেজ workflow</div>}
                <h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-yellow-400 mb-1">{pkg.price}</div>
                <div className="text-sm text-gray-400 mb-4">{pkg.desc}</div>
                <ul className="space-y-2 mb-6">{pkg.features.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />{f}</li>)}</ul>
                <a href={`https://wa.me/8801865385348?text=${encodeURIComponent(`আমি creator। ${pkg.name} সম্পর্কে current price, access model, availability, delivery ETA ও terms জানতে চাই।`)}`} className="w-full py-2 rounded-lg font-bold text-center transition-all hover:scale-105" style={{ backgroundColor: pkg.featured ? "#f4b942" : "#374151", color: pkg.featured ? "#000" : "#fff" }}>
                  অর্ডারের তথ্য নিশ্চিত করুন
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">ক্রিয়েটরদের জন্য verification checklist</h2>
          <div className="space-y-4">
            {["Generated claim বা statistic publish করার আগে source যাচাই করুন।", "Image, music, voice ও likeness ব্যবহারে provider license, consent এবং platform policy দেখুন।", "Shared access label-কে privacy guarantee ধরে নেবেন না; exact arrangement নিশ্চিত করুন।", "Credit-based tool-এ একটি কাজ কত credit খরচ করে তা model ও settings অনুযায়ী বদলাতে পারে।", "AI output-কে final creative judgment-এর বিকল্প না ধরে draft ও iteration tool হিসেবে ব্যবহার করুন।"].map((tip) => (
              <div key={tip} className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-yellow-400"><p className="text-gray-200">✓ {tip}</p></div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
          <div className="rounded-2xl p-12 text-center border" style={{ background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)", borderColor: "rgba(244, 185, 66, 0.2)" }}>
            <h2 className="text-3xl font-bold text-white mb-4">আপনার content workflow অনুযায়ী tool stack যাচাই করুন</h2>
            <p className="text-gray-300 mb-8">Exact product, plan, price, access model, availability, delivery ETA এবং applicable terms পেমেন্টের আগে নিশ্চিত করুন।</p>
            <a href="https://wa.me/8801865385348?text=আমি creator। আমার workflow-এর জন্য বর্তমান tool stack ও order terms জানতে চাই।" className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-black text-lg transition-all duration-200 hover:scale-105" style={{ backgroundColor: "#25d366" }}>
              WhatsApp-এ যাচাই করুন →
            </a>
          </div>
        </section>
      </main>
      <FloatingWhatsApp />
    </div>
  );
}