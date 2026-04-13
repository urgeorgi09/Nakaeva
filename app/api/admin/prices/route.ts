import { NextRequest, NextResponse } from 'next/server'
import { rooms, WHOLE_HOUSE_PRICE } from '@/lib/data'

// Runtime price overrides (in-memory, resets on cold start)
const priceOverrides: Record<string, number> = {}

export async function GET() {
  const prices: Record<string, number> = {}
  for (const room of rooms) {
    prices[room.id] = priceOverrides[room.id] ?? room.pricePerNight
  }
  prices['whole'] = priceOverrides['whole'] ?? WHOLE_HOUSE_PRICE
  return NextResponse.json(prices)
}

export async function PATCH(req: NextRequest) {
  const updates: Record<string, number> = await req.json()
  for (const [id, price] of Object.entries(updates)) {
    priceOverrides[id] = price
  }
  return NextResponse.json(priceOverrides)
}
