import Link from 'next/link'
import { GoPlus } from 'react-icons/go'
import { FaReact } from 'react-icons/fa'
import { BiLogoMongodb } from 'react-icons/bi'
import { TbBrandNextjs } from 'react-icons/tb'
import { SiPrisma, SiTailwindcss } from 'react-icons/si'
import { IoLogoGithub, IoLogoVercel } from 'react-icons/io5'

import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <>
      <section className='space-y-6 pb-8 py-8 md:py-16 lg:py-20 '>
        <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto'>
          <h1 className='font-bold leading-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
            Courta
          </h1>
          <p className='max-w-[50%]'>
            A 10-days challenge from my lecturer for Advanced Web subject,
            Courta is a web app for sports venue reservation using Next.js and
            MongoDB.
          </p>
        </div>
      </section>
      <section
        id='features'
        className='container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24 mx-auto'
      >
        <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
          <h2 className='font-bold text-2xl leading-[1.1] sm:text-2xl md:text-4xl'>
            Features
          </h2>
        </div>
        <div className='mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3'>
          <div className='relative overflow-hidden rounded-lg border bg-background p-2 text-center'>
            <div className='flex h-[180px] flex-col justify-center gap-y-4 items-center rounded-md p-6'>
              <TbBrandNextjs size={40} />
              <div className='space-y-2'>
                <h3 className='font-bold leading-normal'>Next.js 14</h3>
                <p className='text-sm text-muted-foreground'>App dir</p>
              </div>
            </div>
          </div>
          <div className='relative overflow-hidden rounded-lg border bg-background p-2 text-center'>
            <div className='flex h-[180px] flex-col justify-center gap-y-4 items-center rounded-md p-6'>
              <FaReact size={40} />
              <div className='space-y-2'>
                <h3 className='font-bold leading-normal'>React 18</h3>
                <p className='text-sm text-muted-foreground'>
                  Server and Client Components.
                </p>
              </div>
            </div>
          </div>
          <div className='relative overflow-hidden rounded-lg border bg-background p-2 text-center'>
            <div className='flex h-[180px] flex-col justify-center gap-y-4 items-center rounded-md p-6'>
              <div className='flex items-center justify-center gap-x-3'>
                <SiPrisma size={40} />
                <GoPlus size={20} />
                <BiLogoMongodb size={40} />
              </div>
              <div className='space-y-2'>
                <h3 className='font-bold leading-normal'>Database</h3>
                <p className='text-sm text-muted-foreground'>
                  Prisma + MongoDB
                </p>
              </div>
            </div>
          </div>
          <div className='relative overflow-hidden col-span-3 rounded-lg border bg-background p-2 text-center'>
            <div className='flex h-[180px] flex-col justify-center gap-y-4 items-center rounded-md p-6'>
              <SiTailwindcss size={40} />
              <div className='space-y-2'>
                <h3 className='font-bold leading-normal'>ShadCN</h3>
                <p className='text-sm text-muted-foreground'>
                  UI components built with TailwindCSS and Radix UI
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
