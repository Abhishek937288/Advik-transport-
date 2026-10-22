"use client"

import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface TruckProps {
  /** Length of the cargo box in SVG units — longer box, bigger truck. */
  cargo?: number
  /** Seconds per wheel revolution. `0` keeps the wheels still. */
  spin?: number
  className?: string
}

const HEIGHT = 100

/**
 * Minimal side-view truck illustration facing right.
 *
 * Colours come from `currentColor` (body) and the brand accent (cab), so the
 * truck follows the surrounding text colour.
 */
export function Truck({ cargo = 130, spin = 0.6, className }: TruckProps) {
  const reduceMotion = useReducedMotion()
  const cabX = cargo + 14
  const width = cabX + 62
  const wheels = cargo > 150 ? [38, 68, cargo - 10] : [38, cargo - 20]

  return (
    <svg
      viewBox={`0 0 ${width} ${HEIGHT}`}
      className={cn("h-auto", className)}
      aria-hidden="true"
      focusable="false"
    >
      <rect x={10} y={20} width={cargo} height={54} rx={4} fill="currentColor" />
      <path
        d={`M${cabX} 74 V38 h32 l20 20 v16 Z`}
        className="fill-brand-accent"
      />
      <path
        d={`M${cabX + 8} 44 h20 l12 13 h-32 Z`}
        className="fill-background"
      />
      <rect x={6} y={74} width={width - 8} height={5} rx={2} fill="currentColor" />

      {[...wheels, cabX + 30].map((cx) => (
        <motion.g
          key={cx}
          style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5 }}
          animate={spin && !reduceMotion ? { rotate: 360 } : undefined}
          transition={{ duration: spin, ease: "linear", repeat: Infinity }}
        >
          <circle cx={cx} cy={82} r={11} fill="currentColor" />
          <circle cx={cx} cy={82} r={4.5} className="fill-background" />
          <rect x={cx - 1} y={73} width={2} height={5} className="fill-background" />
        </motion.g>
      ))}
    </svg>
  )
}
