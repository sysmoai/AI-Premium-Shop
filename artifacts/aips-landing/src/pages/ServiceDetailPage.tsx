import { CheckCircle2, MessageCircle, ShieldAlert } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import servicesData from "../../data/services.json";

type Service = (typeof servicesData.services)[number];

function priceLabel(service: Service) {
  const amount = `BDT ${Number(service.priceBdt).toLocaleString("en-BD")}`;
  if (service.priceSuffix === "from") return `${amount} থেকে`;
  if (service.priceSuffix === "setup from") return `${amount} setup থেকে`;
  if (service.priceSuffix === "per month from") return `${amount}/month থেকে`;
  return amount;
}

export default function ServiceDetailPage({ serviceSlug }: { serviceSlug: string }) {
  const service = (servicesData.services as Service[]).find((item) => item.slug === serviceSlug);

  if (!service) {
    return (
      <PageLayout>
        <SEOHead title="Service not found" noindex />
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
          <h1 className="text-3xl font-bold text-white">Service not found</h1>
          <Link href="/services" className="mt-4 inline-block text-[#f4b942]">Back to services</Link>
        </div>
      </PageLayout>
    );
  }

  const canonical = `https://aipremiumshop.com/services/${service.slug}`;
  const wa = `https://wa.me/8801865385348?text=${encodeURIComponent(`Hi AI Premium Shop, I want to know about the ${service.name} package.`)}`;

  return (
    <PageLayout>
      <SEOHead title={service.name} description={service.summary} canonical={canonical} />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: service.name }]} />

      <div id="main-content" className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <Link href="/services" className="text-sm font-semibold text-[#f4b942]">← All services</Link>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-white">{service.name}</h1>
            <p className="mt-4 text-lg leading-8 text-[#c9ceda]">{service.summary}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#151b3d] p-5">
                <div className="text-xs uppercase tracking-[0.12em] text-slate-500">Starting price</div>
                <div className="mt-2 text-2xl font-bold text-[#f4b942]">{priceLabel(service)}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#151b3d] p-5">
                <div className="text-xs uppercase tracking-[0.12em] text-slate-500">Duration</div>
                <div className="mt-2 text-sm leading-6 font-semibold text-white">{service.duration}</div>
              </div>
            </div>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-white">What you get</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-3 rounded-xl border border-white/10 bg-[#151b3d] p-4 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-[#f4b942]" />
                <h2 className="text-2xl font-bold text-white">Important limits</h2>
              </div>
              <ul className="mt-5 space-y-3">
                {service.limitations.map((item) => (
                  <li key={item} className="rounded-xl border border-white/10 bg-[#101633] p-4 text-sm leading-6 text-[#c9ceda]">{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-[#f4b942]/20 bg-[#f4b942]/[0.06] p-6">
            <div className="text-xs uppercase tracking-[0.12em] text-slate-400">Package</div>
            <div className="mt-2 text-3xl font-extrabold text-[#f4b942]">{priceLabel(service)}</div>
            <p className="mt-3 text-sm leading-6 text-[#c9ceda]">
              Final scope, third-party fees and delivery details are confirmed before payment.
            </p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white">
              <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
            </a>
          </aside>
        </div>
      </div>
    </PageLayout>
  );
}
