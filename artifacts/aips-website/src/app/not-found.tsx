import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Page Not Found",
  description: "The page you are looking for does not exist. Browse our 86+ premium AI subscriptions or contact us on WhatsApp.",
  canonical: "https://aipremiumshop.com/404",
  noindex: true,
});

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-6 text-8xl font-bold text-[#f4b942]">404</div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Page Not Found
      </h1>
      <p className="text-lg text-slate-400 max-w-md mb-8">
        The page you are looking for does not exist or has been moved. 
        Explore our products or get in touch via WhatsApp.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="btn-primary px-8 py-3 rounded-lg font-semibold"
        >
          Back to Home
        </Link>
        <Link
          href="/products"
          className="btn-secondary px-8 py-3 rounded-lg font-semibold"
        >
          Browse Products
        </Link>
      </div>
      <div className="mt-10 text-slate-500 text-sm">
        Need help?{" "}
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#25d366] hover:underline"
        >
          Chat on WhatsApp
        </a>
      </div>
    </main>
  );
}
