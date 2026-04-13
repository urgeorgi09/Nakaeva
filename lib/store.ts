import { Booking } from './types'
import { rooms as defaultRooms, WHOLE_HOUSE_PRICE as DEFAULT_WHOLE_PRICE } from './data'

export const bookings: Booking[] = []

// Mutable price overrides (admin can change these at runtime)
export const prices: Record<string, number> = Object.fromEntries(
  defaultRooms.map((r) => [r.id, r.pricePerNight])
)
prices['whole'] = DEFAULT_WHOLE_PRICE
