'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useGeneralStore } from '@/store'
import { toast } from '@/hooks/use-toast'
import { apiClient } from '@/lib/api'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { setProfile } = useGeneralStore(state => state)
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  }) as any

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const res = await apiClient.post(
        'api/login',
        JSON.stringify(form.getValues())
      )
      Cookies.set('token', res.data.token)
      setProfile(res.data.user)
      toast({
        title: 'Berhasil melakukan login'
      })

      if (res.data.user.role === 'admin') {
        router.push('/dashboard')
      } else {
        router.push('/')
      }
    } catch (error: any) {
      toast({
        color: 'red',
        title: 'Gagal melakukan login',
        description: 'Silakan coba lagi'
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='mx-auto max-w-sm lg:mt-12'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
                {...form.register('email')}
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                {/* <Link href='#' className='ml-auto inline-block text-sm underline'>
                Forgot your password?
              </Link> */}
              </div>
              <Input
                id='password'
                type='password'
                required
                {...form.register('password')}
              />
            </div>
            <Button loading={isLoading} type='submit' className='w-full'>
              Login
            </Button>
          </div>
        </form>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/register' className='underline'>
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
