"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import type { ShopCategory, ShopStatus } from "@/types/db";

const CATEGORIES: ShopCategory[] = ["vino", "abbigliamento"];
const STATUSES: ShopStatus[] = ["disponibile", "venduto"];

export function ShopFilters({
  category,
  status,
}: {
  category?: ShopCategory;
  status?: ShopStatus;
}) {
  const t = useTranslations("shop");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: "category" | "status", value?: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  }

  return (
    <div className="flex flex-wrap gap-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
          {t("filterCategory")}
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterPill
            active={!category}
            label={t("all")}
            onClick={() => updateParam("category")}
          />
          {CATEGORIES.map((c) => (
            <FilterPill
              key={c}
              active={category === c}
              label={c === "vino" ? t("categoryVino") : t("categoryAbbigliamento")}
              onClick={() => updateParam("category", c)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
          {t("filterStatus")}
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterPill
            active={!status}
            label={t("all")}
            onClick={() => updateParam("status")}
          />
          {STATUSES.map((s) => (
            <FilterPill
              key={s}
              active={status === s}
              label={s === "disponibile" ? t("statusDisponibile") : t("statusVenduto")}
              onClick={() => updateParam("status", s)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-accent bg-accent text-white"
          : "border-border bg-surface text-muted hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
