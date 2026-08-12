import { brandDomain, brandGlyph, brandLabel, domainText } from "@/components/tech-icons";

type BrandChipProps = {
  slug: string;
  /** "chip" carries a border. "bare" is glyph plus label, no box. */
  variant?: "chip" | "bare";
};

/**
 * Renders a technology mark, coloured by the area of the stack it belongs to.
 * The colour is the point: a row of chips shows at a glance how much of a
 * project is frontend, how much is data, how much is AI, without anyone having
 * to read the names.
 *
 * Not everything has a logo. The concepts, and BullMQ, take a Phosphor glyph
 * from the registry instead. The label-only branch below is the fallback for a
 * slug with no mark of either kind, so an unregistered addition still renders
 * rather than disappearing.
 */
export function BrandChip({ slug, variant = "chip" }: BrandChipProps) {
  const Glyph = brandGlyph[slug];
  const label = brandLabel[slug];
  const domain = brandDomain[slug];

  // An unlabelled slug is a data error, not something to render silently.
  if (!label) return null;

  /* Unmapped slugs stay neutral. Better an addition that looks unfinished than
     one that inherits a colour meaning the wrong thing. */
  const tint = domain ? domainText[domain] : undefined;

  if (variant === "bare") {
    return (
      <span className={`inline-flex items-center gap-2 ${tint ?? "text-fg-2"}`}>
        {Glyph && <Glyph className="size-4 shrink-0" aria-hidden />}
        <span className="text-[13px]">{label}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sq border border-line px-2 py-1 ${
        tint ?? "text-muted"
      }`}
    >
      {Glyph && <Glyph className="size-3.5 shrink-0" aria-hidden />}
      <span className="num text-[11px]">{label}</span>
    </span>
  );
}
