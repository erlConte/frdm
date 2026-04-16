"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, locales } from "@/lib/i18n";

function buildLocalePath(pathname: string, targetLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  if (locales.includes(segments[0] as Locale)) {
    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  }

  return `/${targetLocale}/${segments.join("/")}`;
}

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-300 bg-white/80 px-2 py-2">
      {locales.map((locale) => {
        const active = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={buildLocalePath(pathname, locale)}
            className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.2em] transition ${
              active
                ? "bg-zinc-950 text-white"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
