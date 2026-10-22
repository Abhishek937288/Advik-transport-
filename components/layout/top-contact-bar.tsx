import { Clock, Mail, Phone } from "lucide-react"

import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { Container } from "@/components/shared/section"
import { siteConfig } from "@/config/site"
import { mailtoUrl, telUrl, whatsappUrl } from "@/lib/whatsapp"

/**
 * Slim contact bar shown above the main navigation.
 *
 * On large screens it shows the full business details, on smaller screens a
 * condensed version with just the phone number and quick actions.
 */
export function TopContactBar() {
  return (
    <div className="hidden border-b border-brand-foreground/10 bg-brand-deep text-brand-foreground md:block">
      <Container className="flex h-11 items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-6 text-sm">
          <a
            href={telUrl()}
            className="inline-flex items-center gap-2 transition-colors hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
          >
            <Phone className="size-4 shrink-0" aria-hidden="true" />
            <span className="font-medium">{siteConfig.phone}</span>
          </a>

          <a
            href={mailtoUrl()}
            className="inline-flex items-center gap-2 transition-colors hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            <span>{siteConfig.email}</span>
          </a>

          <span className="inline-flex items-center gap-2 text-brand-foreground/70">
            <Clock className="size-4 shrink-0" aria-hidden="true" />
            <span>{siteConfig.businessHours.weekdays}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl(
              "Hello, I would like to enquire about goods transportation.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-2 rounded-md bg-brand-whatsapp px-3 text-sm font-semibold text-brand-whatsapp-foreground transition-colors hover:bg-brand-whatsapp/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            <WhatsAppIcon className="size-4" aria-hidden="true" />
            WhatsApp
          </a>
          <a
            href={telUrl()}
            className="inline-flex h-8 items-center gap-2 rounded-md bg-brand-accent px-3 text-sm font-semibold text-brand-accent-foreground transition-colors hover:bg-brand-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call Now
          </a>
        </div>
      </Container>
    </div>
  )
}
