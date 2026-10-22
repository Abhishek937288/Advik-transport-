import { Phone, Truck } from "lucide-react"
import Link from "next/link"

import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { Container } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { telUrl, whatsappUrl } from "@/lib/whatsapp"

export interface ContactCtaProps {
  title?: string
  description?: string
  className?: string
}

/**
 * High visibility contact band used at the bottom of the homepage and on
 * several inner pages.
 */
export function ContactCta({
  title = "Need a Vehicle for Your Goods?",
  description = "Share your load, pickup point and destination — we will confirm the right vehicle and a clear price. It is a quick conversation, not a form maze.",
  className,
}: ContactCtaProps) {
  return (
    <section
      aria-labelledby="contact-cta-heading"
      className={`relative overflow-hidden bg-brand text-brand-foreground ${className ?? ""}`}
    >
      <div aria-hidden="true" className="bg-grid-pattern absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-brand-accent"
      />

      <Container className="relative py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-foreground/10 text-brand-accent ring-1 ring-brand-foreground/15">
              <Truck className="size-6" aria-hidden="true" />
            </span>

            <h2
              id="contact-cta-heading"
              className="mt-5 font-heading text-3xl leading-tight font-bold text-balance sm:text-4xl"
            >
              {title}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-pretty text-brand-foreground/75">
              {description}
            </p>

            <p className="mt-4 text-sm text-brand-foreground/60">
              Prefer to talk? Call {siteConfig.phone} · {siteConfig.address.line2},{" "}
              {siteConfig.address.city}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-72">
            <Button
              asChild
              size="lg"
              className="h-12 w-full bg-brand-accent px-5 text-base text-brand-accent-foreground hover:bg-brand-accent/90"
            >
              <Link href="/contact#enquiry-form">Request a Quote</Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="h-12 w-full bg-brand-whatsapp px-5 text-base text-brand-whatsapp-foreground hover:bg-brand-whatsapp/90"
            >
              <a
                href={whatsappUrl(
                  "Hello, I would like to enquire about goods transportation.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
              >
                <WhatsAppIcon className="size-5" />
                WhatsApp Us
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 w-full border-brand-foreground/35 bg-transparent px-5 text-base text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground"
            >
              <a
                href={telUrl()}
                aria-label={`Call ${siteConfig.name} on ${siteConfig.phone}`}
              >
                <Phone className="size-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
