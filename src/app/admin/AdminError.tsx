export function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
}

export function AdminError({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-300">
      <p className="font-semibold">Impossibile contattare Supabase.</p>
      <p className="mt-1 text-red-300/80">{message}</p>
      <p className="mt-2 text-red-300/80">
        Controlla le variabili NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY e
        SUPABASE_SERVICE_ROLE_KEY.
      </p>
    </div>
  );
}
