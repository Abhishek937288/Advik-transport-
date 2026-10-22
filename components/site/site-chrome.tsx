import Link from "next/link"

import { siteConfig } from "@/config/site"
import { getCurrentYear } from "@/lib/date"

export async function SiteFooter() {
  const year = await getCurrentYear()

  return (
    <footer className="border-t border-foreground/10">
      <div className="flex flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          &copy; {year} {siteConfig.name}
        </p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
