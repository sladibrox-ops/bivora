'use client'

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', status: 'Active', revenue: 0 })

  const supabase = createClient()

  useEffect(() => {
    supabase.from('clients').select('*').then(({ data }) => {
      if (data) setClients(data)
    })
  }, [])

  const handleAdd = async () => {
    const { data } = await supabase.from('clients').insert([form]).select()
    if (data) {
      setClients([...clients, ...data])
      setOpen(false)
      setForm({ name: '', company: '', email: '', phone: '', status: 'Active', revenue: 0 })
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title="Clients" description="Manage relationships and track account revenue.">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Add Client</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Client</DialogTitle></DialogHeader>
            <div className="flex flex-col gap-4">
              <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div><Label>Company</Label><Input value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
              <div><Label>Email</Label><Input value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
              <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
              <Button onClick={handleAdd}>Save Client</Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageHeader>
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
