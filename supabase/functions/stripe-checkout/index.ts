// Builds a Stripe Checkout Session from the caller's own cart (never from
// client-supplied prices) and stashes the order payload in checkout_sessions,
// keyed by the Stripe session id, so stripe-webhook can fulfil it without
// re-trusting anything the browser sent.
import Stripe from 'npm:stripe@17.4.0'
import { createClient } from 'npm:@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-11-20.acacia',
})
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!
const SITE_URL = Deno.env.get('SITE_URL')!

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Missing Authorization header' }), { status: 401 })
  }

  // Scoped to the caller's own JWT, so every query below is subject to the
  // same RLS policies the rest of the app relies on (own cart, own address).
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  })

  const { data: userData, error: userError } = await supabase.auth.getUser()
  const user = userData?.user
  if (userError || !user) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 })
  }

  const { discountCode } = await req.json().catch(() => ({}))

  const { data: cartRows, error: cartError } = await supabase
    .from('cart_items')
    .select(
      'quantity, variant:product_variants(id, size, color, price_override, product:products(id, name, price))',
    )
    .eq('user_id', user.id)
  if (cartError) {
    return new Response(JSON.stringify({ error: cartError.message }), { status: 500 })
  }
  if (!cartRows || cartRows.length === 0) {
    return new Response(JSON.stringify({ error: 'Cart is empty' }), { status: 400 })
  }

  const { data: address } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_default', true)
    .maybeSingle()
  if (!address) {
    return new Response(
      JSON.stringify({ error: 'Add a default address in Account > Addresses before checking out.' }),
      { status: 400 },
    )
  }

  const items = cartRows.map((row) => ({
    productId: row.variant.product.id,
    variantId: row.variant.id,
    name: row.variant.product.name,
    size: row.variant.size,
    color: row.variant.color,
    unitPrice: Number(row.variant.price_override ?? row.variant.product.price),
    quantity: row.quantity,
  }))
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

  let discountAmount = 0
  let appliedCode = null
  if (discountCode) {
    const { data: discountRow } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', String(discountCode).trim().toUpperCase())
      .eq('is_active', true)
      .maybeSingle()
    if (discountRow) {
      discountAmount = subtotal * Number(discountRow.amount_off)
      appliedCode = discountRow.code
    }
  }
  const total = subtotal - discountAmount

  // A whole-cart percentage discount is a Stripe Coupon applied to the
  // session, not a markdown on individual line items (Stripe Checkout line
  // items can't carry a negative amount).
  let discounts
  if (discountAmount > 0) {
    const coupon = await stripe.coupons.create({
      percent_off: Number(discountAmount > 0 ? discountAmount / subtotal : 0) * 100,
      duration: 'once',
      name: appliedCode,
    })
    discounts = [{ coupon: coupon.id }]
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    client_reference_id: user.id,
    customer_email: user.email,
    line_items: items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: `${item.name} (${item.size} / ${item.color})` },
        unit_amount: Math.round(item.unitPrice * 100),
      },
      quantity: item.quantity,
    })),
    discounts,
    success_url: `${SITE_URL}/account/orders?checkout=success`,
    cancel_url: `${SITE_URL}/cart?checkout=cancelled`,
  })

  const { error: insertError } = await supabase.from('checkout_sessions').insert({
    id: session.id,
    user_id: user.id,
    items,
    shipping_address: address,
    subtotal,
    discount_code: appliedCode,
    discount_amount: discountAmount,
    total,
  })
  if (insertError) {
    return new Response(JSON.stringify({ error: insertError.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
