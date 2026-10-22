import { ChevronRight } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/shared/section"
import { cn } from "@/lib/utils"

export interface PageHeroProps {
  eyebrow?: string
  title: string
  description: string
  /** Current page name, used in the breadcrumb trail. */
  current: string
  className?: string
}

/**
 * Shared hero used at the top of every inner page.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  current,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-brand-deep py-14 text-brand-foreground sm:py-16 lg:py-20",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="bg-grid-pattern absolute inset-0 opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-brand-accent"
      />

      <Container className="relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-brand-foreground/60 sm:text-sm">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li className="font-medium text-brand-foreground" aria-current="page">
              {current}
            </li>
          </ol>
        </nav>

        {eyebrow ? (
          <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-brand-accent uppercase">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="mt-3 max-w-3xl font-heading text-3xl leading-[1.15] font-bold text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-brand-foreground/75 sm:text-lg">
          {description}
        </p>
      </Container>
    </section>
  )
}
