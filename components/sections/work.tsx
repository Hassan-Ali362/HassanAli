"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { BrandChip } from "@/components/ui/brand-chip";
import { CodeCompare } from "@/components/ui/code-compare";
import { ProjectCover } from "@/components/ui/project-cover";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/data";

/**
 * One project at a time, full width. The strip along the top is the selector:
 * one segment per project, the open one filled in accent.
 *
 * Built as a real tablist rather than a set of divs, so arrow keys move between
 * projects and a screen reader announces which of the seven is open. No
 * autoplay: a portfolio that moves on its own reads a project away from someone
 * mid-sentence.
 */
export function Work() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  const project = projects[active];

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const delta =
      e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : e.key === "Home" ? -Infinity : e.key === "End" ? Infinity : 0;
    if (!delta) return;
    e.preventDefault();
    setActive((current) => {
      const next =
        delta === -Infinity
          ? 0
          : delta === Infinity
            ? projects.length - 1
            : (current + delta + projects.length) % projects.length;
      tabRefs.current[next]?.focus();
      return next;
    });
  }, []);

  return (
    <section id="work" className="border-b border-line py-16 md:py-24">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display text-[clamp(1.9rem,4vw,3rem)] text-fg">
              Selected work
            </h2>
            <p className="num text-[11px] text-muted">
              {String(active + 1).padStart(2, "0")}
              <span className="mx-1.5 text-faint">/</span>
              {String(projects.length).padStart(2, "0")}
            </p>
          </div>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-fg-2">
            Each one is here for the part that was hard, not the part that demos
            well.
          </p>
        </Reveal>

        {/* ---------------------------------------------------------------- */}
        {/*  Selector. Equal segments across the full measure; the bar is the */}
        {/*  hit target, the number and name label it.                        */}
        {/* ---------------------------------------------------------------- */}
        <Reveal i={1}>
          <div
            role="tablist"
            aria-label="Projects"
            onKeyDown={onKeyDown}
            className="mt-12 flex gap-2 overflow-x-auto pb-1"
          >
            {projects.map((p, i) => {
              const open = i === active;
              return (
                <button
                  key={p.slug}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`work-tab-${p.slug}`}
                  aria-selected={open}
                  aria-controls={`work-panel-${p.slug}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group min-w-[104px] flex-1 shrink-0 text-left"
                >
                  {/* The strip */}
                  <span
                    className={`block h-[3px] w-full rounded-sq transition-colors duration-200 ${
                      open
                        ? "bg-accent"
                        : "bg-line-2 group-hover:bg-line-3"
                    }`}
                  />
                  <span className="mt-3 flex items-baseline gap-2">
                    <span
                      className={`num text-[11px] transition-colors ${
                        open ? "text-accent" : "text-muted"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`truncate text-[12px] transition-colors ${
                        open ? "text-fg" : "text-muted group-hover:text-fg-2"
                      }`}
                    >
                      {p.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ---------------------------------------------------------------- */}
        {/*  The open project, full width                                     */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          key={project.slug}
          id={`work-panel-${project.slug}`}
          role="tabpanel"
          aria-labelledby={`work-tab-${project.slug}`}
          tabIndex={0}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 border-t border-line pt-10 outline-none"
        >
          {/* The count sits above the grid rather than inside the left column,
              so both columns start on the same line beneath it. Kept in the
              left column it pushed the name down by its own height and left the
              tech chips opposite starting higher than the name they describe. */}
          <div className="flex items-center gap-3">
            <span className="num text-[11px] text-accent">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-accent-line" aria-hidden />
          </div>

          {/* The description sits directly under the name it belongs to, rather
              than in a column beside it, so the project reads top to bottom:
              what it is, then what was hard about it. The measure is capped
              because the column is wider than comfortable reading length. */}
          <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h3 className="h-display text-[clamp(1.75rem,3.5vw,2.25rem)] text-fg">
                {project.name}
              </h3>
              <p className="num mt-1.5 text-[11px] uppercase tracking-[0.14em] text-muted">
                {project.category}
              </p>

              <p className="mt-5 max-w-[68ch] text-[15px] leading-[1.75] text-fg-2 md:text-[16px]">
                {project.detail ?? project.summary}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((slug) => (
                  <BrandChip key={slug} slug={slug} />
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-5">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    className="group inline-flex items-center gap-1.5 text-[13px] text-fg transition-colors hover:text-accent"
                  >
                    Walkthrough
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    className="inline-flex items-center gap-1.5 text-[13px] text-fg-2 transition-colors hover:text-fg"
                  >
                    <GithubLogo size={15} />
                    Source
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Visual bands, full measure, in the order the project declares.
              Every project currently carries just the cover plate. The "code"
              branch stays wired up so a diff can be added back from data alone. */}
          <div className="mt-10 space-y-6">
            {(project.visuals ?? ["cover"]).map((band) =>
              band === "code" ? (
                <CodeCompare key={band} />
              ) : (
                <ProjectCover
                  key={band}
                  index={String(active + 1).padStart(2, "0")}
                  image={project.image}
                  alt={`${project.name}, ${project.category}`}
                  primaryTech={project.coverTech ?? project.tech[0]}
                  layout={project.layout}
                />
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
