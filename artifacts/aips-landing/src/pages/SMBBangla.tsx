import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ORG_SCHEMA, WEBSITE_SCHEMA } from "@/utils/schemas";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { bnFrom, bnTaka, priceOf } from "@/lib/banglaPricing";
import { tierPrice } from "@/lib/catalogStats";
import { CheckCircle } from "lucide-react";

const workflows = [
  { task: "Customer-support draft", tools: "ChatGPT, Claude", help: "FAQ, reply template ও support triage-এর খসড়া তৈরি করুন। 24/7 service কেবল তখনই দাবি করুন যখন আপনার বাস্তব support system সেটি mechanically প্রদান করে।" },
  { task: "Sales follow-up", tools: "ChatGPT, automation tools", help: "Follow-up copy ও workflow logic তৈরি করুন। Automation পাঠানোর আগে consent, segmentation, pricing এবং human escalation rules ঠিক করুন।" },
  { task: "Marketing content", tools: "ChatGPT, image tools", help: "Campaign idea, caption ও visual concept তৈরি করুন। Performance, reach, sales বা ROI কোনো model guarantee করে না।" },
  { task: "Operational automation", tools: "Zapier, Make, n8n", help: "Repeatable task automate করার আগে trigger, permission, failure handling, audit log ও rollback design করুন।" },
  { task: "Reporting assistance", tools: "Claude, ChatGPT", help: "Sales বা operations data summarize করুন। Forecast বা recommendation-কে certainty না ধরে source data ও assumptions যাচাই করুন।" },
  { task: "Team knowledge", tools: "AI assistants, workspace tools", help: "SOP, internal FAQ ও draft documentation তৈরি করুন। Customer, employee ও business-sensitive data দেওয়ার আগে access/privacy controls যাচাই করুন।" },
];

export default function SMBBangla() {
  const packages = [
    { name: "Business writing option", price: bnFrom("chatgpt-plus-bangladesh"), desc: "ChatGPT Plus", features: ["Support reply draft", "Marketing copy", "Analysis assistance", "Exact access model আগে নিশ্চিত করুন"] },
    { name: "Analysis option", price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("chatgpt-plus-bangladesh") ?? 0)), desc: "Claude Pro + ChatGPT", features: ["Long-document analysis", "Draft workflows", "Research assistance", "দুই plan-এর terms আগে নিশ্চিত করুন"], featured: true },
    { name: "Workspace option", price: bnTaka((tierPrice("claude-pro-bangladesh", "Premium Shared") ?? 0) + (priceOf("chatgpt-plus-bangladesh") ?? 0) + (priceOf("notion-business-bangladesh") ?? 0)), desc: "Claude + ChatGPT + Notion", features: ["Knowledge workflow", "Documentation", "Team-use planning", "Licensing ও seat/access rules যাচাই করুন"] },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title="ছোট ব্যবসার জন্য AI — Support, Marketing ও Automation"
        description="ছোট ব্যবসার AI workflow: support, marketing, analysis ও automation। বর্তমান AIPS দাম, access model, availability এবং order terms পেমেন্টের আগে নিশ্চিত করুন।"
        canonical="https://aipremiumshop.com/smb-bn"
        lang="bn-BD"
        jsonLd={[ORG_SCHEMA, WEBSITE_SCHEMA]}
        hreflang={{ "bn-BD": "/smb-bn", "en-BD": "/best-ai-for-business" }}
      />
      <Navbar />
      <Breadcrumb items={[{ name: "হোম", href: "/bn" }, { name: "ছোট ব্যবসার জন্য AI" }]} />

      <main>
        <section className="py-20 px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">ছোট ব্যবসার জন্য AI — support, marketing ও operations workflow</h1>
            <p className="text-xl text-gray-300 mb-8">AI repetitive drafting, analysis ও automation design-এ সহায়তা করতে পারে। Growth, sales, ROI, staffing outcome বা always-on support কোনো tool নিজে নিশ্চিত করে না।</p>
            <a href="https://wa.me/8801865385348?text=আমার ছোট ব্যবসার জন্য current AI tool, price, access model ও availability জানতে চাই।" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-black transition-all duration-200 hover:scale-105" style={{ backgroundColor: "#25d366" }}>
              WhatsApp-এ বর্তমান অপশন জিজ্ঞেস করুন
            </a>
          </motion.div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-4">ব্যবসায় AI কোথায় কাজে লাগতে পারে</h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">Customer-facing automation-এ human escalation, approval, privacy, consent ও failure handling রাখুন। Provider feature ও limits plan অনুযায়ী বদলাতে পারে।</p>
          <div className="grid md:grid-cols-2 gap-8">
            {workflows.map((item) => (
              <motion.div key={item.task} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-2">{item.task}</h3>
                <div className="text-sm text-yellow-400 mb-3">উদাহরণ টুল: {item.tools}</div>
                <p className="text-gray-300">{item.help}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-4">কিছু বর্তমান business option</h2>
          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">দাম catalog-derived। Combined total-কে savings বা best value বলা হচ্ছে না। Exact product, plan, seat/access model, availability, delivery ETA ও applicable terms আগে নিশ্চিত করুন।</p>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`rounded-xl p-6 border ${pkg.featured ? "bg-gradient-to-br from-yellow-900/40 to-gray-900 border-yellow-400" : "bg-gray-900/50 border-gray-800"}`}>
                {pkg.featured && <div className="text-xs font-bold text-yellow-400 mb-2">Analysis-focused option</div>}
                <h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-yellow-400 mb-1">{pkg.price}</div>
                <div className="text-sm text-gray-400 mb-4">{pkg.desc}</div>
                <ul className="space-y-2 mb-6">{pkg.features.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />{f}</li>)}</ul>
                <a href={`https://wa.me/8801865385348?text=${encodeURIComponent(`আমার ব্যবসার জন্য ${pkg.name}-এর current price, access model, availability, delivery ETA ও terms জানতে চাই।`)}`} className="w-full py-2 rounded-lg font-bold text-center transition-all hover:scale-105" style={{ backgroundColor: pkg.featured ? "#f4b942" : "#374151", color: pkg.featured ? "#000" : "#fff" }}>
                  অর্ডারের তথ্য নিশ্চিত করুন
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Business AI control checklist</h2>
          <div className="space-y-4">
            {["Sensitive customer বা employee data দেওয়ার আগে exact access/privacy arrangement যাচাই করুন।", "Automation-এর প্রতিটি consequential action-এর approval, error handling ও rollback ঠিক করুন।", "AI-generated price, legal, financial বা operational claim source data ছাড়া publish করবেন না।", "Provider account/seat/licensing rules business use-এর জন্য উপযুক্ত কিনা যাচাই করুন।", "Automation success মাপুন real KPI দিয়ে; AI tool কেনা নিজে ROI guarantee নয়।"].map((tip) => <div key={tip} className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-yellow-400"><p className="text-gray-200">✓ {tip}</p></div>)}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 md:px-8 py-16">
          <div className="rounded-2xl p-12 text-center border" style={{ background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)", borderColor: "rgba(244, 185, 66, 0.2)" }}>
            <h2 className="text-3xl font-bold text-white mb-4">আপনার business workflow অনুযায়ী AI stack যাচাই করুন</h2>
            <p className="text-gray-300 mb-8">পেমেন্টের আগে exact product, current price, access model, availability, delivery ETA এবং applicable terms নিশ্চিত করুন।</p>
            <a href="https://wa.me/8801865385348?text=আমার business workflow-এর জন্য current AI stack ও order terms জানতে চাই।" className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-black text-lg transition-all duration-200 hover:scale-105" style={{ backgroundColor: "#25d366" }}>
              WhatsApp-এ যাচাই করুন →
            </a>
          </div>
        </section>
      </main>
      <FloatingWhatsApp />
    </div>
  );
}