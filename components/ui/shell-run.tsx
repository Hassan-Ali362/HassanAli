import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

/**
 * The hero's visual: a short shell session, the commands arriving in sequence
 * and the last one still running.
 *
 * Two rules keep this a code snippet rather than a fake screenshot, which is the
 * most recognisable tell in an AI-built page:
 *
 *   1. It renders commands, not results. There is no "142 files migrated", no
 *      percentage, no green tick claiming an outcome. Every one of those would be
 *      a number this site has not earned, and the whole page is built on not
 *      inventing them.
 *   2. It does not imitate a terminal's chrome. No traffic-light dots, no window
 *      frame. It is a panel in the same language as every other panel here, and
 *      the monospace and the prompt carry the rest.
 *
 * The commands are deliberately general: bring the services up, run the database
 * migrations, build, ship. They describe the shape of the work rather than any
 * one project, which is also why nothing here names a framework or a version.
 * Swap them for your own in this array.
 */

const COMMANDS = [
  "docker compose up -d",
  "npm run migrate",
  "npm run build",
] as const;

/* Reveal cadence. The running line follows the last command. */
const STEP = 0.45;

export function ShellRun() {
  return (
    <div className="num text-[11.5px] leading-[1.9]">
      {COMMANDS.map((command, i) => (
        <p
          key={command}
          className="line-in flex gap-2"
          style={{ "--delay": `${i * STEP}s` } as React.CSSProperties}
        >
          <span className="shrink-0 select-none text-accent" aria-hidden>
            $
          </span>
          {/* Wraps with a hanging indent rather than overflowing, so a long
              command stays readable in a narrow plate. */}
          <span className="min-w-0 break-words text-fg-2">{command}</span>
        </p>
      ))}

      <p
        className="line-in mt-1 flex items-center gap-2 text-muted"
        style={{ "--delay": `${COMMANDS.length * STEP}s` } as React.CSSProperties}
      >
        <CircleNotch
          size={11}
          weight="bold"
          className="shrink-0 animate-spin text-accent motion-reduce:animate-none"
          aria-hidden
        />
        <span>deploying</span>
        {/* Block caret. The one element that keeps blinking once the sequence
            has played out, which is what says the run has not finished. */}
        <span className="caret inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-fg-2" aria-hidden />
      </p>
    </div>
  );
}
