import { Truck } from "lucide-react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export interface LogoProps {
  /** Renders the logo for use on dark backgrounds. */
  inverted?: boolean
  className?: string
  /** Hides the tagline under the company name. */
  compact?: boolean
}

/**
 * Company logo. The wordmark and the tagline are read from the central site
 * configuration.
 */
export function Logo({ inverted = false, className, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent",
        className,
      )}
      aria-label={`${siteConfig.name} — home`}
    >
      <span
        className={cn(
          "relative flex size-10 shrink-0 items-center justify-center rounded-lg",
          inverted
            ? "bg-brand-foreground/10 ring-1 ring-brand-foreground/20"
            : "bg-primary",
        )}
        aria-hidden="true"
      >
        <Truck className="size-5 text-brand-foreground" />
        <span
          className={cn(
            "absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full",
            inverted ? "bg-brand-accent" : "bg-brand-accent",
          )}
        />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-lg font-bold tracking-tight",
            inverted ? "text-brand-foreground" : "text-foreground",
          )}
        >
          {siteConfig.shortName}
        </span>
        {!compact ? (
          <span
            className={cn(
              "mt-1 text-[0.65rem] font-medium tracking-[0.18em] uppercase",
              inverted ? "text-brand-foreground/60" : "text-muted-foreground",
            )}
          >
            Movers &amp; Logistics
          </span>
        ) : null}
      </span>
    </Link>
  )
}
