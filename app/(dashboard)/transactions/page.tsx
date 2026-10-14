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

const emptyForm = { description: '', category: '', amount: '', date: '', type: 'income' }

const formatAmount = (n: number) =>
  new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' }).format(n)

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    setMounted(true)
    supabase.from('transactions').select('*').order('date', { ascending: false }).then(({ data, error }) => {
      if (error) setError(error.message)
      if (data) setTransactions(data)
    })
  }, [])

  const handleAdd = async () => {
    if (!form.description || !form.amount) return
    const row = { ...form, amount: Number(form.amount), date: form.date || new Date().toISOString().slice(0, 10) }
    const { data, error } = await supabase.from('transactions').insert([row]).select()
    if (error) {
      setError(error.message)
      return
    }
    if (data) {
      setTransactions([...data, ...transactions])
      setOpen(false)
      setForm(emptyForm)
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('transactions').delete().eq('id', id)
    if (error) setError(error.message)
    else setTransactions(transactions.filter(t => t.id !== id))
  }

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title="Transakcije" description="Prihodi i rashodi tvoje firme.">
        <Button onClick={() => setOpen(true)}><Plus className="mr-2 h-4 w-4" />Dodaj transakciju</Button>
      </PageHeader>

      {error && <p className="text-sm text-red-500">Greška: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card><CardHeader><p className="text-sm text-muted-foreground">Prihodi</p><CardTitle className="text-green-400">{formatAmount(income)}</CardTitle></CardHeader></Card>
        <Card><CardHeader><p className="text-sm text-muted-foreground">Rashodi</p><CardTitle className="text-red-400">{formatAmount(expense)}</CardTitle></CardHeader></Card>
        <Card><CardHeader><p className="text-sm text-muted-foreground">Saldo</p><CardTitle>{formatAmount(income - expense)}</CardTitle></CardHeader></Card>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Nova transakcija</h2>
              <button onClick={() => setOpen(false)}><X /></button>
            </div>
            <select className="border rounded p-2 bg-background text-foreground" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="income">Prihod</option>
              <option value="expense">Rashod</option>
            </select>
            <Input placeholder="Opis" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <Input placeholder="Kategorija (npr. Plaće, Usluge)" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            <Input placeholder="Iznos (€)" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
            <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            <Button onClick={handleAdd}>Spremi transakciju</Button>
          </div>
        </div>
      )}

      <Card>
        <CardHeader><CardTitle>Sve transakcije ({transactions.length})</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Opis</TableHead>
                <TableHead>Kategorija</TableHead>
                <TableHead className="text-right">Iznos</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {mounted && transactions.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="text-muted-foreground">{t.date ? new Date(t.date).toLocaleDateString('hr-HR') : ''}</TableCell>
                  <TableCell className="font-medium">{t.description}</TableCell>
                  <TableCell>{t.category}</TableCell>
                  <TableCell className={`text-right font-medium ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                    {t.type === 'income' ? '+' : '−'}{formatAmount(Number(t.amount))}
                  </TableCell>
                  <TableCell className="text-right">
                    <button onClick={() => handleDelete(t.id)} className="text-muted-foreground hover:text-red-500" aria-label="Obriši">
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
