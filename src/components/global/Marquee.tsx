import { cn } from '@/lib/utils'

export type MarqueeProp = React.HTMLAttributes<HTMLDivElement>

export function Marquee({ children, className, ...props }: MarqueeProp) {
  return (
    <div
      className={cn(`flex items-center overflow-hidden gap-5`, className)}
      {...props}
    >
      <div className='animate-marquee flex flex-nowrap gap-20 whitespace-nowrap'>
        {children}
      </div>
      <div className='animate-marquee2 ml-20 absolute flex gap-20 flex-nowrap whitespace-nowrap'>
        {children}
      </div>
    </div>
  )
}
