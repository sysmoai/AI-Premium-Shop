import Link from "next/link";
export const metadata = { title: "Security TITLE Privacy | AI Premium Shop" };

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0E27] to-[#1a1f3a]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Security TITLE Privacy</h1>
        <div className="space-y-6 text-gray-300">
          <p>Complete information about our security TOPIC privacy</p>
        </div>
        <Link href="/products" className="inline-block mt-8 px-6 py-3 bg-[#f4b942] text-black font-bold rounded-lg hover:shadow-lg transition">
          Start Ordering →
        </Link>
      </div>
    </main>
  );
}
