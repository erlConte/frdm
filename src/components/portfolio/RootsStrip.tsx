import type { PortfolioItem } from "@/types/db";
import type { AppLocale } from "@/i18n/routing";

function title(item: PortfolioItem, locale: AppLocale) {
  const key = `title_${locale}` as keyof PortfolioItem;
  return (item[key] as string | null) ?? item.title_it;
}

export function RootsStrip({ items, locale }: { items: PortfolioItem[]; locale: AppLocale }) {
  if (items.length === 0) return null;

  return (
    <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-white/70 bg-white/38 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl"
        >
          <h3 className="text-sm font-semibold leading-snug">{title(item, locale)}</h3>
          {item.subtitle && <p className="mt-1 text-xs text-muted">{item.subtitle}</p>}
          {item.period && <p className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.13em] text-muted/75">{item.period}</p>}
        </article>
      ))}
    </div>
  );
}
