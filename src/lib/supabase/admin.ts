import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only client using the service role key. Bypasses RLS, so it must
 * never be imported from client components or exposed to the browser.
 * Used by admin server actions and the Stripe webhook.
 */
export function getAdminSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Variabili Supabase mancanti: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
