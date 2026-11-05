# Storefront (working title)

React + Tailwind e-commerce storefront cloning Gymshark.com's UI/UX, backed
by Supabase and Stripe. See [`plan.md`](./plan.md) for the full roadmap and
[`Brief.md`](./Brief.md) for the open requirements questionnaire sent to the
client.

## Stack

- React + Vite + Tailwind CSS v4
- Supabase (auth, database, storage)
- Stripe (payments)
- Deployed on Vercel

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in once Supabase/Stripe accounts exist
npm run dev
```

The app renders fully with placeholder/greybox content even without
`.env.local` — Supabase- and Stripe-backed features simply stay inert until
real keys are supplied (see `plan.md` → "Blocked on Client").

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — oxlint
