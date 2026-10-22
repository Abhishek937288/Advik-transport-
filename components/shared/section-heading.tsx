import { cn } from "cn"

import { Truck } from "lucide-react"

export interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  /** Rendered on a dark background. */
  inverted?: boolean
  className?: string
  /** Heading id, useful for `aria-labelledby` on the section. */
  id?: string
}

/**
 * Consistent section heading: small eyebrow label, a clear H2 and a short
 * supporting paragraph.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase",
            inverted
              ? "border-brand-foreground/25 text-brand-accent"
              : "border-border bg-muted text-primary",
          )}
        >
          <Truck className="size-3.5" aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}

      <h2
        id={id}
        className={cn(
          "font-heading text-2xl leading-tight font-bold text-balance sm:text-3xl lg:text-4xl",
          inverted && "text-brand-foreground",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-pretty",
            inverted ? "text-brand-foreground/75" : "text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
