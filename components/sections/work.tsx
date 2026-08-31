"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { BrandChip } from "@/components/ui/brand-chip";
import { ProjectCover } from "@/components/ui/project-cover";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/data";

export function Work() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  const project = projects[active];

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const delta =
      e.key === "ArrowRight" ? 1
      : e.key === "ArrowLeft" ? -1
      : e.key === "Home" ? -Infinity
      : e.key === "End" ? Infinity
      : 0;
    if (!delta) return;
    e.preventDefault();
    setActive((current) => {
      const next =
        delta === -Infinity ? 0
        : delta === Infinity ? projects.length - 1
        : (current + delta + projects.length) % projects.length;
      tabRefs.current[next]?.focus();
      return next;
    });
  }, []);

  return (
    <section id="work" className="border-b border-line py-16 md:py-24">
      <div className="wrap">

        {/* ── Section header ───────────────────────────────────────────── */}
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
        </Reveal>

        {/* ── Tab selector ─────────────────────────────────────────────── */}
        <Reveal i={1}>
          <div
            role="tablist"
            aria-label="Projects"
            onKeyDown={onKeyDown}
            className="mt-10 flex gap-2 overflow-x-auto pb-1"
          >
            {projects.map((p, i) => {
              const open = i === active;
              return (
                <button
                  key={p.slug}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  role="tab"
                  type="button"
                  id={`work-tab-${p.slug}`}
                  aria-selected={open}
                  aria-controls={`work-panel-${p.slug}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group min-w-[104px] flex-1 shrink-0 text-left"
                >
                  <span className={`block h-[3px] w-full rounded-sq transition-colors duration-200 ${
                    open ? "bg-accent" : "bg-line-2 group-hover:bg-line-3"
                  }`} />
                  <span className="mt-3 flex items-baseline gap-2">
                    <span className={`num text-[11px] transition-colors ${open ? "text-accent" : "text-muted"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`truncate text-[12px] transition-colors ${
                      open ? "text-fg" : "text-muted group-hover:text-fg-2"
                    }`}>
                      {p.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Active project panel ─────────────────────────────────────── */}
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
          {/* ── Top: info left / image right ──────────────────────────── */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:items-stretch">

            {/* Left — name, category, description, chips, links */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="num text-[11px] text-accent">
                  {String(active + 1).padStart(2, "00")}
                </span>
                <span className="h-px w-8 bg-accent-line" aria-hidden />
              </div>
              <div>
                <h3 className="h-display text-[clamp(1.75rem,3.5vw,2.5rem)] text-fg">
                  {project.name}
                </h3>
                <p className="num mt-2 text-[11px] uppercase tracking-[0.14em] text-muted">
                  {project.category}
                </p>
              </div>
              <p className="text-[15px] leading-[1.8] text-fg-2 md:text-[16px]">
                {project.detail ?? project.summary}
              </p>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tech.map((slug) => (
                  <BrandChip key={slug} slug={slug} />
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-1">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-sq border !border-accent px-4 py-2 text-[13px] text-white transition-colors hover:bg-accent-dim"
                  >
                    Walkthrough
                    <ArrowUpRight size={13} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-sq border !border-accent px-4 py-2 text-[13px] text-fg transition-colors hover:bg-accent-dim hover:text-accent"
                  >
                    <GithubLogo size={14} />
                    GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Right — project image, same height as left column */}
            <div className="w-full h-full min-h-[420px]">
              <ProjectCover
                index={String(active + 1).padStart(2, "0")}
                image={project.image}
                alt={`${project.name}, ${project.category}`}
                primaryTech={project.coverTech ?? project.tech[0]}
                layout={project.layout}
                aspect="aspect-auto h-full"
              />
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
