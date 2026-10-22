import Image from "next/image"

import { cn } from "@/lib/utils"
import type { GalleryItem } from "@/types"

export interface GalleryGridProps {
  items: GalleryItem[]
  className?: string
  /** Eagerly load the first images (used for above-the-fold galleries). */
  priority?: boolean
}

/**
 * Responsive image grid for the gallery.
 *
 * Images are plain placeholders — drop real photographs into
 * `public/images/gallery` with the same file names to replace them.
 */
export function GalleryGrid({
  items,
  className,
  priority = false,
}: GalleryGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className="group relative overflow-hidden rounded-xl border border-border bg-muted"
        >
          <div className="relative aspect-4/3 w-full">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority && index < 3}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/45 to-transparent p-4">
            <p className="font-heading text-sm font-semibold text-white">
              {item.title}
            </p>
            <p className="mt-0.5 text-xs text-white/75">{item.description}</p>
          </div>

          <span className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-foreground uppercase backdrop-blur-sm">
            {item.category}
          </span>
        </li>
      ))}
    </ul>
  )
}
