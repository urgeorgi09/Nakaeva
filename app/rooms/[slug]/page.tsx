import { rooms } from '@/lib/data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Maximize2, CheckCircle2, BedDouble } from 'lucide-react'

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const room = rooms.find((r) => r.slug === slug)
  return { title: `${room?.name} | Накева Къща` }
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const room = rooms.find((r) => r.slug === slug)
  if (!room) notFound()

  const otherRooms = rooms.filter((r) => r.id !== room.id)

  return (
    <div className="pt-16">
      {/* Main image */}
      <div className="relative h-[60vh]">
        <Image src={room.images[0]} alt={room.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="font-serif text-4xl md:text-5xl mb-2">{room.name}</h1>
          <div className="flex items-center gap-4 text-white/80">
            <span className="flex items-center gap-1"><Users size={16} /> {room.capacity} гости</span>
            <span className="flex items-center gap-1"><Maximize2 size={16} /> {room.size} м²</span>
            <span className="flex items-center gap-1"><BedDouble size={16} /> Етаж {room.floor}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Thumbnail gallery */}
          <div className="grid grid-cols-3 gap-3">
            {room.images.map((img, i) => (
              <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                <Image src={img} alt={`${room.name} ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-serif text-2xl text-green mb-3">За стаята</h2>
            <p className="text-gray-600 leading-relaxed">{room.description}</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-green mb-4">Удобства</h2>
            <div className="grid grid-cols-2 gap-3">
              {room.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-green flex-shrink-0" />
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: booking card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6 border border-beige-dark">
            <div className="text-center mb-6">
              <span className="font-serif text-3xl text-green font-bold">{room.pricePerNight} лв</span>
              <span className="text-gray-500 text-sm">/нощ</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green mb-4 bg-green/10 rounded-lg p-3">
              <CheckCircle2 size={16} />
              <span>Свободна — проверете датите</span>
            </div>
            <Link href={`/booking?room=${room.id}`} className="btn-primary w-full text-center block mb-3">
              Резервирай тази стая
            </Link>
            <Link href="/booking?room=whole" className="block text-center text-sm text-gray-500 hover:text-green transition-colors">
              или наемете цялата къща
            </Link>
          </div>
        </div>
      </div>

      {/* Other rooms */}
      <section className="py-12 bg-beige">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-2xl text-green mb-6">Другите стаи</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherRooms.map((r) => (
              <Link key={r.id} href={`/rooms/${r.slug}`} className="card block">
                <div className="relative h-40">
                  <Image src={r.images[0]} alt={r.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg text-green">{r.name}</h3>
                  <p className="text-sm text-gray-500">{r.pricePerNight} лв/нощ · {r.capacity} гости</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
