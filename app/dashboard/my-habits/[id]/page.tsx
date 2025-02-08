'use client'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Textarea } from '@/components/ui/textarea'
import ImageUploader from '@/components/ImageUploader'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { convertDate } from '@/lib/utils'
import { DialogClose } from '@radix-ui/react-dialog'

const page = ({ params }: any) => {
  const { data: session }: any = useSession()
  const [progress, setProgress] = useState('')
  const [habits, setHabits] = useState<any>({})
  const [validations, setValidations] = useState<Array<String>>([])
  const [validationsOfUser, setValidationOfUser] = useState<Array<String>>([])
  const [proofOfWork, setProofOfWork] = useState<Array<String>>([])

  const router = useRouter()

  let userid = session?.userid
  let habitid = params.id

  useEffect(() => {
    console.log('Proof of work:', proofOfWork)
  }, [proofOfWork])

  useEffect(() => {
    if (!userid) {
      console.log('User not logged in')
      return
    }
    const fetchHabits = async () => {
      try {
        const body = {
          habitid,
          userid,
          withValidations: true
        }
        const response: any = await axios.post(`/api/habit/${habitid}`, body)
        const result = response.data
        setHabits(result)
        if (result.validations.length !== 0) {
          console.log('No validations found')
          setValidations(result.validations)
          setValidationOfUser(result.validationsForUser)
        }

        console.log('Habits fetched:', response.data)
      } catch (err: any) {
        console.log('Error fetching habits:', err?.response?.data?.message)
      }
    }
    fetchHabits()
  }, [userid])

  const handleProgressAdd = async () => {
    if (!session?.userid) {
      console.error('User not logged in')
      return
    }

    try {
      const response = await axios.post('/api/progress', {
        habitid,
        userid: session?.userid,
        progress,
        proof_imgs: proofOfWork
      })

      if (response.status === 200) {
        toast.success('Proof of Validation added successfully')
        console.log('Progress added successfully:', response.data)
      } else {
        console.error('Error adding progress:', response.data)
      }
    } catch (error) {
      toast.error('Failed to add Proof of Validation')
      console.error('Error during API call:', error)
    }
  }

  const validateProofOfWork = async (validateUserId: string) => {
    if (!session?.userid) {
      toast.error('User not logged in')
      return
    }

    const validatorUserId = userid

    try {
      if (validateUserId === validatorUserId) {
        toast.error('User cannot validate their own proof of work')
        return
      }

      toast.promise(
        axios.patch('/api/validate', {
          habitid,
          userid: validateUserId,
          validatorUserId
        }),
        {
          loading: 'Validating proof of work',
          success: (data) => {
            console.log('Proof of work validated:', data)

            return 'Progress validated'
          },
          error: (data) => {
            return data.response.data.message
          }
        }
      )
    } catch (error) {
      console.error('Error validating proof of work:', error)
    }
  }
  return (
    <div>
      <div className='my-8'>
        <h1 className='text-4xl font-bricolage font-semibold text-center'>
          {habits?.habit?.title}
        </h1>
        <p className='text-foreground/60 text-center font-normal w-[60%] mx-auto mt-4 leading-snug'>
          {habits?.habit?.description}
        </p>
      </div>
      <div className='flex justify-center gap-4'>
        <Dialog>
          <DialogTrigger>
            <Button className='w-max bg-tertiary hover:bg-tertiary/90 text-foreground'>
              Update Your Progress
            </Button>
          </DialogTrigger>
          <DialogContent className='p-8'>
            <DialogHeader>
              <DialogTitle className='text-2xl'>Progress</DialogTitle>
              <DialogDescription className='text-md text-foreground'>
                <Textarea
                  placeholder='Enter your progress here'
                  onChange={(e) => setProgress(e.target.value)}
                />
              </DialogDescription>
            </DialogHeader>
            <div className='w-full'>
              <DialogTitle className='text-2xl'>Proof of Work</DialogTitle>
              <ImageUploader setFunction={setProofOfWork} />
            </div>
            <Button className='w-full mt-4' onClick={handleProgressAdd}>
              Submit
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className='my-8'>
        <Tabs defaultValue='your-progress' className='w-full'>
          <TabsList className='w-full bg-transparent border-b-[2px] border-foreground/10'>
            <TabsTrigger
              className='text-lg  data-[state=active]:border-b-tertiary  data-[state=active]:border-b-[1px]'
              value='peer-validation'
            >
              Peer Validation
            </TabsTrigger>
            <TabsTrigger
              className='text-lg  data-[state=active]:border-b-tertiary  data-[state=active]:border-b-[1px]'
              value='your-progress'
            >
              Your Progress
            </TabsTrigger>
          </TabsList>
          <TabsContent value='peer-validation' className=''>
            <div className='w-full px-10 p-5'>
              <h2 className='font-medium text-xl'>Today</h2>
            </div>
            <div>
              {/* // Map this card  */}
              {validations.length === 0 ? (
                <p>Loading..</p>
              ) : (
                validations.map((validation: any) => {
                  if (validation.userid.userid === session?.userid) {
                    return
                  }

                  if (
                    new Date(validation.date_of_validation).toDateString() !==
                    new Date().toDateString()
                  ) {
                    return
                  }

                  const isUserValidated =
                    validation.validated_by.includes(session?.userid) ||
                    validation.validation_status_bool

                  return (
                    <div className='w-[650px] h-max p-4 my-4 flex items-center justify-between bg-foreground/10 rounded-lg mx-auto'>
                      <div>
                        <p>{validation?.userid?.fullname}</p>
                        <Badge
                          variant={validation?.validation_status}
                          className='rounded-full h-4 '
                        >
                          {validation?.validation_status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className='flex gap-2'>
                        <Dialog>
                          <DialogTrigger>
                            <Button>View</Button>
                          </DialogTrigger>
                          <DialogContent className='p-8'>
                            <DialogHeader>
                              <DialogTitle className='text-2xl'>
                                Progress
                              </DialogTitle>
                              <DialogDescription className='text-md text-foreground'>
                                {validation?.progress}
                              </DialogDescription>
                            </DialogHeader>
                            <div className='w-full'>
                              <DialogTitle className='text-2xl'>
                                Proof of Work
                              </DialogTitle>
                              <Carousel>
                                <CarouselContent>
                                  {validation?.proof_imgs?.map(
                                    (item: any, index: number) => (
                                      <CarouselItem
                                        key={index}
                                        className='h-[300px] p-1 m-1 flex-shrink-0'
                                      >
                                        <img
                                          src={item}
                                          alt='proof'
                                          className='w-full h-full object-cover rounded-lg'
                                        />
                                      </CarouselItem>
                                    )
                                  )}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                              </Carousel>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          onClick={() =>
                            validateProofOfWork(validation.userid.userid)
                          }
                          variant={'outline'}
                          className='w-max border-tertiary'
                          disabled={isUserValidated}
                        >
                          Validate
                        </Button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </TabsContent>
          <TabsContent value='your-progress'>
            {/* <div className='w-full px-10 p-5'>
              <h2 className='font-medium text-xl'>Your Progress</h2>
            </div> */}
            <div className='m-2 my-6'>
              {validationsOfUser.length === 0 ? (
                <p className='text-center'>Loading..</p>
              ) : (
                validationsOfUser.map((validation: any) => (
                  <div className='w-[650px] mx-auto bg-foreground/10 px-4 py-2 rounded-lg my-4'>
                    <div className='w-full h-max flex items-center justify-between '>
                      <div>
                        <p className='text-2xl font-bricolage'>
                          {convertDate(validation?.date_of_validation)}
                        </p>
                        <Badge
                          variant={validation?.validation_status}
                          className='rounded-full h-4 '
                        >
                          {validation?.validation_status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className='flex gap-2'>
                        <Dialog>
                          <DialogTrigger>
                            <Button>View</Button>
                          </DialogTrigger>
                          <DialogContent className='p-8'>
                            <DialogHeader>
                              <DialogTitle className='text-2xl'>
                                Progress
                              </DialogTitle>
                              <DialogDescription className='text-md text-foreground'>
                                {validation?.progress}
                              </DialogDescription>
                            </DialogHeader>
                            <div className='w-full'>
                              <DialogTitle className='text-2xl'>
                                Proof of Work
                              </DialogTitle>
                              <Carousel>
                                <CarouselContent>
                                  {validation?.proof_imgs.map((item, index) => (
                                    <CarouselItem
                                      key={index}
                                      className=' h-[300px] p-1 m-1 flex-shrink-0'
                                    >
                                      <img
                                        src={item}
                                        alt='proof'
                                        className='w-full h-full object-cover rounded-lg'
                                      />
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                              </Carousel>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default page
