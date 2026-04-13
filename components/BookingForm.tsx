'use client'
import { useState } from 'react'
import { rooms, WHOLE_HOUSE_PRICE } from '@/lib/data'
import { calculateNights } from '@/lib/booking'
import { CalendarDays, Users, Home, BedDouble } from 'lucide-react'

interface Props {
  preselectedRoomId?: string
}

export default function BookingForm({ preselectedRoomId }: Props) {
  const [form, setForm] = useState({
    roomId: preselectedRoomId || 'whole',
    checkIn: '',
    checkOut: '',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const selectedRoom = rooms.find((r) => r.id === form.roomId)
  const nights = form.checkIn && form.checkOut ? calculateNights(form.checkIn, form.checkOut) : 0
  const price = nights > 0 ? nights * (selectedRoom ? selectedRoom.pricePerNight : WHOLE_HOUSE_PRICE) : 0

  const set = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, totalPrice: price, isWholeHouse: form.roomId === 'whole' }),
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-serif text-2xl text-green mb-2">Заявката е изпратена!</h2>
        <p className="text-gray-600">Ще се свържем с вас в рамките на 2 часа за потвърждение.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Избор: цяла къща или стая */}
      <div>
        <label className="block text-sm font-medium mb-2">Какво искате да наемете?</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => set('roomId', 'whole')}
            className={`flex items-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-colors ${form.roomId === 'whole' ? 'border-green bg-green text-white' : 'border-beige-dark hover:border-green'}`}
          >
            <Home size={16} /> Цялата къща
          </button>
          <button
            type="button"
            onClick={() => set('roomId', rooms[0].id)}
            className={`flex items-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-colors ${form.roomId !== 'whole' ? 'border-green bg-green text-white' : 'border-beige-dark hover:border-green'}`}
          >
            <BedDouble size={16} /> Конкретна стая
          </button>
        </div>
      </div>

      {/* Избор на стая */}
      {form.roomId !== 'whole' && (
        <div>
          <label className="block text-sm font-medium mb-2">Изберете стая</label>
          <select
            value={form.roomId}
            onChange={(e) => set('roomId', e.target.value)}
            className="w-full border border-beige-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green"
          >
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>{r.name} — {r.pricePerNight} лв/нощ</option>
            ))}
          </select>
        </div>
      )}

      {/* Дати */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1"><CalendarDays size={14} /> Настаняване</label>
          <input type="date" value={form.checkIn} onChange={(e) => set('checkIn', e.target.value)} required
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-beige-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1"><CalendarDays size={14} /> Напускане</label>
          <input type="date" value={form.checkOut} onChange={(e) => set('checkOut', e.target.value)} required
            min={form.checkIn || new Date().toISOString().split('T')[0]}
            className="w-full border border-beige-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
      </div>

      {/* Брой гости */}
      <div>
        <label className="block text-sm font-medium mb-1 flex items-center gap-1"><Users size={14} /> Брой гости</label>
        <input type="number" min={1} max={12} value={form.guests} onChange={(e) => set('guests', +e.target.value)} required
          className="w-full border border-beige-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green" />
      </div>

      {/* Цена */}
      {price > 0 && (
        <div className="bg-beige rounded-lg p-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">{nights} нощ{nights !== 1 ? 'и' : ''} × {selectedRoom ? selectedRoom.pricePerNight : WHOLE_HOUSE_PRICE} лв</span>
          <span className="font-serif text-xl text-green font-bold">{price} лв</span>
        </div>
      )}

      {/* Лични данни */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Вашето име</label>
          <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} required placeholder="Иван Иванов"
            className="w-full border border-beige-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Телефон</label>
          <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} required placeholder="+359 888 000 000"
            className="w-full border border-beige-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Имейл</label>
        <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required placeholder="ivan@example.com"
          className="w-full border border-beige-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Бележки (по желание)</label>
        <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={3} placeholder="Специални изисквания..."
          className="w-full border border-beige-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green resize-none" />
      </div>

      <button type="submit" disabled={loading} className="w-full btn-primary py-3 text-base">
        {loading ? 'Изпращане...' : 'Изпрати заявка за резервация'}
      </button>
    </form>
  )
}
