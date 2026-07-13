import "server-only";
import { getAdminSupabaseClient } from "./admin";

const BUCKET = "media";

function extensionFor(file: File): string {
  const fromName = file.name.split(".").pop();
  if (fromName && fromName.length <= 5) return fromName.toLowerCase();
  const fromType = file.type.split("/").pop();
  return fromType ?? "bin";
}

export async function uploadImage(file: File, folder: "portfolio" | "shop"): Promise<string> {
  const supabase = getAdminSupabaseClient();
  const path = `${folder}/${crypto.randomUUID()}.${extensionFor(file)}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadImages(files: File[], folder: "portfolio" | "shop"): Promise<string[]> {
  return Promise.all(files.map((file) => uploadImage(file, folder)));
}

function pathFromPublicUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.slice(index + marker.length);
}

export async function deleteImages(urls: string[]): Promise<void> {
  const paths = urls.map(pathFromPublicUrl).filter((p): p is string => !!p);
  if (paths.length === 0) return;

  const supabase = getAdminSupabaseClient();
  await supabase.storage.from(BUCKET).remove(paths);
}
