/**
 * Returns the current year.
 *
 * The value is cached so it can be read during prerendering without making
 * the page dynamic.
 */
export async function getCurrentYear(): Promise<number> {
  "use cache"
  return new Date().getFullYear()
}

/**
 * Returns an ISO timestamp for sitemap and legal pages.
 *
 * Cached for the same reason as `getCurrentYear` — reading the clock while
 * prerendering would otherwise make the route dynamic.
 */
export async function getLastModified(): Promise<string> {
  "use cache"
  return new Date().toISOString()
}
