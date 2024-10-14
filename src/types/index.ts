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
