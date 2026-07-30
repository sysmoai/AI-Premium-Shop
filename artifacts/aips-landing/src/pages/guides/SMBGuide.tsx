import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Building2,
  Zap,
  Award,
  DollarSign,
  Workflow,
} from "lucide-react";
import { Link } from "wouter";
import { productPath } from "@/lib/productRoutes";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20order%20an%20AI%20subscription";

export default function SMBGuide() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const tools = [
    {
      rank: 1,
      name: "Google AI Pro",
      slug: "gemini-advanced-bangladesh",
      price: "BDT 499/month",
      description:
        "AI built into Gmail, Docs, and Sheets—tools your team already uses daily. Draft customer emails, create professional proposals, analyze sales data. 2TB storage for all business files.",
      useCases: ["Email automation", "Document creation", "Data analysis", "Team collaboration", "File storage"],
      badge: "Most Accessible",
      color: "#4285f4",
    },
    {
      rank: 2,
      name: "ChatGPT Team",
      slug: "chatgpt-business-bangladesh",
      price: "BDT 1,200/month",
      description:
        "Team AI assistant with admin controls. Unlimited GPT-5.4 access for the whole team. Perfect for marketing, sales, operations, and customer support. No individual account limits.",
      useCases: ["Team collaboration", "Sales scripts", "Customer support", "Content marketing", "Operations"],
      badge: "For Teams",
      color: "#10a37f",
    },
    {
      rank: 3,
      name: "Notion AI",
      slug: "notion-ai-bangladesh",
      price: "BDT 550/month",
      description:
        "AI-powered workspace for docs, projects, SOPs, and team collaboration. Create internal knowledge base, project management, and team dashboards. Replaces multiple software tools.",
      useCases: ["Knowledge base", "Project management", "SOPs", "Team documentation", "Dashboards"],
      badge: "For Operations",
      color: "#000000",
    },
    {
      rank: 4,
      name: "Claude Pro",
      slug: "claude-pro-bangladesh",
      price: "BDT 1,495/month",
      description:
        "Best AI for complex business documents—contracts, reports, business proposals. Superior writing quality and reasoning for strategic decisions. 200K token context for large documents.",
      useCases: ["Contract drafting", "Business reports", "Proposals", "Strategic writing", "Document analysis"],
      badge: "For Writing",
      color: "#d97706",
    },
    {
      rank: 5,
      name: "Zapier",
      slug: "zapier-ai-automation-bangladesh",
      price: "BDT 799/month",
      description:
        "Automate workflows between apps. Connect ChatGPT, Notion, Gmail, and other tools. Eliminate manual data entry. Turn complex processes into one-click automation.",
      useCases: ["Workflow automation", "Lead management", "Data sync", "Email automation", "Process optimization"],
      badge: "For Automation",
      color: "#ff6b6b",
    },
  ];

  const testimonials = [
    {
      name: "Riyaz Mahmud",
      business: "E-commerce Store - Dhaka",
      quote:
        "AI tools helped us reduce operational costs by ৳50,000/month. We automated customer support, email marketing, and inventory management. That's real money saved.",
      role: "Business Owner",
      image: "👨‍💼",
    },
    {
      name: "Fatima Begum",
      business: "Digital Marketing Agency",
      quote:
        "ChatGPT Team allows my 5-person team to collaborate on client work without confusion. Client emails, proposals, and strategies are 80% faster to produce.",
      role: "Agency Owner",
      image: "👩‍💼",
    },
    {
      name: "Hassan Khan",
      business: "Manufacturing Company",
      quote:
        "Notion AI created our entire internal knowledge base in 2 weeks. Onboarding new staff used to take 3 months. Now it's 1 week.",
      role: "Operations Manager",
      image: "👨‍💼",
    },
    {
      name: "Saira Khan",
      business: "Consulting Firm",
      quote:
        "Claude Pro helps us write better client proposals. Our win rate improved by 35%. The quality of our deliverables is noticeably better.",
      role: "Consulting Lead",
      image: "👩‍💼",
    },
  ];

  const faqs = [
    {
      q: "How much can my business save with AI tools?",
      a: "Most businesses reduce operational costs by 30-40%. This comes from automating customer support (reducing hiring needs), faster content creation (no external agencies), better data analysis (fewer mistakes), and faster sales cycles. A small business can easily save ৳50,000-100,000/month.",
    },
    {
      q: "Is it safe to put business data into AI tools?",
      a: "ChatGPT Team and Notion Business don't use your data for training. Google AI Pro with Workspace follows Google's enterprise data policies. For extremely sensitive data (financial records, customer PII), use private account plans. Always review tool privacy policies before implementation.",
    },
    {
      q: "Which tools should a small business start with?",
      a: "Start with Google AI Pro (BDT 499). It integrates into Gmail, Docs, and Sheets—every business uses these. Once you see value, add ChatGPT Team (BDT 1,200) to automate sales and marketing. Then add Notion (BDT 550) to replace multiple tools.",
    },
    {
      q: "Can I use these for customer support automation?",
      a: "Yes, absolutely. ChatGPT and Claude are excellent for customer support responses. They can draft responses to common questions, which your support team can review and send. This 10x speeds up response time.",
    },
    {
      q: "Do I need technical skills to set up automation?",
      a: "Not really. ChatGPT, Notion, and Google AI are intuitive—anyone can use them. Zapier automation might need some help from a tech-savvy team member, but there are hundreds of pre-built templates that require zero coding.",
    },
    {
      q: "How do I measure ROI?",
      a: "Track three metrics: 1) Time saved (hours of work eliminated), 2) Cost reduction (hiring avoided), 3) Revenue increase (faster sales, better proposals). Most businesses see positive ROI within 30 days.",
    },
  ];

  const budgetPlans = [
    {
      name: "Starter (BDT 499/month)",
      tools: ["Google AI Pro"],
      features: [
        "Gmail AI for emails",
        "Docs AI for proposals",
        "Sheets AI for analysis",
        "2TB storage",
        "Basic automation",
      ],
      best: "Perfect for solo founders",
    },
    {
      name: "Growth (BDT 2,249/month)",
      tools: ["Google AI Pro", "ChatGPT Team", "Notion AI"],
      features: [
        "All Starter features",
        "Team collaboration",
        "Customer support automation",
        "Knowledge base creation",
        "Project management",
      ],
      best: "For small teams (5-10 people)",
    },
    {
      name: "Pro (BDT 4,044/month)",
      tools: ["Google AI Pro", "ChatGPT Team", "Notion AI", "Claude Pro", "Zapier"],
      features: [
        "All Growth features",
        "Advanced contract/report writing",
        "Workflow automation",
        "Lead management",
        "Complete business stack",
      ],
      best: "For scaling businesses",
    },
  ];

  return (
    <PageLayout>
      <SEOHead
        title="How Small Business Owners Run 24/7 with AI | Bangladesh"
        description="Best AI tools for SMB owners in Bangladesh 2026. Automate operations, save ৳50K/month, scale faster. Google AI, ChatGPT Team, Notion. From BDT 499."
        canonical="https://aipremiumshop.com/guides/smallbusiness"
        ogImage="https://aipremiumshop.com/og-smallbusiness.jpg"
      />

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-16 md:py-24 text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-6">
            <Workflow className="w-4 h-4" />
            <span className="text-sm font-medium">Save ৳50K/Month • Updated July 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Small Business Owners Run 24/7 with AI
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Automate operations. Cut costs. Scale faster. The AI toolkit every SMB owner needs to compete in 2026.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition"
            >
              <MessageCircle className="w-5 h-5" />
              Automate My Business
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Browse Tools
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-600">৳50K+</div>
              <div className="text-sm text-gray-600">Monthly savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600">1,200+</div>
              <div className="text-sm text-gray-600">Businesses powered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600">30 days</div>
              <div className="text-sm text-gray-600">To positive ROI</div>
            </div>
          </div>
        </motion.section>

        {/* Problem */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <div className="bg-red-50 rounded-lg p-8 border-l-4 border-red-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The SMB Challenge in Bangladesh</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Can't afford to hire specialists (content writer, designer, developer, accountant)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Stuck doing everything yourself (email, social media, proposals, customer support)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Losing deals because proposals take too long to create</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Customer support emails pile up because there's no time to respond</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Team onboarding takes forever—no documented processes</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Can't compete with larger companies that have entire departments</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Solution */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your AI-Powered Business Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-lg p-8"
            >
              <Building2 className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Eliminate Manual Work</h3>
              <p>AI handles repetitive tasks—email drafts, proposal templates, customer support responses. Your team focuses on actual business growth.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-8"
            >
              <DollarSign className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Save ৳50,000+/Month</h3>
              <p>Stop hiring freelancers or agencies. AI does the work of 3-5 specialized employees. That's real cost reduction.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-8"
            >
              <Award className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Scale Without Hiring</h3>
              <p>Double your output without doubling your team. AI multiplies your team's capacity. It's like hiring 5 people for BDT 4,000/month.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-8"
            >
              <Zap className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Faster Decision Making</h3>
              <p>AI analyzes data instantly. Sales trends, customer insights, performance metrics—all available in seconds instead of hours.</p>
            </motion.div>
          </div>
        </section>

        {/* Top 5 Tools */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Top 5 AI Tools for SMBs</h2>

          <div className="space-y-6">
            {tools.map((tool) => (
              <motion.div
                key={tool.rank}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-gray-400">#{tool.rank}</span>
                      <h3 className="text-2xl font-bold text-gray-900">{tool.name}</h3>
                    </div>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: `${tool.color}20`, color: tool.color }}
                    >
                      {tool.badge}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{tool.price}</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{tool.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Perfect for:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.useCases.map((useCase) => (
                      <span key={useCase} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href={productPath(tool.slug)}>
                  <a className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Bangladesh Business Owners Are Achieving</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-8 border-l-4 border-amber-600"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{testimonial.image}</div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.business}</div>
                      <div className="text-sm text-amber-600 font-medium">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Budget Plans */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Business AI Plans</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {budgetPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`rounded-lg p-8 ${idx === 1 ? "bg-amber-600 text-white border-4 border-amber-600" : "bg-white border-2 border-gray-200"}`}
              >
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className={idx === 1 ? "text-amber-100" : "text-gray-600"}>{plan.best}</p>

                <ul className="space-y-3 my-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 items-start">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${idx === 1 ? "text-amber-200" : "text-amber-600"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center font-bold py-3 rounded-lg transition ${
                    idx === 1 ? "bg-white text-amber-600 hover:bg-gray-50" : "bg-amber-600 text-white hover:bg-amber-700"
                  }`}
                >
                  Order Now
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">SMB FAQs</h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-gray-900">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 transition-transform ${expandedFaq === idx ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-200"
                      >
                        <div className="p-6 bg-gray-50 text-gray-700">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white max-w-4xl mx-auto rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Stop Doing Everything Yourself</h2>
          <p className="text-amber-100 mb-8 text-lg">
            1,200+ Bangladeshi businesses are automating operations and saving ৳50K+/month. Your competition already has AI. Don't fall behind.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Automate My Business
          </a>
        </section>
      </div>
    </PageLayout>
  );
}
