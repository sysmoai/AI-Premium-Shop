# AI Premium Shop

**Bangladesh's premier AI tools and automation subscription marketplace.**

Premium AI tools, templates, and automation workflows delivered via WhatsApp with bKash/Nagad payment support.

## Overview

AI Premium Shop is a modern e-commerce platform specializing in:
- Premium AI tool subscriptions
- Automation templates and workflows  
- No-code system setups
- WhatsApp-integrated delivery
- bKash/Nagad payment processing
- Bengali language support

**Live:** https://aipremiumshop.com

## Tech Stack

- **Frontend:** React/Next.js with TypeScript
- **Backend:** Node.js/Express or similar
- **Database:** PostgreSQL
- **Payment:** bKash & Nagad APIs
- **Messaging:** WhatsApp Business API
- **Hosting:** Vercel (Frontend), AWS/Cloud (Backend)

## Project Structure

```
src/
├── components/       # React components
├── pages/           # Next.js pages/routes
├── services/        # API services
├── utils/           # Helper functions
├── styles/          # CSS/Tailwind styles
└── config/          # Configuration files

public/
├── images/          # Static images
├── icons/           # Brand icons
└── assets/          # Other assets
```

## Features

### Product Management
- 100+ premium AI tools
- Subscription tiers
- Product catalog with search
- Category browsing
- Reviews and ratings

### Commerce
- Shopping cart
- Checkout process
- bKash/Nagad payment integration
- Order tracking
- Invoice generation

### Localization
- English & Bengali support
- RTL support for Bengali
- Locale-specific content

### User System
- User registration/login
- Profile management
- Order history
- Subscription management
- Wishlist/favorites

## Development

### Install Dependencies
```bash
npm install
# or
pnpm install
```

### Start Dev Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Environment Setup
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

## Deployment

### To Vercel
```bash
vercel --prod
```

### To AWS
```bash
npm run build
# Deploy to your chosen platform
```

## Configuration

Key configuration files:
- `.env.example` - Environment variables template
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration

## Payment Integration

### bKash
- App Key and Secret required
- Webhook configuration needed
- Test mode available for development

### Nagad
- Merchant ID required
- API Key needed
- Sandbox environment for testing

## API Endpoints

**See API documentation** (docs/API.md)

Main endpoints:
- `POST /api/auth/login` - User login
- `GET /api/products` - Get product list
- `POST /api/orders` - Create order
- `POST /api/payments` - Process payment

## Database Schema

See `docs/DATABASE.md` for complete schema documentation.

Key tables:
- users
- products
- orders
- subscriptions
- payments
- order_items

## Testing

```bash
npm test              # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

## Monitoring

- Sentry for error tracking
- DataDog for performance monitoring
- CloudFlare Analytics for traffic

## Support

- **Email:** support@aipremiumshop.com
- **WhatsApp:** [Link to WhatsApp]
- **Website:** https://aipremiumshop.com

## Brand Guidelines

See `docs/BRAND.md` for:
- Logo usage
- Color palette
- Typography
- Voice and tone

## Contributing

See `CONTRIBUTING.md` for development guidelines.

## License

Private - SYSmoAI. All rights reserved.

---

Built in Dhaka, Bangladesh 🇧🇩  
Part of the SYSmoAI ecosystem
