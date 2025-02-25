import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2 mx-1 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow',
        secondary: 'border-transparent bg-secondary text-secondary-foreground ',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow ',
        outline: 'text-foreground',
        validated:
          'border-tertiary/70 bg-tertiary/05 backdrop-blur-xl text-tertiary shadow',
        pending:
          'border-blue-600 bg-background/80 backdrop-blur-xl text-blue-600 shadow',
        partial:
          'border-amber-600 bg-background/80 backdrop-blur-xl text-amber-600 shadow'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
