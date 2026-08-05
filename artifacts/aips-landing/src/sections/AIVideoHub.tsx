// Decision hub for /ai-video (spec section 11).
//
// The category page was a product grid: useful once you already know which tool
// you want, useless for the actual search intent ("which AI video tool should I
// buy from Bangladesh?"). This section answers the decision instead of listing
// inventory.
//
// Every price here is derived from data/products.json at render time via
// cheapestFor(). Nothing is typed. That is not stylistic — CLAUDE.md records the
// same wrong-price bug recurring six times across sessions specifically because
// prices were written as string literals in page components.

import { Link } from "wouter";
import { ArrowRight, Wand2, ImagePlay, UserSquare, Megaphone, Film, Wallet, ShieldCheck, ScrollText } from "lucide-react";
import { formatBDT } from "@/lib/format";
import { productPath } from "@/lib/productRoutes";
import productsData from "../../data/catalog-lite.json";

const CARD = { backgroundColor: "#151b3d" };
const MUTED = { color: "#c9ceda" };

const all = (productsData as any).products as any[];

/** Cheapest live monthly price for a slug, or null if it is request-price. */
function cheapestFor(slug: string): number | null {
  const prices = all.filter((p) => p.slug === slug).map((p) => p.price).filter((n) => typeof n === "number");
  return prices.length ? Math.min(...prices) : null;
}
function nameFor(slug: string): string {
  const rec = all.find((p) => p.slug === slug);
  return rec ? rec.name.split(/—\s*/)[0].trim() : slug;
}

/** What each job actually is, and which of our products does it. */
const JOBS = [
  {
    icon: Wand2,
    title: "Text to video",
    body: "You write a prompt, the model invents the footage. Best for concepts, mood pieces and scenes you cannot film. Weakest when you need one exact thing to appear exactly as it looks in real life.",
    picks: ["runway-bangladesh", "pika-labs-bangladesh"],
  },
  {
    icon: ImagePlay,
    title: "Image to video",
    body: "You supply a still — usually a product photo — and the model animates it. This is the path that keeps your actual product recognisable, which is why e-commerce sellers reach for it more often than text-to-video.",
    picks: ["kling-ai-bangladesh", "higgsfield-ai-bangladesh"],
  },
  {
    icon: UserSquare,
    title: "Talking avatars and lip-sync",
    body: "A digital presenter delivers your script, with mouth movement matched to the audio. Used for explainers, training and multilingual product videos where filming a presenter is not practical.",
    picks: ["heygen-bangladesh", "synthesia-bangladesh"],
  },
  {
    icon: Megaphone,
    title: "UGC-style ad video",
    body: "Creator-style footage that looks like a real person recommending a product. The format that performs on Facebook and TikTok — and the one most Bangladeshi sellers are actually buying these tools for.",
    picks: ["higgsfield-ai-bangladesh", "heygen-bangladesh"],
  },
  {
    icon: Film,
    title: "Editing and repurposing",
    body: "Not generation at all: cutting a long video into shorts, captioning, removing filler. If you already have footage, this is usually the cheaper and better-value purchase.",
    picks: ["capcut-pro-bangladesh", "opus-clip-bangladesh", "descript-pro-bangladesh"],
  },
];

export function AIVideoHub() {
  // Budget bands, computed from the catalog rather than asserted.
  const priced = all
    .filter((p) => p.category === "ai-video" && typeof p.price === "number")
    .map((p) => ({ slug: p.slug, price: p.price as number, name: p.name.split(/—\s*/)[0].trim() }));
  const cheapest = priced.length ? priced.reduce((a, b) => (a.price < b.price ? a : b)) : null;

  return (
    <div className="mb-14">
      {/* ---- What this category actually is ---------------------------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-3">Which AI video tool do you actually need?</h2>
        <p className="max-w-3xl leading-relaxed mb-4" style={MUTED}>
          "AI video" covers at least five different jobs, and the tools are not interchangeable between
          them. A platform that writes a cinematic scene from a sentence is a poor choice for animating
          your product photo, and neither one replaces an editor. Pick the job first — the tool follows.
        </p>
        <p className="max-w-3xl leading-relaxed" style={MUTED}>
          Nearly all of these platforms bill in <strong className="text-white">credits</strong>, not videos.
          A credit allowance is a budget: a longer clip on a heavier model costs more than a short clip on a
          light one. Ask what a single clip costs before you judge whether an allowance is generous.
        </p>
      </section>

      {/* ---- The five jobs -------------------------------------------- */}
      <section className="mb-12">
        <div className="grid md:grid-cols-2 gap-4">
          {JOBS.map(({ icon: Icon, title, body, picks }) => (
            <div key={title} className="rounded-2xl border border-white/10 p-6" style={CARD}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(236,72,153,0.15)" }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: "#ec4899" }} />
                </span>
                <h3 className="font-bold text-white">{title}</h3>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={MUTED}>{body}</p>
              <div className="flex flex-wrap gap-2">
                {picks.map((slug) => {
                  const price = cheapestFor(slug);
                  return (
                    <Link key={slug} href={productPath(slug)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 hover:border-white/25 transition-colors text-white">
                      {nameFor(slug)}
                      <span style={{ color: "#f4b942" }}>
                        {price != null ? formatBDT(price) : "ask"}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Recommendations by situation ------------------------------ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Where to start</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              label: "If you are new to this",
              slug: "capcut-pro-bangladesh",
              body: "Start with editing, not generation. You will learn what you actually need from a generator by first cutting real footage — and it is the cheapest thing in the category.",
            },
            {
              label: "If you sell products online",
              slug: "kling-ai-bangladesh",
              body: "Image-to-video is the path that keeps your product looking like your product. Animate the photo you already have rather than prompting a model to invent one.",
            },
            {
              label: "If you need a presenter",
              slug: "heygen-bangladesh",
              body: "Purpose-built avatar and lip-sync tooling beats a general video model at this specific job, especially across multiple languages.",
            },
          ].map((r) => {
            const price = cheapestFor(r.slug);
            return (
              <div key={r.label} className="rounded-2xl border border-white/10 p-6" style={CARD}>
                <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#ec4899" }}>{r.label}</div>
                <Link href={productPath(r.slug)} className="font-bold text-white hover:opacity-80 transition-opacity">
                  {nameFor(r.slug)}
                </Link>
                {price != null && (
                  <div className="text-sm font-bold mb-2" style={{ color: "#f4b942" }}>from {formatBDT(price)}/mo</div>
                )}
                <p className="text-sm leading-relaxed mt-2" style={MUTED}>{r.body}</p>
              </div>
            );
          })}
        </div>
        {cheapest && (
          <p className="text-sm mt-4" style={MUTED}>
            Lowest current entry point in AI Video:{" "}
            <Link href={productPath(cheapest.slug)} className="text-white underline hover:opacity-80">
              {cheapest.name}
            </Link>{" "}
            at {formatBDT(cheapest.price)}/month.
          </p>
        )}
      </section>

      {/* ---- Buying from Bangladesh: payment, ownership, honesty ------- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Buying these from Bangladesh</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Wallet,
              title: "Payment",
              body: "Every one of these platforms bills in USD, which most Bangladeshi debit cards cannot complete. We handle that step — you pay in BDT via bKash, Nagad, Rocket, bank transfer or Binance Pay.",
            },
            {
              icon: ShieldCheck,
              title: "Account ownership",
              body: "Check this before buying anywhere, including here. A personal plan means the account is in your name with your own password. Ask explicitly which type you are getting — the answer changes what happens if you want to cancel.",
            },
            {
              icon: ScrollText,
              title: "How we verify",
              body: "Each product page carries the date we last checked its facts and a link to the provider's own pricing page. Where we have not verified a claim, we say so on the page rather than repeating it.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-white/10 p-6" style={CARD}>
              <Icon className="w-5 h-5 mb-3" style={{ color: "#10b981" }} />
              <h3 className="font-bold text-white mb-2 text-sm">{title}</h3>
              <p className="text-sm leading-relaxed" style={MUTED}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Onward links ---------------------------------------------- */}
      <section className="mb-4">
        <div className="flex flex-wrap gap-3">
          {[
            { href: productPath("higgsfield-ai-bangladesh"), label: "Higgsfield AI in Bangladesh" },
            { href: "/best-ai-for-creators", label: "Best AI for content creators" },
            { href: "/best-ai-for-ecommerce", label: "Best AI for e-commerce" },
            { href: "/creators-bn", label: "বাংলায় পড়ুন — কনটেন্ট ক্রিয়েটরদের জন্য" },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-white/10 hover:border-white/25 transition-colors text-white"
              style={CARD}>
              {l.label} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
