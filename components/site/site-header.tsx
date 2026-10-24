"use client"

import { Menu, Phone, Truck, X } from "lucide-react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { WhatsAppIcon } from "@/components/shared/brand-icons"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { GENERAL_ENQUIRY_MESSAGE, telUrl, whatsappUrl } from "@/lib/whatsapp"

const EASE = [0.22, 1, 0.36, 1] as const

const navLinks = [
  { title: "Fleet", href: "/#fleet" },
  { title: "Services", href: "/#services" },
  { title: "Process", href: "/#process" },
  { title: "Contact", href: "/#contact" },
  { title: "Bill", href: "/bill" },
]

/**
 * Site header. Sits flat over the hero, then tucks into a floating glass pill
 * once the page scrolls. A gold marker follows the hovered link (or the
 * section in view), and a thin progress line tracks how far down the page is.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const activeSection = useActiveSection(pathname === "/")

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24))

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [open])

  const currentPage = navLinks.some((link) => link.href === pathname) ? pathname : null
  const marker = hovered ?? (activeSection ? `/#${activeSection}` : currentPage)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className={cn(
          "relative mx-auto flex items-center justify-between gap-6 border transition-[width,max-width,margin,padding,border-radius,background-color,border-color,box-shadow] duration-500 ease-out",
          scrolled
            ? "mt-3 w-[calc(100%-1.5rem)] max-w-5xl rounded-full border-foreground/10 bg-background/70 py-2 pr-2 pl-4 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            : "mt-0 w-full max-w-full rounded-none border-transparent bg-transparent px-5 py-4 sm:px-8 sm:py-5",
        )}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <Brand />

        <nav aria-label="Main" className="hidden md:block" onMouseLeave={() => setHovered(null)}>
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  aria-current={
                    link.href === pathname
                      ? "page"
                      : activeSection && link.href === `/#${activeSection}`
                        ? "true"
                        : undefined
                  }
                  className={cn(
                    "relative isolate block rounded-full px-4 py-2 text-xs tracking-widest uppercase transition-colors",
                    marker === link.href ? "text-foreground" : "text-foreground/60",
                  )}
                >
                  {marker === link.href ? (
                    <motion.span
                      layoutId="nav-marker"
                      className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.08]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    >
                      <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
                    </motion.span>
                  ) : null}
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telUrl()}
            aria-label={`Call ${siteConfig.phone}`}
            className="group hidden size-10 items-center justify-center rounded-full border border-foreground/15 transition-colors hover:border-brand-accent hover:text-brand-accent sm:flex"
          >
            <Phone className="size-4 transition-transform group-hover:-rotate-12" />
          </a>
          <a
            href={whatsappUrl(GENERAL_ENQUIRY_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-brand-accent px-5 py-2.5 text-xs font-semibold tracking-wide text-brand-accent-foreground uppercase sm:inline-flex"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/40 blur-sm motion-safe:animate-[shine_3.5s_ease-in-out_infinite]"
            />
            <WhatsAppIcon className="relative size-4" />
            <span className="relative">Get a quote</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 flex size-10 items-center justify-center rounded-full border border-foreground/15 md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={cn(
            "absolute inset-x-8 -bottom-px h-[2px] origin-left rounded-full bg-gradient-to-r from-brand-accent/0 via-brand-accent to-brand-accent transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
      </motion.div>

      <AnimatePresence>
        {open ? <MobileMenu onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </header>
  )
}

/** Gold truck mark with the two-tone wordmark from the logo. */
function Brand() {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className="group relative z-10 flex items-center gap-3"
    >
      <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-accent to-[oklch(0.62_0.13_60)] text-brand-accent-foreground shadow-[0_6px_20px_-6px_var(--brand-accent)]">
        <Truck className="size-[18px] transition-transform duration-500 group-hover:translate-x-8" />
        <Truck className="absolute size-[18px] -translate-x-8 transition-transform duration-500 group-hover:translate-x-0" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-base tracking-wide text-[oklch(0.85_0.06_255)]">
          Advik
        </span>
        <span className="mt-0.5 text-[0.6rem] font-semibold tracking-[0.35em] text-brand-accent uppercase">
          Transport
        </span>
      </span>
    </Link>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 -z-10 flex flex-col bg-background/95 px-6 pt-28 pb-10 backdrop-blur-xl md:hidden"
      initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
      animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
      exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <nav aria-label="Mobile">
        <ul>
          {navLinks.map((link, index) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 + index * 0.07 }}
              className="border-b border-foreground/10"
            >
              <Link
                href={link.href}
                onClick={onClose}
                className="flex items-baseline gap-4 py-5 font-display text-4xl"
              >
                <span className="font-mono text-xs text-brand-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.title}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      <motion.div
        className="mt-auto grid gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
      >
        <a
          href={whatsappUrl(GENERAL_ENQUIRY_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-brand-accent py-4 text-sm font-semibold text-brand-accent-foreground"
        >
          <WhatsAppIcon className="size-4" />
          Get a quote on WhatsApp
        </a>
        <a
          href={telUrl()}
          className="flex items-center justify-center gap-2 rounded-full border border-foreground/20 py-4 text-sm font-semibold"
        >
          <Phone className="size-4" />
          {siteConfig.phone}
        </a>
      </motion.div>
    </motion.div>
  )
}

/** Id of the home page section currently in the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(2)))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [enabled])

  return enabled ? active : null
}
