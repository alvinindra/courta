'use client'
import Link from 'next/link'
import { BrowserOnly } from 'react-kuh'

import { ThemeToggle } from '@/components/layout'
import { Button } from '../ui/button'
import { CircleUser } from 'lucide-react'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className='border-b border-opacity-10 bg-white dark:bg-black sticky top-0 z-50'>
      <div className='container mx-auto flex items-center justify-between py-2'>
        <div className='space-x-3'>
          <Link className='font-extrabold text-2xl w-16 h-auto' href={'/'}>
            COURTA
          </Link>
        </div>

        <div className='flex items-center gap-x-8'>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <Avatar>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='@shadcn'
                  />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          {!['/login', '/register'].includes(pathname) && (
            <Link className='flex flex-row gap-3 items-center' href={`/login`}>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <CircleUser className='h-5 w-5' />
                <span className='sr-only'>Login Menu</span>
              </Button>
              <div className='font-medium dark:text-white'>Login</div>
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
