import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";

const SITE = "https://aipremiumshop.com";

type Props = {
  to: string;
  label: string;
};

export function LegacyGuideRedirect({ to, label }: Props) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <PageLayout>
      <SEOHead
        title={`${label} AI guide moved | AI Premium Shop`}
        description={`This older ${label.toLowerCase()} guide has moved to the current AI Premium Shop decision guide.`}
        canonical={`${SITE}${to}`}
        noindex
      />
      <div id="main-content" className="mx-auto max-w-3xl px-4 py-24 text-center md:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4b942]">Guide moved</p>
        <h1 className="text-3xl font-bold text-white">Use the current {label} decision guide</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-300">
          This legacy route is no longer maintained as a separate recommendation page. Continue to the current catalog-based guide so price, access model and provider-controlled limits can be checked against the latest public AIPS data.
        </p>
        <Link href={to} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#f4b942] px-5 py-3 text-sm font-bold text-[#0a0e27]">
          Open current guide <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </PageLayout>
  );
}
