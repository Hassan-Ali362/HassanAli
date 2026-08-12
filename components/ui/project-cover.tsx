import Image from "next/image";
import { brandDomain, brandGlyph, domainText, domainWash } from "@/components/tech-icons";
import { ProjectWireframe } from "@/components/ui/project-wireframe";
import type { ProjectLayout } from "@/lib/data";

/**
 * The visual at the top of a project card.
 *
 * A real screenshot when the project has one. Until then, a wireframe of the
 * interface the project puts in front of a user, drawn from its layout archetype.
 *
 * The wireframe is a diagram and looks like one: neutral blocks at hairline
 * contrast, no fake copy, no invented numbers, no imitation logos. A hand-built
 * replica of a product interface would be both the clearest tell in an AI-made
 * portfolio and a picture of software nobody can verify. See project-wireframe.tsx.
 */
export function ProjectCover({
  index,
  image,
  alt,
  primaryTech,
  layout,
  /** Tailwind aspect utility. Wide bands want a shallower ratio than cards. */
  aspect = "aspect-[16/10] md:aspect-[5/2]",
}: {
  index: string;
  image?: string;
  alt: string;
  primaryTech?: string;
  layout?: ProjectLayout;
  aspect?: string;
}) {
  const Glyph = primaryTech ? brandGlyph[primaryTech] : undefined;

  /* The cover takes the colour of the area its primary technology belongs to, so
     covers differ from project to project and each one agrees with the chips
     listed beside it. Unmapped marks fall back to the accent. */
  const domain = primaryTech ? brandDomain[primaryTech] : undefined;
  const wash = domain ? domainWash[domain] : "from-accent-dim";
  const glyphTint = domain ? domainText[domain] : "text-accent";

  if (image) {
    return (
      /* No aria-hidden on this branch: the image carries a real alt describing
         the project, and hiding the subtree would throw that away. */
      <div className={`relative ${aspect} overflow-hidden rounded-sq border border-line bg-panel`}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 90vw, 100vw"
          className="object-cover"
        />

        {/* Two passes over the photograph. The wash ties it to this project's
            domain colour so a stock image does not fight the palette, and the
            scrim darkens the lower edge so the index stays legible whatever the
            photograph happens to be. Both are light enough that a real
            screenshot dropped in here is still readable. */}
        <div
          className={`absolute inset-0 bg-gradient-to-br via-transparent to-transparent ${wash}`}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/25 to-transparent"
          aria-hidden
        />

        <span className="num absolute bottom-5 left-6 text-[3.5rem] font-medium leading-none tracking-tight text-fg/70 md:text-[4.5rem]">
          {index}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative ${aspect} overflow-hidden rounded-sq border border-line bg-panel`}
      aria-hidden
    >
      {/* Tinted field, brightest at the top-left corner */}
      <div className={`absolute inset-0 bg-gradient-to-br via-transparent to-transparent ${wash}`} />
      <div className="absolute inset-0 rule-grid opacity-70" />

      {/* Primary technology mark, ghosted and cropped off the corner */}
      {Glyph && (
        <Glyph
          className={`absolute -bottom-10 -right-8 size-48 opacity-[0.05] md:size-64 ${glyphTint}`}
        />
      )}

      {/* The interface, as a diagram. */}
      <div className="absolute inset-0">
        <ProjectWireframe kind={layout} domain={domain} />
      </div>

      {/* The index, bottom right so it clears the wireframe's sidebar. */}
      <span className="num absolute bottom-4 right-5 text-[2.5rem] font-medium leading-none tracking-tight text-line-3 md:text-[3.25rem]">
        {index}
      </span>
    </div>
  );
}
