import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { iconMap } from "@/components/shared/icon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Service } from "@/types"
import { serviceEnquiryMessage, whatsappUrl } from "@/lib/whatsapp"

export interface ServiceCardProps {
  service: Service
  /** Shows the "Learn More" link to the service anchor on the services page. */
  showLearnMore?: boolean
  className?: string
}

/**
 * Card describing a single transportation service.
 *
 * The card is used on the homepage, the services page and the footer links, so
 * the copy always comes from the shared service data.
 */
export function ServiceCard({
  service,
  showLearnMore = true,
  className,
}: ServiceCardProps) {
  const Icon = iconMap[service.icon]

  return (
    <Card className={className}>
      <CardHeader>
        <span className="mb-1 flex size-11 items-center justify-center rounded-lg bg-primary/8 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <CardTitle className="font-heading text-lg font-bold">
          {service.name}
        </CardTitle>
        <Badge
          variant="secondary"
          className="mt-1 w-fit rounded-full font-medium"
        >
          {service.availability}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {service.shortDescription}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-9 rounded-lg"
          >
            <a
              href={whatsappUrl(serviceEnquiryMessage(service.name))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${service.name} on WhatsApp`}
            >
              Enquire
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>

          {showLearnMore ? (
            <Link
              href={`/services#${service.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Learn more
              <span className="sr-only">about {service.name}</span>
            </Link>
          ) : null}

          <Link
            href={`/contact?service=${service.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Request a quote
            <span className="sr-only">for {service.name}</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

/** Compact variant used inside dense grids. */
export function ServiceCardCompact({
  service,
  className,
}: {
  service: Service
  className?: string
}) {
  const Icon = iconMap[service.icon]

  return (
    <Card className={className}>
      <CardContent className="flex gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-heading text-base font-semibold">{service.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {service.shortDescription}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
