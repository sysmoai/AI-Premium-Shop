import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ORG_SCHEMA, WEBSITE_SCHEMA } from "@/utils/schemas";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { bnFrom, bnTaka, priceOf } from "@/lib/banglaPricing";
import { tierPrice } from "@/lib/catalogStats";
import { CheckCircle } from "lucide-react";

const useCases = [
  { task: "Proposal draft", tools: "ChatGPT, Claude", help: "Client brief থেকে proposal-এর কাঠামো ও প্রথম draft তৈরি করুন। জয়, response বা client পাওয়ার নিশ্চয়তা ধরে নেবেন না; প্রতিটি proposal নিজের অভিজ্ঞতা ও scope অনুযায়ী edit করুন।" },
  { task: "Writing workflow", tools: "ChatGPT, Grammarly", help: "Blog, email ও social copy-এর draft, edit ও quality checklist তৈরি করুন। Client fact, brand voice এবং originality নিজে যাচাই করুন।" },
  { task: "Design concept", tools: "Midjourney, Ideogram", help: "Moodboard, concept ও visual variation তৈরি করুন। Commercial-use rights, trademark, likeness ও client requirements আলাদাভাবে যাচাই করুন।" },
  { task: "Coding assistance", tools: "GitHub Copilot, Claude", help: "Boilerplate, debugging idea, refactor ও test draft নিন। Client delivery-এর আগে code test, security review ও manual verification করুন।" },
  { task: "Video workflow", tools: "Runway, HeyGen", help: "Storyboard, generated clip ও avatar workflow পরীক্ষা করুন। Credits, export, duration, model availability ও licensing provider-controlled।" },
  { task: "Research", tools: "Perplexity, Claude", help: "Source discovery ও synthesis-এ সাহায্য নিন। AI-generated citation বা claim মূল source খুলে যাচাই না করে client deliverable-এ ব্যবহার করবেন না।" },
];

export default function FreelancersBN() {
  const packages = [
    { name: "টেক্সট স্টার্টার", price: bnFrom("chatgpt-plus-bangladesh"), desc: "ChatGPT Plus", features: ["Draft ও proposal workflow", "Writing assistance", "Basic coding help", "Exact access model আগে নিশ্চিত করুন"] },
    { name: "রিসার্চ ও কোড অপশন", price: bnTaka(tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0), desc: "Claude Pro Premium", features: ["Long-context analysis", "Code review assistance", "Document workflow", "Availability ও terms আগে নিশ্চিত করুন"], featured: true },
    { name: "টেক্সট + ভিজ্যুয়াল অপশন", price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("midjourney-bangladesh") ?? 0)), desc: "Claude Pro + Midjourney", features: ["Text workflow", "Visual concept", "Multi-format ideation", "দুই plan-এর limits আগে যাচাই করুন"] },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title="ফ্রিল্যান্সারদের জন্য AI টুলস — Proposal, Research ও Delivery"
        description="ফ্রিল্যান্সারদের জন্য ChatGPT, Claude, Midjourneyসহ AI workflow গাইড। বর্তমান AIPS দাম, access model, availability, delivery ETA ও terms আগে নিশ্চিত করুন।"
        canonical="https://aipremiumshop.com/freelancers-bn"
        lang="bn-BD"
        jsonLd={[ORG_SCHEMA, WEBSITE_SCHEMA]}
        hreflang={{ "bn-BD": "/freelancers-bn", "en-BD": "/best-ai-for-freelancers" }}
      />
      <Navbar />
      <Breadcrumb items={[{ name: "হোম", href: "/bn" }, { name: "ফ্রিল্যান্সারদের জন্য AI" }]} />

      <main>
        <section className="py-20 px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">ফ্রিল্যান্সারদের জন্য AI — proposal থেকে delivery workflow</h1>
            <p className="text-xl text-gray-300 mb-8">AI proposal, research, writing, coding ও creative workflow-এ সহায়তা করতে পারে। কাজ পাওয়া, income, client response বা নির্দিষ্ট delivery time কোনো tool বা AIPS guarantee করে না।</p>
            <a href="https://wa.me/8801865385348?text=আমি freelancer। আমার কাজ অনুযায়ী current AI tool, price, access model ও availability জানতে চাই।" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black transition-all duration-200 hover:scale-105" style={{ backgroundColor: "#25d366" }}>
              WhatsApp-এ বর্তমান অপশন জিজ্ঞেস করুন
            </a>
          </motion.div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-4">ফ্রিল্যান্স workflow-এ AI কোথায় ব্যবহার করবেন</h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">AI output client-ready ধরে নেবেন না। Scope, facts, citations, code, rights এবং platform/client policy অনুযায়ী final review আপনার দায়িত্ব।</p>
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((item) => (
              <motion.div key={item.task} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-2">{item.task}</h3>
                <div className="text-sm text-yellow-400 mb-3">উদাহরণ টুল: {item.tools}</div>
                <p className="text-gray-300">{item.help}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-4">কিছু বর্তমান freelancer option</h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">দাম catalog-derived। Combined price মানেই discount নয়। Exact product, plan, access model, availability, delivery ETA এবং resolution terms পেমেন্টের আগে নিশ্চিত করুন।</p>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`rounded-xl p-6 border ${pkg.featured ? "bg-gradient-to-br from-yellow-900/40 to-gray-900 border-yellow-400" : "bg-gray-900/50 border-gray-800"}`}>
                {pkg.featured && <div className="text-xs font-bold text-yellow-400 mb-2">Long-context workflow</div>}
                <h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-yellow-400 mb-1">{pkg.price}</div>
                <div className="text-sm text-gray-400 mb-4">{pkg.desc}</div>
                <ul className="space-y-2 mb-6">{pkg.features.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />{f}</li>)}</ul>
                <a href={`https://wa.me/8801865385348?text=${encodeURIComponent(`আমি freelancer। ${pkg.name} সম্পর্কে current price, access model, availability, delivery ETA ও terms জানতে চাই।`)}`} className="w-full py-2 rounded-lg font-bold text-center transition-all hover:scale-105" style={{ backgroundColor: pkg.featured ? "#f4b942" : "#374151", color: pkg.featured ? "#000" : "#fff" }}>
                  অর্ডারের তথ্য নিশ্চিত করুন
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Client delivery checklist</h2>
          <div className="space-y-4">
            {["Proposal-এ fabricated experience, metric বা case study যোগ হতে দেবেন না।", "Research citation মূল source-এ যাচাই করুন।", "Code test, lint, security review ও backup ছাড়া deploy করবেন না।", "Generated image, audio, video ও likeness-এর rights এবং client brief মিলিয়ে নিন।", "Shared access হলে sensitive client data দেওয়ার আগে exact privacy arrangement নিশ্চিত করুন।"].map((tip) => <div key={tip} className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-yellow-400"><p className="text-gray-200">✓ {tip}</p></div>)}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
          <div className="rounded-2xl p-12 text-center border" style={{ background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)", borderColor: "rgba(244, 185, 66, 0.2)" }}>
            <h2 className="text-3xl font-bold text-white mb-4">আপনার service workflow অনুযায়ী tool stack যাচাই করুন</h2>
            <p className="text-gray-300 mb-8">কেনার আগে current AIPS price, access model, availability, delivery ETA এবং applicable order terms নিশ্চিত করুন।</p>
            <a href="https://wa.me/8801865385348?text=আমি freelancer। আমার service workflow-এর জন্য current AI stack ও order terms জানতে চাই।" className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-black text-lg transition-all duration-200 hover:scale-105" style={{ backgroundColor: "#25d366" }}>
              WhatsApp-এ যাচাই করুন →
            </a>
          </div>
        </section>
      </main>
      <FloatingWhatsApp />
    </div>
  );
}