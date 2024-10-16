'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Star, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useGeneralStore } from '@/store'
import { formatRupiah } from '@/lib/utils'
import { apiClient } from '@/lib/api'
import { toast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function CheckoutForm() {
  const router = useRouter()
  const { profile, checkout } = useGeneralStore()
  const [date, setDate] = useState(new Date())
  const [startDate, setStartDate] = useState<any>(new Date())
  const [endDate, setEndDate] = useState<any>(
    new Date(new Date().getTime() + 60 * 60 * 1000)
  )
  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [duration, setDuration] = useState(1)
  const { handleSubmit } = useForm({
    defaultValues: {
      email: '',
      name: '',
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 60 * 60 * 1000)
    }
  })

  const handleReserve = async () => {
    const reservationData = {
      fieldId: checkout?.venue?.id,
      date: startDate.toISOString(),
      timeSlot: `${startDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })}-${endDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })}`,
      startTime: startDate,
      endTime: endDate
    }

    try {
      setIsLoading(true)
      await apiClient.post('api/reservations', JSON.stringify(reservationData))
      toast({
        title: 'Reservation is successfully'
      })
      router.push('/reservations')
    } catch (err) {
      toast({
        color: 'red',
        title: 'Failed to reserve',
        description: 'Please try again'
      })
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Calculate duration in hours
    const durationInHours = Math.ceil((endDate - startDate) / (1000 * 60 * 60))
    setDuration(durationInHours)

    // Calculate total price
    const hourlyPrice = checkout?.venue?.price || 0
    const calculatedTotalPrice = durationInHours * hourlyPrice
    setTotalPrice(calculatedTotalPrice)
  }, [startDate, endDate, checkout?.venue?.price])

  return (
    <div className='min-h-dvh max-w-7xl mx-auto pt-12 p-4'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='border shadow-sm rounded-3xl p-6 w-full md:w-2/3'>
          <h2 className='text-3xl font-bold mb-4'>Checkout</h2>
          <div className='flex flex-col lg:flex-row gap-8 mb-4'>
            <img
              alt={checkout?.venue?.name}
              src={checkout?.venue?.image}
              className='w-full rounded-lg object-cover md:max-w-[300px] object-center'
            />
            <div className='flex flex-col gap-2 my-auto'>
              <div className='text-xl font-bold'>{checkout?.venue?.name}</div>
              <div className='text-md flex gap-2 items-center'>
                <div>{checkout?.venue?.averageRating}</div>
                <Star className='w-5 h-5 text-yellow-400 fill-yellow-400' />
                <div>•</div>
                <div>{checkout?.venue?.location}</div>
              </div>
            </div>
          </div>
          <div className='border-b border-dashed my-6'></div>
          <div className='mb-4'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              id='email'
              type='email'
              value={profile?.email}
              className='mt-1'
              disabled
            />
          </div>
          <div className='grid grid-cols-1'>
            <div>
              <Label htmlFor='firstName'>Full Name</Label>
              <Input
                id='firstName'
                className='mt-1'
                defaultValue={profile?.name}
              />
            </div>
          </div>
          <div className='grid grid-cols-1 mt-4'>
            <div>
              <Label htmlFor='firstName'>Date</Label>
              <DatePicker
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50'
                selected={date}
                minDate={new Date()}
                onChange={date => setDate(date!)}
                dateFormat='MMMM d, yyyy'
              />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='mt-4 flex gap-2 flex-col'>
              <Label htmlFor='company'>Start Time</Label>
              <div className='w-full flex'>
                <DatePicker
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50'
                  selected={startDate}
                  onChange={date => setStartDate(date!)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  timeCaption='Time'
                  dateFormat='h:mm aa'
                />
              </div>
            </div>
            <div className='mt-4 flex gap-2 flex-col'>
              <Label htmlFor='company'>End Time</Label>
              <div className='w-full flex'>
                <DatePicker
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50'
                  selected={endDate}
                  onChange={date => setEndDate(date!)} // Update end date state
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  timeCaption='Time'
                  dateFormat='h:mm aa'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='shadow-sm rounded-3xl h-fit p-6 border w-full md:w-1/3'>
          <h2 className='text-3xl font-bold mb-4'>Order Summary</h2>
          <div className='mt-4 space-y-2'>
            <div className='flex justify-between'>
              <span>Hourly Rental</span>
              <span>{duration} Hours</span>
            </div>
            <div className='flex justify-between'>
              <span>Price</span>
              <span>{formatRupiah(checkout?.venue?.price)}</span>
            </div>
            <div className='flex justify-between font-bold text-lg'>
              <span>Total</span>
              <span>{formatRupiah(totalPrice)}</span>
            </div>
          </div>
          <Button
            loading={isLoading}
            className='w-full mt-4'
            size='lg'
            onClick={handleReserve}
          >
            Confirm order
          </Button>
        </div>
      </div>
    </div>
  )
}
