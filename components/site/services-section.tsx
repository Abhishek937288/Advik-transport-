"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

import { getIcon } from "@/components/shared/icon"
import { Reveal } from "@/components/site/motion"
import { services } from "@/data/services"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Services: a sticky intro on the left and the list of services on the right.
 * Rows slide in one after another, and on hover a panel sweeps in behind the
 * row while its icon turns gold.
 */
export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 overflow-x-clip px-5 py-28 sm:px-8 sm:py-36">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="text-sm text-muted-foreground uppercase">Services</p>
            <h2 className="mt-3 font-display text-4xl leading-[0.95] sm:text-6xl">
              What we move, and how
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Local runs across the city, full trucks to other cities and shared loads for smaller
              consignments. One call covers all of it.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/30 px-6 py-3 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
            >
              All services
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <ul className="border-t border-foreground/10">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon)
            return (
              <motion.li
                key={service.slug}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE, delay: (index % 3) * 0.08 }}
                className="border-b border-foreground/10"
              >
                <Link
                  href="/services"
                  className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-5 overflow-hidden px-2 py-6 sm:px-4"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-brand-accent/[0.12] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                  <span className="flex size-11 items-center justify-center rounded-xl border border-foreground/10 bg-white/[0.04] transition-[background-color,border-color,color,transform] duration-500 group-hover:-rotate-6 group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-brand-accent-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-lg sm:text-2xl">{service.name}</span>
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                      {service.shortDescription}
                    </span>
                    <span className="mt-3 inline-block text-xs text-brand-accent">
                      {service.availability}
                    </span>
                  </span>
                  <ArrowRight className="mt-3 size-5 -translate-x-2 text-brand-accent opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
