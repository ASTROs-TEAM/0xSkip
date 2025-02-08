'use client'

import { MyHabitsCard } from '@/components/MyHabitsCard'
import RightPanel from '@/components/RightPanel'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'

const page = () => {
  interface Habit {
    habitid: string
    title: string
    description: string
    participants: Array<string>
    entryPrize: string
    startDate: string
  }

  const [myhabits, setmyHabits] = useState<Habit[]>([])
  const [searchText, setSearchText] = useState('')
  const [filteredHabits, setFilteredHabits] = useState<Habit[]>([])

  const { data: session } = useSession()
  const userid = session?.userid
  console.log("userid", userid) 
  useEffect(() => {
    const fetchHabits = async () => {
      if(!userid) return
      try {
        const res = await fetch(`/api/user/${userid}`)
        const data = await res.json()
        console.log(data);
        const currentHabits = data.user.current_habits || []

        const detailedHabits = await Promise.all(
          currentHabits.map(async (habitid: string) => {
            const habitRes = await fetch(`/api/habit/${habitid}`)
            const habitData = await habitRes.json()
            return habitData.habit
          })
        )
        setmyHabits(detailedHabits)
        setFilteredHabits(detailedHabits)
      } catch (err) {
        console.error('Error fetching habits:', err)
      }
    }

    fetchHabits()
  }, [userid])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const filteringhabit = () => {
    const filteredData = myhabits.filter((habit) =>
      habit.title.toLowerCase().includes(searchText.toLowerCase())
    )
    setFilteredHabits(filteredData)
  }

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
          <Button className='w-full sm:w-auto' onClick={filteringhabit}>
            Search
          </Button>
        </div>
        <div className='flex flex-col gap-1 p-2'>
          {filteredHabits.length > 0 ? (
            filteredHabits.map((item, index) => {
              if (
                new Date(item.startDate).toDateString() >
                new Date().toDateString()
              ) {
                return
              }
              return (
                <MyHabitsCard
                  key={index}
                  id={item.habitid}
                  HabitTitle={item.title}
                  HabitDesc={item.description}
                  noofparticipants={item.participants.length}
                  entryPrize={item.entryPrize}
                />
              )
            })
          ) : (
            <p>No habits found</p>
          )}
        </div>
      </div>
      <RightPanel />
    </section>
  )
}

export default page
