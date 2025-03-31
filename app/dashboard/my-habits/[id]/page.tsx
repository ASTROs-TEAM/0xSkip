"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/ImageUploader";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { convertDate } from "@/lib/utils";
import { Loader2 } from "lucide-react";



const page = ({ params }: any) => {


  const { id } = useParams()
  const { data: session }: any = useSession()
  const [progress, setProgress] = useState('')
  const [habits, setHabits] = useState<any>({})
  const [validations, setValidations] = useState<Array<String>>([])
  const [validationsOfUser, setValidationOfUser] = useState<Array<String>>([])
  const [proofOfWork, setProofOfWork] = useState<Array<String>>([])
  const [validationStatus, setValidationStatus] = useState<boolean>(false)
  const [Loading, setLoading] = useState<boolean>(true)


  // @ts-ignore
  let userid = session?.userid
  let habitid = id

  useEffect(() => {
    console.log('Proof of work:', proofOfWork)
  }, [proofOfWork])

  useEffect(() => {
    if (!userid) {
      console.log('User not logged in')
      return
    }
    const fetchHabits = async () => {
      setLoading(true)
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
        console.log('validation for user', result.validationsForUser)
        console.log(
          'validation date :',
          result.validationsForUser[0].date_of_validation
        )
        console.log('today date :', new Date().toISOString().slice(0, 10))
        if (
          new Date(result.validationsForUser[0].date_of_validation)
            .toISOString()
            .slice(0, 10) === new Date().toISOString().slice(0, 10)
        ) {
          console.log('already validated')
          setValidationStatus(true)
        }
      } catch (err: any) {
        console.log('Error fetching habits:', err?.response?.data?.message)
      } finally {
        setLoading(false)
      }
    }
    fetchHabits()
  }, [userid])

  const handleProgressAdd = async () => {
    // @ts-ignore
    if (!session?.userid) {
      console.error('User not logged in')
      return
    }

    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  const validateProofOfWork = async (validateUserId: string) => {
    // @ts-ignore
    if (!session?.userid) {
      toast.error('User not logged in')
      return
    }

    const validatorUserId = userid

    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      {Loading ? (
        <div className='flex justify-center items-center h-32'>
          <Loader2 className='w-10 h-10 animate-spin text-tertiary' />
        </div>
      ) : (
        <div>
          <div className='my-8'>
            <h1 className='text-4xl font-bricolage font-semibold text-center'>
              {habits?.habit?.title}
            </h1>
            <p className='text-foreground/80 text-center font-normal w-[60%] mx-auto mt-4 leading-snug'>
              {habits?.habit?.description}
            </p>
          </div>
          <div className='flex justify-center gap-4'>
            <Dialog>
              <DialogTrigger asChild disabled={validationStatus}>
                <Button
                  className='w-max bg-tertiary hover:bg-tertiary/90 text-white'
                  disabled={validationStatus}
                  // cursor={validationStatus ? 'not-allowed' : 'pointer'}
                >
                  {validationStatus ? 'Progress Updated' : 'Add Progress'}
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
                        new Date(
                          validation.date_of_validation
                        ).toDateString() !== new Date().toDateString()
                      ) {
                        return
                      }

                      // @ts-ignore
                      const isUserValidated =
                        validation.validated_by.includes(session?.userid) ||
                        validation.validation_status_bool

                      return (
                        <div className='w-[650px] h-max p-4 my-4 flex items-center justify-between bg-foreground/10 rounded-lg mx-auto'>
                          <div>
                            <p>{validation?.userid?.fullname}</p>
                            <Badge
                              variant={validation?.validation_status}
                              className='rounded-full h-4 p-3'
                            >
                              {validation?.validation_status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className='flex gap-2'>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button>View</Button>
                              </DialogTrigger>
                              <DialogContent className='p-8'>
                                <DialogHeader>
                                  <DialogTitle className='text-2xl text-foreground'>
                                    Progress
                                  </DialogTitle>
                                  <DialogDescription className='text-md text-foreground '>
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
                    validationsOfUser.map((validation: any,index:number) => (
                      <div key={index} className='w-[650px] mx-auto bg-foreground/10 px-4 py-2 rounded-lg my-4'>
                        <div className='w-full h-max flex items-center justify-between '>
                          <div>
                            <p className='text-2xl font-bricolage'>
                              {convertDate(validation?.date_of_validation)}
                            </p>
                            <Badge
                              variant={validation?.validation_status}
                              className='rounded-full h-4 p-3'
                            >
                              {validation?.validation_status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className='flex gap-2'>
                            <Dialog>
                              <DialogTrigger asChild>
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
                                      {validation?.proof_imgs.map(
                                        (item: any, index: number) => (
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
                                        )
                                      )}
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
      )}
    </div>
  )
};

export default page;
