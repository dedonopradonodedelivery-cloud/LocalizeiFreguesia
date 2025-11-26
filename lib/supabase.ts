// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// ⚠️ Opção A — usar ENV quando existir, senão usar o valor real como fallback
const supabaseUrl =
  (import.meta as any).env.VITE_SUPABASE_URL ??
  'https://nyneuuvcdmtqjyaqrztz.supabase.co';

const supabaseAnonKey =
  (import.meta as any).env.VITE_SUPABASE_ANON_KEY ??
  'SUA_ANON_KEY_AQUI'; // cole aqui a mesma anon key que você usou na Vercel / Supabase

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('[APP] Supabase env vars missing', {
    supabaseUrl,
    hasKey: !!supabaseAnonKey,
  });
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
