import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getShopListings } from "@/lib/data/shop";
import { getPortfolioItems } from "@/lib/data/portfolio";
import type { AppLocale } from "@/i18n/routing";
import type { PortfolioItem } from "@/types/db";
import { HeroTitle } from "@/components/home/HeroTitle";
import { LiquidHero } from "@/components/home/LiquidHero";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return { title: t("title"), description: t("description") };
}

function pickLocalized(
  item: PortfolioItem,
  locale: AppLocale,
  field: "title" | "description"
) {
  const key = `${field}_${locale}` as keyof PortfolioItem;
  return (item[key] as string | null) ?? (item[`${field}_it` as keyof PortfolioItem] as string);
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 transition-transform duration-300 ${
        diagonal ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : "group-hover:translate-x-1"
      }`}
    >
      <path
        d={diagonal ? "M5 15 15 5M7 5h8v8" : "M4 10h12m-4-4 4 4-4 4"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as AppLocale;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const [portfolioItems, listings] = await Promise.all([
    getPortfolioItems(),
    getShopListings({ status: "disponibile" }),
  ]);
  const projects = portfolioItems.filter((item) => item.section === "progetto").slice(0, 3);

  return (
    <>
      <LiquidHero>
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-8 px-6 pb-16 pt-10 md:grid-cols-[1.08fr_0.92fr] md:px-10 md:pb-20 md:pt-6 lg:px-14">
          <div className="relative z-10 max-w-3xl pt-4 md:pt-0">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/48 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted shadow-sm backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(49,87,246,0.12)]" />
              {t("kicker")}
            </div>

            <h1 className="mt-7 text-balance text-[clamp(3.3rem,7.5vw,7.7rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-foreground">
              <HeroTitle text={t("heroTitleLine1")} />
              <br />
              <span className="italic text-accent">
                <HeroTitle text={t("heroTitleLine2")} baseDelay={0.28} />
              </span>
            </h1>

            <p
              className="mt-7 max-w-xl text-balance text-base leading-relaxed text-ink-soft animate-fade-up sm:text-lg"
              style={{ animationDelay: "0.65s" }}
            >
              {t("heroBio")}
            </p>

            <div
              className="mt-8 flex flex-wrap gap-3 animate-fade-up"
              style={{ animationDelay: "0.78s" }}
            >
              <Link href="/portfolio" className="glass-button glass-button-primary group">
                {t("ctaPortfolio")}
                <Arrow />
              </Link>
              <Link href="/contact" className="glass-button group">
                {t("ctaContact")}
                <Arrow />
              </Link>
            </div>

            <div
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted animate-fade-up"
              style={{ animationDelay: "0.9s" }}
            >
              <span>Hospitality</span>
              <span className="h-px w-5 bg-muted/30" />
              <span>Technology</span>
              <span className="h-px w-5 bg-muted/30" />
              <span>Entrepreneurship</span>
            </div>
          </div>

          <div className="hero-duality relative z-0 flex min-h-[24rem] items-center justify-center md:min-h-[36rem]" aria-hidden="true">
            <div className="hero-tech-world">
              <div className="hero-tech-glass">
                <svg viewBox="0 0 240 240" fill="none">
                  <circle cx="120" cy="120" r="78" />
                  <path d="M42 98h42l18-27h45l18 27h34" />
                  <path d="M55 148h38l18 25h54l16-25h18" />
                  <path d="M120 42v40m0 76v40M42 120h40m76 0h40" />
                  <circle cx="102" cy="71" r="5" />
                  <circle cx="165" cy="98" r="5" />
                  <circle cx="111" cy="173" r="5" />
                </svg>
              </div>
            </div>

            <div className="hero-hospitality-world">
              <svg viewBox="0 0 320 360" fill="none">
                <path className="hero-map-contour" d="M54 92c34-48 105-65 163-41 61 25 86 87 65 143-24 64-91 117-159 101C57 279 22 218 35 161c5-24 8-48 19-69Z" />
                <path className="hero-map-contour contour-2" d="M78 108c27-32 82-44 125-28 46 17 68 62 52 105-18 48-69 88-120 76-49-12-76-57-67-100 4-18 3-37 10-53Z" />
                <path className="hero-map-route" d="M77 244c35-9 41-46 71-60 26-12 61 5 73-23 9-20-8-39 5-55" />
                <path className="hero-map-x" d="m218 91 18 18m0-18-18 18" />
                <circle className="hero-map-stop" cx="77" cy="244" r="5" />
                <circle className="hero-map-stop" cx="148" cy="184" r="5" />
                <circle className="hero-map-stop" cx="221" cy="161" r="5" />
              </svg>
            </div>

            <div className="hero-fusion-core" />
          </div>
        </div>

        <a
          href="#identity"
          className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted md:flex"
        >
          {t("scrollLabel")}
          <span className="h-8 w-px bg-gradient-to-b from-muted/60 to-transparent" />
        </a>
      </LiquidHero>

      <section id="identity" className="px-6 py-24 sm:py-32">
        <ScrollReveal className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {t("identityKicker")}
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {t("identityTitle")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg">
            {t("identityText")}
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 sm:pb-36">
        <div className="grid gap-5 lg:grid-cols-2">
          <ScrollReveal>
            <article className="world-card world-card-tech glass group h-full p-7 sm:p-10">
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-end gap-4">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
                    Tech & Digital
                  </span>
                </div>
                <div className="mt-auto pt-24">
                  <h3 className="text-balance font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                    {t("techTitle")}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                    {t("techText")}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-accent">
                    <span className="rounded-full bg-white/52 px-3 py-2">Engineering</span>
                    <span className="rounded-full bg-white/52 px-3 py-2">AI</span>
                    <span className="rounded-full bg-white/52 px-3 py-2">Digital products</span>
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>

          <ScrollReveal className="reveal-delay-1">
            <article className="world-card world-card-hospitality group h-full p-7 sm:p-10">
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-end gap-4">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-track-hosp">
                    Hospitality & Wine
                  </span>
                </div>
                <div className="mt-auto pt-24">
                  <h3 className="text-balance font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                    {t("hospitalityTitle")}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                    {t("hospitalityText")}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-track-hosp">
                    <span className="rounded-full bg-white/52 px-3 py-2">Luxury hospitality</span>
                    <span className="rounded-full bg-white/52 px-3 py-2">Wine</span>
                    <span className="rounded-full bg-white/52 px-3 py-2">Mixology</span>
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-5 reveal-delay-1">
          <div className="glass relative overflow-hidden rounded-[2.25rem] px-7 py-8 sm:px-10 sm:py-10">
            <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
            <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                  {t("bridgeTitle")}
                </h3>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                {t("bridgeText")}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="relative overflow-hidden bg-[#101b24] px-4 py-28 text-white sm:px-6 sm:py-36">
        <div className="pointer-events-none absolute left-[-12rem] top-[-14rem] h-[34rem] w-[34rem] rounded-full bg-accent/25 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-[-15rem] right-[-10rem] h-[32rem] w-[32rem] rounded-full bg-amber/25 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
                  {t("projectsKicker")}
                </p>
                <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl">
                  {t("projectsTitle")}
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/72 transition-colors hover:text-white"
              >
                {t("viewAllProjects")}
                <Arrow />
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} className={`reveal-delay-${Math.min(index, 2)}`}>
                <article className={`project-glass glass project-tone-${index} group h-full p-7 text-foreground sm:p-8`}>
                  <div className="project-orb" aria-hidden="true" />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
                        0{index + 1} / Project
                      </span>
                      {project.period && (
                        <span className="rounded-full bg-white/42 px-3 py-1.5 text-[0.62rem] font-semibold text-muted">
                          {project.period}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-28">
                      <h3 className="font-display text-4xl font-semibold tracking-[-0.045em]">
                        {pickLocalized(project, locale, "title")}
                      </h3>
                      {project.subtitle && (
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                          {project.subtitle}
                        </p>
                      )}
                      <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted">
                        {pickLocalized(project, locale, "description")}
                      </p>
                      {project.external_url && (
                        <a
                          href={project.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                        >
                          {t("visitProject")}
                          <Arrow diagonal />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <ScrollReveal>
            <div className="px-3 py-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {t("nowKicker")}
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl">
                {t("nowTitle")}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                {t("nowText")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["nowRoleLabel", "nowRole", "01"],
              ["nowStudyLabel", "nowStudy", "02"],
              ["nowBuildLabel", "nowBuild", "03"],
              ["nowExploreLabel", "nowExplore", "04"],
            ].map(([label, value, number], index) => (
              <ScrollReveal key={label} className={`reveal-delay-${Math.min(index, 3)}`}>
                <div className="glass relative h-full min-h-52 rounded-[1.75rem] p-6 sm:p-7">
                  <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                    <span className="text-xs font-semibold text-muted/70">{number}</span>
                    <div>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
                        {t(label)}
                      </p>
                      <p className="mt-2 text-balance text-lg font-semibold leading-snug text-foreground">
                        {t(value)}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-6 sm:px-6">
        <ScrollReveal className="mx-auto max-w-7xl">
          <div className="glass relative overflow-hidden rounded-[2.5rem] px-7 py-12 sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-amber/70 via-track-hosp/25 to-transparent blur-2xl" />
            <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-track-hosp">
                  {t("shopKicker")}
                </p>
                <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl">
                  {t("shopTitle")}
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {listings.length > 0 ? t("shopTextActive") : t("shopTextEmpty")}
                </p>
              </div>
              <Link href="/shop" className="glass-button group shrink-0">
                {t("ctaShop")}
                <Arrow />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-4 py-24 sm:px-6 sm:py-32">
        <ScrollReveal className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {t("contactKicker")}
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            {t("contactTitle")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-muted">
            {t("contactText")}
          </p>
          <Link href="/contact" className="glass-button glass-button-primary group mt-8">
            {t("contactButton")}
            <Arrow />
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
