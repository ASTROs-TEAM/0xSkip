import connecttodb from '@/db/db'
import { NextRequest, NextResponse } from 'next/server'
import HabitModel from '@/db/models/HabitSchema'
import { v4 as uuidv4 } from 'uuid'
import UserModel from '@/db/models/UserSchema'
import HabitParticipationModel from '@/db/models/HabitParticipationSchema'
import OtpGenerator from 'otp-generator'

export async function GET(req: NextRequest) {
  /* 
  GET ---> all habits
  Discover Page
  */
  try {
    await connecttodb()
    const habits = await HabitModel.find({ privatehabit: false })
    return NextResponse.json(
      { message: 'Habits retrieved', habits: habits },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Error retrieving habits', error: err },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connecttodb()

    const data = await req.json()
    const userid = data.userid

    const {
      title,
      description,
      entryPrize,
      startDate,
      noOfDays,
      maxpartipants,
      privatehabit,
      proof_of_validation
    } = data

    if (!title || !startDate || !noOfDays || !entryPrize) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const habitId = uuidv4()

    const startDateObj = new Date(startDate)
    if (isNaN(startDateObj.getTime())) {
      return NextResponse.json(
        { message: 'Invalid startDate' },
        { status: 400 }
      )
    }

    const endDate = new Date(startDateObj.getTime())
    endDate.setDate(endDate.getDate() + noOfDays)

    console.log(`Start Date: ${startDateObj}, End Date: ${endDate}`)

    const baseHabitData = {
      habitid: habitId,
      title,
      description,
      creator: userid,
      participants: [userid],
      entryPrize,
      startDate: startDateObj,
      noOfDays,
      endDate,
      maxpartipants,
      privatehabit,
      proof_of_validation
    }

    let inviteCodeGenerated = privatehabit
      ? OtpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false
        })
      : null

    console.log('Invite Code:', inviteCodeGenerated)

    const habit = new HabitModel({
      ...baseHabitData,
      ...(privatehabit && { invite_code: inviteCodeGenerated })
    })

    // Find the user
    const user = await UserModel.findOne({ userid: userid })
    if (!user) {
      console.log('User Not Found:', userid)
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    user.current_habits.push(habitId)
    await user.save()

    const habitParticipant = new HabitParticipationModel({
      userId: userid,
      habitId,
      join_date: startDateObj,
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

