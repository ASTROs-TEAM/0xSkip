import { MyHabitsCard } from '@/components/MyHabitsCard'
import RightPanel from '@/components/RightPanel'
import React from 'react'

const page = () => {
  const habits = [
    {
      id: '1',
      HabitTitle: 'Morning Meditation',
      HabitDesc:
        'Spend 10 minutes each morning meditating to improve focus and reduce stress.'
    },
    {
      id: '2',
      HabitTitle: 'Daily Reading',
      HabitDesc:
        'Read at least 20 pages of a book to expand knowledge and improve comprehension skills.'
    },
    {
      id: '3',
      HabitTitle: 'Evening Gratitude Journal',
      HabitDesc:
        'Write down three things you are grateful for each evening to foster a positive mindset.'
    },
    {
      id: '4',
      HabitTitle: 'Hydration Check',
      HabitDesc:
        'Drink at least 8 glasses of water daily to stay hydrated and maintain good health.'
    },
    {
      id: '5',
      HabitTitle: 'Daily Walk',
      HabitDesc:
        'Go for a 30-minute walk every day to boost physical fitness and mental clarity.'
    }
  ]

  return (
    <section className='grid grid-cols-[65%_35%]'>
      <div className='flex flex-col  text-white h-full overflow-y-auto py-6 px-4'>
        <div className='my-1 text-foreground/80'>
          <h1 className='text-4xl font-bold'>Your Habits</h1>
        </div>
        <div>
          <h1>Search Habits</h1>
        </div>
        <div className='flex flex-col gap-1 p-2'>
          {habits.map((item) => (
            <MyHabitsCard
              key={item.id}
              id={item.id}
              HabitTitle={item.HabitTitle}
              HabitDesc={item.HabitDesc}
            />
          ))}
        </div>
      </div>
      <RightPanel />
    </section>
  )
}

export default page
