import type { PortfolioItem, PortfolioSection } from "@/types/db";
import type { AppLocale } from "@/i18n/routing";

function pickLocalized(item: PortfolioItem, locale: AppLocale, field: "title" | "description") {
  const key = `${field}_${locale}` as keyof PortfolioItem;
  return (item[key] as string | null) ?? item[`${field}_it` as keyof PortfolioItem];
}

const GROUP_ORDER: PortfolioSection[] = ["esperienza", "formazione", "certificazione"];

export function TrackColumn({
  label,
  accentVar,
  items,
  locale,
  groupLabels,
}: {
  label: string;
  /** CSS custom property con il colore del percorso, es. "var(--track-tech)" */
  accentVar: string;
  items: PortfolioItem[];
  locale: AppLocale;
  groupLabels: Record<PortfolioSection, string>;
}) {
  const groups = GROUP_ORDER.map((section) => ({
    section,
    items: items.filter((item) => item.section === section),
  })).filter((group) => group.items.length > 0);

  return (
    <div
      className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
      style={{ borderTop: `4px solid ${accentVar}` }}
    >
      <span
        className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white"
        style={{ backgroundColor: accentVar }}
      >
        {label}
      </span>

      <div className="mt-6 space-y-8">
        {groups.map((group) => (
          <div key={group.section}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
              {groupLabels[group.section]}
            </h3>
            <ol className="mt-4 space-y-6 border-l border-border pl-5">
              {group.items.map((item) => (
                <li key={item.id} className="relative">
                  <span
                    className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: accentVar }}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <h4 className="font-semibold leading-snug">
                      {pickLocalized(item, locale, "title")}
                    </h4>
                    {item.period && (
                      <span className="text-xs uppercase tracking-wide text-muted">
                        {item.period}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <p className="mt-0.5 text-sm" style={{ color: accentVar }}>
                      {item.subtitle}
                    </p>
                  )}
                  {pickLocalized(item, locale, "description") && (
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {pickLocalized(item, locale, "description")}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
