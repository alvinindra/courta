'use client'

import { fadeInUp, slideInUp } from '@/lib/keyframes'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Reveal, RevealProps } from 'react-awesome-reveal'

type Props = RevealProps & React.HTMLAttributes<HTMLDivElement>

const Anim = ({
  delay = 0,
  cascade = true,
  keyframes = fadeInUp,
  fraction = 0.5,
  damping = 0.1,
  duration,
  triggerOnce = true,
  childClassName,
  childStyle,
  className,
  children,
  ...props
}: Props) => {
  const [isClient, setIsClient] = useState<boolean>()

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && (
        <>
          {keyframes === slideInUp && (
            <>
              <div className={cn('overflow-hidden', className)} {...props}>
                <Reveal
                  keyframes={keyframes}
                  delay={delay}
                  cascade={cascade}
                  damping={damping}
                  triggerOnce={triggerOnce}
                  fraction={fraction}
                  childClassName={childClassName}
                  childStyle={childStyle}
                >
                  {children}
                </Reveal>
              </div>
            </>
          )}

          {keyframes !== slideInUp && (
            <Reveal
              keyframes={keyframes}
              delay={delay}
              cascade={cascade}
              damping={damping}
              triggerOnce={triggerOnce}
              fraction={fraction}
              childClassName={childClassName}
              childStyle={childStyle}
              className={cn(`!ease-in-out-quart`, className)}
            >
              {children}
            </Reveal>
          )}
        </>
      )}

      {!isClient && (
        <div {...props} className={cn(``, className)}>
          {children}
        </div>
      )}
    </>
  )
}

export default Anim
