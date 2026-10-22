import type { Metadata } from "next"

import { buildMetadata, formatAddress, siteConfig } from "@/config/site"
import { getCurrentYear } from "@/lib/date"

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms under which Advik Transport accepts goods transportation enquiries, quotes and consignments.",
  path: "/terms",
})

const sections = [
  {
    heading: "Scope of this website",
    body: [
      "This website is an informational site for a goods transportation business. It describes the services, fleet and areas covered, and it lets you make an enquiry.",
      "There is no online booking, no customer account and no payment system on this website. A quote shown on this website, or in a message, is an indication until it is confirmed by us in writing or over the phone.",
    ],
  },
  {
    heading: "Making an enquiry",
    body: [
      "When you call, email or WhatsApp us, you are asking for a quote. It is not a confirmed booking. Nothing is reserved, dispatched or scheduled until our team has confirmed the vehicle, the pickup slot and the price with you.",
      "We may decline an enquiry — for example because the vehicle is not available for the date, the material is outside what we handle, or the route is outside our service areas.",
    ],
  },
  {
    heading: "Quotes and pricing",
    body: [
      "Quoted prices are based on the information you give us — the load, the route, the pickup and delivery conditions, loading or unloading requirements and the date.",
      "If the consignment turns out to be materially different from what was described — more weight, a different route, extra waiting time or an unusual handling requirement — we will tell you before proceeding and ask you to confirm the revised price.",
      "Unless agreed otherwise in advance, the price covers vehicle hire for the agreed journey and does not include loading, unloading, tolls, permits or waiting charges.",
    ],
  },
  {
    heading: "Payment terms",
    body: [
      "Payment terms are agreed at the time of booking and will be confirmed in the quote. Unless a credit arrangement has been agreed in advance for regular customers, payment is due once the consignment has been delivered.",
      "This website does not process payments. Any request asking you to pay online through a link sent by a third party is not from us.",
    ],
  },
  {
    heading: "Your responsibilities",
    body: [
      "You are responsible for describing the consignment accurately, including its nature, weight, dimensions, fragile or hazardous characteristics and any special handling requirements.",
      "You are responsible for ensuring the goods are properly packed for transport and for making them ready for loading at the agreed time. Delay caused by the consignment not being ready may be charged as waiting time.",
    ],
  },
  {
    heading: "Goods handling and transit",
    body: [
      "Vehicles are checked before dispatch and loads are packed and secured before the vehicle moves. Delivery times are the best estimate we can give for the route and the traffic, and are not guaranteed unless we have confirmed a fixed window in writing.",
      "Goods are carried on a customer-acceptance basis. If you need formal transit insurance for a consignment, please tell us in advance so it can be arranged separately before dispatch.",
    ],
  },
  {
    heading: "Cancellations",
    body: [
      "A confirmed booking cancelled before the vehicle has been dispatched will normally carry no charge. If the vehicle has already left for the pickup point, costs incurred up to that point may be charged. Cancellations after dispatch are handled case by case.",
    ],
  },
  {
    heading: "Use of this website",
    body: [
      "The content on this website — text, photographs, branding and layout — belongs to the business or is used with permission. It may not be reproduced for commercial purposes without written consent.",
      "The placeholder photographs currently on this site are for layout and demonstration and may be replaced over time.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "Our liability in respect of a consignment is limited as permitted under the applicable law for road transport of goods. Nothing in these terms limits any liability that cannot legally be excluded.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "These terms may be updated from time to time. The date below shows when the current version was published. Bookings confirmed before a change will be governed by the terms in place when they were confirmed.",
    ],
  },
]

export default async function TermsPage() {
  const year = await getCurrentYear()

  return (
    <>
      <header className="mx-auto max-w-3xl px-5 pt-32 sm:px-8">
        <h1 className="font-display text-4xl sm:text-5xl">Terms of service</h1>
        <p className="mt-3 text-muted-foreground">What you can expect from us, and what we ask of you, when a consignment is arranged through this website.</p>
      </header>

      <div className="py-12">
        <div>
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <div className="rounded-xl border border-border bg-muted/60 p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {siteConfig.legalName} · {formatAddress()} · Last updated:{" "}
                {year}
              </p>
            </div>

            <div className="mt-10 space-y-10">
              {sections.map((section, index) => (
                <section key={section.heading}>
                  <h2 className="font-heading text-xl font-bold sm:text-2xl">
                    <span className="text-muted-foreground/50">
                      {String(index + 1).padStart(2, "0")}.
                    </span>{" "}
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="text-base leading-relaxed text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-xl border border-border p-6">
              <h2 className="font-heading text-lg font-bold">
                Questions about these terms?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Call {siteConfig.phone} or email {siteConfig.email} and we will
                explain how it applies to your consignment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
