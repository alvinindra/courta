import * as z from 'zod'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing({
  errorFormatter: err => {
    return {
      message: err.message,
      zodError: err.cause instanceof z.ZodError ? err.cause.flatten() : null
    }
  }
})

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '2MB' } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log('file url', file.url)
      console.log('file metaData', metadata)
      // !!! Whatever is returned here is sent to the clientSide `onClientUploadComplete` callback
      return { imageUrl: file.url }
    }
  )
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
