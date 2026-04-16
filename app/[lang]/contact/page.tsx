import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { getDictionary, isLocale, profile } from "@/lib/i18n";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  const links = [
    { label: dict.common.email, value: profile.email, href: profile.emailHref },
    { label: dict.common.phone, value: profile.phone, href: profile.phoneHref },
    { label: dict.common.linkedin, value: dict.common.openProfile, href: profile.links.linkedin },
    { label: dict.common.github, value: dict.common.openProfile, href: profile.links.github },
    { label: dict.common.indeed, value: dict.common.openProfile, href: profile.links.indeed },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
          {dict.contact.eyebrow}
        </p>
        <h1 className="mt-4 font-editorial text-5xl leading-tight text-zinc-950 sm:text-6xl">
          {dict.contact.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-700">
          {dict.contact.intro}
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-[2rem] border border-zinc-200 bg-white p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            {dict.contact.directLinks}
          </p>

          <div className="mt-6 space-y-5">
            {links.map((item) => (
              <div
                key={item.label}
                className="border-t border-zinc-200 pt-5 first:border-t-0 first:pt-0"
              >
                <p className="text-sm text-zinc-500">{item.label}</p>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="mt-1 inline-block text-lg text-zinc-950 transition-colors hover:text-zinc-600"
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-zinc-200 pt-6">
            <a
              href={profile.cvPath}
              className="inline-flex items-center rounded-full bg-zinc-950 px-6 py-3 text-sm text-white transition-opacity hover:opacity-90"
            >
              {dict.common.downloadCv}
            </a>
          </div>
        </aside>

        <section className="rounded-[2rem] border border-zinc-200 bg-white p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            {dict.contact.message}
          </p>
          <h2 className="mt-4 font-editorial text-4xl leading-tight text-zinc-950">
            {dict.contact.messageTitle}
          </h2>

          <div className="mt-8">
            <ContactForm dict={dict} />
          </div>
        </section>
      </div>
    </div>
  );
}
