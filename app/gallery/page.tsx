import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Галерия | Накева Къща' }

const images = [
  { src: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800', label: 'Екстериор' },
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', label: 'Горска стая' },
  { src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', label: 'Стая с тераса' },
  { src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800', label: 'Семейна стая' },
  { src: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800', label: 'Master Suite' },
  { src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800', label: 'Сауна' },
  { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', label: 'Джакузи' },
  { src: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800', label: 'Камина' },
  { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', label: 'Барбекю' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', label: 'Природа' },
  { src: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800', label: 'Тераса' },
  { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', label: 'Басейн' },
  { src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800', label: 'Спалня' },
  { src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800', label: 'Баня' },
  { src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800', label: 'Интериор' },
  { src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800', label: 'Детайли' },
]

export default function GalleryPage() {
  return (
    <div className="pt-16">
      <div className="relative h-48 flex items-center justify-center bg-green">
        <div className="text-center text-white">
          <h1 className="font-serif text-4xl mb-2">Галерия</h1>
          <p className="text-white/70">Снимки от реални гости и домакини</p>
        </div>
      </div>

      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {images.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg break-inside-avoid group">
                <Image
                  src={img.src}
                  alt={img.label}
                  width={400}
                  height={300}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                  <span className="text-white text-sm font-medium px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
