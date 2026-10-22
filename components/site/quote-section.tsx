"use client"

import { Clock, Mail, MapPin, Phone, Send } from "lucide-react"
import { motion } from "motion/react"
import { useState, type ComponentType } from "react"

import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { Reveal } from "@/components/site/motion"
import { siteConfig } from "@/config/site"
import { fleet } from "@/data/fleet"
import { cn } from "@/lib/utils"
import { GENERAL_ENQUIRY_MESSAGE, mailtoUrl, telUrl, whatsappUrl } from "@/lib/whatsapp"

const EASE = [0.22, 1, 0.36, 1] as const
const NOT_SURE = "Not sure"

const fieldClass =
  "w-full rounded-xl border border-foreground/10 bg-white/[0.04] px-4 py-3 text-sm placeholder:text-muted-foreground/70 transition-colors outline-none focus:border-brand-accent focus:bg-white/[0.06]"

/**
 * Contact section built around a quick quote: pickup, drop, truck and goods go
 * straight into a prefilled WhatsApp message. Direct call, chat and email
 * options sit alongside for people who would rather just talk.
 */
export function QuoteSection() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [truck, setTruck] = useState(NOT_SURE)
  const [goods, setGoods] = useState("")

  const message = [
    "Hello, I would like a quote for goods transportation.",
    from && `Pickup: ${from}`,
    to && `Drop: ${to}`,
    `Truck: ${truck}`,
    goods && `Goods: ${goods}`,
  ]
    .filter(Boolean)
    .join("\n")

  return (
    <section id="contact" className="scroll-mt-20 px-5 py-28 sm:px-8 sm:py-36">
      <div className="relative isolate overflow-hidden rounded-3xl border border-foreground/10 bg-white/[0.03] p-6 sm:p-10 lg:p-14">
        <div
          aria-hidden="true"
          className="absolute -top-1/3 -left-1/4 -z-10 size-[60rem] max-w-none rounded-full bg-[radial-gradient(closest-side,oklch(0.3_0.08_255/0.5),transparent)]"
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="text-sm text-muted-foreground uppercase">Contact</p>
              <h2 className="mt-3 font-display text-[13vw] leading-[0.85] sm:text-7xl">
                Need a <span className="text-brand-accent">truck?</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Fill in the quick quote and it lands in our WhatsApp, ready to reply. Or reach us
                directly. We usually respond within minutes during working hours.
              </p>
            </Reveal>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:[&>li:last-child]:col-span-2">
              <ContactTile
                index={0}
                href={whatsappUrl(GENERAL_ENQUIRY_MESSAGE)}
                external
                icon={WhatsAppIcon}
                label="WhatsApp"
                value="Chat now"
              />
              <ContactTile
                index={1}
                href={telUrl()}
                icon={Phone}
                label="Call"
                value={siteConfig.phone}
              />
              <ContactTile
                index={2}
                href={mailtoUrl()}
                icon={Mail}
                label="Email"
                value={siteConfig.email}
              />
            </ul>

            <Reveal delay={0.2} className="mt-10 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-accent" />
                {siteConfig.address.line1}, {siteConfig.address.line2}
              </p>
              <p className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-accent" />
                {siteConfig.businessHours.weekdays}
              </p>
            </Reveal>
          </div>

          <motion.form
            onSubmit={(event) => event.preventDefault()}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-2xl border border-foreground/10 bg-background/70 p-5 shadow-2xl backdrop-blur sm:p-7"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg sm:text-xl">Quick quote</h3>
              <span className="text-xs whitespace-nowrap text-muted-foreground">Takes 20 seconds</span>
            </div>

            <div className="relative mt-6 grid gap-3 pl-8">
              <RouteLine />
              <label className="sr-only" htmlFor="quote-from">
                Pickup location
              </label>
              <input
                id="quote-from"
                value={from}
                onChange={(event) => setFrom(event.target.value)}
                placeholder="Pickup — e.g. Andheri East"
                className={fieldClass}
              />
              <label className="sr-only" htmlFor="quote-to">
                Drop location
              </label>
              <input
                id="quote-to"
                value={to}
                onChange={(event) => setTo(event.target.value)}
                placeholder="Drop — e.g. Pune"
                className={fieldClass}
              />
            </div>

            <fieldset className="mt-6">
              <legend className="text-xs text-muted-foreground uppercase">Truck</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {[...fleet.map((item) => item.name), NOT_SURE].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setTruck(name)}
                    aria-pressed={truck === name}
                    className={cn(
                      "relative isolate rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                      truck === name
                        ? "border-transparent text-brand-accent-foreground"
                        : "border-foreground/15 text-foreground/80 hover:border-foreground/40",
                    )}
                  >
                    {truck === name ? (
                      <motion.span
                        layoutId="quote-truck"
                        className="absolute inset-0 -z-10 rounded-full bg-brand-accent"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{name}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <label
              className="mt-6 block text-xs text-muted-foreground uppercase"
              htmlFor="quote-goods"
            >
              Goods
            </label>
            <input
              id="quote-goods"
              value={goods}
              onChange={(event) => setGoods(event.target.value)}
              placeholder="e.g. 40 cartons, about 1 tonne"
              className={cn(fieldClass, "mt-3")}
            />

            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-4 text-sm font-semibold text-brand-accent-foreground shadow-[0_8px_30px_-8px_var(--brand-accent)] transition-transform hover:scale-[1.02]"
            >
              <WhatsAppIcon className="size-4" />
              Send quote request
              <Send className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Opens WhatsApp with your details filled in.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function ContactTile({
  index,
  href,
  external = false,
  icon: Icon,
  label,
  value,
}: {
  index: number
  href: string
  external?: boolean
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 + index * 0.08 }}
    >
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex h-full items-center gap-4 rounded-2xl border border-foreground/10 bg-white/[0.03] p-4 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand-accent/40"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
          <Icon className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs text-muted-foreground uppercase">{label}</span>
          <span className="block truncate text-sm font-semibold">{value}</span>
        </span>
      </a>
    </motion.li>
  )
}

/** Dotted line joining pickup and drop, with a dot travelling down it. */
function RouteLine() {
  return (
    <div aria-hidden="true" className="absolute top-5 bottom-5 left-2.5 w-px">
      <span className="absolute -top-1 -left-1 size-2.5 rounded-full border-2 border-foreground/60 bg-background" />
      <span className="absolute inset-0 border-l border-dashed border-foreground/25" />
      <motion.span
        className="absolute -left-[3px] size-[7px] rounded-full bg-brand-accent shadow-[0_0_10px_var(--brand-accent)]"
        animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
      />
      <MapPin className="absolute -bottom-2 -left-[7px] size-3.5 text-brand-accent" />
    </div>
  )
}
