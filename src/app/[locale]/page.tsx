import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getShopListings } from "@/lib/data/shop";
import { ListingCard } from "@/components/shop/ListingCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return { title: t("title"), description: t("description") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const listings = (await getShopListings({ status: "disponibile" })).slice(0, 3);

  const highlights = [
    { title: t("highlight1Title"), text: t("highlight1Text") },
    { title: t("highlight2Title"), text: t("highlight2Text") },
    { title: t("highlight3Title"), text: t("highlight3Text") },
    { title: t("highlight4Title"), text: t("highlight4Text") },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(193,80,46,0.25),transparent_55%),radial-gradient(circle_at_90%_10%,rgba(224,165,74,0.15),transparent_45%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 sm:py-28">
          <div className="animate-fade-up">
            <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs uppercase tracking-widest text-accent-2">
              {t("kicker")}
            </span>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-border bg-surface sm:h-36 sm:w-36 animate-fade-up">
              <Image
                src="/images/profile-placeholder.svg"
                alt="Filippo Resseguier de Miremont"
                fill
                sizes="144px"
                className="object-cover"
                priority
              />
            </div>
            <div className="max-w-2xl animate-fade-up">
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                {t("heroTitle")}
              </h1>
              <p className="mt-3 text-lg text-accent-2 sm:text-xl">
                {t("heroSubtitle")}
              </p>
            </div>
          </div>
          <p className="max-w-2xl text-balance text-base leading-relaxed text-muted animate-fade-up sm:text-lg">
            {t("heroBio")}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up">
            <Link
              href="/portfolio"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {t("ctaPortfolio")}
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            >
              {t("ctaShop")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
          {t("highlightsTitle")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
            >
              <h3 className="font-semibold">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {h.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {t("shopTeaserTitle")}
              </h2>
              <p className="mt-1 text-sm text-muted">{t("shopTeaserText")}</p>
            </div>
            <Link
              href="/shop"
              className="hidden shrink-0 text-sm font-semibold text-accent-2 hover:underline sm:block"
            >
              Shop →
            </Link>
          </div>

          {listings.length === 0 ? (
            <p className="mt-8 text-sm text-muted">{t("shopTeaserEmpty")}</p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
