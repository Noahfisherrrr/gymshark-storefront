import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../api/providers/supabase/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Pending: client-owned Supabase project (Brief.md #14). Keys are read from
// .env.local, which is never committed. App renders fine without them —
// data-backed features just stay inert until they're supplied.
export const supabase: SupabaseClient<Database> | null =
  supabaseUrl && supabaseAnonKey ? createClient<Database>(supabaseUrl, supabaseAnonKey) : null

export const isSupabaseConfigured: boolean = Boolean(supabase)
