import BookingForm from '@/components/BookingForm'
import { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = { title: 'Резервация | Накева Къща' }

export default async function BookingPage({ searchParams }: { searchParams: Promise<{ room?: string }> }) {
  const { room } = await searchParams

  return (
    <div className="pt-16">
      <div className="relative h-48 flex items-center justify-center bg-green">
        <div className="text-center text-white">
          <h1 className="font-serif text-4xl mb-2">Резервация</h1>
          <p className="text-white/70">Изберете дати и изпратете заявка</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <BookingForm preselectedRoomId={room} />
        </div>

        <div className="space-y-6">
          <div className="bg-beige rounded-2xl p-6">
            <h3 className="font-serif text-xl text-green mb-4">Как работи?</h3>
            <div className="space-y-3">
              {[
                ['1', 'Изберете дати и стая'],
                ['2', 'Попълнете формата'],
                ['3', 'Получете потвърждение до 2ч'],
                ['4', 'Насладете се на почивката!'],
              ].map(([n, t]) => (
                <div key={n} className="flex items-start gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-green text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-beige-dark">
            <h3 className="font-semibold mb-3">Включено</h3>
            <div className="space-y-2">
              {['Постелъчно бельо', 'Кърпи', 'Wi-Fi', 'Паркинг', 'Сауна и джакузи'].map((i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-green" /> {i}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green/10 rounded-2xl p-6">
            <h3 className="font-semibold text-green mb-2">Нужна помощ?</h3>
            <p className="text-sm text-gray-600 mb-3">Свържете се с нас директно:</p>
            <a href="tel:+359888123456" className="block text-sm font-medium text-green">📞 +359 888 123 456</a>
            <a href="mailto:info@nakevakushta.bg" className="block text-sm font-medium text-green mt-1">✉️ info@nakevakushta.bg</a>
          </div>
        </div>
      </div>
    </div>
  )
}
