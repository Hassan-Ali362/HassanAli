/**
 * The page's ambient light. Three accent blooms on long, mismatched periods,
 * fixed to the viewport so every section is lit the same way rather than each
 * one carrying its own glow, with a layer of static grain over the top.
 *
 * Deliberately not a mesh gradient and not a second hue. It is the one accent
 * already in the tokens, at alphas low enough to read as the surface being lit
 * rather than as coloured shapes sitting on it. The grain is what keeps that
 * from looking like three blurred circles: it breaks the banding where the
 * gradients overlap, which is the tell that gives cheap glow away.
 *
 * No JavaScript. Every loop is CSS on a fixed pointer-events-none layer, which
 * keeps this a Server Component and the animation off the main thread.
 *
 * -z-10 puts it above the body background and below all in-flow content. It
 * cannot be z-0: a positioned element at z-0 paints above non-positioned block
 * content, which would put it over the copy.
 */
export function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Anchored off the top right, where the hero composition wants its light
          source. Fixed, so it holds that position for every section below. */}
      <div className="bloom bloom-a -right-40 -top-56 size-[38rem] bg-accent/[0.09]" />
      {/* A wider, dimmer counterweight low on the opposite side, so the lower
          half of the page is not left flat. */}
      <div className="bloom bloom-b -bottom-64 -left-48 size-[44rem] bg-accent/[0.055]" />
      {/* Centre right, the slowest of the three. Its only job is to keep the
          middle of the page from being a dead band between the other two. */}
      <div className="bloom bloom-c -right-24 top-1/3 size-[30rem] bg-accent/[0.05]" />

      <div className="grain absolute inset-0" />
    </div>
  );
}
