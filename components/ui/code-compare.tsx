import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

/**
 * The migration project's visual: a per-file diff, which is the thing the tool
 * actually produces and the single most useful thing to put next to it.
 *
 * Presented as a diff rather than as two code blocks side by side. Gutter
 * markers and tinted rows say which lines the run rewrote, the header names the
 * transformation and its direction, and the line counts are read off the content
 * below rather than typed in, so they cannot drift out of date.
 *
 * There is no syntax-highlighting library and no invented colour scheme.
 * Structure is carried by brightness against the existing palette, and the
 * accent marks only the tokens the migration changed.
 *
 * --ok and --down appear here, and this is the case the token comments reserve
 * them for: added and removed are real state that the content describes, not
 * decoration. Neither is doing the work alone, either. Every tinted row also
 * carries a gutter marker, so the diff still reads without colour.
 */

type Tone = "kw" | "id" | "dim" | "hit";

type Token = [text: string, tone?: Tone];

const toneClass: Record<Tone, string> = {
  kw: "text-fg font-medium", // language keywords
  id: "text-fg-2", // identifiers
  dim: "text-muted", // punctuation and boilerplate
  hit: "text-accent", // what the migration rewrote
};

/* A rewritten line is one carrying a token the migration touched. Derived rather
   than flagged by hand, so the markers cannot disagree with the highlighting. */
const wasRewritten = (tokens: Token[]) => tokens.some(([, tone]) => tone === "hit");

function Pane({
  label,
  marker,
  tint,
  markerClass,
  lines,
  note,
}: {
  label: string;
  /** Diff gutter glyph. Removals on the left pane, additions on the right. */
  marker: string;
  tint: string;
  markerClass: string;
  lines: Token[][];
  /** Closing line. Fills the shorter pane with the outcome instead of a void. */
  note?: string;
}) {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-3">
        <span className="label">{label}</span>
        <span className="num text-[10.5px] text-muted">{lines.length} lines</span>
      </div>

      {/* Padding sits on the rows, not this container, so a tinted row can run
          the full width of the pane instead of stopping at its text. */}
      <div className="overflow-x-auto py-3">
        <pre className="num text-[12px] leading-[1.75]">
          <code>
            {lines.map((tokens, i) => {
              const changed = wasRewritten(tokens);

              return (
                <span
                  key={i}
                  className={`grid grid-cols-[1.75rem_0.875rem_1fr] px-4 ${
                    changed ? tint : ""
                  }`}
                >
                  <span className="select-none text-faint" aria-hidden>
                    {i + 1}
                  </span>
                  <span
                    className={`select-none ${changed ? markerClass : "text-faint"}`}
                    aria-hidden
                  >
                    {changed ? marker : " "}
                  </span>
                  <span className="whitespace-pre">
                    {tokens.length === 0 ? (
                      " "
                    ) : (
                      tokens.map(([text, tone = "id"], j) => (
                        <span key={j} className={toneClass[tone]}>
                          {text}
                        </span>
                      ))
                    )}
                  </span>
                </span>
              );
            })}
          </code>
        </pre>

        {/* The After pane is six lines shorter, which is the outcome rather than
            a gap to be padded out, so it says so. */}
        {note && (
          <p className="num mt-2 px-4 pl-[2.625rem] text-[11px] text-muted">{note}</p>
        )}
      </div>
    </div>
  );
}

/* A real Vue 2 Options API component, and the Vue 3 Composition API output. */
const before: Token[][] = [
  [["export ", "kw"], ["default", "kw"], [" {", "dim"]],
  [["  ", "dim"], ["data", "hit"], ["() {", "dim"]],
  [["    ", "dim"], ["return", "kw"], [" { count: ", "dim"], ["0", "id"], [" }", "dim"]],
  [["  },", "dim"]],
  [["  ", "dim"], ["computed", "hit"], [": {", "dim"]],
  [["    doubled() {", "dim"]],
  [["      ", "dim"], ["return", "kw"], [" ", "dim"], ["this", "hit"], [".count * ", "dim"], ["2", "id"]],
  [["    },", "dim"]],
  [["  },", "dim"]],
  [["  ", "dim"], ["mounted", "hit"], ["() {", "dim"]],
  [["    ", "dim"], ["this", "hit"], [".load()", "dim"]],
  [["  },", "dim"]],
  [["}", "dim"]],
];

const after: Token[][] = [
  [["const", "kw"], [" count = ", "dim"], ["ref", "hit"], ["(", "dim"], ["0", "id"], [")", "dim"]],
  [],
  [["const", "kw"], [" doubled = ", "dim"], ["computed", "hit"], ["(", "dim"]],
  [["  () ", "dim"], ["=>", "kw"], [" count.", "dim"], ["value", "hit"], [" * ", "dim"], ["2", "id"]],
  [[")", "dim"]],
  [],
  [["onMounted", "hit"], ["(load)", "dim"]],
];

export function CodeCompare() {
  return (
    <figure className="panel overflow-hidden">
      {/* Names the transformation and its direction, so the two panes below do
          not have to be read against each other to work out what happened. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line bg-raise px-4 py-3">
        <span className="label">Per-file diff</span>
        <span className="num inline-flex items-center gap-2.5 text-[10.5px] text-fg-2">
          Vue 2, Options API
          <ArrowRight size={12} weight="bold" className="shrink-0 text-accent" />
          Vue 3, Composition API
        </span>
      </div>

      <div className="flex flex-col divide-y divide-line md:flex-row md:divide-x md:divide-y-0">
        <Pane
          label="Before"
          marker="-"
          tint="bg-down/[0.07]"
          markerClass="text-down"
          lines={before}
        />
        <Pane
          label="After"
          marker="+"
          tint="bg-ok/[0.07]"
          markerClass="text-ok"
          lines={after}
          note={`${before.length - after.length} fewer lines`}
        />
      </div>

      <figcaption className="border-t border-line px-4 py-3 text-[12px] leading-relaxed text-muted">
        Deterministic rules handle the shape change. An agent decides the cases a
        rule cannot, such as whether a <code className="num text-fg-2">this</code>{" "}
        reference survives the move out of the options object.
      </figcaption>
    </figure>
  );
}
