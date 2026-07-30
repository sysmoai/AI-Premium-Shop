'use client';

import React from 'react';

/**
 * BRANDS SHOWCASE SECTION
 *
 * Displays: Access to 118+ AI tools from top brands
 * Design: Premium brand grid with network visualization
 * Message: Exclusive access, premium quality, global reach
 */

export function BrandsShowcase() {
  const brands = [
    { name: 'ChatGPT', icon: '🤖', color: '#10A37F' },
    { name: 'Claude', icon: '🧠', color: '#FF6B35' },
    { name: 'Midjourney', icon: '🎨', color: '#9D4EDD' },
    { name: 'Google Gemini', icon: '✨', color: '#4285F4' },
    { name: 'GitHub Copilot', icon: '💻', color: '#28A745' },
    { name: 'Runway', icon: '🎬', color: '#FF006E' },
    { name: 'ElevenLabs', icon: '🎙️', color: '#1F77E6' },
    { name: 'Suno', icon: '🎵', color: '#FF4D00' },
    { name: 'Notion', icon: '📝', color: '#000000' },
    { name: 'Canva', icon: '🖼️', color: '#00D4FF' },
    { name: 'Adobe Suite', icon: '🎯', color: '#FF0000' },
    { name: '& 107 More', icon: '🌐', color: '#f4b942' },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#1a1f3a] to-[#0A0E27] overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#f4b942] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#f4b942] font-semibold text-lg mb-2">Premium Access</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            118+ AI Tools from Top Brands
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Access to world&apos;s leading AI platforms. All features, all working.
            Official licenses, verified access, premium support included.
          </p>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#1a1f3a] to-[#0A0E27] border border-[#f4b942]/20 rounded-lg p-6 text-center hover:border-[#f4b942]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#f4b942]/20 hover:scale-105 cursor-pointer"
            >
              {/* Icon */}
              <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">
                {brand.icon}
              </div>

              {/* Brand name */}
              <p className="text-white font-semibold text-sm">{brand.name}</p>

              {/* Hover effect - brand color accent */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300"
                style={{ backgroundColor: brand.color }}
              />
            </div>
          ))}
        </div>

        {/* Features highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0A0E27] border border-[#f4b942]/20 rounded-lg p-8">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-white font-bold text-xl mb-2">Official Licenses</h3>
            <p className="text-gray-400">
              Verified, legitimate accounts directly from official sources
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0A0E27] border border-[#f4b942]/20 rounded-lg p-8">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-white font-bold text-xl mb-2">Instant Activation</h3>
            <p className="text-gray-400">
              Full access within 5 minutes of order confirmation
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0A0E27] border border-[#f4b942]/20 rounded-lg p-8">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-white font-bold text-xl mb-2">24/7 Support</h3>
            <p className="text-gray-400">
              Complete setup assistance and ongoing support on WhatsApp
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#E2136E]/10 to-[#f4b942]/10 border border-[#f4b942]/30 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Which AI tool is right for you?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Not sure which AI platform fits your needs? Our team will help you
            find the perfect tool bundle for your goals.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-[#f4b942] to-[#E2136E] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#f4b942]/50 transition-all duration-300 transform hover:scale-105">
            Get Free Consultation →
          </button>
        </div>
      </div>
    </section>
  );
}

export default BrandsShowcase;
