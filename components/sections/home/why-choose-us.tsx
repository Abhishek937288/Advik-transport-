import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { getIcon } from "@/components/shared/icon"
import { whyChooseUs } from "@/data/company"

/**
 * Why customers choose the business.
 *
 * The copy avoids unverifiable promises such as guaranteed delivery.
 */
export function WhyChooseUs() {
  return (
    <Section tone="muted" id="why-choose-us">
      <Container>
        <SectionHeading
          eyebrow="Why choose us"
          title="Straightforward transport, handled properly"
          description="Nothing here is a guarantee we cannot keep. It is simply how the work is done, every single time."
          align="center"
          id="why-choose-us-heading"
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => {
            const Icon = getIcon(item.icon)
            return (
              <li
                key={item.title}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-base font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
