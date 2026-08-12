import type { Domain } from "@/components/tech-icons";
import { domainText } from "@/components/tech-icons";
import type { ProjectLayout } from "@/lib/data";

/**
 * A wireframe of the interface a project puts in front of a user, drawn as one of
 * five layout archetypes.
 *
 * It is a diagram, and it is built to be obviously a diagram. There is no fake
 * copy, no invented numbers, no imitation logos, and no replica of any real
 * browser's window controls. Every element is a neutral block at hairline
 * contrast, with the project's domain colour on one or two of them.
 *
 * That restraint is the point. A hand-built copy of a product interface is the
 * clearest tell in an AI-made portfolio, and worse, it would show a recruiter
 * software they cannot verify. A wireframe says "this is the shape of the thing"
 * and claims nothing further.
 *
 * The window is inset and given 16:10 proportions rather than filling the band.
 * The band is 5:2, far wider than any page, and a full-bleed layout inside it
 * left everything floating in empty space. Sized like a screen, it reads like one.
 *
 * It is the placeholder, not the destination. Set `image` on a project and a real
 * screenshot replaces this entirely.
 */

/* Neutral block. Almost everything in here is one of these. */
function Block({ className = "" }: { className?: string }) {
  return <span className={`block rounded-[2px] bg-line-2 ${className}`} />;
}

/* The elements carrying the project's colour. bg-current picks it up from the
   text colour the tint class sets. */
function Accent({ className = "", tint }: { className?: string; tint: string }) {
  return <span className={`block rounded-[2px] bg-current ${tint} ${className}`} />;
}

const WIDTHS = ["w-[88%]", "w-[72%]", "w-[94%]", "w-[64%]", "w-[81%]"];

/* justify-between rather than a fixed gap: the rows spread down the full height
   of whatever pane they are in. Stacked at the top with a gap they left the lower
   half of the window empty, which read as an unfinished mock. */
function Lines({ n, tint, accentAt = 1 }: { n: number; tint: string; accentAt?: number }) {
  return (
    <div className="flex h-full flex-col justify-between">
      {Array.from({ length: n }, (_, i) =>
        i === accentAt ? (
          <Accent key={i} tint={tint} className="h-[5px] w-[58%] opacity-80" />
        ) : (
          <Block key={i} className={`h-[5px] ${WIDTHS[i % WIDTHS.length]}`} />
        ),
      )}
    </div>
  );
}

/* Equal-height rows with dividers. Rows spread by justify-between over a tall
   pane end up 50px apart and read as scattered lines; as a table they fill it. */
function Table({ rows, tint, accentAt = 1 }: { rows: number; tint: string; accentAt?: number }) {
  return (
    <div className="flex h-full flex-col divide-y divide-line overflow-hidden rounded-[3px] border border-line bg-line/15">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex flex-1 items-center px-2">
          {i === accentAt ? (
            <Accent tint={tint} className="h-[5px] w-[52%] opacity-80" />
          ) : (
            <Block className={`h-[5px] ${WIDTHS[i % WIDTHS.length]}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Layout({ kind, tint }: { kind: ProjectLayout; tint: string }) {
  switch (kind) {
    /* Media pane with a transcript column beside it. */
    case "media":
      return (
        <div className="flex h-full gap-2.5">
          <div className="flex flex-[1.6] flex-col gap-2">
            <div className="flex flex-1 items-center justify-center rounded-[3px] border border-line bg-line/20">
              <Accent tint={tint} className="size-7 rounded-full opacity-40" />
            </div>
            <Accent tint={tint} className="h-[4px] w-[45%] rounded-full opacity-70" />
          </div>
          <div className="flex-1 overflow-hidden py-0.5">
            <Lines n={14} tint={tint} accentAt={3} />
          </div>
        </div>
      );

    /* Catalogue of cards. */
    case "grid":
      return (
        <div className="flex h-full flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Accent tint={tint} className="h-[5px] w-12 opacity-80" />
            <Block className="h-[5px] w-8" />
            <Block className="h-[5px] w-8" />
            <span className="flex-1" />
            <Block className="h-[5px] w-10" />
          </div>
          <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-2.5">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="flex flex-col gap-1.5 rounded-[3px] border border-line bg-line/15 p-1.5"
              >
                <div className="flex-1 rounded-[2px] bg-line/60" />
                <Block className="h-[4px] w-[78%]" />
                {i === 0 ? (
                  <Accent tint={tint} className="h-[4px] w-[40%] opacity-80" />
                ) : (
                  <Block className="h-[4px] w-[40%]" />
                )}
              </div>
            ))}
          </div>
        </div>
      );

    /* Map pane with pins and a list of deliveries beside it. */
    case "map":
      return (
        <div className="flex h-full gap-2.5">
          <div className="relative flex-[1.8] overflow-hidden rounded-[3px] border border-line bg-line/20">
            <span className="absolute left-[20%] top-[26%] size-1.5 rounded-full bg-line-3" />
            <span className="absolute left-[70%] top-[22%] size-1.5 rounded-full bg-line-3" />
            <span className="absolute left-[38%] top-[68%] size-1.5 rounded-full bg-line-3" />
            <Accent tint={tint} className="absolute left-[50%] top-[46%] size-2.5 rounded-full" />
          </div>
          <div className="flex-1">
            <Lines n={11} tint={tint} accentAt={2} />
          </div>
        </div>
      );

    /* Rows of monitored endpoints, each with a state marker and a history strip.
       The strips carry no scale and no numbers: they say "there is history here",
       not "uptime was 99.4%". */
    case "status":
      return (
        <div className="flex h-full flex-col divide-y divide-line overflow-hidden rounded-[3px] border border-line bg-line/15">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="flex flex-1 items-center gap-2 px-2">
              {i === 2 ? (
                <Accent tint={tint} className="size-1.5 shrink-0 rounded-full" />
              ) : (
                <span className="size-1.5 shrink-0 rounded-full bg-line-3" />
              )}
              <Block
                className={`h-[5px] shrink-0 ${["w-16", "w-12", "w-20", "w-10", "w-14", "w-16", "w-12", "w-20"][i]}`}
              />
              <div className="flex flex-1 gap-[2px]">
                {Array.from({ length: 22 }, (_, j) => (
                  <span
                    key={j}
                    className={`h-[6px] flex-1 rounded-[1px] ${
                      i === 2 && (j === 13 || j === 14) ? "bg-line/40" : "bg-line-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    /* Sidebar and a working pane. The default. */
    default:
      return (
        <div className="flex h-full gap-2.5">
          <div className="flex w-[22%] min-w-[54px] flex-col gap-[5px] rounded-[3px] border border-line bg-line/15 p-2">
            <Accent tint={tint} className="h-[5px] w-[65%] opacity-80" />
            {Array.from({ length: 9 }, (_, i) => (
              <Block key={i} className={`h-[5px] ${i % 2 ? "w-[70%]" : "w-[88%]"}`} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-2.5">
            <div className="flex items-center gap-1.5">
              <Block className="h-[5px] w-14" />
              <span className="flex-1" />
              <Accent tint={tint} className="h-[9px] w-12 rounded-[2px] opacity-80" />
            </div>
            <div className="min-h-0 flex-1">
              <Table rows={8} tint={tint} accentAt={2} />
            </div>
          </div>
        </div>
      );
  }
}

export function ProjectWireframe({
  kind = "app",
  domain,
}: {
  kind?: ProjectLayout;
  domain?: Domain;
}) {
  const tint = domain ? domainText[domain] : "text-accent";

  return (
    <div className="flex h-full items-center justify-center p-4 md:p-6">
      {/* h-full plus an aspect ratio makes the height fill the band and the width
          follow from it, so the window keeps page proportions at every size. */}
      <div className="flex aspect-[16/10] h-full max-w-full flex-col overflow-hidden rounded-sq border border-line-2 bg-bg/50">
        {/* Chrome. An address bar and a few nav marks, deliberately not a copy of
            any real browser's window controls. */}
        <div className="flex shrink-0 items-center gap-2 border-b border-line px-2.5 py-2">
          <span className="h-[6px] flex-1 rounded-full bg-line/80" />
          <span className="flex shrink-0 gap-1">
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className="h-[4px] w-3 rounded-full bg-line-2" />
            ))}
          </span>
        </div>

        <div className="min-h-0 flex-1 p-2.5">
          <Layout kind={kind} tint={tint} />
        </div>
      </div>
    </div>
  );
}
