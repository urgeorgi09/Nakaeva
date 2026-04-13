'use client'
import { useState } from 'react'
import { reviews } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'
import { Star } from 'lucide-react'

const INITIAL_COUNT = 9

export default function ReviewsPage() {
  const [shown, setShown] = useState(INITIAL_COUNT)
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="pt-16">
      <div className="relative h-48 flex items-center justify-center bg-green">
        <div className="text-center text-white">
          <h1 className="font-serif text-4xl mb-2">Ревюта</h1>
          <p className="text-white/70">Какво казват нашите гости</p>
        </div>
      </div>

      {/* Stats */}
      <section className="py-10 bg-beige">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="font-serif text-6xl text-green font-bold mb-2">{avg}</div>
          <div className="flex justify-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} className="fill-wood-light text-wood-light" />
            ))}
          </div>
          <p className="text-gray-500">Базирано на {reviews.length} реални ревюта от Google</p>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {reviews.slice(0, shown).map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>

          {shown < reviews.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShown((s) => Math.min(s + 9, reviews.length))}
                className="btn-primary px-8"
              >
                Покажи още ({reviews.length - shown} останали)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-10 bg-beige">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              ['5.0★', 'Google рейтинг'],
              [String(reviews.length) + '+', 'Реални ревюта'],
              ['100%', 'Препоръчват'],
              ['4г.+', 'Опит'],
            ].map(([num, label]) => (
              <div key={label} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="font-serif text-2xl text-green font-bold">{num}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
