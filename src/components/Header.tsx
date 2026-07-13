import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="text-xs font-semibold tracking-tight text-foreground sm:text-sm"
        >
          Filippo R. de Miremont
        </Link>

        <nav className="flex items-center gap-4 text-xs sm:gap-6 sm:text-sm">
          <Link
            href="/portfolio"
            className="text-muted transition-colors hover:text-foreground"
          >
            {t("portfolio")}
          </Link>
          <Link
            href="/shop"
            className="text-muted transition-colors hover:text-foreground"
          >
            {t("shop")}
          </Link>
          <Link
            href="/contact"
            className="text-muted transition-colors hover:text-foreground"
          >
            {t("contact")}
          </Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
