"use client"

import { Phone } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Logo } from "@/components/layout/logo"
import { MobileNav } from "@/components/layout/mobile-nav"
import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { telUrl, whatsappUrl } from "@/lib/whatsapp"

/**
 * Sticky main navigation.
 *
 * Desktop shows the full link list with the primary "Get a Quote" CTA and a
 * quick call button. Mobile collapses to the `Sheet` based menu.
 */
export function SiteHeader() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-18 lg:px-8">
        <Logo />

        <nav
          aria-label="Main"
          className="hidden items-center gap-0.5 lg:flex"
        >
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.title}
              {isActive(link.href) ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-accent"
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="hidden h-10 xl:inline-flex"
          >
            <a
              href={telUrl()}
              aria-label={`Call ${siteConfig.name} on ${siteConfig.phone}`}
            >
              <Phone aria-hidden="true" />
              {siteConfig.phone}
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            className="hidden h-10 bg-brand-whatsapp text-brand-whatsapp-foreground hover:bg-brand-whatsapp/90 sm:inline-flex"
          >
            <a
              href={whatsappUrl(
                "Hello, I would like to enquire about goods transportation.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
            >
              <WhatsAppIcon className="size-4" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
          </Button>

          <Button asChild size="lg" className="h-10">
            <Link href="/contact#enquiry-form">
              <span className="hidden sm:inline">Get a Quote</span>
              <span className="sm:hidden">Quote</span>
            </Link>
          </Button>

          <MobileNav />
        </div>
      </div>
    </header>
  )
}
