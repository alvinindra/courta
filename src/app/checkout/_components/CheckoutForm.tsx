'use client'

import { useState } from 'react'
import { ChevronDown, Star, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    color: 'Black',
    size: 'Large',
    price: 32.0,
    image: '/placeholder.svg?height=64&width=64'
  },
  {
    id: 2,
    name: 'Basic Tee',
    color: 'Sienna',
    size: 'Large',
    price: 32.0,
    image: '/placeholder.svg?height=64&width=64'
  }
]

export default function CheckoutForm() {
  const [startDate, setStartDate] = useState(new Date())
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1 })

  const subtotal = products.reduce(
    (sum, product) => sum + product.price * quantities[product.id],
    0
  )

  return (
    <div className='min-h-dvh max-w-7xl mx-auto pt-12 p-4'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='border shadow-sm rounded-3xl p-6 w-full md:w-2/3'>
          <h2 className='text-3xl font-bold mb-4'>Checkout</h2>
          <div className='flex flex-row gap-8 mb-4'>
            <img
              alt='Img Title'
              src='/img/field7.jpg'
              className='w-full rounded-lg object-cover max-w-[300px] object-center'
            />
            <div className='flex flex-col gap-2 my-auto'>
              <div className='text-xl font-bold'>
                Lapangan Bola Bandung Hall
              </div>
              <div className='text-md flex gap-2 items-center'>
                <div>4.7</div>
                <Star className='w-5 h-5 text-yellow-400 fill-yellow-400' />
                <div>•</div>
                <div>Jln. Asia Afrika No. 6, Bandung</div>
              </div>
            </div>
          </div>
          <div className='border-b border-dashed my-6'></div>
          <div className='mb-4'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              id='email'
              type='email'
              value='alvin@courta.com'
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
                value='Alvin Indra Pratama'
              />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='mt-4 flex gap-2 flex-col'>
              <Label htmlFor='company'>Start Time</Label>
              <div className='w-full flex'>
                <DatePicker
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50'
                  selected={new Date()}
                  onChange={() => {}}
                  dateFormat='Pp'
                />
              </div>
            </div>
            <div className='mt-4 flex gap-2 flex-col'>
              <Label htmlFor='company'>End Time</Label>
              <div className='w-full flex'>
                <DatePicker
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50'
                  selected={new Date()}
                  onChange={() => {}}
                  dateFormat='Pp'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='shadow-md rounded-3xl h-fit p-6 border w-full md:w-1/3'>
          <h2 className='text-3xl font-bold mb-4'>Order Summary</h2>
          <div className='mt-4 space-y-2'>
            <div className='flex justify-between'>
              <span>Hourly Rental</span>
              <span>2 Hours</span>
            </div>
            <div className='flex justify-between'>
              <span>Price</span>
              <span>Rp30.000</span>
            </div>
            <div className='flex justify-between font-bold text-lg'>
              <span>Total</span>
              <span>Rp60.000</span>
            </div>
          </div>
          <Button className='w-full mt-4' size='lg'>
            Confirm order
          </Button>
        </div>
      </div>
    </div>
  )
}
