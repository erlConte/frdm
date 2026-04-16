import Link from "next/link";
import { Dictionary, Locale, profile } from "@/lib/i18n";

export function SiteFooter({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="border-t border-zinc-200/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:px-8 lg:px-12 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="font-editorial text-2xl text-zinc-900">{profile.name}</p>
          <p className="max-w-md text-sm leading-6 text-zinc-600">
            {dict.footer.tagline}
          </p>
        </div>

        <div className="space-y-2 text-sm text-zinc-600 md:text-right">
          <p>
            <a href={profile.emailHref} className="transition-colors hover:text-zinc-950">
              {profile.email}
            </a>
          </p>
          <p>
            <a href={profile.phoneHref} className="transition-colors hover:text-zinc-950">
              {profile.phone}
            </a>
          </p>
          <div className="flex gap-4 md:justify-end">
            <Link href={`/${lang}/about`} className="transition-colors hover:text-zinc-950">
              {dict.nav.about}
            </Link>
            <Link href={`/${lang}/contact`} className="transition-colors hover:text-zinc-950">
              {dict.nav.contact}
            </Link>
            <Link href={`/${lang}/donate`} className="transition-colors hover:text-zinc-950">
              {dict.nav.donate}
            </Link>
          </div>
          <p className="pt-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
            © {new Date().getFullYear()} FRDM
          </p>
        </div>
      </div>
    </footer>
  );
}
