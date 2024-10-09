import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='w-full py-4 border-t border-gray-200'>
      <div className='container mx-auto text-center'>
        <p className='text-sm text-gray-600'>
          © {currentYear} • Site by{' '}
          <Link
            href='https://alvinindra.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary hover:underline'
          >
            Alvin Indra Pratama
          </Link>
        </p>
      </div>
    </footer>
  )
}
