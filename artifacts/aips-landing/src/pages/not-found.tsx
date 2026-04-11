import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";

const WHATSAPP = "https://wa.me/8801865385348";

export default function NotFound() {
  return (
    <PageLayout>
      <section className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg mx-auto">
          <div className="text-8xl font-bold" style={{ color: "#f4b942" }}>
            404
          </div>

          <h1 className="text-2xl text-white font-semibold mt-4">
            Page Not Found
          </h1>

          <p className="mt-3" style={{ color: "#9ca3af" }}>
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/"
              className="bg-[#f4b942] text-[#0a0e27] font-bold py-3 px-6 rounded-lg hover:bg-amber-400 transition-colors"
            >
              Browse All 56 AI Tools
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-500 transition-colors"
            >
              Order on WhatsApp
            </a>
          </div>

          <div className="mt-6">
            <p className="text-white text-sm mb-3">Popular pages:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/chatgpt-plans-bangladesh" className="text-sm hover:underline" style={{ color: "#f4b942" }}>
                ChatGPT Plans
              </Link>
              <Link href="/claude-pro-bangladesh" className="text-sm hover:underline" style={{ color: "#f4b942" }}>
                Claude Pro
              </Link>
              <Link href="/midjourney-bangladesh" className="text-sm hover:underline" style={{ color: "#f4b942" }}>
                Midjourney
              </Link>
              <Link href="/bundles" className="text-sm hover:underline" style={{ color: "#f4b942" }}>
                Bundles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
