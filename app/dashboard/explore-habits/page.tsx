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

const page = () => {
  return (
    <div className='flex flex-col  text-white h-full overflow-y-auto py-6 px-4'>
      <div className='mb-4 text-foreground/80'>
        <h1 className='text-4xl font-bold pl-1'>Explore Habits</h1>
        <p className='text-foreground/60 pl-2'>
          Explore habits to learn and grow. You can also create your own habits
          and challenge yourself.
        </p>
      </div>
      <div className='flex gap-2 mb-4'>
        <Input placeholder='Search Habits' />
        <Button>Search</Button>

        <Dialog>
          <DialogTrigger>
            <Button variant={'outline'} className='border-tertiary'>
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
            <Input placeholder='Invite Code' />
            <Button>Join</Button>
          </DialogContent>
        </Dialog>
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
