// app/api/profile/update/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function PUT(req: Request) {
  const authHeader = req.headers.get('authorization')

  if (!authHeader) {
    return NextResponse.json(
      { error: 'Authorization header is missing' },
      { status: 401 }
    )
  }

  const token = authHeader.split(' ')[1] // "Bearer <token>"
  const verifiedUser = verifyToken(token)

  if (!verifiedUser) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  try {
    // Extract the updated data from the request body
    const { name, avatar, phoneNumber } = await req.json()

    // Check if the name field is provided
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    // Update the user's profile in the database
    const updatedUser = await prisma.user.update({
      where: { id: verifiedUser.userId }, // Ensure the user can only update their own profile
      data: { name, avatar, phoneNumber }
    })

    // Respond with the updated user info (excluding sensitive fields)
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        phoneNumber: updatedUser.phoneNumber
      }
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
