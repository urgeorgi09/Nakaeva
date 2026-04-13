'use client'
import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Booking } from '@/lib/types'
import { rooms } from '@/lib/data'
import { format, parseISO, eachDayOfInterval } from 'date-fns'
import { bg } from 'date-fns/locale'
import { X, Users, CalendarDays, Phone, Mail } from 'lucide-react'

const STATUS_LABELS = { pending: 'Чакаща', confirmed: 'Потвърдена', cancelled: 'Отказана' }
const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

function getBookedDates(bookings: Booking[]): Map<string, Booking[]> {
  const map = new Map<string, Booking[]>()
  for (const b of bookings) {
    if (b.status === 'cancelled') continue
    const days = eachDayOfInterval({ start: parseISO(b.checkIn), end: parseISO(b.checkOut) })
    for (const day of days) {
      const key = format(day, 'yyyy-MM-dd')
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(b)
    }
  }
  return map
}

export default function AdminCalendar({ bookings }: { bookings: Booking[] }) {
  const [selected, setSelected] = useState<Date | null>(null)
  const bookedMap = getBookedDates(bookings)

  const dateKey = selected ? format(selected, 'yyyy-MM-dd') : null
  const selectedBookings = dateKey ? (bookedMap.get(dateKey) ?? []) : []

  function tileClassName({ date }: { date: Date }) {
    const key = format(date, 'yyyy-MM-dd')
    if (!bookedMap.has(key)) return null
    const bs = bookedMap.get(key)!
    if (bs.some((b) => b.status === 'confirmed')) return 'booked-confirmed'
    if (bs.some((b) => b.status === 'pending')) return 'booked-pending'
    return null
  }

  function tileContent({ date }: { date: Date }) {
    const key = format(date, 'yyyy-MM-dd')
    const bs = bookedMap.get(key)
    if (!bs) return null
    return (
      <div className="flex justify-center mt-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <style>{`
        .react-calendar { width: 100%; border: none; font-family: inherit; background: white; border-radius: 1rem; padding: 1rem; box-shadow: 0 1px 8px rgba(0,0,0,0.08); }
        .react-calendar__tile { border-radius: 0.5rem; padding: 0.6rem 0.3rem; }
        .react-calendar__tile:hover { background: #f5f0e8; }
        .react-calendar__tile--active { background: #3d5a3e !important; color: white !important; }
        .react-calendar__tile--now { background: #e8dfc8; }
        .react-calendar__navigation button:hover { background: #f5f0e8; border-radius: 0.5rem; }
        .booked-confirmed { background: #dcfce7 !important; color: #166534 !important; font-weight: 600; }
        .booked-pending { background: #fef9c3 !important; color: #854d0e !important; font-weight: 600; }
        .booked-confirmed.react-calendar__tile--active,
        .booked-pending.react-calendar__tile--active { background: #3d5a3e !important; color: white !important; }
      `}</style>

      <div className="flex gap-4 text-sm">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-200 inline-block" /> Потвърдена</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-yellow-200 inline-block" /> Чакаща</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-100 inline-block border" /> Свободна</span>
      </div>

      <Calendar
        locale="bg-BG"
        onClickDay={(date) => setSelected(date)}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />

      {selected && (
        <div className="bg-white rounded-2xl shadow-lg border border-beige-dark p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg text-green">
              {format(selected, 'd MMMM yyyy', { locale: bg })}
            </h3>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>

          {selectedBookings.length === 0 ? (
            <p className="text-gray-400 text-sm">Няма резервации за тази дата.</p>
          ) : (
            <div className="space-y-4">
              {selectedBookings.map((b) => {
                const room = b.isWholeHouse ? null : rooms.find((r) => r.id === b.roomId)
                return (
                  <div key={b.id} className="border border-beige-dark rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{b.guestName}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[b.status]}`}>
                        {STATUS_LABELS[b.status]}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={13} />
                        {format(parseISO(b.checkIn), 'd MMM', { locale: bg })} &rarr; {format(parseISO(b.checkOut), 'd MMM yyyy', { locale: bg })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={13} />
                        {b.guests} гости &middot; {b.isWholeHouse ? 'Цяла къща' : room?.name ?? '—'}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={13} /> {b.guestPhone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={13} /> {b.guestEmail}
                      </div>
                      <div className="font-medium text-green">{b.totalPrice} лв</div>
                    </div>
                    {b.notes && (
                      <p className="text-xs text-gray-400 italic">{b.notes}</p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
