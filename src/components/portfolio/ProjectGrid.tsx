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

      <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${title ? "mt-8" : ""}`}>
        {items.map((item, index) => (
          <article
            key={item.id}
            className={`project-glass glass project-tone-${index % 3} group flex min-h-[24rem] flex-col p-7 text-foreground sm:p-8`}
          >
            <div className="project-orb" aria-hidden="true" />
            <div className="relative z-10 flex h-full flex-col">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted">
                0{index + 1} / Project
              </span>
              <div className="mt-auto pt-28">
                <h3 className="font-display text-4xl font-semibold tracking-[-0.045em]">
                  {pickLocalized(item, locale, "title")}
                </h3>
                {item.subtitle && (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                    {item.subtitle}
                  </p>
                )}
                {pickLocalized(item, locale, "description") && (
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {pickLocalized(item, locale, "description")}
                  </p>
                )}
                {item.external_url && (
                  <a
                    href={item.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold transition-colors hover:text-accent"
                  >
                    {visitLabel} ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
