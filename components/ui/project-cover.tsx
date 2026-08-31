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
      <div className={`relative overflow-hidden rounded-sq border border-line bg-panel ${aspect}`}>
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 90vw, 100vw"
            className="object-contain"
          />
        </div>
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
