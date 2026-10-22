import { FleetSection } from "@/components/site/fleet-section"
import { Hero } from "@/components/site/hero"
import { Reveal, RouteTrack, SectionTitle } from "@/components/site/motion"
import { QuoteSection } from "@/components/site/quote-section"
import { ServicesSection } from "@/components/site/services-section"
import { processSteps } from "@/data/company"

export default function HomePage() {
  return (
    <>
      <Hero />

      <FleetSection />

      <ServicesSection />

      {/* Process */}
      <section id="process" className="scroll-mt-20 px-5 py-28 sm:px-8 sm:py-36">
        <SectionTitle eyebrow="Process" title="From call to delivery" />
        <RouteTrack className="mt-14" />
        <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.1}>
                <span className="font-mono text-xs text-brand-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <QuoteSection />
    </>
  )
}
