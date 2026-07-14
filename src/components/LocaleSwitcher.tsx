"use client";

import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const LABELS: Record<string, string> = {
  it: "IT",
  en: "EN",
  es: "ES",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/65 bg-white/38 p-1 text-[0.65rem] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:gap-1 sm:text-xs">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale ? "page" : undefined}
          aria-label={LABELS[loc]}
          className={`cursor-pointer rounded-full px-2 py-1.5 transition-all sm:px-2.5 ${
            loc === locale
              ? "bg-foreground text-white shadow-sm"
              : "text-muted hover:bg-white/60 hover:text-foreground"
          }`}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
