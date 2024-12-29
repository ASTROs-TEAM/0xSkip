import { Explorehabits } from '@/components/Explorehabits'
import RightPanel from '@/components/RightPanel'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col  text-white h-full overflow-y-auto py-6 px-4'>
      <div className='my-1'>
        <h1 className='text-4xl font-bold'>Explore Habits</h1>
        <p className='text-gray-300'>
          Explore habits to learn and grow. You can also create your own habits
          and challenge yourself.
        </p>
      </div>
      <div>
        <h1>Search Habits</h1>
      </div>
      <div className='flex flex-wrap gap-1 '>
        {[1, 2, 3, 4, 5, , 4, 5, 4, 5, 4, 5].map(() => (
          <Explorehabits />
        ))}
      </div>
    </div>
  )
}

export default page
