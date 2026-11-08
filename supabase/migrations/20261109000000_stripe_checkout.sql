-- Stripe checkout support. Does NOT touch public.orders/public.order_items
-- (schema.sql already defines those, in the right shape for a multi-item
-- cart checkout) — only adds the two tables stripe-checkout and
-- stripe-webhook need to hand off a session between them.

-- ------------------------------------------------------------
-- 1. STRIPE EVENTS (webhook idempotency)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.stripe_events (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.stripe_events ENABLE ROW LEVEL SECURITY;
-- No policies: inaccessible to anon/authenticated. Only the webhook
-- function (service role, bypasses RLS) ever touches this table.

-- ------------------------------------------------------------
-- 2. CHECKOUT SESSIONS (cart snapshot between create and fulfil)
-- ------------------------------------------------------------
-- stripe-checkout writes one row per Stripe Checkout Session, keyed by the
-- session id, with the cart/discount/address resolved server-side at that
-- moment. stripe-webhook reads it back on checkout.session.completed to
-- build the real order + order_items, then deletes it.
CREATE TABLE IF NOT EXISTS public.checkout_sessions (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  shipping_address JSONB NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  discount_code TEXT,
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_checkout_sessions_user ON public.checkout_sessions(user_id);

ALTER TABLE public.checkout_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own checkout sessions" ON public.checkout_sessions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own checkout sessions" ON public.checkout_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
-- No UPDATE/DELETE policy for users — stripe-webhook (service role) is the
-- only thing that ever deletes a row, once fulfilled.
