import Link from "next/link";
import { getAllShopListingsAdmin } from "@/lib/data/shop";
import { formatPrice } from "@/lib/format";
import { DeleteButton } from "../DeleteButton";
import { AdminError, errorMessage } from "../AdminError";
import { deleteShopListingAction } from "./actions";

export default async function AdminShopPage() {
  let listings;
  try {
    listings = await getAllShopListingsAdmin();
  } catch (error) {
    return <AdminError message={errorMessage(error)} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Shop</h2>
        <Link
          href="/admin/shop/new"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white"
        >
          + Nuovo annuncio
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Titolo</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Prezzo</th>
              <th className="px-4 py-3">Stato</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {listings.map((listing) => (
              <tr key={listing.id}>
                <td className="px-4 py-3 font-medium">{listing.title}</td>
                <td className="px-4 py-3 text-muted capitalize">{listing.category}</td>
                <td className="px-4 py-3 text-muted">{formatPrice(listing.price_cents, "it")}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      listing.status === "disponibile"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-white/10 text-muted"
                    }`}
                  >
                    {listing.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/shop/${listing.id}`}
                      className="text-accent-2 hover:underline"
                    >
                      Modifica
                    </Link>
                    <DeleteButton
                      action={deleteShopListingAction.bind(null, listing.id)}
                      confirmMessage="Eliminare questo annuncio?"
                    />
                  </div>
                </td>
              </tr>
            ))}
            {listings.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  Nessun annuncio ancora. Creane uno con il pulsante qui sopra.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
