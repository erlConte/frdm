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

function Stream({
  kind,
  label,
  items,
  locale,
  groupLabels,
  currentLabel,
}: {
  kind: "tech" | "hospitality";
  label: string;
  items: PortfolioItem[];
  locale: AppLocale;
  groupLabels: Record<PortfolioSection, string>;
  currentLabel: string;
}) {
  return (
    <div className={`portfolio-stream portfolio-stream-${kind}`}>
      <div className="portfolio-stream-label sticky top-24 z-20 mb-10 flex justify-center lg:mb-16">
        <span className="glass relative rounded-full px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>

      <div className="space-y-12 sm:space-y-16 lg:space-y-24">
        {items.map((item, index) => {
          const current = isCurrentItem(item);
          return (
            <ScrollReveal key={item.id} className={`reveal-delay-${Math.min(index % 3, 2)}`}>
              <article className="portfolio-stream-entry glass relative overflow-hidden rounded-[1.75rem] p-6 sm:p-7" data-current={current || undefined}>
                <span className="stream-node" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-muted">
                      {groupLabels[item.section]}
                    </span>
                    {current ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/58 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-foreground/75">
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
              </article>
            </ScrollReveal>
          );
        })}
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
        className="portfolio-stream-lines pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="stream-path stream-path-tech" d="M24 0 C 31 18, 19 32, 30 49 S 34 75, 49 100" />
        <path className="stream-path stream-path-hospitality" d="M76 0 C 69 18, 81 32, 70 49 S 66 75, 51 100" />
      </svg>

      <div className="relative grid gap-16 lg:grid-cols-2 lg:gap-24">
        <Stream
          kind="tech"
          label={labels.tech}
          items={tech}
          locale={locale}
          groupLabels={groupLabels}
          currentLabel={currentLabel}
        />
        <Stream
          kind="hospitality"
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
