import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

/**
 * Password protection for the `/bill` page.
 *
 * The password lives in the `BILL_PASSWORD` environment variable. After a
 * successful login the browser gets an httpOnly cookie holding an HMAC derived
 * from that password, so changing the password signs everyone out.
 */
export const BILL_COOKIE = "advik_bill_session"
export const BILL_SESSION_MAX_AGE = 60 * 60 * 12

const sessionToken = (password: string) =>
  createHmac("sha256", password).update("advik-bill-session").digest("hex")

const safeEqual = (a: string, b: string) => {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

export const billPassword = () => process.env.BILL_PASSWORD ?? ""

/** Checks a submitted password and returns the session token when it matches. */
export const createBillSession = (submitted: string) => {
  const password = billPassword()
  if (!password || !safeEqual(submitted, password)) return null
  return sessionToken(password)
}

/** Whether the current request carries a valid bill session cookie. */
export const hasBillSession = async () => {
  const password = billPassword()
  if (!password) return false
  const token = (await cookies()).get(BILL_COOKIE)?.value
  return token ? safeEqual(token, sessionToken(password)) : false
}
