export default function HomeCategory() {
  return (
    <section>
      <div className='mx-auto container py-8 sm:py-12'>
        <header className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
            Explore Fields
          </h2>

          <p className='mx-auto mt-4 max-w-md text-gray-500'>
            Explore our fields type and book now!
          </p>
        </header>

        <ul className='mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <li>
            <a href='#' className='group relative block'>
              <img
                src='/img/field5.jpg'
                alt=''
                className='aspect-square w-full object-cover transition duration-500 group-hover:opacity-90'
              />

              <div className='absolute inset-0 flex flex-col items-start justify-end p-6'>
                <h3 className='text-xl font-medium text-white'>Basketball</h3>

                <span className='mt-1.5 inline-block bg-amber-500 hover:bg-amber-600 px-5 py-3 text-xs font-bold uppercase tracking-wide text-white'>
                  Explore
                </span>
              </div>
            </a>
          </li>

          <li>
            <a href='#' className='group relative block'>
              <img
                src='/img/field6.jpg'
                alt=''
                className='aspect-square w-full object-cover transition duration-500 group-hover:opacity-90'
              />

              <div className='absolute inset-0 flex flex-col items-start justify-end p-6'>
                <h3 className='text-2xl font-bold text-white'>Futsal</h3>

                <span className='mt-1.5 inline-block bg-amber-500 hover:bg-amber-600 px-5 py-3 text-xs font-bold uppercase tracking-wide text-white'>
                  Explore
                </span>
              </div>
            </a>
          </li>

          <li className='lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1'>
            <a href='#' className='group relative block'>
              <img
                src='/img/field7.jpg'
                alt=''
                className='aspect-square w-full object-cover transition duration-500 group-hover:opacity-90'
              />

              <div className='absolute inset-0 flex flex-col items-start justify-end p-6'>
                <h3 className='text-2xl font-bold text-white'>Football</h3>

                <span className='mt-1.5 inline-block bg-amber-500 hover:bg-amber-600 px-5 py-3 text-xs font-bold uppercase tracking-wide text-white'>
                  Explore
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
