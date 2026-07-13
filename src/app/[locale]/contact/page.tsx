import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@example.com";

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-2 text-muted">{t("intro")}</p>

      <p className="mt-6 text-sm">
        <span className="text-muted">{t("emailLabel")}: </span>
        <a href={`mailto:${contactEmail}`} className="font-medium text-accent hover:underline">
          {contactEmail}
        </a>
      </p>

      <ContactForm />
    </div>
  );
}
