import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { getAdminSupabaseClient } from "@/lib/supabase/admin";
import type { ShopListing, ShopListingInput, ShopCategory, ShopStatus } from "@/types/db";

const TABLE = "shop_listings";

export interface ShopFilters {
  category?: ShopCategory;
  status?: ShopStatus;
}

export async function getShopListings(filters: ShopFilters = {}): Promise<ShopListing[]> {
  const supabase = getPublicSupabaseClient();
  let query = supabase.from(TABLE).select("*").order("created_at", { ascending: false });

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.status) query = query.eq("status", filters.status);

  const { data, error } = await query;

  if (error) {
    console.error("getShopListings error", error);
    return [];
  }

  return data ?? [];
}

export async function getShopListingById(id: string): Promise<ShopListing | null> {
  const supabase = getPublicSupabaseClient();
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();

  if (error) {
    console.error("getShopListingById error", error);
    return null;
  }

  return data;
}

export async function getAllShopListingsAdmin(): Promise<ShopListing[]> {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getShopListingByIdAdmin(id: string): Promise<ShopListing | null> {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createShopListing(input: ShopListingInput) {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase.from(TABLE).insert(input).select().single();
  if (error) throw error;
  return data as ShopListing;
}

export async function updateShopListing(id: string, input: Partial<ShopListingInput>) {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE)
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as ShopListing;
}

export async function deleteShopListing(id: string) {
  const supabase = getAdminSupabaseClient();
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

export async function markShopListingSold(id: string, stripeSessionId: string) {
  const supabase = getAdminSupabaseClient();
  const { error } = await supabase
    .from(TABLE)
    .update({ status: "venduto", stripe_session_id: stripeSessionId })
    .eq("id", id);

  if (error) throw error;
}
