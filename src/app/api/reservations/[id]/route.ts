import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { verifyToken } from '@/lib/auth'
import { sendEmail } from '@/lib/email'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid reservation ID' },
        { status: 404 }
      )
    }

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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const reservation = await prisma.reservation.findUnique({
      where: { id: params.id },
      include: { user: true, field: true }
    })

    if (!reservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: reservation })
  } catch (error) {
    console.error('Error fetching reservation:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reservation' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid reservation ID' },
        { status: 404 }
      )
    }

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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { status } = await req.json()
    const allowedStatuses = ['pending', 'confirmed', 'cancelled']

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          error:
            'Invalid status. Allowed statuses are: pending, confirmed, cancelled.'
        },
        { status: 400 }
      )
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id: params.id },
      data: {
        status: status || undefined
      },
      include: {
        user: true,
        field: true
      }
    })

    const user = updatedReservation.user
    if (status === 'confirmed' || status === 'cancelled') {
      const subject = `Reservation ${
        status.charAt(0).toUpperCase() + status.slice(1)
      }`
      const htmlContent = `
        <p>Hello ${user.name},</p>
        <p>Your reservation for the field <strong>${
          updatedReservation.field.name
        }</strong> 
        on ${updatedReservation.date.toLocaleDateString()} at ${
        updatedReservation.timeSlot
      } 
        has been <strong>${status}</strong>.</p>
        <p>Thank you for using our service!</p>
      `

      await sendEmail({
        to: user.email,
        subject,
        html: htmlContent
      })
    }

    return NextResponse.json({
      message: 'Reservation updated successfully',
      data: updatedReservation
    })
  } catch (error) {
    console.error('Error updating reservation:', error)
    return NextResponse.json(
      { error: 'Failed to update reservation' },
      { status: 500 }
    )
  }
}
