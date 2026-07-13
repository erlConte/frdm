import type { PortfolioItem } from "@/types/db";
import type { AppLocale } from "@/i18n/routing";

function pickLocalized(item: PortfolioItem, locale: AppLocale, field: "title" | "description") {
  const key = `${field}_${locale}` as keyof PortfolioItem;
  return (item[key] as string | null) ?? item[`${field}_it` as keyof PortfolioItem];
}

export function ProjectGrid({
  title,
  intro,
  items,
  locale,
  visitLabel,
}: {
  title?: string;
  intro?: string;
  items: PortfolioItem[];
  locale: AppLocale;
  visitLabel: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className={title ? "py-12" : undefined}>
      {title && <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>}
      {intro && <p className="mt-2 max-w-2xl text-sm text-muted">{intro}</p>}

      <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${title ? "mt-8" : ""}`}>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
          >
            <h3 className="font-semibold">{pickLocalized(item, locale, "title")}</h3>
            {item.subtitle && (
              <p className="mt-1 text-sm text-accent">{item.subtitle}</p>
            )}
            {pickLocalized(item, locale, "description") && (
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {pickLocalized(item, locale, "description")}
              </p>
            )}
            {item.external_url && (
              <a
                href={item.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-accent hover:underline"
              >
                {visitLabel} →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
