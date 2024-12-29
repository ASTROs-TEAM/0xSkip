import React, { FC } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import personicon from '@/app/persons.svg'
import ethereumicon from '@/app/ethereum.svg'

interface ExplorehabitsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ExplorehabitsVariants> {}

const ExplorehabitsVariants = cva(
  'rounded-lg p-4 m-1 shadow-md transition-colors  border-[1px]  border-white/10',
  {
    variants: {
      variant: {
        default: 'bg-background text-white',
        outline: 'border border-gray-300 bg-white text-gray-900'
      },
      size: {
        default: 'w-96 h-50',
        sm: 'w-64 h-32'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const Explorehabits: FC<ExplorehabitsProps> = ({
  className,
  size,
  variant,
  ...props
}) => {
  return (
    <div
      className={cn(ExplorehabitsVariants({ variant, size, className }))}
      {...props}
    >
      <h2 className='text-xl font-bold mb-2'>Learn Java</h2>
      <p className='text-sm text-foreground/60 pl-1'>
        Learn Java within 30 days. Java is used to develop mobile apps, web
        apps, desktop apps, games, and much more.
      </p>
      <div className='flex items-center justify-between mt-3'>
        <div className='flex items-center gap-2 text-gray-400'>
          <span className='flex items-center gap-1'>
            <Image src={personicon} alt='person icon' width={16} height={16} />
            20
          </span>
          <span className='flex items-center gap-1'>
            <Image
              src={ethereumicon}
              alt='person icon'
              width={16}
              height={16}
            />
            2
          </span>
        </div>
        <button className='text-sm hover:underline hover:text-tertiary  bg-transparent p-2 rounded-md flex items-center'>
          More info
          <ArrowUpRight className='text-tertiary' size={'20px'} />
        </button>
      </div>
    </div>
  )
}

export { Explorehabits, ExplorehabitsVariants }
