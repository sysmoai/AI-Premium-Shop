import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

// Initialize Mixpanel
if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    track_pageview: true,
    persistence: 'localStorage',
  });
}

export const analytics = {
  // Page events
  pageViewed: (pageName: string, properties?: Record<string, unknown>) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track('Page Viewed', {
        page: pageName,
        timestamp: new Date().toISOString(),
        ...properties,
      });
    }
  },

  // Product events
  productViewed: (productId: string, productName: string, category: string) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track('Product Viewed', {
        product_id: productId,
        product_name: productName,
        category,
        timestamp: new Date().toISOString(),
      });
    }
  },

  productAdded: (productId: string, price: number, currency: string) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track('Product Added to Order', {
        product_id: productId,
        price,
        currency,
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Order events
  orderInitiated: (totalAmount: number, currency: string) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track('Order Initiated', {
        total_amount: totalAmount,
        currency,
        timestamp: new Date().toISOString(),
      });
    }
  },

  orderCompleted: (orderId: string, totalAmount: number, paymentMethod: string) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track('Order Completed', {
        order_id: orderId,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Customer events
  customerSignup: (email: string, segment?: string) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.identify(email);
      mixpanel.track('Customer Signup', {
        email,
        segment: segment || 'unknown',
        timestamp: new Date().toISOString(),
      });
      mixpanel.people.set({
        $email: email,
        $created: new Date().toISOString(),
      });
    }
  },

  // Search events
  searchPerformed: (query: string, resultsCount: number) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track('Search Performed', {
        query,
        results_count: resultsCount,
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Support events
  supportTicketCreated: (ticketId: string, category: string) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track('Support Ticket Created', {
        ticket_id: ticketId,
        category,
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Chatbot events
  chatbotMessageSent: (message: string, intent?: string) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track('Chatbot Message Sent', {
        message_length: message.length,
        intent: intent || 'general',
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Set user properties
  setUserProperties: (userId: string, properties: Record<string, unknown>) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.identify(userId);
      mixpanel.people.set(properties);
    }
  },

  // Track custom event
  trackEvent: (eventName: string, properties?: Record<string, unknown>) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track(eventName, {
        timestamp: new Date().toISOString(),
        ...properties,
      });
    }
  },
};

export default analytics;
