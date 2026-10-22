import type { Metadata } from "next"

import { buildMetadata, formatAddress, siteConfig } from "@/config/site"
import { getCurrentYear } from "@/lib/date"

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Advik Transport collects, uses and protects the information you share through this website.",
  path: "/privacy",
})

const sections = [
  {
    heading: "Information we collect",
    body: [
      "This website does not ask you to create an account and there is no online booking or payment system. The only information we collect is what you choose to give us.",
      "When you call, email or WhatsApp us, we record only the details needed to arrange the consignment — typically your name, phone number, pickup and delivery locations, the type and approximate weight of the goods, and your preferred date.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "Your details are used for one purpose: to respond to your enquiry, arrange the vehicle and route, confirm the price and deliver your goods.",
      "We do not sell your information, and we do not share it with third parties for marketing. Where a third party is involved in fulfilling the request — for example a subcontracted vehicle for an unusually large load — the details needed for that job are shared with them and nobody else.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "This website does not use advertising cookies or cross-site tracking. If analytics are introduced in the future, they will be configured to measure page visits in aggregate and to respect the Do Not Track setting where your browser supports it.",
    ],
  },
  {
    heading: "How long we keep your information",
    body: [
      "Enquiry details are kept for as long as needed to handle the enquiry and to maintain a record of the business transaction. After that, they are removed or anonymised, except where we are legally required to keep a record.",
    ],
  },
  {
    heading: "Your choices and rights",
    body: [
      "You can ask us at any time to confirm what information we hold about you, to correct it, or to have it deleted. You can also ask us to stop contacting you about a previous enquiry.",
      `To make any of these requests, call us on ${siteConfig.phone}, WhatsApp the same number, or email ${siteConfig.email}. We will respond to the request as quickly as we can.`,
    ],
  },
  {
    heading: "Data security",
    body: [
      "Contact details are stored on secured business systems and are only accessible to the people who handle dispatch and customer enquiries. We review access regularly and revoke it when somebody leaves the team.",
    ],
  },
  {
    heading: "Third-party services",
    body: [
      "Some pages link to WhatsApp, a telephone app or an email client. Once you follow those links, your conversation is handled by that provider under their own privacy terms. We have no control over that data once it leaves this website.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this page from time to time as the website or the business changes. The 'last updated' date below always reflects the current version.",
    ],
  },
]

export default async function PrivacyPage() {
  const year = await getCurrentYear()

  return (
    <>
      <header className="mx-auto max-w-3xl px-5 pt-32 sm:px-8">
        <h1 className="font-display text-4xl sm:text-5xl">Privacy policy</h1>
        <p className="mt-3 text-muted-foreground">What we collect, why we collect it and what you can ask us to do about it.</p>
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
                Questions about this policy?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Call {siteConfig.phone} or email {siteConfig.email} and we will
                answer directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
