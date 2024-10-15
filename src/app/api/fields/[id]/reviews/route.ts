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

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Fetch reviews for the specific field
    const reviews = await prisma.review.findMany({
      skip,
      take: limit,
      where: { fieldId: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    })

    // Count total reviews for pagination
    const totalReviews = await prisma.review.count({
      where: { fieldId: params.id }
    })

    return NextResponse.json({
      data: reviews,
      meta: {
        page,
        limit,
        totalPages: Math.ceil(totalReviews / limit),
        totalReviews
      }
    })
  } catch (error) {
    console.error('Error fetching field reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch field reviews' },
      { status: 500 }
    )
  }
}
