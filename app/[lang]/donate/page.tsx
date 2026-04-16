import { notFound } from "next/navigation";
import { getDictionary, isLocale, profile } from "@/lib/i18n";

export default async function DonatePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
          {dict.donate.eyebrow}
        </p>
        <h1 className="mt-4 font-editorial text-5xl leading-tight text-zinc-950 sm:text-6xl">
          {dict.donate.title}
        </h1>
        <p className="mt-6 text-base leading-8 text-zinc-700">
          {dict.donate.intro}
        </p>
      </div>

      <div className="mt-14 rounded-[2rem] border border-zinc-200 bg-white p-8 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              {dict.donate.whyTitle}
            </p>
            <div className="mt-6 space-y-6 text-base leading-8 text-zinc-700">
              <p>{dict.donate.whyText1}</p>
              <p>{dict.donate.whyText2}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-stone-50 p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              {dict.donate.cardTitle}
            </p>
            <h2 className="mt-4 font-editorial text-4xl leading-tight text-zinc-950">
              PayPal
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-700">
              {dict.donate.cardText}
            </p>

            <div className="mt-8">
              <a
                href={profile.links.paypal}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-zinc-950 px-6 py-3 text-sm text-white transition-opacity hover:opacity-90"
              >
                {dict.modal.paypal}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
