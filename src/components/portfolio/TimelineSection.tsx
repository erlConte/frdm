import type { PortfolioItem } from "@/types/db";
import type { AppLocale } from "@/i18n/routing";

function pickLocalized(item: PortfolioItem, locale: AppLocale, field: "title" | "description") {
  const key = `${field}_${locale}` as keyof PortfolioItem;
  return (item[key] as string | null) ?? item[`${field}_it` as keyof PortfolioItem];
}

export function TimelineSection({
  title,
  intro,
  items,
  locale,
}: {
  title?: string;
  intro?: string;
  items: PortfolioItem[];
  locale: AppLocale;
}) {
  if (items.length === 0) return null;

  return (
    <section className={title ? "py-12" : undefined}>
      {title && <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>}
      {intro && <p className="mt-2 max-w-2xl text-sm text-muted">{intro}</p>}

      <ol className={`space-y-8 border-l border-border pl-6 ${title ? "mt-8" : ""}`}>
        {items.map((item) => (
          <li key={item.id} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-semibold">{pickLocalized(item, locale, "title")}</h3>
              {item.period && (
                <span className="text-xs uppercase tracking-wide text-muted">
                  {item.period}
                </span>
              )}
            </div>
            {item.subtitle && (
              <p className="mt-0.5 text-sm text-accent">{item.subtitle}</p>
            )}
            {pickLocalized(item, locale, "description") && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {pickLocalized(item, locale, "description")}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
