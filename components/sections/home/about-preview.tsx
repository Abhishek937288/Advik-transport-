import { ArrowRight, ShieldCheck, Truck, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Section, Container } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

const pillars = [
  {
    icon: Truck,
    title: "Experience on the road",
    description:
      "More than a decade of moving goods across the Mumbai Metropolitan Region and the state highways.",
  },
  {
    icon: ShieldCheck,
    title: "Safety and reliability focus",
    description:
      "Goods are secured before the vehicle moves and every consignment is tracked by our dispatch desk.",
  },
  {
    icon: Users,
    title: "People you can reach",
    description:
      "One point of contact answers your calls, confirms the vehicle and updates you until delivery.",
  },
]

/**
 * Short introduction to the company with a link to the About page.
 */
export function AboutPreview() {
  return (
    <Section tone="muted">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border bg-muted">
            <Image
              src="/images/about/fleet.jpg"
              alt="Fleet of goods carrier vehicles parked at the Advik Transport yard"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -right-3 -bottom-6 hidden rounded-xl border border-border bg-background p-5 shadow-lg sm:block">
            <p className="font-heading text-3xl font-bold text-primary">
              {siteConfig.foundedYear}
            </p>
            <p className="mt-1 max-w-[10rem] text-xs leading-snug text-muted-foreground">
              Serving businesses across Maharashtra since the first truck.
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="About the business"
            title="A goods carrier built around dependable dispatch"
            description={`${siteConfig.name} started with one truck and a simple promise: move the consignment safely, on the agreed date, and keep the customer informed. That is still how every job runs.`}
          />

          <ul className="mt-8 space-y-5">
            {pillars.map((pillar) => (
              <li key={pillar.title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <pillar.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Button asChild size="lg" className="mt-8 h-11 px-5">
            <Link href="/about">
              Learn More
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
