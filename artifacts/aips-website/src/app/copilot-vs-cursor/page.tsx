import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "GitHub Copilot vs Cursor Pro in Bangladesh — Best AI Code Editor?",
  description:
    "GitHub Copilot vs Cursor Pro for Bangladeshi developers. Compare features, pricing in BDT, and which AI code editor boosts productivity more. bKash payment available.",
  canonical: "https://aipremiumshop.com/copilot-vs-cursor",
});

const faqItems = [
  {
    question: "Which AI code editor is best for Bangladeshi developers?",
    answer:
      "Cursor Pro is best for developers who want an AI-native editor with codebase-wide understanding and agentic editing. GitHub Copilot is ideal if you prefer keeping your existing IDE (VS Code, JetBrains) and want proven inline completions.",
  },
  {
    question: "Can I pay for GitHub Copilot or Cursor Pro with bKash?",
    answer:
      "Neither GitHub nor Cursor accepts bKash directly. AI Premium Shop is a local reseller in Bangladesh — pay via bKash, Nagad, or Rocket and receive your subscription within 15 minutes.",
  },
  {
    question: "Does Cursor Pro work offline in Bangladesh?",
    answer:
      "Cursor Pro requires an internet connection for AI features. However, the editor itself works offline for local coding. Ensure a stable connection for the best AI-assisted experience.",
  },
  {
    question: "Is GitHub Copilot enough for web development in Bangladesh?",
    answer:
      "Yes. GitHub Copilot excels at HTML, CSS, JavaScript, React, Next.js, and Node.js — the most common stacks for Bangladeshi freelancers and agencies.",
  },
  {
    question: "Can students in Bangladesh get a discount on Copilot or Cursor?",
    answer:
      "GitHub offers free Copilot for verified students via GitHub Education. Cursor does not currently offer student discounts in Bangladesh. AI Premium Shop provides the most affordable local pricing for both tools.",
  },
];

export default function CopilotVsCursorPage() {
  return (
    <>
      <FAQPageJsonLd items={faqItems} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Copilot vs Cursor", path: "/copilot-vs-cursor" },
        ]}
      />
      <main className="min-h-screen  text-white">
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            GitHub Copilot vs Cursor Pro in Bangladesh
          </h1>
          <p className="mt-4 text-lg leading-7 text-[#8a91a8]">
            For developers, CS students, and startup founders in Bangladesh. Prices in BDT.
          </p>

          {/* AIO Answer Block */}
          <div className="mt-6 p-4 rounded-xl border border-[#f4b942]/10 bg-[#f4b942]/[0.03]">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#f4b942]">Quick Answer</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-[#c9ceda]">
              **GitHub Copilot (from BDT 1,495/mo)** integrates deeply with VS Code/JetBrains and has the largest training dataset. **Cursor Pro (from BDT 2,990/mo)** is the most powerful AI-native editor with codebase-wide understanding, agentic editing, and multi-model support. Both available at AI Premium Shop with bKash/Nagad.
            </p>
          </div>

          {/* Bangla block */}
          <div className="mt-6 p-4 rounded-xl border border-white/[0.04] bg-white/[0.02]">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280] mb-2">বাংলা</p>
            <p className="text-[0.875rem] leading-relaxed text-[#8a91a8]">
              **GitHub Copilot (BDT 1,495/মাস থেকে)** — VS Code/JetBrains IDE-তে সেরা অটোকমপ্লিট। **Cursor Pro (BDT 2,990/মাস থেকে)** — এজেন্টিক কোডিং সহ সবচেয়ে শক্তিশালী AI-native এডিটর। bKash/Nagad পেমেন্ট।
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-white/[0.06] glass-card p-6">
            <h2 className="text-lg font-semibold text-white">Quick Answer</h2>
            <p className="mt-2 text-[#8a91a8]">
              <strong>Choose GitHub Copilot</strong> (৳1,495–৳5,831/mo) if you want deep IDE
              integration, the largest training dataset, and seamless GitHub workflow.
              <strong>Choose Cursor Pro</strong> (৳2,990–৳8,970/mo) if you want the most
              powerful AI-native code editor with codebase-wide understanding and agentic editing.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="py-3 pr-4 font-semibold text-white">Feature</th>
                  <th className="py-3 pr-4 font-semibold text-white">GitHub Copilot</th>
                  <th className="py-3 pr-4 font-semibold text-white">Cursor Pro</th>
                </tr>
              </thead>
              <tbody className="text-[#8a91a8]">
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 pr-4 font-medium">Price (BD)</td>
                  <td className="py-3 pr-4">৳1,495 – ৳5,831/mo</td>
                  <td className="py-3 pr-4">৳2,990 – ৳8,970/mo</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 pr-4 font-medium">Best For</td>
                  <td className="py-3 pr-4">Inline completions, GitHub integration</td>
                  <td className="py-3 pr-4">Full AI-native editor experience</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 pr-4 font-medium">IDE</td>
                  <td className="py-3 pr-4">VS Code, JetBrains, Vim, Neovim</td>
                  <td className="py-3 pr-4">Cursor (VS Code fork) only</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 pr-4 font-medium">Codebase Understanding</td>
                  <td className="py-3 pr-4">Good (file-level context)</td>
                  <td className="py-3 pr-4">Excellent (entire codebase indexing)</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 pr-4 font-medium">Agentic Editing</td>
                  <td className="py-3 pr-4">Limited (Copilot Edits)</td>
                  <td className="py-3 pr-4">Advanced (Composer, Agent mode)</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 pr-4 font-medium">Models</td>
                  <td className="py-3 pr-4">GPT-4o, o1, o3-mini, Claude 3.5</td>
                  <td className="py-3 pr-4">GPT-4o, Claude 3.7, Sonnet, custom models</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-white/[0.06] glass-card p-6">
              <h3 className="text-xl font-semibold text-white">GitHub Copilot</h3>
              <p className="mt-2 text-2xl font-bold text-white">৳1,495/mo</p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi AI Premium Shop, I want GitHub Copilot.")}`}
                className="mt-4 inline-flex h-10 items-center justify-center btn-primary px-4 text-[0.8125rem]"
              >
                Order Copilot
              </a>
            </div>
            <div className="rounded-lg border border-white/[0.06] glass-card p-6">
              <h3 className="text-xl font-semibold text-white">Cursor Pro</h3>
              <p className="mt-2 text-2xl font-bold text-white">৳2,990/mo</p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}?text=${encodeURIComponent("Hi AI Premium Shop, I want Cursor Pro.")}`}
                className="mt-4 inline-flex h-10 items-center justify-center btn-primary px-4 text-[0.8125rem]"
              >
                Order Cursor Pro
              </a>
            </div>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-white">Frequently Asked Questions</h2>
            <dl className="mt-6 space-y-4">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-white/[0.06] glass-card p-6 transition hover:border-[#f4b942]/20"
                >
                  <dt className="text-lg font-semibold text-white">{item.question}</dt>
                  <dd className="mt-2 leading-7 text-[#8a91a8]">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </main>
    </>
  );
}
