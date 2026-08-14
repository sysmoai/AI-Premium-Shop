import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, CalendarDays, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BLOG_CATEGORIES, BLOG_CATEGORY_MAP } from "@/lib/blogTaxonomy";
import blogGuides from "../../data/blog-guides.json";

interface BlogDefinition {
  slug: string;
  title: string;
  description: string;
  h1: string;
  categoryKey: string;
  categoryLabel: string;
  intro: string;
}

const POSTS = blogGuides.posts as BlogDefinition[];

function readCategory() {
  if (typeof window === "undefined") return "all";
  const key = new URLSearchParams(window.location.search).get("category") ?? "all";
  return key === "all" || BLOG_CATEGORY_MAP[key] ? key : "all";
}

export default function BlogPage() {
  const reducedMotion = useReducedMotion();
  const [category, setCategory] = useState(readCategory());

  useEffect(() => {
    const query = category === "all" ? "" : `?category=${category}`;
    window.history.replaceState(null, "", `/blog${query}`);
  }, [category]);

  const filtered = useMemo(() => category === "all" ? POSTS : POSTS.filter((post) => post.categoryKey === category), [category]);
  const active = category === "all" ? null : BLOG_CATEGORY_MAP[category];
  const title = active ? `${active.label} Guides Bangladesh | AI Premium Shop` : "AI Guides Bangladesh | AI Premium Shop";
  const description = active ? `${active.label} decision guides for Bangladesh with current AIPS catalog context and verification-first buying guidance.` : "AI decision guides for Bangladesh covering tools, access, payments, workflows and comparisons with current AIPS catalog context.";

  return (
    <PageLayout>
      <SEOHead title={title} description={description} canonical="https://aipremiumshop.com/blog" />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />

      <div id="main-content" className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <motion.header initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0e27] to-[#151b3d] p-7 md:p-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Verification-first editorial</div>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{active ? `${active.emoji} ${active.label}` : "AI Guides for Bangladesh"}</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">{active ? active.description : "Practical guides for choosing AI tools, comparing access models, checking current AIPS prices and verifying provider-controlled details before you commit."}</p>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-slate-500"><CalendarDays className="h-3.5 w-3.5" /> Editorial definitions reviewed 14 Aug 2026</p>
        </motion.header>

        <section aria-label="Blog categories" className="mb-9 flex gap-2 overflow-x-auto pb-2">
          <button type="button" onClick={() => setCategory("all")} className={`min-h-10 whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold ${category === "all" ? "border-[#f4b942]/40 bg-[#f4b942]/10 text-[#f4b942]" : "border-white/10 text-slate-300"}`}>All guides</button>
          {BLOG_CATEGORIES.map((item) => <button key={item.key} type="button" onClick={() => setCategory(item.key)} className={`min-h-10 whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold ${category === item.key ? "border-[#f4b942]/40 bg-[#f4b942]/10 text-[#f4b942]" : "border-white/10 text-slate-300"}`}>{item.emoji} {item.label}</button>)}
        </section>

        {filtered.length ? (
          <section>
            <div className="mb-5 flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4b942]">{filtered.length} current editorial {filtered.length === 1 ? "guide" : "guides"}</p><h2 className="text-2xl font-bold text-white">{active ? active.label : "Browse by decision"}</h2></div><Link href="/products" className="hidden items-center gap-1.5 text-sm font-semibold text-[#f4b942] sm:inline-flex">Current catalog <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, index) => (
                <motion.article key={post.slug} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: Math.min(index * 0.025, 0.12) }} className="flex flex-col rounded-2xl border border-white/10 bg-[#151b3d] p-5">
                  <div className="mb-4 flex items-center justify-between gap-3"><span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#f4b942]">{post.categoryLabel}</span><BookOpen className="h-4 w-4 text-slate-500" /></div>
                  <h3 className="text-lg font-bold leading-7 text-white"><Link href={`/blog/${post.slug}`} className="hover:text-[#f4b942]">{post.title}</Link></h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{post.description}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">Read decision guide <ArrowRight className="h-4 w-4" /></Link>
                </motion.article>
              ))}
            </div>
          </section>
        ) : (
          <section className="rounded-2xl border border-white/10 bg-[#151b3d] p-8 text-center"><h2 className="text-xl font-bold text-white">No guide in this category yet</h2><p className="mt-2 text-sm text-slate-400">Browse the full editorial library or current catalog.</p><div className="mt-5 flex justify-center gap-3"><button type="button" onClick={() => setCategory("all")} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white">All guides</button><Link href="/products" className="rounded-xl bg-[#f4b942] px-4 py-2 text-sm font-bold text-[#0a0e27]">Catalog</Link></div></section>
        )}
      </div>
    </PageLayout>
  );
}
