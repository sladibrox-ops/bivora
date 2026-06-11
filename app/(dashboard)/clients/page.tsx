'use client'

import { useEffect, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '' })

  const supabase = createClient()

  useEffect(() => {
    supabase.from('clients').select('*').then(({ data }) => {
      if (data) setClients(data)
    })
  }, [])

  const handleAdd = async () => {
    const { data } = await supabase.from('clients').insert([{ ...form, status: 'Active', revenue: 0 }]).select()
    if (data) {
      setClients([...clients, ...data])
      setOpen(false)
      setForm({ name: '', company: '', email: '', phone: '' })
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title="Clients" description="Manage relationships and track account revenue.">
        <Button onClick={() => setOpen(true)}><Plus className="mr-2 h-4 w-4" />Add Client</Button>
      </PageHeader>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Add New Client</h2>
              <button onClick={() => setOpen(false)}><X /></button>
            </div>
            <Input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <Input placeholder="Company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
            <Input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <Input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            <Button onClick={handleAdd}>Save Client</Button>
          </div>
        </div>
      )}

      <Card>
        <CardHeader><CardTitle>All Clients ({clients.length})</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.company}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell>${c.revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
