# Contentful + Stripe — finish-up guide

Status as of 2026-11-09: both integrations are **coded and pushed to `main`**
(commits `9ac18ab`, `246737b`), but **nothing is deployed, migrated, or
configured yet**. Nothing will actually work until you work through the
checklist below. Come back to this file when you're ready to pick it up.

---

## 1. What's already done

| Piece | File(s) | Status |
|---|---|---|
| Contentful Delivery client | `src/lib/contentful.js`, `src/lib/types.js` | Code done. Falls back to `config/home.js` placeholders until configured. |
| Homepage banner wiring | `src/pages/Home.jsx` (`useBanner`) | Done — reads slugs `home-hero`, `home-video-banner`, `home-promo-banner`. |
| Stripe checkout Edge Function | `supabase/functions/stripe-checkout/index.ts` | Code done. Not deployed. |
| Stripe webhook Edge Function | `supabase/functions/stripe-webhook/index.ts` | Code done. Not deployed. |
| DB migration (`stripe_events`, `checkout_sessions`) | `supabase/migrations/20261109000000_stripe_checkout.sql` | Written. Not applied to the remote DB. |
| Cart checkout button | `src/pages/Cart.jsx` | Wired to call `stripe-checkout` and redirect to the returned Stripe URL. |

**Design decisions already made** (don't redo this thinking later):
- Contentful manages **marketing banners only** — not products. Products stay in Supabase (`products`/`product_variants`), already fully built with a PDP.
- Stripe checkout processes the **whole cart**, not a single "Buy Now" item — it reuses the existing `orders`/`order_items` schema.
- Prices charged are always recomputed server-side from Supabase at checkout time (`price_override ?? product.price`) — never trusts a client-sent amount.
- Checkout requires the signed-in user to already have a **default address** (`account/addresses`, `is_default = true`). There's no address form inside the checkout flow itself.
- Discounts are applied as a one-time Stripe Coupon (`percent_off`, `duration: 'once'`) created per checkout session, mirroring the existing `discount_codes` percentage semantics.

---

## 2. Open decisions (answer these before/while finishing)

1. **Contentful "Banner" content type doesn't exist yet.** Field proposal is in `src/lib/types.js` (`slug`, `title`, `copy`, `image`, `video`, `mobileVideo`, `poster`, `ctas`/`cta` as JSON objects). Create it with those fields, or tell Claude to adjust the shape first.
2. **No address step in checkout.** Fine to require a pre-saved default address for v1, or add an inline address form before the Stripe redirect?
3. **Coupons are created fresh per checkout** rather than reusing persistent Stripe Coupon objects — fine for now, revisit if the Stripe dashboard gets cluttered.

---

## 3. Checklist to actually turn this on

### Contentful
- [ ] Create a Contentful space (if you don't have one).
- [ ] Create the **Banner** content type (see fields above).
- [ ] Publish entries with slugs `home-hero`, `home-video-banner`, `home-promo-banner` (match `config/home.js` fields you want to replace).
- [ ] Settings → API keys → copy the **Space ID** and a **Content Delivery API** access token.
- [ ] Add to `.env.local` (not committed):
  ```
  VITE_CONTENTFUL_SPACE_ID=
  VITE_CONTENTFUL_DELIVERY_TOKEN=
  ```
- [ ] Restart `npm run dev` and confirm the homepage picks up the real content.

### Stripe + Supabase Edge Functions
- [ ] Install the Supabase CLI if you haven't (`npm install -g supabase` or see supabase.com/docs/guides/cli).
- [ ] `supabase link --project-ref <your-project-ref>` — one-time, links this repo to your live Supabase project.
- [ ] Review `supabase/migrations/20261109000000_stripe_checkout.sql`, then:
  ```
  supabase db push
  ```
- [ ] Stripe dashboard (test mode) → copy the **secret key**.
- [ ] Set function secrets:
  ```
  supabase secrets set STRIPE_SECRET_KEY=sk_test_... SITE_URL=http://localhost:5173
  ```
  (`STRIPE_WEBHOOK_SECRET` comes next, after you have an endpoint.)
- [ ] Deploy both functions:
  ```
  supabase functions deploy stripe-checkout
  supabase functions deploy stripe-webhook --no-verify-jwt
  ```
- [ ] Local testing:
  ```
  supabase functions serve --env-file supabase/.env.local
  stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook
  stripe trigger checkout.session.completed
  ```
  `stripe listen` prints a `whsec_...` — set it with:
  ```
  supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
  ```
- [ ] For production: create the webhook endpoint in the Stripe dashboard pointing at your deployed function URL, grab its signing secret from that page, and set it the same way.
- [ ] Add a default address under Account → Addresses for your test user, add something to cart, click Checkout, and confirm an order shows up in Account → Orders after `stripe trigger checkout.session.completed` (or a real test-mode payment).

---

## 4. Env values reference

| Value | Where to find it |
|---|---|
| `VITE_CONTENTFUL_SPACE_ID`, `VITE_CONTENTFUL_DELIVERY_TOKEN` | Contentful → Settings → API keys |
| `STRIPE_SECRET_KEY` | Stripe dashboard, test mode |
| `STRIPE_WEBHOOK_SECRET` | `stripe listen` output locally, or the endpoint's page in the dashboard for production |
| `SITE_URL` | `http://localhost:5173` for now |

`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` are auto-injected into Edge Functions by Supabase — never set these as secrets yourself.
