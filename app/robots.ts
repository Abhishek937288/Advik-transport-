import type { MetadataRoute } from "next"

import { siteUrl } from "@/config/site"

/**
 * Robots.txt.
 *
 * The whole website is informational and meant to be indexed, so every crawler
 * is allowed to read it. The sitemap reference helps discovery of the inner
 * pages.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
