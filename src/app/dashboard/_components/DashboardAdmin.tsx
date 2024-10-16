'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn, formatRupiah } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api'
import { MetaReservation } from '@/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { StarIcon } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

type FormData = {
  rating: number
  comment: string
}

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
  }, [])

  const updateReviewStatus = (id: string) => {
    setData(prevData =>
      prevData.map(reservation =>
        reservation.id === id
          ? { ...reservation, hasReview: true }
          : reservation
      )
    )
  }

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
                      <Link href={`/venue/${reservation.field.id}`}>
                        <h3 className='text-lg font-semibold mb-2'>
                          {reservation.field.name}
                        </h3>
                      </Link>
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
                    {reservation.status === 'confirmed' &&
                      !reservation.hasReview && (
                        <ReviewButton
                          reservationId={reservation.id}
                          onReviewSuccess={updateReviewStatus}
                        />
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

export function ReviewButton({
  reservationId,
  onReviewSuccess
}: {
  reservationId: string
  onReviewSuccess: any
}) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({
    defaultValues: {
      rating: 0,
      comment: ''
    }
  })

  const rating = watch('rating')

  const onSubmit = async (data: FormData) => {
    try {
      // Construct the request body
      setIsLoading(true)
      const requestBody = {
        reservationId: reservationId,
        rating: data.rating,
        comment: data.comment
      }

      await apiClient.post('api/reviews', requestBody)

      onReviewSuccess(reservationId)

      toast({
        title: 'Review is successfully'
      })
    } catch (error) {
      toast({
        color: 'red',
        title: 'Failed to review',
        description: 'Please try again'
      })
      console.error('Error submitting review:', error)
    } finally {
      setOpen(false)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Write a Review</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your thoughts about the product. Your review will help others
            make informed decisions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className='text-right'>Rating</Label>
              <div className='col-span-3 flex'>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type='button'
                    key={star}
                    className={`${
                      star <= rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    } bg-transparent border-none outline-none cursor-pointer`}
                    onClick={() => setValue('rating', star)}
                  >
                    <StarIcon
                      className={cn(
                        'w-6 h-6',
                        star <= rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      )}
                    />
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className='text-sm text-red-500 mt-1 col-start-2 col-span-3'>
                  {errors.rating.message}
                </p>
              )}
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='review' className='text-right'>
                Review
              </Label>
              <div className='col-span-3'>
                <Controller
                  name='comment'
                  control={control}
                  rules={{ required: 'Review is required' }}
                  render={({ field }) => (
                    <Textarea {...field} placeholder='Write your review here' />
                  )}
                />
                {errors.comment && (
                  <p className='text-sm text-red-500 mt-1'>
                    {errors.comment.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button loading={isLoading} type='submit'>
              Submit Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
