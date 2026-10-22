import { ArrowRight, Gauge, Package, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Vehicle } from "@/types"
import { vehicleEnquiryMessage, whatsappUrl } from "@/lib/whatsapp"

export interface VehicleCardProps {
  vehicle: Vehicle
  className?: string
}

/**
 * Card describing one commercial vehicle in the fleet.
 *
 * The WhatsApp enquiry link is pre-filled with the vehicle name so the visitor
 * does not have to repeat the detail.
 */
export function VehicleCard({ vehicle, className }: VehicleCardProps) {
  return (
    <Card className={className}>
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-t-xl bg-muted">
        <Image
          src={vehicle.image}
          alt={vehicle.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 rounded-full bg-background/90 font-medium backdrop-blur-sm"
        >
          {vehicle.serviceType}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="font-heading text-lg font-bold">
          {vehicle.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Gauge className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <dt className="sr-only">Capacity</dt>
            <dd className="font-medium">{vehicle.capacity}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <dt className="sr-only">Body type</dt>
            <dd className="truncate font-medium" title={vehicle.bodyType}>
              {vehicle.bodyType}
            </dd>
          </div>
        </dl>

        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
            <Package className="size-3.5" aria-hidden="true" />
            Suitable for
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {vehicle.suitableGoods.map((good) => (
              <li key={good}>
                <Badge variant="outline" className="rounded-full font-normal">
                  {good}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {vehicle.availability}
        </p>
      </CardContent>

      <CardFooter className="flex-col gap-3">
        <Button
          asChild
          size="lg"
          className="h-11 w-full bg-brand-whatsapp text-brand-whatsapp-foreground hover:bg-brand-whatsapp/90"
        >
          <a
            href={whatsappUrl(vehicleEnquiryMessage(vehicle.name))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about the ${vehicle.name} on WhatsApp`}
          >
            <WhatsAppIcon className="size-4" />
            Enquire About This Vehicle
            <ArrowRight aria-hidden="true" />
          </a>
        </Button>

        <Link
          href={`/contact?vehicle=${vehicle.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Request a quote for this vehicle
          <ArrowRight aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  )
}
