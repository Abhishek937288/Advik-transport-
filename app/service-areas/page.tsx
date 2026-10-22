import { ArrowRight, MapPin } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { ContactCta } from "@/components/sections/contact-cta"
import { PageHero } from "@/components/shared/page-hero"
import { RouteCard } from "@/components/shared/route-card"
import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { buildMetadata } from "@/config/site"
import { routes, serviceAreas } from "@/data/service-areas"

export const metadata: Metadata = buildMetadata({
  title: "Service Areas & Routes | Mumbai, Navi Mumbai, Pune, Nashik & More",
  description:
    "We transport goods across Mumbai, Navi Mumbai, Thane, Pune, Nashik, Satara, Kolhapur and Goa. See the areas we cover and the popular routes we run daily.",
  path: "/service-areas",
})

export default function ServiceAreasPage() {
  const localAreas = serviceAreas.filter((area) => area.serviceType === "Local")
  const outstationAreas = serviceAreas.filter(
    (area) => area.serviceType === "Outstation",
  )

  return (
    <>
      <PageHero
        eyebrow="Where we operate"
        title="Areas and routes we cover"
        description="Daily service across the Mumbai Metropolitan Region and regular outstation runs to the rest of Maharashtra and beyond. If your destination is not listed, call us — we usually can still help."
        current="Service Areas"
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Local coverage"
            title="Inside the Mumbai Metropolitan Region"
            description="Same-day and next-day pickups across the city, Navi Mumbai and the Thane belt."
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {localAreas.map((area) => (
              <article
                key={area.slug}
                className="flex flex-col rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>
                  <Badge variant="secondary" className="rounded-full">
                    {area.serviceType}
                  </Badge>
                </div>

                <h3 className="mt-5 font-heading text-lg font-bold">
                  {area.name}
                </h3>
                <p className="mt-1 text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                  {area.region}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {area.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {area.localities.map((locality) => (
                    <li key={locality}>
                      <Badge
                        variant="outline"
                        className="rounded-full font-normal"
                      >
                        {locality}
                      </Badge>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="mt-6 h-9 w-full rounded-lg"
                >
                  <Link href={`/contact?from=${encodeURIComponent(area.name)}`}>
                    Get a quote for {area.name}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Outstation & interstate"
            title="Regular outstation destinations"
            description="Intercity and interstate movements are planned in advance so the vehicle, the driver and the delivery window are confirmed before the load moves."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {outstationAreas.map((area) => (
              <article
                key={area.slug}
                className="flex flex-col rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent-foreground">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>
                  <Badge variant="secondary" className="rounded-full">
                    {area.serviceType}
                  </Badge>
                </div>

                <h3 className="mt-5 font-heading text-lg font-bold">
                  {area.name}
                </h3>
                <p className="mt-1 text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                  {area.region}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {area.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {area.localities.map((locality) => (
                    <li key={locality}>
                      <Badge
                        variant="outline"
                        className="rounded-full font-normal"
                      >
                        {locality}
                      </Badge>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="mt-6 h-9 w-full rounded-lg"
                >
                  <Link href={`/contact?to=${encodeURIComponent(area.name)}`}>
                    Get a quote for {area.name}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Popular routes"
            title="Routes we run every week"
            description="These are the routes that are booked most often. Distances and timings are typical values for a loaded vehicle on a good road."
            align="center"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <RouteCard key={route.slug} route={route} />
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-border bg-muted/60 p-6 text-center sm:p-8">
            <h3 className="font-heading text-xl font-bold">
              Going somewhere that is not listed?
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The routes above are the busiest, not the limit. We regularly move
              goods to destinations across Maharashtra and neighbouring states —
              tell us where and we will tell you what is possible.
            </p>
            <Button asChild size="lg" className="mt-6 h-11">
              <Link href="/contact#enquiry-form">
                Ask about your route
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <ContactCta
        title="Let's plan your dispatch"
        description="Share the pickup point and the destination and we will confirm the vehicle, the schedule and the price for the route."
      />
    </>
  )
}
