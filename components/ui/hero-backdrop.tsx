/**
 * The hero's measured plane. Four layers, all CSS, no JavaScript:
 *
 *   1. a coarse 72px grid creeping up
 *   2. a finer 18px grid creeping down at a different rate, which is what
 *      produces the sense of depth. One drifting texture reads as a texture
 *      sliding; two at different scales and opposite directions read as one
 *      plane behind another
 *   3. a conic wedge turning about a point off the top right corner, sharing an
 *      origin with the bloom in <Ambient /> so the sweep belongs to that light
 *   4. short signals crossing the plane on staggered, intermittent cycles
 *
 * Everything sits on one absolute pointer-events-none layer and animates
 * transform and opacity only. The signals and the sweep are removed entirely
 * under prefers-reduced-motion, since neither means anything held still.
 */

/* Peak brightness comes from a small fixed set rather than per-signal values,
   because Tailwind can only generate classes it can see as literals. */
const trackX = {
  strong: "bg-gradient-to-r from-transparent via-accent/40 to-transparent",
  mid: "bg-gradient-to-r from-transparent via-accent/28 to-transparent",
  soft: "bg-gradient-to-r from-transparent via-accent/20 to-transparent",
} as const;

const trackY = {
  strong: "bg-gradient-to-b from-transparent via-accent/32 to-transparent",
  mid: "bg-gradient-to-b from-transparent via-accent/22 to-transparent",
  soft: "bg-gradient-to-b from-transparent via-accent/16 to-transparent",
} as const;

type Signal = {
  axis: "x" | "y";
  /** Distance along the cross axis: top for x, left for y. */
  at: string;
  /** Length as a percentage of the hero, and the basis for --travel. */
  size: number;
  duration: string;
  delay: string;
  level: keyof typeof trackX;
};

/**
 * Placed to leave the headline band clear. The horizontals sit high and low, the
 * verticals stay in the right third behind the identity plate, and no two share
 * a period, so they never cross in a repeating pattern.
 */
const signals: Signal[] = [
  { axis: "x", at: "13%", size: 22, duration: "13s", delay: "0s", level: "strong" },
  { axis: "x", at: "64%", size: 16, duration: "17s", delay: "6s", level: "soft" },
  { axis: "x", at: "87%", size: 26, duration: "15s", delay: "9.5s", level: "mid" },
  { axis: "y", at: "71%", size: 18, duration: "19s", delay: "3s", level: "mid" },
  { axis: "y", at: "89%", size: 14, duration: "23s", delay: "12s", level: "soft" },
];

/**
 * Transform percentages resolve against the element itself, not its parent, so
 * a segment `size`% long has to travel 100 / size * 100% to clear the far edge.
 */
const travel = (size: number) => `${Math.round(10000 / size)}%`;

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Both grid layers are inset past the top and bottom edges by one of
          their own tiles, so drifting never opens a gap at either end. */}
      <div className="absolute inset-x-0 -inset-y-[72px] mask-fade-b opacity-50">
        <div className="rule-grid grid-drift absolute inset-0" />
      </div>
      <div className="absolute inset-x-0 -inset-y-[18px] mask-fade-b opacity-70">
        <div className="rule-grid-fine grid-drift-fine absolute inset-0" />
      </div>

      {signals.map((signal, i) =>
        signal.axis === "x" ? (
          <div
            key={i}
            className={`signal-x absolute left-0 h-px ${trackX[signal.level]}`}
            style={{
              top: signal.at,
              width: `${signal.size}%`,
              "--travel": travel(signal.size),
              "--dur": signal.duration,
              "--delay": signal.delay,
            } as React.CSSProperties}
          />
        ) : (
          <div
            key={i}
            className={`signal-y absolute top-0 w-px ${trackY[signal.level]}`}
            style={{
              left: signal.at,
              height: `${signal.size}%`,
              "--travel": travel(signal.size),
              "--dur": signal.duration,
              "--delay": signal.delay,
            } as React.CSSProperties}
          />
        ),
      )}
    </div>
  );
}
