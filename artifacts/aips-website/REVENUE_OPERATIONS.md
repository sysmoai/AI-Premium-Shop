# Revenue Operations Manual — AI Premium Shop

**Last Updated:** July 29, 2026  
**Version:** 1.0  
**Audience:** AIPS Operations Team + Support Staff

---

## Table of Contents

1. [WhatsApp Integration](#whatsapp-integration)
2. [Payment Verification Flow](#payment-verification-flow)
3. [Delivery Activation SOP](#delivery-activation-sop)
4. [Customer Success Tracking](#customer-success-tracking)
5. [Revenue Tracking Dashboard](#revenue-tracking-dashboard)
6. [Issue Escalation](#issue-escalation)
7. [Performance Metrics](#performance-metrics)

---

## WhatsApp Integration

### Primary WhatsApp Contact

- **Main Number:** +880 1865-385348
- **Account Owner:** Emon Hossain
- **Hours:** 24/7 (with response SLA of <2 hours during peak times)
- **Language:** Bengali/English

### Order Inquiry Endpoint

**Link Format:**
```
https://wa.me/8801865385348?text=Hi%2C%20I%27m%20interested%20in%20[Product]%20for%20[Segment]
```

**Example:**
```
https://wa.me/8801865385348?text=Hi%2C%20I%27m%20interested%20in%20ChatGPT%20Plus%20for%20Students
```

### Auto-Message Template

When customers click "Order via WhatsApp" on the website, the WhatsApp chat opens with a pre-filled message:

**Template:**
```
Hi, I'm interested in [Product Name] for [Customer Segment].

Please help me with:
1. Pricing and payment options
2. Delivery timeline
3. Account details
4. Support availability

Thank you!
```

### Customer Information Pre-Fill

**Collect during WhatsApp conversation:**
- Name (from contact)
- Email address (if not known)
- Segment (Student/Freelancer/Business/Developer/Creator/etc.)
- Product ordered (ChatGPT Plus/Claude Pro/Midjourney/etc.)
- Preferred payment method (bKash/Nagad/Rocket/Bank)
- Preferred language (Bengali/English)

**Record in CRM:** Document all customer details in spreadsheet/database for follow-up.

---

## Payment Verification Flow

### Step 1: Customer Initiates Payment

**Process:**
1. Customer sends message on WhatsApp: "I want to order [Product]"
2. Support responds with exact price in BDT
3. Support sends bKash/Nagad merchant number
4. Support provides Account Name for verification

**Account Details to Share:**
- bKash MFS ID: `[To be filled by operations]`
- Nagad MFS ID: `[To be filled by operations]`
- Rocket Account: `[To be filled by operations]`
- Bank Account: `[To be filled by operations]`

### Step 2: Customer Sends Payment

**Customer Action:**
1. Open their bKash/Nagad/Rocket app
2. Send payment to provided merchant number
3. Screenshot the transaction confirmation
4. Send screenshot to WhatsApp with transaction ID visible

**Screenshot Requirements:**
- Transaction ID (must be visible)
- Amount sent (must match quoted price)
- Timestamp (must be recent, within 1 hour)
- Merchant name (must match AIPS account)

### Step 3: Verify Payment

**Support Staff Action:**
1. Receive screenshot from customer
2. Cross-check:
   - Transaction ID in AIPS payment ledger
   - Amount matches quoted price (within ±10 TK tolerance)
   - Timestamp is recent (within last 2 hours)
   - Merchant account matches our records
3. If all checks pass → Mark as "Payment Verified" in CRM
4. If checks fail → Request new screenshot or full refund

**Verification Checklist:**
- [ ] Transaction ID matches ledger
- [ ] Amount is correct
- [ ] Timestamp is recent
- [ ] Merchant name is correct
- [ ] Customer info is complete

### Step 4: Record Payment

**Database Entry (CRM/Spreadsheet):**
| Field | Value | Example |
|-------|-------|---------|
| Customer Name | | Alam Khan |
| WhatsApp Number | | +880 1711-234567 |
| Email | | alam@example.com |
| Product | | ChatGPT Plus |
| Segment | | Freelancer |
| Amount Paid | | 5,000 TK |
| Payment Method | | bKash |
| Transaction ID | | 8F1Z2C3 |
| Timestamp | | 2026-07-29 14:30 |
| Status | | Payment Verified |
| Notes | | Shared account (7-day guarantee) |

---

## Delivery Activation SOP

### Step 1: Generate Credentials (5 minutes after payment verification)

**Process:**
1. Payment marked as "Payment Verified" in CRM
2. Access provider platform (ChatGPT/Claude/Midjourney/etc.)
3. Create new account or generate access token:
   - For ChatGPT Plus: Create new Gmail/OpenAI account
   - For Claude Pro: Generate API token or account
   - For Midjourney: Create Discord account with subscription
   - For Adobe Creative Cloud: Create Adobe ID with subscription

**Credential Format to Generate:**
```
Account Type: [Shared / Personal]
Username: [Email or handle]
Password: [Temporary password - customer must change on first login]
Login URL: [Direct link to platform]
Setup Code: [For 2FA if applicable]
Backup Codes: [Save these in case of account recovery]
```

### Step 2: Create Segment-Specific Setup Guide

**Send via WhatsApp within 15 minutes of payment verification:**

**For Students:**
```
Welcome to ChatGPT Plus! 

Here's how to get started:
1. Open the login link: [URL]
2. Username: [Email]
3. Password: [Password] (change on first login)
4. Enable 2FA (we recommend this)

How to use ChatGPT Plus:
- Use for essays, code debugging, research summaries
- Avoid: Copying essays 1:1 (professors detect this)
- Tips: Ask follow-up questions, rephrase queries

Questions? Reply here anytime!
```

**For Freelancers:**
```
Welcome to ChatGPT Plus!

Your account is ready:
1. Login: [URL]
2. Email: [Email]
3. Password: [Password] (set new password on first login)

Recommended for freelancers:
- Content creation (social media, blog posts)
- Code generation (Python, JavaScript, etc.)
- Email templates and proposals
- Project planning and research

Pro tips:
- Save your best prompts as custom instructions
- Use GPT-4 for complex work (slower but better)
- Consider ChatGPT API for bulk tasks

Stuck? Message us anytime!
```

**For Businesses:**
```
Welcome to ChatGPT Plus!

Account Details:
- Email: [Email]
- Password: [Password] (change immediately on first login)
- Login: [URL]

Best practices:
1. Set up your organization in settings
2. Enable audit logs if using Plus
3. Use custom instructions for brand voice
4. Experiment with plugins for your use case

Your 30-day guarantee:
- Full refund if unsatisfied within 30 days
- We're here to help you succeed

Questions? Contact us on WhatsApp 24/7!
```

### Step 3: Confirm Delivery via WhatsApp

**Support Message:**
```
Hi [Customer Name]! 

Your [Product] account is ready! 

Check your email/WhatsApp for:
✓ Login credentials
✓ Setup guide (with video link)
✓ First-day tips

Delivery confirmed! ✓

You have 30 days to try it risk-free. 
Not happy? We'll refund you completely.

Questions? Ask us anytime!
```

### Step 4: Activate Account (30-minute SLA)

**Activation Checklist:**
- [ ] Credentials generated and sent
- [ ] Setup guide customized and sent
- [ ] Confirmation message sent to customer
- [ ] CRM status updated to "Delivered"
- [ ] Delivery timestamp recorded
- [ ] Follow-up scheduled for Day 1

---

## Customer Success Tracking

### Day 1: Welcome & Setup

**Email (automated if possible, WhatsApp manual):**
```
Subject: Welcome to AI Premium Shop + Setup Guide Video

Hi [Name],

Your [Product] account is now active!

Inside:
- Step-by-step setup guide (text)
- Setup video (link to YouTube unlisted)
- First day tips for your use case
- FAQs for common issues

Your 30-day guarantee starts today. 
If it's not right for you, we'll refund you completely.

Questions? Reply here or message us on WhatsApp.

Best,
Emon Hossain
AI Premium Shop
```

**Scheduled Actions:**
- [ ] Send segment-specific setup guide
- [ ] Send video tutorial link
- [ ] Add to "Active Customers" list
- [ ] Schedule Day 7 check-in

### Day 7: Getting Value Check-In

**WhatsApp Message:**
```
Hi [Name]! 

How's [Product] going? Getting value from it?

Quick feedback:
1. Are you using it? (Yes/No)
2. Any issues or questions? (Yes/No)
3. Would you recommend to a friend? (Yes/No/Maybe)

Let us know! We're here to help.

[Quick Survey Link or Reply]
```

**Based on Response:**
- **Yes + No + Yes:** No action needed, great customer
- **Yes + Yes + Maybe:** Offer technical support
- **No + Any + No:** Offer refund immediately
- **Any + Yes + No:** Proactive troubleshooting

### Day 20: Upsell Related Products

**WhatsApp Message (if Day 7 check-in was positive):**
```
Hi [Name]! 

Since you're loving [Product], you might also want:

💡 Recommendation 1: [Product B]
   - Works great with [Product]
   - Saves another 70% vs international
   - Already 400+ customers use both

💡 Recommendation 2: [Product C]
   - [Brief benefit]
   - Special bundle pricing available

Interested? Reply "yes" for pricing!
```

**Upsell Pricing:**
- Offer 10-15% bundle discount
- Focus on complementary products
- Link to customer's use case

### Day 25: Renewal Reminder

**WhatsApp Message:**
```
Hi [Name]!

Reminder: Your [Product] subscription renews on [Date].

Don't lose access! Click below to confirm renewal:
[Renewal Link or Reply "Renew"]

Also available:
- Upgrade to Personal Account (no sharing)
- Switch to annual plan (save 20%)

Questions? Let us know!
```

### Day 30+: Satisfaction Survey

**Monthly Email/WhatsApp:**
```
Subject: How Happy Are You With [Product]? (Quick Survey)

We'd love your feedback!

1. How satisfied are you with [Product]?
   ☆☆☆☆☆ (Rate 1-5)

2. Have you recommended us to a friend?
   Yes / No

3. What's one thing we could improve?
   [Open text]

[Survey Link]

Reply with feedback and get 500 TK credit on your next order!
```

---

## Revenue Tracking Dashboard

### Daily MRR Calculation

**Metric:** Monthly Recurring Revenue  
**Formula:** Sum of all active subscriptions × monthly rate

**Calculation Example:**
```
ChatGPT Plus: 50 active customers × 500 TK/mo = 25,000 TK
Claude Pro: 30 active customers × 541 TK/mo = 16,230 TK
Midjourney: 20 active customers × 667 TK/mo = 13,340 TK
Canva Pro: 40 active customers × 400 TK/mo = 16,000 TK
───────────────────────────────────────────
TOTAL MRR = 70,570 TK
```

**Update Frequency:** Daily at 9 AM (after overnight orders processed)

### Customer LTV Tracking

**Metric:** Lifetime Value per customer  
**Formula:** Average revenue per customer × average customer lifetime (months)

**Calculation:**
```
Scenario 1 (Churn after 3 months):
- Revenue: 5,000 TK/order × 1 = 5,000 TK
- Lifetime: 3 months
- LTV: 5,000 TK

Scenario 2 (Renewal for 12 months):
- Revenue: 5,000 TK + 5,000 TK (annual renewal) = 10,000 TK
- Lifetime: 12 months
- LTV: 10,000 TK
```

**Target:** Increase LTV from 5,000 TK to 15,000 TK (by increasing renewal rate)

### Churn Monitoring

**Metric:** Monthly churn rate  
**Formula:** (Customers lost this month / Customers at start of month) × 100

**Example:**
```
Month: July 2026
- Customers at start: 500
- New customers: 100
- Customers who cancelled: 30
- Churn rate: (30 / 500) × 100 = 6%

Target: Keep churn below 5% (industry standard)
```

**Prevention Actions:**
1. Day 7 check-in (catch early churn)
2. Day 20 upsell (increase perceived value)
3. Day 25 renewal reminder (prevent accidental lapse)
4. Monthly satisfaction survey (address pain points)

### Product Popularity Metrics

**Metric:** Sales volume by product  
**Dashboard:**
```
Product              | Units Sold (July) | Revenue    | % of Total
─────────────────────────────────────────────────────────────────
ChatGPT Plus         | 120              | 600,000 TK | 28%
Claude Pro           | 80               | 43,280 TK  | 20%
Midjourney           | 60               | 40,020 TK  | 19%
Canva Pro            | 90               | 36,000 TK  | 17%
Adobe Creative Cloud | 40               | 180,000 TK | 8%
Others (46 products) | 110              | 165,000 TK | 8%
─────────────────────────────────────────────────────────────────
TOTAL                | 500              | 2,124,300  | 100%
```

**Insights:**
- Top 3 products = 67% of revenue
- ChatGPT Plus is the "gateway drug" (highest volume)
- Adobe is highest value (focus upsell here)
- Long tail (46 products) = 8% (opportunity to cross-sell)

---

## Weekly "Money Truth Ritual" Report

**Day:** Every Monday 9 AM  
**Owner:** Emon Hossain / Operations Manager  
**Duration:** 30 minutes  
**Attendees:** Full team

### Report Template

**From:** Operations  
**To:** Team  
**Week:** Jul 22–28, 2026

**P&L Summary:**
```
Revenue (gross)         565,000 TK
- Payment fees (2%)     11,300 TK
- Support costs (8h)    ~4,000 TK
- Hosting/infra (flat)  ~5,000 TK
─────────────────────────
PROFIT (net)           544,700 TK

MRR (running)          2,450,000 TK
LTV (avg)              8,500 TK
Churn (weekly)         2.1%
CAC (paid ads)         500 TK (if any)
```

**Performance:**
- New customers: 85 (↑12% from last week)
- Renewals: 340 (↑5% from last week)
- Refunds: 3 (0.6% refund rate, good!)
- Support tickets: 42 (avg response <1 hr)

**Top Insights:**
1. ChatGPT Plus driving 68% of new sales
2. Midjourney upsell at 14% of ChatGPT customers (great!)
3. Churn is down to 2.1% (preventative messages working)
4. 2 refunds were due to [reason] (actionable)

**Action Items (Next Week):**
- [ ] Test new setup video format
- [ ] Email batch #3 (Day 7 check-in) to 200 customers
- [ ] Negotiate better bKash settlement rate (aiming for <1.5%)
- [ ] Add FAQ page for Midjourney (3 support tickets on this)

**Challenges:**
- Payment settlement delays (bKash taking 3 days instead of 2)
- 1 "stuck activation" issue (customer still waiting for Claude credentials)

---

## Issue Escalation

### Tier 1: Support Staff (Resolve <2 hours)

**Common Issues:**
- Password reset needed
- Setup guide questions
- Login troubleshooting
- Billing clarification

**Process:**
1. Check FAQ/Knowledge Base
2. Guide customer through solution via WhatsApp
3. If resolved, mark ticket "Closed"
4. If not resolved, escalate to Tier 2

### Tier 2: Operations Manager (Resolve <24 hours)

**Escalated Issues:**
- Account banned by provider
- Payment verification dispute
- Refund requested
- Shared account limit exceeded

**Process:**
1. Review ticket history
2. Contact provider support if needed
3. Offer solution (replacement, refund, upgrade)
4. Confirm resolution with customer
5. Document in CRM

### Tier 3: CEO (Escalated)

**Critical Issues:**
- Legal complaints
- Fraud investigation
- Major provider dispute
- Customer satisfaction crisis

**Process:**
1. Immediate investigation
2. Direct customer contact
3. Resolution + compensation if warranted
4. Post-mortem + prevention

---

## Performance Metrics & Targets

### Key Performance Indicators (KPIs)

| KPI | Current | Target | Owner |
|-----|---------|--------|-------|
| Monthly Revenue | 2.45M TK | 5M TK (12 mo) | Emon |
| Customer Count | 950 | 2000 (12 mo) | Operations |
| MRR | 2.45M TK | 5M TK | Finance |
| LTV | 8,500 TK | 15,000 TK | Success |
| Churn Rate | 2.1% | <5% | Success |
| Refund Rate | 0.6% | <2% | Operations |
| Support Response Time | 45 min | <30 min | Support |
| Setup Time | 12 min avg | <10 min | Operations |
| Net Promoter Score | 42 | >50 | All |

### Success Metrics

**Monthly:**
- [ ] MRR growth >5%
- [ ] Churn <3%
- [ ] Refunds <1% of revenue
- [ ] Support SLA <2 hours on 95% of tickets
- [ ] Net satisfaction >4/5

**Quarterly:**
- [ ] LTV increase by 10%
- [ ] CAC reduced by 5%
- [ ] New products launched: 2
- [ ] Customer testimonials: 20+
- [ ] Zero critical support issues

---

## Emergency Procedures

### Payment Processing Failure

**If bKash/Nagad is down:**
1. Inform customer immediately
2. Offer temporary bank transfer
3. Follow up within 1 hour of service restoration
4. Refund any bank transfer fees

### Account Activation Failure

**If provider (OpenAI/Anthropic) is down:**
1. Inform customer expected wait time
2. Offer temporary shared account (if available)
3. Generate new credentials within 4 hours
4. Refund if >24 hours delay

### Refund Request During Day 1-30

**Process:**
1. Acknowledge immediately
2. Ask for reason (optional, not required)
3. Process refund within 24 hours to original payment method
4. Send goodbye message with feedback survey
5. Log in CRM for analysis

---

## Compliance Checkpoints

- [ ] All payments verified before delivery
- [ ] No personal financial data stored
- [ ] SSL/TLS encryption on all data in transit
- [ ] Monthly PCI-DSS audit
- [ ] Customer data retention policy enforced
- [ ] Refund policy clearly communicated
- [ ] Support SLAs met consistently

---

## Next Steps

1. **Week 1-2:** Implement WhatsApp automation scripts
2. **Week 2-3:** Set up CRM/spreadsheet for payment tracking
3. **Week 3-4:** Create video tutorials for each segment
4. **Month 2:** Launch automated email sequences
5. **Month 3:** Implement revenue dashboard (live)
6. **Ongoing:** Weekly Money Truth Ritual meeting

---

**Questions?** Contact Emon Hossain (Founder & CEO)  
**Last Reviewed:** July 29, 2026
