'use client'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'

export default function StickyBooking() {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Link href="/booking" className="flex items-center gap-2 bg-green text-white px-5 py-3 rounded-full shadow-lg font-medium text-sm">
        <CalendarDays size={18} />
        Резервирай
      </Link>
    </div>
  )
}
