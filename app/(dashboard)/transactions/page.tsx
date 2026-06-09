import { ArrowDownLeft, ArrowUpRight, Plus } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { cn } from '@/lib/utils'
import { transactions, formatCurrency } from '@/lib/data'

export default function TransactionsPage() {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0)
  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0)

  const summary = [
    { label: 'Total Income', value: formatCurrency(income) },
    { label: 'Total Expenses', value: formatCurrency(expense) },
    { label: 'Net Cash Flow', value: formatCurrency(income - expense) },
  ]

  return (
    <>
      <PageHeader
        title="Transactions"
        description="A complete ledger of money in and out."
      />
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Income and expense activity</CardDescription>
            </div>
            <Button size="sm">
              <Plus data-icon="inline-start" />
              Add Transaction
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            'flex size-8 items-center justify-center rounded-full',
                            tx.type === 'income'
                              ? 'bg-primary/15 text-primary'
                              : 'bg-destructive/15 text-destructive',
                          )}
                        >
                          {tx.type === 'income' ? (
                            <ArrowDownLeft className="size-4" />
                          ) : (
                            <ArrowUpRight className="size-4" />
                          )}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {tx.description}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground sm:hidden">
                            {tx.category}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary">{tx.category}</Badge>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {tx.date}
                    </TableCell>
                    <TableCell
                      className={cn(
                        'text-right font-medium tabular-nums',
                        tx.type === 'income'
                          ? 'text-primary'
                          : 'text-foreground',
                      )}
                    >
                      {tx.type === 'income' ? '+' : '-'}
                      {formatCurrency(tx.amount)}
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
