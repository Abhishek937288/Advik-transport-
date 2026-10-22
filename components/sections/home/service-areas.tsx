import { ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"

import { RouteCard } from "@/components/shared/route-card"
import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { routes, serviceAreas } from "@/data/service-areas"

/**
 * Service areas and popular routes.
 *
 * There is no live tracking on this website — the section only explains where
 * the business operates and how to ask for a different route.
 */
export function ServiceAreas() {
  return (
    <Section id="service-areas">
      <Container>
        <SectionHeading
          eyebrow="Where we operate"
          title="Serving Mumbai, Navi Mumbai, Thane and major locations across Maharashtra"
          description="Local runs inside the city and outstation trips to Pune, Nashik, Satara, Kolhapur and Goa are handled by the same team."
          id="service-areas-heading"
        />

        <ul className="mt-10 flex flex-wrap gap-2">
          {serviceAreas.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/service-areas#${area.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <MapPin className="size-4 text-primary" aria-hidden="true" />
                {area.name}
                <span className="text-xs text-muted-foreground">
                  {area.serviceType}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 font-heading text-lg font-semibold">
          Popular routes
        </h3>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <li key={route.slug} className="h-full">
              <RouteCard route={route} className="h-full" />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-border bg-muted/70 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-heading text-base font-semibold">
              Need transport on another route?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We regularly arrange vehicles for destinations that are not on
              the list above. Tell us the route and we will confirm it.
            </p>
          </div>

          <Button asChild size="lg" className="h-11 shrink-0 px-5">
            <Link href="/contact#enquiry-form">
              Contact Us
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
