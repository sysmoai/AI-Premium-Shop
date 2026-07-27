"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error tracking service
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-6 text-6xl font-bold text-red-400">⚠️</div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Something Went Wrong
      </h1>
      <p className="text-lg text-slate-400 max-w-md mb-8">
        We encountered an unexpected error. Please try again or contact us on WhatsApp for immediate assistance.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={reset}
          className="btn-primary px-8 py-3 rounded-lg font-semibold"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="btn-secondary px-8 py-3 rounded-lg font-semibold"
        >
          Back to Home
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
