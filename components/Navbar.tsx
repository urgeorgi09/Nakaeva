'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Начало' },
  { href: '/rooms', label: 'Стаи' },
  { href: '/the-house', label: 'Разпределение' },
  { href: '/amenities', label: 'Удобства' },
  { href: '/gallery', label: 'Галерия' },
  { href: '/reviews', label: 'Ревюта' },
  { href: '/contact', label: 'Контакт' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-beige-dark">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-serif text-xl text-green font-bold tracking-wide">
          Накева Къща
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-charcoal hover:text-green transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/booking" className="btn-primary text-sm py-2 px-4">
            Резервирай
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-t border-beige-dark px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/booking" className="btn-primary text-sm text-center" onClick={() => setOpen(false)}>
            Резервирай
          </Link>
        </div>
      )}
    </nav>
  )
}
