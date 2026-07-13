import type { Metadata } from "next";
import { fontClasses } from "@/lib/fonts";
import "../globals.css";
import { AdminNav } from "./AdminNav";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | Filippo Resseguier de Miremont",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={fontClasses}>
      <body className="min-h-screen antialiased">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
          <AdminNav />
          <main className="mt-8 flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
