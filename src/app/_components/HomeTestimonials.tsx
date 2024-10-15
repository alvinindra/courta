'use client'

import Anim from '@/components/global/Anim'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { fetcher } from '@/lib/api'
import { Star } from 'lucide-react'
import useSWR from 'swr'

const HomeTestimonials = () => {
  const { data, error } = useSWR('/api/reviews?testimonials=true', fetcher)

  if (data?.data?.length === 0) return <></>

  return (
    <section className='py-32'>
      <div className='container'>
        <Anim>
          <Carousel className='w-full'>
            <div className='mb-8 flex justify-between px-1 lg:mb-12'>
              <h2 className='text-3xl font-semibold lg:text-5xl'>
                Why Customers Love Us
              </h2>
              <div className='flex items-center space-x-2'>
                <CarouselPrevious className='static translate-y-0' />
                <CarouselNext className='static translate-y-0' />
              </div>
            </div>
            <CarouselContent>
              {data?.data?.map((testimonial, idx) => (
                <CarouselItem
                  key={idx}
                  className='basis-full md:basis-1/2 lg:basis-1/3'
                >
                  <div className='h-full p-1'>
                    <div className='flex h-full flex-col justify-between rounded-lg border p-6'>
                      <q className='leading-7 text-foreground/70'>
                        {testimonial.comment}
                      </q>
                      <div className='flex text-gray-400 text-sm mt-4'>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 text-yellow-400 fill-yellow-400`}
                          />
                        ))}
                        <div className='mx-2 text-black'>•</div>
                        <div>{testimonial.field.name}</div>
                      </div>
                      <div className='mt-6 flex gap-4 leading-5'>
                        <Avatar className='size-9 rounded-full ring-1 ring-input'>
                          <AvatarImage
                            src={testimonial.user.avatar}
                            alt={testimonial.user.name}
                          />
                        </Avatar>
                        <div className='text-sm flex items-center'>
                          <p className='font-medium'>{testimonial.user.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Anim>
      </div>
    </section>
  )
}

export default HomeTestimonials
