import { Star } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

const reviews = [
  {
    name: 'Emily Selman',
    avatar: 'https://github.com/shadcn.png',
    rating: 5,
    comment:
      'This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.'
  },
  {
    name: 'Hector Gibbons',
    avatar: 'https://github.com/shadcn.png',
    rating: 5,
    comment:
      'Before getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can stow my snacks with confidence and style!'
  },
  {
    name: 'Mark Edwards',
    avatar: 'https://github.com/shadcn.png',
    rating: 4,
    comment:
      'I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.'
  }
]

const ratingCounts = [
  { stars: 5, count: 63 },
  { stars: 4, count: 10 },
  { stars: 3, count: 6 },
  { stars: 2, count: 12 },
  { stars: 1, count: 9 }
]

export default function VenueReviews() {
  const totalReviews = 1624
  const averageRating = 4

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Customer Reviews</h2>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-1/3'>
          <div className='flex items-center mb-4'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < averageRating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className='ml-2 text-sm text-gray-600'>
              Based on {totalReviews} reviews
            </span>
          </div>
          {ratingCounts.map(({ stars, count }) => (
            <div key={stars} className='flex items-center mb-2'>
              <span className='w-3'>{stars}</span>
              <Star className='w-4 h-4 text-yellow-400 fill-yellow-400 ml-1 mr-2' />
              <Progress value={count} className='flex-grow' />
              <span className='ml-2 text-sm text-gray-600'>{count}%</span>
            </div>
          ))}
          <div className='mt-6'>
            <h3 className='font-semibold mb-2'>Share your thoughts</h3>
            <p className='text-sm text-gray-600 mb-4'>
              If you've used this product, share your thoughts with other
              customers
            </p>
            <Button variant='outline' className='w-full'>
              Write a review
            </Button>
          </div>
        </div>
        <div className='w-full md:w-2/3'>
          {reviews.map((review, index) => (
            <div key={index} className='mb-6 pb-6 border-b last:border-b-0'>
              <div className='flex items-center mb-2'>
                <img
                  src={review.avatar}
                  alt={review.name}
                  className='w-10 h-10 rounded-full mr-3'
                />
                <div>
                  <h4 className='font-semibold'>{review.name}</h4>
                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
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
