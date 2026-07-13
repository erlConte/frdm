import Link from "next/link";
import { getAllPortfolioItemsAdmin } from "@/lib/data/portfolio";
import { DeleteButton } from "../DeleteButton";
import { AdminError, errorMessage } from "../AdminError";
import { deletePortfolioItemAction } from "./actions";

const SECTION_LABELS: Record<string, string> = {
  esperienza: "Esperienza",
  formazione: "Formazione",
  certificazione: "Certificazione",
  percorso_personale: "Percorso personale",
  progetto: "Progetto",
};

export default async function AdminPortfolioPage() {
  let items;
  try {
    items = await getAllPortfolioItemsAdmin();
  } catch (error) {
    return <AdminError message={errorMessage(error)} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Portfolio</h2>
        <Link
          href="/admin/portfolio/new"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white"
        >
          + Nuova voce
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Sezione</th>
              <th className="px-4 py-3">Titolo</th>
              <th className="px-4 py-3">Periodo</th>
              <th className="px-4 py-3">Ordine</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-muted">{SECTION_LABELS[item.section]}</td>
                <td className="px-4 py-3 font-medium">{item.title_it}</td>
                <td className="px-4 py-3 text-muted">{item.period ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{item.sort_order}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/portfolio/${item.id}`}
                      className="text-accent hover:underline"
                    >
                      Modifica
                    </Link>
                    <DeleteButton
                      action={deletePortfolioItemAction.bind(null, item.id)}
                      confirmMessage="Eliminare questa voce del portfolio?"
                    />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  Nessuna voce ancora. Creane una con il pulsante qui sopra.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
