import type { Metadata } from 'next'
import './globals.css'
import SiteShell from '@/components/SiteShell'

export const metadata: Metadata = {
  title: 'Накева Къща | Твоята къща сред природата',
  description: 'Луксозна почивна къща сред природата. Сауна, джакузи, камина, барбекю. Резервирай сега!',
  openGraph: {
    title: 'Накева Къща',
    description: 'Откъсни се от шума. Потопи се в уюта.',
    images: ['https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
