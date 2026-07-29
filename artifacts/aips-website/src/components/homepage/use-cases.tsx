'use client';

import React from 'react';

/**
 * USE CASES SECTION
 *
 * Real-world examples of how AI Premium Shop changes lives
 * Message: Speed, efficiency, results
 * Design: Problem -> Solution transformation
 */

export function UseCasesSection() {
  const useCases = [
    {
      problem: "No Clients on Upwork?",
      solution: "Claude writes winning proposals in 2 minutes",
      icon: "💼",
      stats: {
        before: "0 clients",
        after: "Multiple gigs",
        time: "2 min/proposal",
      },
      description:
        "Stop struggling with proposal writing. Claude generates professional, personalized proposals that land clients. Your Upwork success starts here.",
      color: "from-[#E2136E] to-[#f4b942]",
    },
    {
      problem: "Can't Land a Job?",
      solution: "AI preps your interview & tailors your CV",
      icon: "🎯",
      stats: {
        before: "Generic resume",
        after: "Tailored CV",
        time: "15 min prep",
      },
      description:
        "Transform your job search. AI helps you customize your CV, prepare for interviews, and practice with realistic scenarios. Land your dream job faster.",
      color: "from-[#8B2F97] to-[#f4b942]",
    },
    {
      problem: "Content Creation Taking Hours?",
      solution: "Generate quality content in minutes with Claude + Midjourney",
      icon: "✍️",
      stats: {
        before: "3 hours/post",
        after: "15 minutes/post",
        time: "94% faster",
      },
      description:
        "Creators, bloggers, and marketers: save hours on content creation. AI generates ideas, writes copy, creates visuals. 118+ tools to choose from.",
      color: "from-[#1A5276] to-[#f4b942]",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0A0E27] to-[#1a1f3a] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#f4b942] rounded-full blur-3xl -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#f4b942] font-semibold text-lg mb-2">Real Impact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Takes You 3 Hours — AI Does in 15 Minutes
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            See how real people are saving time, making money, and achieving more with AI Premium Shop
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#1a1f3a] to-[#0A0E27] border border-[#f4b942]/20 rounded-2xl overflow-hidden hover:border-[#f4b942]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#f4b942]/20"
            >
              {/* Top bar with gradient */}
              <div className={`h-1 bg-gradient-to-r ${useCase.color}`} />

              {/* Content */}
              <div className="p-8">
                {/* Icon */}
                <div className="text-5xl mb-4">{useCase.icon}</div>

                {/* Problem */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {useCase.problem}
                </h3>

                {/* Arrow */}
                <div className="text-[#f4b942] font-bold text-2xl mb-3">↓</div>

                {/* Solution */}
                <p className="text-lg font-semibold bg-gradient-to-r from-[#f4b942] to-white bg-clip-text text-transparent mb-4">
                  {useCase.solution}
                </p>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {useCase.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#f4b942]/20">
                  <div className="text-center">
                    <p className="text-[#f4b942] font-bold text-sm mb-1">
                      {useCase.stats.before}
                    </p>
                    <p className="text-gray-500 text-xs">Before</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-2xl">→</p>
                    <p className="text-gray-500 text-xs">Transform</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#f4b942] font-bold text-sm mb-1">
                      {useCase.stats.after}
                    </p>
                    <p className="text-gray-500 text-xs">After</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment methods section */}
        <div className="mt-20 bg-gradient-to-r from-[#1a1f3a] to-[#0A0E27] border border-[#f4b942]/20 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-2">
              5 Payment Methods - Choose What's Best for You
            </h3>
            <p className="text-gray-400">
              All payment methods available instantly. No restrictions. Fast processing.
            </p>
          </div>

          {/* Payment methods grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'bKash', color: 'bg-[#E2136E]', icon: '📱' },
              { name: 'Nagad', color: 'bg-[#F6921E]', icon: '💳' },
              { name: 'Rocket', color: 'bg-[#8B2F97]', icon: '🚀' },
              { name: 'Bank', color: 'bg-[#1A5276]', icon: '🏦' },
              { name: 'Binance', color: 'bg-[#F0B90B]', icon: '₿' },
            ].map((method, idx) => (
              <div
                key={idx}
                className={`${method.color} rounded-lg p-6 text-white text-center font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer`}
              >
                <div className="text-3xl mb-2">{method.icon}</div>
                <p>{method.name}</p>
              </div>
            ))}
          </div>

          {/* Additional payment info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#f4b942]">Instant</p>
              <p className="text-gray-400 text-sm mt-1">Fast processing</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#f4b942]">Secure</p>
              <p className="text-gray-400 text-sm mt-1">Bank-level security</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#f4b942]">Easy</p>
              <p className="text-gray-400 text-sm mt-1">No hidden charges</p>
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6 text-lg">
            Ready to transform your workflow?
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-[#E2136E] to-[#f4b942] text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-[#f4b942]/50 transition-all duration-300 transform hover:scale-105">
            💬 Order on WhatsApp Now
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Chat with our team • Get setup in 5 minutes • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}

export default UseCasesSection;
