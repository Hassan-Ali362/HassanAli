"use client";

import { useState } from "react";
import { List, X, Sun, Moon } from "@phosphor-icons/react";
import { navLinks, profile } from "@/lib/data";
import { useTheme } from "@/components/providers/theme";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      {/* 64px tall, single line at every breakpoint down to 320px. */}
      <nav className="wrap flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <span className="num flex size-7 items-center justify-center rounded-sq border border-line-2 text-[11px] font-medium text-fg">
            {profile.initials}
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-fg sm:block">
            {profile.name}
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-fg-2 transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="grid size-11 place-items-center rounded-sq border border-line-2 text-fg-2 transition-colors hover:text-fg md:size-9"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href="#contact"
            className="hidden rounded-sq bg-accent px-4 py-2 text-[13px] font-medium leading-none text-accent-fg transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            Get in touch
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-sq border border-line-2 text-fg-2 md:hidden"
          >
            {open ? <X size={16} /> : <List size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line md:hidden">
          <div className="wrap flex flex-col py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 text-sm text-fg-2 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 mb-2 rounded-sq bg-accent px-4 py-3 text-center text-sm font-medium text-accent-fg sm:hidden"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
