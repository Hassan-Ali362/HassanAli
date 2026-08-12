import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { facts } from "@/lib/data";

/**
 * Counts and durations, nothing else. There is no sparkline here because there
 * is no real time series behind these numbers, and drawing one from invented
 * data would be the exact thing this rebuild is trying to remove.
 *
 * No cards: hairlines and alignment carry the grouping at this density.
 */
export function Facts() {
  return (
    <section aria-label="At a glance" className="border-b border-line">
      <div className="wrap grid grid-cols-1 sm:grid-cols-3">
        {facts.map((fact, i) => (
          <Reveal
            key={fact.label}
            i={i}
            className={[
              "flex flex-col gap-3 py-8 lg:py-10",
              "border-b border-line last:border-b-0",
              "sm:border-b-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8 sm:[&:not(:last-child)]:pr-8",
            ].join(" ")}
          >
            <p className="label">{fact.label}</p>
            <p className="num text-[2.5rem] font-medium leading-none tracking-tight text-fg">
              <Counter
                value={fact.value}
                decimals={fact.decimals}
                suffix={fact.suffix}
              />
            </p>
            <p className="text-[12px] leading-snug text-muted">{fact.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
