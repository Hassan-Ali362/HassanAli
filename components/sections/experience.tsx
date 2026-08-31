import Image from "next/image";
import { MapPin, CalendarBlank, Buildings } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/lib/data";

const cardBg = [
  "bg-panel",
  "bg-raise",
  "bg-raise",
] as const;

const cardBorder = [
  "border-accent-line",
  "border-domain-backend/40",
  "border-domain-ai/40",
] as const;

export function Experience() {
  return (
    <section id="experience" className="border-b border-line py-16 md:py-24">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="h-display text-[clamp(1.9rem,4vw,3rem)] text-fg">
                Where I have worked
              </h2>
              <p className="mt-3 max-w-[48ch] text-[14px] leading-relaxed text-fg-2">
                Three roles across product companies and a research-driven AI firm, each one
                adding a different layer to the stack.
              </p>
            </div>
            <p className="num text-[11px] text-muted">
              {String(experience.length).padStart(2, "0")} roles
            </p>
          </div>
        </Reveal>

        {/* Outer wrapper: relative so the vertical line can be absolutely positioned */}
        <ol className="relative mt-12">
          {/* The continuous vertical line running through all cards */}
          <span
            className="absolute left-[11px] top-3 hidden w-px bg-line md:block"
            style={{ bottom: "1.5rem" }}
            aria-hidden
          />

          {experience.map((role, i) => (
            <Reveal key={role.company} i={i} as="li">
              <div className={`relative flex gap-6 md:gap-8 ${i < experience.length - 1 ? "pb-6 md:pb-8" : ""}`}>

                {/* ── Dot marker on the line ───────────────────────── */}
                <div className="hidden shrink-0 flex-col items-center md:flex">
                  <span
                    className={
                      role.current
                        ? "signal relative z-10 mt-3 size-2.5 shrink-0 rounded-full bg-accent"
                        : "relative z-10 mt-3 size-2.5 shrink-0 rounded-full border border-line-3 bg-bg"
                    }
                    aria-hidden
                  />
                </div>

                {/* ── Card ────────────────────────────────────────── */}
                <div className="flex-1">
                  <div
                    className={`relative overflow-hidden rounded-sq border p-6 md:p-7 ${cardBg[i % cardBg.length]} ${cardBorder[i % cardBorder.length]}`}
                  >
                    {/* Accent bar on all cards */}
                    <span className="absolute inset-y-0 left-0 w-[3px] rounded-l-sq bg-accent" aria-hidden />

                    {/* Company row */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {role.logo && (
                          <Image
                            src={role.logo}
                            alt={`${role.company} logo`}
                            width={96}
                            height={36}
                            className={`h-7 w-auto object-contain ${role.logoBg ? `rounded-sq px-1.5 py-0.5 ${role.logoBg}` : ""}`}
                          />
                        )}
                        {!role.logo && <Buildings size={13} weight="bold" className="shrink-0 text-accent" aria-hidden />}
                        <span className="num text-[11px] uppercase tracking-[0.14em] text-accent">
                          {role.company}
                        </span>
                      </div>
                    </div>

                    {/* Role title */}
                    <h3 className="mt-2 text-[20px] font-semibold tracking-tight text-fg">
                      {role.role}
                    </h3>

                    {/* Period + location */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="num inline-flex items-center gap-1.5 text-[12px] text-fg-2">
                        <CalendarBlank size={12} weight="bold" className="shrink-0 text-muted" aria-hidden />
                        {role.period}
                      </span>
                      {role.location && (
                        <span className="num inline-flex items-center gap-1.5 text-[12px] text-muted">
                          <MapPin size={12} weight="bold" className="shrink-0" aria-hidden />
                          {role.location}
                        </span>
                      )}
                    </div>

                    {/* Achievements */}
                    <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                      {role.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="flex gap-3 text-[14px] leading-relaxed text-fg-2"
                        >
                          <span
                            className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-accent/50"
                            aria-hidden
                          />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
