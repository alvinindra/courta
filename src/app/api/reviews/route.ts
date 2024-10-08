import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
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
    const { reservationId, rating, comment } = await req.json()

    // Cek apakah reservasi valid dan telah selesai (status "completed")
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { user: true }
    })

    if (!reservation || reservation.status !== 'confirmed') {
      return NextResponse.json(
        { error: 'Invalid or incomplete reservation' },
        { status: 400 }
      )
    }

    if (reservation.userId !== verifiedUser.userId) {
      return NextResponse.json(
        { error: 'Unauthorized to review this reservation' },
        { status: 403 }
      )
    }

    // Membuat ulasan
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId: verifiedUser.userId,
        fieldId: reservation.fieldId,
        reservationId: reservationId
      }
    })

    return NextResponse.json({
      message: 'Review created successfully',
      data: review
    })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
