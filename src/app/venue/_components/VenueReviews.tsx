'use client'

import { Star } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api'
import { MetaReview } from '@/types'

const ratingCounts = [
  { stars: 5, count: 63 },
  { stars: 4, count: 10 },
  { stars: 3, count: 6 },
  { stars: 2, count: 12 },
  { stars: 1, count: 9 }
]

export default function VenueReviews({ slug }) {
  const [reviews, setReviews] = useState([])
  const [totalRating, setTotalRating] = useState(0)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiClient.get(
          `/api/fields/${slug}/reviews?limit=999`
        )
        setReviews(response.data.data)
        setTotalRating(response.data.meta.totalReviews)
      } catch (err) {
        console.log(err)
      }
    }

    fetchReviews()
  }, [slug])

  return (
    <div id='reviews' className='mt-8 container mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Customer Reviews</h2>
      <div className='flex flex-col gap-8 mb-8'>
        <div className='w-full'>
          <div className='flex items-center mb-4'>
            <div className='flex'>
              <Star
                className={`w-5 h-5 ${'text-yellow-400 fill-yellow-400'}`}
              />
            </div>
            <span className='ml-2 text-sm text-gray-600'>
              Based on {totalRating} reviews
            </span>
          </div>
          {/* {ratingCounts.map(({ stars, count }) => (
            <div key={stars} className='flex items-center mb-2'>
              <span className='w-3'>{stars}</span>
              <Star className='w-4 h-4 text-yellow-400 fill-yellow-400 ml-1 mr-2' />
              <Progress value={count} className='flex-grow' />
              <span className='ml-2 text-sm text-gray-600'>{count}%</span>
            </div>
          ))} */}
          {/* <div className='mt-6'>
            <h3 className='font-semibold mb-2'>Share your thoughts</h3>
            <p className='text-sm text-gray-600 mb-4'>
              If you've used this product, share your thoughts with other
              customers
            </p>
            <Button variant='outline' className='w-full'>
              Write a review
            </Button>
          </div> */}
        </div>
        <div className='w-full'>
          {reviews.map((review: MetaReview, index) => (
            <div key={index} className='mb-6 pb-6 border-b last:border-b-0'>
              <div className='flex items-center mb-2'>
                <img
                  src={review.user.avatar}
                  alt={review.user.name}
                  className='w-10 h-10 rounded-full mr-3'
                />
                <div>
                  <h4 className='font-semibold'>{review.user.name}</h4>
                  <div className='flex'>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 text-yellow-400 fill-yellow-400`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className='text-gray-600'>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
