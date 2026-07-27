# AI Premium Shop Website

Production storefront for AI Premium Shop, a Bangladesh-focused digital
subscription shop.

## Stack

- Next.js App Router
- React 19
- Tailwind CSS 4
- Drizzle ORM
- Supabase-ready PostgreSQL schema
- Vercel deployment

## Local Development

```bash
pnpm dev
```

Useful checks:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Environment

Copy `.env.example` to `.env.local` and fill the real service values. Do not
commit `.env.local`; it is ignored by git.

Required service integrations for Phase 0b:

- Supabase
- Sentry
- Resend
- Google Analytics 4
- Meta Pixel
- Vercel KV / Upstash

## Database

After `DATABASE_URL` is configured:

```bash
npx drizzle-kit push
```

The schema lives in `src/db/schema.ts`.
