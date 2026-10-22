import { Suspense } from "react"
import type { Metadata } from "next"

import { ContactDetails } from "@/components/sections/contact-details"
import { ContactCta } from "@/components/sections/contact-cta"
import { FaqAccordion } from "@/components/shared/faq-accordion"
import { PageHero } from "@/components/shared/page-hero"
import { Container, Section } from "@/components/shared/section"
import { EnquiryForm } from "@/components/shared/enquiry-form"
import { buildMetadata, siteConfig } from "@/config/site"
import { faqs } from "@/data/faq"
import { getServiceBySlug } from "@/data/services"
import { getVehicleBySlug } from "@/data/vehicles"
import type { EnquiryFormValues } from "@/lib/enquiry"

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Request a Transport Quote",
  description:
    "Contact Advik Transport for a goods transportation quote. Call, WhatsApp or fill the enquiry form with your pickup point, delivery point, goods type and preferred vehicle.",
  path: "/contact",
})

/** Skeleton shown while the URL parameters are resolved on the server. */
function EnquiryFormSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-border bg-card p-5 sm:p-7"
    >
      <div className="h-6 w-48 rounded bg-muted" />
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-11 w-full rounded-lg bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

/**
 * Reads the optional URL parameters and turns them into prefilled form values.
 */
async function EnquiryFormSection({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams

  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value

  const vehicle = getVehicleBySlug(first(params.vehicle) ?? "")
  const service = getServiceBySlug(first(params.service) ?? "")

  const from = first(params.from)
  const to = first(params.to)

  const defaultValues: Partial<EnquiryFormValues> = {
    preferredVehicle: vehicle?.name ?? "",
    pickupLocation: from ?? "",
    deliveryLocation: to ?? "",
    message: service
      ? `I would like to enquire about your ${service.name} service.`
      : "",
  }

  return (
    <div id="enquiry-form" className="scroll-mt-28">
      <h2 className="font-heading text-2xl font-bold sm:text-3xl">
        Request a quote
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Share the details of your consignment. The more precise the
        information, the more accurate the quote — but even an approximate
        weight and route is enough to start.
      </p>

      <div className="mt-6">
        <EnquiryForm defaultValues={defaultValues} />
      </div>
    </div>
  )
}

export default function ContactPage(props: PageProps<"/contact">) {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Tell us what needs to be moved"
        description={`Call ${siteConfig.phone}, send a WhatsApp message or fill in the enquiry form. We will confirm the vehicle, the schedule and the price for your consignment.`}
        current="Contact"
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <ContactDetails />
            </div>

            <div className="lg:col-span-7">
              <Suspense fallback={<EnquiryFormSkeleton />}>
                <EnquiryFormSection searchParams={props.searchParams} />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-heading text-2xl font-bold">
                Before you call
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                These are the details we need to quote a vehicle quickly. Have
                them ready and the conversation takes two minutes.
              </p>
            </div>

            <div className="lg:col-span-8">
              <FaqAccordion items={faqs.slice(0, 5)} multiple />
            </div>
          </div>
        </Container>
      </Section>

      <ContactCta
        title="Prefer to talk it through?"
        description="Some consignments need a quick conversation — unusual loads, tight delivery windows or site access. Call us and we will work it out together."
      />
    </>
  )
}
