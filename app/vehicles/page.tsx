import { ArrowRight, Gauge, Package, Truck } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { ContactCta } from "@/components/sections/contact-cta"
import { PageHero } from "@/components/shared/page-hero"
import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { VehicleCard } from "@/components/shared/vehicle-card"
import { Button } from "@/components/ui/button"
import { buildMetadata } from "@/config/site"
import { vehicles } from "@/data/vehicles"

export const metadata: Metadata = buildMetadata({
  title: "Our Fleet | Mini Trucks, 14 Ft, 17 Ft & Container Vehicles",
  description:
    "Fleet of mini trucks, pickup bodies, 14 ft, 17 ft, 19 ft, 22 ft trucks and 20 ft container vehicles available for local and outstation goods transportation.",
  path: "/vehicles",
})

const capacityRows = [
  {
    label: "Up to 1,200 kg",
    vehicles: ["Tata Ace", "Pickup Truck"],
    note: "City deliveries, small parcels and shop restocking.",
  },
  {
    label: "Up to 3,500 kg",
    vehicles: ["14 Ft Truck"],
    note: "Construction material, cement bags, bricks and furniture.",
  },
  {
    label: "Up to 8,000 kg",
    vehicles: ["17 Ft Truck", "19 Ft Truck"],
    note: "Intercity stock movement, industrial spares and machinery.",
  },
  {
    label: "Up to 12,000 kg",
    vehicles: ["22 Ft Truck", "Container Truck"],
    note: "Full truck load, bulk cargo and factory dispatches.",
  },
]

export default function VehiclesPage() {
  const featured = vehicles.filter((vehicle) => vehicle.featured)
  const rest = vehicles.filter((vehicle) => !vehicle.featured)

  return (
    <>
      <PageHero
        eyebrow="Our fleet"
        title="The right body for the load"
        description="From a mini truck for a single carton to a 22 ft container for a full load — the vehicle is matched to your consignment, the road and the delivery window."
        current="Vehicles"
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Popular choices"
            title="Most requested vehicles"
            description="These are the vehicles we dispatch most often. Every other vehicle in the fleet is available on request."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((vehicle) => (
              <VehicleCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Full fleet"
            title="Every vehicle we operate"
            description="Load capacity is approximate and depends on the material and the road conditions. When in doubt, call us and we will size the vehicle for you."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((vehicle) => (
              <VehicleCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Choosing a vehicle"
                title="Which body does your consignment need?"
                description="A quick way to narrow it down. If the numbers on this page do not settle it, call the dispatch desk — we size the vehicle from the material and the route every day."
              />

              <ul className="mt-8 space-y-4">
                <li className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <Gauge className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-semibold">
                      Start with the weight
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Rough weight decides the body size. Volume matters too —
                      a light but bulky load still needs a bigger body.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <Package className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-semibold">
                      Then check the material
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Loose material, furniture, machinery and packaged goods
                      all pack differently. A closed body protects goods that
                      cannot be exposed.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <Truck className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-semibold">
                      Finally the road and the deadline
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Longer bodies need more turning room and are harder to
                      book at short notice, so they are planned in advance.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">
                    Vehicle capacity comparison
                  </caption>
                  <thead className="bg-muted">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Load size
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Vehicles
                      </th>
                      <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">
                        Usually used for
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {capacityRows.map((row) => (
                      <tr key={row.label}>
                        <th
                          scope="row"
                          className="px-4 py-3 font-semibold whitespace-nowrap"
                        >
                          {row.label}
                        </th>
                        <td className="px-4 py-3 text-muted-foreground">
                          {row.vehicles.join(", ")}
                          <span className="mt-1 block text-xs sm:hidden">
                            {row.note}
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                          {row.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-11">
                  <Link href="/contact#enquiry-form">
                    Request a quote
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11">
                  <Link href="/services">Explore our services</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <ContactCta
        title="Not sure which vehicle to use?"
        description="Describe the goods and the route, and we will tell you which body to book — and what it will cost — before anything is dispatched."
      />
    </>
  )
}
