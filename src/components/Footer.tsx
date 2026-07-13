import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} Filippo Resseguier de Miremont — {t("rights")}
        </p>
        <p>{t("madeWith")}</p>
      </div>
    </footer>
  );
}
