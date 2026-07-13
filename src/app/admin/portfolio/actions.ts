"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createPortfolioItem,
  deletePortfolioItem,
  updatePortfolioItem,
} from "@/lib/data/portfolio";
import { uploadImage } from "@/lib/supabase/storage";
import type { PortfolioSection } from "@/types/db";

function readInput(formData: FormData) {
  return {
    section: String(formData.get("section")) as PortfolioSection,
    title_it: String(formData.get("title_it") ?? ""),
    title_en: String(formData.get("title_en") ?? ""),
    title_es: String(formData.get("title_es") ?? ""),
    subtitle: (formData.get("subtitle") as string) || null,
    period: (formData.get("period") as string) || null,
    description_it: (formData.get("description_it") as string) || null,
    description_en: (formData.get("description_en") as string) || null,
    description_es: (formData.get("description_es") as string) || null,
    external_url: (formData.get("external_url") as string) || null,
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createPortfolioItemAction(formData: FormData) {
  const input = readInput(formData);
  const image = formData.get("image") as File | null;

  let image_url: string | null = null;
  if (image && image.size > 0) {
    image_url = await uploadImage(image, "portfolio");
  }

  await createPortfolioItem({ ...input, image_url });

  revalidatePath("/admin/portfolio");
  revalidatePath("/[locale]/portfolio", "page");
  redirect("/admin/portfolio");
}

export async function updatePortfolioItemAction(id: string, formData: FormData) {
  const input = readInput(formData);
  const image = formData.get("image") as File | null;

  const updates: Partial<Record<string, unknown>> = { ...input };

  if (image && image.size > 0) {
    updates.image_url = await uploadImage(image, "portfolio");
  }

  await updatePortfolioItem(id, updates);

  revalidatePath("/admin/portfolio");
  revalidatePath("/[locale]/portfolio", "page");
  redirect("/admin/portfolio");
}

export async function deletePortfolioItemAction(id: string) {
  await deletePortfolioItem(id);
  revalidatePath("/admin/portfolio");
  revalidatePath("/[locale]/portfolio", "page");
}
