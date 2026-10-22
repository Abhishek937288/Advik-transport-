import { Clock, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

import { Logo } from "@/components/layout/logo"
import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { Container } from "@/components/shared/section"
import { socialIcons } from "@/components/shared/brand-icons"
import { siteConfig } from "@/config/site"
import { serviceAreas } from "@/data/service-areas"
import { getCurrentYear } from "@/lib/date"
import { mailtoUrl, telUrl, whatsappUrl } from "@/lib/whatsapp"

export async function SiteFooter() {
  const year = await getCurrentYear()

  return (
    <footer className="bg-brand-deep text-brand-foreground">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo inverted />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-foreground/70">
              {siteConfig.description}
            </p>

            <div className="mt-6 flex items-center gap-2">
              {siteConfig.social.map((social) => {
                const SocialIcon = socialIcons[social.icon]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} on ${social.label}`}
                    className="flex size-10 items-center justify-center rounded-lg ring-1 ring-brand-foreground/15 transition-colors hover:bg-brand-foreground/10 hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                  >
                    <SocialIcon className="size-4" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-heading text-sm font-semibold tracking-[0.12em] uppercase">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-foreground/70 transition-colors hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-heading text-sm font-semibold tracking-[0.12em] uppercase">
              Our Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.footerServices.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-brand-foreground/70 transition-colors hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-heading text-sm font-semibold tracking-[0.12em] uppercase">
              Service Areas
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/service-areas#${area.slug}`}
                    className="inline-flex rounded-full border border-brand-foreground/15 px-3 py-1.5 text-xs text-brand-foreground/75 transition-colors hover:border-brand-accent/60 hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-heading text-sm font-semibold tracking-[0.12em] uppercase">
              Get in Touch
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={telUrl()}
                  className="flex items-start gap-3 text-brand-foreground/75 transition-colors hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                >
                  <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl(
                    "Hello, I would like to enquire about goods transportation.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-brand-foreground/75 transition-colors hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                >
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={mailtoUrl()}
                  className="flex items-start gap-3 break-all text-brand-foreground/75 transition-colors hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                >
                  <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-brand-foreground/75">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                  {siteConfig.address.city} - {siteConfig.address.postalCode}
                </span>
              </li>
              <li className="flex items-start gap-3 text-brand-foreground/75">
                <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {siteConfig.businessHours.weekdays}
                  <br />
                  {siteConfig.businessHours.sunday}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-brand-foreground/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-brand-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
