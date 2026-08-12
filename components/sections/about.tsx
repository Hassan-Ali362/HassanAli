import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { about, profile, experience } from "@/lib/data";

const current = experience.find((role) => role.current) ?? experience[0];

export function About() {
  return (
    <section id="about" className="border-b border-line py-16 md:py-24">
      {/* items-stretch plus h-full down the chain makes the portrait match the
          height of the text column beside it rather than setting its own
          aspect ratio and leaving a gap. */}
      <div className="wrap grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ---------------------------------------------------------------- */}
        {/*  Portrait                                                        */}
        {/* ---------------------------------------------------------------- */}
        <Reveal className="lg:col-span-5 lg:h-full">
          <figure className="relative flex h-full flex-col overflow-hidden rounded-sq border border-line bg-panel">
            <div className="relative min-h-[420px] flex-1">
              {about.photo ? (
                <Image
                  src={about.photo}
                  alt={`${profile.name}, ${profile.role}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                /* No photo set yet. An initials plate rather than an empty box
                   or a stock face, so the section is presentable until the real
                   image lands. Set `about.photo` in lib/data.ts to replace it. */
                <div className="absolute inset-0" aria-hidden>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-dim via-transparent to-transparent" />
                  <div className="absolute inset-0 rule-grid opacity-70" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="num text-[clamp(3rem,8vw,5rem)] font-medium tracking-tight text-line-3">
                      {profile.initials}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Caption strip: real, checkable facts, not photo-credit dressing. */}
            <figcaption className="flex items-center justify-between gap-4 border-t border-line px-5 py-3">
              <span className="num text-[11px] text-fg-2">{profile.name}</span>
              <span className="num text-[11px] text-muted">{profile.location}</span>
            </figcaption>
          </figure>
        </Reveal>

        {/* ---------------------------------------------------------------- */}
        {/*  Copy                                                            */}
        {/* ---------------------------------------------------------------- */}
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="h-display text-[clamp(1.9rem,4vw,3rem)] text-fg">
              About
            </h2>
          </Reveal>

          <Reveal i={1}>
            <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-fg md:text-[19px]">
              {about.lead}
            </p>
          </Reveal>

          <Reveal i={2}>
            <div className="mt-6 space-y-4">
              {about.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[62ch] text-[14px] leading-[1.75] text-fg-2 md:text-[15px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {/* A short readout so the column ends on data rather than trailing
              prose. */}
          <Reveal i={3}>
            <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-sq border border-line bg-line sm:grid-cols-3">
              <div className="bg-bg px-5 py-4">
                <dt className="label">Role</dt>
                <dd className="mt-2 text-[13px] leading-snug text-fg">
                  {current.role}
                </dd>
              </div>
              <div className="bg-bg px-5 py-4">
                <dt className="label">Focus</dt>
                <dd className="mt-2 text-[13px] leading-snug text-fg">
                  AI and full-stack
                </dd>
              </div>
              <div className="bg-bg px-5 py-4">
                <dt className="label">Based</dt>
                <dd className="num mt-2 text-[13px] leading-snug text-fg">
                  {profile.location}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
