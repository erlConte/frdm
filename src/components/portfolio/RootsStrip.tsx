import type { PortfolioItem } from "@/types/db";
import type { AppLocale } from "@/i18n/routing";

function title(item: PortfolioItem, locale: AppLocale) {
  const key = `title_${locale}` as keyof PortfolioItem;
  return (item[key] as string | null) ?? item.title_it;
}

function description(item: PortfolioItem, locale: AppLocale) {
  const key = `description_${locale}` as keyof PortfolioItem;
  return (item[key] as string | null) ?? item.description_it;
}

export function RootsStrip({
  items,
  locale,
  labels,
}: {
  items: PortfolioItem[];
  locale: AppLocale;
  labels: { education: string; languages: string; music: string };
}) {
  if (items.length === 0) return null;

  const visibleItems = items.filter((item) => {
    const text = `${item.title_it} ${item.title_en} ${item.title_es}`;
    if (/musica e pianoforte classico|music and classical piano|música y piano clásico/i.test(text)) return false;
    if (/^liceo scientifico$/i.test(item.title_it.trim())) return false;
    return true;
  });

  const groups = [
    {
      key: "education",
      label: labels.education,
      items: visibleItems.filter((item) => !/abrsm|piano|music|musica|música|pet|cambridge|lingue|languages|idiomas/i.test(`${item.title_it} ${item.title_en} ${item.title_es}`)),
    },
    {
      key: "languages",
      label: labels.languages,
      items: visibleItems.filter((item) => /pet|cambridge|lingue|languages|idiomas/i.test(`${item.title_it} ${item.title_en} ${item.title_es}`)),
    },
    {
      key: "music",
      label: labels.music,
      items: visibleItems.filter((item) => /abrsm|piano|music|musica|música/i.test(`${item.title_it} ${item.title_en} ${item.title_es}`)),
    },
  ].filter((group) => group.items.length > 0);

  return (
    <div className="roots-groups mt-8 grid gap-8 lg:grid-cols-3 lg:gap-0">
      {groups.map((group) => (
        <section key={group.key} className="roots-group lg:px-7 first:lg:pl-0 last:lg:pr-0">
          <p className="roots-group-label">{group.label}</p>
          <div className="mt-5 space-y-5">
            {group.items.map((item) => {
              const isLanguages = group.key === "languages";
              return (
                <article key={item.id} className="roots-entry">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold leading-snug">{title(item, locale)}</h3>
                      {item.subtitle && <p className="mt-1 text-xs leading-relaxed text-muted">{item.subtitle}</p>}
                    </div>
                    {item.period && <p className="shrink-0 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-muted/70">{item.period}</p>}
                  </div>
                  {isLanguages && description(item, locale) && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">{description(item, locale)}</p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
