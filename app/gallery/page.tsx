import { Camera } from "lucide-react"
import type { Metadata } from "next"

import { ContactCta } from "@/components/sections/contact-cta"
import { GalleryBrowser } from "@/components/shared/gallery-browser"
import { PageHero } from "@/components/shared/page-hero"
import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { buildMetadata } from "@/config/site"
import { galleryCategories, galleryItems } from "@/data/gallery"

export const metadata: Metadata = buildMetadata({
  title: "Gallery | Our Fleet, Loading, Deliveries & Warehouse",
  description:
    "Photographs of the Advik Transport fleet, loading work, deliveries, warehouse operations and transportation projects across the Mumbai Metropolitan Region.",
  path: "/gallery",
})

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A look at our work"
        description="Photographs from the yard, the loading bay and the road. These are placeholder images — replace them with photographs of your own fleet and operations."
        current="Gallery"
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Our work"
            title="Fleet, loading, deliveries and warehouse"
            description="Filter the gallery by what you want to see."
          />

          <div className="mt-10">
            <GalleryBrowser
              items={galleryItems}
              categories={galleryCategories}
            />
          </div>

          <p className="mt-10 flex items-start gap-2 rounded-lg border border-border bg-muted/60 p-4 text-sm text-muted-foreground">
            <Camera className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              The photographs on this page are placeholders used for layout and
              demonstration. Replace the files in{" "}
              <code className="font-mono text-xs">public/images/gallery</code>{" "}
              with real photographs of the business — no code changes needed.
            </span>
          </p>
        </Container>
      </Section>

      <ContactCta
        title="Want to see the fleet in person?"
        description="If you are planning a regular movement, we can arrange a visit to the yard or send the details of the specific vehicle you need."
      />
    </>
  )
}
