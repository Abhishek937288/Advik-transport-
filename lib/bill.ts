import { siteConfig } from "@/config/site"

/** Fixed details printed on every bill. */
export const billIssuer = {
  name: "Advik Transport Service",
  address: `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city}`,
  bank: {
    accountName: "Advik Transport service",
    bankName: "The Cosmos Co-op. Bank LTD.",
    branch: "Sector 19, Vashi Branch Mumbai-400703",
    ifsc: "COSB0000153",
    accountNumber: "15310010198",
  },
}

export interface BillEntry {
  id: string
  /** ISO date (yyyy-mm-dd) as produced by `<input type="date">`. */
  date: string
  from: string
  to: string
  qty: string
  amount: string
  kata: string
}

export interface BillData {
  billNo: string
  customerName: string
  customerAddress: string
  entries: BillEntry[]
}

const toNumber = (value: string) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

/** Bill total: every entry's amount plus its kata charge. */
export const billTotal = (entries: BillEntry[]) =>
  entries.reduce(
    (sum, entry) => sum + toNumber(entry.amount) + toNumber(entry.kata),
    0
  )

/** Formats an ISO date as dd-mm-yyyy, the format used on the printed bill. */
export const formatBillDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-")
  return year && month && day ? `${day}-${month}-${year}` : isoDate
}

const ones = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
]
const tens = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
]

/** Words for 0–99, e.g. 32 -> "Thirty-Two". */
const twoDigits = (n: number) =>
  n < 20 ? ones[n] : [tens[Math.floor(n / 10)], ones[n % 10]].filter(Boolean).join("-")

/** Words for 0–999, e.g. 400 -> "Four Hundred". */
const threeDigits = (n: number) =>
  [n >= 100 ? `${ones[Math.floor(n / 100)]} Hundred` : "", twoDigits(n % 100)]
    .filter(Boolean)
    .join(" ")

/**
 * Converts a rupee amount to words using the Indian numbering system,
 * e.g. 32400 -> "Thirty-Two Thousand Four Hundred Rupees Only".
 */
export const amountInWords = (amount: number) => {
  let n = Math.round(Math.abs(amount))
  if (n === 0) return "Zero Rupees Only"

  const crore = Math.floor(n / 10_000_000)
  n %= 10_000_000
  const lakh = Math.floor(n / 100_000)
  n %= 100_000
  const thousand = Math.floor(n / 1000)
  n %= 1000

  const words = [
    crore ? `${crore >= 100 ? threeDigits(crore) : twoDigits(crore)} Crore` : "",
    lakh ? `${twoDigits(lakh)} Lakh` : "",
    thousand ? `${twoDigits(thousand)} Thousand` : "",
    threeDigits(n),
  ]
    .filter(Boolean)
    .join(" ")

  return `${words} Rupees Only`
}
