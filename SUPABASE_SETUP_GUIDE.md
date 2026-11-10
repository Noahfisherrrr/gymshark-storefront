# Step-by-Step Guide: Connecting Supabase to 10X Sports

This guide walks you through connecting your Supabase project to the 10X Sports storefront from scratch. Follow each step in order.

---

## Prerequisites
- A Supabase account at [supabase.com](https://supabase.com)
- Your project code open in your editor / terminal

---

## Step 1: Create or Open Your Supabase Project

1. Log in to [supabase.com/dashboard](https://supabase.com/dashboard).
2. If you don't have a project yet:
   - Click **"New Project"**.
   - Choose your **Organization**.
   - Set **Name** to `10xsports` (or any name you prefer).
   - Enter a strong **Database Password** (save it somewhere safe).
   - Choose a **Region** close to your users (e.g. `eu-west-1` or `us-east-1`).
   - Click **Create new project** and wait ~1–2 minutes for it to provision.

---

## Step 2: Copy Your API Credentials

1. In your Supabase project dashboard, click the **Settings (gear icon)** at the bottom of the left sidebar.
2. Select **API** (or **Data API**).
3. Under **Project API keys**, locate:
   - **Project URL**: something like `https://abcdefghijklm.supabase.co`
   - **`anon` `public` key**: a long JWT token starting with `eyJhbGciOi...`
4. Keep this tab open; you will paste these into your `.env.local` file in Step 6.

> [!WARNING]
> Only use the **`anon` `public`** key in your frontend. Never put your `service_role` secret key into `.env.local` or client code.

---

## Step 3: Run the Database Schema Migration

This step creates all 12 database tables, indexes, Row Level Security (RLS) policies, the user registration trigger, and two helper functions (`add_to_cart`, `increment_review_helpful`) that the app calls via RPC so "Add to Bag" quantities accumulate correctly and "Mark as helpful" works for shoppers other than the review's own author.

1. In the Supabase left sidebar, click **SQL Editor** (icon with `>_`).
2. Click **"+ New Query"** (or click the green **New Query** button).
3. Open [`supabase/schema.sql`](file:///d:/10xsports/supabase/schema.sql) from your local project.
4. Select all (`Ctrl+A` or `Cmd+A`), copy, and paste it into the Supabase SQL editor.
5. Click **"Run"** (bottom right, or press `Ctrl+Enter` / `Cmd+Enter`).
6. You should see a green success message: **`Success. No rows returned`**.

---

## Step 4: Seed the 100 Products, Variants & Reviews

This step inserts 40 women's products, 40 men's products, 20 accessories, 400+ variants, community reviews, and default discount codes.

### Option A: Run the All-in-One Seed File (Recommended)
1. In Supabase **SQL Editor**, click **"+ New Query"**.
2. Open [`supabase/seed.sql`](file:///d:/10xsports/supabase/seed.sql) from your local project.
3. Select all (`Ctrl+A`), copy, and paste into the SQL editor.
4. Click **"Run"**.
5. Wait 3–5 seconds. You will see: **`Success. No rows returned`**.

### Option B: Run in 2 Smaller Steps (If preferred)
If your browser tab has trouble pasting large scripts:
1. First run [`supabase/01_seed_products.sql`](file:///d:/10xsports/supabase/01_seed_products.sql) (Discounts, 100 Products, Variants).
2. Then run [`supabase/02_seed_reviews.sql`](file:///d:/10xsports/supabase/02_seed_reviews.sql) (Community Reviews & Rating Stats).

### Verify Your Tables:
1. In the left sidebar, click **Table Editor** (icon with the grid table).
2. Check that the following tables have data:
   - **`products`**: 100 rows
   - **`product_variants`**: 400+ rows
   - **`reviews`**: 200+ rows
   - **`discount_codes`**: 3 rows (`WELCOME10`, `10XSPORTS15`, `SUMMER20`)

---

## Step 5: Configure Storage (Product Images)

1. In the Supabase left sidebar, click **Storage**.
2. Click **"New bucket"**.
3. Name the bucket: `products`.
4. Toggle **"Public bucket"** to **ON** (so product images can be viewed publicly without auth tokens).
5. Click **"Save"**.
6. Under bucket policies, verify that anyone can view (`SELECT`) objects.

---

## Step 6: Configure Authentication Redirect URLs

1. In the left sidebar, navigate to **Authentication** → **URL Configuration**.
2. Set **Site URL** to:
   ```
   http://localhost:5173
   ```
3. Under **Redirect URLs**, add:
   ```
   http://localhost:5173/**
   http://localhost:5173/account
   ```
   *(When you deploy to Vercel/Netlify later, add your production domain here as well, e.g. `https://your-domain.vercel.app/**`)*.
4. Click **"Save"**.

---

## Step 7: Connect the Frontend (`.env.local`)

1. Open your project in your local code editor.
2. Open or create the file [`.env.local`](file:///d:/10xsports/.env.local) in the project root:
3. Update it with your credentials from **Step 2**:

```env
# Your Supabase Project URL (from Step 2)
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co

# Your Supabase Public Anon Key (from Step 2)
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...YOUR_ANON_KEY
```

4. Save the file.

---

## Step 8: Start the App & Verify Connection

1. In your terminal, restart your Vite dev server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:5173](http://localhost:5173) in your browser.
3. Open your browser Developer Tools (`F12`) → **Network** tab:
   - Filter by `Fetch/XHR`.
   - Refresh the page or click **"Shop"** / **"Women"** / **"Men"**.
   - You should see requests heading to:
     `https://<your-project-id>.supabase.co/rest/v1/products...`
     returning `200 OK` with live database products!

---

## Step 9: Test Core Backend Features

Test each live feature to ensure complete functionality:

1. **Product Browsing & Filters**:
   - Go to `/shop/women` and `/shop/men`.
   - Filter by size (`S`, `M`, `L`), type (`Leggings`, `Shorts`), or price.
   - Products are fetched directly from your Supabase PostgreSQL database.
2. **Product Detail Page (PDP) & Live Reviews**:
   - Click on any product (e.g. *10X Sports SoftSense™ Longline Sports Bra*).
   - Scroll to the **Reviews** section.
   - Click **"Write a Review"**, fill in the rating, title, and review, and submit.
   - The review is inserted into the `reviews` table in Supabase!
3. **Cart & Wishlist Persistence**:
   - Create an account or log in at `/login` or `/register`.
   - Add an item to your Cart or Wishlist.
   - Open Supabase Dashboard → **Table Editor** → `cart_items` or `wishlist_items` — your items are saved in the cloud.
4. **Discount Codes**:
   - Go to `/cart`.
   - Enter promo code `WELCOME10` or `10XSPORTS15`.
   - The discount is validated in real time against Supabase `discount_codes`.

---

## Troubleshooting & FAQ

### Issue 1: "Supabase is not configured yet (VITE_SUPABASE_URL/ANON_KEY missing)"
- Make sure your variable names in `.env.local` match exactly:
  `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- After modifying `.env.local`, you **must restart** the dev server (`npm run dev`) for Vite to pick up new environment variables.

### Issue 2: "Failed to fetch" or CORS Error in Network Tab
- Ensure your `VITE_SUPABASE_URL` starts with `https://` and does not have a trailing slash (`/`).
- Check that your Supabase project status is **Active** (not paused).

### Issue 3: Empty product list or "Permission denied"
- Check that you ran [supabase/schema.sql](file:///d:/10xsports/supabase/schema.sql) first.
- In Supabase Dashboard → **Authentication** → **Policies**, verify that the policy `"Products are viewable by everyone"` is enabled on the `products` table.

---

## TODO (later): Custom SMTP for signup confirmation emails

**Why:** Signup has "Confirm email" enabled, so every registration sends a confirmation email through Supabase's built-in email service. That default service has a very low rate limit (~2–4 emails/hour, shared across signup/reset/magic-link emails) and throws **"email rate limit exceeded"** once exhausted — this will also bite real users, not just testing. Custom SMTP removes Supabase's default limit.

**Plan: use [Resend](https://resend.com)**

1. Create a Resend account at resend.com (separate from Supabase).
2. Verify a sending domain: Resend dashboard → **Domains** (if not visible in the sidebar, go directly to `resend.com/domains`, or check under a team/workspace switcher — it may be hidden under the wrong team). Add the DNS records (DKIM/SPF) it gives you to your domain's DNS provider and wait for it to show **Verified**.
   - Without a verified domain, Resend's sandbox sender `onboarding@resend.dev` only delivers to the email address used to sign up for Resend — fine for a quick personal test, not for real users.
3. Get an API key: Resend dashboard → **API Keys** → create one (starts with `re_...`).
4. In Supabase Dashboard → **Authentication** → **Settings** → **SMTP Settings**, enable custom SMTP and enter:
   - **Host:** `smtp.resend.com`
   - **Port:** `465` (SSL) or `587` (TLS)
   - **Username:** `resend`
   - **Password:** the Resend API key from step 3
   - **Sender email:** an address on the verified domain (e.g. `noreply@yourdomain.com`)
5. Save, then test: register a new account with a real email and confirm the message arrives (check Resend dashboard → **Logs** and Supabase → **Logs** → **Auth** if it doesn't).

