import { Star } from 'lucide-react'
import { Review } from '@/lib/types'

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-beige-dark flex flex-col justify-between h-full">
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-wood-light text-wood-light" />
        ))}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{review.author}</span>
        <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString('bg-BG', { month: 'long', year: 'numeric' })}</span>
      </div>
    </div>
  )
}
