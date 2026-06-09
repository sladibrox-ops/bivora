import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { StatCards, type Stat } from '@/components/stat-cards'
import { RevenueChart } from '@/components/revenue-chart'
import { StatusBadge } from '@/components/status-badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { invoices, clients, formatCurrency } from '@/lib/data'

const stats: Stat[] = [
  { label: 'Total Revenue', value: '$358,200', delta: '+12.4%', trend: 'up', hint: 'vs last month' },
  { label: 'Active Clients', value: '42', delta: '+5', trend: 'up', hint: 'this quarter' },
  { label: 'Open Invoices', value: '$108,650', delta: '-3.1%', trend: 'down', hint: 'pending + overdue' },
  { label: 'Active Projects', value: '18', delta: '+2', trend: 'up', hint: 'in progress' },
]

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome back — here is what's happening across your business."
      />
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <StatCards stats={stats} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <RevenueChart />

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Top Clients</CardTitle>
                <CardDescription>By total revenue</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<Link href="/clients" />}
              >
                View all
                <ArrowUpRight data-icon="inline-end" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {clients
                .filter((c) => c.revenue > 0)
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 5)
                .map((client) => (
                  <div key={client.id} className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarFallback className="bg-secondary text-xs">
                        {client.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium">{client.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {client.company}
                      </span>
                    </div>
                    <span className="text-sm font-medium tabular-nums">
                      {formatCurrency(client.revenue)}
                    </span>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Latest billing activity</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href="/invoices" />}
            >
              View all
              <ArrowUpRight data-icon="inline-end" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden sm:table-cell">Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.slice(0, 5).map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-xs">
                      {invoice.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {invoice.client}
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
