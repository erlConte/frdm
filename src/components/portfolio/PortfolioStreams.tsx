import type { PortfolioItem, PortfolioSection } from "@/types/db";
import type { AppLocale } from "@/i18n/routing";
import { isCurrentItem } from "@/lib/portfolio-tracks";
import { ScrollReveal } from "@/components/home/ScrollReveal";

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
        <div className="tech-data-rail" aria-hidden="true" />
        <div className="relative space-y-12 sm:space-y-16 lg:space-y-20">
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
        <span className="glass relative rounded-full px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>

      <div className="hospitality-map relative overflow-hidden rounded-[2.5rem] px-3 py-10 sm:px-6 sm:py-14">
        <div className="hospitality-compass" aria-hidden="true">
          <span>N</span>
          <i />
        </div>
        <svg
          className="hospitality-route pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M50 0 C 82 7, 75 17, 46 23 S 15 38, 51 45 S 84 58, 48 65 S 17 80, 52 87 S 67 96, 50 100"
          />
        </svg>

        <div className="relative space-y-14 sm:space-y-20 lg:space-y-24">
          {items.map((item, index) => (
            <ScrollReveal
              key={item.id}
              className={`hospitality-stop-wrap ${index % 2 === 0 ? "hospitality-stop-left" : "hospitality-stop-right"}`}
            >
              <article
                className="hospitality-map-stop glass relative overflow-visible rounded-[1.8rem] p-6 sm:p-7"
                data-current={isCurrentItem(item) || undefined}
              >
                <span className="map-stop-pin" aria-hidden="true">
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </span>
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
      <div className="relative grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-24">
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
    </div>
  );
}
