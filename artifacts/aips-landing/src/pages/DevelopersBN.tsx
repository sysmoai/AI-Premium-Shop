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
        title="ডেভেলপারদের জন্য AI টুলস — কোড, ডিবাগিং ও ডকুমেন্টেশন"
        description="GitHub Copilot, Claude ও Cursorসহ ডেভেলপার AI টুল বাছাই করুন। বর্তমান AIPS দাম, অ্যাক্সেস মডেল, availability ও অর্ডার-নির্দিষ্ট terms আগে নিশ্চিত করুন।"
        canonical="https://aipremiumshop.com/developers-bn"
        lang="bn-BD"
        jsonLd={[ORG_SCHEMA, WEBSITE_SCHEMA]}
        hreflang={{ "bn-BD": "/developers-bn", "en-BD": "/best-ai-for-developers" }}
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
              ডেভেলপারদের জন্য AI — কোডিং workflow-এ সহায়তা নিন
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              GitHub Copilot, Claude ও Cursor দিয়ে কোডের খসড়া, ডিবাগিং, রিফ্যাক্টরিং ও ডকুমেন্টেশনে সহায়তা নিন। উৎপাদনে ব্যবহারের আগে AI output test ও review করুন।
            </p>
            <a
              href="https://wa.me/8801865385348?text=আমি ডেভেলপার। GitHub Copilot বা Claude Pro-এর বর্তমান দাম, access model ও availability জানতে চাই।"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#25d366" }}
            >
              WhatsApp-এ বর্তমান অপশন জিজ্ঞেস করুন
            </a>
          </motion.div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">কোডিংয়ে AI কোথায় কাজে লাগতে পারে</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "বয়লারপ্লেট কোড", desc: "API stub, database schema ও default config-এর খসড়া তৈরি করে manual typing কমাতে পারেন।" },
              { title: "ডিবাগিং সহায়তা", desc: "Error message ও relevant code context দিয়ে সম্ভাব্য কারণ ও fix-এর ধারণা নিন। প্রস্তাবিত পরিবর্তন test করুন।" },
              { title: "রিফ্যাক্টরিং", desc: "পুরনো কোডের বিকল্প structure, readability ও performance improvement-এর প্রস্তাব নিন; আচরণ না বদলেছে তা test করুন।" },
              { title: "ডকুমেন্টেশন", desc: "README, API note ও code explanation-এর খসড়া তৈরি করুন এবং বাস্তব implementation-এর সঙ্গে মিলিয়ে নিন।" },
              { title: "টেস্ট কেস", desc: "Unit বা integration test-এর খসড়া নিন; edge case ও expected behavior নিজে নির্ধারণ করুন।" },
              { title: "কোড রিভিউ", desc: "Security, maintainability ও performance নিয়ে দ্বিতীয় মতামত নিন। AI review মানব review ও security testing-এর বিকল্প নয়।" },
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
          <h2 className="text-3xl font-bold text-center mb-4">ডেভেলপারদের জন্য কিছু বর্তমান টুল</h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">
            দাম ক্যাটালগ থেকে নেওয়া হয়। Provider-controlled feature, limit ও licensing বদলাতে পারে; পেমেন্টের আগে exact plan, access model, availability, delivery ETA ও terms নিশ্চিত করুন।
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "GitHub Copilot Pro", slug: "github-copilot-bangladesh", desc: "কোড completion ও developer workflow", fit: "IDE-কেন্দ্রিক coding সহায়তা" },
              { name: "Claude Pro", slug: "claude-pro-bangladesh", desc: "দীর্ঘ code context ও analysis", fit: "ব্যাখ্যা, review ও refactoring" },
              { name: "Cursor Pro", slug: "cursor-bangladesh", desc: "AI-কেন্দ্রিক code editor workflow", fit: "Editor-এর ভেতরে AI workflow" },
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
                  {tool.price ? `${tool.price} থেকে` : "WhatsApp-এ বর্তমান দাম জানুন"}
                </div>
                <p className="text-gray-300 mb-4">{tool.desc}</p>
                <div className="text-sm text-gray-400 mb-4">উপযোগী workflow: {tool.fit}</div>
                <a
                  href={`https://wa.me/8801865385348?text=${encodeURIComponent(`আমি ডেভেলপার। ${tool.name}-এর বর্তমান দাম, access model, availability ও terms জানতে চাই${tool.price ? `। ক্যাটালগে ${tool.price} থেকে দেখাচ্ছে` : ""}।`)}`}
                  className="w-full py-2 rounded-lg font-bold text-center text-black transition-all hover:scale-105"
                  style={{ backgroundColor: "#f4b942" }}
                >
                  অর্ডারের তথ্য নিশ্চিত করুন
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
          <div className="rounded-2xl p-12 text-center border" style={{ background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)", borderColor: "rgba(244, 185, 66, 0.2)" }}>
            <h2 className="text-3xl font-bold text-white mb-4">আপনার stack ও workflow অনুযায়ী AI টুল বাছাই করুন</h2>
            <p className="text-gray-300 mb-8">কেনার আগে exact plan, current AIPS price, access model, availability এবং provider-controlled limits যাচাই করুন।</p>
            <a
              href="https://wa.me/8801865385348?text=আমি ডেভেলপার। আমার stack অনুযায়ী বর্তমান AI টুল অপশন জানতে চাই।"
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