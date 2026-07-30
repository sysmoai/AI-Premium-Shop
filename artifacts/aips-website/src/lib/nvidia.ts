/**
 * NVIDIA NIM API Integration
 * For autonomous AI operations on AI Premium Shop
 * API Key: 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
 * Rate Limit: 40 RPM (free tier)
 */

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1';

interface NvidiaRequestOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

async function callNvidiaAPI(
  endpoint: string,
  payload: Record<string, unknown>,
  model: string = 'meta/llama-3.1-70b-instruct'
) {
  if (!NVIDIA_API_KEY) {
    console.error('❌ NVIDIA API key not configured');
    return null;
  }

  try {
    const url = `${NVIDIA_API_URL}/chat/completions`;

    const options: NvidiaRequestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: payload.messages,
        temperature: payload.temperature || 0.7,
        max_tokens: payload.max_tokens || 500,
        top_p: 0.9,
      }),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`NVIDIA API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error('❌ NVIDIA API call failed:', error);
    return null;
  }
}

export const nvidiaJobs = {
  /**
   * Daily: Research new AI tools
   * Runs every morning at 3 AM Bangladesh time
   */
  async researchNewAITools() {
    console.log('🤖 Starting autonomous AI research job...');

    const result = await callNvidiaAPI('research', {
      messages: [
        {
          role: 'user',
          content: `Research and list the top 5 NEW AI tools that were released or became popular this week.

For each tool, provide:
1. Tool name
2. Launch date or when it became popular
3. Primary use case
4. Pricing model
5. Why it's good for Bangladesh users

Format as JSON array. Focus on tools not yet in our catalog.`,
        },
      ],
    });

    console.log('✅ Research complete:', result);
    return result;
  },

  /**
   * Daily: Generate product descriptions
   * Uses NVIDIA for content generation
   */
  async generateProductDescription(productName: string, features: string[]) {
    const result = await callNvidiaAPI('content', {
      messages: [
        {
          role: 'user',
          content: `Generate a compelling product description for "${productName}" with these features:
${features.map(f => `- ${f}`).join('\n')}

Requirements:
- Write in professional, friendly tone
- Include use cases for Bangladesh market
- Mention pricing value proposition
- Keep to 150-200 words
- Include call-to-action`,
        },
      ],
    });

    return result;
  },

  /**
   * Daily: Generate Bengali content
   */
  async generateBengaliContent(englishContent: string) {
    const result = await callNvidiaAPI('translate', {
      messages: [
        {
          role: 'user',
          content: `Translate this marketing content to Bengali (Bangla):

"${englishContent}"

Make it natural and engaging for Bangladeshi audience. Maintain marketing tone.`,
        },
      ],
    });

    return result;
  },

  /**
   * Real-time: Analyze customer feedback
   */
  async analyzeFeedback(feedback: string) {
    const result = await callNvidiaAPI('analysis', {
      messages: [
        {
          role: 'user',
          content: `Analyze this customer feedback and provide:
1. Sentiment (positive/neutral/negative)
2. Key topics mentioned
3. Suggested action
4. Priority level (high/medium/low)

Feedback: "${feedback}"

Respond as JSON.`,
        },
      ],
    });

    return result;
  },

  /**
   * Scheduled: Generate SEO content
   */
  async generateSEOContent(keyword: string, topic: string) {
    const result = await callNvidiaAPI('seo', {
      messages: [
        {
          role: 'user',
          content: `Write an SEO-optimized blog post introduction for:
Keyword: "${keyword}"
Topic: "${topic}"

Requirements:
- 150-200 words
- Include keyword naturally 2-3 times
- Compelling hook for readers
- Include relevant long-tail keywords
- Target Bangladesh AI enthusiasts`,
        },
      ],
    });

    return result;
  },

  /**
   * Real-time: Content moderation
   */
  async moderateContent(content: string) {
    const result = await callNvidiaAPI('moderation', {
      messages: [
        {
          role: 'user',
          content: `Review this user-generated content for AI Premium Shop:

"${content}"

Check for:
1. Spam or promotional content
2. Offensive or inappropriate language
3. Misinformation
4. Personal information exposure

Respond: APPROVED, NEEDS_REVIEW, or REJECTED with reason.`,
        },
      ],
    });

    return result;
  },

  /**
   * Daily: Generate email subject lines
   */
  async generateEmailSubjects(topic: string, count: number = 5) {
    const result = await callNvidiaAPI('email', {
      messages: [
        {
          role: 'user',
          content: `Generate ${count} compelling email subject lines for AI Premium Shop:
Topic: "${topic}"

Requirements:
- High open rate potential
- Include urgency or curiosity
- Keep under 50 characters
- Relevant to Bangladesh audience
- Professional yet friendly tone

Return as numbered list.`,
        },
      ],
    });

    return result;
  },

  /**
   * Test connection and verify API
   */
  async testConnection() {
    console.log('🧪 Testing NVIDIA API connection...');

    const result = await callNvidiaAPI('test', {
      messages: [
        {
          role: 'user',
          content: 'Say "Connection successful!" if you can read this.',
        },
      ],
    });

    if (result?.includes('Connection successful')) {
      console.log('✅ NVIDIA API connection verified');
      return { success: true, message: result };
    } else {
      console.error('❌ NVIDIA API connection failed');
      return { success: false, error: 'Connection test failed' };
    }
  },
};

export default nvidiaJobs;
