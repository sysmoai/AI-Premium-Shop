import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  FileCheck2,
  Image as ImageIcon,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Video,
  WandSparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20have%20a%20question%20about%20AI%20Premium%20Shop.";
const SUPPORT_NUMBER = "+880 1865-385348";

const categories = [
  { icon: Bot, title: "AI Assistants", copy: "Research, writing, analysis and general-purpose AI tools." },
  { icon: ImageIcon, title: "AI Image", copy: "Image generation, creative design and visual production tools." },
  { icon: Video, title: "AI Video", copy: "Video generation, avatars, editing and creator workflows." },
  { icon: Code2, title: "AI Coding", copy: "Coding assistants, IDE tools and software-development workflows." },
  { icon: WandSparkles, title: "AI Creative", copy: "Writing, presentations, design and content-production tools." },
  { icon: Sparkles, title: "AI Productivity", copy: "Workspace, automation and business productivity tools." },
];

const safeLinks = [
  ["/", "Home"],
  ["/products", "Products"],
  ["/about", "About"],
  ["/faq", "FAQ"],
  ["/support", "Support"],
] as const;

function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b1d] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b1d]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <img src="/favicon.svg" alt="" width={34} height={34} className="h-9 w-9" />
            <div className="leading-tight">
              <div className="text-sm font-black tracking-wide">AI Premium Shop</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">Bangladesh</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
            {safeLinks.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-semibold transition-colors ${location === href ? "text-[#f4b942]" : "text-white/70 hover:text-white"}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#25d366] px-4 text-sm font-black text-[#07140b] transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> Contact support
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg border border-white/10 p-2 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 px-4 py-4 md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-2" aria-label="Mobile navigation">
              {safeLinks.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {label}
                </Link>
              ))}
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-2 rounded-lg bg-[#25d366] px-3 py-3 text-center text-sm font-black text-[#07140b]">
                Contact support
              </a>
            </nav>
          </div>
        )}
      </header>

      {children}

      <footer className="border-t border-white/10 bg-[#050817]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-8">
          <div>
            <div className="text-base font-black">AI Premium Shop</div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">
              Bangladesh-focused AI product discovery, guidance and verified commercial offers. Commercial facts are published only after review.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Explore</div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-white/65">
              <Link href="/products">Products</Link>
              <Link href="/about">About</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/support">Support</Link>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Policies</div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-white/65">
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp {SUPPORT_NUMBER}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#f4b942]/30 bg-[#f4b942]/10 px-3 py-1.5 text-xs font-bold text-[#f4b942]">
      <ShieldCheck className="h-3.5 w-3.5" /> {children}
    </div>
  );
}

function HomePage() {
  return (
    <Shell>
      <SEOHead
        title="AI Premium Shop Bangladesh | AI Tools, Guides & Verified Offers"
        description="Explore AI tools and buying guidance for Bangladesh. AI Premium Shop publishes commercial offers only after pricing, access and provider-compliance checks."
        canonical="https://aipremiumshop.com/"
      />
      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(139,92,246,.18),transparent_34%),radial-gradient(circle_at_20%_10%,rgba(244,185,66,.12),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
            <div>
              <StatusPill>Public website restored · commercial facts remain verified-only</StatusPill>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.045em] md:text-6xl lg:text-7xl">
                Find the right AI tools without guessing what you are buying.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 md:text-lg">
                AI Premium Shop is rebuilding its catalog around a simple rule: product pages can be rich, visual and conversion-focused, but prices, access models, delivery promises and provider claims must be verified before they become public offers.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-[#070b1d]">
                  Browse products <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 text-sm font-bold text-white">
                  <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#151b3d] to-[#0b1029] p-5 shadow-2xl shadow-black/30">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4b942]">Product page system</div>
                    <div className="mt-1 text-xl font-black">Poster + facts + status</div>
                  </div>
                  <FileCheck2 className="h-8 w-8 text-[#f4b942]" />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Website-ready product poster",
                    "Verified plan and price facts",
                    "Provider/source references",
                    "Last-reviewed status",
                    "Responsive image delivery",
                    "Purchase CTA only when cleared",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 rounded-xl border border-white/8 bg-black/15 p-3 text-sm text-white/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4b942]">Explore by job</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">A complete AI catalog structure, rebuilt safely</h2>
            <p className="mt-4 text-white/60">Category discovery is live. Individual commercial offers are enabled route-by-route after verification.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ icon: Icon, title, copy }) => (
              <Link key={title} href="/products" className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:border-white/20">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4b942]/10 text-[#f4b942]"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">{copy}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 md:grid-cols-3 md:px-8">
            {[
              ["1", "Research", "Check provider pages, current terms, plan details and the existing site before publishing."],
              ["2", "Create", "Generate posters and visual media, then optimize them for the exact website placement."],
              ["3", "Release", "Implement on a branch, verify the Vercel preview, pass checks, then verify production."],
            ].map(([n, title, copy]) => (
              <div key={n} className="rounded-2xl border border-white/10 bg-[#0d1330] p-6">
                <div className="text-4xl font-black text-white/12">0{n}</div>
                <h3 className="mt-3 text-xl font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">Need a current product recommendation?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">Tell us the job you want to do and your budget. Support can help while the public commercial catalog is being re-verified.</p>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#25d366] px-5 text-sm font-black text-[#07140b]">
            <MessageCircle className="h-4 w-4" /> Contact support
          </a>
        </section>
      </main>
    </Shell>
  );
}

function ProductsPage() {
  return (
    <Shell>
      <SEOHead
        title="AI Products & Categories | AI Premium Shop Bangladesh"
        description="Browse AI product categories. Commercial offers are published only after current pricing, access, delivery and provider-compliance checks."
        canonical="https://aipremiumshop.com/products"
      />
      <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <StatusPill>Verified-offer catalog rebuilding</StatusPill>
        <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] md:text-5xl">AI products, organized by what you actually need to do.</h1>
        <p className="mt-4 max-w-3xl text-white/60">The old catalog contained historical prices and delivery claims. Those values are not being republished automatically. Each offer returns only after its current facts and provider rules are cleared.</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-[#0d1330] p-5">
              <Icon className="h-6 w-6 text-[#f4b942]" />
              <h2 className="mt-4 text-xl font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/55">{copy}</p>
              <div className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/35">Offers under verification</div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-[#f4b942]" />
            <div>
              <h2 className="text-xl font-black">Why you may see fewer prices temporarily</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">A public price is treated as a factual commercial claim. Until the associated access model, availability and delivery method are also cleared, the site keeps that offer unpublished rather than mixing current and historical data.</p>
              <Link href="/support" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#f4b942]">Ask about a product <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}

function ChatGPTReviewPage() {
  return (
    <Shell>
      <SEOHead
        title="ChatGPT Plus Availability Review | AI Premium Shop"
        description="AI Premium Shop is reviewing its ChatGPT Plus commercial delivery model against current provider terms before publication."
        canonical="https://aipremiumshop.com/chatgpt-plus-bangladesh"
        noindex
      />
      <main className="mx-auto max-w-6xl px-4 py-14 md:px-8">
        <StatusPill>Commercial offer blocked pending compliant delivery model</StatusPill>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_.8fr]">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">ChatGPT Plus</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/65">
              OpenAI describes ChatGPT Plus as an individual paid subscription. OpenAI's current account-sharing guidance says an account is for the individual who created it and should not be shared with other people.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/65">
              Because of that, the historical "ChatGPT Plus Shared" offer is not being published or sold from this page until AI Premium Shop has a delivery model that is compatible with the provider's current terms.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="https://help.openai.com/en/articles/10471989" target="_blank" rel="noopener noreferrer nofollow" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-bold text-white">OpenAI account-sharing policy <ArrowRight className="h-4 w-4" /></a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#25d366] px-4 text-sm font-black text-[#07140b]"><MessageCircle className="h-4 w-4" /> Ask support</a>
            </div>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-[#0d1330] p-6">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Publication checklist</div>
            <div className="mt-5 space-y-3">
              {[
                [true, "Provider plan identity reviewed"],
                [true, "Account-sharing restriction reviewed"],
                [false, "Compliant AI Premium Shop delivery model approved"],
                [false, "Public BDT price approved for that compliant model"],
                [false, "Poster approved for the final offer"],
              ].map(([done, label]) => (
                <div key={String(label)} className="flex items-start gap-3 text-sm text-white/65">
                  {done ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> : <div className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full border border-white/25" />}
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </Shell>
  );
}

function AboutPage() {
  return (
    <Shell>
      <SEOHead title="About AI Premium Shop" description="About AI Premium Shop, a Bangladesh-focused AI product discovery and verified-offer platform." canonical="https://aipremiumshop.com/about" />
      <main className="mx-auto max-w-4xl px-4 py-14 md:px-8">
        <h1 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">About AI Premium Shop</h1>
        <p className="mt-6 text-base leading-8 text-white/65">AI Premium Shop is building a Bangladesh-focused catalog for AI software, plans and practical buying guidance. The public site separates educational information from commercial claims so outdated prices or access methods do not silently return after a redesign or deployment.</p>
        <p className="mt-4 text-base leading-8 text-white/65">The operating workflow is versioned in GitHub, deployed through Vercel, and designed so visual assets can be generated and reviewed independently from the factual commercial record.</p>
      </main>
    </Shell>
  );
}

function FAQPage() {
  const items = [
    ["Why are some products under review?", "Prices, access models, availability and provider rules can change. A product stays review-gated until the facts required for a public offer are current."],
    ["Will product posters be added?", "Yes. The product-page system supports a dedicated poster or visual for each approved product and plan. The visual must match the approved commercial facts before release."],
    ["Can I still ask about a product?", `Yes. Contact support on WhatsApp at ${SUPPORT_NUMBER}.`],
    ["Why was the old storefront replaced?", "The previous catalog contained historical commercial claims that could not safely be treated as current. The rebuilt public layer prevents those facts from reappearing automatically."],
  ];
  return (
    <Shell>
      <SEOHead title="FAQ | AI Premium Shop" description="Frequently asked questions about AI Premium Shop product verification, posters and support." canonical="https://aipremiumshop.com/faq" />
      <main className="mx-auto max-w-4xl px-4 py-14 md:px-8">
        <h1 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">Frequently asked questions</h1>
        <div className="mt-8 space-y-4">
          {items.map(([q, a]) => (
            <section key={q} className="rounded-2xl border border-white/10 bg-[#0d1330] p-5">
              <h2 className="font-black">{q}</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">{a}</p>
            </section>
          ))}
        </div>
      </main>
    </Shell>
  );
}

function SupportPage() {
  return (
    <Shell>
      <SEOHead title="Support | AI Premium Shop" description="Contact AI Premium Shop support for current product and availability questions." canonical="https://aipremiumshop.com/support" />
      <main className="mx-auto max-w-4xl px-4 py-14 text-center md:px-8">
        <MessageCircle className="mx-auto h-10 w-10 text-[#25d366]" />
        <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">Need help choosing an AI tool?</h1>
        <p className="mx-auto mt-5 max-w-2xl text-white/60">Use the public support channel for current availability questions. Do not send passwords, one-time codes or other account credentials.</p>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#25d366] px-5 text-sm font-black text-[#07140b]">Open WhatsApp support</a>
      </main>
    </Shell>
  );
}

function PolicyPage({ kind }: { kind: "privacy" | "terms" }) {
  const privacy = kind === "privacy";
  return (
    <Shell>
      <SEOHead
        title={`${privacy ? "Privacy Policy" : "Terms"} | AI Premium Shop`}
        description={`${privacy ? "Privacy" : "Terms"} information for the AI Premium Shop website.`}
        canonical={`https://aipremiumshop.com/${privacy ? "privacy-policy" : "terms"}`}
      />
      <main className="mx-auto max-w-4xl px-4 py-14 md:px-8">
        <h1 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">{privacy ? "Privacy Policy" : "Website Terms"}</h1>
        <div className="mt-7 space-y-5 text-sm leading-7 text-white/60">
          {privacy ? (
            <>
              <p>This website may collect basic technical information needed to operate the service. Analytics and advertising integrations should not activate until the relevant consent and configuration are present.</p>
              <p>Do not send passwords, OTPs or other sensitive account credentials through public support channels. Product-specific data handling terms will be published only when the underlying commercial workflow is approved.</p>
            </>
          ) : (
            <>
              <p>Product names and trademarks belong to their respective owners. AI Premium Shop is not claiming provider authorization unless that relationship is explicitly verified and published.</p>
              <p>Prices, availability, delivery methods, warranties, refunds and access models are not binding unless they are shown as a current approved public offer on the website at the time of purchase.</p>
            </>
          )}
        </div>
      </main>
    </Shell>
  );
}

function ReviewPage({ path }: { path: string }) {
  const productLike = path.includes("product") || path.includes("bangladesh") || path.startsWith("/ai-") || path === "/bundles" || path === "/pricing";
  return (
    <Shell>
      <SEOHead title="Page Under Review | AI Premium Shop" description="This AI Premium Shop page is being reviewed before public publication." noindex />
      <main className="mx-auto flex min-h-[60vh] max-w-4xl items-center px-4 py-14 md:px-8">
        <div className="w-full rounded-3xl border border-white/10 bg-[#0d1330] p-7 md:p-10">
          <StatusPill>{productLike ? "Commercial route review" : "Route review"}</StatusPill>
          <h1 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">This page is being rebuilt from verified information.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">The old route still exists, but its previous commercial or factual content is not being projected as current. Use the live catalog or support while this route is audited.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/products" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-[#070b1d]">Browse live catalog <ArrowRight className="h-4 w-4" /></Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-bold text-white">Ask support</a>
          </div>
        </div>
      </main>
    </Shell>
  );
}

export default function SafePublicSite() {
  const [location] = useLocation();
  const path = location.split("?")[0] || "/";

  if (path === "/") return <HomePage />;
  if (path === "/products") return <ProductsPage />;
  if (path === "/about") return <AboutPage />;
  if (path === "/faq") return <FAQPage />;
  if (path === "/support" || path === "/contact") return <SupportPage />;
  if (path === "/privacy" || path === "/privacy-policy") return <PolicyPage kind="privacy" />;
  if (path === "/terms") return <PolicyPage kind="terms" />;
  if (path === "/chatgpt-plus-bangladesh" || path === "/product/chatgpt-plus-bangladesh") return <ChatGPTReviewPage />;

  return <ReviewPage path={path} />;
}
