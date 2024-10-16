// app/api/reservations/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { sendEmail } from '@/lib/email'
import { ObjectId } from 'mongodb'
import { formatRupiah } from '@/lib/utils'

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
    const { fieldId, date, startTime, endTime, timeSlot } = await req.json()
    if (!ObjectId.isValid(fieldId)) {
      return NextResponse.json(
        { error: 'Invalid reservation ID format' },
        { status: 400 } // Bad Request
      )
    }

    // Validation for required fields
    if (!fieldId || !date || !startTime || !endTime || !timeSlot) {
      return NextResponse.json(
        {
          error: 'All fields are required (fieldId, date, timeSlot, totalPrice)'
        },
        { status: 400 }
      )
    }

    const field = await prisma.field.findUnique({
      where: { id: fieldId }
    })

    if (!field) {
      return NextResponse.json({ error: 'Field not found' }, { status: 404 })
    }

    // Calculate the duration of the reservation in hours
    const durationInHours = Math.ceil(
      (new Date(endTime).getTime() - new Date(startTime).getTime()) /
        (1000 * 60 * 60)
    ) // Convert milliseconds to hours

    if (durationInHours <= 0) {
      return NextResponse.json(
        { error: 'Invalid time slot duration' },
        { status: 400 }
      )
    }

    // Calculate the total price
    const totalPrice = durationInHours * field.price

    const reservation = await prisma.reservation.create({
      data: {
        user: {
          connect: { id: verifiedUser.userId }
        },
        field: {
          connect: { id: fieldId }
        },
        date: new Date(date),
        timeSlot,
        totalPrice,
        status: 'pending',
        paymentProofUrl: null
      }
    })

    const user = await prisma.user.findUnique({
      where: { id: verifiedUser.userId }
    })
    if (user) {
      await sendEmail({
        to: user.email,
        subject: 'Reservation Confirmation - Payment Required',
        html: `<p>Hello ${user.name},</p>
         <p>Thank you for your reservation. Please complete your payment for the reservation.</p>
         <p><strong>Reservation Details:</strong></p>
         <ul>
           <li>Field: ${field.name}</li>
           <li>Location: ${field.location}</li>
           <li>Date: ${date}</li>
           <li>Price: ${formatRupiah(field.price)}</li>
           <li>Time Slot: ${timeSlot}</li>
           <li>Total Price: ${formatRupiah(totalPrice)}</li>
         </ul>
         <p>Please upload your payment proof to confirm the reservation.</p>
         <div>Go to your confirmation page: <a href="${
           process.env.SITE_URL
         }/confirmation/${
          reservation.id
        }" target="_blank">Confirm Your Payment</a></div>
         <p>Thank you!</p>`
      })
    }

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

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') // Filter by status (optional)

    const skip = (page - 1) * limit

    let whereClause: any
    if (verifiedUser.role === 'admin') {
      whereClause = {} // Admin can see all reservations
      if (status) whereClause.status = status // Optional status filter for admin
    } else {
      whereClause = { userId: verifiedUser.userId } // Regular user sees their own reservations
      if (status) whereClause.status = status // Optional status filter for user
    }

    const reservations = await prisma.reservation.findMany({
      skip,
      take: limit,
      where: whereClause,
      include: {
        user: true,
        field: true,
        reviews: {
          select: {
            rating: true
          }
        }
      }
    })

    const reservationsWithReviewStatus = reservations.map(reservation => ({
      ...reservation,
      hasReview: reservation.reviews.length > 0, // Check if there is any review
      rating:
        reservation.reviews.length > 0 ? reservation.reviews[0].rating : null // Get the review rating if it exists
    }))

    const totalReservations = await prisma.reservation.count({
      where: whereClause
    })

    return NextResponse.json({
      data: reservationsWithReviewStatus,
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
