'use client'

import { apiClient } from '@/lib/api'
import { formatRupiah } from '@/lib/utils'
import { useGeneralStore } from '@/store'
import { MetaDetailVenue } from '@/types'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const reviews = { href: '#reviews', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function VenueDetail({ slug }: { slug: string }) {
  const router = useRouter()
  const [venue, setVenue] = useState<MetaDetailVenue | null>(null)
  const { setCheckout } = useGeneralStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVenue() {
      try {
        const res = await apiClient.get(`/api/fields/${slug}`)
        setVenue(res.data.data)
      } catch (error) {
        router.push('/404')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchVenue()
  }, [slug])

  const handleCheckout = () => {
    setCheckout({
      venue: venue,
      checkout: {}
    })
    router.push('/checkout')
  }

  return (
    <div className='bg-white'>
      <div className='pt-6'>
        <nav aria-label='Breadcrumb'>
          <ol
            role='list'
            className='mx-auto flex container items-center space-x-2 px-4 sm:px-6 lg:px-8'
          >
            <li>
              <div className='flex items-center'>
                <a href='/' className='mr-2 text-sm font-medium text-gray-900'>
                  Home
                </a>
                <svg
                  fill='currentColor'
                  width={16}
                  height={20}
                  viewBox='0 0 16 20'
                  aria-hidden='true'
                  className='h-5 w-4 text-gray-300'
                >
                  <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z' />
                </svg>
              </div>
            </li>
            <li>
              <div className='flex items-center'>
                <a
                  href='/venue'
                  className='mr-2 text-sm font-medium text-gray-900'
                >
                  Venue
                </a>
                <svg
                  fill='currentColor'
                  width={16}
                  height={20}
                  viewBox='0 0 16 20'
                  aria-hidden='true'
                  className='h-5 w-4 text-gray-300'
                >
                  <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z' />
                </svg>
              </div>
            </li>
            <li className='text-sm'>
              <a
                href='/venue'
                aria-current='page'
                className='font-medium text-gray-500 hover:text-gray-600'
              >
                {venue?.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className='mx-auto mt-6 container sm:px-6 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          <div className='aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block'>
            <img
              alt={venue?.name}
              src={venue?.image}
              className='h-full w-full object-cover object-center'
            />
          </div>
          <div className='mx-auto max-w-2xl pb-8 pt-4 sm:px-6 flex flex-col lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
            <div className='lg:col-span-2 lg:pr-8'>
              <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                {venue?.name}
              </h1>
            </div>

            {/* Options */}
            <div className='mt-4 lg:row-span-3 lg:mt-0'>
              <h2 className='sr-only'>Product information</h2>
              <div className='text-3xl font-bold tracking-tight text-gray-900'>
                {formatRupiah(venue?.price!)}{' '}
                <span className='text-lg font-normal'>/ Hour</span>
              </div>

              {/* Reviews */}
              <div className='mt-6'>
                <h3 className='sr-only'>Reviews</h3>
                <div className='flex items-center'>
                  <div className='flex items-center'>
                    <Star
                      aria-hidden='true'
                      className={classNames(
                        Number(venue?.averageRating) > 0
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                    />
                  </div>
                  <a
                    href={reviews.href}
                    className='ml-2 text-sm font-medium text-amber-500 hover:text-amber-600'
                  >
                    ({Number(venue?.averageRating)})
                  </a>
                </div>
              </div>
            </div>

            <div className='py-4 lg:py-10 lg:col-span-2 lg:col-start-1 lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'>
              {/* Description and details */}
              <div>
                <h3 className='sr-only'>Description</h3>

                <div className='space-y-6'>
                  <p
                    className='text-base text-gray-900'
                    dangerouslySetInnerHTML={{ __html: venue?.description! }}
                  ></p>
                </div>
              </div>
              <button
                type='submit'
                onClick={handleCheckout}
                className='mt-4 lg:mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
