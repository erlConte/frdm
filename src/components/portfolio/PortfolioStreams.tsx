import type { PortfolioItem, PortfolioSection } from "@/types/db";
import type { AppLocale } from "@/i18n/routing";
import { isCurrentItem } from "@/lib/portfolio-tracks";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { PathsConvergence } from "@/components/portfolio/PathsConvergence";

function pickLocalized(
  item: PortfolioItem,
  locale: AppLocale,
  field: "title" | "description"
) {
  const key = `${field}_${locale}` as keyof PortfolioItem;
  return (item[key] as string | null) ?? (item[`${field}_it` as keyof PortfolioItem] as string);
}

function EntryContent({
  item,
  locale,
  groupLabel,
  currentLabel,
}: {
  item: PortfolioItem;
  locale: AppLocale;
  groupLabel: string;
  currentLabel: string;
}) {
  const current = isCurrentItem(item);

  return (
    <div className="relative z-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-muted">
          {groupLabel}
        </span>
        {current ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-white/62 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-foreground/75">
            <span className="current-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {currentLabel}
          </span>
        ) : item.period ? (
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.1em] text-muted">
            {item.period}
          </span>
        ) : null}
      </div>

      <h3 className="mt-5 text-balance text-xl font-semibold leading-tight tracking-[-0.025em] sm:text-2xl">
        {pickLocalized(item, locale, "title")}
      </h3>
      {item.subtitle && <p className="mt-2 text-sm font-medium stream-accent">{item.subtitle}</p>}
      {pickLocalized(item, locale, "description") && (
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {pickLocalized(item, locale, "description")}
        </p>
      )}
      {current && item.period && (
        <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
          {item.period}
        </p>
      )}
    </div>
  );
}

function TechSystem({
  label,
  items,
  locale,
  groupLabels,
  currentLabel,
}: {
  label: string;
  items: PortfolioItem[];
  locale: AppLocale;
  groupLabels: Record<PortfolioSection, string>;
  currentLabel: string;
}) {
  return (
    <div className="portfolio-stream portfolio-stream-tech">
      <div className="portfolio-stream-label sticky top-24 z-20 mb-10 flex justify-center lg:mb-14">
        <span className="glass relative rounded-full px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>

      <div className="tech-system-map relative rounded-[2.5rem] px-3 py-6 sm:px-6 sm:py-10">
        <div className="tech-system-entries relative flex flex-1 flex-col justify-evenly gap-12 sm:gap-16">
          {items.map((item, index) => (
            <ScrollReveal key={item.id} className={`reveal-delay-${Math.min(index % 3, 2)}`}>
              <article
                className="portfolio-stream-entry tech-system-entry glass relative overflow-hidden rounded-[1.5rem] p-6 sm:p-7"
                data-current={isCurrentItem(item) || undefined}
              >
                <span className="tech-port" aria-hidden="true" />
                <EntryContent
                  item={item}
                  locale={locale}
                  groupLabel={groupLabels[item.section]}
                  currentLabel={currentLabel}
                />
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function HospitalityMap({
  label,
  items,
  locale,
  groupLabels,
  currentLabel,
}: {
  label: string;
  items: PortfolioItem[];
  locale: AppLocale;
  groupLabels: Record<PortfolioSection, string>;
  currentLabel: string;
}) {
  return (
    <div className="portfolio-stream portfolio-stream-hospitality">
      <div className="portfolio-stream-label sticky top-24 z-20 mb-10 flex justify-center lg:mb-14">
        <span className="hospitality-map-label relative px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>

      <div className="hospitality-map relative overflow-visible rounded-[2.5rem] px-3 py-10 sm:px-6 sm:py-14">
        <div className="hospitality-map-wash wash-one" aria-hidden="true" />
        <div className="hospitality-map-wash wash-two" aria-hidden="true" />
        <div className="hospitality-compass" aria-hidden="true">
          <span>N</span>
          <i />
        </div>
        <span className="hospitality-map-coordinates hospitality-map-coordinates-top" aria-hidden="true">41°54&apos;N · 12°29&apos;E</span>
        <span className="hospitality-map-coordinates hospitality-map-coordinates-bottom" aria-hidden="true">— · — · ∞</span>
        <div className="relative space-y-16 py-8 sm:space-y-24 sm:py-12 lg:space-y-28">
          {items.map((item, index) => (
            <ScrollReveal
              key={item.id}
              className={`hospitality-stop-wrap ${index % 2 === 0 ? "hospitality-stop-left" : "hospitality-stop-right"}`}
            >
              <article
                className="hospitality-map-stop relative overflow-visible px-4 py-3 sm:px-6 sm:py-5"
                data-current={isCurrentItem(item) || undefined}
              >
                <span className="map-stop-pin" aria-hidden="true">
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </span>
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="map-annotation">{groupLabels[item.section]}</span>
                    {isCurrentItem(item) ? (
                      <span className="map-current-stamp">{currentLabel}</span>
                    ) : item.period ? (
                      <span className="map-period">{item.period}</span>
                    ) : null}
                  </div>
                  <h3 className="map-entry-title mt-3 text-balance font-display text-2xl font-semibold leading-[1.05] sm:text-3xl">
                    {pickLocalized(item, locale, "title")}
                  </h3>
                  {item.subtitle && <p className="mt-2 text-sm font-semibold text-track-hosp">{item.subtitle}</p>}
                  {pickLocalized(item, locale, "description") && (
                    <p className="map-entry-description mt-3 text-sm leading-relaxed">
                      {pickLocalized(item, locale, "description")}
                    </p>
                  )}
                  {isCurrentItem(item) && item.period && <p className="map-period mt-3">{item.period}</p>}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PortfolioStreams({
  tech,
  hospitality,
  locale,
  labels,
  groupLabels,
  currentLabel,
}: {
  tech: PortfolioItem[];
  hospitality: PortfolioItem[];
  locale: AppLocale;
  labels: { tech: string; hospitality: string };
  groupLabels: Record<PortfolioSection, string>;
  currentLabel: string;
}) {
  return (
    <div className="portfolio-streams relative mt-12 lg:mt-16">
      <svg
        className="portfolio-route-network pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="portfolio-route-line portfolio-route-tech"
          d="M250 18 C225 175 285 330 250 480 S278 720 250 875 C250 910 382 914 455 944 C478 953 492 958 500 960"
        />
        <path
          className="portfolio-route-line portfolio-route-hospitality"
          d="M750 18 C850 112 675 222 750 330 S850 500 735 615 S665 790 750 875 C750 910 630 914 548 944 C522 953 508 958 500 960"
        />
        <path className="portfolio-route-stem" d="M500 960 C500 972 500 986 500 1000" />
        <circle className="convergence-point" cx="500" cy="960" r="7" fill="white" />
      </svg>

      <div className="portfolio-stream-grid relative grid gap-16 lg:grid-cols-2 lg:items-stretch lg:gap-16 xl:gap-24">
        <TechSystem
          label={labels.tech}
          items={tech}
          locale={locale}
          groupLabels={groupLabels}
          currentLabel={currentLabel}
        />
        <HospitalityMap
          label={labels.hospitality}
          items={hospitality}
          locale={locale}
          groupLabels={groupLabels}
          currentLabel={currentLabel}
        />
      </div>
      <PathsConvergence />
    </div>
  );
}
