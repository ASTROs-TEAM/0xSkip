import { MyHabitsCard } from '@/components/MyHabitsCard'
import RightPanel from '@/components/RightPanel'
import React from 'react'

const page = () => {
  return (
    <section className='grid grid-cols-[65%_35%]'>
      <div className='flex flex-col  text-white h-full overflow-y-auto py-6 px-4'>
        <div className='my-1'>
          <h1 className='text-4xl font-bold'>Your Habits</h1>
        </div>
        <div>
          <h1>Search Habits</h1>
        </div>
        <div className='flex flex-col gap-1 p-2'>
          {[1, 2, 3, 4, 5, , 4, 5, 4, 5, 4, 5].map(() => (
            <MyHabitsCard />
          ))}
        </div>
      </div>
      <RightPanel />
    </section>
  )
}

export default page
