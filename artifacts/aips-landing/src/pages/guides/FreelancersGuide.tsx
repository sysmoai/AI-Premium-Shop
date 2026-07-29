import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Briefcase,
  TrendingUp,
  Zap,
  Award,
  Users,
  DollarSign,
} from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20order%20an%20AI%20subscription";

export default function FreelancersGuide() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const tools = [
    {
      rank: 1,
      name: "ChatGPT Plus",
      price: "BDT 499/month",
      description:
        "Your proposal-writing machine. Write Upwork proposals 5x faster, craft personalized cover letters, manage client emails, and deliver content on tight deadlines. GPT-5.4 understands clients' needs and helps you stand out.",
      useCases: ["Proposal writing", "Cover letters", "Email templates", "Content delivery", "Client communication"],
      badge: "Essential",
      color: "#10a37f",
    },
    {
      rank: 2,
      name: "Claude Pro",
      price: "BDT 1,495/month",
      description:
        "Best for writing quality. Claude produces higher-quality writing than ChatGPT—perfect for clients who demand excellent prose. 200K token context means longer documents without token limits.",
      useCases: ["Long-form writing", "Blog posts", "Whitepapers", "Technical writing", "Copy optimization"],
      badge: "Best Writing",
      color: "#d97706",
    },
    {
      rank: 3,
      name: "Midjourney",
      price: "BDT 1,199/month",
      description:
        "Generate unlimited graphics, thumbnails, mockups, and client visuals. Unlimited relaxed generation mode means you can create as many variations as needed for client approvals.",
      useCases: ["Graphic design", "Mockups", "Thumbnails", "Branding visuals", "UI/UX mockups"],
      badge: "For Designers",
      color: "#8b5cf6",
    },
    {
      rank: 4,
      name: "GitHub Copilot",
      price: "BDT 1,495/month",
      description:
        "For developer freelancers. Code 50% faster inside VS Code or JetBrains. Handle more projects simultaneously and charge premium rates for faster delivery.",
      useCases: ["Web development", "API building", "Full-stack projects", "Debugging", "Code review"],
      badge: "For Devs",
      color: "#6e40c9",
    },
    {
      rank: 5,
      name: "Canva Pro",
      price: "BDT 399/month",
      description:
        "Template-based design for non-designers. Create Instagram posts, LinkedIn graphics, YouTube thumbnails, and social media content in minutes. Millions of templates and stock images.",
      useCases: ["Social media design", "Instagram posts", "LinkedIn graphics", "Presentations", "Marketing assets"],
      badge: "Easy Design",
      color: "#3b82f6",
    },
  ];

  const testimonials = [
    {
      name: "Akash Mondal",
      platform: "Upwork - BDT 2,500/hr",
      quote:
        "AI tools helped me go from $5/hr to $25/hr. I can now write proposals, deliver projects, and handle more clients simultaneously. My income tripled.",
      role: "Content Writer",
      image: "👨‍💻",
    },
    {
      name: "Sania Akter",
      platform: "Fiverr - 5 stars",
      quote:
        "Midjourney allows me to offer graphic design services without expensive Adobe subscriptions. My clients love the quality and fast turnaround.",
      role: "Graphic Designer",
      image: "👩‍🎨",
    },
    {
      name: "Riyaz Hossain",
      platform: "Toptal - Senior Dev",
      quote:
        "GitHub Copilot + Claude Pro lets me complete projects 50% faster. I charge the same rate but can handle way more clients.",
      role: "Web Developer",
      image: "👨‍💻",
    },
    {
      name: "Noor Islam",
      platform: "99designs - Top Rated",
      quote:
        "AI tools are now essential in freelancing. Clients expect fast delivery and high quality. AI lets me deliver both without burning out.",
      role: "UI/UX Designer",
      image: "👩‍🎨",
    },
  ];

  const faqs = [
    {
      q: "Can I use AI-generated content for client work?",
      a: "Yes, but with caveats. Most clients allow AI-assisted work as long as: 1) You add significant personal value, 2) The output meets quality standards, 3) You disclose AI usage if your contract requires it. Always edit and improve AI outputs—never submit raw AI work. Many clients specifically request AI-assisted work now because they value speed.",
    },
    {
      q: "Which AI tool should I start with?",
      a: "Start with ChatGPT Plus (BDT 499). It's the most versatile—helps with proposals, communication, and content. After landing your first few high-rate clients, add Claude Pro for writing quality or GitHub Copilot if you code.",
    },
    {
      q: "How much can I save vs. official subscription prices?",
      a: "Significantly. ChatGPT Plus costs $20/month officially (BDT 2,400+ with exchange and fees). We offer it for BDT 499—that's 79% savings. GitHub Copilot costs $20/month officially; we offer BDT 1,495. Midjourney is $20/month officially; we offer BDT 1,199.",
    },
    {
      q: "Do I need an international credit card?",
      a: "No. We accept bKash, Nagad, and all Bangladeshi payment methods. Many freelancers struggle to get international cards anyway—we solve that problem completely.",
    },
    {
      q: "Can I use these for multiple clients simultaneously?",
      a: "Yes. Shared accounts work for one user at a time (sequential use). If you have a team of freelancers, we offer bundle pricing. Message us on WhatsApp for team subscriptions.",
    },
    {
      q: "How quickly do I recover the subscription cost?",
      a: "Very fast. If AI helps you land even one extra project per month at higher rates, you've paid for the subscription. Most freelancers report ROI within the first week.",
    },
  ];

  const budgetPlans = [
    {
      name: "Starter (BDT 499/month)",
      tools: ["ChatGPT Plus"],
      features: [
        "GPT-5.4 proposals",
        "Email templates",
        "Content writing",
        "Client communication",
        "DALL-E image generation",
      ],
      best: "Perfect for writers & consultants",
    },
    {
      name: "Growth (BDT 1,998/month)",
      tools: ["ChatGPT Plus", "Midjourney", "Canva Pro"],
      features: [
        "All Starter features",
        "AI graphics & mockups",
        "Unlimited image generations",
        "Design templates",
        "Professional visuals",
      ],
      best: "For designers & creators",
    },
    {
      name: "Pro (BDT 3,493/month)",
      tools: ["ChatGPT Plus", "Claude Pro", "Midjourney", "GitHub Copilot"],
      features: [
        "All Growth features",
        "Premium writing quality",
        "200K token context",
        "Code assistance",
        "Complete freelance stack",
      ],
      best: "For serious freelancers",
    },
  ];

  return (
    <PageLayout>
      <SEOHead
        title="How to 10x Your Freelance Income with AI Tools | Bangladesh"
        description="Best AI tools for freelancers in Bangladesh 2026. Earn 44% more on Upwork & Fiverr. ChatGPT, Claude, Midjourney, GitHub Copilot. From BDT 499."
        canonical="https://aipremiumshop.com/guides/freelancers"
        ogImage="https://aipremiumshop.com/og-freelancers.jpg"
      />

      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-16 md:py-24 text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Earn 44% More • Updated July 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How to 10x Your Freelance Income with AI Tools
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Win more clients. Deliver faster. Charge premium rates. Complete guide for Upwork, Fiverr, and 99designs freelancers.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              <MessageCircle className="w-5 h-5" />
              Order via WhatsApp
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              See All Tools
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600">+44%</div>
              <div className="text-sm text-gray-600">Income increase</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">1,800+</div>
              <div className="text-sm text-gray-600">Freelancers helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">BDT 499</div>
              <div className="text-sm text-gray-600">Starting price</div>
            </div>
          </div>
        </motion.section>

        {/* Problem */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <div className="bg-red-50 rounded-lg p-8 border-l-4 border-red-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Freelancer's Catch-22</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Stuck at $5-10/hour on Upwork because you can't compete with automation</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Writing proposals takes hours, and you still lose bids</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Client projects pile up because you can't deliver fast enough</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Hiring a VA costs more than you actually make per hour</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Can't access premium tools because of credit card barriers in Bangladesh</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Solution */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why AI is Your Secret Weapon</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-lg p-8"
            >
              <Zap className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Win More Bids</h3>
              <p>Write personalized proposals in 5 minutes instead of 1 hour. AI helps you customize each proposal to the client's specific needs—you'll win more bids at higher rates.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-8"
            >
              <DollarSign className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Charge Premium Rates</h3>
              <p>Deliver projects 50% faster. This means you can either take on more clients or charge higher rates. Most freelancers do both.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-8"
            >
              <Award className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Compete Globally</h3>
              <p>Compete with freelancers from developed countries. AI levels the playing field—your output quality can match theirs, but your rates stay competitive.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-lg p-8"
            >
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Work-Life Balance</h3>
              <p>Stop burning out. AI handles repetitive work—you focus on what clients value most. Deliver more in less time without exhaustion.</p>
            </motion.div>
          </div>
        </section>

        {/* Top 5 Tools */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Top 5 AI Tools for Freelancers</h2>

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

                <Link href={`/product/${tool.name.toLowerCase().replace(/ /g, "-")}`}>
                  <a className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Real Success Stories</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-8 border-l-4 border-emerald-600"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{testimonial.image}</div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.platform}</div>
                      <div className="text-sm text-emerald-600 font-medium">{testimonial.role}</div>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Plans That Fit Your Growth</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {budgetPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`rounded-lg p-8 ${idx === 1 ? "bg-emerald-600 text-white border-4 border-emerald-600" : "bg-white border-2 border-gray-200"}`}
              >
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className={idx === 1 ? "text-emerald-100" : "text-gray-600"}>{plan.best}</p>

                <ul className="space-y-3 my-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 items-start">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${idx === 1 ? "text-emerald-200" : "text-emerald-600"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center font-bold py-3 rounded-lg transition ${
                    idx === 1 ? "bg-white text-emerald-600 hover:bg-gray-50" : "bg-emerald-600 text-white hover:bg-emerald-700"
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
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Freelancer FAQs</h2>

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
        <section className="px-4 py-16 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white max-w-4xl mx-auto rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Stop Leaving Money on the Table</h2>
          <p className="text-emerald-100 mb-8 text-lg">
            1,800+ freelancers in Bangladesh are already using AI to earn 44% more. Your competitors are ahead. Don't wait.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Start Earning More
          </a>
        </section>
      </div>
    </PageLayout>
  );
}
