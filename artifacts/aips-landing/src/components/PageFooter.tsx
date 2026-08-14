import { MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import { BLOG_CATEGORIES } from "@/lib/blogTaxonomy";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20please%20help%20me%20confirm%20the%20current%20details%20for%20an%20AI%20tool%20before%20payment.";

const PRODUCT_LINKS = [
  ["All products", "/products"],
  ["AI assistants", "/ai-assistant"],
  ["AI image", "/ai-image"],
  ["AI video", "/ai-video"],
  ["AI code", "/ai-code"],
  ["AI workspace", "/ai-workspace"],
  ["AI writing", "/ai-writing"],
  ["AI design", "/ai-design"],
  ["Bundles & services", "/bundles"],
];

const BUYER_LINKS = [
  ["Current pricing", "/pricing"],
  ["Decision guides", "/guides"],
  ["Editorial guides", "/blog"],
  ["How to order", "/how-to-order"],
  ["Support", "/support"],
  ["FAQ", "/faq"],
];

const COMPANY_LINKS = [
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Refund & resolution", "/refund-policy"],
  ["Terms", "/terms"],
  ["Privacy", "/privacy-policy"],
  ["বাংলা", "/bn"],
];

function LinkGroup({ title, links }: { title: string; links: string[][] }) {
  return <div><h2 className="text-sm font-bold text-white">{title}</h2><ul className="mt-4 space-y-2.5">{links.map(([label, href]) => <li key={href}><Link href={href} className="text-sm text-slate-400 transition hover:text-white">{label}</Link></li>)}</ul></div>;
}

export function PageFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#080b20]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div>
            <PrimaryBrandLogo />
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Compare current AI catalog families, published AIPS BDT prices and stated access models. Confirm availability, provider-controlled limits, delivery ETA, payment instructions and applicable terms for the exact order before payment.</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Confirm current details</a>
          </div>
          <LinkGroup title="Catalog" links={PRODUCT_LINKS} />
          <LinkGroup title="Buying help" links={BUYER_LINKS} />
          <LinkGroup title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <h2 className="text-sm font-bold text-white">Editorial topics</h2>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">{BLOG_CATEGORIES.map((category) => <Link key={category.key} href={category.href} className="text-xs text-slate-500 hover:text-slate-300">{category.label}</Link>)}</div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AI Premium Shop. Product names and trademarks belong to their respective owners.</p>
          <p>Payment instructions and order terms are confirmed for the exact order.</p>
        </div>
      </div>
    </footer>
  );
}
