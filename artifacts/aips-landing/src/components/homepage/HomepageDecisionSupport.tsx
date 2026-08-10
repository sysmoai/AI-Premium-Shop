import { ArrowRight, BookOpen, CircleHelp, CreditCard, Languages, ShieldCheck, Sparkles } from "lucide-react";
import type { PublicHomepageView } from "@/lib/homepageV2";

const CATEGORY_LINKS = [
  { href: "/ai-assistant", label: "AI assistants", description: "General research, reasoning and everyday AI workflows." },
  { href: "/ai-image", label: "Image AI", description: "Generate, edit and explore visual concepts." },
  { href: "/ai-video", label: "Video AI", description: "Generate and edit video with specialist AI tools." },
  { href: "/ai-code", label: "Coding AI", description: "Code assistance, review, debugging and development workflows." },
  { href: "/ai-workspace", label: "Workspace AI", description: "Docs, knowledge, productivity and team workflows." },
  { href: "/ai-writing", label: "Writing AI", description: "Writing, editing, marketing and content workflows." },
  { href: "/ai-design", label: "Design AI", description: "Design, presentation and creative production tools." },
  { href: "/bundles", label: "Bundles", description: "AIPS-curated combinations where the package record explicitly lists what is included." },
] as const;

const LEARNING_LINKS = [
  {
    href: "/guides",
    eyebrow: "Guides",
    title: "Choose by job, not hype",
    description: "Start with practical guides for students, freelancers, creators and businesses.",
    icon: BookOpen,
  },
  {
    href: "/chatgpt-vs-claude-bangladesh",
    eyebrow: "Comparison",
    title: "ChatGPT vs Claude",
    description: "Compare two major AI assistants before choosing a plan.",
    icon: Sparkles,
  },
  {
    href: "/bn",
    eyebrow: "বাংলা",
    title: "Bangla buying guidance",
    description: "Explore AIPS guidance and discovery paths in Bangla.",
    icon: Languages,
  },
] as const;

interface HomepageDecisionSupportProps {
  data: PublicHomepageView;
  commerceEnabled: boolean;
  whatsappHref: string;
}

export function HomepageDecisionSupport({ data, commerceEnabled, whatsappHref }: HomepageDecisionSupportProps) {
  const paymentLabels = data.payments.map((payment) => payment.label);
  const paymentText = paymentLabels.length
    ? `The current public projection lists ${paymentLabels.join(" and ")} as approved payment methods.`
    : "Payment methods are not being asserted on this page until an approved public fact is available.";

  const faq = [
    {
      question: "What is the difference between Personal, Shared, Bundle and Service access?",
      answer: "They describe materially different buying arrangements. Personal or dedicated access is intended for one customer where the product record supports it; Shared access can involve multiple users and additional privacy, continuity or provider-policy considerations; Bundles combine listed tools or services; Service means AIPS is providing setup, implementation or advisory work rather than a conventional subscription login. Always review the exact product record before paying.",
    },
    {
      question: "How do I know the current price and availability?",
      answer: commerceEnabled
        ? "Use the current product page and its public plan state. When a plan is marked to check the current price, confirm the exact price and access details before payment instead of relying on an older screenshot or message."
        : "Commercial details are currently withheld by the publication state. Use the informational catalog and support path until an approved commercial projection is available.",
    },
    {
      question: "Which local payment methods are currently shown by AIPS?",
      answer: paymentText,
    },
    {
      question: "Can I use a Shared plan for sensitive, private or client work?",
      answer: "Treat access model and provider privacy terms as part of the buying decision. Shared access can carry additional privacy and continuity implications, so sensitive work should use an arrangement whose ownership, privacy and provider terms meet your requirements.",
    },
    {
      question: "What happens if access or activation has a problem?",
      answer: "Use the AIPS support path with the exact product and order details. Resolution should follow the product-specific terms and the currently published support, refund or replacement policy rather than a generic homepage promise.",
    },
    {
      question: "Does seeing a provider or product on AIPS mean the provider officially authorizes AIPS?",
      answer: "Do not infer provider authorization from a product listing, logo or mention alone. Where authorization, affiliation or a provider-side fact matters, rely on explicit documentation and the provider source rather than an implied homepage claim.",
    },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8" data-testid="homepage-v2-browse-universe">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f4b942]">Explore the AI universe</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Browse by capability when you already know the category</h2>
            <p className="mt-4 leading-7 text-slate-300">The guided finder is the fastest path for most buyers. Category routes remain available for people who already know what type of AI they need.</p>
          </div>
          <a href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#f4b942]">
            Browse full catalog <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_LINKS.map((category) => (
            <a key={category.href} href={category.href} className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:-translate-y-0.5 hover:border-[#f4b942]/35 hover:bg-white/[0.04]">
              <h3 className="font-semibold text-white">{category.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{category.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f4b942]">
                Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0a1427]" data-testid="homepage-v2-buying-flow">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f4b942]">Buying in Bangladesh</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A buying flow that exposes the important facts before payment</h2>
            <p className="mt-4 leading-7 text-slate-300">Delivery and activation can vary by product, so the homepage does not turn one product’s timing into a universal promise.</p>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <li className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#f4b942]">01 · Need</span>
              <h3 className="mt-3 font-semibold text-white">Start with the job</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">Use the finder or a guide to narrow the catalog to tools that fit the work you actually need to do.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#f4b942]">02 · Access</span>
              <h3 className="mt-3 font-semibold text-white">Check the exact arrangement</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">Review the product, plan, access model and any product-specific caution before treating two prices as equivalent.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#f4b942]">03 · Confirm</span>
              <h3 className="mt-3 font-semibold text-white">Confirm current commercial facts</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">Use the current product state for price, availability and product-specific activation or delivery information. Request-price items require confirmation.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#f4b942]">04 · Pay & support</span>
              <h3 className="mt-3 font-semibold text-white">Use an approved payment path</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{paymentText} Keep product/order details for support and policy handling.</p>
            </li>
          </ol>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/how-to-order" className="inline-flex items-center gap-2 rounded-xl bg-[#f4b942] px-5 py-3 text-sm font-bold text-[#07101f]">
              How to order <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/support" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white">
              Support
            </a>
            <a href="/refund-policy" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white">
              Refund policy
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8" data-testid="homepage-v2-why-aips">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4b942]/10 text-[#f4b942]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">Why AIPS should help you decide, not just list products</h2>
            <p className="mt-4 leading-7 text-slate-300">AIPS is being structured around AI-specific decision support for Bangladesh: use case first, commercial facts second, and explicit uncertainty when a fact is not approved.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <Sparkles className="h-5 w-5 text-[#f4b942]" />
              <h3 className="mt-4 font-semibold text-white">AI-focused discovery</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">Start from the workflow and move to a short list instead of treating every product as equally relevant.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <CreditCard className="h-5 w-5 text-[#f4b942]" />
              <h3 className="mt-4 font-semibold text-white">Access before price</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">Personal, Shared, Bundle and Service are surfaced as buying facts because the cheapest number can hide a different arrangement.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <CircleHelp className="h-5 w-5 text-[#f4b942]" />
              <h3 className="mt-4 font-semibold text-white">Unknown stays unknown</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">When a protected commercial or trust fact is not approved, the public projection is designed to omit or degrade it rather than fill the gap with marketing copy.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0a1427]" data-testid="homepage-v2-learning-hub">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f4b942]">Learn before you buy</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Decision-ready guides and comparisons</h2>
            <p className="mt-4 leading-7 text-slate-300">Use AIPS as a learning path when you are not ready to choose a product yet.</p>
          </div>
          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {LEARNING_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.href} href={item.href} className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-0.5 hover:border-[#f4b942]/35">
                  <Icon className="h-5 w-5 text-[#f4b942]" />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{item.eyebrow}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f4b942]">
                    Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 md:px-8" data-testid="homepage-v2-faq">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f4b942]">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Questions that materially affect the buying decision</h2>
        </div>
        <div className="mt-9 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
          {faq.map((item) => (
            <details key={item.question} className="group p-5 sm:p-6">
              <summary className="cursor-pointer list-none pr-8 font-semibold text-white marker:content-none">
                {item.question}
              </summary>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-[#f4b942]">
            Open full FAQ <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#050b16]" data-testid="homepage-v2-final-cta">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f4b942]">Next step</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Choose with context, not just a price tag</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">Use the finder for a short list, open the learning hub if you need more context, or ask AIPS about the exact product and access arrangement you are considering.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#finder" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f4b942] px-6 py-3 font-bold text-[#07101f]">
              Find my AI tool <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/guides" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-white">
              Browse guides
            </a>
            {commerceEnabled && (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-white">
                Ask AIPS
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
