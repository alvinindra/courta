export default function ConfirmationPage() {
  return (
    <>
      <section className='min-h-dvh bg-white py-8 antialiased dark:bg-gray-900 md:py-16'>
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
              #6703ea717ceb9f936aa2d2a6
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
                14 May 2024
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Name
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                Alvin Indra Pratama
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Venue
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                Lapangan Olahraga
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Location
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                34 Scott Street, San Francisco, California, USA
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Email
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                alvin@courta.com
              </dd>
            </dl>
          </div>
          <div className='flex items-center justify-center mx-auto space-x-4'>
            <a
              href='#'
              className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
            >
              Upload Payment Proof
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
