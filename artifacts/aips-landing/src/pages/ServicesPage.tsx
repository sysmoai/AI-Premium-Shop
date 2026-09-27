import { CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
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

function whatsapp(service: Service) {
  return `https://wa.me/8801865385348?text=${encodeURIComponent(`Hi AI Premium Shop, I want to know about the ${service.name} package.`)}`;
}

export default function ServicesPage() {
  const services = servicesData.services as Service[];

  return (
    <PageLayout>
      <SEOHead
        title="AI, Website, SEO & Automation Services in Bangladesh"
        description="AI Premium Shop service packages for AI/API setup, developer setup, websites, e-commerce, automation, SEO, maintenance and content production."
        canonical="https://aipremiumshop.com/services"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Services" }]} />

      <div id="main-content" className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-14">
        <header className="max-w-4xl mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f4b942]/20 bg-[#f4b942]/[0.07] px-3 py-1.5 text-xs font-semibold text-[#f4b942]">
            <ShieldCheck className="h-3.5 w-3.5" /> AIPS service packages
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold text-white">
            Build, automate and grow with an AI-ready stack
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-[#c9ceda]">
            Choose a ready package or ask us to scope your exact requirement. One-time service fees, recurring provider costs and optional maintenance are separated before payment.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.slug} className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#151b3d] p-6">
              <h2 className="text-xl font-bold text-white">{service.name}</h2>
              <p className="mt-2 text-2xl font-extrabold text-[#f4b942]">{priceLabel(service)}</p>
              <p className="mt-3 text-sm leading-6 text-[#c9ceda]">{service.summary}</p>

              <ul className="mt-5 space-y-2">
                {service.features.slice(0, 5).map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex gap-3 pt-6">
                <Link
                  href={`/services/${service.slug}`}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-white hover:bg-white/5"
                >
                  View details
                </Link>
                <a
                  href={whatsapp(service)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 bg-[#101633] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white">What is not automatically included</h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-[#c9ceda]">
            Paid AI/API usage, domain registration, premium themes/plugins/software, payment gateway fees, paid hosting and other third-party provider charges are separate unless the final quotation explicitly includes them. SEO, leads, traffic, sales and AI accuracy are not guaranteed outcomes.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
