'use client'
import Link from 'next/link'
import { BrowserOnly } from 'react-kuh'

import { ThemeToggle } from '@/components/layout'
import { Button } from '../ui/button'
import { CircleUser } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className='border-b border-opacity-10 bg-white sticky top-0 z-50'>
      <div className='container mx-auto flex items-center justify-between py-2'>
        <div className='space-x-3'>
          <Link className='font-bold text-lg w-16 h-auto' href={'/'}>
            COURTA
          </Link>
        </div>

        <div className='flex items-center gap-x-2'>
          {!['/login', '/register'].includes(pathname) && (
            <Link className='flex flex-row gap-2 items-center' href={`/login`}>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <CircleUser className='h-5 w-5' />
                <span className='sr-only'>Login Menu</span>
              </Button>
              <div className='font-medium'>Login</div>
            </Link>
          )}
          <BrowserOnly>
            <ThemeToggle />
          </BrowserOnly>
        </div>
      </div>
    </header>
  )
}
