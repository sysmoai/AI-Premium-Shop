import { useState } from "react";
import { stackTotal, taka, cheapestPriceFor } from "@/lib/catalogStats";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  BookOpen,
  BarChart3,
  Zap,
  Award,
  Brain,
} from "lucide-react";
import { Link } from "wouter";
import { productPath } from "@/lib/productRoutes";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { breadcrumbSchema } from "@/utils/schemas";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20order%20an%20AI%20subscription";

export default function EducatorsGuide() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const tools = [
    {
      rank: 1,
      name: "ChatGPT Plus",
      slug: "chatgpt-plus-bangladesh",
      price: "BDT 999/month",
      description:
        "Your lesson planning assistant. Generate lesson plans, create quiz questions, explain concepts in student-friendly ways, draft grading feedback, and prepare assessment materials. Works for all subjects and grades.",
      useCases: ["Lesson planning", "Quiz generation", "Feedback writing", "Concept explanation", "Assessment design"],
      badge: "Essential",
      color: "#10a37f",
    },
    {
      rank: 2,
      name: "Claude Pro",
      slug: "claude-pro-bangladesh",
      price: `from ${taka(cheapestPriceFor("claude-pro-bangladesh") ?? 0)}/month`,
      description:
        "Best for deep concept explanation. Claude excels at breaking down complex topics for different learning levels. Perfect for creating supplementary materials, writing detailed feedback, and explaining difficult subjects.",
      useCases: ["Concept breakdown", "Detailed feedback", "Study guides", "Complex subjects", "Enrichment materials"],
      badge: "For Teaching",
      color: "#d97706",
    },
    {
      rank: 3,
      name: "Midjourney",
      slug: "midjourney-bangladesh",
      price: "BDT 1,199/month",
      description:
        "Create educational visuals for lessons. Generate illustrations, diagrams, concept maps, and infographics to make lessons more engaging. Students learn better with visuals.",
      useCases: ["Lesson illustrations", "Concept diagrams", "Infographics", "Visual aids", "Student engagement"],
      badge: "For Visuals",
      color: "#8b5cf6",
    },
    {
      rank: 4,
      name: "Notion AI",
      slug: "notion-ai-bangladesh",
      price: `from ${taka(cheapestPriceFor("notion-ai-bangladesh") ?? 0)}/month`,
      description:
        "Build your lesson management system. Create syllabi, track student progress, organize assignments, and build a resource library. AI helps organize and structure everything.",
      useCases: ["Syllabus creation", "Progress tracking", "Assignment management", "Resource library", "Class organization"],
      badge: "For Organization",
      color: "#000000",
    },
    {
      rank: 5,
      name: "Canva Pro",
      slug: "canva-pro-bangladesh",
      price: "BDT 399/month",
      description:
        "Design professional presentations, handouts, and course materials. Thousands of education templates. Create engaging slide decks and printable materials without design skills.",
      useCases: ["Presentations", "Handouts", "Posters", "Certificates", "Visual materials"],
      badge: "Easy Design",
      color: "#3b82f6",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Karim Hassan",
      institution: "Dhaka University",
      quote:
        "AI lesson planning tools saved me 15 hours per week. I can now spend more time mentoring students instead of creating materials. Student satisfaction increased by 40%.",
      role: "Professor",
      image: "👨‍🏫",
    },
    {
      name: "Shirin Aktar",
      institution: "BRAC School, Dhaka",
      quote:
        "Using AI for grading feedback means I can provide personalized comments to all 60 students instead of generic feedback. They say my feedback is the most helpful they've ever received.",
      role: "School Teacher",
      image: "👩‍🏫",
    },
    {
      name: "Rashid Ali",
      institution: "Online Tutoring Platform",
      quote:
        "AI generates quiz questions in seconds. I used to spend 2 hours creating assessments. Now it's 15 minutes. Quality is actually better because AI generates varied question types.",
      role: "Tutor",
      image: "👨‍🏫",
    },
    {
      name: "Nida Fatima",
      institution: "Private Institute",
      quote:
        "My students now have unlimited practice materials. AI creates variations of questions so they don't get bored. Exam scores improved because they practice more.",
      role: "Educator",
      image: "👩‍🏫",
    },
  ];

  const faqs = [
    {
      q: "Is using AI tools ethical in education?",
      a: "Yes, when used appropriately. AI should enhance teaching, not replace it. Use AI to create better materials, provide personalized feedback, and manage administrative tasks. The teacher's role is to guide, inspire, and mentor—which is more important than ever with AI. Most educational institutions now encourage AI use for teacher productivity.",
    },
    {
      q: "Will AI replace teachers?",
      a: "No. AI can generate content, but only teachers can inspire, motivate, and build relationships with students. AI handles the repetitive work (grading, material creation) so teachers can focus on the irreplaceable human aspects of teaching.",
    },
    {
      q: "Which tool should teachers start with?",
      a: "Start with ChatGPT Plus (BDT 999). Use it for lesson planning, quiz generation, and feedback writing for one week. If you see value, add Claude Pro for deeper concept explanation, and Midjourney for visual materials.",
    },
    {
      q: "Can I use AI-generated content directly in classes?",
      a: "Yes, mostly. AI-generated lesson plans, quizzes, and explanations are excellent starting points. Always review and personalize them. For visuals, AI-generated illustrations work great for student engagement.",
    },
    {
      q: "How much time can educators save?",
      a: "On average, educators save 10-15 hours per week: 5 hours on lesson planning, 4 hours on grading feedback, 3 hours on quiz creation, 2 hours on administrative tasks. That's time you can spend on actual teaching and student interaction.",
    },
    {
      q: "Do students notice if materials are AI-assisted?",
      a: "Not if you personalize them. AI is a starting point. Teachers then add context, examples from class, and personalization. Students care about quality and relevance—which actually improves with AI assistance.",
    },
  ];

  const budgetPlans = [
    {
      name: `Starter (${taka(stackTotal(["ChatGPT Plus", "Canva Pro"]) ?? 0)}/month)`,
      tools: ["ChatGPT Plus", "Canva Pro"],
      features: [
        "Lesson planning",
        "Quiz generation",
        "Feedback writing",
        "Presentation design",
        "Visual materials",
      ],
      best: "Perfect for most teachers",
    },
    {
      name: `Growth (${taka(stackTotal(["ChatGPT Plus", "Claude Pro", "Midjourney Standard", "Canva Pro"]) ?? 0)}/month)`,
      tools: ["ChatGPT Plus", "Claude Pro", "Midjourney", "Canva Pro"],
      features: [
        "All Starter features",
        "Deep concept explanation",
        "Educational illustrations",
        "Study guide creation",
        "Enrichment materials",
      ],
      best: "For multiple subjects",
    },
    {
      name: `Pro (${taka(stackTotal(["ChatGPT Plus", "Claude Pro", "Midjourney Standard", "Notion AI", "Canva Pro"]) ?? 0)}/month)`,
      tools: ["ChatGPT Plus", "Claude Pro", "Midjourney", "Notion AI", "Canva Pro"],
      features: [
        "All Growth features",
        "Complete lesson management",
        "Progress tracking",
        "Student database",
        "Full educator stack",
      ],
      best: "For institutions",
    },
  ];

  return (
    <PageLayout>
      <SEOHead
        title="AI Teaching Toolkit: Create Better Lessons, Grade Faster | Bangladesh"
        description="Best AI tools for educators in Bangladesh 2026. Lesson planning, assessment, grading. Increase student engagement 40%. From BDT 399/month."
        canonical="https://aipremiumshop.com/guides/educators"
        hreflang={{ en: "/guides/educators", bn: "/educators-bn" }}
        ogImage="https://aipremiumshop.com/og-educators.jpg"
        jsonLd={[breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Educators Guide" }])]}
      />

      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-16 md:py-24 text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full mb-6">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">Save 15 Hours/Week • Updated July 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Teaching Toolkit: Create Better Lessons, Grade Faster
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Automate lesson planning and grading. Engage students more. Spend time on what matters—mentoring and inspiring.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-violet-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-violet-700 transition"
            >
              <MessageCircle className="w-5 h-5" />
              Get Started Now
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
              <div className="text-3xl font-bold text-violet-600">15 hours</div>
              <div className="text-sm text-gray-600">Time saved per week</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-violet-600">550+</div>
              <div className="text-sm text-gray-600">Educators using us</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-violet-600">+40%</div>
              <div className="text-sm text-gray-600">Student engagement boost</div>
            </div>
          </div>
        </motion.section>

        {/* Problem */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <div className="bg-red-50 rounded-lg p-8 border-l-4 border-red-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Teacher's Burnout Reality</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Spending 5+ hours per week creating lesson plans and materials</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Grading 60+ assignment papers takes 4+ hours, giving only generic feedback</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Creating quiz questions from scratch is tedious and time-consuming</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>No time for actual mentoring and one-on-one student support</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Lessons feel repetitive because you're too busy to innovate</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Solution */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How AI Transforms Teaching</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-violet-500 to-violet-600 text-white rounded-lg p-8"
            >
              <BookOpen className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Better Lessons</h3>
              <p>AI creates diverse, engaging lesson materials in minutes. You spend the time saved on mentoring and student interaction, not material creation.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-8"
            >
              <BarChart3 className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Higher Engagement</h3>
              <p>Visually rich lessons, varied question types, and quick feedback keep students engaged. Engagement increases by 40% on average.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-8"
            >
              <Award className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Personalized Feedback</h3>
              <p>AI helps create personalized comments for every student. Feedback is more detailed, actionable, and timely. Students feel seen and valued.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-lg p-8"
            >
              <Zap className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Reduced Burnout</h3>
              <p>Save 15 hours per week on administrative tasks. Use that time for actual teaching, student support, and professional development—not endless grading.</p>
            </motion.div>
          </div>
        </section>

        {/* Top 5 Tools */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Top 5 AI Tools for Educators</h2>

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
                  <a className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:text-violet-700">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Success Stories from Bangladesh Educators</h2>

            <p className="text-sm text-gray-500 text-center -mt-8 mb-10">Illustrative examples of how customers in Bangladesh typically use these tools — representative scenarios, not verified individual reviews.</p>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-8 border-l-4 border-violet-600"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{testimonial.image}</div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.institution}</div>
                      <div className="text-sm text-violet-600 font-medium">{testimonial.role}</div>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Educator Plans</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {budgetPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`rounded-lg p-8 ${idx === 1 ? "bg-violet-600 text-white border-4 border-violet-600" : "bg-white border-2 border-gray-200"}`}
              >
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className={idx === 1 ? "text-violet-100" : "text-gray-600"}>{plan.best}</p>

                <ul className="space-y-3 my-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 items-start">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${idx === 1 ? "text-violet-200" : "text-violet-600"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center font-bold py-3 rounded-lg transition ${
                    idx === 1 ? "bg-white text-violet-600 hover:bg-gray-50" : "bg-violet-600 text-white hover:bg-violet-700"
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
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Educator FAQs</h2>

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
        <section className="px-4 py-16 bg-gradient-to-r from-violet-600 to-violet-700 text-white max-w-4xl mx-auto rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Reclaim Your Time. Transform Your Teaching.</h2>
          <p className="text-violet-100 mb-8 text-lg">
            550+ educators in Bangladesh are already using AI to teach better and work less. Your students deserve better. You deserve better.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-violet-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Get Started Teaching Smarter
          </a>
        </section>
      </div>
    </PageLayout>
  );
}
