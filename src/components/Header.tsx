import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="glass relative mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2.5 sm:px-4">
        <Link
          href="/"
          aria-label={t("home")}
          className="relative z-10 flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-xs font-semibold tracking-[0.08em] text-foreground"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-[0.62rem] font-semibold tracking-[0.06em] text-white shadow-sm">
            FR
          </span>
          <span className="hidden sm:inline">Filippo R. de Miremont</span>
          <span className="sm:hidden">FRDM</span>
        </Link>

        <nav className="relative z-10 flex items-center gap-0.5 rounded-full bg-white/36 p-1 text-[0.65rem] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:gap-1 sm:text-xs">
          <Link
            href="/portfolio"
            className="rounded-full px-2 py-2 text-muted transition-all hover:bg-white/65 hover:text-foreground sm:px-4"
          >
            {t("portfolio")}
          </Link>
          <Link
            href="/shop"
            className="rounded-full px-2 py-2 text-muted transition-all hover:bg-white/65 hover:text-foreground sm:px-4"
          >
            {t("shop")}
          </Link>
          <Link
            href="/contact"
            className="hidden rounded-full px-4 py-2 text-muted transition-all hover:bg-white/65 hover:text-foreground lg:block"
          >
            {t("contact")}
          </Link>
        </nav>

        <div className="relative z-10">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
