import * as Types from '@prisma/client'

export { Types }

export interface MetaProfile {
  id: string
  name: string
  role: string
  avatar: string
  phoneNumber: string
  email: string
}

export interface MetaDetailVenue {
  id: string
  name: string
  location: string
  sportType: string
  image: string
  price: number
  description: string
  createdAt: string
  averageRating: string
  updatedAt: string
  reservations: MetaReservation[]
}

export interface MetaReservation {
  id: string
  userId: string
  fieldId: string
  date: string
  timeSlot: string
  totalPrice: number
  paymentProofUrl?: string
  status: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
    password: string
    avatar: string
    phoneNumber: string
    role: string
    description: any
    createdAt: string
    updatedAt: string
  }
  field: {
    id: string
    name: string
    location: string
    sportType: string
    image: string
    price: number
    description: string
    createdAt: string
    updatedAt: string
  }
}

export interface MetaUser {
  id: string
  name: string
  email: string
  password: string
  avatar: string
  phoneNumber: string
  role: string
  description: any
  createdAt: string
  updatedAt: string
}

export interface MetaReview {
  id: string
  rating: number
  comment: string
  userId: string
  fieldId: string
  reservationId: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
    avatar: string
  }
}
