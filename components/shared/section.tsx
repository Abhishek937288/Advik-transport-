import { cn } from "cn"
import type { ComponentProps } from "react"

type SectionTone = "default" | "muted" | "brand" | "brand-deep" | "bordered"

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background",
  muted: "bg-muted",
  brand: "bg-brand text-brand-foreground",
  "brand-deep": "bg-brand-deep text-brand-foreground",
  bordered: "bg-background border-y border-border",
}

export interface SectionProps extends ComponentProps<"section"> {
  tone?: SectionTone
  /** Removes the default vertical rhythm (useful for nested sections). */
  flush?: boolean
}

/**
 * Standard page section. Keeps the max width, horizontal padding and the
 * vertical rhythm consistent across every page.
 */
export function Section({
  className,
  tone = "default",
  flush = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "scroll-mt-28",
        toneClasses[tone],
        !flush && "py-16 sm:py-20 lg:py-24",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

/** Responsive page container used inside every section. */
export function Container({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
