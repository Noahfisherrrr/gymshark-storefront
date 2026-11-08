import { supabaseApi } from './providers/supabase'

// UI code only ever imports `api` from here, never a provider directly, so
// swapping backends later means writing a new file in `providers/` and
// pointing this export at it, not touching any component.
export const api = supabaseApi
