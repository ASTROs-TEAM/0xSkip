import connecttodb from '@/db/db'
import { NextRequest, NextResponse } from 'next/server'
import HabitModel from '@/db/models/HabitSchema'
import { v4 as uuidv4 } from 'uuid'
import UserModel from '@/db/models/UserSchema'
import HabitParticipationModel from '@/db/models/HabitParticipationSchema'
import OtpGenerator from 'otp-generator'
import console from 'console'

export async function POST(req: NextRequest) {
  try {
    await connecttodb()

    const pathParts = req.nextUrl.pathname.split('/')
    const userId = pathParts[pathParts.length - 1]
    const data = await req.json()

    const {
      title,
      description,
      prizePool,
      entryPrize,
      startDate,
      noOfDays,
      maxpartipants,
      privatehabit
    } = data

    if (!title || !startDate || !noOfDays || !entryPrize || !prizePool) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const habitId = uuidv4()
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + noOfDays)

    const baseHabitData = {
      habitid: habitId,
      title,
      description,
      creator: userId,
      participants: [userId],
      prizePool,
      entryPrize,
      startDate,
      noOfDays,
      endDate,
      maxpartipants,
      privatehabit
    }

    let inviteCodeGenerated = OtpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    })

    console.log('inviteCodeGenerated:', inviteCodeGenerated)
    const habit = new HabitModel(
      privatehabit
        ? {
            ...baseHabitData,
            invite_code: inviteCodeGenerated
          }
        : baseHabitData
    )

    const user = await UserModel.findOne({ userid: userId })
    if (!user) {
      console.log('User Not Found:', userId)
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    user.current_habits.push(habitId)
    await user.save()

    const habitParticipant = new HabitParticipationModel({
      userId,
      habitId,
      join_date: new Date(startDate),
      status: 'current',
      totalDays: noOfDays
    })

    await habit.save()
    await habitParticipant.save()

    console.log('Habit Created Successfully:', habitId)
    return NextResponse.json(
      { message: 'Habit created successfully', habitId, habit },
      { status: 201 }
    )
  } catch (err: any) {
    console.log('Error Creating Habit:', err)
    return NextResponse.json(
      { message: 'Error creating habit', error: err.message },
      { status: 500 }
    )
  }
}
