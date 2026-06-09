import { Plus } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import { clients, formatCurrency } from '@/lib/data'

export default function ClientsPage() {
  const summary = [
    { label: 'Total Clients', value: clients.length },
    {
      label: 'Active',
      value: clients.filter((c) => c.status === 'active').length,
    },
    { label: 'Leads', value: clients.filter((c) => c.status === 'lead').length },
    {
      label: 'Lifetime Revenue',
      value: formatCurrency(clients.reduce((s, c) => s + c.revenue, 0)),
    },
  ]

  return (
    <>
      <PageHeader
        title="Clients"
        description="Manage relationships and track account revenue."
      />
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {summary.map((item) => (
            <Card key={item.label}>
              <CardContent className="flex flex-col gap-1 py-4">
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
                <span className="text-xl font-semibold tracking-tight">
                  {item.value}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>All Clients</CardTitle>
              <CardDescription>
                {clients.length} accounts in your workspace
              </CardDescription>
            </div>
            <Button size="sm">
              <Plus data-icon="inline-start" />
              Add Client
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Company</TableHead>
                  <TableHead className="hidden lg:table-cell">Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">
                    Projects
                  </TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-secondary text-xs">
                            {client.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {client.name}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {client.id}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {client.company}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {client.email}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={client.status} />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-right tabular-nums">
                      {client.projects}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(client.revenue)}
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
