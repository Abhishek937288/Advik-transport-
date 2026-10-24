import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

import {
  amountInWords,
  billIssuer,
  formatBillDate,
  type BillData,
} from "@/lib/bill"

/** Brand colours from the website, converted to hex for the PDF. */
const color = {
  brand: "#15325a",
  accent: "#e8a33d",
  text: "#1f2937",
  muted: "#6b7280",
  line: "#d9dee5",
  zebra: "#f4f6f9",
  panel: "#f8fafc",
}

/** Column widths of the entries table. */
const col = {
  sr: "8%",
  date: "15%",
  particulars: "41%",
  qty: "10%",
  amount: "14%",
  kata: "12%",
}

const styles = StyleSheet.create({
  page: {
    // Top padding gives later pages breathing room; the header cancels it on page one.
    paddingTop: 36,
    paddingBottom: 56,
    paddingHorizontal: 0,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: color.text,
  },
  header: {
    marginTop: -36,
    backgroundColor: color.brand,
    color: "#ffffff",
    paddingHorizontal: 40,
    paddingTop: 30,
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  company: { fontFamily: "Helvetica-Bold", fontSize: 22, letterSpacing: 0.3 },
  companyAddress: { marginTop: 6, fontSize: 9, color: "#c9d4e3" },
  docLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
    letterSpacing: 4,
    color: color.accent,
    textAlign: "right",
  },
  accentBar: { height: 4, backgroundColor: color.accent },
  body: { paddingHorizontal: 40, paddingTop: 24 },
  partyRow: { flexDirection: "row", gap: 16, marginBottom: 22 },
  billedTo: {
    flex: 1,
    borderLeft: `3pt solid ${color.accent}`,
    paddingLeft: 10,
    paddingVertical: 2,
  },
  label: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: color.muted,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  customerName: { fontFamily: "Helvetica-Bold", fontSize: 12, marginBottom: 3 },
  customerAddress: { color: color.muted, lineHeight: 1.4 },
  billMeta: {
    width: 150,
    backgroundColor: color.panel,
    border: `1pt solid ${color.line}`,
    borderRadius: 4,
    padding: 10,
    justifyContent: "center",
  },
  billNo: { fontFamily: "Helvetica-Bold", fontSize: 16, color: color.brand },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: color.brand,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    borderBottom: `0.75pt solid ${color.line}`,
  },
  cell: { paddingHorizontal: 6, paddingVertical: 7 },
  right: { textAlign: "right" },
  center: { textAlign: "center" },
  from: { fontFamily: "Helvetica-Bold" },
  to: { marginTop: 2, color: color.muted },
  subtotalRow: {
    flexDirection: "row",
    backgroundColor: color.panel,
    borderBottom: `1pt solid ${color.brand}`,
    fontFamily: "Helvetica-Bold",
  },
  summary: { flexDirection: "row", gap: 16, marginTop: 18 },
  words: {
    flex: 1,
    backgroundColor: color.panel,
    border: `1pt solid ${color.line}`,
    borderRadius: 4,
    padding: 10,
  },
  wordsText: { fontFamily: "Helvetica-Bold", lineHeight: 1.4 },
  totals: { width: 200 },
  totalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: color.brand,
    color: "#ffffff",
    borderRadius: 4,
  },
  grandTotalLabel: { fontFamily: "Helvetica-Bold", fontSize: 10, letterSpacing: 1 },
  grandTotalValue: { fontFamily: "Helvetica-Bold", fontSize: 13 },
  closing: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 16,
    marginTop: 28,
  },
  bank: {
    flex: 1,
    border: `1pt solid ${color.line}`,
    borderRadius: 4,
    padding: 10,
  },
  bankRow: { flexDirection: "row", marginTop: 3 },
  bankKey: { width: 92, color: color.muted },
  bankValue: { flex: 1, fontFamily: "Helvetica-Bold" },
  signature: { width: 200, alignItems: "center" },
  signFor: { fontFamily: "Helvetica-Bold", marginBottom: 44 },
  signLine: {
    alignSelf: "stretch",
    borderTop: `1pt solid ${color.text}`,
    paddingTop: 4,
    textAlign: "center",
    color: color.muted,
    fontSize: 8,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: `0.75pt solid ${color.line}`,
    paddingTop: 6,
    fontSize: 7.5,
    color: color.muted,
  },
})

const toNumber = (value: string) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

/** Indian-style grouping with two decimals, e.g. 32400 -> "32,400.00". */
const money = (value: number) =>
  value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

function Cell({
  width,
  align,
  children,
}: {
  width: string
  align?: "right" | "center"
  children?: React.ReactNode
}) {
  return (
    <View style={[styles.cell, { width }]}>
      {typeof children === "string" ? (
        <Text style={align ? styles[align] : {}}>{children}</Text>
      ) : (
        children
      )}
    </View>
  )
}

/** The bill as a PDF document. */
export function BillDocument({ bill }: { bill: BillData }) {
  const amountTotal = bill.entries.reduce((sum, e) => sum + toNumber(e.amount), 0)
  const kataTotal = bill.entries.reduce((sum, e) => sum + toNumber(e.kata), 0)
  const total = amountTotal + kataTotal
  const { bank } = billIssuer

  return (
    <Document
      title={`Bill ${bill.billNo} - ${bill.customerName}`}
      author={billIssuer.name}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={{ maxWidth: 360 }}>
            <Text style={styles.company}>{billIssuer.name}</Text>
            <Text style={styles.companyAddress}>{billIssuer.address}</Text>
          </View>
          <Text style={styles.docLabel}>BILL</Text>
        </View>
        <View style={styles.accentBar} />

        <View style={styles.body}>
          <View style={styles.partyRow}>
            <View style={styles.billedTo}>
              <Text style={styles.label}>Billed to</Text>
              <Text style={styles.customerName}>M/S: {bill.customerName}</Text>
              <Text style={styles.customerAddress}>{bill.customerAddress}</Text>
            </View>
            <View style={styles.billMeta}>
              <Text style={styles.label}>Bill No</Text>
              <Text style={styles.billNo}>{bill.billNo}</Text>
            </View>
          </View>

          <View style={styles.tableHeader} fixed>
            <Cell width={col.sr} align="center">Sr.</Cell>
            <Cell width={col.date}>Date</Cell>
            <Cell width={col.particulars}>Particulars</Cell>
            <Cell width={col.qty} align="right">Qty</Cell>
            <Cell width={col.amount} align="right">Amount</Cell>
            <Cell width={col.kata} align="right">Kata</Cell>
          </View>

          {bill.entries.map((entry, index) => (
            <View
              key={entry.id}
              style={[
                styles.row,
                index % 2 === 1 ? { backgroundColor: color.zebra } : {},
              ]}
              wrap={false}
            >
              <Cell width={col.sr} align="center">{String(index + 1)}</Cell>
              <Cell width={col.date}>{formatBillDate(entry.date)}</Cell>
              <Cell width={col.particulars}>
                <Text style={styles.from}>{entry.from || bill.customerName}</Text>
                <Text style={styles.to}>to {entry.to}</Text>
              </Cell>
              <Cell width={col.qty} align="right">{entry.qty}</Cell>
              <Cell width={col.amount} align="right">
                {money(toNumber(entry.amount))}
              </Cell>
              <Cell width={col.kata} align="right">
                {entry.kata ? money(toNumber(entry.kata)) : "-"}
              </Cell>
            </View>
          ))}

          <View style={styles.subtotalRow} wrap={false}>
            <Cell width={`${parseFloat(col.sr) + parseFloat(col.date) + parseFloat(col.particulars) + parseFloat(col.qty)}%`} align="right">
              Subtotal
            </Cell>
            <Cell width={col.amount} align="right">{money(amountTotal)}</Cell>
            <Cell width={col.kata} align="right">{money(kataTotal)}</Cell>
          </View>

          <View style={styles.summary} wrap={false}>
            <View style={styles.words}>
              <Text style={styles.label}>Amount in words</Text>
              <Text style={styles.wordsText}>{amountInWords(total)}</Text>
            </View>
            <View style={styles.totals}>
              <View style={styles.totalLine}>
                <Text style={{ color: color.muted }}>Freight amount</Text>
                <Text>{money(amountTotal)}</Text>
              </View>
              <View style={styles.totalLine}>
                <Text style={{ color: color.muted }}>Kata charges</Text>
                <Text>{money(kataTotal)}</Text>
              </View>
              <View style={styles.grandTotal}>
                <Text style={styles.grandTotalLabel}>TOTAL</Text>
                <Text style={styles.grandTotalValue}>Rs. {money(total)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.closing} wrap={false}>
            <View style={styles.bank}>
              <Text style={styles.label}>Bank details</Text>
              {[
                ["Name", bank.accountName],
                ["Bank", bank.bankName],
                ["Branch", bank.branch],
                ["RTGS/NEFT IFSC", bank.ifsc],
                ["A/C No", bank.accountNumber],
              ].map(([key, value]) => (
                <View key={key} style={styles.bankRow}>
                  <Text style={styles.bankKey}>{key}</Text>
                  <Text style={styles.bankValue}>{value}</Text>
                </View>
              ))}
            </View>
            <View style={styles.signature}>
              <Text style={styles.signFor}>For {billIssuer.name}</Text>
              <Text style={styles.signLine}>Authorised Signatory</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>Thank you for your business.</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Bill No ${bill.billNo} · Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  )
}
