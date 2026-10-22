import { Container } from "@/components/shared/section"
import { siteConfig } from "@/config/site"

/**
 * Trust / business highlights strip.
 *
 * The numbers live in `config/site.ts` so they can be replaced with the real
 * business figures in one place.
 */
export function Stats() {
  return (
    <section aria-label="Business highlights" className="border-b border-border bg-background">
      <Container className="py-10 sm:py-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="order-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="order-1 font-heading text-3xl font-bold text-primary sm:text-4xl">
                {stat.value}
              </dd>
              {stat.description ? (
                <p className="order-3 text-xs leading-relaxed text-muted-foreground/80">
                  {stat.description}
                </p>
              ) : null}
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
