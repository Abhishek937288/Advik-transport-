import type { MetadataRoute } from "next"

import { siteUrl } from "@/config/site"
import { getLastModified } from "@/lib/date"

const staticRoutes: {
  path: string
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly"
  priority: number
}[] = [
    { path: "", changeFrequency: "daily", priority: 1 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ]

/**
 * XML sitemap.
 *
 * Fragments (`/services#slug`) are deliberately not listed — search engines
 * ignore anchors in sitemaps, and the individual sections are reachable by
 * crawling the parent page.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = await getLastModified()

  return staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
