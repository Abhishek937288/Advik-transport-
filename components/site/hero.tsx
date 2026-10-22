"use client"

import { ChevronsRight, MapPin } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { LottieTruck } from "@/components/site/lottie-truck"
import { siteConfig } from "@/config/site"
import { fleet } from "@/data/fleet"
import { routes, serviceAreas } from "@/data/service-areas"
import { cn } from "@/lib/utils"
import { GENERAL_ENQUIRY_MESSAGE, telUrl, whatsappUrl } from "@/lib/whatsapp"

const EASE = [0.22, 1, 0.36, 1] as const
/** Seconds each truck stays on stage before the next one pulls in. */
const TRUCK_INTERVAL = 4

const headline = [
  { text: "Your goods," },
  { text: "on the road" },
  { text: "today.", accent: true },
]

/**
 * Home page hero: headline and calls to action on the left, a showcase of the
 * fleet driving in and out on the right, and a ticker of service areas along
 * the bottom.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"])
  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])

  const delay = (seconds: number) => (reduceMotion ? 0 : seconds)

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-24 sm:pt-28"
    >
      <Backdrop />

      <div className="grid flex-1 items-center gap-12 px-5 pb-12 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <motion.div style={{ y: stageY }}>
          <TruckShowcase />
        </motion.div>

        <motion.div style={{ y: copyY }}>
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1.5 text-xs text-muted-foreground backdrop-blur"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-brand-whatsapp opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-whatsapp" />
            </span>
            Trucks available today · {siteConfig.address.city}
          </motion.p>

          <h1 className="mt-6 font-display text-[12.5vw] leading-[0.92] sm:text-[9vw] lg:text-[4.7vw]">
            {headline.map((line, index) => (
              <span key={line.text} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={cn("relative inline-block", line.accent && "text-brand-accent")}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: delay(0.15 + index * 0.12) }}
                >
                  {line.text}
                  {line.accent ? <Swoosh delay={delay(0.9)} /> : null}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: delay(0.6) }}
          >
            {siteConfig.name} moves cartons, machinery and site material across{" "}
            {siteConfig.primaryArea} and the rest of {siteConfig.region}, with the right truck at
            your door when you need it.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: delay(0.72) }}
          >
            <a
              href={whatsappUrl(GENERAL_ENQUIRY_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-accent-foreground shadow-[0_8px_30px_-8px_var(--brand-accent)] transition-transform hover:scale-105"
            >
              <WhatsAppIcon className="size-4" />
              Get a quote
              <ChevronsRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={telUrl()}
              className="rounded-full border border-foreground/20 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
            >
              {siteConfig.phone}
            </a>
          </motion.div>

          <motion.dl
            className="mt-10 grid max-w-lg grid-cols-2 gap-y-6 sm:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: delay(0.9) }}
          >
            {siteConfig.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse border-l border-foreground/10 pl-4"
              >
                <dt className="mt-1 text-[0.65rem] leading-tight text-muted-foreground uppercase">
                  {stat.label}
                </dt>
                <dd className="font-display text-xl sm:text-2xl">{stat.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <Ticker />
    </section>
  )
}

/** Hand-drawn gold underline that sketches itself in under the accent word. */
function Swoosh({ delay }: { delay: number }) {
  return (
    <svg
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute -bottom-[0.12em] left-0 h-[0.18em] w-full overflow-visible text-brand-accent"
    >
      <motion.path
        d="M4 16 C 70 6, 170 4, 296 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      />
    </svg>
  )
}

/**
 * The fleet, one truck at a time: each pulls in from the left, holds, and
 * drives off to the right as the next one arrives.
 */
function TruckShowcase() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const truck = fleet[active]
  const route = routes[0]

  useEffect(() => {
    if (reduceMotion) return
    const timer = setTimeout(
      () => setActive((index) => (index + 1) % fleet.length),
      TRUCK_INTERVAL * 1000,
    )
    return () => clearTimeout(timer)
  }, [active, reduceMotion])

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="relative aspect-[6/5]">
        {/* Stage: glow, slow-turning ring and a reflective floor. */}
        <div
          aria-hidden="true"
          className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,oklch(0.42_0.11_255/0.55),transparent_68%)]"
        />
        <motion.div
          aria-hidden="true"
          className="absolute inset-[10%] rounded-full border border-dashed border-brand-accent/25"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-[22%] rounded-full border border-foreground/[0.06]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-[4%] bottom-[17%] h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-[18%] bottom-[13%] h-[8%] rounded-[50%] bg-black/60 blur-xl"
        />

        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={truck.name}
            className="absolute inset-x-[6%] bottom-[14%]"
            initial={{ x: "-70%", opacity: 0, filter: "blur(10px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ x: "70%", opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <Image
              src={truck.image}
              alt={`${truck.name} truck`}
              width={456}
              height={337}
              priority={active === 0}
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="mx-auto w-full max-w-[520px] drop-shadow-[0_24px_30px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* On phones the cards sit in a row under the truck; from sm up they float over the stage. */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:contents">
        {/* Which truck is on stage. */}
        <motion.div
          className="rounded-2xl border border-foreground/10 bg-background/60 px-4 py-3 shadow-xl backdrop-blur-md sm:absolute sm:top-[6%] sm:left-[2%]"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: reduceMotion ? 0 : 1 }}
        >
          <p className="text-[0.65rem] tracking-widest text-muted-foreground uppercase">
            Our fleet
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={truck.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mt-1 font-display text-base">{truck.name}</p>
              <p className="text-xs text-brand-accent">{truck.capacity}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-3 flex gap-1.5">
            {fleet.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${item.name} truck`}
                aria-pressed={index === active}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  index === active
                    ? "w-6 bg-brand-accent"
                    : "w-1.5 bg-foreground/25 hover:bg-foreground/50",
                )}
              />
            ))}
          </div>
        </motion.div>

        {/* A popular route, with the little truck making its way along it. */}
        <motion.div
          className="rounded-2xl border border-foreground/10 bg-background/60 p-3 shadow-xl backdrop-blur-md sm:absolute sm:right-[2%] sm:bottom-0 sm:w-[64%] sm:max-w-72 sm:p-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: reduceMotion ? 0 : 1.2 }}
        >
          <div className="flex items-center justify-between text-[0.65rem] tracking-widest text-muted-foreground uppercase">
            <span>Popular route</span>
            <span className="text-brand-whatsapp">Daily</span>
          </div>
          <p className="mt-1.5 flex items-center gap-2 text-sm font-semibold">
            {route.from}
            <ChevronsRight className="size-4 text-brand-accent" />
            {route.to}
          </p>
          <div className="relative mt-6 h-1 rounded-full bg-foreground/10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-accent/30 to-brand-accent"
              initial={{ width: "8%" }}
              animate={reduceMotion ? { width: "60%" } : { width: ["8%", "92%"] }}
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
            />
            <motion.div
              className="absolute -top-[24px] w-12"
              style={{ x: "-55%" }}
              initial={{ left: "8%" }}
              animate={reduceMotion ? { left: "60%" } : { left: ["8%", "92%"] }}
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
            >
              <LottieTruck className="w-full" />
            </motion.div>
            <span className="absolute -top-1 right-0 size-3 rounded-full border-2 border-brand-accent bg-background" />
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            {route.distance} · {route.duration}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/** Endless strip of the places we serve, separated by gold chevrons. */
function Ticker() {
  const places = serviceAreas.map((area) => area.name)

  return (
    <div className="relative border-y border-foreground/10 bg-foreground/[0.02] py-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max motion-safe:animate-[marquee_40s_linear_infinite]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {places.map((place) => (
              <li
                key={place}
                className="flex items-center gap-6 pr-6 font-display text-sm text-foreground/70 sm:text-base"
              >
                {place}
                <ChevronsRight className="size-4 text-brand-accent" aria-hidden="true" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

/** Navy glow, a faint grid and light streaks rushing past, like a highway at night. */
function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_25%_45%,oklch(0.3_0.08_255/0.6),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black,transparent)]" />
      <div className="absolute inset-y-0 left-0 right-[48%] overflow-hidden">
        {[22, 48, 66, 80].map((top, index) => (
          <span
            key={top}
            className="absolute -left-1/3 h-px w-1/3 bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent motion-safe:animate-[streak_linear_infinite]"
            style={{
              top: `${top}%`,
              animationDuration: `${3.2 + index * 0.9}s`,
              animationDelay: `${index * 0.7}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
