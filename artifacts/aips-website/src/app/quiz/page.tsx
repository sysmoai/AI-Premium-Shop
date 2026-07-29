import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "AI Tools Quiz - Find Your Perfect Match | AI Premium Shop",
  description: "Take our interactive quiz to find the perfect AI tools for your needs. 2-minute quiz recommends tools based on your role.",
  canonical: "https://aipremiumshop.com/quiz",
});

const segments = [
  {
    icon: "🎓",
    title: "Student",
    description: "Need help with assignments, research, coding",
    href: "/best-ai-for-students",
  },
  {
    icon: "💼",
    title: "Freelancer",
    description: "Work on Upwork/Fiverr, need productivity boost",
    href: "/best-ai-for-freelancers",
  },
  {
    icon: "🎬",
    title: "Content Creator",
    description: "Make videos, designs, written content",
    href: "/best-ai-for-creators",
  },
  {
    icon: "🏢",
    title: "Business Owner",
    description: "Running my own small business",
    href: "/best-ai-for-business",
  },
  {
    icon: "👨‍🏫",
    title: "Teacher/Educator",
    description: "Teaching students or creating courses",
    href: "/best-ai-for-teachers",
  },
];

export default function QuizPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Quiz", path: "/quiz" }]} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12 sm:py-16">
          <div className="text-center">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">
              Quick Quiz
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
              Find Your Perfect AI Tools
            </h1>
            <p className="mt-4 text-lg leading-7 text-[#8a91a8]">
              Answer 2 quick questions and we&apos;ll recommend the best AI subscriptions for your needs
            </p>
          </div>

          {/* Quiz Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Which describes you best?</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {segments.map((segment, idx) => (
                <Link
                  key={idx}
                  href={segment.href}
                  className="group"
                >
                  <div className="glass-card rounded-xl p-6 border border-white/[0.06] hover:border-[#f4b942]/20 transition-all hover:bg-white/[0.05]">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{segment.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white group-hover:text-[#f4b942] transition text-lg">
                          {segment.title}
                        </h3>
                        <p className="text-sm text-[#8a91a8] mt-2">
                          {segment.description}
                        </p>
                      </div>
                      <ArrowRight className="size-5 text-[#f4b942] flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Why Take Quiz Section */}
          <div className="mt-16 p-6 rounded-xl border border-[#f4b942]/10 bg-[#f4b942]/[0.03]">
            <h3 className="text-lg font-semibold text-white mb-4">Why take this quiz?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-[#f4b942] flex-shrink-0 mt-0.5" />
                <span className="text-[#8a91a8]">Get personalized AI tool recommendations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-[#f4b942] flex-shrink-0 mt-0.5" />
                <span className="text-[#8a91a8]">Find the best tools for your budget</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-[#f4b942] flex-shrink-0 mt-0.5" />
                <span className="text-[#8a91a8]">Save time finding the right solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-[#f4b942] flex-shrink-0 mt-0.5" />
                <span className="text-[#8a91a8]">Get instant WhatsApp support after ordering</span>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-12 flex justify-center">
            <a
              href={`https://wa.me/8801865385348?text=${encodeURIComponent("Hi, I need help choosing the right AI tools for my needs. Can you guide me?")}`}
              className="btn-whatsapp h-12 px-8 text-[0.875rem]"
            >
              <MessageCircle className="size-4" /> Talk to an expert on WhatsApp <ArrowRight className="size-4" />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
