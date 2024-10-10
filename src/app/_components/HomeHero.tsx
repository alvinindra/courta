import Anim from '@/components/global/Anim'
import Link from 'next/link'

export default function HomeHero() {
  return (
    <section className='relative overflow-hidden dark:bg-black bg-white'>
      <div className='pb-80 pt-8 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40'>
        <div className='relative mx-auto max-w-7xl sm:static'>
          <Anim className='container'>
            <div className='sm:max-w-lg'>
              <h1 className='text-4xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-6xl'>
                Book Your Game, Anytime, Anywhere!
              </h1>
              <p className='mt-4 text-xl dark:text-white text-gray-500'>
                Easily find and book venue for your next match or practice.
              </p>
            </div>
          </Anim>
          <div className='overflow-hidden'>
            <div className='mt-10'>
              <div
                aria-hidden='true'
                className='pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl'
              >
                <div className='absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8'>
                  <div className='flex items-center space-x-6 lg:space-x-8'>
                    <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                      <div className='h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100'>
                        <img
                          alt=''
                          src='/img/field1.jpg'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          alt=''
                          src='/img/field2.jpg'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                    </div>
                    <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          alt=''
                          src='/img/field3.jpg'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          alt=''
                          src='/img/field4.jpg'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          alt=''
                          src='/img/field5.jpg'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                    </div>
                    <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          alt=''
                          src='/img/field6.jpg'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='h-64 w-44 overflow-hidden rounded-lg'>
                        <img
                          alt=''
                          src='/img/field7.jpg'
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Anim className='container'>
                <Link
                  href='/venue'
                  className='transition inline-block relative z-10 rounded-md border border-transparent bg-amber-500 px-4 lg:px-8 py-3 text-center font-medium text-white hover:bg-amber-600'
                >
                  Reserve Now
                </Link>
              </Anim>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
