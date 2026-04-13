import Link from 'next/link'
import Image from 'next/image'
import { Users, Maximize2 } from 'lucide-react'
import { Room } from '@/lib/types'

export default function RoomCard({ room }: { room: Room }) {
  return (
    <div className="card">
      <div className="relative h-56 overflow-hidden">
        <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
        <div className="absolute top-3 right-3 bg-white/90 text-green text-xs font-semibold px-2 py-1 rounded-full">
          от {room.pricePerNight} лв/нощ
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl text-green mb-1">{room.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{room.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Users size={14} /> {room.capacity} гости</span>
          <span className="flex items-center gap-1"><Maximize2 size={14} /> {room.size} м²</span>
        </div>
        <div className="flex gap-2">
          <Link href={`/rooms/${room.slug}`} className="flex-1 text-center border border-green text-green text-sm py-2 rounded-md hover:bg-green hover:text-white transition-colors">
            Виж стаята
          </Link>
          <Link href={`/booking?room=${room.id}`} className="flex-1 btn-primary text-sm py-2">
            Резервирай
          </Link>
        </div>
      </div>
    </div>
  )
}
