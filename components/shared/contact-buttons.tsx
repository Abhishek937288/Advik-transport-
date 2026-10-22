import { Mail, Phone } from "lucide-react"
import Link from "next/link"

import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  GENERAL_ENQUIRY_MESSAGE,
  mailtoUrl,
  telUrl,
  whatsappUrl,
} from "@/lib/whatsapp"

export type ContactButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"

export interface ContactButtonProps {
  className?: string
  variant?: ContactButtonVariant
  size?: "default" | "sm" | "lg"
}

const ctaHeight = (size: ContactButtonProps["size"]) =>
  size === "sm" ? "h-9 px-4" : "h-11 px-5"

/** Call the business — renders a `tel:` link. */
export function CallButton({
  className,
  variant = "outline",
  size = "lg",
}: ContactButtonProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(ctaHeight(size), className)}
    >
      <a
        href={telUrl()}
        aria-label={`Call ${siteConfig.name} on ${siteConfig.phone}`}
      >
        <Phone aria-hidden="true" />
        Call Now
      </a>
    </Button>
  )
}

/** Open WhatsApp with a prefilled message. */
export function WhatsAppButton({
  className,
  message = GENERAL_ENQUIRY_MESSAGE,
  variant = "default",
  size = "lg",
}: ContactButtonProps & { message?: string }) {
  const isSolid = variant === "default"

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(
        ctaHeight(size),
        isSolid
          ? "bg-brand-whatsapp text-brand-whatsapp-foreground hover:bg-brand-whatsapp/90"
          : "border-brand-whatsapp/40 text-brand-whatsapp hover:bg-brand-whatsapp/10",
        className,
      )}
    >
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
      >
        <WhatsAppIcon className="size-4" />
        WhatsApp Us
      </a>
    </Button>
  )
}

/** Send an email to the business. */
export function EmailButton({
  className,
  variant = "outline",
  size = "lg",
}: ContactButtonProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(ctaHeight(size), className)}
    >
      <a
        href={mailtoUrl()}
        aria-label={`Email ${siteConfig.name} at ${siteConfig.email}`}
      >
        <Mail aria-hidden="true" />
        Email Us
      </a>
    </Button>
  )
}

/** Send the visitor to the enquiry form to request a quote. */
export function QuoteButton({
  className,
  variant = "default",
  size = "lg",
  href = "/contact#enquiry-form",
}: ContactButtonProps & { href?: string }) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(ctaHeight(size), className)}
    >
      <Link href={href}>Get a Quote</Link>
    </Button>
  )
}
