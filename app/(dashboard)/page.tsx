'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { StatCards, type Stat } from '@/components/stat-cards'
import { RevenueChart, type RevenuePoint } from '@/components/revenue-chart'
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
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

const formatEur = (n: number) =>
  new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)

const isPaid = (status?: string) => status?.toLowerCase() === 'paid'

// Zadnjih 6 mjeseci, prihodi i rashodi iz tablice transactions.
function monthlyTotals(transactions: any[]): RevenuePoint[] {
  const now = new Date()
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    return {
      key: `${d.getFullYear()}-${d.getMonth()}`,
      month: d.toLocaleDateString('hr-HR', { month: 'short' }),
      revenue: 0,
      expenses: 0,
    }
  })
  for (const t of transactions) {
    if (!t.date) continue
    const d = new Date(t.date)
    const m = months.find((m) => m.key === `${d.getFullYear()}-${d.getMonth()}`)
    if (!m) continue
    if (t.type === 'income') m.revenue += Number(t.amount)
    else if (t.type === 'expense') m.expenses += Number(t.amount)
  }
  return months.map(({ month, revenue, expenses }) => ({ month, revenue, expenses }))
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [clients, setClients] = useState<any[]>([])
  const [invoices, setInvoices] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
    supabase.from('clients').select('*').then(({ data }) => {
      if (data) setClients(data)
    })
    supabase.from('invoices').select('*').then(({ data }) => {
      if (data) setInvoices(data)
    })
    supabase.from('projects').select('*').then(({ data }) => {
      if (data) setProjects(data)
    })
    supabase.from('transactions').select('*').then(({ data }) => {
      if (data) setTransactions(data)
    })
  }, [])

  const paidTotal = invoices.filter((i) => isPaid(i.status)).reduce((s, i) => s + Number(i.amount), 0)
  const openTotal = invoices.filter((i) => !isPaid(i.status)).reduce((s, i) => s + Number(i.amount), 0)
  const activeClients = clients.filter((c) => !c.status || c.status === 'Aktivan').length
  const activeProjects = projects.filter((p) => p.status !== 'završeno').length

  const stats: Stat[] = [
    { label: 'Naplaćeno', value: formatEur(paidTotal), hint: 'plaćene fakture' },
    { label: 'Aktivni klijenti', value: String(activeClients), hint: `od ukupno ${clients.length}` },
    { label: 'Otvorene fakture', value: formatEur(openTotal), hint: 'na čekanju i kasne' },
    { label: 'Aktivni projekti', value: String(activeProjects), hint: `od ukupno ${projects.length}` },
  ]

  const revenueByClient = new Map<string, number>()
  for (const i of invoices) {
    if (!isPaid(i.status) || !i.client_name) continue
    revenueByClient.set(i.client_name, (revenueByClient.get(i.client_name) ?? 0) + Number(i.amount))
  }
  const topClients = [...revenueByClient.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)

  const recentInvoices = [...invoices]
    .sort((a, b) => String(b.created_at ?? b.due_date ?? '').localeCompare(String(a.created_at ?? a.due_date ?? '')))
    .slice(0, 5)

  return (
    <>
      <PageHeader
        title="Nadzorna ploča"
        description="Dobrodošli nazad. Ovo se trenutno događa u tvom poslovanju."
      />
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <StatCards stats={stats} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <RevenueChart data={monthlyTotals(transactions)} />

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Najbolji klijenti</CardTitle>
                <CardDescription>Po plaćenim fakturama</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<Link href="/clients" />}
              >
                Svi
                <ArrowUpRight data-icon="inline-end" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {mounted && topClients.length === 0 && (
                <p className="text-sm text-muted-foreground">Još nema plaćenih faktura.</p>
              )}
              {mounted && topClients.map(([name, total]) => (
                <div key={name} className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-secondary text-xs">
                      {name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex-1 text-sm font-medium">{name}</span>
                  <span className="text-sm font-medium tabular-nums">{formatEur(total)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Zadnje fakture</CardTitle>
              <CardDescription>Najnovije naplate</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href="/invoices" />}
            >
              Sve
              <ArrowUpRight data-icon="inline-end" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Klijent</TableHead>
                  <TableHead className="hidden sm:table-cell">Rok</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Iznos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mounted && recentInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.client_name}</TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('hr-HR') : ''}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={String(invoice.status ?? '').toLowerCase()} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatEur(Number(invoice.amount))}
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
