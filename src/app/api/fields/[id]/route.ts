import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid field ID' }, { status: 404 })
    }

    const field = await prisma.field.findUnique({
      where: { id: params.id },
      include: {
        reservations: true,
        Review: {
          select: {
            rating: true
          }
        }
      }
    })

    if (!field) {
      return NextResponse.json({ error: 'Field not found' }, { status: 404 })
    }

    const ratings = field.Review.map(review => review.rating)
    const averageRating =
      ratings.length > 0
        ? (
            ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length
          ).toFixed(1)
        : 0

    const responseData = {
      ...field,
      averageRating: averageRating
    }

    return NextResponse.json({ data: responseData })
  } catch (error) {
    console.error('Error fetching field details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch field details' },
      { status: 500 }
    )
  }
}
