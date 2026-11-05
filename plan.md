# Project Plan — Gymshark-style E-Commerce Storefront

Working title. Brand name, legal entity, domain, and assets are all pending
client input (see "Blocked on Client" below) — `Brand Name` placeholders in
the code will be swapped once confirmed.

## Stack

- **Frontend:** React (Vite) + Tailwind CSS v4
- **Backend / data / auth:** Supabase (Postgres, Auth, Storage, RLS)
- **Payments:** Stripe (Checkout or Payment Element — TBD once accepted
  payment methods are confirmed)
- **Hosting:** Vercel (frontend), Supabase-hosted backend
- **Source control:** GitHub, private repo, single developer (you)

## Guiding principle

We are cloning Gymshark.com's UI/UX as closely as possible: layout,
typography rhythm, spacing, navigation structure, PDP/PLP interactions,
cart/checkout flow shape. Brand colors/fonts/logo swap in once the client
provides them — the *structure and interactions* stay Gymshark-faithful,
the *skin* becomes the client's brand.

---

## Status: what's done so far

- [x] Vite + React + Tailwind v4 scaffold
- [x] React Router routes: Home, Shop (PLP), Product (PDP), Cart, Wishlist,
      Login, Account, 404
- [x] Base layout: Header, Footer, nav structure matching Gymshark's IA
- [x] Supabase client stub (`src/lib/supabaseClient.js`) — inert until
      client provisions a project and keys land in `.env.local`
- [x] Stripe client stub (`src/lib/stripeClient.js`) — inert until client
      provisions a verified Stripe account
- [x] `.env.example` documenting required keys
- Everything above runs today with placeholder content/greybox blocks —
  no real product data, no auth, no payments yet.

---

## BLOCKED ON CLIENT — must be resolved before scope is final

These map directly to the open items in `Brief.md`. Development continues
on structure/UI in parallel, but these gate the corresponding feature going
live for real:

| # | Brief item | Blocks | Status |
|---|---|---|---|
| 1 | Brand name, legal entity, address, support contact | Footer, legal pages, emails, Stripe business profile | **Pending** |
| 2 | Domain name (client must purchase/own it) | Production DNS, Vercel custom domain | **Pending** |
| 3 | Logo, brand colors, fonts, brand guidelines | Final visual skin (currently placeholder tokens) | **Pending** |
| 4 | Which Gymshark pages/sections to mirror exactly | Confirms scope of UI clone | **Pending** |
| 5 | Page list + copy/photos/video (incl. hero video?) | Content population of all pages | **Pending** |
| 6 | Product catalog: counts, categories, variants, SKUs, stock | Supabase schema seeding, PLP/PDP real data | **Pending** |
| 7 | Search/filter/sort, cart, wishlist, reviews, discount codes, guest checkout | Feature scope for commerce logic | **Partially pending** (building structure now, confirming scope) |
| 8 | Customer account features, shipping approach | Account pages, order tracking | **Pending** |
| 9 | Stripe account (client-owned, verified), currency, payment methods, refund policy | **Payment integration cannot go live without this** | **Pending — explicitly client's responsibility per brief** |
| 10 | Tax rules, legal policy documents | Checkout tax logic, legal pages | **Pending** |
| 11 | Shipping countries, rates, free-shipping rules, fulfillment/tracking | Checkout shipping logic | **Pending** |
| 12 | Transactional emails, newsletter/analytics integrations | Email templates, tracking setup | **Pending** |
| 13 | Admin panel scope, staff roles | Admin panel feature list | **Pending** |
| 14 | Client-owned accounts: Supabase, Stripe, domain, hosting + dev access | **All backend/payment work is blocked without this** | **Pending — client must create accounts and invite dev access** |
| 15 | Launch date, MVP must-haves, feedback point of contact | Scope/priority of remaining phases | **Pending** |

**Payments specifically:** per the brief, the client owns and verifies the
Stripe account. Integration code (checkout session creation, webhooks) can
be written and tested against Stripe test-mode keys in the meantime, but
nothing goes live until the client's verified account + publishable/secret
keys are handed over via `.env.local` (never committed) and Vercel
environment variables.

---

## Phase 0 — Accounts & infrastructure setup (shared responsibility)

- [x] Local project scaffolded, builds clean
- [ ] Git init + first commit (this repo)
- [ ] Create **private** GitHub repo, push initial commit
- [ ] Connect repo to Vercel for preview/progress deployments
- [ ] Client creates Supabase project, invites dev as collaborator
- [ ] Client creates Stripe account, completes business verification,
      invites dev with restricted/dev API key access
- [ ] Client purchases domain (ownership stays with client); connect to
      Vercel once DNS is available
- [ ] Shared Google Drive folder for brand assets/content (per brief P.P.S.)

## Phase 1 — Design system & core layout (in progress)

- [x] Tailwind theme tokens (placeholder brand colors/fonts)
- [x] Header/Footer/nav shell
- [ ] Refine against real Gymshark reference pages once client confirms
      which sections/pages to mirror (Brief #4)
- [ ] Swap placeholder tokens for real brand colors/fonts/logo once supplied

## Phase 2 — Static page structure & content (greybox now, real content later)

- [x] Home, Shop (PLP), Product (PDP), Cart, Wishlist, Login, Account routes
- [ ] Hero section — confirm video vs. static image (Brief #5)
- [ ] Legal pages (Terms, Privacy, Shipping, Returns) — placeholder until
      client supplies approved policy text (Brief #10)
- [ ] Full page list + copy/imagery once client delivers content (Brief #5)

## Phase 3 — Supabase data model

- [ ] Schema: `products`, `product_variants` (size/color/SKU/stock),
      `categories`, `orders`, `order_items`, `customers`, `addresses`,
      `discount_codes`, `reviews` (if approved)
- [ ] Row-Level Security policies (customers see only their own data; admin
      role sees everything)
- [ ] Seed with real catalog once client provides product data (Brief #6)

## Phase 4 — Customer-facing commerce features

- [ ] Product listing: filter, sort, search (scope per Brief #7)
- [ ] Product detail: variant selection, stock-aware "Add to Cart"
- [ ] Cart (persisted per session / per account)
- [ ] Wishlist (requires auth)
- [ ] Discount codes at checkout
- [ ] Guest checkout vs. account-required (confirm with client)
- [ ] Reviews (only if client confirms this is in scope)

## Phase 5 — Auth & customer accounts

- [ ] Supabase Auth: email/password (+ social providers if desired)
- [ ] Account dashboard: profile, saved addresses, order history, return
      requests (scope depends on Brief #8 answer)

## Phase 6 — Checkout & Stripe integration

- [ ] Stripe Checkout/Payment Element integration (test mode first)
- [ ] Order creation on successful payment (webhook-driven)
- [ ] Refund flow per client's policy (Brief #9, #10)
- [ ] Tax calculation per client's requirements (Brief #10)
- [ ] Shipping rate logic per client's rules (Brief #11)
- **Gate:** cannot go live until client's verified Stripe account is wired
  into Vercel env vars.

## Phase 7 — Admin panel

- [ ] Scope finalized once client answers Brief #13 (what staff manage,
      roles)
- [ ] Likely: products/inventory CRUD, order management, discount codes,
      customer lookup, basic content editing
- [ ] Role-based access via Supabase Auth + RLS

## Phase 8 — Transactional email & integrations

- [ ] Order confirmation, shipping update emails (Brief #12)
- [ ] Newsletter signup integration (if requested)
- [ ] Analytics integration (e.g., GA4) once client confirms requirements

## Phase 9 — SEO & performance pass

- [ ] Meta tags, structured data for products
- [ ] Image optimization, lazy loading
- [ ] Lighthouse pass before launch

## Phase 10 — QA & launch

- [ ] Cross-browser/device QA
- [ ] End-to-end checkout test in Stripe test mode, then live mode
- [ ] Final content/legal review with client
- [ ] Go-live against client's launch date (Brief #15) — currently ~1 month
      MVP target per brief, pending confirmed scope

---

## Notes

- All "pending" items above are flagged inline in the code as well (search
  for `Brief.md #` comments) so nothing silently relies on an assumption.
- This plan will be updated as client answers come in — treat it as a
  living document, not a one-time spec.
