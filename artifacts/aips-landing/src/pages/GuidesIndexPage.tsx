import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, Briefcase, Lightbulb, ShieldCheck, Users, Zap } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const GROUPS = [
  {
    title: "By audience",
    description: "Start from the work and responsibilities of the person using the tool.",
    icon: Users,
    guides: [
      ["Students", "Study, research and academic workflows", "/best-ai-for-students"],
      ["Freelancers", "Client work, production and QA", "/best-ai-for-freelancers"],
      ["Creators", "Video, image, audio and content workflows", "/best-ai-for-creators"],
      ["Business owners", "Operations, documents and team workflows", "/best-ai-for-business"],
      ["Developers", "Coding and development workflows", "/best-ai-for-developers"],
      ["Job seekers", "CV, interview and portfolio workflows", "/best-ai-for-job-seekers"],
      ["Designers", "Design and visual-production workflows", "/best-ai-for-designers"],
      ["Marketers", "Writing, campaign and research workflows", "/best-ai-for-marketers"],
      ["Educators", "Teaching, research and academic-policy checks", "/guides/educators"],
    ],
  },
  {
    title: "By workflow",
    description: "Browse current catalog families for a specific job.",
    icon: Zap,
    guides: [
      ["AI assistants", "General assistant and research workflows", "/ai-assistant"],
      ["Writing & SEO", "Writing, editing and search workflows", "/ai-writing"],
      ["Image", "Image-generation and visual workflows", "/ai-image"],
      ["Video", "Video-generation and production workflows", "/ai-video"],
      ["Code & development", "Coding-assistant and development workflows", "/ai-code"],
      ["Voice & music", "Speech, audio and music workflows", "/ai-voice-music"],
      ["Workspace", "Documents, meetings and productivity workflows", "/ai-workspace"],
      ["Design", "Design, presentation and creative workflows", "/ai-design"],
    ],
  },
  {
    title: "By published price",
    description: "Use current AIPS price thresholds as filters, not as quality rankings.",
    icon: Lightbulb,
    guides: [
      ["Under BDT 500", "Current fixed-price records below the threshold", "/ai-under-500"],
      ["Under BDT 1,000", "Current fixed-price records below the threshold", "/ai-under-1000"],
      ["Under BDT 3,000", "Current fixed-price records below the threshold", "/ai-under-3000"],
      ["Subscription decision guide", "Compare workflow, access model and current price", "/best-ai-subscription-2026"],
    ],
  },
  {
    title: "Compare",
    description: "Compare current AIPS commercial data and verify provider-controlled details for the exact plans.",
    icon: Briefcase,
    guides: [
      ["ChatGPT vs Claude", "Compare the exact paid plans you are considering", "/chatgpt-vs-claude"],
      ["ChatGPT vs Gemini", "Compare current plan and access context", "/chatgpt-vs-gemini"],
      ["ChatGPT vs Perplexity", "Compare assistant and research workflows", "/chatgpt-vs-perplexity"],
      ["Claude vs Gemini", "Compare current plan and workflow context", "/claude-vs-gemini"],
      ["Copilot vs Cursor", "Compare coding-tool commercial context", "/copilot-vs-cursor"],
      ["Midjourney vs Ideogram", "Compare image-tool commercial context", "/midjourney-vs-ideogram"],
      ["Canva vs Adobe Express", "Compare design-tool commercial context", "/canva-vs-adobe-express"],
    ],
  },
];

const BANGLA = [
  ["বাংলা হোম", "AI Premium Shop-এর বাংলা পরিচিতি", "/bn"],
  ["ছাত্রছাত্রী", "পড়াশোনা, গবেষণা ও একাডেমিক কাজ", "/students-bn"],
  ["ডেভেলপার", "কোডিং ও ডেভেলপমেন্ট ওয়ার্কফ্লো", "/developers-bn"],
  ["ফ্রিল্যান্সার", "ক্লায়েন্ট কাজ ও ডেলিভারি ওয়ার্কফ্লো", "/freelancers-bn"],
  ["কন্টেন্ট ক্রিয়েটর", "ভিডিও, ছবি ও কন্টেন্ট ওয়ার্কফ্লো", "/creators-bn"],
  ["ছোট ব্যবসা", "অপারেশন ও ব্যবসায়িক ওয়ার্কফ্লো", "/smb-bn"],
  ["শিক্ষক", "পাঠ পরিকল্পনা, গবেষণা ও একাডেমিক নীতি", "/educators-bn"],
];

function Card({ item }: { item: string[] }) {
  const [name, description, href] = item;
  return <Link href={href} className="group block rounded-xl border border-white/10 bg-[#151b3d] p-4 transition hover:border-[#f4b942]/35"><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold text-white group-hover:text-[#f4b942]">{name}</h3><p className="mt-1 text-sm leading-6 text-slate-400">{description}</p></div><ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-600 group-hover:text-[#f4b942]" /></div></Link>;
}

export default function GuidesIndexPage() {
  const reducedMotion = useReducedMotion();
  return (
    <PageLayout>
      <SEOHead title="AI Tool Guides Bangladesh | AI Premium Shop" description="Browse AI Premium Shop decision guides by audience, workflow, price threshold and comparison. Verify current price, access and provider limits before choosing." canonical="https://aipremiumshop.com/guides" />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Guides" }]} />
      <div id="main-content" className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-14">
        <motion.header initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-14 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#f4b942]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#f4b942]"><ShieldCheck className="h-3.5 w-3.5" /> Decision guide index</div>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Choose an AI Tool by the Decision You Need to Make</h1>
          <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">Start from your workflow, access requirements and budget. Use AIPS pages for current public price and access context, then verify provider-controlled features and limits for the exact plan.</p>
        </motion.header>

        <div className="space-y-14">
          {GROUPS.map((group, index) => {
            const Icon = group.icon;
            return <motion.section key={group.title} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.12) }}><div className="mb-5 flex items-start gap-3"><div className="rounded-xl border border-white/10 bg-[#151b3d] p-2.5"><Icon className="h-5 w-5 text-[#f4b942]" /></div><div><h2 className="text-2xl font-bold text-white">{group.title}</h2><p className="mt-1 text-sm text-slate-400">{group.description}</p></div></div><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{group.guides.map((item) => <Card key={item[2]} item={item} />)}</div></motion.section>;
          })}
        </div>

        <section className="mt-16 border-t border-white/10 pt-12">
          <div className="mb-5 flex items-center gap-3"><BookOpen className="h-5 w-5 text-[#f4b942]" /><div><h2 className="text-2xl font-bold text-white">বাংলা গাইড</h2><p className="mt-1 text-sm text-slate-400">বাংলায় ভূমিকা ও কাজভিত্তিক গাইড দেখুন।</p></div></div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{BANGLA.map((item) => <Card key={item[2]} item={item} />)}</div>
        </section>

        <section className="mt-14 rounded-2xl border border-white/10 bg-[#151b3d] p-7 text-center md:p-9">
          <h2 className="text-xl font-bold text-white">Need help narrowing the catalog?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-400">Tell AIPS the workflow, data sensitivity and budget. Ask for current price, access model, availability, provider-controlled limits, delivery ETA and applicable terms before payment.</p>
          <a href="https://wa.me/8801865385348?text=Hi%2C%20help%20me%20narrow%20the%20current%20AI%20catalog.%20Please%20ask%20about%20my%20workflow%2C%20data%20sensitivity%20and%20budget%2C%20then%20confirm%20current%20price%2C%20access%2C%20availability%2C%20provider%20limits%2C%20delivery%20ETA%20and%20terms%20before%20payment." target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#008236] px-5 py-3 text-sm font-bold text-white">Ask AIPS <ArrowRight className="h-4 w-4" /></a>
        </section>
      </div>
    </PageLayout>
  );
}
