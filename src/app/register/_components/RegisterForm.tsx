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
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { apiClient } from '@/lib/api'
import Cookies from 'js-cookie'

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { setProfile } = useGeneralStore(state => state)
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  }) as any

  const handleRegister = async () => {
    try {
      setIsLoading(true)
      const res = await apiClient.post(
        'api/register',
        JSON.stringify(getValues())
      )
      Cookies.set('token', res.data.token)
      setProfile(res.data.user)
      toast({
        title: 'Berhasil melakukan register'
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
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-xl'>Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className='grid gap-4'>
            <div className='grid grid-cols-1 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='first-name'>Full Name</Label>
                <Input
                  id='full-name'
                  placeholder='John Doe'
                  required
                  {...register('name')}
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
                {...register('email')}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' {...register('password')} />
            </div>
            <Button loading={isLoading} type='submit' className='w-full'>
              Create an account
            </Button>
          </div>
        </form>
        <div className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link href='/login' className='underline'>
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
