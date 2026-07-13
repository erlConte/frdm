import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getShopListings } from "@/lib/data/shop";
import { ListingCard } from "@/components/shop/ListingCard";
import { HeroTitle } from "@/components/home/HeroTitle";
import { ParallaxImage } from "@/components/home/ParallaxImage";

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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_-10%,rgba(168,67,47,0.10),transparent_55%),radial-gradient(circle_at_92%_8%,rgba(201,146,46,0.12),transparent_45%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 sm:py-28">
          <div className="animate-fade-up">
            <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs uppercase tracking-widest text-accent">
              {t("kicker")}
            </span>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <ParallaxImage
              src="/images/profile-placeholder.svg"
              alt="Filippo Resseguier de Miremont"
              className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-sm sm:h-44 sm:w-44"
            />
            <div className="max-w-2xl">
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                <HeroTitle text={t("heroTitle")} />
              </h1>
              <p className="mt-4 text-lg text-accent sm:text-xl">
                <HeroTitle text={t("heroSubtitle")} baseDelay={0.45} step={0.05} />
              </p>
            </div>
          </div>

          <p
            className="max-w-2xl text-balance text-base leading-relaxed text-muted animate-fade-up sm:text-lg"
            style={{ animationDelay: "0.7s" }}
          >
            {t("heroBio")}
          </p>

          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "0.85s" }}
          >
            <Link
              href="/portfolio"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {t("ctaPortfolio")}
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-accent-2 hover:shadow-md"
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
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent-2 hover:shadow-md"
            >
              <h3 className="font-semibold">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {h.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface-2/50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("shopTeaserTitle")}
              </h2>
              <p className="mt-1 text-sm text-muted">{t("shopTeaserText")}</p>
            </div>
            <Link
              href="/shop"
              className="hidden shrink-0 text-sm font-semibold text-accent hover:underline sm:block"
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
