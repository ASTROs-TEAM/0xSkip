import HabitSchema from "@/db/models/HabitSchema";
import { v4 } from "uuid";
import connecttodb from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/db/models/UserSchema";
import HabitModel from "@/db/models/HabitSchema";
import HabitParticipationModel from "@/db/models/HabitParticipationSchema";

export async function POST(req: NextRequest) {
  try {
    await connecttodb();

    const pathParts = req.nextUrl.pathname.split('/');
    const userid = pathParts[pathParts.length - 1];

    const data = await req.json();
    const habit= await HabitModel.findOne({habitid:data.habitid});

    habit.participants.push(userid);

    

    const user = await UserModel.findOne({ userid });
    if (!user) {
      console.log("User Not Found:", userid);
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    user.current_habits.push(data.habitid);
    await user.save();

    const habitParticipant = new HabitParticipationModel({
      userId: userid,
      habitId: data.habitid,
      join_date: new Date(habit.startDate || Date.now()),
      status: "current",
      totalDays: habit.noOfDays,
    });
    await habitParticipant.save();
    await habit.save();
    console.log("Habit Created Successfully:",);
    return NextResponse.json(
      { message: "Habit created successfully",  },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error Creating Habit:", err);
    return NextResponse.json(
      { message: "Error creating habit", error: err },
      { status: 500 }
    );
  }
}
