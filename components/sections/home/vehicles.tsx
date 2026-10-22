import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { VehicleCard } from "@/components/shared/vehicle-card"
import { Button } from "@/components/ui/button"
import { vehicles } from "@/data/vehicles"

const featuredVehicles = vehicles.filter((vehicle) => vehicle.featured)

/**
 * Fleet preview — shows the most commonly booked vehicles.
 */
export function Vehicles() {
  return (
    <Section tone="muted" id="vehicles">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Our fleet"
            title="A vehicle for every size of load"
            description="Pick the body that matches your consignment. Every vehicle can be booked for local work or for outstation routes."
            id="vehicles-heading"
          />

          <Button asChild variant="outline" className="h-11 w-fit shrink-0 px-5">
            <Link href="/vehicles">
              View All Vehicles
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredVehicles.map((vehicle) => (
            <li key={vehicle.slug} className="h-full">
              <VehicleCard vehicle={vehicle} className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
