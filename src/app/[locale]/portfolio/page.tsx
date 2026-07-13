import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPortfolioItems } from "@/lib/data/portfolio";
import { TimelineSection } from "@/components/portfolio/TimelineSection";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import type { AppLocale } from "@/i18n/routing";
import type { PortfolioSection } from "@/types/db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.portfolio" });
  return { title: t("title"), description: t("description") };
}

function bysection(items: Awaited<ReturnType<typeof getPortfolioItems>>, section: PortfolioSection) {
  return items.filter((item) => item.section === section);
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("portfolio");
  const items = await getPortfolioItems();
  const appLocale = locale as AppLocale;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("intro")}</p>

      <div className="divide-y divide-border">
        <TimelineSection
          title={t("sections.esperienza")}
          items={bysection(items, "esperienza")}
          locale={appLocale}
        />
        <ProjectGrid
          title={t("sections.progetto")}
          intro={t("sectionIntros.progetto")}
          items={bysection(items, "progetto")}
          locale={appLocale}
          visitLabel={t("visitSite")}
        />
        <TimelineSection
          title={t("sections.formazione")}
          items={bysection(items, "formazione")}
          locale={appLocale}
        />
        <TimelineSection
          title={t("sections.certificazione")}
          items={bysection(items, "certificazione")}
          locale={appLocale}
        />
        <TimelineSection
          title={t("sections.percorso_personale")}
          intro={t("sectionIntros.percorso_personale")}
          items={bysection(items, "percorso_personale")}
          locale={appLocale}
        />
      </div>

      {items.length === 0 && (
        <p className="mt-16 text-sm text-muted">{t("empty")}</p>
      )}
    </div>
  );
}
