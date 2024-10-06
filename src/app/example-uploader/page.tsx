'use client'

import { UploadButton } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [imageUrl, setimageUrl] = useState<string>('')
  return (
    <main className='flex min-h-screen flex-col items-center gap-12 p-24'>
      <UploadButton
        endpoint='imageUploader'
        onClientUploadComplete={res => {
          // Do something with the response
          console.log('Files: ', res)
          alert('Upload Completed')
          setimageUrl(res[0].url)
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)
        }}
      />

      {imageUrl.length ? (
        <div>
          <h2>Image Preview</h2>
          <Image src={imageUrl} alt='Uploaded Image' width={500} height={300} />
        </div>
      ) : (
        'nothing here, no image uploaded yet'
      )}
    </main>
  )
}
