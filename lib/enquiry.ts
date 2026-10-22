import { z } from "zod"

/**
 * Validation schema for the transport enquiry form.
 *
 * The same schema is used for client-side validation and is ready to be
 * reused on the server (route handler) once a backend is connected.
 */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "Please keep the name under 80 characters"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a reachable phone number")
    .max(20, "Enter a reachable phone number")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
  pickupLocation: z
    .string()
    .trim()
    .min(2, "Enter the pickup location")
    .max(120, "Please keep the location under 120 characters"),
  deliveryLocation: z
    .string()
    .trim()
    .min(2, "Enter the delivery location")
    .max(120, "Please keep the location under 120 characters"),
  goodsType: z
    .string()
    .trim()
    .min(2, "Describe the goods you need transported")
    .max(120, "Please keep the goods description under 120 characters"),
  approximateWeight: z
    .string()
    .trim()
    .min(1, "Enter an approximate weight")
    .max(40, "Please keep the weight under 40 characters"),
  preferredVehicle: z.string().trim().optional(),
  preferredDate: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .max(600, "Please keep the message under 600 characters")
    .optional(),
})

export type EnquiryFormValues = z.infer<typeof enquirySchema>

export type EnquiryResult = {
  success: boolean
  message: string
}

/**
 * Submits the enquiry.
 *
 * There is no backend yet — the handler below is the single place where an
 * API route, an email service or a CRM integration should be plugged in.
 * It receives the validated values and returns a result the form renders.
 */
export async function submitEnquiry(
  values: EnquiryFormValues,
): Promise<EnquiryResult> {
  // TODO: replace this with a POST to an API route (for example
  // `fetch("/api/enquiries", { method: "POST", body: JSON.stringify(values) })`)
  // once a backend is available.
  void values

  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    success: true,
    message:
      "Thank you. Your enquiry has been recorded. Our team will call you back to confirm the vehicle and the price.",
  }
}

/** Builds a readable summary of the enquiry for a WhatsApp conversation. */
export const buildEnquirySummary = (values: EnquiryFormValues): string => {
  const lines = [
    "Hello, I would like to request a quote for goods transportation.",
    "",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
  ]

  if (values.email) lines.push(`Email: ${values.email}`)
  lines.push(`Pickup location: ${values.pickupLocation}`)
  lines.push(`Delivery location: ${values.deliveryLocation}`)
  lines.push(`Type of goods: ${values.goodsType}`)
  lines.push(`Approximate weight: ${values.approximateWeight}`)

  if (values.preferredVehicle)
    lines.push(`Preferred vehicle: ${values.preferredVehicle}`)
  if (values.preferredDate) lines.push(`Preferred date: ${values.preferredDate}`)
  if (values.message) lines.push("", `Notes: ${values.message}`)

  return lines.join("\n")
}
