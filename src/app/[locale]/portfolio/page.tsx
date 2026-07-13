import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPortfolioItems } from "@/lib/data/portfolio";
import { splitByTrack } from "@/lib/portfolio-tracks";
import { TimelineSection } from "@/components/portfolio/TimelineSection";
import { TrackColumn } from "@/components/portfolio/TrackColumn";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { PathsConvergence } from "@/components/portfolio/PathsConvergence";
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

  const { tech, hospitality, base } = splitByTrack(items);
  const projects = items.filter((item) => item.section === "progetto");

  const groupLabels: Record<PortfolioSection, string> = {
    esperienza: t("sections.esperienza"),
    formazione: t("sections.formazione"),
    certificazione: t("sections.certificazione"),
    percorso_personale: t("sections.percorso_personale"),
    progetto: t("sections.progetto"),
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">{t("intro")}</p>

      {items.length === 0 ? (
        <p className="mt-16 text-sm text-muted">{t("empty")}</p>
      ) : (
        <>
          {/* Le radici comuni: liceo, musica, lingue — prima dei due percorsi */}
          {base.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("tracks.baseTitle")}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                {t("tracks.baseIntro")}
              </p>
              <div className="mt-6 max-w-3xl">
                <TimelineSection items={base} locale={appLocale} />
              </div>
            </section>
          )}

          {/* I due percorsi paralleli */}
          {(tech.length > 0 || hospitality.length > 0) && (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("tracks.pathsTitle")}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                {t("tracks.pathsIntro")}
              </p>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <TrackColumn
                  label={t("tracks.techLabel")}
                  accentVar="var(--track-tech)"
                  items={tech}
                  locale={appLocale}
                  groupLabels={groupLabels}
                />
                <TrackColumn
                  label={t("tracks.hospLabel")}
                  accentVar="var(--track-hosp)"
                  items={hospitality}
                  locale={appLocale}
                  groupLabels={groupLabels}
                />
              </div>
            </section>
          )}

          {/* Il punto d'incontro: i progetti */}
          {projects.length > 0 && (
            <section className="mt-20 text-center">
              <PathsConvergence />
              <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("tracks.crossTitle")}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-balance text-sm leading-relaxed text-muted sm:text-base">
                {t("tracks.crossIntro")}
              </p>
              <div className="mt-10 text-left">
                <ProjectGrid
                  items={projects}
                  locale={appLocale}
                  visitLabel={t("visitSite")}
                />
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
