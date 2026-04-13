import { rooms, WHOLE_HOUSE_PRICE } from '@/lib/data'
import RoomCard from '@/components/RoomCard'
import Link from 'next/link'
import Image from 'next/image'
import { Users, Home } from 'lucide-react'

export const metadata = { title: 'Стаи | Накева Къща' }

export default function RoomsPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="relative h-64 flex items-center justify-center">
        <Image src="https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200" alt="Стаи" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="font-serif text-4xl md:text-5xl mb-2">Нашите стаи</h1>
          <p className="text-white/80">Всяка стая — уникален уют</p>
        </div>
      </div>

      {/* Whole house option */}
      <section className="py-12 bg-green text-white">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Home size={40} className="text-wood-light" />
            <div>
              <h2 className="font-serif text-2xl">Наемете цялата къща</h2>
              <p className="text-white/70 flex items-center gap-2 mt-1"><Users size={14} /> До 12 гости · Всички 4 стаи</p>
            </div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl font-bold">{WHOLE_HOUSE_PRICE} лв<span className="text-lg font-normal">/нощ</span></div>
            <Link href="/booking?room=whole" className="btn-outline mt-3 text-sm px-6 py-2">
              Резервирай цялата
            </Link>
          </div>
        </div>
      </section>

      {/* Rooms grid */}
      <section className="py-16 bg-beige">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
