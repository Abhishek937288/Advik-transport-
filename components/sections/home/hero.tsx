import { CalendarClock, Clock, MapPin, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { CallButton, QuoteButton, WhatsAppButton } from "@/components/shared/contact-buttons"
import { Container } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

const highlightPoints = [
  { icon: MapPin, label: "Mumbai, Navi Mumbai & Thane" },
  { icon: Truck, label: "20+ commercial vehicles" },
  { icon: Clock, label: "Same-day dispatch available" },
]

/**
 * Homepage hero. Immediately communicates what the business does, where it
 * operates and how to get in touch.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-deep text-brand-foreground">
      <div aria-hidden="true" className="bg-grid-pattern absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-32 size-[34rem] rounded-full bg-brand/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-brand-accent"
      />

      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-14 lg:py-24">
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-foreground/20 bg-brand-foreground/5 px-3.5 py-1.5 text-xs font-semibold tracking-[0.1em] text-brand-accent uppercase">
            <CalendarClock className="size-3.5" aria-hidden="true" />
            Goods carriers since {siteConfig.foundedYear}
          </p>

          <h1 className="mt-6 font-heading text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-6xl">
            Reliable Goods Transportation You Can Count On
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-brand-foreground/75 sm:text-lg">
            {siteConfig.name} provides safe and dependable goods transportation
            for businesses, warehouses, builders and households. From a single
            carton in the city to a full truck load across Maharashtra, the
            vehicle is matched to your load and the plan is agreed before
            dispatch.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <QuoteButton
              className="bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent/90"
              href="/contact#enquiry-form"
            />
            <CallButton
              variant="outline"
              className="border-brand-foreground/35 bg-transparent text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground"
            />
            <WhatsAppButton
              message="Hello, I would like to enquire about goods transportation."
              className="sm:hidden"
            />
          </div>

          <p className="mt-4 text-sm text-brand-foreground/60">
            No online booking — talk to us directly and we will confirm the
            vehicle and the price.
          </p>

          <ul className="mt-9 grid gap-3 border-t border-brand-foreground/10 pt-7 sm:grid-cols-3">
            {highlightPoints.map((point) => (
              <li key={point.label} className="flex items-center gap-2.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-foreground/10 text-brand-accent">
                  <point.icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm leading-snug text-brand-foreground/80">
                  {point.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <div className="relative">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-brand-foreground/15 bg-brand/40 shadow-2xl shadow-black/30 sm:aspect-16/10 lg:aspect-4/3">
              <Image
                src="/images/hero/truck-hero.jpg"
                alt="Goods carrier truck of Advik Transport ready for dispatch"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-5 left-4 w-[min(19rem,85%)] rounded-xl border border-border bg-background p-4 shadow-xl shadow-black/20 sm:left-6">
              <p className="font-heading text-2xl font-bold text-primary">
                5,000+
              </p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">
                Deliveries completed across Mumbai and Maharashtra.
              </p>
              <Button
                asChild
                size="sm"
                variant="link"
                className="mt-2 h-auto p-0 text-sm font-semibold"
              >
                <Link href="/about">Learn about the business</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
