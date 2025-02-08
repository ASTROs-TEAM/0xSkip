'use client'
import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import useSendTransaction from '@/hooks/useSendTransaction'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

const Page = ({ params }: any) => {
  const { id } = params
  const [name, setname] = useState('')
  const router = useRouter()
  const [habitDetails, setHabitDetails] = useState<any>(null)
  const formatDate = (isoDate: string): string => {
    return new Date(isoDate).toISOString().split('T')[0]
  }

  const { sendTransaction } = useSendTransaction()

  const handleJoinEvent = async () => {
    try {
      toast.promise(
        sendTransaction(
          process.env.NEXT_PUBLIC_COMPANY_WALLET as string,
          habitDetails.entryPrize
        ),
        {
          loading: 'Transaction Processing..',
          success: (data) => {
            console.log(data)
            router.push('/dashboard/my-habits')
            return `Joined habit successfully, hash: ${data}`
          },
          error: 'Error joining habit'
        }
      )
      // TODO: add users to habit participants

      
    } catch (err) {
      console.error('Error joining habit:', err)
      toast.error(`Error joining habit`)
    }
  }

  useEffect(() => {
    const fetchHabitDetails = async () => {
      try {
        const res = await fetch(`/api/habit/${id}`)
        if (!res.ok) {
          throw new Error(`Failed to fetch habit details: ${res.status}`)
        }
        const data = await res.json()
        const creator = data.habit.creator
        setHabitDetails(data.habit)
        const creatordetails = await fetch(`/api/user/${creator}`)
        const creatordetails1 = await creatordetails.json()
        setname(creatordetails1.user.fullname)
        console.log(name)
      } catch (err) {
        console.error('Error fetching habit details:', err)
      }
    }

    fetchHabitDetails()
  }, [id])

  if (!habitDetails) {
    return <p>Loading...</p>
  }

  return (
    <div className='flex flex-col text-white h-full py-6 px-4'>
      <div className='mb-6 text-foreground/80'>
        <h1 className='text-4xl font-bold pl-1 mb-2'>{habitDetails.title}</h1>
        <p className='text-foreground/60 pl-2'>{habitDetails.description}</p>
        <div className='mt-6'>
          <h1 className='text-2xl text-foreground/80 pl-2 my-4 font-semibold'>
            Creator: {name}
          </h1>
          <div className='grid grid-cols-3 gap-4 border-t border-foreground/20 pt-4'>
            <div className='bg-gray-900 rounded-lg p-4 shadow'>
              <h2 className='text-lg text-foreground/80'>Participants</h2>
              <p className='text-xl font-semibold text-foreground'>
                {habitDetails.participants.length}
              </p>
            </div>
            <div className='bg-gray-900 rounded-lg p-4 shadow'>
              <h2 className='text-lg text-foreground/80'>Entry Prize</h2>
              <p className='text-xl font-semibold text-foreground'>
                {habitDetails.entryPrize}
              </p>
            </div>
            <div className='bg-gray-900 rounded-lg p-4 shadow'>
              <h2 className='text-lg text-foreground/80'>Start Date</h2>
              <p className='text-xl font-semibold text-foreground'>
                {formatDate(habitDetails.startDate)}
              </p>
            </div>
            <div className='bg-gray-900 rounded-lg p-4 shadow'>
              <h2 className='text-lg text-foreground/80'>End Date</h2>
              <p className='text-xl font-semibold text-foreground'>
                {formatDate(habitDetails.endDate)}
              </p>
            </div>
            <div className='bg-gray-900 rounded-lg p-4 shadow'>
              <h2 className='text-lg text-foreground/80'>Total Days</h2>
              <p className='text-xl font-semibold text-foreground'>
                {habitDetails.noOfDays}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <p className='text-2xl text-foreground/80 pl-2 font-semibold'>
          Proof of Validation
        </p>
        <p className='text-foreground/60 pl-2 mt-2'>
          {habitDetails.proof_of_validation}
        </p>
        <div className='flex justify-center items-center mt-4'>
          <AlertDialog>
            <AlertDialogTrigger className='bg-foreground text-black p-2 rounded-lg font-normal'>
              Join now
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Terms & Conditions</AlertDialogTitle>
                <AlertDialogDescription>
                  - You must be committed to the habit for the entire duration
                  <br />
                  - You must provide proof of validation daily
                  <br />
                  - You must have a valid reason for missing a day
                  <br />
                  <br />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='border-tertiary'>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction className=''>
                  <Button onClick={() => handleJoinEvent()}>
                    Pay {habitDetails.entryPrize} ETH
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}

export default Page
