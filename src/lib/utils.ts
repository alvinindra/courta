import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import {
  generateUploadButton,
  generateUploadDropzone
} from '@uploadthing/react'
import { OurFileRouter } from '@/app/api/uploadthing/core'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return format(date, 'dd MMMM yyyy')
}

export const UploadButton = generateUploadButton<OurFileRouter>()
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()

export function formatRupiah(amount: number) {
  const formatter = new Intl.NumberFormat('id-ID')
  return `Rp. ${formatter.format(amount)}`
}
