import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Pending: client-owned Supabase project (Brief.md #14). Keys are read from
// .env.local, which is never committed. App renders fine without them —
// data-backed features just stay inert until they're supplied.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export const isSupabaseConfigured = Boolean(supabase)
