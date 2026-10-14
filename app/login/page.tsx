'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Mode = 'login' | 'register' | 'reset'

const supabase = createClient()

const errorMessages: Record<string, string> = {
  'Invalid login credentials': 'Pogrešan email ili lozinka.',
  'Email not confirmed': 'Email još nije potvrđen. Provjeri inbox.',
  'User already registered': 'Korisnik s ovim emailom već postoji.',
}

const translateError = (message: string) =>
  errorMessages[message] ??
  (message.includes('Password should be at least')
    ? 'Lozinka mora imati najmanje 6 znakova.'
    : message)

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('error') === 'potvrda') {
      setError('Link za potvrdu nije valjan ili je istekao. Pokušaj ponovo.')
    }
  }, [])

  const switchMode = (next: Mode) => {
    setMode(next)
    setError('')
    setInfo('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setInfo('')

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(translateError(error.message))
        setLoading(false)
      } else {
        router.push('/')
        router.refresh()
      }
      return
    }

    if (mode === 'register') {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      })
      setLoading(false)
      if (error) {
        setError(translateError(error.message))
      } else if (data.session) {
        router.push('/')
        router.refresh()
      } else {
        setInfo('Račun je kreiran. Poslali smo ti email s linkom za potvrdu.')
      }
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/nova-lozinka`,
    })
    setLoading(false)
    if (error) setError(translateError(error.message))
    else setInfo('Ako račun postoji, poslali smo ti email za reset lozinke.')
  }

  const titles: Record<Mode, [string, string, string, string]> = {
    login: ['Dobrodošli nazad', 'Prijavi se na svoj račun', 'Prijava', 'Prijavljujem...'],
    register: ['Kreiraj račun', 'Registriraj se za BIVORA', 'Registracija', 'Kreiram račun...'],
    reset: ['Zaboravljena lozinka', 'Unesi email za reset lozinke', 'Pošalji link', 'Šaljem...'],
  }
  const [title, subtitle, buttonLabel, loadingLabel] = titles[mode]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">B</div>
          <div>
            <h1 className="text-xl font-bold">BIVORA</h1>
            <p className="text-sm text-muted-foreground">Business Suite</p>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-6">{subtitle}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-border bg-background" placeholder="ti@primjer.com" />
          </div>
          {mode !== 'reset' && (
            <div>
              <label className="text-sm font-medium mb-1 block">Lozinka</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="w-full px-3 py-2 rounded-lg border border-border bg-background" placeholder="••••••••" />
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {info && <p className="text-emerald-500 text-sm">{info}</p>}
          <button type="submit" disabled={loading} className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
            {loading ? loadingLabel : buttonLabel}
          </button>
        </form>
        <div className="mt-6 flex flex-col gap-2 text-sm text-center text-muted-foreground">
          {mode === 'login' && (
            <>
              <button type="button" onClick={() => switchMode('register')} className="hover:text-foreground">
                Nemaš račun? <span className="text-primary font-medium">Registriraj se</span>
              </button>
              <button type="button" onClick={() => switchMode('reset')} className="hover:text-foreground">
                Zaboravljena lozinka?
              </button>
            </>
          )}
          {mode !== 'login' && (
            <button type="button" onClick={() => switchMode('login')} className="hover:text-foreground">
              Već imaš račun? <span className="text-primary font-medium">Prijavi se</span>
            </button>
          )}
          <a href="/privacy" className="hover:text-foreground">Politika privatnosti</a>
        </div>
      </div>
    </div>
  )
}
