import OpenAI from 'openai';

const openaiApiKey = process.env.OPENAI_API_KEY;

const openai = openaiApiKey
  ? new OpenAI({ apiKey: openaiApiKey })
  : null;

export const CHATBOT_SYSTEM_PROMPT = `You are a helpful customer support assistant for AI Premium Shop (AIPS), a Bangladesh-based AI subscription service.

Your responsibilities:
1. Answer questions about our 118+ AI tool subscriptions
2. Help customers choose the right AI tool for their needs
3. Explain pricing, payment methods, and delivery times
4. Provide product comparisons
5. Handle common support questions
6. Escalate complex issues to human support

**Our Products:**
- ChatGPT Plus, Claude Pro, Midjourney, Google Gemini, GitHub Copilot
- Runway, ElevenLabs, Suno, Ideogram, and 109+ other AI tools
- Shared accounts (budget-friendly) and Personal accounts (full privacy)
- Prices from ৳299/month to ৳29,900/month

**Payment Methods:**
- bKash (5-30 min delivery)
- Nagad (5-30 min delivery)
- Rocket (5-30 min delivery)
- Bank Transfer (2 hour verification)
- Binance (instant crypto payment)

**Key Information:**
- Location: Bangladesh-first, global ambitions
- Delivery: Fast (5-30 minutes for most payments)
- Warranty: 30-day money-back guarantee
- Support: 24/7 via WhatsApp
- WhatsApp: +8801865385348

**Always:**
- Be helpful, friendly, and professional
- Use local Bangladesh context when relevant
- Mention pricing in BDT (Bangladeshi Taka)
- Offer WhatsApp support for complex issues
- Mention our 30-day warranty
- Be honest about product features and limitations`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateChatbotResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  if (!openai) {
    console.warn('⚠️  OpenAI API key not configured');
    return 'I apologize, but the chatbot service is currently unavailable. Please contact us via WhatsApp: +8801865385348';
  }

  try {
    const messages: ChatMessage[] = [
      { role: 'user', content: CHATBOT_SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: userMessage },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      max_tokens: 500,
      temperature: 0.7,
    });

    const assistantMessage =
      response.choices[0]?.message?.content ||
      'I apologize, but I could not generate a response. Please try again or contact our WhatsApp support.';

    return assistantMessage;
  } catch (error) {
    console.error('❌ OpenAI API error:', error);
    return 'I apologize, but I encountered an error. Please try again or contact us via WhatsApp: +8801865385348';
  }
}

export async function classifyCustomerQuery(query: string): Promise<string> {
  if (!openai) return 'general';

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Classify this customer query into ONE category:
            - pricing (about costs)
            - delivery (about delivery time)
            - technical (technical issues)
            - payment (payment methods)
            - product (product recommendations)
            - refund (refund policy)
            - other (general questions)

            Query: "${query}"

            Respond with ONLY the category name.`,
        },
      ],
      max_tokens: 10,
      temperature: 0,
    });

    const category = response.choices[0]?.message?.content || 'general';
    return category.toLowerCase().trim();
  } catch (error) {
    console.error('Error classifying query:', error);
    return 'general';
  }
}

export async function generateProductRecommendation(
  customerSegment: string,
  budget: number
): Promise<string> {
  if (!openai) {
    return 'Please contact us via WhatsApp for personalized recommendations: +8801865385348';
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Based on this customer profile:
            - Segment: ${customerSegment}
            - Budget: ৳${budget}/month

            Recommend 3 AI tools from our catalog that would be perfect for them.
            Include brief reasons why each tool is suitable.
            Keep response concise and helpful.`,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return (
      response.choices[0]?.message?.content ||
      'Please contact us for personalized recommendations.'
    );
  } catch (error) {
    console.error('Error generating recommendation:', error);
    return 'Please contact us for personalized recommendations.';
  }
}

export default { generateChatbotResponse, classifyCustomerQuery, generateProductRecommendation };
