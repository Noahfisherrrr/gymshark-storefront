// verify_jwt = false (deploy with --no-verify-jwt): Stripe calls this
// directly, with no Supabase session, so auth is the signature check below
// — never skip it. Needs the service role key because fulfilment (writing
// orders for a user who isn't the caller) must bypass RLS.
import Stripe from 'npm:stripe@17.4.0'
import { createClient } from 'npm:@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-11-20.acacia',
})
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

Deno.serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()

  let event
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, webhookSecret)
  } catch (err) {
    return new Response(`Webhook signature verification failed: ${err.message}`, { status: 400 })
  }

  // Idempotency: Stripe retries delivery until it gets a 2xx, so the same
  // event id can arrive more than once. The unique constraint on
  // stripe_events.id is what actually enforces "process once" — a race
  // between two retries both lands here, and only one wins the insert.
  const { error: eventInsertError } = await supabaseAdmin.from('stripe_events').insert({ id: event.id })
  if (eventInsertError) {
    if (eventInsertError.code === '23505') {
      return new Response(JSON.stringify({ received: true, duplicate: true }), { status: 200 })
    }
    return new Response(JSON.stringify({ error: eventInsertError.message }), { status: 500 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    const { data: checkout, error: checkoutError } = await supabaseAdmin
      .from('checkout_sessions')
      .select('*')
      .eq('id', session.id)
      .maybeSingle()
    if (checkoutError || !checkout) {
      return new Response(JSON.stringify({ error: 'No matching checkout session found' }), { status: 404 })
    }

    const { error: orderError } = await supabaseAdmin.from('orders').insert({
      id: session.id,
      user_id: checkout.user_id,
      total: checkout.total,
      subtotal: checkout.subtotal,
      discount_code: checkout.discount_code,
      discount_amount: checkout.discount_amount,
      status: 'processing',
      shipping_address: checkout.shipping_address,
      payment_method: 'card',
    })
    if (orderError) {
      return new Response(JSON.stringify({ error: orderError.message }), { status: 500 })
    }

    const orderItems = checkout.items.map((item: Record<string, unknown>) => ({
      order_id: session.id,
      product_id: item.productId,
      variant_id: item.variantId,
      name: item.name,
      size: item.size,
      color: item.color,
      unit_price: item.unitPrice,
      quantity: item.quantity,
    }))
    const { error: itemsError } = await supabaseAdmin.from('order_items').insert(orderItems)
    if (itemsError) {
      return new Response(JSON.stringify({ error: itemsError.message }), { status: 500 })
    }

    await supabaseAdmin.from('cart_items').delete().eq('user_id', checkout.user_id)
    await supabaseAdmin.from('checkout_sessions').delete().eq('id', session.id)
  }

  // TODO: handle customer.subscription.* events once subscriptions exist.

  return new Response(JSON.stringify({ received: true }), { status: 200 })
})
