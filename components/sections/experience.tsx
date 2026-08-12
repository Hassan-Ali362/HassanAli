import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/lib/data";

/**
 * A rail with a marker per role, then the role as a panel. The rail gives the
 * section a spine so three entries read as a sequence rather than three
 * unrelated blocks, which is what a plain divided list looked like.
 */
export function Experience() {
  return (
    <section id="experience" className="border-b border-line py-16 md:py-24">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display text-[clamp(1.9rem,4vw,3rem)] text-fg">
              Where I have worked
            </h2>
            <p className="num text-[11px] text-muted">
              {String(experience.length).padStart(2, "0")} roles
            </p>
          </div>
        </Reveal>

        <ol className="mt-12">
          {experience.map((role, i) => {
            const last = i === experience.length - 1;
            return (
              <Reveal key={role.company} i={i} as="li">
                <div className="relative grid grid-cols-1 gap-x-8 md:grid-cols-[9rem_auto_1fr] md:gap-x-6">
                  {/* When and where */}
                  <div className="pb-3 md:pb-10 md:pt-1 md:text-right">
                    <p className="num text-[12px] text-fg-2">{role.period}</p>
                    {role.location && (
                      <p className="num mt-1.5 text-[11px] text-muted">
                        {role.location}
                      </p>
                    )}
                  </div>

                  {/* The rail. Marker is filled and pulsing only for the role
                      held now, which is real state rather than decoration. */}
                  <div className="hidden md:flex md:flex-col md:items-center">
                    <span
                      className={
                        role.current
                          ? "signal mt-1.5 size-2.5 shrink-0 rounded-full bg-accent"
                          : "mt-1.5 size-2.5 shrink-0 rounded-full border border-line-3 bg-bg"
                      }
                      aria-hidden
                    />
                    {!last && <span className="w-px flex-1 bg-line" aria-hidden />}
                  </div>

                  {/* The role */}
                  <div className={last ? "pb-0" : "pb-10"}>
                    <div className="rounded-sq border border-line bg-panel p-5 md:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                        <div>
                          <h3 className="text-[19px] font-medium tracking-tight text-fg">
                            {role.role}
                          </h3>
                          <p className="num mt-1.5 text-[11px] uppercase tracking-[0.14em] text-accent">
                            {role.company}
                          </p>
                        </div>
                        {role.current && (
                          <span className="num rounded-sq border border-accent-line bg-accent-dim px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-accent">
                            Current
                          </span>
                        )}
                      </div>

                      <ul className="mt-5 space-y-3 border-t border-line pt-5">
                        {role.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="relative pl-5 text-[14px] leading-relaxed text-fg-2"
                          >
                            <span
                              className="absolute left-0 top-[0.55em] size-1.5 rounded-full border border-line-3"
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
            );
          })}
        </ol>
      </div>
    </section>
  );
}
