'use client';

import React from 'react';

/**
 * USE CASES VISUAL SECTION
 *
 * Demonstrates real-world value with problem-solution flow
 * Message: "What Takes You 3 Hours — AI Does in 15 Minutes"
 *
 * Two powerful use cases:
 * 1. Upwork Freelancer - No clients → Winning proposals in 2 minutes
 * 2. Job Seeker - Can't land job → Interview prep & CV in 15 minutes
 */

export function UseCasesVisualSection() {
  const useCases = [
    {
      id: 'upwork',
      icon: '💼',
      problem: 'No clients on Upwork?',
      problem_detail: 'Struggling to find freelance work, worried about competition',
      solution: 'Claude writes winning proposals in 2 minutes',
      solution_detail: 'AI-crafted personalized proposals that actually land clients',
      before: {
        icon: '😢',
        metric: '0 clients',
        description: 'No active gigs, struggling to get visibility'
      },
      after: {
        icon: '💰',
        metric: '5+ clients',
        description: 'Multiple active projects, steady income stream'
      },
      timeframe: '2 minutes per proposal',
      tools: ['Claude', 'ChatGPT', 'Perplexity'],
      results: ['Higher response rate', 'Better project quality', 'Faster hiring'],
      color: 'from-[#E2136E] to-[#f4b942]'
    },
    {
      id: 'job',
      icon: '🎯',
      problem: 'Can\'t land a job?',
      problem_detail: 'Job hunting is taking forever, interviews not going well',
      solution: 'AI preps your interview & tailors your CV',
      solution_detail: 'Personalized interview coaching and CV optimization',
      before: {
        icon: '😰',
        metric: 'Generic CV',
        description: 'Same resume for every application, no interviews'
      },
      after: {
        icon: '🎓',
        metric: 'Job offer',
        description: 'Tailored applications, interview success, new role'
      },
      timeframe: '15 minutes total prep',
      tools: ['Claude', 'ChatGPT', 'Google AI'],
      results: ['More interviews', 'Better answers', 'Dream job closer'],
      color: 'from-[#8B2F97] to-[#f4b942]'
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#1a1f3a] to-[#0A0E27] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#f4b942] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#f4b942] font-semibold text-lg mb-2">🎯 Real Impact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Takes You 3 Hours — AI Does in 15 Minutes
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            See how real people in Bangladesh are saving time, making money,
            and achieving their goals with AI Premium Shop
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {useCases.map((useCase) => (
            <div
              key={useCase.id}
              className="group relative bg-gradient-to-br from-[#1a1f3a] to-[#0A0E27] border-2 border-[#f4b942]/20 rounded-2xl overflow-hidden hover:border-[#f4b942]/50 transition-all duration-300"
            >
              {/* Top accent bar */}
              <div className={`h-1 bg-gradient-to-r ${useCase.color}`} />

              {/* Content */}
              <div className="p-8">
                {/* Icon and title */}
                <div className="mb-6">
                  <div className="text-5xl mb-3">{useCase.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {useCase.problem}
                  </h3>
                  <p className="text-gray-400 text-sm">{useCase.problem_detail}</p>
                </div>

                {/* Problem to Solution flow */}
                <div className="mb-8 py-6 bg-[#0A0E27]/50 rounded-lg px-6">
                  <div className="flex items-center justify-between mb-4">
                    {/* Problem state */}
                    <div className="text-center flex-1">
                      <div className="text-3xl mb-2">{useCase.before.icon}</div>
                      <p className="font-bold text-white text-lg">{useCase.before.metric}</p>
                      <p className="text-gray-400 text-xs mt-2">{useCase.before.description}</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 px-4">
                      <div className="text-[#f4b942] text-3xl font-bold">→</div>
                    </div>

                    {/* Solution state */}
                    <div className="text-center flex-1">
                      <div className="text-3xl mb-2">{useCase.after.icon}</div>
                      <p className="font-bold text-white text-lg">{useCase.after.metric}</p>
                      <p className="text-gray-400 text-xs mt-2">{useCase.after.description}</p>
                    </div>
                  </div>

                  {/* Time indicator */}
                  <div className="text-center pt-4 border-t border-[#f4b942]/20">
                    <p className="text-[#f4b942] font-bold">⏱️ {useCase.timeframe}</p>
                  </div>
                </div>

                {/* Solution headline */}
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-1">💡 Solution</p>
                  <h4 className="text-lg font-bold bg-gradient-to-r from-[#f4b942] to-white bg-clip-text text-transparent">
                    {useCase.solution}
                  </h4>
                  <p className="text-gray-400 text-sm mt-2">{useCase.solution_detail}</p>
                </div>

                {/* Tools used */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-2">🔧 AI Tools Used</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#f4b942]/10 border border-[#f4b942]/30 rounded-full text-xs text-[#f4b942] font-semibold"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="mb-8">
                  <p className="text-xs text-gray-500 mb-2">✅ Real Results</p>
                  <ul className="space-y-2">
                    {useCase.results.map((result, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-[#f4b942] text-sm">✓</span>
                        <span className="text-gray-300 text-sm">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button className="w-full px-6 py-3 bg-gradient-to-r from-[#f4b942] to-[#E2136E] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#f4b942]/50 transition-all duration-300 transform hover:scale-105">
                  💬 Order via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="text-center bg-gradient-to-r from-[#E2136E]/10 to-[#f4b942]/10 border border-[#f4b942]/30 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Your story could be next
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 3,000+ customers in Bangladesh who are already saving time,
            making money, and achieving their goals with AI Premium Shop
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-[#E2136E] to-[#f4b942] text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-[#f4b942]/50 transition-all duration-300 transform hover:scale-105">
            💬 Order on WhatsApp Now
          </button>
          <p className="text-gray-400 text-sm mt-4">
            No questions asked • 30-day money-back guarantee • 24/7 support
          </p>
        </div>
      </div>
    </section>
  );
}

export default UseCasesVisualSection;
