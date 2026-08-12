import { Reveal } from "@/components/ui/reveal";
import { brandGlyph, brandLabel, domainText, domainWash } from "@/components/tech-icons";
import { stack } from "@/lib/data";

/**
 * Grouped, not scored. A self-assigned "92% at Kubernetes" carries no
 * information, and the filled bar that renders it is the clearest junior signal
 * on a developer portfolio.
 *
 * Density comes from giving each technology its own tile with a legible mark,
 * rather than listing names in a row of small text.
 */
export function Stack() {
  return (
    <section id="stack" className="border-b border-line py-16 md:py-24">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display text-[clamp(1.9rem,4vw,3rem)] text-fg">
              What I work in
            </h2>
            <p className="num text-[11px] text-muted">
              {stack.reduce((n, g) => n + g.items.length, 0)} tools
              <span className="mx-2 text-faint">/</span>
              {stack.length} areas
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {stack.map((group, i) => {
            const tint = domainText[group.domain];
            return (
            <Reveal key={group.title} i={i} className="h-full">
              <div className="relative flex h-full flex-col overflow-hidden rounded-sq border border-line bg-panel p-6 md:p-7">
                {/* Tints the field from the top-left so the four panels are not
                    four flat boxes. */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent ${domainWash[group.domain]}`}
                  aria-hidden
                />

                <div className="relative flex items-baseline gap-3">
                  <span className={`num text-[11px] ${tint}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[19px] font-medium tracking-tight text-fg">
                    {group.title}
                  </h3>
                </div>

                <p className="relative mt-3 max-w-[46ch] text-[13px] leading-relaxed text-fg-2">
                  {group.blurb}
                </p>

                {/* Tile grid. Marks are large enough to be recognised at a
                    glance, which is the whole job of a stack section. */}
                <div className="relative mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {group.items.map((slug) => {
                    const Glyph = brandGlyph[slug];
                    const label = brandLabel[slug];
                    if (!label) return null;
                    return (
                      <div
                        key={slug}
                        className="flex items-center gap-2.5 rounded-sq border border-line bg-bg px-3 py-2.5"
                      >
                        {Glyph ? (
                          <Glyph className={`size-[18px] shrink-0 ${tint}`} aria-hidden />
                        ) : (
                          <span
                            className="size-[18px] shrink-0 rounded-sq border border-line-2"
                            aria-hidden
                          />
                        )}
                        <span className={`num truncate text-[11.5px] ${tint}`}>
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
