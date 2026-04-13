export interface Room {
  id: string
  slug: string
  name: string
  description: string
  capacity: number
  size: number
  pricePerNight: number
  images: string[]
  amenities: string[]
  floor: number
  position: { x: number; y: number; w: number; h: number }
}

export interface Booking {
  id: string
  roomId: string | null
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  notes?: string
  createdAt: string
  isWholeHouse: boolean
}

export interface Review {
  id: string
  author: string
  rating: number
  text: string
  date: string
}

export interface BlockedDate {
  id: string
  roomId: string | null
  date: string
  reason?: string
}
