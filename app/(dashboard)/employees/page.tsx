'use client'

import { useEffect, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const supabase = createClient()

const statusLabels: Record<string, string> = { Active: 'Aktivan', Remote: 'Na daljinu', 'On Leave': 'Na odsustvu' }

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', department: '', email: '', status: 'Active' })

  useEffect(() => {
    setMounted(true)
    supabase.from('employees').select('*').then(({ data }) => {
      if (data) setEmployees(data)
    })
  }, [])

  const handleAdd = async () => {
    if (!form.name) return
    const { data } = await supabase.from('employees').insert([form]).select()
    if (data) {
      setEmployees([...employees, ...data])
      setOpen(false)
      setForm({ name: '', role: '', department: '', email: '', status: 'Active' })
    }
  }

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title="Zaposlenici" description="Imenik tvog tima i pregled zaposlenih.">
        <Button onClick={() => setOpen(true)}><Plus className="mr-2 h-4 w-4" />Dodaj zaposlenika</Button>
      </PageHeader>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Novi zaposlenik</h2>
              <button onClick={() => setOpen(false)}><X /></button>
            </div>
            <Input placeholder="Ime i prezime" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <Input placeholder="Pozicija (npr. Dizajner)" value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
            <Input placeholder="Odjel" value={form.department} onChange={e => setForm({...form, department: e.target.value})} />
            <Input placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <select className="border rounded p-2 bg-background text-foreground" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option value="Active">Aktivan</option>
              <option value="Remote">Na daljinu</option>
              <option value="On Leave">Na odsustvu</option>
            </select>
            <Button onClick={handleAdd}>Spremi zaposlenika</Button>
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">Članova tima: {employees.length}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mounted && employees.map(emp => (
          <Card key={emp.id}>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold">
                {getInitials(emp.name)}
              </div>
              <div>
                <CardTitle className="text-base">{emp.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{emp.role}</p>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm">
              <span className={`w-fit px-2 py-1 rounded-full text-xs font-medium ${
                emp.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                emp.status === 'On Leave' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>{statusLabels[emp.status] ?? emp.status}</span>
              <div className="flex justify-between"><span className="text-muted-foreground">Odjel</span><span className="font-medium">{emp.department}</span></div>
              <div className="text-muted-foreground">{emp.email}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
