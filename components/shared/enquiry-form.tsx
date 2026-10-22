"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, Send } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/config/site"
import { vehicles } from "@/data/vehicles"
import {
  buildEnquirySummary,
  enquirySchema,
  submitEnquiry,
  type EnquiryFormValues,
} from "@/lib/enquiry"
import { whatsappUrl } from "@/lib/whatsapp"

export interface EnquiryFormProps {
  /** Values prefilled from the URL, e.g. a selected vehicle or route. */
  defaultValues?: Partial<EnquiryFormValues>
}

type SubmitStatus = { state: "idle" | "submitting" | "success" | "error"; message?: string }

const emptyValues: EnquiryFormValues = {
  name: "",
  phone: "",
  email: "",
  pickupLocation: "",
  deliveryLocation: "",
  goodsType: "",
  approximateWeight: "",
  preferredVehicle: "",
  preferredDate: "",
  message: "",
}

/**
 * Transport enquiry form.
 *
 * Client-side validation only for now. The submit handler calls
 * `submitEnquiry()` from `lib/enquiry.ts`, which is the single place where a
 * backend, email service or CRM integration can be connected later.
 */
export function EnquiryForm({ defaultValues }: EnquiryFormProps) {
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" })

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
    defaultValues: { ...emptyValues, ...defaultValues },
  })

  const onSubmit = async (values: EnquiryFormValues) => {
    setStatus({ state: "submitting" })
    try {
      const result = await submitEnquiry(values)
      setStatus({
        state: result.success ? "success" : "error",
        message: result.message,
      })
    } catch {
      setStatus({
        state: "error",
        message:
          "We could not record the enquiry right now. Please call or WhatsApp us and we will help you directly.",
      })
    }
  }

  const onWhatsApp = (values: EnquiryFormValues) => {
    window.open(whatsappUrl(buildEnquirySummary(values)), "_blank", "noopener,noreferrer")
  }

  if (status.state === "success") {
    return (
      <div className="rounded-xl border border-brand-whatsapp/40 bg-brand-whatsapp/5 p-6 text-center sm:p-8">
        <CheckCircle2
          className="mx-auto size-10 text-brand-whatsapp"
          aria-hidden="true"
        />
        <h3 className="mt-4 font-heading text-xl font-bold">
          Enquiry received
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {status.message}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Need it sooner? Call{" "}
          <a
            href={`tel:${siteConfig.phoneHref}`}
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            {siteConfig.phone}
          </a>
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-5 rounded-xl border border-border bg-card p-5 sm:p-7"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your full name"
                    autoComplete="name"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (optional)</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="pickupLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Area / address in Mumbai"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliveryLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Destination city or locality"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="goodsType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type of Goods</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Packed cartons, machinery"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="approximateWeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approximate Weight</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 2 tonnes"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="preferredVehicle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Vehicle (optional)</FormLabel>
                <Select
                  value={field.value ?? ""}
                  onValueChange={(value) =>
                    field.onChange(value === "none" ? "" : value)
                  }
                >
                  <FormControl>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="No preference">
                        {field.value || undefined}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">No preference</SelectItem>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.slug} value={vehicle.name}>
                        {vehicle.name} — {vehicle.capacity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Not sure? Leave it and we will suggest the right vehicle.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Date (optional)</FormLabel>
                <FormControl>
                  <Input type="date" className="h-11" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (optional)</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Anything else we should know — packing details, timing, site access, etc."
                  className="min-h-28"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {status.state === "error" && status.message ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive"
          >
            {status.message}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">
          <Button
            type="submit"
            size="lg"
            className="h-11 px-6"
            disabled={status.state === "submitting"}
          >
            <Send aria-hidden="true" />
            {status.state === "submitting" ? "Sending…" : "Request a Quote"}
          </Button>

          <Button
            type="button"
            size="lg"
            variant="outline"
            className="h-11 border-brand-whatsapp/40 px-6 text-brand-whatsapp hover:bg-brand-whatsapp/10"
            onClick={form.handleSubmit(onWhatsApp)}
          >
            <WhatsAppIcon className="size-4" />
            Send on WhatsApp
          </Button>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          This form is for enquiries only. We will use your details to respond
          to your request — no account is created and nothing is stored on this
          website.
        </p>
      </form>
    </Form>
  )
}
