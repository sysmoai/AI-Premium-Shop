'use client';

import React from 'react';

/**
 * STATS SECTION - Build Credibility
 *
 * Shows: 3,000+ Customers, Since 2024, 30 Days Warranty, <5 Min Response, 118+ AI Tools
 * Design: Professional cards with icons, brand colors, premium aesthetic
 */

export function StatsSection() {
  const stats = [
    {
      icon: '👥',
      value: '3,000+',
      label: 'Customers',
      description: 'Growing community trusting AI Premium Shop',
      color: 'from-[#E2136E] to-[#f4b942]',
    },
    {
      icon: '📅',
      value: '2024',
      label: 'Established',
      description: 'Serving Bangladesh with premium AI access',
      color: 'from-[#f4b942] to-[#E2136E]',
    },
    {
      icon: '🛡️',
      value: '30 Days',
      label: 'Warranty',
      description: 'Money-back guarantee, no questions asked',
      color: 'from-[#8B2F97] to-[#f4b942]',
    },
    {
      icon: '⚡',
      value: '<5 Min',
      label: 'Response',
      description: '24/7 customer support via WhatsApp',
      color: 'from-[#1A5276] to-[#f4b942]',
    },
    {
      icon: '🎯',
      value: '118+',
      label: 'AI Tools',
      description: 'ChatGPT, Claude, Midjourney & more',
      color: 'from-[#F0B90B] to-[#f4b942]',
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0A0E27] to-[#1a1f3a] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#f4b942] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#f4b942] font-semibold text-lg mb-2">Why Choose AI Premium Shop?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Trusted by thousands, built for results
          </h2>
          <p className="text-gray-400 text-xl mt-4 max-w-2xl mx-auto">
            We&apos;re more than just a service. We&apos;re your partner in AI success.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#1a1f3a] to-[#0A0E27] border border-[#f4b942]/20 rounded-xl p-6 hover:border-[#f4b942]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#f4b942]/20"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${stat.color} rounded-xl transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>

                {/* Value - Large, prominent */}
                <div className="mb-2">
                  <p className="text-4xl font-bold bg-gradient-to-r from-[#f4b942] to-white bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </div>

                {/* Label */}
                <p className="text-gray-300 font-semibold text-lg mb-2">{stat.label}</p>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Visual accent */}
                <div className={`absolute top-0 right-0 w-1 h-12 bg-gradient-to-b ${stat.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            </div>
          ))}
        </div>

        {/* Additional trust elements */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#f4b942]/10 border border-[#f4b942]/30 rounded-full mb-4">
              <span className="text-[#f4b942] font-bold">✓</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Secure & Verified</h3>
            <p className="text-gray-400 text-sm">
              Bank-level security with verified payment methods
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#f4b942]/10 border border-[#f4b942]/30 rounded-full mb-4">
              <span className="text-[#f4b942] font-bold">✓</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-400 text-sm">
              Account access within 5 minutes of order confirmation
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#f4b942]/10 border border-[#f4b942]/30 rounded-full mb-4">
              <span className="text-[#f4b942] font-bold">✓</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Lifetime Support</h3>
            <p className="text-gray-400 text-sm">
              24/7 WhatsApp support for all customer inquiries
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
