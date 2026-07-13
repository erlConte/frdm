import Image from "next/image";
import type { PortfolioItem } from "@/types/db";

const SECTIONS: { value: PortfolioItem["section"]; label: string }[] = [
  { value: "esperienza", label: "Esperienza professionale" },
  { value: "formazione", label: "Formazione" },
  { value: "certificazione", label: "Certificazione" },
  { value: "percorso_personale", label: "Percorso personale" },
  { value: "progetto", label: "Progetto imprenditoriale" },
];

export function PortfolioForm({
  item,
  action,
}: {
  item?: PortfolioItem;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <Field label="Sezione">
        <select
          name="section"
          defaultValue={item?.section ?? "esperienza"}
          required
          className={selectClass}
        >
          {SECTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Titolo (IT)">
          <input name="title_it" defaultValue={item?.title_it} required className={inputClass} />
        </Field>
        <Field label="Titolo (EN)">
          <input name="title_en" defaultValue={item?.title_en} required className={inputClass} />
        </Field>
        <Field label="Titolo (ES)">
          <input name="title_es" defaultValue={item?.title_es} required className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Sottotitolo (es. azienda/istituto)">
          <input name="subtitle" defaultValue={item?.subtitle ?? ""} className={inputClass} />
        </Field>
        <Field label="Periodo (es. 2024 – in corso)">
          <input name="period" defaultValue={item?.period ?? ""} className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Descrizione (IT)">
          <textarea
            name="description_it"
            defaultValue={item?.description_it ?? ""}
            rows={4}
            className={inputClass}
          />
        </Field>
        <Field label="Descrizione (EN)">
          <textarea
            name="description_en"
            defaultValue={item?.description_en ?? ""}
            rows={4}
            className={inputClass}
          />
        </Field>
        <Field label="Descrizione (ES)">
          <textarea
            name="description_es"
            defaultValue={item?.description_es ?? ""}
            rows={4}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Link esterno (progetti)">
          <input
            name="external_url"
            type="url"
            defaultValue={item?.external_url ?? ""}
            placeholder="https://"
            className={inputClass}
          />
        </Field>
        <Field label="Ordinamento (numero, crescente)">
          <input
            name="sort_order"
            type="number"
            defaultValue={item?.sort_order ?? 0}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label={item?.image_url ? "Sostituisci immagine" : "Immagine (opzionale)"}>
        {item?.image_url && (
          <div className="relative mb-2 h-24 w-24 overflow-hidden rounded-lg border border-border">
            <Image src={item.image_url} alt="" fill sizes="96px" className="object-cover" />
          </div>
        )}
        <input name="image" type="file" accept="image/*" className={inputClass} />
      </Field>

      <button
        type="submit"
        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        {item ? "Salva modifiche" : "Crea voce"}
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
const selectClass = inputClass;
