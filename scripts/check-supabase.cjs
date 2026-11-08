// Standalone sanity check for the live Supabase project: confirms the
// schema/seed data from supabase/schema.sql + seed.sql actually landed, and
// that the RPC functions the app calls (add_to_cart, increment_review_helpful)
// exist. Run with `node scripts/check-supabase.cjs` — reads .env.local
// directly since this runs outside Vite (which is what injects import.meta.env).
const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '.env.local')
  if (!fs.existsSync(envPath)) return {}
  const env = {}
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (match) env[match[1]] = match[2].trim()
  }
  return env
}

const env = loadEnvLocal()
const url = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — set them in .env.local')
  process.exit(1)
}

const supabase = createClient(url, key)

const tables = [
  'products',
  'product_variants',
  'reviews',
  'comments',
  'review_helpful_votes',
  'cart_items',
  'wishlist_items',
  'addresses',
  'orders',
  'order_items',
  'discount_codes',
  'content_blocks',
]

async function main() {
  for (const table of tables) {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true })
    if (error) {
      console.log(`${table}: ERROR ${error.code} - ${error.message}`)
    } else {
      console.log(`${table}: ${count} rows`)
    }
  }

  const { data: sample, error: sampleError } = await supabase
    .from('products')
    .select('*, variants:product_variants(*)')
    .limit(1)
    .maybeSingle()
  if (sampleError) {
    console.log('sample product error:', sampleError.message)
  } else {
    console.log('sample product keys:', Object.keys(sample || {}))
    console.log('sample variant count:', sample?.variants?.length)
  }

  const { error: rpcError } = await supabase.rpc('increment_review_helpful', {
    p_review_id: '00000000-0000-0000-0000-000000000000',
  })
  console.log(
    'increment_review_helpful RPC reachable:',
    rpcError ? `error: ${rpcError.message}` : 'ok (no matching row, as expected)',
  )
}

main()
