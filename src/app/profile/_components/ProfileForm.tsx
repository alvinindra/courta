'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { apiClient } from '@/lib/api'
import { useGeneralStore } from '@/store'
import { UploadButton } from '@/lib/utils'

const profileSchema = z.object({
  avatar: z.custom<File | string | undefined>().optional(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phoneNumber: z
    .string()
    .max(16, { message: 'Phone Number must not exceed 16 characters.' })
    .optional()
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfileForm() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const { profile } = useGeneralStore()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema)
  })

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      const res = await apiClient.put(
        'api/profile/update',
        JSON.stringify(getValues())
      )
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.'
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (profile) {
      setAvatarPreview(profile.avatar || '')
      setValue('name', profile.name)
      setValue('email', profile.email)
      setValue('phoneNumber', profile.phoneNumber || '')
    }
  }, [profile, setValue])

  return (
    <Card className='w-fulld'>
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>Change your profile information here.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='avatar'>Avatar</Label>
            <UploadButton
              endpoint='imageUploader'
              onClientUploadComplete={res => {
                // Do something with the response
                console.log('Files: ', res)
                setAvatarPreview(res[0].url)
                setValue('avatar', res[0].url)
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                console.error(`ERROR! ${error.message}`)
              }}
            />
            {avatarPreview && (
              <div className='flex justify-center mt-2'>
                <img
                  src={avatarPreview}
                  alt='Avatar preview'
                  className='w-20 h-20 rounded-full object-cover'
                />
              </div>
            )}
            {errors.avatar && (
              <p className='text-sm text-red-500'>{errors.avatar.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' {...register('name')} />
            {errors.name && (
              <p className='text-sm text-red-500'>{errors.name.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' {...register('email')} />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='phoneNumber'>Phone Number</Label>
            <Input id='phoneNumber' type='text' {...register('phoneNumber')} />
            {errors.phoneNumber && (
              <p className='text-sm text-red-500'>
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button loading={isLoading} type='submit' className='w-full'>
            Update Profile
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
