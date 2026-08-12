import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/**
 * Radius is locked to the 4px page scale. Primary uses near-black text on
 * accent azure (contrast 6.26:1, passes AA). Ghost carries a hairline so it
 * never disappears against the panel behind it.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg font-medium hover:bg-accent-hover active:translate-y-px",
  ghost:
    "border border-line-2 text-fg hover:border-line-3 hover:bg-raise active:translate-y-px",
};

export function Button({ children, href, variant = "primary", className = "", ...rest }: ButtonProps) {
  const external = href.startsWith("http") || href.startsWith("mailto:");

  const classes = [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sq",
    "px-5 py-3 text-sm leading-none transition-colors duration-200",
    variants[variant],
    className,
  ].join(" ");

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
