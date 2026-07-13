"use server";

import { revalidatePath } from "next/cache";
import { deleteContactMessage } from "@/lib/data/contact";

export async function deleteContactMessageAction(id: string) {
  await deleteContactMessage(id);
  revalidatePath("/admin/messages");
}
