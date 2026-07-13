import { getAdminSupabaseClient } from "@/lib/supabase/admin";
import type { ContactMessage, ContactMessageInput } from "@/types/db";

const TABLE = "contact_messages";

export async function createContactMessage(input: ContactMessageInput) {
  const supabase = getAdminSupabaseClient();
  const { error } = await supabase.from(TABLE).insert(input);
  if (error) throw error;
}

export async function getContactMessagesAdmin(): Promise<ContactMessage[]> {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function deleteContactMessage(id: string) {
  const supabase = getAdminSupabaseClient();
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}
