import Header from '@/components/Header'
import Link from 'next/link'
import { SparklesCore } from '@/components/ui/sparkles'

// ANimated Modal
// Container scroll animation
// Feature sections
// Type writer effect
// Sparkles
export default function Home() {
  return (
    <div>
      <Header />
      <div className=' w-full'>
        <div className='w-full h-[60vh] flex flex-col items-center justify-center overflow-hidden rounded-md'>
          <p className='text-[80px] leading-tight font-bricolage text-center '>
            Never Skip your Habits with
            <span className='font-bold text-tertiary text-[100px]'>
              0x Skip
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
