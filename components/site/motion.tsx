"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef, type ReactNode } from "react"

import { Truck } from "@/components/site/truck"
import { cn } from "@/lib/utils"

/** Fades and lifts its children into view once, as they scroll in. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/** Slides a truck in from the left, like it is pulling up, once in view. */
export function DriveIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -120 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 70, damping: 16, delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Horizontal track with a truck that advances as the section scrolls through
 * the viewport, ending at the last step.
 */
export function RouteTrack({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  })
  const left = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const shift = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])

  return (
    <div ref={ref} aria-hidden="true" className={cn("relative h-14", className)}>
      <div className="absolute inset-x-0 bottom-0 border-b-2 border-dashed border-foreground/15" />
      <motion.div
        className="absolute bottom-0.5 left-0 h-0.5 bg-brand-accent"
        style={{ width: left }}
      />
      <motion.div className="absolute bottom-1 w-20 text-foreground" style={{ left, x: shift }}>
        <Truck cargo={110} spin={0} />
      </motion.div>
    </div>
  )
}

/** Eyebrow and big display heading used at the top of each home section. */
export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal>
      <p className="text-sm text-muted-foreground uppercase">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] sm:text-6xl">{title}</h2>
    </Reveal>
  )
}
