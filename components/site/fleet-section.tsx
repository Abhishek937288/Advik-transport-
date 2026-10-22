"use client"

import { ArrowUpRight, MessageCircleQuestion } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"

import { SectionTitle } from "@/components/site/motion"
import { fleet } from "@/data/fleet"
import { GENERAL_ENQUIRY_MESSAGE, vehicleEnquiryMessage, whatsappUrl } from "@/lib/whatsapp"

const EASE = [0.22, 1, 0.36, 1] as const

const cardMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
}

/**
 * Fleet cards: each truck drives onto its card as it scrolls in, and on hover
 * it rolls forward with speed lines streaking out behind it.
 */
export function FleetSection() {
  return (
    <section id="fleet" className="scroll-mt-20 px-5 py-28 sm:px-8 sm:py-36">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle eyebrow="Fleet" title="A truck for every load" />
        <motion.p
          className="max-w-xs text-sm leading-relaxed text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          From a single carton to a full site delivery, pick the size that fits and we send it to
          your door.
        </motion.p>
      </div>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fleet.map((truck, index) => (
          <motion.li
            key={truck.name}
            {...cardMotion}
            transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.1 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-white/[0.03] p-6 transition-[border-color,transform,background-color] duration-500 hover:-translate-y-1.5 hover:border-brand-accent/40 hover:bg-white/[0.05]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs text-brand-accent">
                {truck.capacity}
              </span>
            </div>

            <div className="relative mt-4 py-4">
              <div
                aria-hidden="true"
                className="absolute inset-x-6 top-1/2 h-2/3 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.42_0.11_255/0.45),transparent)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
              />
              <SpeedLines />
              <motion.div
                initial={{ opacity: 0, x: -120 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 16,
                  delay: 0.15 + (index % 3) * 0.1,
                }}
              >
                <Image
                  src={truck.image}
                  alt={`${truck.name} truck`}
                  width={456}
                  height={337}
                  sizes="(max-width: 640px) 90vw, 30vw"
                  className="relative mx-auto w-4/5 drop-shadow-[0_18px_22px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-out group-hover:translate-x-4"
                />
              </motion.div>
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-3 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
              />
            </div>

            <h3 className="mt-4 font-display text-2xl">{truck.name}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{truck.use}</p>

            <a
              href={whatsappUrl(vehicleEnquiryMessage(truck.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-accent"
            >
              Book this truck
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.li>
        ))}

        <motion.li
          {...cardMotion}
          transition={{ duration: 0.7, ease: EASE, delay: (fleet.length % 3) * 0.1 }}
          className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-brand-accent p-6 text-brand-accent-foreground"
        >
          <motion.span
            aria-hidden="true"
            className="absolute -top-16 -right-16 size-48 rounded-full border-[28px] border-brand-accent-foreground/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          />
          <MessageCircleQuestion className="size-8" />
          <div className="mt-16">
            <h3 className="font-display text-2xl">Not sure which one?</h3>
            <p className="mt-2 text-sm opacity-80">
              Tell us what you are moving and where. We will suggest the right truck and a fair
              price.
            </p>
            <a
              href={whatsappUrl(GENERAL_ENQUIRY_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-brand-accent-foreground px-5 py-2.5 text-sm font-semibold text-brand-accent transition-transform hover:scale-105"
            >
              Ask us on WhatsApp
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.li>
      </ul>
    </section>
  )
}

/** Gold streaks behind the truck that shoot out while its card is hovered. */
function SpeedLines() {
  return (
    <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1/3">
      {[38, 52, 66].map((top, index) => (
        <span
          key={top}
          style={{ top: `${top}%`, transitionDelay: `${index * 60}ms` }}
          className="absolute right-0 h-0.5 w-full origin-right scale-x-0 rounded-full bg-gradient-to-l from-brand-accent to-transparent opacity-0 transition-[transform,opacity] duration-500 group-hover:scale-x-100 group-hover:opacity-80"
        />
      ))}
    </div>
  )
}
