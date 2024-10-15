'use client'

import { apiClient } from '@/lib/api'
import { formatDate, UploadButton } from '@/lib/utils'
import { MetaReservation } from '@/types'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ConfirmationPage({
  params
}: {
  params: { id: string }
}) {
  const [reservation, setReservation] = useState<MetaReservation | null>(null)
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(
    null
  )

  useEffect(() => {
    async function getReservation() {
      try {
        const res = await apiClient.get(`/api/reservations/${params.id}`)
        setReservation(res.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    if (params.id) getReservation()
  }, [params.id])

  async function handlePaymentProofUpload(paymentProofUrl: string) {
    try {
      await apiClient.put(`/api/reservations/${params.id}`, {
        status: 'confirmed',
        paymentProofUrl
      })
      // Update the reservation state with the new payment proof URL
      setReservation(prev => (prev ? { ...prev, paymentProofUrl } : prev))
    } catch (error) {
      console.error('Error updating reservation with payment proof:', error)
    }
  }

  return (
    <>
      <section className='min-h-dvh bg-white py-8 antialiased dark:bg-gray-900 md:py-16'>
        <div className='mx-auto max-w-2xl'>
          <div className='mb-4'>
            <Link
              href='/reservations'
              className='flex flex-row gap-1 max-w-fit items-center transition-all hover:border-b pb-2 border-black'
            >
              <ChevronLeft />
              <div>Back to History Reservations</div>
            </Link>
          </div>
        </div>
        <div className='shadow-sm border p-6 mx-auto max-w-2xl rounded-lg'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2'>
            Thanks for your order!
          </h2>
          <p className='text-gray-500 dark:text-gray-400 mb-6 md:mb-8'>
            Your order{' '}
            <a
              href='#'
              className='font-medium text-gray-900 dark:text-white hover:underline'
            >
              #{params.id}
            </a>{' '}
            already notify to you by email once your reservation has been
            created.
          </p>
          <div className='space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8'>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Date
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                {reservation?.date && formatDate(new Date(reservation?.date))}
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Name
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                {reservation?.user.name}
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Venue
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                {reservation?.field.name}
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Location
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                {reservation?.field.location}
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Email
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                {reservation?.user.email}
              </dd>
            </dl>
          </div>
          <div className='flex flex-col gap-8 items-center justify-center mx-auto space-x-4'>
            {(reservation?.paymentProofUrl || paymentProofPreview) && (
              <div className='flex justify-center mt-2'>
                <img
                  src={
                    paymentProofPreview
                      ? paymentProofPreview
                      : reservation?.paymentProofUrl
                  }
                  alt='Payment Proof preview'
                  className='w-40 h-80 object-cover'
                />
              </div>
            )}
            {!reservation?.paymentProofUrl && (
              <UploadButton
                endpoint='imageUploader'
                onClientUploadComplete={res => {
                  console.log('Files: ', res)
                  const paymentProofUrl = res[0].url
                  setPaymentProofPreview(paymentProofUrl)
                  handlePaymentProofUpload(paymentProofUrl) // Call the API to update the reservation
                }}
                onUploadError={(error: Error) => {
                  console.error(`ERROR! ${error.message}`)
                }}
                className='text-center'
                appearance={{
                  button() {
                    return {
                      width: '14rem',
                      padding: '1rem 1rem',
                      backgroundColor: '#fbbf24'
                    }
                  }
                }}
                content={{
                  button({ ready }) {
                    if (ready) return <div>Upload Payment Proof</div>
                  }
                }}
              />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
