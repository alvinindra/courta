import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const isTestimonials = searchParams.get('testimonials') === 'true'

  try {
    // Fetch testimonials if the parameter is true
    if (isTestimonials) {
      const testimonials = await prisma.review.findMany({
        select: {
          comment: true,
          rating: true,
          user: {
            select: {
              avatar: true,
              name: true
            }
          },
          field: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 10 // Limit the number of testimonials to the latest 10
      })

      return NextResponse.json({
        message: 'Testimonials fetched successfully',
        data: testimonials
      })
    }

    return NextResponse.json(
      {
        error: 'Testimonials parameter is required to be true'
      },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

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
