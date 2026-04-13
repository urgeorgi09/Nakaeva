import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const bookings = (data ?? []).map((b) => ({
      id: b.id,
      roomId: b.room_id,
      guestName: b.guest_name,
      guestEmail: b.guest_email,
      guestPhone: b.guest_phone,
      checkIn: b.check_in,
      checkOut: b.check_out,
      guests: b.guests,
      totalPrice: b.total_price,
      isWholeHouse: b.is_whole_house,
      notes: b.notes,
      status: b.status,
      createdAt: b.created_at,
    }))

    return NextResponse.json(bookings)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { data, error } = await supabase.from('bookings').insert([{
      room_id: body.roomId === 'whole' ? null : body.roomId,
      guest_name: body.name,
      guest_email: body.email,
      guest_phone: body.phone,
      check_in: body.checkIn,
      check_out: body.checkOut,
      guests: body.guests,
      total_price: body.totalPrice,
      is_whole_house: body.isWholeHouse,
      notes: body.notes ?? '',
      status: 'pending',
    }]).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
