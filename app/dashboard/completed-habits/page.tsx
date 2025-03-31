'use client'

import { MyHabitsCard } from '@/components/MyHabitsCard'
import RightPanel from '@/components/RightPanel'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import axios from 'axios'

const Page = () => {
  interface Habit {
    habitid: string
    title: string
    description: string
    participants: Array<string>
    entryPrize: string
    startDate: string
    completionStatus: boolean
    privatehabit: boolean
    invite_code: number
  }

  const [myHabits, setMyHabits] = useState<Habit[]>([])
  const [searchText, setSearchText] = useState('')
  const [filteredHabits, setFilteredHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [hydrated, setHydrated] = useState(false) // Hydration flag
  const { data: session } = useSession()

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated || !session?.userid) return 

    const fetchHabits = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/api/user/${session?.userid}`)
        const data = res.data
        const currentHabits = data.user.current_habits || []

        const detailedHabits = await Promise.all(
          currentHabits.map(async (habitid: string) => {
            const habitRes = await fetch(`/api/habit/${habitid}`)
            const habitData = await habitRes.json()
            return habitData.habit
          })
        )

        setMyHabits(detailedHabits)
        setFilteredHabits(detailedHabits)
      } catch (err) {
        console.error('Error fetching habits:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHabits()
  }, [hydrated, session?.userid])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const filteringHabit = () => {
    const filteredData = myHabits.filter((habit) =>
      habit.title.toLowerCase().includes(searchText.toLowerCase())
    )
    setFilteredHabits(filteredData)
  }

  // Filter completed habits that have already started
  const completedHabits = filteredHabits.filter(
    (habit) => new Date(habit.startDate) <= new Date() && habit.completionStatus
  )

  if (!hydrated) {
    return null 
  }

  return (
    <section className='grid grid-cols-[65%_35%]'>
      <div className='flex flex-col text-foreground h-full overflow-y-auto py-6 px-4'>
        <div className='my-1 text-foreground/80'>
          <h1 className='text-4xl font-bold'>Completed Habits</h1>
        </div>
        <div className='flex gap-2 mb-4'>
          <Input
            placeholder='Search Habits'
            className='w-full sm:w-[500px]'
            onChange={handleSearch}
            value={searchText}
          />
          <Button className='w-full sm:w-auto' onClick={filteringHabit}>
            Search
          </Button>
        </div>

        {loading ? (
          <div className='flex justify-center items-center h-32'>
            <Loader2 className='w-10 h-10 animate-spin text-tertiary' />
          </div>
        ) : (
          <div className='flex flex-col gap-1 p-2'>
            {completedHabits.length > 0 ? (
              completedHabits.map((habit) => (
                <MyHabitsCard
                  key={habit.habitid}
                  id={habit.habitid}
                  HabitTitle={habit.title}
                  HabitDesc={habit.description}
                  noofparticipants={habit.participants.length}
                  entryPrize={habit.entryPrize}
                  privatehabit={habit.privatehabit}
                  invite_code={habit.invite_code}
                />
              ))
            ) : (
              <p>No completed habits found</p>
            )}
          </div>
        )}
      </div>
      <RightPanel />
    </section>
  )
}

export default Page
