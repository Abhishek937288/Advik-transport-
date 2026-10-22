import { ArrowRight, Check } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { ContactCta } from "@/components/sections/contact-cta"
import { getIcon } from "@/components/shared/icon"
import { PageHero } from "@/components/shared/page-hero"
import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { ServiceCard } from "@/components/shared/service-card"
import { Button } from "@/components/ui/button"
import { buildMetadata, siteConfig } from "@/config/site"
import { goodsCategories } from "@/data/company"
import { services } from "@/data/services"
import { getVehicleBySlug } from "@/data/vehicles"

export const metadata: Metadata = buildMetadata({
  title: "Transportation Services | Local, Intercity, FTL & Part Load",
  description:
    "Local and intercity goods transportation, full truck load, part load, commercial and industrial transport, construction material delivery and regular scheduled dispatch services.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Goods transportation built around the load"
        description="From a single carton across the city to a full truck moving between cities — every consignment is planned, packed and dispatched by the same team."
        current="Services"
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Transportation services for every kind of consignment"
            description="Whether it is a single carton across the city or a full body moving between cities, the service is planned around the load, the road and the delivery window."
            align="center"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Service details"
            title="What is included in each service"
            description="Each service below covers a different kind of movement. Pick the one that matches your consignment — or call us and we will recommend the right option."
          />

          <div className="mt-12 space-y-6">
            {services.map((service) => {
              const Icon = getIcon(service.icon)
              const relatedVehicles = service.relatedVehicles
                .map((slug) => getVehicleBySlug(slug))
                .filter((vehicle) => vehicle !== undefined)

              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 sm:p-8"
                >
                  <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
                          <Icon className="size-6" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="font-heading text-xl font-bold sm:text-2xl">
                            {service.name}
                          </h3>
                          <p className="mt-0.5 text-sm font-medium text-muted-foreground">
                            {service.availability}
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>

                      <p className="mt-6 text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                        Typical use cases
                      </p>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {service.useCases.map((useCase) => (
                          <li
                            key={useCase}
                            className="flex items-start gap-2 text-sm text-foreground/90"
                          >
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-brand-whatsapp"
                              aria-hidden="true"
                            />
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="lg:col-span-5">
                      <div className="rounded-xl border border-border bg-muted/60 p-5">
                        <p className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                          Vehicles usually used
                        </p>

                        <ul className="mt-3 space-y-2.5">
                          {relatedVehicles.map((vehicle) => (
                            <li key={vehicle.slug}>
                              <Link
                                href={`/vehicles#${vehicle.slug}`}
                                className="flex items-baseline justify-between gap-3 rounded-md text-sm transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                              >
                                <span className="font-medium">{vehicle.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {vehicle.capacity}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
                          <Button
                            asChild
                            size="sm"
                            className="h-9 w-full rounded-lg"
                          >
                            <Link href={`/contact?service=${service.slug}`}>
                              Get a quote for this service
                              <ArrowRight aria-hidden="true" />
                            </Link>
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Not sure which service fits? Call{" "}
                            {siteConfig.phone}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Goods we transport"
            title="Not sure if we handle your material?"
            description="These are the categories we move regularly. If your goods are not listed, describe them in the enquiry form — we will tell you honestly whether we can take the job."
            align="center"
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {goodsCategories.map((category) => {
              const Icon = getIcon(category.icon)
              return (
                <li
                  key={category.name}
                  className="flex gap-4 rounded-xl border border-border bg-card p-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      <ContactCta
        title="Need a vehicle for your goods?"
        description="Share the load, the pickup point and the destination. We will recommend the right vehicle and confirm a clear price before dispatch."
      />
    </>
  )
}
