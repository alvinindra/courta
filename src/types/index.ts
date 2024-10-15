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
}
