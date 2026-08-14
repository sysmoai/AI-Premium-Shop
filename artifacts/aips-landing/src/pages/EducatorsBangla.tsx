import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ORG_SCHEMA, WEBSITE_SCHEMA } from "@/utils/schemas";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { bnFrom, bnTaka, priceOf } from "@/lib/banglaPricing";
import { tierPrice } from "@/lib/catalogStats";
import { CheckCircle } from "lucide-react";

const teachingUses = [
  { task: "পাঠ পরিকল্পনার খসড়া", tools: "ChatGPT, Claude", help: "Learning objective, lesson outline ও activity idea তৈরি করুন। Curriculum, age appropriateness ও factual accuracy শিক্ষক নিজে যাচাই করবেন।" },
  { task: "মূল্যায়ন প্রশ্ন", tools: "ChatGPT, Claude", help: "Quiz, practice question ও rubric-এর draft নিন। Difficulty, fairness, answer key ও learning objective-এর alignment review করুন।" },
  { task: "Differentiated materials", tools: "Claude, ChatGPT", help: "একই বিষয়ের বিভিন্ন reading level বা support need অনুযায়ী draft তৈরি করুন। Individual student need AI নিজে নির্ভুলভাবে diagnose করে—এমন ধরে নেবেন না।" },
  { task: "Feedback assistance", tools: "ChatGPT, Claude", help: "Feedback template ও comment draft তৈরি করুন। Student work-এর মূল্যায়ন, context ও final feedback শিক্ষকের judgment-এ রাখুন।" },
  { task: "Teaching resources", tools: "ChatGPT, presentation tools", help: "Slide outline, handout ও activity prompt-এর draft তৈরি করুন। Source, copyright এবং classroom suitability যাচাই করুন।" },
  { task: "Research support", tools: "Perplexity, Claude", help: "Topic exploration ও source discovery-এ সহায়তা নিন। Citation ও claim মূল source খুলে যাচাই করুন।" },
];

export default function EducatorsBangla() {
  const packages = [
    { name: "Lesson-planning option", price: bnFrom("chatgpt-plus-bangladesh"), desc: "ChatGPT Plus", features: ["Lesson draft", "Question ideas", "Resource outline", "Exact access model আগে নিশ্চিত করুন"] },
    { name: "Long-document option", price: bnTaka(tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0), desc: "Claude Pro Premium", features: ["Long-document analysis", "Rubric draft", "Feedback assistance", "Availability ও terms আগে নিশ্চিত করুন"], featured: true },
    { name: "Multi-tool option", price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("chatgpt-plus-bangladesh") ?? 0) + (priceOf("grammarly-premium-bangladesh") ?? 0)), desc: "Claude + ChatGPT + Grammarly", features: ["Draft workflow", "Editing assistance", "Team-use planning", "Seat/access rules আগে যাচাই করুন"] },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title="শিক্ষকদের জন্য AI — পাঠ পরিকল্পনা, মূল্যায়ন ও Feedback"
        description="শিক্ষকদের জন্য AI workflow: lesson planning, assessment, feedback ও research। বর্তমান AIPS দাম, access model, availability ও order terms আগে নিশ্চিত করুন।"
        canonical="https://aipremiumshop.com/educators-bn"
        lang="bn-BD"
        jsonLd={[ORG_SCHEMA, WEBSITE_SCHEMA]}
        hreflang={{ "bn-BD": "/educators-bn", "en-BD": "/guides/educators" }}
      />
      <Navbar />
      <Breadcrumb items={[{ name: "হোম", href: "/bn" }, { name: "শিক্ষকদের জন্য AI" }]} />

      <main>
        <section className="py-20 px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">শিক্ষকদের জন্য AI — পরিকল্পনা, মূল্যায়ন ও feedback workflow</h1>
            <p className="text-xl text-gray-300 mb-8">AI lesson draft, question ideas, feedback assistance ও research-এ সময় বাঁচাতে সাহায্য করতে পারে। এটি শিক্ষক judgment, academic policy বা student safeguarding-এর বিকল্প নয়।</p>
            <a href="https://wa.me/8801865385348?text=আমি শিক্ষক। আমার teaching workflow অনুযায়ী current AI tool, price, access model ও availability জানতে চাই।" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black transition-all duration-200 hover:scale-105" style={{ backgroundColor: "#25d366" }}>
              WhatsApp-এ বর্তমান অপশন জিজ্ঞেস করুন
            </a>
          </motion.div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-4">Teaching workflow-এ AI কোথায় ব্যবহার করতে পারেন</h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">Student data, assessment integrity, copyright, institutional AI policy এবং safeguarding requirements মেনে চলুন। Sensitive student information shared access-এ দেওয়ার আগে exact privacy arrangement যাচাই করুন।</p>
          <div className="grid md:grid-cols-2 gap-8">
            {teachingUses.map((item) => (
              <motion.div key={item.task} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-2">{item.task}</h3>
                <div className="text-sm text-yellow-400 mb-3">উদাহরণ টুল: {item.tools}</div>
                <p className="text-gray-300">{item.help}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-4">কিছু বর্তমান educator option</h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">দাম catalog-derived। Combined total কোনো savings claim নয়। Exact plan, access/seat model, availability, delivery ETA এবং applicable terms পেমেন্টের আগে নিশ্চিত করুন।</p>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`rounded-xl p-6 border ${pkg.featured ? "bg-gradient-to-br from-yellow-900/40 to-gray-900 border-yellow-400" : "bg-gray-900/50 border-gray-800"}`}>
                {pkg.featured && <div className="text-xs font-bold text-yellow-400 mb-2">Long-document workflow</div>}
                <h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-yellow-400 mb-1">{pkg.price}</div>
                <div className="text-sm text-gray-400 mb-4">{pkg.desc}</div>
                <ul className="space-y-2 mb-6">{pkg.features.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />{f}</li>)}</ul>
                <a href={`https://wa.me/8801865385348?text=${encodeURIComponent(`আমি শিক্ষক। ${pkg.name}-এর current price, access model, availability, delivery ETA ও terms জানতে চাই।`)}`} className="w-full py-2 rounded-lg font-bold text-center transition-all hover:scale-105" style={{ backgroundColor: pkg.featured ? "#f4b942" : "#374151", color: pkg.featured ? "#000" : "#fff" }}>
                  অর্ডারের তথ্য নিশ্চিত করুন
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Educator AI checklist</h2>
          <div className="space-y-4">
            {["Student-identifiable data দেওয়ার আগে institution policy ও privacy controls যাচাই করুন।", "Assessment question/answer AI দিয়ে তৈরি হলে accuracy, fairness ও leakage risk review করুন।", "Generated citation ও teaching fact মূল source-এ যাচাই করুন।", "AI feedback-কে final grading decision বানাবেন না; teacher review রাখুন।", "Provider plan-এর school/institutional licensing ও seat rules exact use case-এর জন্য উপযুক্ত কিনা যাচাই করুন।"].map((tip) => <div key={tip} className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-yellow-400"><p className="text-gray-200">✓ {tip}</p></div>)}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
          <div className="rounded-2xl p-12 text-center border" style={{ background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)", borderColor: "rgba(244, 185, 66, 0.2)" }}>
            <h2 className="text-3xl font-bold text-white mb-4">আপনার teaching workflow অনুযায়ী AI option যাচাই করুন</h2>
            <p className="text-gray-300 mb-8">পেমেন্টের আগে exact product, price, access model, availability, delivery ETA এবং applicable order terms নিশ্চিত করুন।</p>
            <a href="https://wa.me/8801865385348?text=আমি শিক্ষক। আমার teaching workflow-এর জন্য current AI option ও order terms জানতে চাই।" className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-black text-lg transition-all duration-200 hover:scale-105" style={{ backgroundColor: "#25d366" }}>
              WhatsApp-এ যাচাই করুন →
            </a>
          </div>
        </section>
      </main>
      <FloatingWhatsApp />
    </div>
  );
}