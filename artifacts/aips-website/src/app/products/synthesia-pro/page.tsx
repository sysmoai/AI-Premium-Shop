'use client';

import Link from 'next/link';
import { ChevronRight, Shield, Star, Award } from 'lucide-react';

export default function ProductPage() {
  const product = {
    name: 'Synthesia Pro',
    brand: 'Synthesia',
    price: 529
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0E27] to-[#1a1f3a]">
      <div className="border-b border-white/10 px-4 py-8 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/products" className="text-[#f4b942] hover:text-white transition mb-6 inline-flex items-center gap-2">
            ← Back to Products
          </Link>

          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#f4b942] font-bold text-sm mb-2">By {product.brand}</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#f4b942]" />)}
                </div>
                <span className="text-gray-400">4.8 rating</span>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-4xl font-bold text-[#f4b942]">৳{product.price}</p>
              <a href={`https://wa.me/8801865385348?text=Order: ${product.name}`} className="block mt-4 px-6 py-3 bg-gradient-to-r from-[#f4b942] to-[#E2136E] text-white font-bold rounded-lg">
                💬 Order
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['Advanced AI', 'Premium Support', 'Priority Access', 'Custom Integration'].map((f, i) => (
              <div key={i} className="flex gap-3 bg-white/5 border border-white/10 rounded-lg p-4">
                <Shield className="w-5 h-5 text-[#f4b942] flex-shrink-0" />
                <span className="text-gray-300">{f}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[{ name: 'Ahmed K.', role: 'Freelancer', text: 'Game changer!' }, { name: 'Sarah M.', role: 'Creator', text: 'Best investment!' }].map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[#f4b942]" />)}</div>
                <p className="text-gray-300 mb-4">"{t.text}"</p>
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-gray-400 text-sm">{t.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#f4b942]/10 to-[#E2136E]/10 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to get started?</h3>
          <a href={`https://wa.me/8801865385348?text=Order: ${product.name}`} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f4b942] to-[#E2136E] text-white font-bold rounded-lg">
            💬 Order on WhatsApp
            <ChevronRight className="w-5 h-5" />
          </a>
          <p className="text-gray-400 text-sm mt-6">✅ Instant activation • ✅ 30-day guarantee • ✅ 24/7 support</p>
        </section>
      </div>
    </main>
  );
}
