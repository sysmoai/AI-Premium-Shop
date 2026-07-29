'use client';

import Link from 'next/link';
import { ChevronRight, Shield, Star, Award } from 'lucide-react';

const productDB: Record<string, any> = {
  'chatgpt-plus': {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus Starter',
    brand: 'OpenAI',
    price: 499,
    period: 'month',
    description: 'Unlock GPT-4 Turbo with unlimited conversations, advanced analysis, and premium features.',
    features: [
      'GPT-4 Turbo access',
      '100+ messages every 3 hours',
      'Advanced data analysis',
      'DALL-E 3 image generation',
      'File uploads & analysis',
      'Custom instructions',
      'Priority support',
      'API access'
    ],
    benefits: [
      '10x faster response to complex tasks',
      'Professional-grade AI assistant',
      'Save 5+ hours per week on content',
      '24/7 availability for any question'
    ],
    testimonials: [
      { name: 'Ahmed K.', role: 'Freelancer', text: 'ChatGPT Plus increased my productivity by 300%. Game changer!' },
      { name: 'Sarah M.', role: 'Content Creator', text: 'Best investment ever. Incredible advanced features.' }
    ],
    faq: [
      { q: 'Is this official?', a: 'Yes, 100% official subscription from OpenAI.' },
      { q: 'What about guarantees?', a: '30-day money-back guarantee included.' },
      { q: 'How fast is delivery?', a: 'Instant account access, usually within 15 minutes.' }
    ]
  }
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productDB[params.slug] || productDB['chatgpt-plus'];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0E27] to-[#1a1f3a]">
      {/* Header */}
      <div className="border-b border-white/10 px-4 py-8 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/products" className="text-[#f4b942] hover:text-white transition mb-6 inline-flex items-center gap-2">
            ← Back to Products
          </Link>

          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[#f4b942] font-bold text-sm mb-2">By {product.brand}</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#f4b942] text-[#f4b942]" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">(2,847 reviews)</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-right">
              <p className="text-gray-400 text-sm mb-2">Starting from</p>
              <p className="text-4xl font-bold text-[#f4b942] mb-4">৳{product.price}</p>
              <a
                href={`https://wa.me/8801865385348?text=I want to order: ${product.name}`}
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#f4b942] to-[#E2136E] text-white font-bold rounded-lg hover:shadow-lg transition"
              >
                💬 Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-8 space-y-12">
        {/* Description */}
        <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>

        {/* Features */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {product.features.map((f: string, i: number) => (
              <div key={i} className="flex gap-3 bg-white/5 border border-white/10 rounded-lg p-4">
                <Shield className="w-5 h-5 text-[#f4b942] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{f}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose This</h2>
          <div className="space-y-3">
            {product.benefits.map((b: string, i: number) => (
              <div key={i} className="flex gap-3 text-gray-300">
                <Award className="w-5 h-5 text-[#f4b942] flex-shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {product.testimonials.map((t: any, i: number) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#f4b942] text-[#f4b942]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{t.text}"</p>
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-gray-400 text-sm">{t.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">FAQs</h2>
          <div className="space-y-3">
            {product.faq.map((item: any, i: number) => (
              <details key={i} className="group bg-white/5 border border-white/10 rounded-lg p-6">
                <summary className="flex justify-between items-center font-semibold text-white cursor-pointer">
                  {item.q}
                  <ChevronRight className="w-5 h-5 group-open:rotate-90 transition" />
                </summary>
                <p className="text-gray-400 mt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[#f4b942]/10 to-[#E2136E]/10 border border-[#f4b942]/20 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to get started?</h3>
          <a
            href={`https://wa.me/8801865385348?text=I want to order: ${product.name}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f4b942] to-[#E2136E] text-white font-bold text-lg rounded-lg hover:shadow-lg transition"
          >
            💬 Order on WhatsApp
            <ChevronRight className="w-5 h-5" />
          </a>
          <p className="text-gray-400 text-sm mt-6">✅ Instant activation • ✅ 30-day guarantee • ✅ 24/7 support</p>
        </section>
      </div>
    </main>
  );
}
