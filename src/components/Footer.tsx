import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-5 pt-8 sm:px-6">
      <div className="glass relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-6 py-7 sm:px-8">
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">FRDM</p>
            <p className="mt-2 font-display text-xl font-semibold">
              Filippo Resseguier de Miremont
            </p>
            <p className="mt-2 text-xs text-muted">
              © {year} — {t("rights")}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted">
            <Link href="/portfolio" className="transition-colors hover:text-foreground">
              {nav("portfolio")}
            </Link>
            <Link href="/shop" className="transition-colors hover:text-foreground">
              {nav("shop")}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground">
              {nav("contact")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
