import { Suspense } from "react"
import type { Metadata } from "next"

import { BillGenerator } from "@/components/bill/bill-generator"
import { BillLogin } from "@/components/bill/bill-login"
import { Container, Section } from "@/components/shared/section"
import { billPassword, hasBillSession } from "@/lib/bill-auth"

export const metadata: Metadata = {
  title: "Bill Generator",
  robots: { index: false, follow: false },
}

/** Reads the session cookie and shows either the generator or the password form. */
async function BillGate() {
  if (!billPassword()) {
    return (
      <p className="text-center text-muted-foreground">
        Bill generator is not configured. Set <code>BILL_PASSWORD</code> in the
        environment.
      </p>
    )
  }
  return (await hasBillSession()) ? <BillGenerator /> : <BillLogin />
}

export default function BillPage() {
  return (
    <Section>
      <Container>
        <Suspense
          fallback={
            <div className="mx-auto h-64 max-w-sm rounded-xl border border-border bg-muted" />
          }
        >
          <BillGate />
        </Suspense>
      </Container>
    </Section>
  )
}
