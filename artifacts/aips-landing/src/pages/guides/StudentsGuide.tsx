import { useState } from "react";
import { stackTotal, taka } from "@/lib/catalogStats";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Book,
  Zap,
  Award,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import { productPath } from "@/lib/productRoutes";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { breadcrumbSchema } from "@/utils/schemas";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20order%20an%20AI%20subscription";

export default function StudentsGuide() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const tools = [
    {
      rank: 1,
      name: "ChatGPT Plus",
      slug: "chatgpt-plus-bangladesh",
      price: "BDT 499/month",
      description:
        "Your AI study buddy available 24/7. Explain concepts, solve math problems, check assignments, debug code, and ace practice exams. GPT-5.4 understands context and provides explanations that help you learn, not just answer.",
      useCases: ["Essay writing", "Math problem solving", "Code debugging", "Exam prep", "Research papers"],
      badge: "Most Popular",
      color: "#10a37f",
    },
    {
      rank: 2,
      name: "Claude Pro",
      slug: "claude-pro-bangladesh",
      price: "BDT 1,495/month",
      description:
        "Best AI for understanding complex topics. Claude excels at explaining difficult concepts, analyzing lengthy academic papers, and breaking down multi-step problems. Exceptional for literature, physics, and chemistry studies.",
      useCases: ["Complex explanations", "Paper analysis", "Physics & chemistry", "Critical thinking", "Research synthesis"],
      badge: "Best for Learning",
      color: "#d97706",
    },
    {
      rank: 3,
      name: "GitHub Copilot",
      slug: "github-copilot-bangladesh",
      price: "BDT 1,495/month",
      description:
        "For coding assignments. Autocomplete for programming languages, real-time code suggestions, and debugging help inside VS Code or your favorite IDE. Reduces coding time by 50-60%.",
      useCases: ["Python assignments", "Web development", "Data structures", "Algorithm practice", "Debugging"],
      badge: "For Coders",
      color: "#6e40c9",
    },
    {
      rank: 4,
      name: "Google AI Pro",
      slug: "gemini-advanced-bangladesh",
      price: "BDT 499/month",
      description:
        "Integrated AI in Google Docs and Gmail. Write essays directly in Docs with AI assist, get research help in Gmail, organize notes in Sheets. 2TB storage for all your study materials.",
      useCases: ["Essay writing", "Research organization", "Gmail collaboration", "File storage", "Google Workspace"],
      badge: "For Organization",
      color: "#4285f4",
    },
    {
      rank: 5,
      name: "Grammarly Premium",
      slug: "grammarly-premium-bangladesh",
      price: "BDT 399/month",
      description:
        "Perfect spelling, punctuation, and tone-checking for every assignment. Real-time corrections as you write. Improves your writing skills over time with personalized feedback.",
      useCases: ["Essay editing", "Email writing", "Grammar learning", "Tone adjustment", "Writing improvement"],
      badge: "For Writing",
      color: "#15803d",
    },
  ];

  const testimonials = [
    {
      name: "Fatima Ahmed",
      university: "BUET, Dhaka",
      quote:
        "ChatGPT helped me understand thermodynamics concepts that I struggled with for weeks. I went from a D to an A- in that subject.",
      role: "Engineering Student",
      image: "👩‍🎓",
    },
    {
      name: "Raihan Khan",
      university: "Dhaka University",
      quote:
        "Using Claude for essay writing improved my grades significantly. My professors commented on the quality of my critical analysis.",
      role: "Literature Student",
      image: "👨‍🎓",
    },
    {
      name: "Priya Das",
      university: "Independent University Bangladesh",
      quote:
        "GitHub Copilot made my programming assignments so much easier. I went from spending 8 hours to 3 hours per assignment.",
      role: "CS Student",
      image: "👩‍💻",
    },
    {
      name: "Zahir Hossain",
      university: "AIUB, Dhaka",
      quote:
        "AI tools helped me prepare for my final exams in just 2 weeks. I scored in the top 10% of my class.",
      role: "Business Student",
      image: "👨‍🎓",
    },
  ];

  const faqs = [
    {
      q: "Is using AI tools for university assignments considered cheating?",
      a: "No, when used correctly. AI is a study tool like calculators or spell-checkers. Most universities now allow AI-assisted work as long as you: 1) Do your own thinking, 2) Use AI to learn concepts, not avoid learning, 3) Disclose AI usage if required by your syllabus, 4) Submit work that represents your understanding. Always check your university's specific AI policy.",
    },
    {
      q: "Which AI tool should I start with as a student?",
      a: "Start with ChatGPT Plus (BDT 499/month). It's the most affordable, works for every subject, and has a massive user base of students sharing study tips. After 2-3 months, add Claude Pro if you're struggling with complex concepts, or GitHub Copilot if you're studying coding.",
    },
    {
      q: "Can I afford AI tools on a student budget?",
      a: "Absolutely. ChatGPT Plus costs only BDT 499/month—less than a fancy coffee. Most students earn this back by improving grades, finishing assignments faster, and earning better exam scores. Many scholarship programs now consider AI subscriptions as legitimate study expenses.",
    },
    {
      q: "Do I need an international credit card to pay?",
      a: "No. We accept bKash, Nagad, Rocket, and other Bangladeshi payment methods. No international card or bank account needed. Order via WhatsApp, pay locally, and receive your login within 5-30 minutes.",
    },
    {
      q: "Can these tools help me prepare for competitive exams like BCS?",
      a: "Yes, very much. ChatGPT and Perplexity are excellent for BCS preparation. They can explain tricky English grammar, solve math problems step-by-step, provide current affairs updates, and give you thousands of practice questions. Many BCS toppers now use AI as part of their prep.",
    },
    {
      q: "What if I switch universities or drop out?",
      a: "You own your login. If you leave university or change schools, your AI subscriptions go with you. No refund needed—pause your subscription anytime. Some students continue using AI tools for self-learning and freelance projects after university.",
    },
  ];

  const budgetPlans = [
    {
      name: `Starter (${taka(stackTotal(["ChatGPT Plus"]) ?? 0)}/month)`,
      tools: ["ChatGPT Plus", "Grammarly Premium"],
      features: [
        "GPT-5.4 access",
        "Essay writing assistance",
        "Math problem solving",
        "Grammar checking",
        "24/7 availability",
      ],
      best: "Perfect for most students",
    },
    {
      name: `Growth (${taka(stackTotal(["ChatGPT Plus", "Claude Pro", "Grammarly Premium"]) ?? 0)}/month)`,
      tools: ["ChatGPT Plus", "Claude Pro", "Grammarly Premium"],
      features: [
        "All Starter features",
        "Advanced concept explanation",
        "200K token context",
        "Better physics/chemistry help",
        "Advanced writing analysis",
      ],
      best: "For engineering & science students",
    },
    {
      name: `Pro (${taka(stackTotal(["ChatGPT Plus", "Claude Pro", "GitHub Copilot Pro", "Grammarly Premium"]) ?? 0)}/month)`,
      tools: ["ChatGPT Plus", "Claude Pro", "GitHub Copilot", "Grammarly Premium"],
      features: [
        "All Growth features",
        "Code assistance",
        "IDE integration",
        "Algorithm help",
        "Full-stack web dev support",
      ],
      best: "For CS & engineering students",
    },
  ];

  return (
    <PageLayout>
      <SEOHead
        title="The Ultimate AI Guide for Bangladesh University Students | BDT 499/month"
        description="Best AI tools for students in Bangladesh 2026. ChatGPT, Claude, Copilot for assignments, research, exams. From BDT 499. No credit card needed—pay with bKash."
        canonical="https://aipremiumshop.com/guides/students"
        ogImage="https://aipremiumshop.com/og-students.jpg"
        jsonLd={[breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Students Guide" }])]}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-16 md:py-24 text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Updated July 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Ultimate AI Guide for Bangladesh University Students
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Write better papers. Study smarter. Ace your exams. The complete guide to using AI tools as a student—no credit card needed.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <MessageCircle className="w-5 h-5" />
              Get Started via WhatsApp
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Browse All Tools
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">2,500+</div>
              <div className="text-sm text-gray-600">Students using our tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">4.9/5</div>
              <div className="text-sm text-gray-600">Average satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">BDT 499</div>
              <div className="text-sm text-gray-600">Starting price</div>
            </div>
          </div>
        </motion.section>

        {/* Problem Statement */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Student Struggle is Real</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Spending 10+ hours on essays that could take 4 hours with AI help</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Struggling to understand complex concepts at midnight when professors aren't available</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Coding assignments taking forever because debugging is tedious</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Anxiety before exams because you're unsure if your notes are complete</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Not having access to premium study tools because international credit cards aren't available</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Solution Section */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How AI Changes Everything</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-8"
            >
              <Book className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Faster Assignments</h3>
              <p>Cut assignment time by 50-70%. ChatGPT and Claude help you brainstorm, draft, and edit essays in half the time.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-lg p-8"
            >
              <Zap className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Better Understanding</h3>
              <p>AI explains concepts in multiple ways until you get it. No more confusion at 2 AM—your tutor is always available.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-8"
            >
              <Award className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Higher Grades</h3>
              <p>Students using AI tools report 0.5-1.0 GPA improvement. Better writing, fewer mistakes, more time for studying.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-lg p-8"
            >
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Less Stress</h3>
              <p>Exam prep becomes manageable. Mock tests, study guides, concept explanations—AI creates them in minutes.</p>
            </motion.div>
          </div>
        </section>

        {/* Top 5 Tools */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Top 5 AI Tools for Students</h2>

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
                  <a className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
                    View Details <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Success Stories from Bangladesh Students</h2>

            <p className="text-sm text-gray-500 text-center -mt-8 mb-10">Illustrative examples of how customers in Bangladesh typically use these tools — representative scenarios, not verified individual reviews.</p>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-8 border-l-4 border-blue-600"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{testimonial.image}</div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.university}</div>
                      <div className="text-sm text-blue-600 font-medium">{testimonial.role}</div>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Budget Plans for Every Student</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {budgetPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`rounded-lg p-8 ${idx === 1 ? "bg-blue-600 text-white border-4 border-blue-600" : "bg-white border-2 border-gray-200"}`}
              >
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className={idx === 1 ? "text-blue-100" : "text-gray-600"}>{plan.best}</p>

                <ul className="space-y-3 my-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 items-start">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${idx === 1 ? "text-blue-200" : "text-blue-600"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center font-bold py-3 rounded-lg transition ${
                    idx === 1 ? "bg-white text-blue-600 hover:bg-gray-50" : "bg-blue-600 text-white hover:bg-blue-700"
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
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

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

        {/* How to Get Started */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Get Started in 3 Minutes</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Choose Your Plan</h3>
              <p className="text-gray-600">Pick from Starter (BDT 499), Growth (BDT 1,498), or Pro (BDT 2,293)</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Message WhatsApp</h3>
              <p className="text-gray-600">Click the button below and tell us which plan you want</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Pay & Access</h3>
              <p className="text-gray-600">Pay via bKash/Nagad, receive login in 5-30 minutes</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Start Your AI Journey
            </a>
          </div>
        </section>

        {/* Related Guides */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">More Guides for You</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/guides/freelancers">
                <a className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition">
                  <div className="text-3xl mb-3">💼</div>
                  <h3 className="font-bold text-gray-900 mb-2">Freelancers Guide</h3>
                  <p className="text-gray-600 text-sm">Earn 44% more with AI tools</p>
                </a>
              </Link>

              <Link href="/guides/creators">
                <a className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition">
                  <div className="text-3xl mb-3">🎬</div>
                  <h3 className="font-bold text-gray-900 mb-2">Creators Guide</h3>
                  <p className="text-gray-600 text-sm">YouTube, TikTok, Instagram AI tools</p>
                </a>
              </Link>

              <Link href="/guides/smallbusiness">
                <a className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition">
                  <div className="text-3xl mb-3">🏪</div>
                  <h3 className="font-bold text-gray-900 mb-2">SMB Guide</h3>
                  <p className="text-gray-600 text-sm">Run your business 24/7 with AI</p>
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white max-w-4xl mx-auto rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Study Game?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join 2,500+ Bangladesh students using AI to ace their exams and submit better work.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Order via WhatsApp Now
          </a>
        </section>
      </div>
    </PageLayout>
  );
}
