import { siteConfig } from "@/config/site"

/**
 * Builds a WhatsApp click-to-chat link with a prefilled message.
 *
 * The WhatsApp number lives in a single place (`config/site.ts`), so it can be
 * changed without touching any component.
 *
 * @param message - Text prefilled in the WhatsApp chat.
 * @param number  - Optional override of the configured WhatsApp number.
 */
export const whatsappUrl = (
  message: string,
  number: string = siteConfig.whatsapp,
): string => {
  const digits = number.replace(/\D/g, "")
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

/** Default message used by generic "enquire" buttons. */
export const GENERAL_ENQUIRY_MESSAGE =
  "Hello, I would like to enquire about goods transportation."

/** Prefilled message for a specific vehicle. */
export const vehicleEnquiryMessage = (vehicleName: string): string =>
  `Hello, I would like to enquire about the ${vehicleName} for goods transportation.`

/** Prefilled message for a specific route. */
export const routeEnquiryMessage = (from: string, to: string): string =>
  `Hello, I need goods transportation from ${from} to ${to}. Please share the details.`

/** Prefilled message for a specific service. */
export const serviceEnquiryMessage = (serviceName: string): string =>
  `Hello, I would like to know more about your ${serviceName} service.`

/** Prefilled message for a general quote request. */
export const quoteRequestMessage = (): string =>
  "Hello, I would like to request a quote for goods transportation. Please share the details."

/** `tel:` link for the configured business phone number. */
export const telUrl = (number: string = siteConfig.phoneHref): string =>
  `tel:${number.replace(/[^\d+]/g, "")}`

/** `mailto:` link for the configured business email address. */
export const mailtoUrl = (email: string = siteConfig.email): string =>
  `mailto:${email}`

/**
 * Builds a `mailto:` link with a prefilled subject and body. Useful for the
 * "Email us" CTAs where a little context helps the business inbox.
 */
export const emailWithBodyUrl = ({
  subject,
  body,
  email = siteConfig.email,
}: {
  subject: string
  body: string
  email?: string
}): string =>
  `mailto:${email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
