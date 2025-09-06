import { createClient } from '@supabase/supabase-js'
import { ChromeStorageAdapter } from './chromeStorageAdapter.js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase env. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: new ChromeStorageAdapter(),
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  })
}

export { supabase }
