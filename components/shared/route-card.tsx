import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Route } from "@/types"
import { routeEnquiryMessage, whatsappUrl } from "@/lib/whatsapp"

export interface RouteCardProps {
  route: Route
  className?: string
}

/**
 * Card for a popular route between two cities.
 */
export function RouteCard({ route, className }: RouteCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex h-full flex-col gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <span>{route.from}</span>
          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          <span>{route.to}</span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {route.note}
        </p>

        <dl className="mt-auto flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <div className="flex gap-2">
            <dt className="text-muted-foreground">Distance</dt>
            <dd className="font-medium">{route.distance}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted-foreground">Typical time</dt>
            <dd className="font-medium">{route.duration}</dd>
          </div>
        </dl>

        <div className="flex flex-col gap-3">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-9 w-full rounded-lg border-brand-whatsapp/40 text-brand-whatsapp hover:bg-brand-whatsapp/10"
          >
            <a
              href={whatsappUrl(routeEnquiryMessage(route.from, route.to))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about transport from ${route.from} to ${route.to} on WhatsApp`}
            >
              <WhatsAppIcon className="size-4" />
              Enquire About This Route
            </a>
          </Button>

          <Link
            href={`/contact?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`}
            className="inline-flex items-center justify-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Request a quote for this route
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
