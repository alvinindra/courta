'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  ChevronDown,
  Filter,
  Grid2X2,
  MapPin,
  Search,
  Star,
  X
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import useSWR from 'swr'
import { fetcher } from '@/lib/api'
import { cn, formatRupiah } from '@/lib/utils'

const items = [
  {
    id: 'football',
    label: 'Football'
  },
  {
    id: 'futsal',
    label: 'Futsal'
  },
  {
    id: 'basketball',
    label: 'Basketball'
  },
  {
    id: 'badminton',
    label: 'Badminton'
  },
  {
    id: 'volleyball',
    label: 'Volleyball'
  },
  {
    id: 'tennis',
    label: 'Tennis'
  }
] as const

const FormSchema = z.object({
  items: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.'
  })
})

export default function VenueList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSportTypes, setSelectedSportTypes] = useState<string[]>([])
  const [order, setOrder] = useState('asc')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ['recents', 'home']
    }
  })

  const apiUrl = `/api/fields?sportType=${selectedSportTypes.join(
    ','
  )}&search=${searchQuery}&order=${order}`

  const { data: fields, isLoading: loading } = useSWR(apiUrl, fetcher)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle sort order change
  const handleSortChange = (sortOrder: string) => {
    setOrder(sortOrder)
  }

  // Handle sport type filter change
  const handleSportTypeChange = (selectedItems: string[]) => {
    setSelectedSportTypes(selectedItems)
  }

  useEffect(() => {
    form.setValue('items', selectedSportTypes)
  }, [selectedSportTypes, form])

  return (
    <section className='min-h-dvh'>
      <div className='container'>
        <div>
          {/* Mobile filter dialog */}
          <Dialog open={mobileFiltersOpen}>
            <DialogContent className='relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full'>
              <div className='flex items-center justify-between px-4'>
                <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                <button
                  type='button'
                  onClick={() => setMobileFiltersOpen(false)}
                  className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
                >
                  <span className='sr-only'>Close menu</span>
                  <X aria-hidden='true' className='h-6 w-6' />
                </button>
              </div>

              {/* Filters */}
              <form className='mt-4 border-t border-gray-200'>
                <h3 className='sr-only'>Filter</h3>
                <ul role='list' className='px-2 py-3 font-medium text-gray-900'>
                  {/* Sport Categories */}
                  {items.map(item => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name='items'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className='flex flex-row items-center space-x-3 space-y-0'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={checked => {
                                  const newSelectedItems = checked
                                    ? [...field.value, item.id]
                                    : field.value?.filter(
                                        value => value !== item.id
                                      )
                                  field.onChange(newSelectedItems)
                                  handleSportTypeChange(newSelectedItems)
                                }}
                              />
                            </FormControl>
                            <FormLabel className='cursor-pointer font-normal text-md'>
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </ul>
              </form>
            </DialogContent>
          </Dialog>

          <div className='mx-auto'>
            <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
                Venue
              </h1>
              <div className='ml-auto my-auto'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className='flex cursor-pointer items-center flex-row gap-2'>
                      <div>Sort</div>
                      <ChevronDown />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={() => handleSortChange('asc')}>
                      Ascending
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('desc')}>
                      Descending
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <button
                type='button'
                onClick={() => setMobileFiltersOpen(true)}
                className='-m-2 ml-4 p-2 my-auto text-gray-400 hover:text-gray-500 lg:hidden'
              >
                <span className='sr-only'>Filters</span>
                <Filter aria-hidden='true' className='h-5 w-5' />
              </button>
            </div>
          </div>

          <section aria-labelledby='products-heading' className='pb-24 pt-6'>
            <h2 id='products-heading' className='sr-only'>
              Products
            </h2>

            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
              {/* Filters */}
              <Form {...form}>
                <form className='hidden lg:block'>
                  <div className='relative ml-auto w-full mb-4 flex-1 flex md:grow-0'>
                    <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      type='search'
                      placeholder='Search...'
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='items'
                    render={() => (
                      <FormItem>
                        <div className='mb-4'>
                          <FormLabel className='text-lg'>Filter</FormLabel>
                        </div>
                        {items.map(item => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name='items'
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className='flex flex-row items-center space-x-3 space-y-0'
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={checked => {
                                        const newSelectedItems = checked
                                          ? [...field.value, item.id]
                                          : field.value?.filter(
                                              value => value !== item.id
                                            )
                                        field.onChange(newSelectedItems)
                                        handleSportTypeChange(newSelectedItems)
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className='cursor-pointer font-normal text-md'>
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>

              {/* Product grid */}
              <div className='grid gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-3 lg:col-span-3'>
                {loading ? (
                  <div>Loading fields...</div>
                ) : fields?.data?.length > 0 ? (
                  fields?.data?.map(field => (
                    <Card key={field.id} className='p-5'>
                      <a
                        href={`/venue/${field.id}`}
                        className='group flex flex-col justify-between'
                      >
                        <div>
                          <div className='flex aspect-[3/2] text-clip rounded-xl'>
                            <div className='flex-1'>
                              <div className='relative size-full origin-bottom transition duration-300 group-hover:scale-105'>
                                <img
                                  src={field.image}
                                  alt={field.name}
                                  className='size-full object-cover object-center'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl'>
                          {field.name}
                        </div>
                        <div className='flex flex-row mb-4 items-center gap-2'>
                          <MapPin className='min-w-fit' size={16} />
                          <div className='text-sm line-clamp-1 text-slate-500'>
                            {field.location}
                          </div>
                        </div>
                        <div
                          className='mb-4 line-clamp-2 text-sm text-muted-foreground'
                          dangerouslySetInnerHTML={{
                            __html: field.description
                          }}
                        />
                        <Badge className='max-w-fit mb-2 bg-slate-700 capitalize'>
                          {field.sportType}
                        </Badge>
                        <div className='flex items-center'>
                          <div className='text-lg font-bold mr-auto'>
                            {formatRupiah(field.price)}{' '}
                            <span className='text-sm font-normal'>/ Hours</span>
                          </div>
                          <Star
                            className={cn(
                              'w-5 h-5',
                              field.averageRating > 0
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-400 fill-white'
                            )}
                          />
                          <div className='flex ml-2 items-center font-medium'>
                            ({field.averageRating || 0})
                          </div>
                        </div>
                      </a>
                    </Card>
                  ))
                ) : (
                  <div>No fields available</div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
