import Anim from '@/components/global/Anim'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

const testimonials = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    avatar: 'https://github.com/shadcn.png',
    content:
      'Lorem ipsum dolor sit, amet Odio, incidunt.  id ut omnis repellat. Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis.'
  },
  {
    name: 'Jane Doe',
    role: 'CTO',
    avatar: 'https://github.com/shadcn.png',
    content:
      'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat. Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.'
  },
  {
    name: 'John Smith',
    role: 'COO',
    avatar: 'https://github.com/shadcn.png',
    content:
      'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat. Lorem ipsum dolor sit.'
  },
  {
    name: 'Jane Smith',
    role: 'Tech Lead',
    avatar: 'https://github.com/shadcn.png',
    content:
      'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat. incidunt. Ratione, ullam? Iusto id ut omnis repellat ratione.'
  },
  {
    name: 'Richard Doe',
    role: 'Designer',
    avatar: 'https://github.com/shadcn.png',
    content:
      'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.'
  },
  {
    name: 'Gordon Doe',
    role: 'Developer',
    avatar: 'https://github.com/shadcn.png',
    content:
      'Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat. Lorem ipsum dolor sit, amet Odio, incidunt. Ratione, ullam? Iusto id ut omnis repellat.'
  }
]

const HomeTestimonials = () => {
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
              {testimonials.map((testimonial, idx) => (
                <CarouselItem
                  key={idx}
                  className='basis-full md:basis-1/2 lg:basis-1/3'
                >
                  <div className='h-full p-1'>
                    <div className='flex h-full flex-col justify-between rounded-lg border p-6'>
                      <q className='leading-7 text-foreground/70'>
                        {testimonial.content}
                      </q>
                      <div className='mt-6 flex gap-4 leading-5'>
                        <Avatar className='size-9 rounded-full ring-1 ring-input'>
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                        </Avatar>
                        <div className='text-sm'>
                          <p className='font-medium'>{testimonial.name}</p>
                          <p className='text-muted-foreground'>
                            {testimonial.role}
                          </p>
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
