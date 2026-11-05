import { mockApi } from './providers/mock'
import { supabaseApi } from './providers/supabase'

// The only switch needed to move off mock data: set VITE_API_PROVIDER=supabase
// in .env.local once the client's Supabase project + schema exist.
// No component should ever import a provider directly — always `import { api }
// from 'src/api'`, so this is the single place a backend swap happens.
const providers = {
  mock: mockApi,
  supabase: supabaseApi,
}

const selected = import.meta.env.VITE_API_PROVIDER ?? 'mock'

export const api = providers[selected] ?? mockApi
