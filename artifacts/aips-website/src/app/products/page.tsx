import { buildMetadata } from "@/lib/seo/metadata";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ProductGrid } from "@/components/products/product-grid";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "All Products — 86+ AI Subscriptions & Premium Tools in Bangladesh",
  description:
    "Browse 86+ premium AI subscriptions, design tools, streaming services, and productivity software available in Bangladesh. bKash/Nagad payment. 5–15 min delivery.",
  canonical: "https://aipremiumshop.com/products",
  ogType: "website",
});

export default function ProductsPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen">
        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
          <div className="max-w-2xl">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">
              All Products
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
              86+ premium subscriptions
            </h1>
            <p className="mt-4 text-[1rem] leading-relaxed text-[#5b6280]">
              AI assistants, design tools, streaming services, and productivity software —
              all with local payment and WhatsApp delivery.
            </p>
          </div>

          <ProductGrid />
        </section>
      </main>
    </>
  );
}
