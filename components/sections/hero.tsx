import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { HeroBackdrop } from "@/components/ui/hero-backdrop";
import { ShellRun } from "@/components/ui/shell-run";
import { profile } from "@/lib/data";

/**
 * Asymmetric split, left-weighted. Four elements on the left and nothing else:
 * status, headline, one line of subtext, two actions. The right column is the
 * page's only identity plate, and it carries facts rather than decoration.
 *
 * Sized to the first screen. min-h rather than a fixed height, so a short
 * viewport grows the section instead of clipping the actions out of reach, and
 * the 4rem subtraction is the sticky nav, which puts the fold exactly at the
 * section's bottom rule.
 *
 * Depth comes from <HeroBackdrop />, which owns the plane, and from the blooms
 * in <Ambient /> at the layout level. Nothing glows on the type itself.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      {/* The light source lives in <Ambient /> at the layout level, so it lights
          every section rather than just this one. The plane belongs to the hero. */}
      <HeroBackdrop />

      <div className="wrap relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-14 md:py-20">
        {/* items-start, not items-center. Centering left the plate a dozen
            pixels below the status chip, which reads as a near-miss rather than
            a decision. Aligned tops make the two columns one block. */}
        <div className="grid grid-cols-1 items-start gap-x-14 gap-y-12 lg:grid-cols-12">
          {/* ---------------------------------------------------------------- */}
          {/*  Message                                                         */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-7">
            {/* The one status indicator on the site. The dot is here because
                availability is real state that changes, not as decoration. */}
            {profile.availability && (
              <Reveal>
                <p className="inline-flex items-center gap-2.5 rounded-sq border border-accent-line bg-accent-dim px-3 py-1.5">
                  <span className="signal size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span className="num text-[10.5px] uppercase tracking-[0.14em] text-accent">
                    {profile.availability}
                  </span>
                </p>
              </Reveal>
            )}

            {/* Two lines from md up, with no hard break to maintain. The cap is
                sized to the column rather than the viewport: this headline lives
                in a 7 of 12 track, roughly 0.52vw wide, and two lines of it need
                about 10.5em of measure. 4.8vw is what keeps that true from the
                lg breakpoint through the 1280px cap. text-balance then evens the
                two lines instead of leaving a short widow on the second. */}
            <Reveal i={1}>
              <h1 className="h-display mt-6 text-balance text-[clamp(2.25rem,4.8vw,3.875rem)] text-fg">
                I build the product and <span className="text-accent">the AI inside it.</span>
              </h1>
            </Reveal>

            <Reveal i={2}>
              <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-fg-2 md:text-[17px]">
                {profile.tagline}
              </p>
            </Reveal>

            <Reveal i={3}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="#work">
                  Selected work
                  <ArrowDown size={15} weight="bold" />
                </Button>
                <Button href={profile.resumeUrl} variant="ghost">
                  Resume
                  <ArrowUpRight size={15} weight="bold" />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/*  Identity plate                                                  */}
          {/* ---------------------------------------------------------------- */}
          <Reveal i={2} className="lg:col-span-5 lg:w-full lg:max-w-[400px] lg:justify-self-end">
            <div className="panel overflow-hidden !border-accent-line" style={{ borderWidth: "1.5px" }}>
              <div className="flex items-center gap-3 border-b border-line bg-raise px-5 py-4">
                <span className="num grid size-9 shrink-0 place-items-center rounded-sq border border-line-2 bg-bg text-[12px] font-medium text-fg">
                  {profile.initials}
                </span>
                {/* Name only. The role used to sit under it and repeated what
                    the Works on row below already says. */}
                <span className="min-w-0 truncate text-[13px] font-medium text-fg">
                  {profile.name}
                </span>
              </div>

              <dl className="divide-y divide-line">
                {/* Disciplines, not a job title. A title dates, and the
                    Experience section carries the roles in full anyway. */}
                <div className="flex items-baseline justify-between gap-4 px-5 py-4">
                  <dt className="label shrink-0">Works on</dt>
                  {/* text-balance so a longer value splits into two even lines
                      instead of dropping a single word onto the second. */}
                  <dd className="max-w-[66%] text-balance text-right text-[13px] leading-snug text-fg">
                    {profile.focus}
                  </dd>
                </div>

                <div className="flex items-baseline justify-between gap-4 px-5 py-4">
                  <dt className="label shrink-0">Based</dt>
                  <dd className="num text-[13px] text-fg-2">{profile.location}</dd>
                </div>

              </dl>

              <div className="border-t border-line px-5 py-4">
                <ShellRun />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
