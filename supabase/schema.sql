-- ============================================================
-- GYMSHARK APP - PRODUCTION POSTGRESQL SCHEMA FOR SUPABASE
-- Fully relational with Row Level Security (RLS) & Triggers
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fast fuzzy text search

-- ------------------------------------------------------------
-- 1. PROFILES (Extends Supabase auth.users)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  date_of_birth DATE,
  avatar_url TEXT,
  phone TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger to automatically create profile row when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, date_of_birth)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'firstName', ''),
    COALESCE(NEW.raw_user_meta_data->>'lastName', ''),
    CASE 
      WHEN NEW.raw_user_meta_data->>'dateOfBirth' IS NOT NULL 
      THEN (NEW.raw_user_meta_data->>'dateOfBirth')::DATE 
      ELSE NULL 
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    date_of_birth = EXCLUDED.date_of_birth,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ------------------------------------------------------------
-- 2. PRODUCTS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL CHECK (category IN ('women', 'men', 'accessories')),
  gender TEXT NOT NULL CHECK (gender IN ('f', 'm', 'u')),
  type TEXT NOT NULL,
  activities TEXT[] NOT NULL DEFAULT '{}',
  fit TEXT,
  fit_note TEXT,
  rise TEXT,
  features TEXT[] NOT NULL DEFAULT '{}',
  collection TEXT,
  collection_name TEXT,
  price NUMERIC(10, 2) NOT NULL,
  compare_at_price NUMERIC(10, 2),
  image TEXT NOT NULL,
  tag TEXT,
  badges TEXT[] NOT NULL DEFAULT '{}',
  color TEXT,
  color_hex TEXT,
  colorways JSONB NOT NULL DEFAULT '[]'::jsonb,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  description TEXT NOT NULL DEFAULT '',
  highlights TEXT[] NOT NULL DEFAULT '{}',
  materials TEXT,
  care_instructions TEXT[] NOT NULL DEFAULT '{}',
  fit_feedback JSONB NOT NULL DEFAULT '{}'::jsonb,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
  review_count INTEGER NOT NULL DEFAULT 0,
  rating_breakdown JSONB NOT NULL DEFAULT '{"1":0,"2":0,"3":0,"4":0,"5":0}'::jsonb,
  complete_the_look_ids TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_gender ON public.products(gender);
CREATE INDEX IF NOT EXISTS idx_products_type ON public.products(type);
CREATE INDEX IF NOT EXISTS idx_products_collection ON public.products(collection);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_products_name_trgm ON public.products USING gin (name gin_trgm_ops);

-- ------------------------------------------------------------
-- 3. PRODUCT VARIANTS (SKUs, Sizes, Colors & Inventory)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  price_override NUMERIC(10, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_variants_product ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_variants_size ON public.product_variants(size);
CREATE INDEX IF NOT EXISTS idx_variants_color ON public.product_variants(color);

-- ------------------------------------------------------------
-- 4. REVIEWS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  content TEXT NOT NULL,
  size_purchased TEXT,
  usual_size TEXT,
  activity TEXT,
  height TEXT,
  weight TEXT,
  helpful_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);

-- ------------------------------------------------------------
-- 5. COMMENTS (Customer discussions, Q&A, and staff replies)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_type TEXT NOT NULL CHECK (parent_type IN ('review', 'product', 'blog')),
  parent_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL DEFAULT 'customer' CHECK (author_role IN ('customer', 'staff', 'admin')),
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'flagged')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_parent ON public.comments(parent_type, parent_id);

-- ------------------------------------------------------------
-- 6. REVIEW HELPFUL VOTES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.review_helpful_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  client_ip TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_review_user_vote UNIQUE(review_id, user_id)
);

-- ------------------------------------------------------------
-- 7. CART ITEMS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  variant_id TEXT NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_user_variant UNIQUE(user_id, variant_id)
);

CREATE INDEX IF NOT EXISTS idx_cart_user ON public.cart_items(user_id);

-- Clicking "Add to Bag" on a variant already in the cart should add to the
-- existing quantity (that's what the mock provider does, and what shoppers
-- expect), not replace it. A plain client-side `.upsert()` on conflict
-- overwrites the `quantity` column with whatever was passed in, so two
-- single-unit adds of the same variant would leave the cart at 1, not 2.
-- No SECURITY DEFINER here — it runs as the calling role, so the existing
-- cart_items RLS policies (auth.uid() = user_id) still apply normally.
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

-- ------------------------------------------------------------
-- 8. WISHLIST ITEMS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_user_product UNIQUE(user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user ON public.wishlist_items(user_id);

-- ------------------------------------------------------------
-- 9. ADDRESSES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT NOT NULL DEFAULT 'Home',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  line1 TEXT NOT NULL,
  line2 TEXT,
  city TEXT NOT NULL,
  postcode TEXT NOT NULL,
  country TEXT NOT NULL,
  phone TEXT,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_addresses_user ON public.addresses(user_id);

-- ------------------------------------------------------------
-- 10. ORDERS & ORDER ITEMS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total NUMERIC(10, 2) NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  discount_code TEXT,
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'shipped', 'delivered', 'cancelled', 'returned')),
  shipping_address JSONB NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'card',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES public.products(id),
  variant_id TEXT NOT NULL REFERENCES public.product_variants(id),
  name TEXT NOT NULL,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0)
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);

-- ------------------------------------------------------------
-- 11. DISCOUNT CODES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.discount_codes (
  code TEXT PRIMARY KEY,
  description TEXT,
  amount_off NUMERIC(4, 2) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  expires_at TIMESTAMPTZ
);

-- ------------------------------------------------------------
-- 12. DYNAMIC CONTENT & BANNERS (Headless CMS sync)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_blocks (
  key TEXT PRIMARY KEY,
  title TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_helpful_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discount_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    FALSE
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Products & Variants: Public read, Admin write
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Products admin write" ON public.products FOR ALL USING (public.is_admin());

CREATE POLICY "Variants are viewable by everyone" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Variants admin write" ON public.product_variants FOR ALL USING (public.is_admin());

-- Content Blocks: Public read, Admin write
CREATE POLICY "Content blocks are viewable by everyone" ON public.content_blocks FOR SELECT USING (true);
CREATE POLICY "Content blocks admin write" ON public.content_blocks FOR ALL USING (public.is_admin());

-- Profiles: Public can view basic profile info, user can update their own
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Reviews: Approved reviews are public; anyone can insert (the PDP review
-- form at src/components/pdp/ProductReviews.jsx collects a name + email
-- without requiring sign-in, and the Supabase provider's addReview stores
-- user_id as NULL for guests) — restricting INSERT to auth.uid() IS NOT NULL
-- would make every guest review submission fail with permission denied.
-- Owners/admins can still update/delete.
CREATE POLICY "Approved reviews are viewable by everyone" ON public.reviews FOR SELECT USING (status = 'approved' OR auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Anyone can submit a review" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id OR public.is_admin());

-- Comments: Approved comments are public; same guest-friendly shape as
-- reviews above (nullable user_id, free-text author_name) — kept consistent
-- so wiring up comments later doesn't hit the same permission-denied trap.
CREATE POLICY "Approved comments viewable by everyone" ON public.comments FOR SELECT USING (status = 'approved' OR auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Anyone can submit a comment" ON public.comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can delete own comments" ON public.comments FOR DELETE USING (auth.uid() = user_id OR public.is_admin());

-- Helpful Votes
CREATE POLICY "Helpful votes viewable by all" ON public.review_helpful_votes FOR SELECT USING (true);
CREATE POLICY "Users can vote once" ON public.review_helpful_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove their vote" ON public.review_helpful_votes FOR DELETE USING (auth.uid() = user_id);

-- "Mark as helpful" needs to bump ANY review's counter, not just one the
-- voter owns, so it can't go through the "Users can update own reviews"
-- policy above. SECURITY DEFINER lets this one counter update bypass that
-- ownership check, and doing the +1 inside the database (instead of the
-- client's old read-then-write) makes concurrent votes race-free.
CREATE OR REPLACE FUNCTION public.increment_review_helpful(p_review_id UUID)
RETURNS INTEGER AS $$
  UPDATE public.reviews
  SET helpful_count = helpful_count + 1
  WHERE id = p_review_id
  RETURNING helpful_count;
$$ LANGUAGE sql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.increment_review_helpful(UUID) TO anon, authenticated;

-- Cart: Strictly user scoped
CREATE POLICY "Users can view own cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert into own cart" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete from own cart" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- Wishlist: Strictly user scoped
CREATE POLICY "Users can view own wishlist" ON public.wishlist_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert into own wishlist" ON public.wishlist_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete from own wishlist" ON public.wishlist_items FOR DELETE USING (auth.uid() = user_id);

-- Addresses: Strictly user scoped
CREATE POLICY "Users can manage own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id);

-- Orders: User can view own orders, Admins can view/update all
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE USING (public.is_admin());

CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "Users can insert order items" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Discount Codes: Public read active codes
CREATE POLICY "Active discount codes viewable by all" ON public.discount_codes FOR SELECT USING (is_active = true);
