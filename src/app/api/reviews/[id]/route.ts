import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.split(' ')[1]
    const verifiedUser = verifyToken(token!)

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') // Filter by status (optional)

    const skip = (page - 1) * limit

    const whereClause: any = { id: params.id }
    if (status) whereClause.status = status

    const reviews = await prisma.review.findMany({
      skip,
      take: limit,
      where: whereClause,
      include: {
        user: true,
        field: true
      }
    })

    const totalReviews = await prisma.review.count({
      where: whereClause
    })

    const transformedReviews = reviews.map(review => ({
      ...review,
      isReviewed: review.userId === verifiedUser.userId
    }))

    return NextResponse.json({
      data: transformedReviews,
      meta: {
        page,
        limit,
        totalPages: Math.ceil(totalReviews / limit),
        totalReviews
      }
    })
  } catch (error) {
    console.error('Error fetching review:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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
    const { rating, comment } = await req.json()

    const review = await prisma.review.findUnique({
      where: { id: params.id }
    })

    if (!review || review.userId !== verifiedUser.userId) {
      return NextResponse.json(
        { error: 'Unauthorized or review not found' },
        { status: 403 }
      )
    }

    const updatedReview = await prisma.review.update({
      where: { id: params.id },
      data: {
        rating: rating || review.rating,
        comment: comment || review.comment
      }
    })

    return NextResponse.json({
      message: 'Review updated successfully',
      data: updatedReview
    })
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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
    const review = await prisma.review.findUnique({
      where: { id: params.id }
    })

    if (!review || review.userId !== verifiedUser.userId) {
      return NextResponse.json(
        { error: 'Unauthorized or review not found' },
        { status: 403 }
      )
    }

    await prisma.review.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Review deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    )
  }
}
