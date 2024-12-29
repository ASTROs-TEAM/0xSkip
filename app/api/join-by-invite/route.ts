import connecttodb from '@/db/db'
import { NextResponse, NextRequest } from 'next/server'
import UserModel from '@/db/models/UserSchema'
import HabitModel from '@/db/models/HabitSchema'
import HabitParticipationModel from '@/db/models/HabitParticipationSchema'

export async function PATCH(req: NextRequest) {
  try {
    await connecttodb()
    const { userid, invite_code } = await req.json()

    const habit = await HabitModel.findOne({ invite_code })
    if (!habit) {
      return NextResponse.json({ message: 'Habit not found' }, { status: 404 })
    }
    if (habit.participants.includes(userid)) {
      return NextResponse.json(
        { message: "User is already a participant in this habit" },
        { status: 400 }
      );
    }
    habit.participants.push(userid)
    await habit.save()

    const user = await UserModel.findOne({ userid })
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
    user.current_habits.push(habit.habitid)
    await user.save()

    const habitParticipant = new HabitParticipationModel({
      userId: userid,
      habitId: habit.habitid,
      join_date: new Date(),
      status: 'current',
      totalDays: habit.noOfDays
    })
    await habitParticipant.save()

    return NextResponse.json(
      { message: 'Habit joined successfully', habit },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Error joining habit', error: err },
      { status: 500 }
    )
  }
}
