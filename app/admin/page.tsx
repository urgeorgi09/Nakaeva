'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Booking } from '@/lib/types'
import { rooms } from '@/lib/data'
import { format, parseISO } from 'date-fns'
import { bg } from 'date-fns/locale'
import { CheckCircle2, XCircle, Trash2, RefreshCw, LogOut, DollarSign, CalendarDays, LayoutDashboard } from 'lucide-react'
import AdminCalendar from '@/components/AdminCalendar'

const STATUS_LABELS = { pending: 'Чакаща', confirmed: 'Потвърдена', cancelled: 'Отказана' }
const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

type Tab = 'bookings' | 'calendar' | 'prices'

export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('bookings')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')
  const [loading, setLoading] = useState(true)
  const [prices, setPrices] = useState<Record<string, number>>({})
  const [pricesSaved, setPricesSaved] = useState(false)

  async function loadBookings() {
    setLoading(true)
    const res = await fetch('/api/bookings')
    const data = await res.json()
    setBookings(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetch('/api/bookings').then(r => r.json()),
      fetch('/api/admin/prices').then(r => r.json()),
    ]).then(([b, p]) => {
      if (cancelled) return
      setBookings(Array.isArray(b) ? b : [])
      setPrices(p)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    loadBookings()
  }

  async function deleteBooking(id: string) {
    if (!confirm('Изтрий резервацията?')) return
    await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
    loadBookings()
  }

  async function savePrices() {
    await fetch('/api/admin/prices', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prices),
    })
    setPricesSaved(true)
    setTimeout(() => setPricesSaved(false), 2000)
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter)
  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  }

  const tabs: [Tab, string, React.ReactNode][] = [
    ['bookings', 'Резервации', <LayoutDashboard size={16} key="b" />],
    ['calendar', 'Календар', <CalendarDays size={16} key="c" />],
    ['prices', 'Цени', <DollarSign size={16} key="p" />],
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl text-green">Админ панел</h1>
          <div className="flex items-center gap-3">
            <button onClick={loadBookings} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green">
              <RefreshCw size={15} /> Обнови
            </button>
            <button onClick={logout} className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-600">
              <LogOut size={15} /> Изход
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {tabs.map(([key, label, icon]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                tab === key ? 'border-green text-green' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {icon}{label}
            </button>
          ))}
        </div>

        {/* BOOKINGS TAB */}
        {tab === 'bookings' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`p-4 rounded-xl text-left transition-all ${filter === s ? 'bg-green text-white shadow-md' : 'bg-white shadow-sm hover:shadow-md'}`}
                >
                  <div className={`text-2xl font-bold font-serif ${filter === s ? 'text-white' : 'text-green'}`}>{counts[s]}</div>
                  <div className={`text-sm ${filter === s ? 'text-white/80' : 'text-gray-500'}`}>
                    {s === 'all' ? 'Всички' : STATUS_LABELS[s]}
                  </div>
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-12 text-gray-400">Зареждане...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-400">Няма резервации</div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-beige text-gray-600 text-xs uppercase tracking-wider">
                      <tr>
                        {['Гост', 'Стая', 'Настаняване', 'Напускане', 'Гости', 'Цена', 'Статус', 'Действия'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filtered.map((b) => {
                        const room = b.isWholeHouse ? null : rooms.find((r) => r.id === b.roomId)
                        return (
                          <tr key={b.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="font-medium">{b.guestName}</div>
                              <div className="text-gray-400 text-xs">{b.guestEmail}</div>
                              <div className="text-gray-400 text-xs">{b.guestPhone}</div>
                            </td>
                            <td className="px-4 py-3">{b.isWholeHouse ? 'Цяла къща' : room?.name || '—'}</td>
                            <td className="px-4 py-3">{format(parseISO(b.checkIn), 'd MMM yyyy', { locale: bg })}</td>
                            <td className="px-4 py-3">{format(parseISO(b.checkOut), 'd MMM yyyy', { locale: bg })}</td>
                            <td className="px-4 py-3">{b.guests}</td>
                            <td className="px-4 py-3 font-medium">{b.totalPrice} лв</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[b.status]}`}>
                                {STATUS_LABELS[b.status]}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {b.status !== 'confirmed' && (
                                  <button onClick={() => updateStatus(b.id, 'confirmed')} title="Потвърди" className="text-green hover:opacity-70">
                                    <CheckCircle2 size={18} />
                                  </button>
                                )}
                                {b.status !== 'cancelled' && (
                                  <button onClick={() => updateStatus(b.id, 'cancelled')} title="Откажи" className="text-red-400 hover:opacity-70">
                                    <XCircle size={18} />
                                  </button>
                                )}
                                <button onClick={() => deleteBooking(b.id)} title="Изтрий" className="text-gray-300 hover:text-red-400">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* CALENDAR TAB */}
        {tab === 'calendar' && (
          <div className="max-w-2xl">
            {loading ? (
              <div className="text-center py-12 text-gray-400">Зареждане...</div>
            ) : (
              <AdminCalendar bookings={bookings} />
            )}
          </div>
        )}

        {/* PRICES TAB */}
        {tab === 'prices' && (
          <div className="max-w-lg space-y-4">
            <p className="text-sm text-gray-500 mb-6">
              Промените важат веднага за нови резервации. За постоянни промени обнови{' '}
              <code className="bg-gray-100 px-1 rounded">lib/data.ts</code>.
            </p>
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium">{room.name}</div>
                  <div className="text-xs text-gray-400">{room.capacity} гости · {room.size} м²</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={prices[room.id] ?? room.pricePerNight}
                    onChange={(e) => setPrices((p) => ({ ...p, [room.id]: +e.target.value }))}
                    className="w-24 border border-beige-dark rounded-lg px-3 py-1.5 text-sm text-right focus:outline-none focus:border-green"
                  />
                  <span className="text-sm text-gray-400">лв/нощ</span>
                </div>
              </div>
            ))}
            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between gap-4">
              <div>
                <div className="font-medium">Цяла къща</div>
                <div className="text-xs text-gray-400">До 12 гости</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  value={prices['whole'] ?? 600}
                  onChange={(e) => setPrices((p) => ({ ...p, whole: +e.target.value }))}
                  className="w-24 border border-beige-dark rounded-lg px-3 py-1.5 text-sm text-right focus:outline-none focus:border-green"
                />
                <span className="text-sm text-gray-400">лв/нощ</span>
              </div>
            </div>
            <button onClick={savePrices} className="btn-primary w-full py-3">
              {pricesSaved ? '✓ Запазено!' : 'Запази цените'}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
