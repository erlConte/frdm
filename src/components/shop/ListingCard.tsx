import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ShopListing } from "@/types/db";
import { formatPrice } from "@/lib/format";

export function ListingCard({ listing }: { listing: ShopListing }) {
  const t = useTranslations("shop");
  const locale = useLocale();
  const image = listing.images[0] ?? "/images/listing-placeholder.svg";
  const sold = listing.status === "venduto";

  return (
    <Link
      href={`/shop/${listing.id}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-surface-2">
        <Image
          src={image}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {sold && (
          <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {t("sold")}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="min-w-0">
          <p className="truncate font-medium">{listing.title}</p>
          <p className="text-xs uppercase tracking-wide text-muted">
            {listing.category === "vino" ? t("categoryVino") : t("categoryAbbigliamento")}
          </p>
        </div>
        <p className="shrink-0 font-semibold text-accent-2">
          {formatPrice(listing.price_cents, locale)}
        </p>
      </div>
    </Link>
  );
}
