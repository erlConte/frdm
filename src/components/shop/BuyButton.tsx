"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function BuyButton({ listingId }: { listingId: string }) {
  const t = useTranslations("shopDetail");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleBuy() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      });

      if (!res.ok) throw new Error("checkout failed");

      const { url } = await res.json();
      if (!url) throw new Error("missing checkout url");

      window.location.href = url;
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleBuy}
        disabled={loading}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {loading ? t("redirecting") : t("buyNow")}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{t("checkoutError")}</p>}
    </div>
  );
}
