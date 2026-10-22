import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { getIcon } from "@/components/shared/icon"
import { goodsCategories } from "@/data/company"

/**
 * Categories of goods the business transports.
 */
export function GoodsWeTransport() {
  return (
    <Section id="goods">
      <Container>
        <SectionHeading
          eyebrow="Goods we transport"
          title="General cargo, industrial material and everything in between"
          description="Share the type of goods and we will confirm the right body type, packing and loading method for the consignment."
          align="center"
          id="goods-heading"
        />

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {goodsCategories.map((good) => {
            const Icon = getIcon(good.icon)
            return (
              <li
                key={good.name}
                className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-primary/3"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="font-heading text-sm leading-snug font-semibold">
                  {good.name}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {good.description}
                </p>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
