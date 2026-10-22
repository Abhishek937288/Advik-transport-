import Link from "next/link"

import { Reveal } from "@/components/site/motion"
import { Truck } from "@/components/site/truck"

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-5 py-28 text-center">
      <Reveal className="w-40 text-foreground">
        <Truck cargo={110} spin={0} />
      </Reveal>
      <p className="mt-8 font-heading text-6xl font-bold">404</p>
      <h1 className="mt-3 font-heading text-2xl font-bold">
        This page took a wrong turn
      </h1>
      <Link
        href="/"
        className="mt-8 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        Back to home
      </Link>
    </section>
  )
}
