import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-2xl mb-3">Накева Къща</h3>
          <p className="text-white/70 text-sm leading-relaxed">
            Твоята почивна база сред природата. Уют, тишина и незабравими спомени.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Бързи връзки</h4>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            {[['/', 'Начало'], ['/rooms', 'Стаи'], ['/amenities', 'Удобства'], ['/booking', 'Резервация'], ['/contact', 'Контакт']].map(([href, label]) => (
              <Link key={href} href={href} className="hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Контакти</h4>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <span className="flex items-center gap-2"><MapPin size={14} /> с. Сулица, област Стара Загора</span>
            <span className="flex items-center gap-2"><Phone size={14} /> +359 888 123 456</span>
            <span className="flex items-center gap-2"><Mail size={14} /> info@nakevakushta.bg</span>
            <span className="flex items-center gap-2">📸 @nakevakushta</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 text-center py-4 text-xs text-white/50">
        © {new Date().getFullYear()} Накева Къща. Всички права запазени.
      </div>
    </footer>
  )
}
