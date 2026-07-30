/**
 * HIGGSFIELD AI INTEGRATION
 * High-Quality Graphics Generation for AI Premium Shop
 *
 * Strategy: Generate optimized images that:
 * 1. Load fast (< 100KB per image)
 * 2. Look premium (top-tier design quality)
 * 3. Are responsive (scale on all devices)
 * 4. Follow brand guidelines (dark #0A0E27, gold #f4b942)
 */

const HIGGSFIELD_API_KEY = process.env.HIGGSFIELD_API_KEY;
const HIGGSFIELD_BASE_URL = 'https://api.higgsfield.ai/v1';

interface HiggsFieldImageOptions {
  prompt: string;
  size?: '512x512' | '768x768' | '1024x1024';
  model?: string;
  style?: string;
  quality?: 'fast' | 'balanced' | 'quality';
}

/**
 * Generate optimized images for web (WEBP format, < 100KB)
 */
export async function generateWebImage(options: HiggsFieldImageOptions) {
  if (!HIGGSFIELD_API_KEY) {
    console.error('❌ Higgsfield API key not configured');
    return null;
  }

  try {
    const payload = {
      prompt: options.prompt,
      size: options.size || '768x768',
      model: options.model || 'stable-diffusion-xl',
      style: options.style || 'modern',
      format: 'webp',
      quality: options.quality || 'balanced',
    };

    const response = await fetch(`${HIGGSFIELD_BASE_URL}/images/generate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HIGGSFIELD_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Higgsfield API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('❌ Image generation failed:', error);
    return null;
  }
}

/**
 * HERO SECTION IMAGE
 * Main banner - 1200x600 optimized
 */
export async function generateHeroBanner() {
  return generateWebImage({
    prompt: `Professional, modern hero banner for "AI Premium Shop"

Style: Minimalist tech aesthetic
Colors: Dark navy background (#0A0E27), gold accents (#f4b942)
Content: 118+ AI tools, fast delivery, Bangladesh-friendly prices
Visual: Glowing AI assistant character, floating AI icons, modern typography
Mood: Professional, trustworthy, innovative
File Size: Optimized for web < 100KB
Format: Ultra-high quality but fast loading`,
    size: '1024x1024',
    quality: 'balanced',
  });
}

/**
 * PRODUCT SHOWCASE SECTION
 * Animated product grid background
 */
export async function generateProductShowcase() {
  return generateWebImage({
    prompt: `Modern product showcase background for AI tools

Visual: Grid of glowing AI tool icons (ChatGPT, Claude, Midjourney, etc)
Style: Dark background with subtle gradients
Colors: Navy blue (#0A0E27), gold highlights (#f4b942), subtle blues
Effect: Floating, dynamic, professional
Optimization: Ultra-lightweight, web-ready
Perfect for: Product grid background`,
    size: '1024x1024',
    quality: 'fast',
  });
}

/**
 * BRAND SHOWCASE SECTION
 * Beautiful brand presentation
 */
export async function generateBrandShowcase() {
  return generateWebImage({
    prompt: `Stunning visualization of premium AI brands

Brands featured: ChatGPT, Claude, Midjourney, Google Gemini, GitHub Copilot, Runway, ElevenLabs, Suno
Style: Modern luxury, interconnected network
Colors: Dark navy (#0A0E27), gold accents (#f4b942), RGB tech colors
Visual: Brands floating in a network, glowing connections, professional
Mood: Exclusive, premium, global tech authority
Optimization: Fast-loading, web-optimized`,
    size: '1024x1024',
    quality: 'balanced',
  });
}

/**
 * PAYMENT METHODS SHOWCASE
 * Beautiful payment icons visualization
 */
export async function generatePaymentMethods() {
  return generateWebImage({
    prompt: `Professional payment methods visualization for Bangladesh

Methods: bKash, Nagad, Rocket, Bank Transfer, Binance
Style: Modern, clean, professional
Colors: Dark background, brand colors (bKash pink #E2136E, Nagad orange #F6921E, Rocket purple #8B2F97, Bank blue #1A5276, Binance gold #F0B90B)
Visual: Payment icons interconnected, flow of money, secure, trusted
Optimization: Ultra-optimized, < 80KB
Perfect for: Payment section hero image`,
    size: '1024x1024',
    quality: 'fast',
  });
}

/**
 * FAQ SECTION BACKGROUND
 * Interactive, helpful atmosphere
 */
export async function generateFAQBackground() {
  return generateWebImage({
    prompt: `Friendly, helpful FAQ section background

Visual: Question marks, helpful AI assistant, light bulbs (ideas), conversation bubbles
Style: Modern, approachable, professional
Colors: Dark navy background, gold accents, soft glows
Mood: Helpful, transparent, customer-focused
Optimization: Fast-loading web version
Perfect for: FAQ section backdrop`,
    size: '768x768',
    quality: 'fast',
  });
}

/**
 * CTA BUTTON BACKGROUND
 * Eye-catching call-to-action element
 */
export async function generateCTABackground() {
  return generateWebImage({
    prompt: `Modern, eye-catching CTA button background

Text: "Order via WhatsApp" or "Get Started Now"
Style: Bold, modern, action-oriented
Colors: Gold gradient (#f4b942), navy accents (#0A0E27)
Visual: Energy, movement, urgency without aggression
Effect: Subtle animation-ready design
Optimization: Lightweight, web-ready
Perfect for: CTA buttons and hero sections`,
    size: '512x512',
    quality: 'fast',
  });
}

/**
 * TESTIMONIAL SECTION
 * Trust-building testimonial background
 */
export async function generateTestimonialBg() {
  return generateWebImage({
    prompt: `Warm, trustworthy testimonial section background

Visual: Happy customers, stars, positive feedback bubbles, community vibes
Style: Modern, inclusive, authentic
Colors: Dark navy (#0A0E27), warm gold (#f4b942), soft greens
Mood: Trust, community, success stories
Optimization: Web-optimized, fast-loading
Perfect for: Testimonial and reviews section`,
    size: '1024x1024',
    quality: 'balanced',
  });
}

/**
 * FEATURE ICONS (Animated)
 * 6 key features visualization
 */
export async function generateFeatureIcon(feature: string) {
  const iconPrompts: Record<string, string> = {
    speed: 'Lightning bolt, fast motion lines, speed symbolism, modern style',
    security: 'Shield, lock, protection symbols, trust, security vibes',
    support: 'Headphones, chat bubble, helping hands, customer support symbol',
    quality: 'Star, checkmark, quality badge, excellence symbol',
    variety: 'Multiple objects, rainbow, diversity, choice symbol',
    value: 'Gold coin, money symbol, value, savings, affordability icon',
  };

  return generateWebImage({
    prompt: `Modern, minimalist icon for "${feature}" feature
    ${iconPrompts[feature] || 'Modern tech symbol'}
    Style: Clean, professional, web-ready
    Colors: Gold (#f4b942) on dark background
    Format: Icon, single element, no text
    Optimization: Ultra-lightweight, perfect for web`,
    size: '512x512',
    quality: 'fast',
  });
}

/**
 * HIGGSFIELD BEST PRACTICES FOR AIPS
 */
export const higgsieldBestPractices = {
  /**
   * Image Optimization Strategy
   */
  optimization: {
    format: 'WEBP',
    maxFileSize: '100KB',
    sizes: {
      hero: '1024x1024',
      section: '768x768',
      card: '512x512',
      icon: '256x256',
    },
    quality: {
      hero: 'balanced',
      general: 'balanced',
      icons: 'fast',
    },
  },

  /**
   * Brand Guidelines for Higgsfield
   */
  brandGuidelines: {
    primaryColor: '#0A0E27',      // Dark navy
    accentColor: '#f4b942',        // Gold
    secondaryColors: [
      '#E2136E',  // bKash pink
      '#F6921E',  // Nagad orange
      '#8B2F97',  // Rocket purple
      '#1A5276',  // Bank blue
      '#F0B90B',  // Binance gold
    ],
    mood: 'Professional, premium, innovative, trustworthy',
    style: 'Modern, minimalist, tech-forward',
  },

  /**
   * Prompt Templates for Consistent Results
   */
  templates: {
    productImage: (productName: string) =>
      `Beautiful, professional product image for "${productName}" AI tool
       Style: Modern tech aesthetic
       Colors: Dark navy background with gold accents
       Quality: Premium, high-end, professional
       File Size: Optimized < 100KB
       Format: Ready for web, fast-loading`,

    sectionBg: (sectionName: string) =>
      `Modern background for "${sectionName}" section
       Style: Professional, premium, modern
       Colors: Navy (#0A0E27) with gold accents (#f4b942)
       Mood: Engaging, professional, innovative
       Optimization: Web-ready, < 100KB`,

    ctaDesign: (buttonText: string) =>
      `Eye-catching CTA design for "${buttonText}"
       Style: Modern, action-oriented
       Colors: Gold gradient with navy accents
       Effect: Professional, premium, conversion-focused`,
  },

  /**
   * Performance Tips
   */
  performanceTips: [
    'Use WEBP format for all images (60% smaller than PNG)',
    'Target 768x768 or smaller for web images',
    'Use quality: "fast" for icons and backgrounds',
    'Use quality: "balanced" for hero and main content images',
    'Lazy load all section images (load on scroll)',
    'Cache images aggressively (CDN + browser)',
    'Use CSS filters for subtle effects instead of pre-rendered variations',
    'Serve different sizes for mobile vs desktop',
    'Compress WEBP further with optimization tools',
    'Aim for < 50KB per image on mobile',
  ],
};

const higgsfieldService = { generateWebImage, higgsieldBestPractices };
export default higgsfieldService;
