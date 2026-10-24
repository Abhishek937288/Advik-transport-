import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

import {
  amountInWords,
  billIssuer,
  billTotal,
  formatBillDate,
  type BillData,
} from "@/lib/bill"

const BORDER = "0.75pt solid #000"

/** Column widths, matching the printed bill. */
const col = {
  sr: "12%",
  date: "24%",
  particulars: "38%",
  qty: "6.5%",
  amount: "11.5%",
  kata: "8%",
}

/** Height reserved for the entries table, so the bill keeps its printed size. */
const TABLE_BODY_HEIGHT = 380
const ENTRY_ROW_HEIGHT = 42
const EMPTY_ROW_HEIGHT = 16

const styles = StyleSheet.create({
  page: {
    paddingVertical: 50,
    paddingHorizontal: 60,
    fontFamily: "Helvetica",
    fontSize: 8.5,
  },
  sheet: { border: BORDER },
  title: {
    borderBottom: BORDER,
    paddingVertical: 6,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 24,
  },
  issuerAddress: {
    borderBottom: BORDER,
    paddingVertical: 2,
    textAlign: "center",
  },
  customer: { flexDirection: "row", borderBottom: BORDER },
  customerDetails: {
    flex: 1,
    borderRight: BORDER,
    paddingHorizontal: 3,
    paddingVertical: 2,
    gap: 4,
  },
  billNo: {
    width: "26%",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  row: { flexDirection: "row", borderBottom: BORDER },
  cell: {
    borderRight: BORDER,
    paddingHorizontal: 2,
    paddingVertical: 1,
    textAlign: "center",
  },
  lastCell: { borderRight: "none" },
  footer: { flexDirection: "row", borderBottom: BORDER },
  bankDetails: {
    flex: 1,
    borderRight: BORDER,
    paddingHorizontal: 3,
    paddingVertical: 2,
    gap: 4,
  },
  total: {
    width: `${parseFloat(col.qty) + parseFloat(col.amount) + parseFloat(col.kata)}%`,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
  },
  bankBranch: {
    borderBottom: BORDER,
    paddingHorizontal: 3,
    paddingVertical: 2,
    gap: 4,
  },
  words: { paddingHorizontal: 3, paddingVertical: 2, minHeight: 48 },
})

function Cell({
  width,
  last,
  children,
}: {
  width: string
  last?: boolean
  children?: React.ReactNode
}) {
  return (
    <View style={[styles.cell, { width }, last ? styles.lastCell : {}]}>
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </View>
  )
}

/** The bill as a PDF document, laid out like Advik Transport's printed bill. */
export function BillDocument({ bill }: { bill: BillData }) {
  const total = billTotal(bill.entries)
  const emptyRows = Math.max(
    0,
    Math.floor(
      (TABLE_BODY_HEIGHT - bill.entries.length * ENTRY_ROW_HEIGHT) /
        EMPTY_ROW_HEIGHT
    )
  )

  return (
    <Document
      title={`Bill ${bill.billNo} - ${bill.customerName}`}
      author={billIssuer.name}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{billIssuer.name}</Text>
          <Text style={styles.issuerAddress}>{billIssuer.address}</Text>

          <View style={styles.customer}>
            <View style={styles.customerDetails}>
              <Text>M/S: {bill.customerName}</Text>
              <Text>{bill.customerAddress}</Text>
            </View>
            <View style={styles.billNo}>
              <Text>Bill No : {bill.billNo}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Cell width={col.sr}>sr.no</Cell>
            <Cell width={col.date}>Date</Cell>
            <Cell width={col.particulars}>Particulars</Cell>
            <Cell width={col.qty}>QTY</Cell>
            <Cell width={col.amount}>AMOUNT</Cell>
            <Cell width={col.kata} last>
              KATA
            </Cell>
          </View>

          {bill.entries.map((entry, index) => (
            <View
              key={entry.id}
              style={[styles.row, { minHeight: ENTRY_ROW_HEIGHT }]}
              wrap={false}
            >
              <Cell width={col.sr}>{String(index + 1)}</Cell>
              <Cell width={col.date}>{formatBillDate(entry.date)}</Cell>
              <Cell width={col.particulars}>
                <Text>{entry.from || bill.customerName}</Text>
                <Text>to</Text>
                <Text>{entry.to}</Text>
              </Cell>
              <Cell width={col.qty}>{entry.qty}</Cell>
              <Cell width={col.amount}>{entry.amount}</Cell>
              <Cell width={col.kata} last>
                {entry.kata}
              </Cell>
            </View>
          ))}

          {Array.from({ length: emptyRows }).map((_, index) => (
            <View
              key={`empty-${index}`}
              style={[styles.row, { height: EMPTY_ROW_HEIGHT }]}
            >
              <Cell width={col.sr} />
              <Cell width={col.date} />
              <Cell width={col.particulars} />
              <Cell width={col.qty} />
              <Cell width={col.amount} />
              <Cell width={col.kata} last />
            </View>
          ))}

          <View style={styles.footer} wrap={false}>
            <View style={styles.bankDetails}>
              <Text>Bank Details :</Text>
              <Text>Name : {billIssuer.bank.accountName}</Text>
              <Text>Bank : {billIssuer.bank.bankName}</Text>
            </View>
            <View style={styles.total}>
              <Text>TOTAL {"  "}{total}</Text>
            </View>
          </View>

          <View style={styles.bankBranch} wrap={false}>
            <Text>{billIssuer.bank.branch}</Text>
            <Text>RTGS/NEFT IFSC : {billIssuer.bank.ifsc}</Text>
            <Text>AC/NO: {billIssuer.bank.accountNumber}</Text>
          </View>

          <View style={styles.words} wrap={false}>
            <Text>Rupees : {amountInWords(total)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
