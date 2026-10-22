"use client"

import { useReducedMotion } from "motion/react"
import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

/**
 * Side-view line truck (LottieFiles "Logistics Trucks", recoloured to the
 * brand gold). The player and the animation data load only in the browser,
 * so neither weighs on the initial bundle.
 */
export function LottieTruck({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const container = ref.current
    if (!container) return

    let cancelled = false
    let destroy: (() => void) | undefined

    Promise.all([
      import("lottie-web/build/player/lottie_light"),
      fetch("/lottie/truck.json").then((response) => response.json()),
    ])
      .then(([{ default: lottie }, animationData]) => {
        if (cancelled) return
        const animation = lottie.loadAnimation({
          container,
          animationData,
          renderer: "svg",
          loop: true,
          autoplay: !reduceMotion,
          // Crop the 500×500 canvas to the truck and its speed lines.
          rendererSettings: { viewBoxSize: "135 205 240 130" },
        })
        destroy = () => animation.destroy()
      })
      .catch(() => {})

    return () => {
      cancelled = true
      destroy?.()
    }
  }, [reduceMotion])

  return <div ref={ref} aria-hidden="true" className={cn("aspect-[24/13]", className)} />
}
