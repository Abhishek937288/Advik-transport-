export { cn } from "cn"

/**
 * Formats a number of days into a readable relative string, e.g. "in 2 days".
 * Used to describe lead times for scheduled pickups.
 */
export const formatLeadTime = (days: number): string => {
  if (days <= 1) return "next day"
  if (days < 7) return `${days} days`
  const weeks = Math.round(days / 7)
  return weeks === 1 ? "1 week" : `${weeks} weeks`
}

/** Converts a slug into a readable title, e.g. "part-load-transport" -> "Part load transport". */
export const titleFromSlug = (slug: string): string =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
