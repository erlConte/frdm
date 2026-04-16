import Link from "next/link";
import { ArrowRight, Download, MoveUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { DonateModal } from "@/components/donate-modal";
import { getDictionary, isLocale, profile } from "@/lib/i18n";

export default async function HomePage({
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
    <div>
      <section className="border-b border-zinc-200/80">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 sm:px-8 lg:grid-cols-[1.4fr_0.8fr] lg:px-12 lg:py-28">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-500">
              {dict.home.eyebrow}
            </p>

            <h1 className="max-w-4xl font-editorial text-6xl leading-[0.95] text-zinc-950 sm:text-7xl lg:text-8xl">
              {profile.name}
            </h1>

            <p className="mt-8 max-w-2xl font-editorial text-2xl leading-tight text-zinc-700 sm:text-3xl">
              {dict.home.headline}
            </p>

            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-700">
              {dict.home.intro}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm text-white transition-opacity hover:opacity-90"
              >
                {dict.common.contact}
                <ArrowRight size={16} />
              </Link>

              <a
                href={profile.cvPath}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm text-zinc-800 transition-all hover:border-zinc-950"
              >
                {dict.common.downloadCv}
                <Download size={16} />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10 rounded-[2rem] border border-zinc-200 bg-white/60 p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                {dict.home.heroAsideTitle}
              </p>
              <p className="mt-4 font-editorial text-3xl leading-tight text-zinc-950">
                {dict.home.heroAsideText}
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-t border-zinc-200 pt-6">
                <p className="text-sm text-zinc-500">{dict.common.basedIn}</p>
                <p className="mt-1 text-lg text-zinc-900">{profile.location}</p>
              </div>
              <div className="border-t border-zinc-200 pt-6">
                <p className="text-sm text-zinc-500">{dict.common.reachOut}</p>
                <a
                  href={profile.emailHref}
                  className="mt-1 block text-lg text-zinc-900 transition-colors hover:text-zinc-600"
                >
                  {profile.email}
                </a>
              </div>
              <div className="border-t border-zinc-200 pt-6">
                <DonateModal dict={dict} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200/80">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-18 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              {dict.home.whoEyebrow}
            </p>
            <h2 className="mt-4 max-w-md font-editorial text-4xl leading-tight text-zinc-950 sm:text-5xl">
              {dict.home.whoTitle}
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5 text-base leading-8 text-zinc-700">
              <p>{dict.home.whoText}</p>
              <Link
                href={`/${lang}/about`}
                className="inline-flex items-center gap-2 text-sm text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-950"
              >
                {dict.home.readMore}
                <MoveUpRight size={16} />
              </Link>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-white p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">FRDM</p>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm text-zinc-500">Approach</p>
                  <p className="mt-1 text-lg text-zinc-950">
                    Ambition, structure, seriousness
                  </p>
                </div>
                <div className="border-t border-zinc-200 pt-5">
                  <p className="text-sm text-zinc-500">Balance</p>
                  <p className="mt-1 text-lg text-zinc-950">
                    Editorial clarity with room for personality
                  </p>
                </div>
                <div className="border-t border-zinc-200 pt-5">
                  <p className="text-sm text-zinc-500">Direction</p>
                  <p className="mt-1 text-lg text-zinc-950">
                    Building something coherent over time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200/80">
        <div className="mx-auto max-w-7xl px-6 py-18 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              {dict.home.pathEyebrow}
            </p>
            <h2 className="mt-4 font-editorial text-4xl leading-tight text-zinc-950 sm:text-5xl">
              {dict.home.pathTitle}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {dict.home.path.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-zinc-200 bg-white p-8"
              >
                <h3 className="font-editorial text-3xl text-zinc-950">{item.title}</h3>
                <p className="mt-5 text-sm leading-7 text-zinc-700">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200/80">
        <div className="mx-auto max-w-7xl px-6 py-18 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              {dict.home.snapshotEyebrow}
            </p>
            <h2 className="mt-4 font-editorial text-4xl leading-tight text-zinc-950 sm:text-5xl">
              {dict.home.snapshotTitle}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {dict.home.snapshot.map((card) => (
              <article
                key={card.title}
                className="rounded-[2rem] border border-zinc-200 bg-white p-8"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {card.eyebrow}
                </p>
                <h3 className="mt-4 font-editorial text-3xl leading-tight text-zinc-950">
                  {card.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-zinc-700">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              {dict.home.contactEyebrow}
            </p>
            <h2 className="mt-3 font-editorial text-4xl text-zinc-950 sm:text-5xl">
              {dict.home.contactTitle}
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={profile.emailHref}
              className="rounded-full border border-zinc-300 px-5 py-3 text-sm text-zinc-800 transition-all hover:border-zinc-950"
            >
              {dict.common.email}
            </a>
            <a
              href={profile.phoneHref}
              className="rounded-full border border-zinc-300 px-5 py-3 text-sm text-zinc-800 transition-all hover:border-zinc-950"
            >
              {dict.common.phone}
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-300 px-5 py-3 text-sm text-zinc-800 transition-all hover:border-zinc-950"
            >
              {dict.common.linkedin}
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-300 px-5 py-3 text-sm text-zinc-800 transition-all hover:border-zinc-950"
            >
              {dict.common.github}
            </a>
            <a
              href={profile.links.indeed}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-300 px-5 py-3 text-sm text-zinc-800 transition-all hover:border-zinc-950"
            >
              {dict.common.indeed}
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {dict.home.supportEyebrow}
                </p>
                <h2 className="mt-4 font-editorial text-4xl leading-tight text-zinc-950 sm:text-5xl">
                  {dict.home.supportTitle}
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-700">
                  {dict.donate.intro}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                <DonateModal dict={dict} />
                <Link
                  href={`/${lang}/donate`}
                  className="inline-flex items-center rounded-full bg-zinc-950 px-6 py-3 text-sm text-white transition-opacity hover:opacity-90"
                >
                  {dict.common.goToDonate}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
