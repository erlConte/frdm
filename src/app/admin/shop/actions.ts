"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createShopListing,
  deleteShopListing,
  getShopListingByIdAdmin,
  updateShopListing,
} from "@/lib/data/shop";
import { uploadImages, deleteImages } from "@/lib/supabase/storage";
import type { ShopCategory, ShopStatus } from "@/types/db";

function readInput(formData: FormData) {
  const priceEuros = Number(formData.get("price_euros") ?? 0);

  return {
    title: String(formData.get("title") ?? ""),
    description: (formData.get("description") as string) || null,
    price_cents: Math.round(priceEuros * 100),
    category: String(formData.get("category")) as ShopCategory,
    status: String(formData.get("status") ?? "disponibile") as ShopStatus,
  };
}

export async function createShopListingAction(formData: FormData) {
  const input = readInput(formData);
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);

  const images = files.length > 0 ? await uploadImages(files, "shop") : [];

  await createShopListing({ ...input, images });

  revalidatePath("/admin/shop");
  revalidatePath("/[locale]/shop", "page");
  redirect("/admin/shop");
}

export async function updateShopListingAction(id: string, formData: FormData) {
  const input = readInput(formData);
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  const removeExisting = formData.getAll("remove_image") as string[];

  const newImages = files.length > 0 ? await uploadImages(files, "shop") : [];

  if (removeExisting.length > 0) {
    await deleteImages(removeExisting);
  }

  const existing = await getShopListingByIdAdmin(id);
  const keptImages = existing
    ? existing.images.filter((url) => !removeExisting.includes(url))
    : [];

  await updateShopListing(id, { ...input, images: [...keptImages, ...newImages] });

  revalidatePath("/admin/shop");
  revalidatePath("/[locale]/shop", "page");
  redirect("/admin/shop");
}

export async function deleteShopListingAction(id: string) {
  const listing = await getShopListingByIdAdmin(id);
  await deleteShopListing(id);
  if (listing?.images.length) {
    await deleteImages(listing.images);
  }

  revalidatePath("/admin/shop");
  revalidatePath("/[locale]/shop", "page");
}
