import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn, formatRupiah } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api'
import { MetaReservation } from '@/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const statusVariants = {
  pending: 'capitalize bg-yellow-200 text-yellow-800',
  confirmed: 'capitalize bg-green-200 text-green-800',
  cancelled: 'capitalize bg-red-200 text-red-800'
}

export default function ReservationHistory() {
  const [data, setData] = useState<MetaReservation[]>([])

  useEffect(() => {
    const getReservations = async () => {
      try {
        const res = await apiClient.get('api/reservations')
        setData(res.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    getReservations()
  })

  return (
    <ScrollArea className='w-full whitespace-nowrap rounded-md border'>
      <div className='space-y-4 p-4'>
        {data.map(reservation => (
          <Card key={reservation.id} className='overflow-hidden'>
            <CardContent className='p-0'>
              <div className='flex flex-col sm:flex-row'>
                <div className='w-full sm:w-[300px] h-48'>
                  <img
                    src={reservation.field.image}
                    alt={reservation.field.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='p-4 flex-grow flex flex-col justify-between'>
                  <div>
                    <div className='flex flex-row justify-between'>
                      <h3 className='text-lg font-semibold mb-2'>
                        {reservation.field.name}
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
                    {reservation.status === 'pending' && (
                      <Button asChild>
                        <Link href={`/confirmation/${reservation.id}`}>
                          Confirm Payment
                        </Link>
                      </Button>
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
