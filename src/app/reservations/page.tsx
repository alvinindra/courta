import ReservationHistory from './_components/ReservationHistory'

export default function OrderPage() {
  return (
    <>
      <section className='min-h-dvh container lg:max-w-7xl py-12'>
        <div className='flex flex-col gap-2'>
          <div className='text-3xl lg:text-4xl font-bold'>
            Reservation History
          </div>
          <div className='text-md text-gray-500'>
            Check the status of recent orders.
          </div>
        </div>
        <div className='mt-6'>
          <ReservationHistory />
        </div>
      </section>
    </>
  )
}
