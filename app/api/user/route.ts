import connecttodb from "@/db/db";
import UserSchema from "@/db/models/UserSchema";
import { NextRequest ,NextResponse} from "next/server";
import {v4} from 'uuid';
import UserModel from "@/db/models/UserSchema";
import HabitModel from "@/db/models/HabitSchema";
import HabitParticipationModel from "@/db/models/HabitParticipationSchema";

export async function POST(req: NextRequest) {
    try{
        await connecttodb();
        const id=v4();
        console.log(id);
        const {email,password,username,fullname,userid}= await req.json();
        const newuser= new UserSchema(
            {
              email,
              password,
              username,
              fullname,
              userid,
            //   current_habits
            }
        )
        await newuser.save();
        return NextResponse.json(
            { message: "user added" },
            { status: 200 }
          );

    }
    catch(err){
        return NextResponse.json(
                { message: "Error joining habit", error: err },
                { status: 500 }
              );
    }
}

export async function PATCH(req: NextRequest) {
  try {
    await connecttodb();

    const { habitid, join_date, userid } = await req.json();

  
    if (!habitid || !join_date || !userid) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const habit = await HabitModel.findOne({ habitid });
    if (!habit) {
      return NextResponse.json(
        { message: "Habit not found" },
        { status: 404 }
      );
    }

    const userJoinDate = new Date(join_date);
    const habitStartDate = new Date(habit.startDate);
    console.log("equal",userJoinDate >= habitStartDate)
    if (userJoinDate <= habitStartDate) {
      return NextResponse.json(
        { message: "You cannot join the habit after its start date" },
        { status: 400 }
      );
    }

    if (habit.participants.includes(userid)) {
      return NextResponse.json(
        { message: "User is already a participant in this habit" },
        { status: 400 }
      );
    }

    habit.participants.push(userid);
    await habit.save();

    const user = await UserModel.findOne({ userid });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    user.current_habits.push(habitid);
    await user.save();

    const habitParticipant = new HabitParticipationModel({
      userId: userid,
      habitId: habitid,
      join_date: userJoinDate,
      status: "current",
      totalDays: habit.noOfDays,
    });
    await habitParticipant.save();

    return NextResponse.json(
      { message: "Joined in habit successfully" },
      { status: 200 }
    );
  } catch (err:any) {
    console.error("Error joining habit:", err);
    return NextResponse.json(
      { message: "Error joining habit", error: err.message },
      { status: 500 }
    );
  }
}