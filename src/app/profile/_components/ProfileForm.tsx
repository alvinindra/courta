'use client'

import { useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'

const profileSchema = z.object({
  avatar: z
    .custom<File | undefined>()
    .optional()
    .refine(
      file => {
        if (file) {
          return file.size <= 500000 // 500kb
        }
        return true
      },
      {
        message: 'Avatar file must be 5MB or less.'
      }
    ),
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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema)
  })

  const onSubmit = (data: ProfileFormValues) => {
    // Here you would typically send the data to your backend
    console.log(data)
    toast({
      title: 'Profile updated',
      description: 'Your profile has been successfully updated.'
    })
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
            <Input
              id='avatar'
              type='file'
              accept='image/*'
              className='cursor-pointer'
              {...register('avatar')}
              onChange={e => {
                register('avatar').onChange(e)
                handleAvatarChange(e)
              }}
            />
            {avatarPreview && (
              <div className='mt-2'>
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
          <Button type='submit' className='w-full'>
            Update Profile
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
