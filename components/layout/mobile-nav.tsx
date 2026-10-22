"use client"

import { Clock, Mail, MapPin, Menu, Phone } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { mailtoUrl, telUrl, whatsappUrl } from "@/lib/whatsapp"

/**
 * Accessible mobile navigation built on the shadcn `Sheet` primitive.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon-lg"
          className="lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[88vw] max-w-sm p-0">
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle className="font-heading text-base font-bold">
            {siteConfig.name}
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Goods transportation across Mumbai, Navi Mumbai, Thane and
            Maharashtra.
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col gap-1">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      isActive(link.href)
                        ? "bg-primary/8 text-primary"
                        : "text-foreground hover:bg-muted",
                    )}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.title}
                    <span
                      aria-hidden="true"
                      className="text-muted-foreground"
                    >
                      ›
                    </span>
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-3 rounded-xl border border-border bg-muted/60 p-4">
            <p className="font-heading text-sm font-semibold">
              Talk to us directly
            </p>

            <a
              href={telUrl()}
              className="flex items-center gap-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Phone className="size-4 text-primary" aria-hidden="true" />
              {siteConfig.phone}
            </a>

            <a
              href={mailtoUrl()}
              className="flex items-center gap-3 text-sm break-all text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Mail className="size-4 text-primary" aria-hidden="true" />
              {siteConfig.email}
            </a>

            <p className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {siteConfig.address.line1}, {siteConfig.address.line2}
            </p>

            <p className="flex items-start gap-3 text-sm text-muted-foreground">
              <Clock className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {siteConfig.businessHours.weekdays}
            </p>
          </div>
        </nav>

        <div className="grid gap-2 border-t border-border p-4">
          <SheetClose asChild>
            <Button asChild size="lg" className="h-11 w-full">
              <Link href="/contact#enquiry-form">Get a Quote</Link>
            </Button>
          </SheetClose>

          <div className="grid grid-cols-2 gap-2">
            <SheetClose asChild>
              <Button asChild variant="outline" size="lg" className="h-11 w-full">
                <a href={telUrl()} aria-label={`Call ${siteConfig.name}`}>
                  <Phone aria-hidden="true" />
                  Call
                </a>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button
                asChild
                size="lg"
                className="h-11 w-full bg-brand-whatsapp text-brand-whatsapp-foreground hover:bg-brand-whatsapp/90"
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
                  WhatsApp
                </a>
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
