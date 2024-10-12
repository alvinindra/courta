import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn, formatRupiah } from '@/lib/utils'

type Reservation = {
  id: string
  image: string
  name: string
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  rating?: any
}

const reservations: Reservation[] = [
  {
    id: '6703fa1638d7076f05fea69f',
    image:
      'https://g-5rfyqmvqzvq.vusercontent.net/placeholder.svg?height=200&width=200',
    name: 'Luxury Suite',
    totalPrice: 60000,
    status: 'confirmed',
    rating: 4
  },
  {
    id: '6703fa1638d7076f05fea69f',
    image:
      'https://g-5rfyqmvqzvq.vusercontent.net/placeholder.svg?height=200&width=200',
    name: 'Ocean View Room',
    totalPrice: 500000,
    status: 'pending',
    rating: null
  },
  {
    id: '6703fa1638d7076f05fea69f',
    image:
      'https://g-5rfyqmvqzvq.vusercontent.net/placeholder.svg?height=200&width=200',
    name: 'Mountain Cabin',
    totalPrice: 1000000,
    status: 'cancelled',
    rating: null
  },
  {
    id: '6703fa1638d7076f05fea69f',
    image:
      'https://g-5rfyqmvqzvq.vusercontent.net/placeholder.svg?height=200&width=200',
    name: 'City Apartment',
    totalPrice: 800000,
    status: 'confirmed',
    rating: 5
  }
]

const statusVariants = {
  pending: 'capitalize bg-yellow-200 text-yellow-800',
  confirmed: 'capitalize bg-green-200 text-green-800',
  cancelled: 'capitalize bg-red-200 text-red-800'
}

export default function ReservationHistory() {
  return (
    <ScrollArea className='w-full whitespace-nowrap rounded-md border'>
      <div className='space-y-4 p-4'>
        {reservations.map(reservation => (
          <Card key={reservation.id} className='overflow-hidden'>
            <CardContent className='p-0'>
              <div className='flex flex-col sm:flex-row'>
                <div className='w-full sm:w-[300px] h-48'>
                  <img
                    src={reservation.image}
                    alt={reservation.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='p-4 flex-grow flex flex-col justify-between'>
                  <div>
                    <div className='flex flex-row justify-between'>
                      <h3 className='text-lg font-semibold mb-2'>
                        {reservation.name}
                      </h3>
                      <Badge
                        className={cn(
                          'h-fit',
                          statusVariants[reservation.status]
                        )}
                      >
                        {reservation.status}
                      </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground mb-2'>
                      ID: {reservation.id}
                    </p>
                  </div>
                  <div className='mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                    <p className='font-semibold mb-2 sm:mb-0'>
                      Total: {formatRupiah(reservation.totalPrice)}
                    </p>
                    {reservation?.status === 'confirmed' &&
                      reservation?.rating && (
                        <div className='flex items-center'>
                          <span className='mr-1'>Rating:</span>
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`w-4 h-4 ${
                                index < reservation?.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
