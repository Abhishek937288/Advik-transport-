"use client"

import { Download, Eye, LogOut, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

import { logoutFromBill } from "@/app/bill/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  amountInWords,
  billTotal,
  type BillData,
  type BillEntry,
} from "@/lib/bill"

const newEntry = (): BillEntry => ({
  id: crypto.randomUUID(),
  date: "",
  from: "",
  to: "",
  qty: "",
  amount: "",
  kata: "",
})

/** Returns a message describing what is missing, or null when the bill is complete. */
const validate = (bill: BillData) => {
  if (!bill.billNo.trim()) return "Enter the bill number."
  if (!bill.customerName.trim()) return "Enter the customer name."
  if (bill.entries.length === 0) return "Add at least one entry."
  const incomplete = bill.entries.findIndex(
    (entry) => !entry.date || !entry.to.trim() || !entry.amount
  )
  if (incomplete !== -1)
    return `Entry ${incomplete + 1} needs a date, destination and amount.`
  return null
}

/**
 * Form for filling in a bill, previewing it as a PDF and downloading it.
 * The PDF library is loaded only when a preview is requested.
 */
export function BillGenerator() {
  const [bill, setBill] = useState<BillData>({
    billNo: "",
    customerName: "",
    customerAddress: "",
    entries: [newEntry()],
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Release the previous PDF blob whenever the preview changes or unmounts.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const total = billTotal(bill.entries)

  /** Any edit makes the current preview outdated. */
  const update = (changes: Partial<BillData>) => {
    setBill((current) => ({ ...current, ...changes }))
    setPreviewUrl(null)
    setError(null)
  }

  const updateEntry = (id: string, changes: Partial<BillEntry>) =>
    update({
      entries: bill.entries.map((entry) =>
        entry.id === id ? { ...entry, ...changes } : entry
      ),
    })

  const generatePreview = async () => {
    const problem = validate(bill)
    if (problem) {
      setError(problem)
      return
    }

    setGenerating(true)
    try {
      const [{ pdf }, { BillDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/bill/bill-document"),
      ])
      const blob = await pdf(<BillDocument bill={bill} />).toBlob()
      setPreviewUrl(URL.createObjectURL(blob))
    } catch {
      setError("Could not generate the PDF. Please try again.")
    } finally {
      setGenerating(false)
    }
  }

  const fileName = `Bill-${bill.billNo.trim()}-${bill.customerName
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")}.pdf`

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Bill Generator</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the customer and trip details, preview the bill, then
            download it as a PDF.
          </p>
        </div>
        <form action={logoutFromBill}>
          <Button type="submit" variant="outline">
            <LogOut /> Log out
          </Button>
        </form>
      </div>

      <section className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-[1fr_10rem] sm:p-7">
        <div className="space-y-2">
          <Label htmlFor="customerName">Customer name (M/S)</Label>
          <Input
            id="customerName"
            className="h-11"
            placeholder="SHAYOKA CHEM PVT. LTD."
            value={bill.customerName}
            onChange={(event) => update({ customerName: event.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="billNo">Bill No</Label>
          <Input
            id="billNo"
            className="h-11"
            placeholder="1"
            value={bill.billNo}
            onChange={(event) => update({ billNo: event.target.value })}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="customerAddress">Customer address</Label>
          <Textarea
            id="customerAddress"
            rows={2}
            placeholder="D-363 TTC Industrial area MIDC Navi Mumbai 400705"
            value={bill.customerAddress}
            onChange={(event) =>
              update({ customerAddress: event.target.value })
            }
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-lg font-semibold">Entries</h2>

        {bill.entries.map((entry, index) => (
          <div
            key={entry.id}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold">Sr. no {index + 1}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={bill.entries.length === 1}
                onClick={() =>
                  update({
                    entries: bill.entries.filter(
                      (item) => item.id !== entry.id
                    ),
                  })
                }
              >
                <Trash2 /> Remove
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor={`date-${entry.id}`}>Date</Label>
                <Input
                  id={`date-${entry.id}`}
                  type="date"
                  className="h-11"
                  value={entry.date}
                  onChange={(event) =>
                    updateEntry(entry.id, { date: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor={`from-${entry.id}`}>From</Label>
                <Input
                  id={`from-${entry.id}`}
                  className="h-11"
                  placeholder={bill.customerName || "Customer name"}
                  value={entry.from}
                  onChange={(event) =>
                    updateEntry(entry.id, { from: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor={`to-${entry.id}`}>To</Label>
                <Input
                  id={`to-${entry.id}`}
                  className="h-11"
                  placeholder="Panvel"
                  value={entry.to}
                  onChange={(event) =>
                    updateEntry(entry.id, { to: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor={`qty-${entry.id}`}>QTY</Label>
                <Input
                  id={`qty-${entry.id}`}
                  inputMode="decimal"
                  className="h-11"
                  value={entry.qty}
                  onChange={(event) =>
                    updateEntry(entry.id, { qty: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor={`amount-${entry.id}`}>Amount (₹)</Label>
                <Input
                  id={`amount-${entry.id}`}
                  type="number"
                  min="0"
                  className="h-11"
                  value={entry.amount}
                  onChange={(event) =>
                    updateEntry(entry.id, { amount: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor={`kata-${entry.id}`}>Kata (₹)</Label>
                <Input
                  id={`kata-${entry.id}`}
                  type="number"
                  min="0"
                  className="h-11"
                  value={entry.kata}
                  onChange={(event) =>
                    updateEntry(entry.id, { kata: event.target.value })
                  }
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => update({ entries: [...bill.entries, newEntry()] })}
        >
          <Plus /> Add entry
        </Button>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 sm:p-7">
        <p className="text-sm text-muted-foreground">Total (amount + kata)</p>
        <p className="font-heading text-3xl font-bold">
          ₹ {total.toLocaleString("en-IN")}
        </p>
        <p className="mt-1 text-sm">{amountInWords(total)}</p>

        {error ? (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            size="lg"
            onClick={generatePreview}
            disabled={generating}
          >
            <Eye /> {generating ? "Generating…" : "Preview bill"}
          </Button>
          {previewUrl ? (
            <Button asChild size="lg" variant="outline">
              <a href={previewUrl} download={fileName}>
                <Download /> Download PDF
              </a>
            </Button>
          ) : null}
        </div>
      </section>

      {previewUrl ? (
        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold">Preview</h2>
          <iframe
            src={previewUrl}
            title="Bill preview"
            className="h-[80vh] w-full rounded-xl border border-border bg-white"
          />
          <p className="text-sm text-muted-foreground">
            Preview not showing on your phone?{" "}
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Open the PDF
            </a>
            .
          </p>
        </section>
      ) : null}
    </div>
  )
}
