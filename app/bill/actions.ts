"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import {
  BILL_COOKIE,
  BILL_SESSION_MAX_AGE,
  createBillSession,
} from "@/lib/bill-auth"

export interface LoginState {
  error?: string
}

export async function loginToBill(
  _previous: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "")
  const token = createBillSession(password)

  if (!token) {
    // Slow down repeated guessing.
    await new Promise((resolve) => setTimeout(resolve, 800))
    return { error: "Incorrect password." }
  }

  ;(await cookies()).set(BILL_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/bill",
    maxAge: BILL_SESSION_MAX_AGE,
  })
  redirect("/bill")
}

export async function logoutFromBill() {
  ;(await cookies()).delete({ name: BILL_COOKIE, path: "/bill" })
  redirect("/bill")
}
