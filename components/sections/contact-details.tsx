import { Clock, Mail, MapPin, Phone } from "lucide-react"

import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { mailtoUrl, telUrl, whatsappUrl } from "@/lib/whatsapp"

const detailRows = [
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: telUrl(),
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Send a message",
    href: whatsappUrl(
      "Hello, I would like to enquire about goods transportation.",
    ),
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: mailtoUrl(),
  },
  {
    icon: MapPin,
    label: "Office address",
    value: `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city} - ${siteConfig.address.postalCode}`,
  },
  {
    icon: Clock,
    label: "Business hours",
    value: `${siteConfig.businessHours.weekdays}. ${siteConfig.businessHours.sunday}.`,
  },
]

/**
 * Contact details card used on the contact page.
 */
export function ContactDetails({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardContent className="space-y-1">
        <h2 className="font-heading text-lg font-bold">
          Talk to the transport desk
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Call or WhatsApp for the fastest response. For a written quote with
          all the details, use the enquiry form.
        </p>

        <dl className="mt-6 divide-y divide-border">
          {detailRows.map((row) => {
            const content = (
              <>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <row.icon className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <dt className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                    {row.label}
                  </dt>
                  <dd className="mt-0.5 text-sm leading-relaxed break-words">
                    {row.value}
                  </dd>
                </span>
              </>
            )

            return (
              <div key={row.label} className="flex gap-3 py-4 first:pt-0">
                {row.href ? (
                  <a
                    href={row.href}
                    {...("external" in row && row.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex w-full gap-3 rounded-md transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex w-full gap-3">{content}</div>
                )}
              </div>
            )
          })}
        </dl>
      </CardContent>
    </Card>
  )
}
