import Link from "next/link";
import { Dictionary, Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

export function SiteHeader({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const navItems = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
    { href: `/${lang}/donate`, label: dict.nav.donate },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 sm:px-8 lg:px-12">
        <Link
          href={`/${lang}`}
          className="text-sm uppercase tracking-[0.35em] text-zinc-950 transition-opacity hover:opacity-70"
        >
          FRDM
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <LanguageSwitcher currentLocale={lang} />
        </div>
      </div>
    </header>
  );
}
