import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { FaqAccordion } from "@/components/shared/faq-accordion"
import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { faqs } from "@/data/faq"

/**
 * Frequently asked questions with a link to the full FAQ page.
 */
export function Faq() {
  return (
    <Section tone="muted" id="faq">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions about our transport service"
              description="If your question is not answered here, call us or send a WhatsApp message — we answer directly."
              id="faq-heading"
            />

            <Button asChild variant="outline" className="mt-6 h-11 px-5">
              <Link href="/faq">
                All Questions
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="lg:col-span-8">
            <FaqAccordion items={faqs.slice(0, 6)} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
