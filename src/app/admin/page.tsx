import Link from "next/link";
import { getAllPortfolioItemsAdmin } from "@/lib/data/portfolio";
import { getAllShopListingsAdmin } from "@/lib/data/shop";
import { getContactMessagesAdmin } from "@/lib/data/contact";
import { AdminError, errorMessage } from "./AdminError";

export default async function AdminDashboardPage() {
  let portfolioItems, listings, messages;

  try {
    [portfolioItems, listings, messages] = await Promise.all([
      getAllPortfolioItemsAdmin(),
      getAllShopListingsAdmin(),
      getContactMessagesAdmin(),
    ]);
  } catch (error) {
    return <AdminError message={errorMessage(error)} />;
  }

  const availableListings = listings.filter((l) => l.status === "disponibile").length;

  const cards = [
    {
      href: "/admin/portfolio",
      label: "Voci portfolio",
      value: portfolioItems.length,
    },
    {
      href: "/admin/shop",
      label: "Annunci shop",
      value: `${availableListings} / ${listings.length}`,
      hint: "disponibili / totali",
    },
    {
      href: "/admin/messages",
      label: "Messaggi contatti",
      value: messages.length,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
        >
          <p className="text-xs uppercase tracking-widest text-muted">{card.label}</p>
          <p className="mt-2 text-3xl font-semibold">{card.value}</p>
          {card.hint && <p className="mt-1 text-xs text-muted">{card.hint}</p>}
        </Link>
      ))}
    </div>
  );
}
