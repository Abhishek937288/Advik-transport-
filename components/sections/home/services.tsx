import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { ServiceCard } from "@/components/shared/service-card"
import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { services } from "@/data/services"

/**
 * Transportation services offered — rendered from the shared service data.
 */
export function Services() {
  return (
    <Section id="services">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Transportation services for every kind of consignment"
            description="From a single carton to a full container load, the service is planned around the goods, the road and the delivery window you need."
            id="services-heading"
          />

          <Button asChild variant="outline" className="h-11 w-fit shrink-0 px-5">
            <Link href="/services">
              All Services
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug} className="h-full">
              <ServiceCard service={service} className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
