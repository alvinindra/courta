// app/api/check-connection/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Attempt to connect and retrieve some data from the User model
    await prisma.$connect()
    const users = await prisma.user.findMany()

    return NextResponse.json({ success: true, users })
  } catch (error) {
    console.error('Connection failed:', error)
    return NextResponse.json({
      success: false,
      message: 'Connection failed',
      error: error.message
    })
  } finally {
    await prisma.$disconnect()
  }
}
