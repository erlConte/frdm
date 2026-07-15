import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPortfolioItems } from "@/lib/data/portfolio";
import { isCurrentItem, splitByTrack } from "@/lib/portfolio-tracks";
import { ActiveNow } from "@/components/portfolio/ActiveNow";
import { PortfolioStreams } from "@/components/portfolio/PortfolioStreams";
import { RootsStrip } from "@/components/portfolio/RootsStrip";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { PathsConvergence } from "@/components/portfolio/PathsConvergence";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import type { AppLocale } from "@/i18n/routing";
import type { PortfolioItem, PortfolioSection } from "@/types/db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.portfolio" });
  return { title: t("title"), description: t("description") };
}

function activePriority(item: PortfolioItem) {
  if (/hotel de russie/i.test(`${item.title_it} ${item.subtitle ?? ""}`)) return 0;
  const sectionPriority: Record<PortfolioSection, number> = {
    esperienza: 1,
    progetto: 2,
    formazione: 3,
    certificazione: 4,
    percorso_personale: 5,
  };
  return sectionPriority[item.section];
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
  const baseIds = new Set(base.map((item) => item.id));
  const activeItems = items
    .filter((item) => isCurrentItem(item) && !baseIds.has(item.id))
    .sort((a, b) => activePriority(a) - activePriority(b));

  const groupLabels: Record<PortfolioSection, string> = {
    esperienza: t("sections.esperienza"),
    formazione: t("sections.formazione"),
    certificazione: t("sections.certificazione"),
    percorso_personale: t("sections.percorso_personale"),
    progetto: t("sections.progetto"),
  };

  return (
    <div className="overflow-hidden">
      <section className="relative px-6 pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-[-12rem] -z-10 h-[30rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(101,217,237,0.18),rgba(111,133,255,0.1)_35%,transparent_70%)] blur-2xl" />
        <div className="mx-auto max-w-5xl">
          <h1 className="sr-only">{t("title")}</h1>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {t("eyebrow")}
          </p>
          <p className="mt-4 max-w-4xl text-balance font-display text-3xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
            {t("journeyTitle")}
          </p>
          <p className="mt-5 max-w-2xl text-balance text-sm leading-relaxed text-muted sm:text-base">
            {t("intro")}
          </p>
        </div>
      </section>

      {items.length === 0 ? (
        <p className="mx-auto max-w-7xl px-6 pb-24 text-sm text-muted">{t("empty")}</p>
      ) : (
        <>
          {activeItems.length > 0 && (
            <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 sm:pb-36">
              <ScrollReveal>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
                      {t("active.kicker")}
                    </p>
                    <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl">
                      {t("active.title")}
                    </h2>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                    {t("active.intro")}
                  </p>
                </div>
                <ActiveNow
                  items={activeItems}
                  locale={appLocale}
                  labels={groupLabels}
                  networkTitle={t("active.networkTitle")}
                  networkText={t("active.networkText")}
                />
              </ScrollReveal>
            </section>
          )}

          {(tech.length > 0 || hospitality.length > 0) && (
            <section className="relative mx-auto max-w-7xl px-4 pb-0 sm:px-6">
              <ScrollReveal className="mx-auto max-w-4xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  {t("tracks.pathsKicker")}
                </p>
                <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl">
                  {t("tracks.pathsTitle")}
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-balance text-sm leading-relaxed text-muted sm:text-base">
                  {t("tracks.pathsIntro")}
                </p>
              </ScrollReveal>

              <PortfolioStreams
                tech={tech}
                hospitality={hospitality}
                locale={appLocale}
                labels={{
                  tech: t("tracks.techLabel"),
                  hospitality: t("tracks.hospLabel"),
                }}
                groupLabels={groupLabels}
                currentLabel={t("active.badge")}
              />
            </section>
          )}

          {projects.length > 0 && <PathsConvergence />}

          {projects.length > 0 && (
            <section className="relative bg-[#101b24] px-4 pb-28 pt-12 text-white sm:px-6 sm:pb-36 sm:pt-16">
              <div className="pointer-events-none absolute left-[-10rem] top-[-14rem] h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-[110px]" />
              <div className="pointer-events-none absolute bottom-[-14rem] right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-track-hosp/20 blur-[110px]" />
              <div className="relative mx-auto max-w-7xl text-center">
                <ScrollReveal>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
                    {t("tracks.crossKicker")}
                  </p>
                  <h2 className="mx-auto mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl">
                    {t("tracks.crossTitle")}
                  </h2>
                  <p className="mx-auto mt-5 max-w-2xl text-balance text-sm leading-relaxed text-white/58 sm:text-base">
                    {t("tracks.crossIntro")}
                  </p>
                </ScrollReveal>
                <div className="mt-12 text-left">
                  <ProjectGrid
                    items={projects}
                    locale={appLocale}
                    visitLabel={t("visitSite")}
                  />
                </div>
              </div>
            </section>
          )}

          {base.length > 0 && (
            <section className="px-4 py-24 sm:px-6 sm:py-28">
              <ScrollReveal className="glass relative mx-auto max-w-7xl rounded-[2rem] px-6 py-7 sm:px-8 sm:py-9">
                <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted">
                      {t("tracks.baseKicker")}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                      {t("tracks.baseTitle")}
                    </h2>
                  </div>
                  <p className="max-w-xl text-xs leading-relaxed text-muted sm:text-sm">
                    {t("tracks.baseIntro")}
                  </p>
                </div>
                <div className="relative z-10">
                  <RootsStrip
                    items={base}
                    locale={appLocale}
                    labels={{
                      education: t("tracks.rootsEducation"),
                      languages: t("tracks.rootsLanguages"),
                      music: t("tracks.rootsMusic"),
                    }}
                  />
                </div>
              </ScrollReveal>
            </section>
          )}
        </>
      )}
    </div>
  );
}
