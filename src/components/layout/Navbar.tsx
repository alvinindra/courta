'use client'
import Link from 'next/link'
import { Button } from '../ui/button'
import { CircleUser } from 'lucide-react'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGeneralStore } from '@/store'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { apiClient } from '@/lib/api'

export default function Navbar() {
  const router = useRouter()
  const { profile, setProfile } = useGeneralStore()
  const pathname = usePathname()

  const handleLogout = () => {
    Cookies.remove('token')
    setProfile(null)
    router.push('/')
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('api/profile')
        if (response.data.data) {
          setProfile(response.data.data)
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      }
    }

    fetchProfile()
  }, [setProfile])

  return (
    <header className='border-b border-opacity-10 bg-white dark:bg-black sticky top-0 z-50'>
      <div className='container mx-auto flex items-center justify-between py-2'>
        <div className='space-x-3'>
          <Link className='font-extrabold text-2xl w-16 h-auto' href={'/'}>
            COURTA
          </Link>
        </div>

        <div className='flex items-center gap-x-8'>
          {profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='secondary'
                  size='icon'
                  className='rounded-full'
                >
                  <Avatar>
                    <AvatarImage src={profile?.avatar} alt={profile.name} />
                    <AvatarFallback>{profile?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {profile?.role === 'admin' ? (
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => router.push('/reservations')}
                  >
                    My Reservations
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {!['/login', '/register'].includes(pathname) && (
                <Link
                  className='flex flex-row gap-3 items-center'
                  href={`/login`}
                >
                  <Button
                    variant='secondary'
                    size='icon'
                    className='rounded-full'
                  >
                    <CircleUser className='h-5 w-5' />
                    <span className='sr-only'>Login Menu</span>
                  </Button>
                  <div className='font-medium dark:text-white'>Login</div>
                </Link>
              )}
            </>
          )}
          {/* <BrowserOnly>
            <ThemeToggle />
          </BrowserOnly> */}
        </div>
      </div>
    </header>
  )
}
