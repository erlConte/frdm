import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { getAdminSupabaseClient } from "@/lib/supabase/admin";
import type { PortfolioItem, PortfolioItemInput } from "@/types/db";

const TABLE = "portfolio_items";

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const supabase = getPublicSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("section", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getPortfolioItems error", error);
    return [];
  }

  return data ?? [];
}

export async function getAllPortfolioItemsAdmin(): Promise<PortfolioItem[]> {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("section", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getPortfolioItemByIdAdmin(id: string): Promise<PortfolioItem | null> {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createPortfolioItem(input: PortfolioItemInput) {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE)
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as PortfolioItem;
}

export async function updatePortfolioItem(
  id: string,
  input: Partial<PortfolioItemInput>
) {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE)
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as PortfolioItem;
}

export async function deletePortfolioItem(id: string) {
  const supabase = getAdminSupabaseClient();
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}
