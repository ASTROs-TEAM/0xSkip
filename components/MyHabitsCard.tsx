import React, { FC } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import personicon from '@/app/persons.svg'
import ethereumicon from '@/app/ethereum.svg'
import Link from 'next/link'

interface MyHabitsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof MyHabitsCardVariants> {
  HabitTitle: string
  HabitDesc: string
  id: string
}

const MyHabitsCardVariants = cva(
  'rounded-lg p-6 m-1 shadow-md transition-colors border-[1px]  border-white/10',
  {
    variants: {
      variant: {
        default: 'bg-background text-white',
        outline: 'border border-gray-300 bg-white text-gray-900'
      },
      size: {
        default: 'w-full h-50',
        sm: 'w-64 h-32'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const MyHabitsCard: FC<MyHabitsCardProps> = ({
  className,
  size,
  variant,
  HabitTitle,
  HabitDesc,
  id,
  ...props
}) => {
  return (
    <div
      className={cn(MyHabitsCardVariants({ variant, size, className }))}
      {...props}
    >
      <h2 className='text-xl font-bold mb-2'>{HabitTitle}</h2>
      <p className='text-sm text-gray-300'>
        {HabitDesc &&
          (HabitDesc.length > 100
            ? HabitDesc.slice(0, 100) + '...'
            : HabitDesc)}
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
        <Link
          href={`/dashboard/my-habits/${id}`}
          className='text-sm hover:underline bg-[#2e2e31] p-2 rounded-md'
        >
          More info
        </Link>
      </div>
    </div>
  )
}

export { MyHabitsCard, MyHabitsCardVariants }
