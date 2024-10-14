import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')

    // Check if Authorization header is present
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization header is missing' },
        { status: 401 }
      )
    }

    // Extract token from the header
    const token = authHeader.split(' ')[1]
    const verifiedUser = verifyToken(token)

    // If the token is invalid
    if (!verifiedUser) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Fetch the user's profile from the database using their userId
    const userProfile = await prisma.user.findUnique({
      where: { id: verifiedUser.userId }, // Use the userId from the verified token
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        avatar: true, // Assuming avatarUrl is part of the user's profile
        createdAt: true,
        updatedAt: true
      }
    })

    // If user is not found in the database
    if (!userProfile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Return the user profile data
    return NextResponse.json({ data: userProfile })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}
