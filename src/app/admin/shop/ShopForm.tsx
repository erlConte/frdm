import Image from "next/image";
import type { ShopListing } from "@/types/db";

export function ShopForm({
  listing,
  action,
}: {
  listing?: ShopListing;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <Field label="Titolo">
        <input name="title" defaultValue={listing?.title} required className={inputClass} />
      </Field>

      <Field label="Descrizione">
        <textarea
          name="description"
          defaultValue={listing?.description ?? ""}
          rows={5}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Prezzo (EUR)">
          <input
            name="price_euros"
            type="number"
            step="0.01"
            min="0.01"
            defaultValue={listing ? (listing.price_cents / 100).toFixed(2) : ""}
            required
            className={inputClass}
          />
        </Field>
        <Field label="Categoria">
          <select name="category" defaultValue={listing?.category ?? "vino"} className={inputClass}>
            <option value="vino">Vino</option>
            <option value="abbigliamento">Abbigliamento</option>
          </select>
        </Field>
        <Field label="Stato">
          <select name="status" defaultValue={listing?.status ?? "disponibile"} className={inputClass}>
            <option value="disponibile">Disponibile</option>
            <option value="venduto">Venduto</option>
          </select>
        </Field>
      </div>

      {listing && listing.images.length > 0 && (
        <Field label="Immagini esistenti (seleziona per rimuovere)">
          <div className="flex flex-wrap gap-4">
            {listing.images.map((url) => (
              <label key={url} className="flex flex-col items-center gap-1 text-xs text-muted">
                <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-border">
                  <Image src={url} alt="" fill sizes="80px" className="object-cover" />
                </div>
                <span className="flex items-center gap-1">
                  <input type="checkbox" name="remove_image" value={url} />
                  Rimuovi
                </span>
              </label>
            ))}
          </div>
        </Field>
      )}

      <Field label="Aggiungi immagini">
        <input name="images" type="file" accept="image/*" multiple className={inputClass} />
      </Field>

      <button
        type="submit"
        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        {listing ? "Salva modifiche" : "Crea annuncio"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent";
