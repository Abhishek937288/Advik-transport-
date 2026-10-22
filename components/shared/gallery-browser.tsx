"use client"

import { useMemo, useState } from "react"

import { GalleryGrid } from "@/components/shared/gallery-grid"
import { cn } from "@/lib/utils"
import type { GalleryItem } from "@/types"

export interface GalleryBrowserProps {
  items: GalleryItem[]
  categories: readonly string[]
}

/**
 * Gallery with category filters.
 *
 * The filter is the only interactive part of the gallery, so it is the only
 * piece that ships as client JavaScript.
 */
export function GalleryBrowser({ items, categories }: GalleryBrowserProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All")

  const visibleItems = useMemo(
    () =>
      activeCategory === "All"
        ? items
        : items.filter((item) => item.category === activeCategory),
    [activeCategory, items],
  )

  return (
    <div className="space-y-6">
      <div
        role="group"
        aria-label="Filter gallery by category"
        className="flex flex-wrap gap-2"
      >
        {["All", ...categories].map((category) => {
          const isActive = category === activeCategory
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {category}
            </button>
          )
        })}
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing {visibleItems.length}{" "}
        {visibleItems.length === 1 ? "photograph" : "photographs"}
        {activeCategory === "All" ? "" : ` in ${activeCategory}`}.
      </p>

      <GalleryGrid items={visibleItems} priority />
    </div>
  )
}
