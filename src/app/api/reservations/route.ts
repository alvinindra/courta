// app/api/reservations/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization')

  if (!authHeader) {
    return NextResponse.json(
      { error: 'Authorization header is missing' },
      { status: 401 }
    )
  }

  const token = authHeader.split(' ')[1]
  const verifiedUser = verifyToken(token)

  if (!verifiedUser) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  try {
    // Parse JSON body
    const { fieldId, date, timeSlot, totalPrice, paymentProofUrl } =
      await req.json()

    // Validation for required fields
    if (!fieldId || !date || !timeSlot || !totalPrice || !paymentProofUrl) {
      return NextResponse.json(
        {
          error:
            'All fields are required (fieldId, date, timeSlot, totalPrice, paymentProofUrl)'
        },
        { status: 400 }
      )
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId: verifiedUser.userId,
        fieldId,
        date: new Date(date),
        timeSlot,
        totalPrice: parseFloat(totalPrice),
        paymentProofUrl
      }
    })

    return NextResponse.json({
      message: 'Reservation created successfully',
      data: reservation
    })
  } catch (error) {
    console.error('Error creating reservation:', error)
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') // Filter by status (optional)

    const skip = (page - 1) * limit

    const whereClause: any = {}
    if (status) whereClause.status = status

    const reservations = await prisma.reservation.findMany({
      skip,
      take: limit,
      where: whereClause,
      include: {
        user: true,
        field: true
      }
    })

    const totalReservations = await prisma.reservation.count({
      where: whereClause
    })

    return NextResponse.json({
      data: reservations,
      meta: {
        page,
        limit,
        totalPages: Math.ceil(totalReservations / limit),
        totalReservations
      }
    })
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
      { status: 500 }
    )
  }
}
