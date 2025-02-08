import connecttodb from "@/db/db";
import HabitModel from "@/db/models/HabitSchema";
import ValidationModel from "@/db/models/ValidationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  /* 
  GET  ---> Particular Habit Details
  Habits Description Page
  */
  try {
    await connecttodb();
    const pathParts = req.nextUrl.pathname.split('/');
    const habitid = pathParts[pathParts.length - 1];
    const habit = await HabitModel.findOne({ habitid: habitid });
    if (habit) {
      return NextResponse.json(
        { message: "Habit retrieved", habit: habit },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Habit not found" }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Error finding habit", error: err },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  /*
  UPDATE  --->  Habit Details like Title, Description
  Only if he/she is a creator
  */
  try {
    await connecttodb();

    const data = await req.json();
    const { userid, title, description,habitid } = data;

    const habit = await HabitModel.findOne({ habitid});
    
    if (!habit) {
        return NextResponse.json(
            { message: "Habit not found " },
            { status: 404 }
        );
    }
    else{
    const habit = await HabitModel.findOne({ habitid, creator: userid });
    if (!habit) {
        return NextResponse.json(
            { message: "User is not the creator" },
            { status: 404 }
        );
    }
    }

    const currentDate = new Date();
    if (currentDate >= habit.startDate) {
      return NextResponse.json(
        { message: "Cannot update habit after the start date" },
        { status: 400 }
      );
    }

    if (!habit.canUpdate || habit.updateRemaining <= 0) {
      return NextResponse.json(
        { message: "Update limit reached or updates not allowed" },
        { status: 403 }
      );
    }

    if (title) habit.title = title;
    if (description) habit.description = description;
    if (data.endDate) habit.endDate = new Date(data.endDate);

    habit.updateRemaining -= 1;

    if (habit.updateRemaining === 0) {
      habit.canUpdate = false;
    }
    await habit.save();

    return NextResponse.json(
      { message: "Habit updated successfully", habit },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error updating habit", error: err },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  /* 
  POST  ---> Particular Habit Details With validations
  */
  try {
    await connecttodb()

    const body = await req.json()
    const { withValidations = false, habitid, userid } = body


    if (!habitid || !userid) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const habit = await HabitModel.findOne({ habitid: habitid })

    if (!habit) {
      return NextResponse.json({ message: 'Habit not found' }, { status: 500 })
    }

    var validations;
    var validationsForUser;

    if (withValidations) {
      validations = await ValidationModel.find({ habitid: habitid }).populate({
        path: 'userid',
        model: 'User',
        localField: 'userid',
        foreignField: 'userid',
      })

      validationsForUser = validations.filter(
        (validation) => validation.userid.userid === userid
      )
    }

    return NextResponse.json(
      { message: 'Habit retrieved', habit: habit , validations: validations, validationsForUser: validationsForUser},
      { status: 200 }
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { message: 'Error finding habit', error: err },
      { status: 500 }
    )
  }
}
