"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted">Admin</p>
        <h1 className="text-xl font-semibold tracking-tight">Pannello di gestione</h1>
      </div>
      <nav className="flex flex-wrap items-center gap-4 text-sm">
        <Link href="/admin" className="text-muted hover:text-foreground">
          Dashboard
        </Link>
        <Link href="/admin/portfolio" className="text-muted hover:text-foreground">
          Portfolio
        </Link>
        <Link href="/admin/shop" className="text-muted hover:text-foreground">
          Shop
        </Link>
        <Link href="/admin/messages" className="text-muted hover:text-foreground">
          Messaggi
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-border px-3 py-1.5 text-muted hover:text-foreground cursor-pointer"
        >
          Esci
        </button>
      </nav>
    </header>
  );
}
