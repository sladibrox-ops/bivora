import { Plus } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { invoices, formatCurrency } from '@/lib/data'

export default function InvoicesPage() {
  const total = (status: string) =>
    invoices
      .filter((i) => i.status === status)
      .reduce((s, i) => s + i.amount, 0)

  const summary = [
    { label: 'Paid', value: formatCurrency(total('paid')) },
    { label: 'Pending', value: formatCurrency(total('pending')) },
    { label: 'Overdue', value: formatCurrency(total('overdue')) },
    {
      label: 'Total Billed',
      value: formatCurrency(invoices.reduce((s, i) => s + i.amount, 0)),
    },
  ]

  return (
    <>
      <PageHeader
        title="Invoices"
        description="Track billing, payments and outstanding balances."
      />
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {summary.map((item) => (
            <Card key={item.label}>
              <CardContent className="flex flex-col gap-1 py-4">
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
                <span className="text-xl font-semibold tracking-tight tabular-nums">
                  {item.value}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>All Invoices</CardTitle>
              <CardDescription>Billing history and status</CardDescription>
            </div>
            <Button size="sm">
              <Plus data-icon="inline-start" />
              New Invoice
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden sm:table-cell">Issued</TableHead>
                  <TableHead className="hidden sm:table-cell">Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-xs">
                      {invoice.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {invoice.client}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {invoice.issued}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {invoice.due}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(invoice.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
