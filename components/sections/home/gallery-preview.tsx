import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { GalleryGrid } from "@/components/shared/gallery-grid"
import { Container, Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { galleryItems } from "@/data/gallery"

/**
 * Gallery preview with a link to the full gallery page.
 */
export function GalleryPreview() {
  return (
    <Section tone="muted" id="gallery">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Gallery"
            title="A look at the vehicles, the yard and the work"
            description="Placeholder photographs for now — the full gallery will be replaced with real photos of the fleet, the warehouse and ongoing transportation work."
            id="gallery-heading"
          />

          <Button asChild variant="outline" className="h-11 w-fit shrink-0 px-5">
            <Link href="/gallery">
              View Full Gallery
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="mt-10">
          <GalleryGrid items={galleryItems.slice(0, 6)} />
        </div>
      </Container>
    </Section>
  )
}
