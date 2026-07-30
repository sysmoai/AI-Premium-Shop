'use client';

import React, { useEffect, useState } from 'react';
import { generateWebImage } from '@/lib/higgsfield';

/**
 * ENHANCED HERO SECTION
 *
 * Strategic graphics implementation for AI Premium Shop homepage
 *
 * MESSAGE: "What Takes You 3 Hours — AI Does in 15 Minutes"
 *
 * Design Philosophy:
 * 1. SPEED - Visual representation of 3 hours → 15 minutes transformation
 * 2. PREMIUM - Gold accents, luxury aesthetic (#f4b942 on #0A0E27)
 * 3. ACCESSIBLE - Bangladesh-friendly, inclusive imagery
 * 4. TRUST - Community, growth, professional quality
 * 5. ACTION - Clear CTA with visual reinforcement
 */

interface HeroGraphics {
  heroBanner?: string;
  trustBadge?: string;
  speedIcon?: string;
  communityVibes?: string;
}

export function EnhancedHeroSection() {
  const [graphics, setGraphics] = useState<HeroGraphics>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateHeroGraphicsOnLoad();
  }, []);

  async function generateHeroGraphicsOnLoad() {
    try {
      console.log('🎨 Generating hero graphics for homepage...');

      // Generate hero banner - the centerpiece
      const heroBanner = await generateWebImage({
        prompt: `PREMIUM HERO BANNER for AI Premium Shop homepage

CORE MESSAGE: "What Takes You 3 Hours — AI Does in 15 Minutes"

DESIGN STRATEGY:
1. SPEED VISUALIZATION
   - Clock showing 3 hours transforming to 15 minutes
   - Lightning bolts indicating speed
   - Motion lines showing acceleration
   - Time flowing, efficiency gain

2. PROFESSIONAL AI
   - Modern AI assistant character (approachable, trustworthy)
   - Not cartoonish, not sci-fi
   - Glowing aura, premium feel
   - Diverse representation

3. NETWORK OF TOOLS
   - ChatGPT, Claude, Midjourney, Google icons connected
   - Network visualization showing integration
   - All 118+ tools available

4. BANGLADESHI PRIDE
   - Bangladesh cultural subtle elements
   - Local payment methods represented
   - "Accessible prices" messaging

5. PREMIUM AESTHETIC
   - Navy background (#0A0E27)
   - Gold accents (#f4b942)
   - Glowing effects, depth
   - Professional, high-end

COLOR PALETTE:
- Primary: Navy Blue #0A0E27
- Accent: Gold #f4b942
- Tech colors: Blues, purples, teals
- Success: Green tints

MOOD & TONE:
- Innovation without arrogance
- Accessibility without cheapness
- Speed without recklessness
- Premium without exclusivity
- Professional, approachable, trustworthy

TECHNICAL OPTIMIZATION:
- WEBP format for web performance
- Target size: < 100KB
- Responsive scaling friendly
- Animation-ready (CSS hooks)
- High contrast for accessibility

STYLE REFERENCE:
- Apple: Clean, minimalist, premium
- Microsoft: Professional, accessible, trustworthy
- Stripe: Modern, tech-forward, elegant
- Ideal mix: Premium SaaS + Bangladeshi warmth

PERFECT FOR: Main hero section (1024x1024)
PRIORITY: HIGHEST - This is the first impression`,
        size: '1024x1024',
        quality: 'balanced',
      });

      // Generate trust badge background
      const trustBadge = await generateWebImage({
        prompt: `TRUST & COMMUNITY illustration for AI Premium Shop hero section

VISUAL STORYTELLING:
- 3,000+ Happy Customers (diverse, inclusive faces)
- Growth arrow showing success since 2024
- Connected network showing community strength
- Bangladesh prominently represented
- Professional testimonials/reviews indicated

ELEMENTS:
- Community icon (people, network)
- Growth indicators (upward trends)
- Trust symbols (checkmarks, badges, locks)
- Diverse representation (Bangladeshi, Asian, international)
- Warm, inviting feeling

COLORS:
- Navy background #0A0E27
- Gold accents #f4b942
- Green for trust/growth
- Skin tone diversity

STYLE:
- Modern, flat/semi-flat
- Professional, not startup-casual
- Accessible, inclusive design
- Warm and inviting

MOOD: Community, trust, growth, accessibility
OPTIMIZATION: WEBP < 80KB (768x768)
PERFECT FOR: Hero section trust element`,
        size: '768x768',
        quality: 'balanced',
      });

      setGraphics({
        heroBanner,
        trustBadge,
      });

      console.log('✅ Hero graphics generated successfully');
    } catch (error) {
      console.error('❌ Error generating hero graphics:', error);
      // Fallback to placeholder or keep existing hero
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0A0E27] to-[#1a1f3a] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f4b942] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Trust badge at top */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1f3a] border border-[#f4b942]/30 rounded-full">
            <span className="text-[#f4b942]">⭐</span>
            <p className="text-gray-300 text-sm">
              Trusted by a growing community of customers since 2024
            </p>
          </div>
        </div>

        {/* Main headline */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            What Takes You{' '}
            <span className="text-[#f4b942] block mt-2">3 Hours</span>
            <span className="text-gray-400 text-4xl md:text-5xl lg:text-6xl">—</span>
            <span className="text-[#f4b942]">AI Does in 15 Minutes</span>
          </h1>

          {/* Subheading with enhanced visuals */}
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-300 mb-8">
              <span className="font-bold text-white">118+ Premium AI Tools</span> from BDT 299 to BDT 29,900.
              ChatGPT, Claude, Midjourney, Adobe, Notion & 60+ more.
            </p>

            {/* Payment methods - styled premium */}
            <div className="flex justify-center items-center gap-3 flex-wrap mb-12">
              <span className="text-gray-400 text-sm">5 Payment Methods:</span>
              <div className="flex gap-2 flex-wrap justify-center">
                {[
                  { name: 'bKash', color: 'bg-[#E2136E]' },
                  { name: 'Nagad', color: 'bg-[#F6921E]' },
                  { name: 'Rocket', color: 'bg-[#8B2F97]' },
                  { name: 'Bank', color: 'bg-[#1A5276]' },
                  { name: 'Binance', color: 'bg-[#F0B90B]' },
                ].map(method => (
                  <span key={method.name} className={`${method.color} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                    {method.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Use case examples with visual separation */}
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-4">
                <span className="text-gray-400">No clients on Upwork?</span>
                <span className="text-[#f4b942]">→</span>
                <span className="text-white font-semibold">Claude writes winning proposals in 2 minutes</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-gray-400">Can&apos;t land a job?</span>
                <span className="text-[#f4b942]">→</span>
                <span className="text-white font-semibold">AI preps your interview & tailors your CV</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons - Premium styling */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="px-8 py-4 bg-gradient-to-r from-[#E2136E] to-[#f4b942] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#f4b942]/50 transition-all duration-300 transform hover:scale-105">
            💬 Order on WhatsApp
          </button>
          <button className="px-8 py-4 border-2 border-[#f4b942] text-[#f4b942] font-bold rounded-lg hover:bg-[#f4b942]/10 transition-all duration-300">
            Which AI is right for me? →
          </button>
        </div>

        {/* Stats grid with icons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {[
            { icon: '👥', value: '3,000+', label: 'Customers' },
            { icon: '📅', value: '2024', label: 'Established' },
            { icon: '🛡️', value: '30 Days', label: 'Warranty' },
            { icon: '⚡', value: '<5 Min', label: 'Response' },
            { icon: '🎯', value: '118+', label: 'AI Tools' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#1a1f3a] border border-[#f4b942]/20 rounded-lg p-4 text-center hover:border-[#f4b942]/50 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="font-bold text-white text-lg">{stat.value}</p>
              <p className="text-gray-400 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brand logos section below hero */}
      <div className="relative z-10 bg-gradient-to-b from-transparent to-[#0A0E27] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm mb-8">
            GPT • CLAUDE • MIDJOURNEY • GEMINI • GITHUB COPILOT • RUNWAY •
            ELEVENLABS • SUNO • IDEOGRAM • NOTION • CANVA • & 100+ more
          </p>
        </div>
      </div>
    </section>
  );
}

export default EnhancedHeroSection;
