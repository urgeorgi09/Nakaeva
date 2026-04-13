import Link from 'next/link'
import Image from 'next/image'
import { rooms } from '@/lib/data'
import { reviews } from '@/lib/reviews'
import RoomCard from '@/components/RoomCard'
import ReviewCard from '@/components/ReviewCard'
import { Flame, Waves, Wind, Utensils, Film, Baby, ChevronRight } from 'lucide-react'

const amenities = [
  { icon: <Wind size={28} />, label: 'Сауна' },
  { icon: <Waves size={28} />, label: 'Джакузи' },
  { icon: <Flame size={28} />, label: 'Камина' },
  { icon: <Utensils size={28} />, label: 'Барбекю' },
  { icon: <Film size={28} />, label: 'Лятно кино' },
  { icon: <Baby size={28} />, label: 'Детски кът' },
]

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1600"
          alt="Накева Къща"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <p className="text-wood-light uppercase tracking-widest text-sm mb-4 font-medium">Добре дошли в</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
            Накева Къща
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
            Откъсни се от шума. Потопи се в уюта.
          </p>
          <p className="text-white/70 mb-10 text-lg">
            Събери любимите хора на едно място сред природата
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn-primary text-base px-8 py-4">
              Резервирай сега
            </Link>
            <Link href="/the-house" className="btn-outline text-base px-8 py-4">
              Разгледай къщата
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <ChevronRight size={24} className="rotate-90" />
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 bg-beige">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title mb-6">Твоята къща сред природата</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Накева Къща е уютно убежище за семейства, приятели и двойки, търсещи истинска почивка.
            4 стаи, пълно оборудване, сауна, джакузи и безкрайна тишина — всичко на едно място.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[['4', 'Стаи'], ['12', 'Гости макс.'], ['5★', 'Рейтинг']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-serif text-3xl text-green font-bold">{num}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES PREVIEW */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Удобства</h2>
            <p className="text-gray-500">Всичко, от което се нуждаете за перфектна почивка</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-green">{a.icon}</span>
                <span className="text-sm font-medium">{a.label}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/amenities" className="btn-wood">Всички удобства</Link>
          </div>
        </div>
      </section>

      {/* ROOMS PREVIEW */}
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Нашите стаи</h2>
            <p className="text-gray-500">Всяка стая е уникална история</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/rooms" className="btn-primary">Виж всички стаи</Link>
          </div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Галерия</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
              'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600',
              'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600',
              'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600',
              'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600',
              'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600',
              'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600',
              'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
            ].map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                <Image src={src} alt={`Снимка ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="btn-wood">Виж цялата галерия</Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Какво казват гостите</h2>
            <p className="text-gray-500">Реални преживявания от реални хора</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {[reviews[0], reviews[2], reviews[5]].map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/reviews" className="btn-primary">Всички ревюта</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1600"
          alt="Резервирай"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-green/80" />
        <div className="relative z-10 text-center text-white px-4">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Готови за почивка?</h2>
          <p className="text-white/80 text-lg mb-8">Проверете наличността и резервирайте вашите дати</p>
          <Link href="/booking" className="btn-outline text-base px-10 py-4">
            Резервирай сега
          </Link>
        </div>
      </section>
    </div>
  )
}
