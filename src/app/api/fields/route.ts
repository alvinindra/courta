import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    // Get the query parameters for pagination, filtering, sorting, and search
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1') // Default page 1
    const limit = parseInt(searchParams.get('limit') || '8') // Default limit 8
    const sportTypeParam = searchParams.get('sportType') // Filter by sport type (optional)
    const order =
      searchParams.get('order')?.toLowerCase() === 'desc' ? 'desc' : 'asc' // Default order by 'asc'
    const searchQuery = searchParams.get('search') // Search query (optional)
    const sortField = searchParams.get('sortField') || 'createdAt'

    // Calculate the number of records to skip based on the page and limit
    const skip = (page - 1) * limit

    // Build the where clause for filtering by sport type and searching
    let whereClause: any = {}
    const sportType = sportTypeParam ? sportTypeParam.split(',') : undefined

    if (sportType) {
      whereClause.sportType = { in: sportType }
    }

    if (searchQuery) {
      whereClause.name = {
        contains: searchQuery, // Searching fields that contain the searchQuery string
        mode: 'insensitive' // Case-insensitive search
      }
    }

    // Fetch the paginated, filtered, and sorted fields from the database
    const fields = await prisma.field.findMany({
      skip,
      take: limit,
      where: whereClause,
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        description: true,
        image: true,
        location: true,
        price: true,
        sportType: true,
        Review: {
          select: {
            rating: true
          }
        }
      },
      orderBy: {
        [sortField]: order // Sort by the selected field (price, sportType, createdAt)
      }
    })

    // Count the total number of fields (for calculating total pages)
    const fieldsWithRatings = fields.map(field => {
      const totalRatings = field.Review.reduce(
        (sum, review) => sum + review.rating,
        0
      )
      const averageRating = field.Review.length
        ? totalRatings / field.Review.length
        : null
      return {
        ...field,
        averageRating
      }
    })

    // Count the total number of fields (for calculating total pages)
    const totalFields = await prisma.field.count({
      where: whereClause // Use the same filtering for counting total records
    })

    return NextResponse.json(
      {
        data: fieldsWithRatings,
        meta: {
          page,
          limit,
          totalPages: Math.ceil(totalFields / limit),
          totalFields
        }
      },
      { status: 200 }
    )

    return NextResponse.json(
      {
        data: fields,
        meta: {
          page,
          limit,
          totalPages: Math.ceil(totalFields / limit),
          totalFields
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching fields:', error)
    return NextResponse.json(
      { error: 'Failed to fetch fields' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { name, location, sportType, price, image, description } =
      await req.json()

    if (!name || !location || !sportType || !price || !image) {
      return NextResponse.json(
        { error: 'Name, location, sportType, and price are required' },
        { status: 400 }
      )
    }

    const newField = await prisma.field.create({
      data: {
        name,
        location,
        sportType,
        price,
        image,
        description
      }
    })

    return NextResponse.json(newField, { status: 201 })
  } catch (error) {
    console.error('Error creating field:', error)
    return NextResponse.json(
      { error: 'Failed to create field' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Field ID is required' },
        { status: 400 }
      )
    }

    await prisma.field.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Field deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting field:', error)
    return NextResponse.json(
      { error: 'Failed to delete field' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, location, sportType, price, description } =
      await req.json()

    if (!id) {
      return NextResponse.json({ error: 'id are required' }, { status: 400 })
    }

    const updatedField = await prisma.field.update({
      where: { id },
      data: {
        name,
        location,
        sportType,
        price,
        description
      }
    })

    return NextResponse.json(updatedField, { status: 200 })
  } catch (error) {
    console.error('Error updating field:', error)
    return NextResponse.json(
      { error: 'Failed to update field' },
      { status: 500 }
    )
  }
}
