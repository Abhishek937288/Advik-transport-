import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { TestimonialCard } from "@/components/shared/testimonial-card"
import { testimonials } from "@/data/testimonials"

/**
 * Customer testimonials.
 *
 * The reviews below are clearly marked placeholders — replace them with real,
 * permission-based customer feedback before launch.
 */
export function Testimonials() {
  return (
    <Section id="testimonials">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What customers say about working with us"
          description="Placeholder testimonials are shown below with a badge. They will be replaced with genuine customer reviews once the business goes live."
          align="center"
          id="testimonials-heading"
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.name} className="h-full">
              <TestimonialCard testimonial={testimonial} className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
