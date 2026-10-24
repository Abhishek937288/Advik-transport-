"use client"

import { Lock } from "lucide-react"
import { useActionState } from "react"

import { loginToBill } from "@/app/bill/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/** Password prompt shown before the bill generator. */
export function BillLogin() {
  const [state, formAction, pending] = useActionState(loginToBill, {})

  return (
    <form
      action={formAction}
      className="mx-auto max-w-sm space-y-5 rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="flex items-center gap-2">
        <Lock className="size-5 text-primary" />
        <h1 className="font-heading text-xl font-bold">Bill Generator</h1>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="h-11"
          aria-invalid={state.error ? true : undefined}
        />
        {state.error ? (
          <p role="alert" className="text-sm text-destructive">
            {state.error}
          </p>
        ) : null}
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Checking…" : "Unlock"}
      </Button>
    </form>
  )
}
