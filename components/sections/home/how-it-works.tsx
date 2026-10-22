import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { getIcon } from "@/components/shared/icon"
import { processSteps } from "@/data/company"

/**
 * The four step process.
 *
 * Makes it clear that transportation is arranged by speaking directly with the
 * business rather than through an online booking flow.
 */
export function HowItWorks() {
  return (
    <Section tone="brand" id="how-it-works">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Four simple steps from enquiry to delivery"
          description="There is no booking portal to register for. You call or WhatsApp us, we agree the details, and the vehicle is dispatched."
          inverted
          id="how-it-works-heading"
        />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = getIcon(step.icon)
            return (
              <li key={step.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-foreground/10 text-brand-accent ring-1 ring-brand-foreground/15">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-3xl font-bold text-brand-foreground/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-lg font-semibold text-brand-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-foreground/70">
                  {step.description}
                </p>
              </li>
            )
          })}
        </ol>
      </Container>
    </Section>
  )
}
