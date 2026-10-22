import { HelpCircle } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { ContactCta } from "@/components/sections/contact-cta"
import { FaqAccordion } from "@/components/shared/faq-accordion"
import { PageHero } from "@/components/shared/page-hero"
import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { buildMetadata } from "@/config/site"
import { faqs } from "@/data/faq"

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions | Pricing, Vehicle Sizes & Timing",
  description:
    "Answers to common questions about goods transportation — how pricing works, which vehicle to use, how long a local move takes, packing guidance and booking process.",
  path: "/faq",
})

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Frequently asked questions"
        description="The things customers ask us most often. If your question is not here, call the dispatch desk and we will answer it directly."
        current="FAQ"
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Good to know"
                title="Before you call"
                description="These answers cover most of the common ground. Anything specific to your consignment is better discussed on a call."
              />

              <div className="mt-8 rounded-xl border border-border bg-muted/60 p-5">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <HelpCircle className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-heading text-base font-semibold">
                  Still have a question?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Send it through the enquiry form and we will reply on the
                  phone or by email, whichever suits you.
                </p>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="mt-4 h-9 w-full rounded-lg"
                >
                  <Link href="/contact#enquiry-form">Ask a question</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-8">
              <FaqAccordion items={faqs} multiple />
            </div>
          </div>
        </Container>
      </Section>

      <ContactCta
        title="Need an answer right now?"
        description="Call the dispatch desk during business hours and we will tell you exactly what your consignment will cost and when it can be picked up."
      />
    </>
  )
}
