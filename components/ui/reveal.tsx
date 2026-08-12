"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger index. Multiplied by 60ms. */
  i?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Entry on scroll. Justification: sequence. Content lower in a section is
 * subordinate to the heading above it, and arriving in that order says so.
 * Runs once, never loops.
 */
export function Reveal({ children, i = 0, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
