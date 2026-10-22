import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { ContactCta } from "@/components/sections/contact-cta"
import { getIcon } from "@/components/shared/icon"
import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { buildMetadata, siteConfig } from "@/config/site"
import {
  companyHistory,
  companyValues,
  missionAndVision,
  whyChooseUs,
} from "@/data/company"

export const metadata: Metadata = buildMetadata({
  title: "About Our Goods Transport Business",
  description:
    "Learn about Advik Transport — more than a decade of goods transportation across Mumbai, Navi Mumbai, Thane and Maharashtra, with a focus on safe handling and clear communication.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-deep py-14 text-brand-foreground sm:py-16 lg:py-20">
        <div aria-hidden="true" className="bg-grid-pattern absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 bg-brand-accent"
        />

        <Container className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.18em] text-brand-accent uppercase">
              About the business
            </p>
            <h1 className="mt-3 font-heading text-3xl leading-[1.15] font-bold text-balance sm:text-4xl lg:text-5xl">
              A goods carrier built around dependable dispatch
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-brand-foreground/75 sm:text-lg">
              {siteConfig.name} has been moving goods across the Mumbai
              Metropolitan Region and beyond since {siteConfig.foundedYear}. We
              started with one truck and a simple promise — deliver the
              consignment safely, on the agreed date, and keep the customer
              informed.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-brand-foreground/15">
              <Image
                src="/images/about/warehouse.jpg"
                alt="Warehouse godown operated by Advik Transport"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Our story"
                title="From one truck to a fleet that serves the region"
                description="The business grew the way most transport businesses do — by taking on work that needed care, and referring the next job to someone who was happy with the last one."
              />

              <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Today we operate a mixed fleet — mini trucks for quick city
                  drops, mid-size bodies for commercial consignments and
                  container trucks for full loads and industrial material. Every
                  vehicle is matched to the load and the road rather than sent
                  as a one-size-fits-all option.
                </p>
                <p>
                  We work with retailers, distributors, builders, workshops,
                  warehouses and households. Some of them have been with us for
                  years on a scheduled basis; others call us for a single
                  consignment. Both are treated the same way.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border bg-muted">
                <Image
                  src="/images/about/team.jpg"
                  alt="Dispatch team coordinating vehicle bookings at Advik Transport"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Our journey"
            title="How the business grew"
            align="center"
          />

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companyHistory.map((entry) => (
              <li
                key={entry.year}
                className="relative rounded-xl border border-border bg-card p-6"
              >
                <span className="font-heading text-2xl font-bold text-brand-accent">
                  {entry.year}
                </span>
                <h3 className="mt-2 font-heading text-base font-semibold">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {missionAndVision.map((item) => {
              const Icon = getIcon(item.icon)
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-7"
                >
                  <span className="flex size-12 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-heading text-xl font-bold">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="What we stand for"
              title="Values that decide how a job is handled"
              align="center"
            />

            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {companyValues.map((value) => {
                const Icon = getIcon(value.icon)
                return (
                  <li
                    key={value.title}
                    className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
                  >
                    <span className="flex size-10 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-heading text-base font-semibold">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="brand">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Experience & safety"
                title="How a consignment is actually handled"
                inverted
              />

              <div className="mt-8 space-y-6 text-brand-foreground/75">
                <div>
                  <h3 className="font-heading text-base font-semibold text-brand-foreground">
                    Transportation experience
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">
                    Our drivers work the industrial areas, market roads and site
                    access points across the region daily. They know which
                    routes are practical for a loaded body and which are not.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-base font-semibold text-brand-foreground">
                    Safety approach
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">
                    Vehicles are checked before dispatch, loads are packed and
                    tied down before the vehicle moves, and the driver is
                    briefed on the nature of the consignment and the delivery
                    point.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-base font-semibold text-brand-foreground">
                    Communication
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">
                    There is no tracking portal to log into. You call us, and a
                    person on the dispatch desk keeps you informed until the
                    goods are delivered.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Why customers choose us"
                title="Reasons businesses keep coming back"
                inverted
              />

              <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {whyChooseUs.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-foreground/10 text-brand-accent">
                      <span className="text-sm font-bold" aria-hidden="true">
                        ✓
                      </span>
                    </span>
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-brand-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-brand-foreground/70">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-2xl border border-border bg-muted/60 p-8 sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold">
                  Business at a glance
                </h2>
                <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
                  {siteConfig.stats.map((stat) => (
                    <div key={stat.label}>
                      <dd className="font-heading text-3xl font-bold text-primary">
                        {stat.value}
                      </dd>
                      <dt className="mt-1 text-sm text-muted-foreground">
                        {stat.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>

              <Button asChild size="lg" className="h-12 shrink-0 px-6">
                <Link href="/contact#enquiry-form">
                  Talk to Us
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <ContactCta />
    </>
  )
}
