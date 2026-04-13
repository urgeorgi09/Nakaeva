'use client'
import { useState } from 'react'
import Link from 'next/link'
import { rooms } from '@/lib/data'
import { Room } from '@/lib/types'
import { Users, Maximize2, X } from 'lucide-react'
import Image from 'next/image'

function FloorPlan({ floor, onRoomClick }: { floor: number; onRoomClick: (r: Room) => void }) {
  const floorRooms = rooms.filter((r) => r.floor === floor)
  return (
    <div className="relative bg-beige-dark rounded-2xl overflow-hidden" style={{ paddingBottom: '60%' }}>
      <div className="absolute inset-0 p-4">
        <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
          {floor === 1 ? 'Първи етаж' : 'Втори етаж'}
        </div>
        {floorRooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onRoomClick(room)}
            className="absolute bg-white/80 hover:bg-green hover:text-white border-2 border-wood/30 hover:border-green rounded-lg transition-all duration-200 flex flex-col items-center justify-center text-center p-2 group"
            style={{
              left: `${room.position.x}%`,
              top: `${room.position.y + 8}%`,
              width: `${room.position.w}%`,
              height: `${room.position.h}%`,
            }}
          >
            <span className="font-serif text-xs md:text-sm font-semibold leading-tight">{room.name}</span>
            <span className="text-xs text-gray-500 group-hover:text-white/80 mt-1">{room.capacity} гости</span>
          </button>
        ))}
        {/* Common areas */}
        <div className="absolute bg-beige/60 border border-beige-dark rounded-lg flex items-center justify-center text-xs text-gray-400"
          style={{ left: '40%', top: '8%', width: '20%', height: '35%' }}>
          Коридор
        </div>
        <div className="absolute bg-beige/60 border border-beige-dark rounded-lg flex items-center justify-center text-xs text-gray-400"
          style={{ left: '40%', top: '45%', width: '20%', height: '40%' }}>
          Баня
        </div>
      </div>
    </div>
  )
}

export default function TheHousePage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [activeFloor, setActiveFloor] = useState(1)

  return (
    <div className="pt-16">
      <div className="relative h-48 flex items-center justify-center bg-green">
        <div className="text-center text-white">
          <h1 className="font-serif text-4xl mb-2">Разпределение на къщата</h1>
          <p className="text-white/70">Кликнете върху стая за повече информация</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Floor tabs */}
        <div className="flex gap-3 mb-8">
          {[1, 2].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFloor(f)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeFloor === f ? 'bg-green text-white' : 'bg-beige text-gray-600 hover:bg-beige-dark'}`}
            >
              {f === 1 ? 'Първи етаж' : 'Втори етаж'}
            </button>
          ))}
        </div>

        <FloorPlan floor={activeFloor} onRoomClick={setSelectedRoom} />

        {/* Room list */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => { setSelectedRoom(room); setActiveFloor(room.floor) }}
              className="text-left p-4 bg-white rounded-xl border border-beige-dark hover:border-green transition-colors"
            >
              <div className="w-3 h-3 rounded-full bg-green mb-2" />
              <div className="font-medium text-sm">{room.name}</div>
              <div className="text-xs text-gray-400">Етаж {room.floor} · {room.capacity} гости</div>
            </button>
          ))}
        </div>
      </div>

      {/* Room modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setSelectedRoom(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-48">
              <Image src={selectedRoom.images[0]} alt={selectedRoom.name} fill className="object-cover" />
              <button onClick={() => setSelectedRoom(null)} className="absolute top-3 right-3 bg-white/90 rounded-full p-1">
                <X size={18} />
              </button>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl text-green mb-2">{selectedRoom.name}</h3>
              <div className="flex gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1"><Users size={14} /> {selectedRoom.capacity} гости</span>
                <span className="flex items-center gap-1"><Maximize2 size={14} /> {selectedRoom.size} м²</span>
              </div>
              <p className="text-sm text-gray-600 mb-5">{selectedRoom.description}</p>
              <div className="flex gap-3">
                <Link href={`/rooms/${selectedRoom.slug}`} className="flex-1 text-center border border-green text-green text-sm py-2 rounded-lg hover:bg-green hover:text-white transition-colors">
                  Виж стаята
                </Link>
                <Link href={`/booking?room=${selectedRoom.id}`} className="flex-1 btn-primary text-sm py-2">
                  Резервирай
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
