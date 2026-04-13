import { NextRequest, NextResponse } from 'next/server'
import { prices } from '@/lib/store'

export async function GET() {
  return NextResponse.json(prices)
}

export async function PATCH(req: NextRequest) {
  const updates: Record<string, number> = await req.json()
  for (const [id, price] of Object.entries(updates)) {
    prices[id] = price
  }
  return NextResponse.json(prices)
}
