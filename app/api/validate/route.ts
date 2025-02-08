import connecttodb from '@/db/db'
import HabitParticipationModel from '@/db/models/HabitParticipationSchema'
import ValidationModel from '@/db/models/ValidationSchema'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    await connecttodb()

    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    const { habitid, userid, validatorUserId } = await req.json()

    console.log(
      'habitId: ',
      habitid,
      'user: ',
      userid,
      ' validator :',
      validatorUserId
    )

    const validateWork = await ValidationModel.findOne({
      habitid,
      date_of_validation: { $gte: startOfDay, $lte: endOfDay },
      userid
    })

    if (!validateWork) {
      console.log('habit not found')
      return NextResponse.json(
        { message: 'Habit not found for the given date and user' },
        { status: 404 }
      )
    }

    let HabitParticipationOption

    if (!validateWork.validated_by.includes(validatorUserId)) {
      validateWork.validated_by.push(validatorUserId)

      if (validateWork.validated_by.length === 2) {
        validateWork.validation_status = 'partial'
        HabitParticipationOption = {
          $inc: { daysChecked: 1 }
        }
      } else if (validateWork.validated_by.length === 3) {
        validateWork.validation_status = 'validated'
        validateWork.validation_status_bool = true
        await HabitParticipationModel.findOneAndUpdate(
          {
            habitId: habitid,
            userId: userid
          },
          {
            $inc: { daysValidated: 1 }
          }
        )
      }

      await validateWork.save()

      return NextResponse.json(
        { message: 'Progress validated successfully', validateWork },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { message: 'User has already validated this habit' },
        { status: 400 }
      )
    }
  } catch (err) {
    return NextResponse.json(
      { message: 'Error validating habit', error: err },
      { status: 500 }
    )
  }
}
