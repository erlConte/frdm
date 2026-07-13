import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getShopListingById } from "@/lib/data/shop";
import { formatPrice } from "@/lib/format";
import { Gallery } from "@/components/shop/Gallery";
import { BuyButton } from "@/components/shop/BuyButton";

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const listing = await getShopListingById(id);

  if (!listing) {
    return {};
  }

  const price = formatPrice(listing.price_cents, locale);
  const description = listing.description
    ? `${listing.description.slice(0, 140)} — ${price}`
    : price;
  const image = listing.images[0];

  return {
    title: listing.title,
    description,
    openGraph: {
      title: listing.title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function ShopListingPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const listing = await getShopListingById(id);
  if (!listing) notFound();

  const t = await getTranslations("shopDetail");
  const tShop = await getTranslations("shop");

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/shop" className="text-sm text-muted hover:text-foreground">
        ← {t("back")}
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <Gallery images={listing.images} alt={listing.title} />

        <div>
          <p className="text-xs uppercase tracking-widest text-accent">
            {listing.category === "vino" ? tShop("categoryVino") : tShop("categoryAbbigliamento")}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {listing.title}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-accent">
            {formatPrice(listing.price_cents, locale)}
          </p>

          {listing.description && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
                {t("description")}
              </h2>
              <p className="mt-2 whitespace-pre-line leading-relaxed text-foreground/90">
                {listing.description}
              </p>
            </div>
          )}

          <div className="mt-8">
            {listing.status === "venduto" ? (
              <span className="inline-block rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-muted">
                {t("soldOut")}
              </span>
            ) : (
              <BuyButton listingId={listing.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
