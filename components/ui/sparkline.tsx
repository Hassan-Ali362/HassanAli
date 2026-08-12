"use client";

import { useId, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";

type SparklineProps = {
  data: number[];
  width?: number;
  height?: number;
  /** Draws a soft fill under the line. Off for dense inline use. */
  area?: boolean;
  className?: string;
  strokeWidth?: number;
};

/**
 * A normalised sparkline. The path draws itself once when it scrolls into
 * view, which is the one thing an animation here can honestly say: the data
 * arrived. It does not loop.
 */
export function Sparkline({
  data,
  width = 120,
  height = 32,
  area = false,
  className,
  strokeWidth = 1.5,
}: SparklineProps) {
  const gradientId = useId();
  const reduce = useReducedMotion();

  const { line, fill } = useMemo(() => {
    if (data.length < 2) return { line: "", fill: "" };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const span = max - min || 1;
    // Inset by strokeWidth so the stroke never clips at the edges.
    const pad = strokeWidth;
    const innerW = width - pad * 2;
    const innerH = height - pad * 2;

    const points = data.map((value, i) => {
      const x = pad + (i / (data.length - 1)) * innerW;
      const y = pad + innerH - ((value - min) / span) * innerH;
      return [x, y] as const;
    });

    const linePath = points
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
      .join(" ");

    const fillPath = `${linePath} L${(width - pad).toFixed(2)},${height} L${pad.toFixed(2)},${height} Z`;

    return { line: linePath, fill: fillPath };
  }, [data, width, height, strokeWidth]);

  if (!line) return null;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      aria-hidden
    >
      {area && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={fill}
            fill={`url(#${gradientId})`}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          />
        </>
      )}
      <motion.path
        d={line}
        stroke="var(--accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
