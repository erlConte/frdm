import { createClient } from "@supabase/supabase-js";

/**
 * Read-only client for the public site. Uses the anon key, which is subject
 * to the RLS policies defined in supabase/migrations (public SELECT only).
 */
export function getPublicSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Variabili Supabase mancanti: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
