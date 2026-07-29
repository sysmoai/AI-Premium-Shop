export const metadata = { title: "AI for Students | AI Premium Shop" };

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0E27] to-[#1a1f3a]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-4">AI for Students</h1>
        <p className="text-gray-400 mb-8">Complete AI solutions for Students</p>
        <a href="/products" className="px-6 py-3 bg-[#f4b942] text-black font-bold rounded-lg hover:shadow-lg transition">
          Browse All Products →
        </a>
      </div>
    </main>
  );
}
