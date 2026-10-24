"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Draws every page of a PDF onto canvases with pdf.js, so the preview looks the
 * same on every device (mobile browsers cannot show PDFs inside a page).
 */
export function PdfPreview({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let cancelled = false

    const render = async () => {
      const pdfjs = await import("pdfjs-dist")
      pdfjs.GlobalWorkerOptions.workerPort ??= new Worker(
        new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url),
        { type: "module" }
      )

      const data = await (await fetch(url)).arrayBuffer()
      const pdf = await pdfjs.getDocument({ data }).promise
      const canvases: HTMLCanvasElement[] = []

      for (let number = 1; number <= pdf.numPages; number++) {
        const page = await pdf.getPage(number)
        const width = container.clientWidth
        const scale = width / page.getViewport({ scale: 1 }).width
        const viewport = page.getViewport({
          scale: scale * window.devicePixelRatio,
        })

        const canvas = document.createElement("canvas")
        canvas.width = viewport.width
        canvas.height = viewport.height
        canvas.className = "w-full bg-white shadow-lg"
        await page.render({ canvas, viewport }).promise
        canvases.push(canvas)
      }

      if (cancelled) return
      container.replaceChildren(...canvases)
      setStatus("ready")
    }

    setStatus("loading")
    render().catch(() => {
      if (!cancelled) setStatus("error")
    })
    return () => {
      cancelled = true
    }
  }, [url])

  return (
    <>
      {status === "loading" ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          Loading preview…
        </p>
      ) : null}
      {status === "error" ? (
        <p className="py-10 text-center text-sm text-destructive">
          Could not show the preview. You can still download the PDF.
        </p>
      ) : null}
      <div ref={containerRef} className="space-y-4" />
    </>
  )
}
