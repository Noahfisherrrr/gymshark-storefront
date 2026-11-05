# Project Plan — Gymshark-style E-Commerce Storefront

Working title. Brand name, legal entity, domain, and assets are all pending
client input (see "Blocked on Client" below) — `Brand Name` placeholders in
the code will be swapped once confirmed.

## Stack

- **Frontend:** React (Vite) + Tailwind CSS v4
- **Backend / data / auth:** Supabase (Postgres, Auth, Storage, RLS) —
  leaning choice, Firebase remains an option. The frontend never calls a
  backend SDK directly (see "API layer" below), so this decision can still
  be made or changed later without touching UI code.
- **Payments:** Stripe (Checkout or Payment Element — TBD once accepted
  payment methods are confirmed)
- **Hosting:** Vercel (frontend), Supabase/Firebase-hosted backend
- **Source control:** GitHub, private repo, single developer (you)

## API layer (backend-agnostic by design)

All data access goes through `src/api` — components never import a
backend SDK directly:

- `src/api/contract.js` — the interface every provider must implement
  (products, cart, wishlist, auth, orders)
- `src/api/providers/mock/` — a fully working mock backend (localStorage),
  used right now so the UI functions end-to-end with no backend at all
- `src/api/providers/supabase/` — a real Supabase implementation for
  products/auth already written against the contract; cart/wishlist/orders
  are explicit "not implemented yet" stubs pending schema decisions
- `src/api/index.js` — picks the active provider via `VITE_API_PROVIDER`
  (defaults to `mock`)
- A future `providers/firebase/` would just be another file satisfying the
  same contract — no component changes needed either way.

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
      Login, Register, Account, 404
- [x] Base layout: Header, Footer, nav structure matching Gymshark's IA
- [x] Backend-agnostic API layer (`src/api`) with a working mock provider
      and a Supabase provider skeleton — see "API layer" above
- [x] Pages wired to real (mock) data: category/sort filtering, product
      variant selection + stock-aware add-to-cart, cart quantity/remove,
      discount codes, wishlist toggling, sign up/in/out, order history shell
- [x] Supabase client stub (`src/lib/supabaseClient.js`) — inert until
      client provisions a project and keys land in `.env.local`
- [x] Stripe client stub (`src/lib/stripeClient.js`) — inert until client
      provisions a verified Stripe account
- [x] `.env.example` documenting required keys
- The whole flow (browse → filter → product → add to cart → discount code
  → wishlist → sign up/in → account) works today against mock data. No
  real catalog, no real auth/payments, no real backend yet — that's all
  one `VITE_API_PROVIDER=supabase` switch + schema/account setup away.

---

## BLOCKED ON CLIENT — must be resolved before scope is final

These map directly to the open items in `Brief.md`. Development continues
on structure/UI in parallel, but these gate the corresponding feature going
live for real:

| # | Brief item | Blocks | Status |
|---|---|---|---|
| 1 | Brand name, legal entity, address, support contact | Footer, legal pages, emails, Stripe business profile | **Pending** |
| 2 | Domain name (client must purchase/own it) | Production DNS, Vercel custom domain | **Pending** |
| 3 | Logo, brand colors, fonts, brand guidelines | Final visual skin (currently placeholder tokens) | **Pending** — ⚠️ currently using Gymshark's own webfonts (Plaak Gymshark, Skandia SN) in `src/assets/fonts/` for preview pixel-matching only. Not licensed to us — **must be replaced before public launch** |
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
- [x] Header — 1:1 port of gymshark.com's header (`src/components/header/`):
      revolving USP bar (6s / 500ms slide, pause button), transparent
      gradient header on home that turns white on hover, hides on scroll
      down past 200px and returns solid on scroll up, USP bar tucks away on
      solid pages, hover mega-menu (tier 1 → tier 2 panel, animated
      underlines, blurred backdrop, featured tiles), mobile drawer with
      category tabs + sliding tier-2 panel. Menu content lives in
      `src/config/navigation.js` (placeholder labels, CMS-driven later)
- [x] Header search overlay — port of gymshark.com's current search
      ("glow-up" variant): backdrop fade .2s, content fade .3s, desktop
      600px right panel slides out .4s on close; All/Women/Men tabs
      (remembered, pre-selected from women's/men's pages), 500ms debounced
      type-ahead with suggested terms + 2-col product grid, Trending Pages,
      recently viewed row, no-results state with trending products, Enter →
      `/search?q=` results page. Backed by a new `api.search` contract
      (mock implemented; Supabase does ILIKE search, trending stubbed)
- [x] Mini bag drawer — slides in from the right (desktop) / up from the
      bottom (mobile) .4s; free-shipping progress bar ($75, `config/store.js`),
      quantity stepper (max 10 / stock), remove with Undo snackbox, wishlist
      tab, empty state; opens after add-to-cart on the PDP
- [x] Header buttons all route correctly: account → /login when signed out,
      Help/Returns/Student Discount → `/help` placeholder sections
- [ ] Header follow-ups: client logo in place of the "Brand Name" wordmark,
      real featured-tile/product imagery, "Checkout securely" goes to /cart
      until Stripe checkout exists (Brief #9)
- [x] Footer shell (not yet ported 1:1)
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
