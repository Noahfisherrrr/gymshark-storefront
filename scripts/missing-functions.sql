-- Run this once in Supabase Dashboard -> SQL Editor -> New Query.
-- Both functions already exist in supabase/schema.sql but are missing from
-- the live database (confirmed via PGRST202 "function not found" errors on
-- 2026-11-09) — they were likely added to schema.sql after the schema was
-- first applied. Safe to re-run any time (CREATE OR REPLACE).

CREATE OR REPLACE FUNCTION public.add_to_cart(
  p_user_id UUID, p_product_id TEXT, p_variant_id TEXT, p_quantity INTEGER
)
RETURNS SETOF public.cart_items AS $$
  INSERT INTO public.cart_items (user_id, product_id, variant_id, quantity)
  VALUES (p_user_id, p_product_id, p_variant_id, p_quantity)
  ON CONFLICT (user_id, variant_id)
  DO UPDATE SET quantity = public.cart_items.quantity + EXCLUDED.quantity, updated_at = NOW()
  RETURNING *;
$$ LANGUAGE sql;

GRANT EXECUTE ON FUNCTION public.add_to_cart(UUID, TEXT, TEXT, INTEGER) TO authenticated;

CREATE OR REPLACE FUNCTION public.increment_review_helpful(p_review_id UUID)
RETURNS INTEGER AS $$
  UPDATE public.reviews
  SET helpful_count = helpful_count + 1
  WHERE id = p_review_id
  RETURNING helpful_count;
$$ LANGUAGE sql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.increment_review_helpful(UUID) TO anon, authenticated;
