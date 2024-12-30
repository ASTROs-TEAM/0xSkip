'use client'
import { Explorehabits } from '@/components/Explorehabits'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { useSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { toast } from "sonner"


const Page = () => {
  interface Habit {
    title: string
    description: string
    participants: Array<string>
    entryPrize: string
    habitid: string;
  }

  const [inviteCode, setInviteCode] = useState('')
  const [habits, setHabits] = useState<Habit[]>([])

  const { data: session }: any = useSession()
  const [searchText, setSearchText] = useState("");
  const [filteredHabits, setFilteredHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("/api/habit");
        const data = await res.json();
        setHabits(data.habits || []);
        setFilteredHabits(data.habits || []);
      } catch (err) {
        toast('Error fecthing habits')
        console.error('Error fetching habits:', err)
      }
    }
    
    fetchHabits();
  }, []);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteringhabit = () => {
    const filteredData = habits.filter((habit) =>
      habit.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredHabits(filteredData);
    
  };

  const handleJoin = async () => {
    if (!inviteCode) {
      toast('Please enter an invite code.')
      return
    }

    if (inviteCode.length !== 6) {
      toast('Invite code should be exactly 6 characters.')
      return
    }

    try {
      const res = await axios.patch('/api/join-by-invite', {
        invite_code: inviteCode,
        userid: session?.userid
      })
      toast(res.data.message || 'Successfully joined the habit.')
      setInviteCode('')
    } catch (err: any) {
      console.error('Error joining habit:', err)
      if (err.response) {
        toast(err.response.data.message || 'Failed to join habit.')
      } else {
        toast('An unexpected error occurred. Please try again.')
      }
    }
  }

  return (
    <div className='flex flex-col text-white h-full overflow-y-auto py-6 px-4'>
      <div className='mb-4 text-foreground/80'>
        <h1 className='text-4xl font-bold pl-1'>Explore Habits</h1>
        <p className='text-foreground/60 pl-2'>
          Explore habits to learn and grow. You can also create your own habits
          and challenge yourself.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <Input
          placeholder="Search Habits"
          className="w-full sm:w-[500px]"
          onChange={handleSearch}
          value={searchText}
        />
        <Button className="w-full sm:w-auto" onClick={filteringhabit}>
          Search
        </Button>
        
        <Dialog>
          <DialogTrigger>
            <Button
              variant='outline'
              className='border-tertiary w-full sm:w-auto'
            >
              Join using Invite Code
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Private Habit</DialogTitle>
              <DialogDescription>
                Enter the invite code to join the private habit.
              </DialogDescription>
            </DialogHeader>
            <div className='flex flex-col gap-4'>
              <Input
                placeholder='Invite Code'
                onChange={(e) => setInviteCode(e.target.value)}
                value={inviteCode}
              />
              <Button onClick={handleJoin}>Join</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap gap-2">
        {filteredHabits.length > 0 ? (
          filteredHabits.map((habit, index) => (
            <Explorehabits
              key={index}
              title={habit.title}
              description={habit.description}
              participants={habit.participants.length}
              entryPrize={habit.entryPrize}
              habitid={habit.habitid}
            />
          ))
        ) : (
          <p className='text-gray-500'>No habits found.</p>
        )}
      </div>
    </div>
  )
}

export default Page
