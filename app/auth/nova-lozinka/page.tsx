'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const supabase = createClient()

export default function NewPasswordPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError('Lozinku nije moguće promijeniti. Zatraži novi link.')
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-xl border border-border bg-card">
        <h2 className="text-2xl font-semibold mb-2">Nova lozinka</h2>
        <p className="text-muted-foreground mb-6">Unesi novu lozinku za svoj račun</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="w-full px-3 py-2 rounded-lg border border-border bg-background" placeholder="••••••••" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
            {loading ? 'Spremam...' : 'Spremi lozinku'}
          </button>
        </form>
      </div>
    </div>
  )
}
