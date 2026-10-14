'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, X } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'

const supabase = createClient()

const emptyForm = { name: '', company: '', email: '', status: 'Aktivan' }

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    setMounted(true)
    supabase.from('clients').select('*').then(({ data, error }) => {
      if (error) setError(error.message)
      if (data) setClients(data)
    })
  }, [])

  const handleAdd = async () => {
    if (!form.name) return
    const { data, error } = await supabase.from('clients').insert([form]).select()
    if (error) {
      setError(error.message)
      return
    }
    if (data) {
      setClients([...clients, ...data])
      setOpen(false)
      setForm(emptyForm)
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('clients').delete().eq('id', id)
    if (error) setError(error.message)
    else setClients(clients.filter(c => c.id !== id))
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title="Klijenti" description="Tvoji klijenti i kontakti na jednom mjestu.">
        <Button onClick={() => setOpen(true)}><Plus className="mr-2 h-4 w-4" />Dodaj klijenta</Button>
      </PageHeader>

      {error && <p className="text-sm text-red-500">Greška: {error}</p>}

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Novi klijent</h2>
              <button onClick={() => setOpen(false)}><X /></button>
            </div>
            <Input placeholder="Ime i prezime" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Firma" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
            <Input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <select className="border rounded p-2 bg-background text-foreground" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="Aktivan">Aktivan</option>
              <option value="Potencijalni">Potencijalni</option>
              <option value="Neaktivan">Neaktivan</option>
            </select>
            <Button onClick={handleAdd}>Spremi klijenta</Button>
          </div>
        </div>
      )}

      <Card>
        <CardHeader><CardTitle>Svi klijenti ({clients.length})</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ime</TableHead>
                <TableHead>Firma</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {mounted && clients.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.company}</TableCell>
                  <TableCell className="text-muted-foreground">{c.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      c.status === 'Aktivan' ? 'bg-green-500/20 text-green-400' :
                      c.status === 'Potencijalni' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>{c.status}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <button onClick={() => handleDelete(c.id)} className="text-muted-foreground hover:text-red-500" aria-label="Obriši">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
