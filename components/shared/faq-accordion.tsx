"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import type { FaqItem } from "@/types"

export interface FaqAccordionProps {
  items: FaqItem[]
  /** Allow several answers to be open at the same time. */
  multiple?: boolean
  /** Question of the item that should be open by default. */
  defaultOpen?: string
  className?: string
}

/**
 * Accessible FAQ accordion built on the shadcn `Accordion` primitive.
 */
export function FaqAccordion({
  items,
  multiple = false,
  defaultOpen,
  className,
}: FaqAccordionProps) {
  const value = defaultOpen ?? items[0]?.question
  const accordionClassName = cn(
    "overflow-hidden rounded-xl border border-border bg-card",
    className,
  )

  const content = items.map((item) => (
    <AccordionItem
      key={item.question}
      value={item.question}
      className="border-border px-4 last:border-b-0 sm:px-6"
    >
      <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">
        {item.question}
      </AccordionTrigger>
      <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {item.answer}
      </AccordionContent>
    </AccordionItem>
  ))

  if (multiple) {
    return (
      <Accordion type="multiple" className={accordionClassName}>
        {content}
      </Accordion>
    )
  }

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={value}
      className={accordionClassName}
    >
      {content}
    </Accordion>
  )
}
