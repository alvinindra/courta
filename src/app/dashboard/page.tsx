'use client'
import DashboardAdmin from './_components/DashboardAdmin'

export default function DashboardPage() {
  return (
    <>
      <section className='min-h-dvh container lg:max-w-7xl py-12'>
        <div className='flex flex-col gap-2'>
          <div className='text-3xl lg:text-4xl font-bold'>Dashboard Admin</div>
          <div className='text-md text-gray-500'>
            Check the status of recent orders.
          </div>
        </div>
        <div className='mt-6'>
          <DashboardAdmin />
        </div>
      </section>
    </>
  )
}
