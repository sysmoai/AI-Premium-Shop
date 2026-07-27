import { motion } from "framer-motion";
import { MessageCircle, Users, Star, Quote } from "lucide-react";

const WHATSAPP_COMMUNITY = "https://chat.whatsapp.com/LKHNCYz05MrA0j6uX272Zc";
const WHATSAPP_DIRECT = "https://wa.me/8801865385348";

const TESTIMONIALS = [
  {
    name: "Rafiq Hasan",
    role: "Freelance Web Developer, Dhaka",
    quote: "I was paying $20/mo for ChatGPT Plus with my international card. Now I pay BDT 350 through AIPS — same account, same features. Saved 80% and got it in 10 minutes on WhatsApp.",
    rating: 5,
    tool: "ChatGPT Plus",
    highlight: "Saved 80% on AI costs",
  },
  {
    name: "Nusrat Jahan",
    role: "Content Creator, Sylhet",
    quote: "Midjourney changed my thumbnail game completely. My clients now ask 'which designer did this?' I tell them it's AI — they don't believe me. AIPS delivered my account in 8 minutes.",
    rating: 5,
    tool: "Midjourney",
    highlight: "Thumbnail quality improved 10x",
  },
  {
    name: "Tanvir Ahmed",
    role: "Startup Founder, Dhaka",
    quote: "We use Claude Pro for our entire codebase. AIPS gave us a team account at half the official price. 30-day warranty gave us the confidence to try. Been using for 6 months now.",
    rating: 5,
    tool: "Claude Pro",
    highlight: "6 months, zero downtime",
  },
  {
    name: "Fatima Begum",
    role: "University Student, Rajshahi",
    quote: "I was struggling with research papers. ChatGPT Plus from AIPS changed everything — it writes my outlines, summarizes articles, and even checks grammar. My CGPA went from 2.8 to 3.4.",
    rating: 5,
    tool: "ChatGPT Plus",
    highlight: "CGPA 2.8 → 3.4",
  },
  {
    name: "Kabir Hossain",
    role: "Freelance Graphic Designer, Chattogram",
    quote: "Canva Pro + Midjourney combo from AIPS costs me less than one freelance project. I now deliver 3x faster and charge premium rates. The WhatsApp support is incredibly fast.",
    rating: 5,
    tool: "Canva Pro + Midjourney",
    highlight: "3x faster delivery",
  },
  {
    name: "Shahidul Islam",
    role: "AI Enthusiast, Bogura",
    quote: "I was skeptical about buying from a local shop. But the 30-day warranty convinced me to try. Now I've subscribed to 3 tools through AIPS. Never had a single issue in 4 months.",
    rating: 5,
    tool: "Multiple tools",
    highlight: "4 months, zero issues",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-current" : "fill-none"}`}
          style={{ color: i < rating ? "#f4b942" : "#3a3f5c" }}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24 px-4"
      style={{ backgroundColor: "#151b3d" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#f4b942" }}
          >
            Real Reviews
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-white mb-3"
          >
            Trusted by 3,000+ Customers Across Bangladesh
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm max-w-2xl mx-auto"
            style={{ color: "#c9ceda" }}
          >
            Real people, real results. From students in Rajshahi to founders in Dhaka — here's what our customers say about AI Premium Shop.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="relative p-6 rounded-2xl border transition-all duration-300"
              style={{
                backgroundColor: "rgba(10,14,39,0.6)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-4 right-4 w-8 h-8 opacity-20"
                style={{ color: "#f4b942" }}
              />
              
              {/* Stars */}
              <StarRating rating={testimonial.rating} />
              
              {/* Highlight badge */}
              <div
                className="inline-block mt-3 mb-3 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(244,185,66,0.12)",
                  color: "#f4b942",
                }}
              >
                {testimonial.highlight}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#c9ceda" }}>
                "{testimonial.quote}"
              </p>

              {/* Divider */}
              <div className="h-px w-full mb-3" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />

              {/* Name, Role, Tool */}
              <div>
                <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "#8a8fb0" }}>{testimonial.role}</p>
                <p className="text-xs mt-1" style={{ color: "#f4b942" }}>
                  Using: {testimonial.tool}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { value: "3,000+", label: "Happy Customers", sub: "Since 2024" },
            { value: "80+", label: "AI Tools", sub: "8 Categories" },
            { value: "30 Days", label: "Warranty", sub: "Full Replacement" },
            { value: "5-15 min", label: "Delivery", sub: "After Payment" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-xl border"
              style={{
                backgroundColor: "rgba(10,14,39,0.4)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm mt-1" style={{ color: "#f4b942" }}>{stat.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#8a8fb0" }}>{stat.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Community Cards (original) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.a
            href={WHATSAPP_COMMUNITY}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="group flex flex-col items-center text-center p-8 rounded-2xl border cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: "rgba(37,211,102,0.06)",
              borderColor: "rgba(37,211,102,0.25)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "rgba(37,211,102,0.15)" }}
            >
              <Users className="w-8 h-8" style={{ color: "#25d366" }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">WhatsApp Community</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#c9ceda" }}>
              Connect with 500+ AI users in Bangladesh. Share tips, ask questions, and get peer support on which tools work best.
            </p>
            <span
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-opacity group-hover:opacity-90"
              style={{ backgroundColor: "#25d366", color: "#fff" }}
            >
              <Users className="w-4 h-4" />
              Join 500+ Members
            </span>
          </motion.a>

          <motion.a
            href={WHATSAPP_DIRECT}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="group flex flex-col items-center text-center p-8 rounded-2xl border cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: "rgba(244,185,66,0.05)",
              borderColor: "rgba(244,185,66,0.2)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "rgba(244,185,66,0.1)" }}
            >
              <MessageCircle className="w-8 h-8" style={{ color: "#f4b942" }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ask Us Anything</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#c9ceda" }}>
              Unsure which plan is right for you? Message us on WhatsApp. We'll recommend the right tool for your specific work and budget — no sales pressure.
            </p>
            <span
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-opacity group-hover:opacity-90"
              style={{ backgroundColor: "#f4b942", color: "#0a0e27" }}
            >
              <MessageCircle className="w-4 h-4" />
              Ask on WhatsApp
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}