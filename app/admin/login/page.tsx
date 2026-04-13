'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-green rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock size={20} className="text-white" />
          </div>
          <h1 className="font-serif text-2xl text-green">Админ панел</h1>
          <p className="text-sm text-gray-500 mt-1">Накева Къща</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Парола</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="••••••••"
              className="w-full border border-beige-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full btn-primary py-2.5">
            {loading ? 'Влизане...' : 'Влез'}
          </button>
        </form>
      </div>
    </div>
  )
}
