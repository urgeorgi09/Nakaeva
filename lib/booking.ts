import { differenceInDays, eachDayOfInterval, parseISO } from 'date-fns'

export function calculateNights(checkIn: string, checkOut: string): number {
  return differenceInDays(parseISO(checkOut), parseISO(checkIn))
}

export function calculatePrice(
  pricePerNight: number,
  checkIn: string,
  checkOut: string
): number {
  const nights = calculateNights(checkIn, checkOut)
  return nights * pricePerNight
}

export function getDatesBetween(checkIn: string, checkOut: string): string[] {
  const start = parseISO(checkIn)
  const end = parseISO(checkOut)
  return eachDayOfInterval({ start, end }).map((d) => d.toISOString().split('T')[0])
}

export function isDateBlocked(date: string, blockedDates: string[]): boolean {
  return blockedDates.includes(date)
}
