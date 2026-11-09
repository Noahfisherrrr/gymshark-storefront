import { supabaseApi } from './providers/supabase'
import type { ApiProvider } from './contract'

// UI code only ever imports `api` from here, never a provider directly, so
// swapping backends later means writing a new file in `providers/` and
// pointing this export at it, not touching any component.
export const api: ApiProvider = supabaseApi
