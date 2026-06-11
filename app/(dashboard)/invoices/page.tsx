'use client'

import { useEffect, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ client_name: '', amount: '', status: 'Pending', due_date: '' })

  const supabase = createClient()

  useEffect(() => {
    supabase.from('invoices').select('*').then(({ data }) => { if (data) setInvoices(data) })
    supabase.from('clients').select('*').then(({ data }) => { if (data) setClients(data) })
  }, [])

  const handleAdd = async () => {
    const { data } = await supabase.from('invoices').insert([{ ...form, amount: Number(form.amount) }]).select()
    if (data) {
      setInvoices([...invoices, ...data])
      setOpen(false)
      setForm({ client_name: '', amount: '', status: 'Pending', due_date: '' })
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title="Invoices" description="Track billing, payments and outstanding balances.">
        <Button onClick={() => setOpen(true)}><Plus className="mr-2 h-4 w-4" />Add Invoice</Button>
      </PageHeader>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Add New Invoice</h2>
              <button onClick={() => setOpen(false)}><X /></button>
            </div>
            <select className="border rounded p-2 bg-background text-foreground" value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})}>
              <option value="">Select Client</option>
              {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
            <Input placeholder="Amount" type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
            <Input placeholder="Due Date" type="date" value={form.due_date} onChange={e => setForm({...form, due_date: e.target.value})} />
            <select className="border rounded p-2 bg-background text-foreground" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
            <Button onClick={handleAdd}>Save Invoice</Button>
          </div>
        </div>
      )}

      <Card>
        <CardHeader><CardTitle>All Invoices ({invoices.length})</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell>{inv.client_name}</TableCell>
                  <TableCell>{inv.amount}</TableCell>
                  <TableCell>{inv.status}</TableCell>
                  <TableCell>{inv.due_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
