"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/**
 * Rolls a value up once when it enters view. The spring drives a subscription
 * rather than React state per frame, so this stays off the render path.
 *
 * `display` is always initialised to 0 so that the server-rendered HTML and
 * the client's first paint agree. The spring and the reduce-motion shortcut
 * only kick in after mount (inside useEffect), which is the earliest point at
 * which browser APIs like matchMedia are available.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 22 });
  // Always start at 0 so SSR and the initial client render agree.
  const [display, setDisplay] = useState(0);
  // Tracks whether we've mounted; only then do we trust client-side APIs.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (inView) motionValue.set(value);
  }, [mounted, inView, value, motionValue]);

  useEffect(() => {
    if (!mounted || reduce) return;
    return spring.on("change", setDisplay);
  }, [mounted, spring, reduce]);

  // Before mount: always show 0 (matches SSR). After mount: show the animated
  // value, or jump straight to the final value under reduced motion.
  const shown = !mounted ? 0 : reduce ? value : display;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>
        {prefix}
        {shown.toFixed(decimals)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}
