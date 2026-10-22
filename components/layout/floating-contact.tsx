import { Phone } from "lucide-react"

import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { siteConfig } from "@/config/site"
import { telUrl, whatsappUrl } from "@/lib/whatsapp"

/**
 * Floating quick-contact controls.
 *
 * They are hidden on the smallest screens (where the sticky header already
 * offers the same actions) and never overlap the main content column.
 */
export function FloatingContact() {
  return (
    <div className="fixed right-4 bottom-5 z-30 hidden flex-col gap-3 sm:flex">
      <a
        href={whatsappUrl(
          "Hello, I would like to enquire about goods transportation.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
        className="flex size-12 items-center justify-center rounded-full bg-brand-whatsapp text-brand-whatsapp-foreground shadow-lg shadow-black/15 ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent active:scale-95"
      >
        <WhatsAppIcon className="size-6" aria-hidden="true" />
      </a>

      <a
        href={telUrl()}
        aria-label={`Call ${siteConfig.name} on ${siteConfig.phone}`}
        className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-black/15 ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent active:scale-95"
      >
        <Phone className="size-5" aria-hidden="true" />
      </a>
    </div>
  )
}
