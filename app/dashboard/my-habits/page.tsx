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
    participants: string[]
    entryPrize: string
    startDate: string
    privatehabit: boolean
    invite_code: number
    completionStatus: boolean
  }

  const [myHabits, setMyHabits] = useState<Habit[]>([])
  const [searchText, setSearchText] = useState('')
  const [filteredHabits, setFilteredHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false) // Prevents SSR issues

  const { data: session } = useSession()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // @ts-ignore
    if (!session?.userid || !isClient) return

    const fetchHabits = async () => {
      try {
        setLoading(true)
        // @ts-ignore
        const res = await axios.get(`/api/user/${session?.userid}`)
        const currentHabits = res.data.user.current_habits || []

        const detailedHabits = await Promise.all(
          currentHabits.map(async (habitid: string) => {
            const habitRes = await fetch(`/api/habit/${habitid}`)
            const habitData = await habitRes.json()
            return habitData.habit
          })
        )

        // Filter active habits before setting state
        const activeHabits = detailedHabits.filter(
          (habit) =>
            new Date(habit.startDate) <= new Date() && !habit.completionStatus
        )

        setMyHabits(activeHabits)
        setFilteredHabits(activeHabits)
      } catch (err) {
        console.error('Error fetching habits:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHabits()
  }, [session, isClient])

  const handleSearch = (e: any) => {
    setSearchText(e.target.value)
    const filteredData = myHabits.filter((habit) =>
      habit.title.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setFilteredHabits(filteredData)
  }

  if (!isClient) return null 

  return (
    <section className='grid grid-cols-[65%_35%]'>
      <div className='flex flex-col text-foreground h-full overflow-y-auto py-6 px-4'>
        <div className='my-1 text-foreground/80'>
          <h1 className='text-4xl font-bold'>Your Habits</h1>
        </div>
        <div className='flex gap-2 mb-4'>
          <Input
            placeholder='Search Habits'
            className='w-full sm:w-[500px]'
            onChange={handleSearch}
            value={searchText}
          />
          <Button className='w-full sm:w-auto' onClick={handleSearch}>
            Search
          </Button>
        </div>
        {loading ? (
          <div className='flex justify-center items-center h-32'>
            <Loader2 className='w-10 h-10 animate-spin text-tertiary' />
          </div>
        ) : (
          <div className='flex flex-col gap-1 p-2'>
            {filteredHabits.length > 0 ? (
              filteredHabits.map((item) => (
                <MyHabitsCard
                  key={item.habitid}
                  id={item.habitid}
                  HabitTitle={item.title}
                  HabitDesc={item.description}
                  noofparticipants={item.participants.length}
                  entryPrize={item.entryPrize}
                  privatehabit={item.privatehabit}
                  invite_code={item.invite_code}
                />
              ))
            ) : (
              <p>No habits found</p>
            )}
          </div>
        )}
      </div>
      <RightPanel />
    </section>
  )
}

export default Page
