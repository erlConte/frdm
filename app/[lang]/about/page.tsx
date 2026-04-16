import { notFound } from "next/navigation";
import { getDictionary, isLocale, profile } from "@/lib/i18n";

export default async function AboutPage({
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
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
          {dict.about.eyebrow}
        </p>
        <h1 className="mt-4 font-editorial text-5xl leading-tight text-zinc-950 sm:text-6xl">
          {dict.about.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-700">
          {dict.about.intro}
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-[2rem] border border-zinc-200 bg-white p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">FRDM</p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm text-zinc-500">Name</p>
              <p className="mt-1 text-lg text-zinc-950">{profile.name}</p>
            </div>

            <div className="border-t border-zinc-200 pt-5">
              <p className="text-sm text-zinc-500">Base</p>
              <p className="mt-1 text-lg text-zinc-950">{profile.location}</p>
            </div>

            <div className="border-t border-zinc-200 pt-5">
              <p className="text-sm text-zinc-500">Approach</p>
              <p className="mt-1 text-lg text-zinc-950">
                Ambition, structure, seriousness
              </p>
            </div>
          </div>
        </aside>

        <div className="grid gap-6">
          {dict.about.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[2rem] border border-zinc-200 bg-white p-8"
            >
              <h2 className="font-editorial text-3xl text-zinc-950">{section.title}</h2>
              <p className="mt-4 text-base leading-8 text-zinc-700">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
