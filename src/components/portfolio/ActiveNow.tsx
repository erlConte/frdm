import type { PortfolioItem, PortfolioSection } from "@/types/db";
import type { AppLocale } from "@/i18n/routing";

function pickLocalized(
  item: PortfolioItem,
  locale: AppLocale,
  field: "title" | "description"
) {
  const key = `${field}_${locale}` as keyof PortfolioItem;
  return (item[key] as string | null) ?? (item[`${field}_it` as keyof PortfolioItem] as string);
}

export function ActiveNow({
  items,
  locale,
  labels,
}: {
  items: PortfolioItem[];
  locale: AppLocale;
  labels: Record<PortfolioSection, string>;
}) {
  if (items.length === 0) return null;

  return (
    <div className="active-now-grid mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <article
          key={item.id}
          className={`active-now-card glass relative overflow-hidden rounded-[1.75rem] p-6 sm:p-7 ${
            index === 0 ? "active-now-featured md:col-span-2" : ""
          } ${
            item.section === "progetto" ? "active-now-project" : ""
          }`}
        >
          <div className="active-now-glow" aria-hidden="true" />
          <div className="relative z-10 flex h-full min-h-48 flex-col">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent">
                {labels[item.section]}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/55 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-foreground/70">
                <span className="current-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {item.period}
              </span>
            </div>

            <div className="mt-auto pt-10">
              <h3 className={`text-balance font-semibold leading-tight tracking-[-0.025em] ${
                index === 0 ? "text-2xl sm:text-3xl" : "text-xl"
              }`}>
                {pickLocalized(item, locale, "title")}
              </h3>
              {item.subtitle && <p className="mt-2 text-sm font-medium text-muted">{item.subtitle}</p>}
              {(index === 0 || item.section === "progetto") && pickLocalized(item, locale, "description") && (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                  {pickLocalized(item, locale, "description")}
                </p>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
