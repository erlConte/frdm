import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getShopListings } from "@/lib/data/shop";
import { ListingCard } from "@/components/shop/ListingCard";
import { ShopFilters } from "@/components/shop/ShopFilters";
import type { ShopCategory, ShopStatus } from "@/types/db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.shop" });
  return { title: t("title"), description: t("description") };
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; status?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { category, status } = await searchParams;

  const t = await getTranslations("shop");

  const validCategory: ShopCategory | undefined =
    category === "vino" || category === "abbigliamento" ? category : undefined;
  const validStatus: ShopStatus | undefined =
    status === "disponibile" || status === "venduto" ? status : undefined;

  const listings = await getShopListings({
    category: validCategory,
    status: validStatus,
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("intro")}</p>

      <div className="mt-8">
        <ShopFilters category={validCategory} status={validStatus} />
      </div>

      {listings.length === 0 ? (
        <p className="mt-16 text-sm text-muted">{t("empty")}</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
