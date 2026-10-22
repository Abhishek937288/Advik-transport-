import { Quote, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Testimonial } from "@/types"

export interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

/**
 * Customer testimonial card.
 *
 * Placeholder reviews are clearly marked with a badge so they are never
 * presented as genuine customer feedback.
 */
export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col gap-4">
        <Quote
          className="size-7 shrink-0 text-brand-accent"
          aria-hidden="true"
        />

        <div
          className="flex items-center gap-1"
          aria-label={`Rated ${testimonial.rating} out of 5`}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={
                index < testimonial.rating
                  ? "size-4 fill-brand-accent text-brand-accent"
                  : "size-4 text-border"
              }
              aria-hidden="true"
            />
          ))}
        </div>

        <p className="text-sm leading-relaxed text-foreground/85">
          {testimonial.review}
        </p>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <p className="font-heading text-sm font-semibold">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {testimonial.role ? `${testimonial.role}, ` : ""}
            {testimonial.company}
          </p>
        </div>

        {testimonial.isPlaceholder ? (
          <Badge
            variant="outline"
            className="rounded-full border-dashed text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase"
          >
            Placeholder
          </Badge>
        ) : null}
      </CardFooter>
    </Card>
  )
}
